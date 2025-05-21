import * as Sentry from "@sentry/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SENTRY_DSN } from "@/constants";

/**
 * Initializes Sentry for error tracking and performance monitoring.
 *
 * This function fetches the user information from AsyncStorage and attaches the user ID
 * to Sentry for better tracking of errors associated with specific users.
 *
 * @async
 * @function
 * @returns {Promise<void>} - Resolves when Sentry is successfully initialized.
 * @example
 * await initSentry();
 */
export const initSentry = async (): Promise<void> => {
  try {
    // Retrieve user data from AsyncStorage
    const user = await AsyncStorage.getItem("user");
    const userId = user ? JSON.parse(user)?.account?._id : null;

    // Initialize Sentry with DSN and configuration
    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 1.0, // Adjust the sampling rate as per your needs
      integrations: [Sentry.mobileReplayIntegration()],
    });

    // Set user context if a user ID is available
    if (userId) {
      Sentry.setUser({ id: userId });
    }
  } catch (error) {
    console.error("Error initializing Sentry:", error);
  }
};
