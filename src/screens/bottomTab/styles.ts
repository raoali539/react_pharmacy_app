import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "../../utils/globalFunctions";

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    height: Platform.OS === "android"
      ? heightPercentageToDP(7.5)
      : heightPercentageToDP(8.5),
    // backgroundColor: "red",
    paddingHorizontal: widthPercentageToDP(2),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: heightPercentageToDP(1),
    backgroundColor: 'transparent',
  },
  middleButton: {
    top: heightPercentageToDP(-2),
    backgroundColor: "#000",
    borderRadius: 30,
    padding: widthPercentageToDP(2),
    borderColor: "#fff",
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  firstButton: {
    paddingLeft: widthPercentageToDP(2),
  },
  lastButton: {
    paddingRight: widthPercentageToDP(2),
  },
  icon: {
    marginTop: Platform.OS === "android" ? 2 : 3,
    tintColor: "#fff"
  },
});
