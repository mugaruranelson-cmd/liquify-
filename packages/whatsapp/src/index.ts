/**
 * Liquify WhatsApp Business API Wrapper
 */

export interface WhatsAppTemplate {
  name: string;
  variables: (string | number)[];
}

export interface WhatsAppConfig {
  apiUrl: string;
  apiToken: string;
  phoneId: string;
}

/**
 * Sends a pre-approved WhatsApp template to a customer
 */
export async function sendWhatsAppTemplate(
  to: string, // 2547XXXXXXXX
  template: WhatsAppTemplate,
  config: WhatsAppConfig
) {
  console.log(`[WHATSAPP] Sending template '${template.name}' to ${to}`);
  
  // Real implementation would use fetch() to call the Meta Graph API:
  // POST /v19.0/{phoneId}/messages
  
  // Mock success response
  return {
    messaging_product: "whatsapp",
    contacts: [{ input: to, wa_id: to }],
    messages: [{ id: `wamid.HBgL${Math.random().toString(36).substr(2, 9)}` }]
  };
}

/**
 * Common Templates Keys (As defined in Antigravity Prompt)
 */
export const WHATSAPP_TEMPLATES = {
  WELCOME: "welcome_new_customer",
  CREDIT_ISSUED: "credit_issued",
  REMINDER_3D: "reminder_3d_before",
  REMINDER_1D: "reminder_1d_before",
  REMINDER_DUE: "reminder_due_today",
  OVERDUE_3D: "overdue_3d",
  OVERDUE_7D: "overdue_7d",
  PAYMENT_RECEIVED: "payment_received",
  SCORE_IMPROVED: "score_improved",
};
