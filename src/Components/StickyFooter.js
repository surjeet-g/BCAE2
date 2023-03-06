import React from "react";
import { Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
var { height, width } = Dimensions.get("screen");
export const StickyFooter = ({ children, isRegistertion = false }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginTop: isRegistertion ? 10 : 0,
        padding: 12,
        paddingBottom: isRegistertion ? 40 : 0,
        position: isRegistertion ? "absolute" : "relative",
        bottom: 0,
        left: isRegistertion ? -12 : 0,

        backgroundColor: colors.background,
        width: isRegistertion ? width : "auto",

        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
      }}
    >
      {children}
    </View>
  );
};
