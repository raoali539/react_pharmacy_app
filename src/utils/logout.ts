import { NavigationProp, StackActions } from "@react-navigation/native";
import routeNames from "@/constants/routeNames";
/**
 * Logs out the user by navigating to the Landing screen.
 * @param {NavigationProp<any>} navigation - The navigation object.
 */
export const logoutExpiration = async (navigation: NavigationProp<any>) => {
  try {
    await navigation.navigate(routeNames.LoginExpiration);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};