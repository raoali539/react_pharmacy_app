import { StyleSheet } from "react-native";
import theme from "./theme";
import { widthPercentageToDP } from "@/utils/globalFunctions";

export const commonStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  screenInnerContainer: {
    flex: 1,
    padding: 20,
  },
  flexRow_CenterItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP(8),
  },
  transparent: {
    backgroundColor: "transparent",
  },
  blackText: {
    color: theme.black,
  },
});
