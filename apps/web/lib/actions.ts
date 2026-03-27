"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { calculateLiquifyScore, getTierFromScore } from "@repo/scoring";
import { Transaction, Customer, Merchant } from "@repo/db";

/**
 * Gets a summary of the merchant's business status
 */
export async function getMerchantOverview(merchantId: string) {
  if (!process.env.DATABASE_URL) {
    return {
      merchant: { shopName: "Mock Pilot Shop" },
      totalOutstanding: 450000,
      collectedToday: 125000,
      overdueCount: 8,
      recentActivity: [
        { id: "a1", type: "PAYMENT", customer: { fullName: "David Omndi" }, amount: 150000, createdAt: new Date() },
        { id: "a2", type: "CREDIT_ISSUED", customer: { fullName: "Sarah Kimani" }, amount: 300000, createdAt: new Date() },
      ]
    };
  }

  const [merchant, customers, transactions] = await Promise.all([
    prisma.merchant.findUnique({ where: { id: merchantId } }),
    prisma.customer.findMany({ where: { merchantId } }),
    prisma.transaction.findMany({ 
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      take: 10
    })
  ]);

  const totalOutstanding = (customers as Customer[]).reduce((acc: number, c: Customer) => acc + c.outstandingBalance, 0);
  const collectedToday = (transactions as Transaction[])
    .filter(t => t.type === 'PAYMENT' && t.createdAt >= new Date(new Date().setHours(0,0,0,0)))
    .reduce((acc: number, t: Transaction) => acc + t.amount, 0);

  return {
    merchant,
    totalOutstanding,
    collectedToday,
    overdueCount: (customers as Customer[]).filter(c => c.outstandingBalance > 0 && c.lastVisitAt && new Date().getTime() - c.lastVisitAt.getTime() > 30 * 24 * 60 * 60 * 1000).length,
    recentActivity: transactions
  };
}

/**
 * Issues credit to a customer
 */
export async function issueCredit(params: {
  merchantId: string;
  customerId: string;
  amount: number;
  description?: string;
  dueDate?: Date;
}) {
  if (!process.env.DATABASE_URL) {
    console.log("Mock Mode: issueCredit", params);
    return { success: true, mock: true };
  }

  const result = await prisma.$transaction(async (tx: any) => {
    // 1. Create transaction
    const transaction = await tx.transaction.create({
      data: {
        merchantId: params.merchantId,
        customerId: params.customerId,
        type: 'CREDIT_ISSUED',
        amount: params.amount,
        description: params.description,
        status: 'PENDING',
        dueDate: params.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
      }
    });

    // 2. Update customer balance
    const customer = await tx.customer.update({
      where: { id: params.customerId },
      data: {
        outstandingBalance: { increment: params.amount },
        visitCount: { increment: 1 },
        lastVisitAt: new Date()
      }
    });

    return { transaction, customer };
  });

  revalidatePath("/dashboard");
  return result;
}

/**
 * Records a customer payment
 */
export async function recordPayment(params: {
  merchantId: string;
  customerId: string;
  amount: number;
  paymentMethod: 'CASH' | 'MPESA' | 'BANK';
  mpesaRef?: string;
  description?: string;
}) {
  if (!process.env.DATABASE_URL) {
    console.log("Mock Mode: recordPayment", params);
    return { success: true, mock: true };
  }

  const result = await prisma.$transaction(async (tx: any) => {
    // 1. Create payment transaction
    const transaction = await tx.transaction.create({
      data: {
        merchantId: params.merchantId,
        customerId: params.customerId,
        type: 'PAYMENT',
        amount: params.amount,
        paymentMethod: params.paymentMethod,
        mpesaRef: params.mpesaRef,
        description: params.description,
        status: 'COMPLETED',
      }
    });

    // 2. Update customer balance
    const customer = await tx.customer.update({
      where: { id: params.customerId },
      data: {
        outstandingBalance: { decrement: params.amount },
        lastVisitAt: new Date()
      }
    });

    // 3. Recalculate score (Mock logic for now using the package)
    // In a real app, this would involve more factors
    const newScore = calculateLiquifyScore({
      repaymentRate: 100, // Heuristic
      consistencyScore: 80,
      frequencyScore: 70,
      recencyScore: 100,
      penalties: 0
    });

    await tx.customer.update({
      where: { id: params.customerId },
      data: {
        liquifyScore: newScore,
        creditTier: getTierFromScore(newScore)
      }
    });

    return { transaction, customer };
  });

  revalidatePath("/dashboard");
  return result;
}
