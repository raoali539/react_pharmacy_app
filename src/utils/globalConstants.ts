import { Dimensions } from "react-native";

/**
 * Retrieves the height of the device screen.
 */
export const screenHeight: number = Dimensions.get("screen").height;

/**
 * Retrieves the width of the device screen.
 */
export const screenWidth: number = Dimensions.get("screen").width;

/**
 * Represents the default app rating data with empty star icons.
 * Each object contains the name of the icon to be rendered.
 */
export const appRatingData: Array<{ name: string }> = Array(5).fill({
  name: "star-o",
});
