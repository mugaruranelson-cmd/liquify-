// packages/ui/src/utils/formatKES.ts
export function formatKES(cents: number): string {
  return `KES ${(cents / 100).toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}
// Example: formatKES(250000) → "KES 2,500"
// All amounts in DB are stored as integers (cents × 100)
