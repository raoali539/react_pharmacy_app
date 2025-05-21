import { Platform, UIManager } from "react-native";

/**
 * Configures Android-specific features like enabling layout animations.
 * This function is specifically designed to make use of Android's platform-specific capabilities.
 */
export const configureAndroid = () => {
  // Check if the current platform is Android and if the `setLayoutAnimationEnabledExperimental` function is available
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    // Enable layout animations for Android
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};
