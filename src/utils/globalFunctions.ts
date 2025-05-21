import { PixelRatio } from "react-native";
import { screenHeight, screenWidth } from "./globalConstants";

/**
 * Converts a width percentage to device-independent pixels.
 * @param {number} widthPercent - The percentage of the screen's width.
 * @returns {number} - The width in device-independent pixels.
 */
export const widthPercentageToDP = (widthPercent: number) =>
  PixelRatio.roundToNearestPixel((screenWidth * widthPercent) / 100);

/**
 * Converts a height percentage to device-independent pixels.
 * @param {number} heightPercent - The percentage of the screen's height.
 * @returns {number} - The height in device-independent pixels.
 */
export const heightPercentageToDP = (heightPercent: number) =>
  PixelRatio.roundToNearestPixel((screenHeight * heightPercent) / 100);

/**
 * Scales a font size based on the device's font scale settings.
 * @param {number} size - The original font size.
 * @returns {number} - The scaled font size.
 */
export const getScaledFontSize = (size: number) =>
  size / PixelRatio.getFontScale();

/**
 * Converts a distance from meters to miles.
 * @param {number} meters - The distance in meters.
 * @returns {string} - The distance in miles, rounded to two decimal places.
 */
export const metersToMiles = (meters: number) =>
  (meters * 0.000621371).toFixed(2);

/**
 * Checks the strength of a password based on specific criteria:
 * - At least one digit.
 * - At least one special character.
 * - At least one lowercase letter.
 * - At least one uppercase letter.
 * - Minimum of 8 characters in length.
 * @param {string} password - The password string to check.
 * @returns {boolean} - `true` if the password meets the criteria, otherwise `false`.
 */
export const checkPasswordStrength = (password: string) =>
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
