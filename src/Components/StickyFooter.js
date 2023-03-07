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
        padding: 12,
        position: isSplash ? "absolute" : "relative",
        bottom: 0,
        marginBottom: isSplash || isLogin ? 0 : 110,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </View>
  );
};
