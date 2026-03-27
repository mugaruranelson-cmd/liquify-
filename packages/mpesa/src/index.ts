/**
 * Liquify M-Pesa (Daraja API) SDK Wrapper
 */

export interface StkPushParams {
  phoneNumber: string; // 2547XXXXXXXX
  amount: number;      // KES
  accountRef: string;  // Usually Customer ID
  transactionDesc: string;
}

export interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  callbackUrl: string;
}

/**
 * Initiates an M-Pesa STK Push (Lipa na M-Pesa Online)
 */
export async function initiateStkPush(params: StkPushParams, config: MpesaConfig) {
  // In a real implementation, we would first get an OAuth token from Safaricom
  // Then POST to the STK Push endpoint: https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest
  
  console.log(`[MPESA] Initiating STK Push for ${params.phoneNumber} - Amount: ${params.amount}`);
  
  // Mocking the successful initiation
  return {
    ResponseCode: "0",
    ResponseDescription: "Success. Request accepted for processing",
    MerchantRequestID: `MR_${Math.random().toString(36).substr(2, 9)}`,
    CheckoutRequestID: `CR_${Math.random().toString(36).substr(2, 9)}`,
    CustomerMessage: "Success. Request accepted for processing"
  };
}

/**
 * Validates the M-Pesa Callback metadata
 */
export function validateCallback(callbackData: any) {
  const result = callbackData.Body.stkCallback;
  if (result.ResultCode === 0) {
    // Success
    const mpesaCode = result.CallbackMetadata.Item.find((item: any) => item.Name === "MpesaReceiptNumber")?.Value;
    const amount = result.CallbackMetadata.Item.find((item: any) => item.Name === "Amount")?.Value;
    return { success: true, mpesaCode, amount };
  }
  return { success: false, error: result.ResultDesc };
}

/**
 * Normalises phone numbers to 2547XXXXXXXX format
 */
export function normalisePhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) cleaned = "254" + cleaned.substring(1);
  if (cleaned.startsWith("7")) cleaned = "254" + cleaned;
  if (cleaned.startsWith("+")) cleaned = cleaned.substring(1);
  return cleaned;
}
