/**
 * Calculates the percentage progress based on a part and total.
 *
 * @param {number} part - The portion or completed value.
 * @param {number} total - The total or maximum value.
 * @returns {number} - The progress percentage, capped at 100%.
 * @example
 * const percentage = getProgressPercentage(50, 200);
 * console.log(percentage); // 25
 */
export const getProgressPercentage = (part: number, total: number): number => {
  if (total <= 0) {
    return part
  }

  const percentage = (part / total) * 100;
  return Math.min(percentage, 100);
};

/**
 * Calculates a discounted price based on the base price and discount percentage.
 *
 * @param {number} basePrice - The original price of the item.
 * @param {number} [discount=0] - The discount percentage (default is 0).
 * @returns {number} - The discounted price, rounded to two decimal places.
 * @example
 * const discountedPrice = calculateDiscountedPrice(100, 20);
 * console.log(discountedPrice); // 80.00
 */
export const calculateDiscountedPrice = (
  basePrice: number,
  discount: number = 0,
): number => {
  if (basePrice < 0 || discount < 0) {
    return parseFloat(basePrice.toFixed(2));
  }

  const discountedPrice = basePrice - basePrice * (discount / 100);
  return parseFloat(discountedPrice.toFixed(2));
};
