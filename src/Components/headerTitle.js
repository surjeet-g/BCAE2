import React, { useEffect } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export const HeaderTitle = ({ header = "", subHeader = "" }) => {
  const { colors } = useTheme();
  return (
    <View>
      <Text
        variant="bodyMedium"
        style={{
          color: colors.background,
        }}
      >
        {header}
      </Text>
      <Text
        style={{
          marginTop: -6,
          color: colors.background,
        }}
        variant="headlineMedium"
      >
        {subHeader}
      </Text>
    </View>
  );
};
