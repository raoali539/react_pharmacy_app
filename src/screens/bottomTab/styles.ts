import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../utils/globalFunctions";
import theme from "../../assets/theme";

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    height: Platform.OS === "android" ? hp(7.5) : hp(8.5),
    paddingHorizontal: wp(2),
    backgroundColor: theme.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...theme.shadows.lg,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1),
  },
  middleButton: {
    top: hp(-2),
    backgroundColor: theme.primary,
    borderRadius: 30,
    padding: wp(2),
    borderColor: theme.surface,
    borderWidth: 1,
    ...theme.shadows.base,
  },
  firstButton: {
    paddingLeft: wp(2),
  },
  lastButton: {
    paddingRight: wp(2),
  },
  icon: {
    marginTop: Platform.OS === "android" ? 2 : 3,
  },
  label: {
    ...theme.TYPOGRAPHY_STYLES.caption,
    marginTop: 2,
  },
  activeLabel: {
    color: theme.primary,
    fontWeight: '600',
  },
});
