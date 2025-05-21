import { Platform } from "react-native";
import { Fonts, Size } from "@/types/utils/fonts";

/**
 * Font family mappings for the app.
 *
 * @constant
 * @type {Fonts}
 */
export const fonts: Fonts = {
  INTER: Platform.select({ ios: "Inter-Regular", android: "Inter-Regular" })!,
  BOLD: Platform.select({ ios: "Poppins-Bold", android: "Poppins-Bold" })!,
  LIGHT: Platform.select({ ios: "Poppins-Light", android: "Poppins-Light" })!,
  MEDIUM: Platform.select({
    ios: "Poppins-Medium",
    android: "Poppins-Medium",
  })!,
  REGULAR: Platform.select({
    ios: "Poppins-Regular",
    android: "Poppins-Regular",
  })!,
  SEMIBOLD: Platform.select({
    ios: "Poppins-SemiBold",
    android: "Poppins-SemiBold",
  })!,
};

/**
 * Standard font sizes for the app.
 *
 * @constant
 * @type {Size}
 */
export const size: Size = {
  extraSmall: 12,
  small: 14,
  med: 16,
  large: 18,
  extraLarge: 20,
};

export default { fonts, size };
