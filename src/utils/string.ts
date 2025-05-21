/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} - The string with the first letter capitalized and the rest in lowercase.
 * @example
 * capitalizeFirstLetter("hello world"); // "Hello world"
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Normalizes a string by:
 * 1. Removing all double quotes (`"`).
 * 2. Adding spaces before uppercase letters (e.g., "camelCase" becomes "camel Case").
 * 3. Converting the entire string to lowercase.
 *
 * @param {string} str - The string to be normalized.
 * @returns {string} - The normalized string.
 * @example
 * normalizeString('Hello"World"'); // "hello world"
 * normalizeString('camelCase');   // "camel case"
 */
export const normalizeString = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/"/g, "") // Remove double quotes
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .toLowerCase(); // Convert to lowercase
};
