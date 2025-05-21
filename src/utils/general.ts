import { Deal } from "@/types/entities/deals";
import { AuthError } from "@/types/entities/auth";
import { normalizeString } from "@/utils/string";
import { checkImageURL } from "./api";

/**
 * Retrieves an error message by its associated key.
 *
 * @param {AuthError[]} errors - Array of authentication errors.
 * @param {string} key - The key to search for in error contexts.
 * @returns {string | null} - The normalized error message if the key is found, otherwise `null`.
 */
export const getErrorMessage = (
  errors: AuthError[],
  key: string,
): string | null => {
  for (const error of errors) {
    if (error.context?.key === key) {
      return normalizeString(error.message);
    }
  }
  return null;
};

/**
 * Transforms an array of log data into a standardized format.
 *
 * @param {Array<any>} data - The raw log data to transform.
 * @returns {Array<any>} - The transformed log data.
 */
export const transformLogs = (data: Array<any>): Array<any> => {
  return data.map((log) => ({
    action: log.action,
    user: log.userName,
    date: log.sharedAt || new Date(),
    shared: "shared" in log ? true : null,
    _id: log._id,
  }));
};

/**
 * Preprocesses deal data by validating image URLs.
 *
 * @param {Deal[]} data - The array of deal objects to validate.
 * @returns {Promise<Deal[]>} - A promise resolving to an array of validated deals.
 */
export const preprocessDeals = async (data: Deal[]): Promise<Deal[]> => {
  const validDeals: Deal[] = [];

  for (const item of data) {
    if (item.mediaContent?.url) {
      const isValid = await checkImageURL(item.mediaContent.url);
      if (isValid) {
        validDeals.push(item);
      }
    }
  }

  return validDeals;
};

/**
 * Filters and reshapes deal data by restructuring validated objects.
 *
 * @param {Deal[]} validatedDeals - The array of already validated deal objects.
 * @returns {Array<any>} - An array of reshaped deal objects.
 */
export const filterAndReshapeDeals = (validatedDeals: Deal[]): Array<any> => {
  return validatedDeals.map((item) => ({
    id: item._id,
    name: item.title,
    avatarSource: { uri: item.mediaContent?.url },
    stories: [{ id: item._id, source: { uri: item.mediaContent?.url } }],
  }));
};

/**
 * Preprocesses and reshapes deal data by validating image URLs and restructuring objects.
 *
 * @param {Deal[]} data - The array of deal objects to process.
 * @returns {Promise<Array<any>>} - A promise resolving to an array of reshaped valid deals.
 */
export const preprocessAndReshapeDeals = async (
  data: Deal[],
): Promise<Array<any>> => {
  // First, validate the deals asynchronously
  const validatedDeals = await preprocessDeals(data);

  // Then, reshape the validated deals synchronously
  return filterAndReshapeDeals(validatedDeals);
};

export const calculateDiscountedPricePerNight = (
  basePrice: any,
  discount: number,
) => {
  return basePrice - basePrice * (discount / 100);
};
