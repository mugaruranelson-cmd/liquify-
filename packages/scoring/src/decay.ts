import { prisma } from "@repo/db";

/**
 * Score Decay Logic
 * This script is intended to be run nightly as a cron job.
 * It penalizes customers who have not visited in over 30 days.
 */
export async function runScoreDecay() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  console.log(`[DECAY] Starting score decay for customers inactive since ${thirtyDaysAgo.toISOString()}`);

  const inactiveCustomers = await prisma.customer.findMany({
    where: {
      lastVisitAt: { lt: thirtyDaysAgo },
      liquifyScore: { gt: 0 }
    }
  });

  for (const customer of inactiveCustomers) {
    const penalty = 2; // Fixed 2 point decay per month of inactivity
    const newScore = Math.max(0, customer.liquifyScore - penalty);
    
    await prisma.customer.update({
      where: { id: customer.id },
      data: { liquifyScore: newScore }
    });

    console.log(`[DECAY] Customer ${customer.id}: ${customer.liquifyScore} -> ${newScore}`);
  }

  console.log(`[DECAY] Finished. Processed ${inactiveCustomers.length} customers.`);
}
