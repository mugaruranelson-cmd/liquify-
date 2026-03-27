import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { sendSms } from "@repo/sms";

/**
 * Sends a 6-digit OTP to the user's phone
 */
export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();
    if (!phoneNumber) return NextResponse.json({ error: "Phone number required" }, { status: 400 });

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // 2. Store in DB (OtpSession)
    // In real app, we would hash the OTP
    await prisma.otpSession.create({
      data: {
        phoneNumber,
        otp, // Should be hashed
        expiresAt,
      }
    });

    // 3. Send via SMS
    await sendSms(
      { to: phoneNumber, message: `Your Liquify login code is: ${otp}. Valid for 10 minutes.` },
      { apiKey: "mock", userName: "mock", senderId: "LIQUIFY" }
    );

    return NextResponse.json({ success: true, message: "OTP sent" });

  } catch (error) {
    console.error("[OTP SEND] Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
