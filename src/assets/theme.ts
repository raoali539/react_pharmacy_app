import { color } from "@rneui/base";
import { fonts } from "../utils/typography";
import { Platform } from "react-native";

const theme = {
  // Primary Colors
  primary: '#2563EB', // Rich blue
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',
  primaryAlpha: {
    5: '#2563EB0D',
    10: '#2563EB1A',
    15: '#2563EB26',
    20: '#2563EB33',
  },

  // Secondary Colors
  secondary: '#10B981', // Emerald green
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  secondaryAlpha: {
    5: '#10B9810D',
    10: '#10B9811A',
    15: '#10B98126',
    20: '#10B98133',
  },

  // Accent Colors
  accent: '#8B5CF6', // Purple
  accentLight: '#A78BFA',
  accentDark: '#7C3AED',
  accentAlpha: {
    5: '#8B5CF60D',
    10: '#8B5CF61A',
    15: '#8B5CF626',
    20: '#8B5CF633',
  },

  // Neutral Colors
  background: '#FFF',
  surface: '#FFFFFF',
  surfaceHover: '#F1F5F9',
  surfaceActive: '#E2E8F0',
  text: '#5A5A5A',
  textLight: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  divider: '#F1F5F9',

  // Status Colors
  success: '#22C55E',
  successLight: '#4ADE80',
  successDark: '#16A34A',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',
  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',
  info: '#3B82F6',
  infoLight: '#60A5FA',
  infoDark: '#2563EB',

  // Typography
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Spacing
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    base: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },

  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },

  // Shadows
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
    base: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
    md: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
    lg: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
    xl: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },

  // Animation Durations
  animation: {
    fast: 200,
    normal: 300,
    slow: 500,
  },

  // Z-Index
  zIndex: {
    base: 0,
    drawer: 1000,
    modal: 1100,
    toast: 1200,
    tooltip: 1300,
  },
};

export default theme;

export const TYPOGRAPHY_STYLES = {
  // Display styles
  display1: {
    fontFamily: fonts.BOLD,
    fontSize: theme.fontSizes['5xl'],
    lineHeight: theme.fontSizes['5xl'] * 1.2,
    letterSpacing: -0.5,
  },
  display2: {
    fontFamily: fonts.BOLD,
    fontSize: theme.fontSizes['4xl'],
    lineHeight: theme.fontSizes['4xl'] * 1.2,
    letterSpacing: -0.5,
  },
  
  // Heading styles
  h1: {
    fontFamily: fonts.BOLD,
    fontSize: theme.fontSizes['3xl'],
    lineHeight: theme.fontSizes['3xl'] * 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fonts.BOLD,
    fontSize: theme.fontSizes['2xl'],
    lineHeight: theme.fontSizes['2xl'] * 1.2,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: fonts.BOLD,
    fontSize: theme.fontSizes.xl,
    lineHeight: theme.fontSizes.xl * 1.2,
    letterSpacing: -0.25,
  },
  h4: {
    fontFamily: fonts.BOLD,
    fontSize: theme.fontSizes.lg,
    lineHeight: theme.fontSizes.lg * 1.2,
    letterSpacing: -0.25,
  },
  
  // Body styles
  body1: {
    fontFamily: fonts.REGULAR,
    fontSize: theme.fontSizes.base,
    lineHeight: theme.fontSizes.base * 1.5,
    letterSpacing: 0.15,
  },
  body2: {
    fontFamily: fonts.REGULAR,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.fontSizes.sm * 1.5,
    letterSpacing: 0.15,
  },
  body3: {
    fontFamily: fonts.REGULAR,
    fontSize: theme.fontSizes.xs,
    lineHeight: theme.fontSizes.xs * 1.5,
    letterSpacing: 0.15,
  },
  
  // Label styles
  label1: {
    fontFamily: fonts.MEDIUM,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.fontSizes.sm * 1.4,
    letterSpacing: 0.1,
  },
  label2: {
    fontFamily: fonts.MEDIUM,
    fontSize: theme.fontSizes.xs,
    lineHeight: theme.fontSizes.xs * 1.4,
    letterSpacing: 0.1,
    color:'#5A5A5A'
  },
  
  // Button styles
  button1: {
    fontFamily: fonts.SEMIBOLD,
    fontSize: theme.fontSizes.base,
    lineHeight: theme.fontSizes.base * 1.5,
    letterSpacing: 0.1,
  },
  button2: {
    fontFamily: fonts.SEMIBOLD,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.fontSizes.sm * 1.5,
    letterSpacing: 0.1,
    color: theme.text,
  },
  
  // Special cases
  caption: {
    fontFamily: fonts.REGULAR,
    fontSize: theme.fontSizes.xs,
    lineHeight: theme.fontSizes.xs * 1.4,
    letterSpacing: 0.15,
  },
  price: {
    fontFamily: fonts.BOLD,
    fontSize: theme.fontSizes.xl,
    lineHeight: theme.fontSizes.xl * 1.2,
    letterSpacing: -0.25,
  },
  badge: {
    fontFamily: fonts.SEMIBOLD,
    fontSize: theme.fontSizes.xs,
    lineHeight: theme.fontSizes.xs,
    letterSpacing: 0.1,
  },
};

export type TypographyVariant = keyof typeof TYPOGRAPHY_STYLES;
