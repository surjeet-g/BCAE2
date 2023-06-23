import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
var { height } = Dimensions.get("window");

export const StickyFooter = ({
  children,
  isSplash = false,
  isAddlocation = false,
}) => {
  const { colors } = useTheme();
  const [enable, setEnable] = useState(true)
  return (
    <View

      style={{
        padding: isAddlocation ? 2 : 12,
        position: isSplash ? "absolute" : "relative",
        bottom: 0,
        backgroundColor: colors.background,
        width: "100%",
      }}
    >
      {enable && children}
    </View>
  );
};
