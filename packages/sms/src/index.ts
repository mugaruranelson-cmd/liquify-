/**
 * Liquify Africa's Talking (SMS) SDK Wrapper
 */

export interface SmsParams {
  to: string; // +254XXXXXXXXX
  message: string;
}

export interface SmsConfig {
  apiKey: string;
  userName: string;
  senderId: string;
}

/**
 * Sends an SMS via Africa's Talking
 */
export async function sendSms(params: SmsParams, config: SmsConfig) {
  console.log(`[SMS] Sending to ${params.to}: ${params.message}`);
  
  // Real implementation would use fetch() or the AT SDK:
  // POST https://api.africastalking.com/version1/messaging
  
  // Mock success response
  return {
    SMSMessageData: {
      Message: "Sent to 1/1 Total Cost: KES 0.8000",
      Recipients: [{
        number: params.to,
        cost: "KES 0.8000",
        status: "Success",
        messageId: `ATid_${Math.random().toString(36).substr(2, 9)}`
      }]
    }
  };
}

/**
 * Formats a message with variables
 */
export function formatMessage(template: string, vars: Record<string, string>): string {
  let msg = template;
  for (const [key, val] of Object.entries(vars)) {
    msg = msg.replace(new RegExp(`{{${key}}}`, 'g'), val);
  }
  return msg;
}
