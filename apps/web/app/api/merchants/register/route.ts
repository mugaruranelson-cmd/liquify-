import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { MerchantRegistrationSchema as registrationSchema } from "@repo/validation";

/**
 * Registers a new Merchant and their Shop
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validate input
    const validatedData = registrationSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json({ error: "Invalid data", details: validatedData.error.format() }, { status: 400 });
    }

    const { shopName, phoneNumber, ownerName, location, plan } = validatedData.data;

    // 2. Check if merchant already exists
    const existing = await prisma.merchant.findUnique({ where: { phoneNumber } });
    if (existing) {
      return NextResponse.json({ error: "Merchant with this phone number already exists" }, { status: 409 });
    }

    // 3. Create Merchant and StaffMember (Owner) in a transaction
    const result = await prisma.$transaction(async (tx: any) => {
      const merchant = await tx.merchant.create({
        data: {
          shopName,
          phoneNumber,
          ownerName,
          location,
          plan: (plan as any) || 'FREE',
          status: 'ACTIVE', // Auto-activate for MVP
        }
      });

      const staff = await tx.staffMember.create({
        data: {
          merchantId: merchant.id,
          fullName: ownerName,
          phoneNumber: phoneNumber,
          role: 'OWNER',
        }
      });

      return { merchant, staff };
    });

    return NextResponse.json({ success: true, merchantId: result.merchant.id });

  } catch (error) {
    console.error("[MERCHANT REGISTER] Error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
