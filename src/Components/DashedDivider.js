import { View, Text } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";

const DashedDivider = () => {
  return (
    <Divider
      style={{
        borderWidth: 1,
        borderColor: "#8E8F95",
        borderStyle: "dashed",
      }}
    />
  );
};

export default DashedDivider;
