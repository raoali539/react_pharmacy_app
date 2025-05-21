
  import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "../../utils/globalFunctions";
  
  export const styles = StyleSheet.create({
    tabBar: {
      flexDirection: "row",
      position: "relative",
      justifyContent: "space-between",
      height:
        Platform.OS === "android"
          ? heightPercentageToDP(8.2)
          : heightPercentageToDP(9.5),
      backgroundColor: "#fff",
      paddingTop: 20,
      ...Platform.select({
        ios: {
          // shadowColor: "#000",
          // shadowOffset: { width: 0, height: -1 },
          // shadowOpacity: 0.05,
          // shadowRadius: 1.84,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    tabButton: {
      flex: 1,
      alignItems: "center",
    },
    middleButton: {
      top: heightPercentageToDP(2),
    },
    firstButton: {
      paddingLeft: widthPercentageToDP(3),
    },
    lastButton: {
      paddingRight: widthPercentageToDP(3),
    },
    icon: {
      marginTop: 5,
    },
  });
  