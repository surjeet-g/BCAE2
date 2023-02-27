import React from "react";
import { View } from "react-native";

export const ClearSpace = ({ size = 1, isVertical = true }) => {
  if (isVertical) {
    return <View style={{ height: size * 5, width: 1 }} />;
  } else {
    <View style={{ height: 1, width: 4 * size }} />;
  }
};
