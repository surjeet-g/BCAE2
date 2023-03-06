import React from "react";
import { Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SHADOW_STYLE } from "../Utilities/themeConfig";
var { height, width } = Dimensions.get("screen");

export const StickyFooter = ({
  children,
  isSplash = false,
  isRegistertion = false,
  isLogin = false,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginTop: isRegistertion ? 0 : 0,
        padding: 12,
        paddingBottom: isRegistertion ? 40 : 0,
        position: isSplash || isRegistertion ? "absolute" : "relative",
        bottom: 0,
        left: isRegistertion ? -12 : 0,
        marginBottom: isSplash || isLogin ? 0 : 110,
        backgroundColor: colors.background,
        width: isRegistertion ? width : "100%",
      }}
    >
      {children}
    </View>
  );
};
