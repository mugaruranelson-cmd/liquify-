import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { validateCallback } from "@repo/mpesa";
import { calculateLiquifyScore, getTierFromScore } from "@repo/scoring";

/**
 * Safaricom M-Pesa Callback Webhook
 * This endpoint is called by Safaricom once a transaction is completed.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[MPESA CALLBACK] Received:", JSON.stringify(body, null, 2));

    const validation = validateCallback(body);

    if (!validation.success) {
      console.error("[MPESA CALLBACK] Transaction failed:", validation.error);
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" }); // Safaricom expects 200/Accepted even on business failure
    }

    // Extraction from validation result (Mocked in the package but structure is real)
    const { mpesaCode, amount } = validation;
    
    // In a real STK Push, we'd use CheckoutRequestID to find the pending transaction
    const checkoutRequestId = body.Body.stkCallback.CheckoutRequestID;

    // 1. Find the pending transaction
    const pendingTx = await prisma.transaction.findFirst({
      where: { 
        mpesaRef: checkoutRequestId, // We store CheckoutRequestID temporarily in mpesaRef or a new field
        status: 'PENDING' 
      }
    });

    if (!pendingTx) {
      console.warn("[MPESA CALLBACK] No matching pending transaction found for:", checkoutRequestId);
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    // 2. Atomic Update: Mark transaction as COMPLETED and update Customer Balance
    await prisma.$transaction(async (tx: any) => {
      await tx.transaction.update({
        where: { id: pendingTx.id },
        data: {
          status: 'COMPLETED',
          mpesaRef: mpesaCode, // Replace CheckoutRequestID with real M-Pesa Receipt
          amount: amount // Update with actual amount paid if different
        }
      });

      await tx.customer.update({
        where: { id: pendingTx.customerId },
        data: {
          outstandingBalance: { decrement: amount },
          lastVisitAt: new Date()
        }
      });

      // 3. Update Liquify Score
      const newScore = calculateLiquifyScore({
        repaymentRate: 100,
        consistencyScore: 85,
        frequencyScore: 75,
        recencyScore: 100,
        penalties: 0
      });

      await tx.customer.update({
        where: { id: pendingTx.customerId },
        data: {
          liquifyScore: newScore,
          creditTier: getTierFromScore(newScore)
        }
      });
      
      // 4. Record Score Event
      await tx.scoreEvent.create({
        data: {
          customerId: pendingTx.customerId,
          scoreBefore: 0, // Simplified for MVP
          scoreAfter: newScore,
          delta: 5,
          reason: "mpesa_payment_ontime"
        }
      });
    });

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });

  } catch (error) {
    console.error("[MPESA CALLBACK] Error processing webhook:", error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Internal Server Error" }, { status: 500 });
  }
}
