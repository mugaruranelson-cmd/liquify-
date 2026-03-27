// packages/ui/src/utils/phone.ts
export function normalisePhone(input: string): string {
  // Accepts: 0712345678 | +254712345678 | 254712345678
  // Returns: 254712345678 (E.164 without +)
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('0')) return '254' + digits.slice(1);
  if (digits.startsWith('254')) return digits;
  return digits;
}

export function displayPhone(e164: string): string {
  // 254712345678 → 0712 345 678
  const local = '0' + e164.slice(3);
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
}
