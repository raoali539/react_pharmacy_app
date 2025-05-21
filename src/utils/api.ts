import { store } from "@/redux";
import { getRoomKeys } from "@/redux/actions/roomService";
import * as Sentry from "@sentry/react-native";

/**
 * Checks if a given URL points to a valid image resource.
 *
 * This function sends a `HEAD` request to the URL to verify its availability
 * and checks if the `Content-Type` header indicates an image MIME type.
 *
 * @param {string} url - The URL to check.
 * @returns {Promise<boolean>} - Resolves to `true` if the URL points to a valid image, otherwise `false`.
 * @example
 * const isValidImage = await checkImageURL("https://example.com/image.jpg");
 * console.log(isValidImage); // true or false
 */
export const checkImageURL = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });

    // Return false if the response is not successful
    if (!response.ok) return false;

    // Check if the Content-Type header indicates an image MIME type
    const contentType = response.headers.get("Content-Type");
    return contentType?.startsWith("image/") ?? false;
  } catch (error) {
    // Return false in case of any errors (e.g., network issues, invalid URL)
    return false;
  }
};

export const deleteKey = () => {
  try {
    // Dispatch getRoomKeys action with the desired parameters
    store.dispatch(getRoomKeys({ limit: 10, page: 1 }));
  } catch (error) {
    console.error("Error dispatching deleteKey action:", error);
    Sentry.captureException(error);
  }
};
