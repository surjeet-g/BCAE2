import { StyleSheet } from "react-native";
import theme from "../themeConfig";

export const ICON_STYLE = { width: 30, height: 30 };
export const navBar = StyleSheet.create({
  navRightCon: {
    flexDirection: "row",
    marginRight: 15,
  },
  divider: {
    width: 5,
    height: 1,
  },
  roundIcon: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    borderWidth: 0.5,
    borderColor: theme.colors.inverseSecondary,
  },
});
