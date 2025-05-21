import { Dimensions, PixelRatio, Platform } from "react-native";

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 895;

/**
 * Indicates whether the platform is iOS.
 * @type {boolean}
 */
export const IS_IOS = Platform.OS === "ios";

/**
 * Indicates whether the platform is Android.
 * @type {boolean}
 */
export const IS_ANDROID = Platform.OS === "android";

/**
 * The width of the device's screen in pixels.
 * @type {number}
 */
export const SCREEN_WIDTH = Dimensions.get("window").width;

/**
 * The height of the device's screen in pixels.
 * @type {number}
 */
export const SCREEN_HEIGHT = Dimensions.get("window").height;

/**
 * Indicates whether the device is a small-screen iPhone SE or similar.
 * @type {boolean}
 */
export const IS_SE = SCREEN_WIDTH <= 360;

/**
 * The scaling factor for width based on the guideline base width.
 * @type {number}
 */
const wScale = SCREEN_WIDTH / guidelineBaseWidth;

/**
 * The scaling factor for height based on the guideline base height.
 * @type {number}
 */
const hScale = SCREEN_HEIGHT / guidelineBaseHeight;

/**
 * Determines the platform-specific size for iOS devices.
 * For Android devices, it always returns the `medium` size.
 * For iOS, it checks the screen height to decide between `medium` and `large`.
 * @param {number} medium - The size to return for medium-sized screens or Android.
 * @param {number} large - The size to return for large iOS screens.
 * @returns {number} The size based on platform and screen height.
 */
export const defineIosPlatformSize = (
  medium: number,
  large: number,
): number => {
  const isMajorScreen = SCREEN_HEIGHT >= 800;

  if (IS_ANDROID) {
    return medium;
  }

  if (isMajorScreen) {
    return large;
  }

  return medium;
};

/**
 * Normalizes a size value based on the specified dimension (`width` or `height`).
 * @param {number} size - The size value to normalize.
 * @param {"width" | "height"} [based="width"] - The dimension to base the normalization on.
 * @returns {number} The normalized size rounded to the nearest pixel.
 */
