import { z } from 'zod';

export const PhoneSchema = z.string().regex(/^(?:254|\+254|0)?(7|1)\d{8}$/, 'Invalid Kenyan phone number');

export const AuthRequestSchema = z.object({
  phoneNumber: PhoneSchema,
});

export const VerifyOtpRequestSchema = z.object({
  phoneNumber: PhoneSchema,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const MerchantRegistrationSchema = z.object({
  shopName: z.string().min(2, 'Shop name is too short'),
  phoneNumber: PhoneSchema,
  ownerName: z.string().min(2, 'Owner name is too short'),
  location: z.string().min(2, 'Location is too short'),
  plan: z.enum(['FREE', 'GROWTH', 'PRO']).optional(),
});
