import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";

/**
 * Verifies the OTP and creates a session
 */
export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, otp } = await req.json();
    if (!phoneNumber || !otp) return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });

    // 1. Find valid session
    const session = await prisma.otpSession.findFirst({
      where: {
        phoneNumber,
        otp,
        verified: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!session) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 });
    }

    // 2. Mark as verified
    await prisma.otpSession.update({
      where: { id: session.id },
      data: { verified: true }
    });

    // 3. Find/Create User (Merchant or Customer)
    // For MVP, we'll check if a merchant exists with this phone
    const merchant = await prisma.merchant.findUnique({ where: { phoneNumber } });
    const customer = await prisma.customer.findFirst({ where: { phoneNumber } });

    const role = merchant ? "MERCHANT" : customer ? "CUSTOMER" : "GUEST";
    const redirectTo = role === "MERCHANT" ? "/dashboard" : role === "CUSTOMER" ? "/me" : "/register";

    // 4. Create JWT (Mocked for now)
    const token = "mock_jwt_token_" + Math.random().toString(36).substr(2, 9);

    return NextResponse.json({ 
      success: true, 
      token, 
      role, 
      redirectTo,
      user: merchant || customer || { phoneNumber }
    });

  } catch (error) {
    console.error("[OTP VERIFY] Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
