"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";

/**
 * Gets a paginated list of customers with optional search and tier filtering
 */
export async function getCustomers(params: {
  merchantId: string;
  search?: string;
  tier?: string;
  page?: number;
  pageSize?: number;
}) {
  const { merchantId, search, tier, page = 1, pageSize = 20 } = params;

  // Mock Mode fallback for marketing-only deployments
  if (!process.env.DATABASE_URL) {
    const mockCustomers = [
      { id: "c1", fullName: "Wanjiku Kamau", phoneNumber: "0712 345 678", creditTier: "GOLD", outstandingBalance: 250000, liquifyScore: 78, lastVisitAt: new Date() },
      { id: "c2", fullName: "John Musyoka", phoneNumber: "0722 987 654", creditTier: "SILVER", outstandingBalance: 120000, liquifyScore: 45, lastVisitAt: new Date() },
      { id: "c3", fullName: "Mary Atieno", phoneNumber: "0733 111 222", creditTier: "BRONZE", outstandingBalance: 55000, liquifyScore: 32, lastVisitAt: null },
    ];
    return {
      customers: mockCustomers,
      pagination: { total: 3, page: 1, pageSize: 20, totalPages: 1 }
    };
  }
  
  const where: any = { merchantId };
  
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { phoneNumber: { contains: search } }
    ];
  }
  
  if (tier && tier !== 'ALL') {
    where.creditTier = tier;
  }

  const [total, customers] = await Promise.all([
    prisma.customer.count({ where }),
    prisma.customer.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { fullName: 'asc' }
    })
  ]);

  return {
    customers,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  };
}

/**
 * Creates a new customer for a merchant
 */
export async function createCustomer(params: {
  merchantId: string;
  fullName: string;
  phoneNumber: string;
  location?: string;
  idNumber?: string;
}) {
  if (!process.env.DATABASE_URL) {
    console.log("Mock Mode: createCustomer", params);
    return { id: "mock_new", ...params, liquifyScore: 35, creditTier: "BRONZE", creditLimit: 1000 };
  }

  const customer = await prisma.customer.create({
    data: {
      merchantId: params.merchantId,
      fullName: params.fullName,
      phoneNumber: params.phoneNumber,
      location: params.location,
      idNumber: params.idNumber,
      liquifyScore: 35, // Initial score for new customers
      creditTier: 'BRONZE',
      creditLimit: 1000, // Initial limit KES 1000
    }
  });

  revalidatePath("/dashboard/customers");
  return customer;
}

/**
 * Updates customer profile
 */
export async function updateCustomer(id: string, data: any) {
  const customer = await prisma.customer.update({
    where: { id },
    data
  });

  revalidatePath(`/dashboard/customers/${id}`);
  return customer;
}

/**
 * Blacklists or whitelists a customer
 */
export async function toggleBlacklist(id: string, isBlacklisted: boolean, reason?: string) {
  const customer = await prisma.customer.update({
    where: { id },
    data: {
      isBlacklisted,
      blacklistReason: reason || null
    }
  });

  revalidatePath(`/dashboard/customers/${id}`);
  return customer;
}
