import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding initial shop data...')

  // 1. Create Merchant
  const merchant = await prisma.merchant.upsert({
    where: { phoneNumber: '0712345678' },
    update: {},
    create: {
      id: 'merchant_mock_123',
      shopName: 'Kamau Shop',
      phoneNumber: '0712345678',
      ownerName: 'James Kamau',
      location: 'Kasarani, Nairobi',
      plan: 'FREE',
      status: 'ACTIVE',
      defaultCreditLimit: 5000,
      repaymentDays: 30,
      riskTolerance: 'BALANCED',
    },
  })

  // 2. Create Staff Member (Owner)
  await prisma.staffMember.upsert({
    where: { id: 'staff_owner_123' },
    update: {},
    create: {
      id: 'staff_owner_123',
      merchantId: merchant.id,
      fullName: 'James Kamau',
      phoneNumber: '0712345678',
      role: 'OWNER',
    },
  })

  // 3. Create Customers
  const customers = [
    {
      fullName: 'Wanjiku Kamau',
      phoneNumber: '0711222333',
      liquifyScore: 85,
      creditTier: 'PLATINUM',
      creditLimit: 10000,
      outstandingBalance: 250000, // KES 2500.00
    },
    {
      fullName: 'John Musyoka',
      phoneNumber: '0722333444',
      liquifyScore: 45,
      creditTier: 'SILVER',
      creditLimit: 3000,
      outstandingBalance: 120000, // KES 1200.00
    },
    {
      fullName: 'Mary Atieno',
      phoneNumber: '0733444555',
      liquifyScore: 12,
      creditTier: 'BRONZE',
      creditLimit: 1000,
      outstandingBalance: 55000, // KES 550.00
    }
  ]

  for (const c of customers) {
    await prisma.customer.upsert({
      where: { merchantId_phoneNumber: { merchantId: merchant.id, phoneNumber: c.phoneNumber } },
      update: {},
      create: {
        merchantId: merchant.id,
        ...c,
      },
    })
  }

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
