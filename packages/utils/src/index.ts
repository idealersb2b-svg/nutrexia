/**
 * Format a numeric amount to Indian Rupee (INR) currency string.
 * Example: 1499 -> "₹1,499"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculate per-serving economics.
 */
export function calculatePerServing(price: number, totalServings: number): number {
  if (totalServings <= 0) return 0;
  return Number((price / totalServings).toFixed(1));
}

/**
 * Calculate discount percentage from MRP and selling price.
 */
export function calculateDiscountPercent(mrp: number, price: number): number {
  if (mrp <= price || mrp <= 0) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
