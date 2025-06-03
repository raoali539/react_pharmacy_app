import { StyleSheet, Platform } from "react-native";
import theme from "./theme";
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from "../utils/globalFunctions";

export const commonStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: theme.background,
  },
  screenInnerContainer: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  flexRow_CenterItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: theme.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  transparent: {
    backgroundColor: "transparent",
  },
  text: {
    color: theme.text,
  },
  textLight: {
    color: theme.textLight,
  },
  textMuted: {
    color: theme.textMuted,
  },
});
