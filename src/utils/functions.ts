/**
 * Formats a date object into a readable string in the format "Day, Mon DD".
 *
 * @param {Date} date - The date object to format.
 * @returns {string} A formatted string representing the date (e.g., "Tue, Nov 21").
 */
export const formatDate = (date: Date): string => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Retrieve the components of the date
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  // Construct and return the formatted date string
  return `${dayOfWeek}, ${month} ${dayOfMonth}`;
};

/**
 * Converts a price from one currency to another using exchange rates.
 *
 * @param {number} localPrice - The price in the local currency.
 * @param {string} localCurrency - The ISO code of the local currency (e.g., "USD", "EUR").
 * @param {string} preferredCurrency - The ISO code of the preferred currency to convert to.
 * @param {Record<string, number>} rates - An object containing exchange rates where the keys are currency ISO codes and values are their rates relative to a base currency.
 * @returns {number} The converted price rounded to 2 decimal places. If conversion cannot be performed, returns the original local price.
 */
export const convertPrice = (
  localPrice: number,
  localCurrency: string,
  preferredCurrency: string,
  rates: Record<string, number>,
): number => {
  // Validate input values
  if (
    !localPrice ||
    !localCurrency ||
    !rates[localCurrency] ||
    !rates[preferredCurrency]
  ) {
    console.error(
      `Exchange rates not found for ${localPrice} ${localCurrency || "undefined"} or ${preferredCurrency}`,
    );
    return localPrice; // Fallback: return local price if conversion is not possible
  }

  // Calculate the conversion rate and converted price
  const rate = rates[preferredCurrency] / rates[localCurrency];
  const convertedPrice = localPrice * rate;

  // Return the converted price, rounded to 2 decimal places
  return parseFloat(convertedPrice.toFixed(2));
};