export function normalize(
  size: number,
  based: "width" | "height" = "width",
): number {
  const newSize = based === "height" ? size * hScale : size * wScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * A CSS shorthand for filling an element absolutely within its container.
 */
export const ABSOLUTE_FILL = `    
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

/**
 * Common alignment values for flexbox layouts.
 */
export const ALIGNMENT = {
  start: "flex-start", // Align items at the start of the container.
  end: "flex-end", // Align items at the end of the container.
  center: "center", // Align items at the center of the container.
  between: "space-between", // Distribute items with space between them.
  stretch: "stretch", // Stretch items to fill the container.
  around: "space-around", // Distribute items with space around them.
  evenly: "space-evenly", // Distribute items with equal space between and around.
};

/**
 * Keys for specifying directional properties in styles.
 */
export const DIRECTION_KEYS = {
  top: "top",
  left: "left",
  bottom: "bottom",
  right: "right",
};

/**
 * Normalizes a size value for the X axis.
 * @param {number} size - The size value to normalize.
 * @returns {number} The normalized size.
 */
export const nx = (size: number): number => normalize(size);

/**
 * Normalizes a size value for the Y axis.
 * @param {number} size - The size value to normalize.
 * @returns {number} The normalized size.
 */
export const ny = (size: number): number => normalize(size, "height");

/**
 * Generates a CSS string for `width`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `width`.
 */
export const width = (size: number): string => `
width: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for `height`.
 * @param {number} size - The size value to normalize.
 * @param {"width" | "height"} [based="width"] - The dimension to base normalization on.
 * @returns {string} CSS string for `height`.
 */
export const height = (
  size: number,
  based: "width" | "height" = "width",
): string => `
height: ${normalize(size, based)}px;
`;

/**
 * Generates a CSS string for `max-height`.
 * @param {number} size - The size value to normalize.
 * @param {"width" | "height"} [based="width"] - The dimension to base normalization on.
 * @returns {string} CSS string for `max-height`.
 */
export const maxHeight = (
  size: number,
  based: "width" | "height" = "width",
): string => `
max-height: ${normalize(size, based)}px;
`;

/**
 * Generates a CSS string for `max-width`.
 * @param {number} size - The size value to normalize.
 * @param {"width" | "height"} [based="width"] - The dimension to base normalization on.
 * @returns {string} CSS string for `max-width`.
 */
export const maxWidth = (
  size: number,
  based: "width" | "height" = "width",
): string => `
max-width: ${normalize(size, based)}px;
`;

/**
 * Generates a CSS string for `font-size`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `font-size`.
 */
export const fz = (size: number): string => `
font-size: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for `line-height`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `line-height`.
 */
export const lineHeight = (size: number): string => `
line-height: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for `margin-top`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `margin-top`.
 */
export const mt = (size: number): string => `
margin-top: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for `margin-left`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `margin-left`.
 */
export const ml = (size: number): string => `
margin-left: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for `margin-bottom`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `margin-bottom`.
 */
export const mb = (size: number): string => `
margin-bottom: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for `margin-right`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `margin-right`.
 */
export const mr = (size: number): string => `
margin-right: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for horizontal margin (`margin-left` and `margin-right`).
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for horizontal margin.
 */
export const mx = (size: number): string => `
margin-right: ${normalize(size)}px;
margin-left: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for vertical margin (`margin-top` and `margin-bottom`).
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for vertical margin.
 */
export const my = (size: number): string => `
margin-top: ${normalize(size, "height")}px;
margin-bottom: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for margin on all sides.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for all-side margin.
 */
export const m = (size: number): string => `
margin-top: ${normalize(size, "height")}px;
margin-right: ${normalize(size)}px;
margin-bottom: ${normalize(size, "height")}px;
margin-left: ${normalize(size)}px;
`;

/**
 * A map of margin utility functions for various directions.
 * Each function takes a size and returns the corresponding margin CSS.
 */
export const MARGINS_MAP = {
  mt: (size: number) => mt(size), // Margin-top
  mr: (size: number) => mr(size), // Margin-right
  mb: (size: number) => mb(size), // Margin-bottom
  ml: (size: number) => ml(size), // Margin-left
  mx: (size: number) => mx(size), // Margin-horizontal (left and right)
  my: (size: number) => my(size), // Margin-vertical (top and bottom)
  m: (size: number) => m(size), // Margin-all sides
};

/**
 * Generates a CSS string for `padding-top`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `padding-top`.
 */
export const pt = (size: number): string => `
padding-top: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for `padding-left`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `padding-left`.
 */
export const pl = (size: number): string => `
padding-left: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for `padding-bottom`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `padding-bottom`.
 */
export const pb = (size: number): string => `
padding-bottom: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for `padding-right`.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for `padding-right`.
 */
export const pr = (size: number): string => `
padding-right: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for horizontal padding (`padding-left` and `padding-right`).
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for horizontal padding.
 */
export const px = (size: number): string => `
padding-right: ${normalize(size)}px;
padding-left: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for vertical padding (`padding-top` and `padding-bottom`).
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for vertical padding.
 */
export const py = (size: number): string => `
padding-top: ${normalize(size, "height")}px;
padding-bottom: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for padding on all sides.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for all-side padding.
 */
export const p = (size: number): string => `
padding-top: ${normalize(size, "height")}px;
padding-right: ${normalize(size)}px;
padding-bottom: ${normalize(size, "height")}px;
padding-left: ${normalize(size)}px;
`;

/**
 * A map of padding utility functions for various directions.
 * Each function takes a size and returns the corresponding padding CSS.
 */
export const PADDINGS_MAP = {
  pt: (size: number) => pt(size), // Padding-top
  pr: (size: number) => pr(size), // Padding-right
  pb: (size: number) => pb(size), // Padding-bottom
  pl: (size: number) => pl(size), // Padding-left
  px: (size: number) => px(size), // Padding-horizontal (left and right)
  py: (size: number) => py(size), // Padding-vertical (top and bottom)
  p: (size: number) => p(size), // Padding-all sides
};

/**
 * Generates a CSS string for the `top` property.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for the `top` property.
 */
export const top = (size: number): string => `
top: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for the `right` property.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for the `right` property.
 */
export const right = (size: number): string => `
right: ${normalize(size)}px;
`;

/**
 * Generates a CSS string for the `bottom` property.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for the `bottom` property.
 */
export const bottom = (size: number): string => `
bottom: ${normalize(size, "height")}px;
`;

/**
 * Generates a CSS string for the `left` property.
 * @param {number} size - The size value to normalize.
 * @returns {string} CSS string for the `left` property.
 */
export const left = (size: number): string => `
left: ${normalize(size)}px;
`;
