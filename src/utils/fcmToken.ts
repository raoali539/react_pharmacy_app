import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

/**
 * Stores the current Firebase Cloud Messaging (FCM) token in AsyncStorage.
 * If the token changes, it updates the stored token and registers it for the current user.
 */
export const storeFcmTokenInAsyncStorage = async (): Promise<void> => {
  try {
    // Retrieve the current FCM token
    const currentToken = await messaging().getToken();
    const storedToken = await AsyncStorage.getItem("fcmToken");
    const user = await AsyncStorage.getItem("user");

    console.log("currentToken = ", currentToken);

    // If the token has changed, update it in AsyncStorage
    if (storedToken !== currentToken) {
      await AsyncStorage.setItem("fcmToken", currentToken);
    }

    // Send the token to the backend for the logged-in user
    if (user) {
      const userId = JSON.parse(user)._id;
      if (userId) {
        await sendFcmTokenToBackendAfterLogin(userId);
      }
    }

    // Listen for token refresh and update AsyncStorage accordingly
    messaging().onTokenRefresh(async (newToken: string) => {
      try {
        await AsyncStorage.setItem("fcmToken", newToken);
      } catch (refreshError) {
        console.error("Error refreshing FCM Token:", refreshError);
      }
    });
  } catch (error) {
    console.error("Error storing FCM Token on app launch:", error);
  }
};

/**
 * Sends the FCM token to the backend after a user logs in.
 *
 * @param {string} userId - The unique ID of the logged-in user.
 */
export const sendFcmTokenToBackendAfterLogin = async (
  userId: string,
): Promise<void> => {
  try {
    const fcmToken = await AsyncStorage.getItem("fcmToken");

    // Ensure both FCM token and userId exist before proceeding
    if (!fcmToken || !userId) return;

    // Save the FCM token to the backend
    // await saveFcmToken();
  } catch (error) {
    console.error("Error sending FCM Token to backend after login:", error);
  }
};
