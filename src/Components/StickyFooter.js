import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useTheme } from "react-native-paper";
export const StickyFooter = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        paddingVertical: 12,
        position: "relative",
        bottom: 0,
        left: 0,
        backgroundColor: colors.background,
        width: "100%",
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
