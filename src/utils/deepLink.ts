// Function to parse a deep link URL for 'smrtbooking://reset/'
export const parseDeepLink = (url: string) => {
  // Check if the URL starts with 'smrtbooking://reset/'
  if (url.startsWith("smrtbooking://reset/")) {
    // Extract the token from the URL by splitting it at 'smrtbooking://reset/'
    const token = url.split("smrtbooking://reset/")[1];
    return { token }; // Return an object containing the token
  }
  return {}; // If the URL does not match, return an empty object
};
