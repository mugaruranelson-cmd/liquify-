import { prisma } from "@repo/db";

/**
 * Gets platform-wide performance metrics
 */
export async function getPlatformMetrics() {
  const [merchants, customers, transactions] = await Promise.all([
    prisma.merchant.count(),
    prisma.customer.count(),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'PAYMENT', status: 'COMPLETED' }
    })
  ]);

  return {
    merchants,
    customers,
    totalVolume: transactions._sum.amount || 0,
  };
}

/**
 * Gets monthly revenue / volume for charts
 */
export async function getMonthlyVolume() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const transactions = await prisma.transaction.findMany({
    where: {
      type: 'PAYMENT',
      status: 'COMPLETED',
      createdAt: { gte: sixMonthsAgo }
    },
    select: {
      amount: true,
      createdAt: true
    }
  });

  // Basic grouping by month (simplified for MVP)
  const volumeByMonth = transactions.reduce((acc: any, t: any) => {
    const month = t.createdAt.toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + (t.amount / 100); // In KES
    return acc;
  }, {});

  return Object.entries(volumeByMonth).map(([name, value]) => ({ name, value }));
}

/**
 * Gets risk distribution based on tiers
 */
export async function getRiskDistribution() {
  const tiers = ['PLATINUM', 'GOLD', 'SILVER', 'BRONZE'];
  const distribution = await Promise.all(
    tiers.map(async (tier) => ({
      name: tier,
      value: await prisma.customer.count({ where: { creditTier: tier } })
    }))
  );

  return distribution;
}
