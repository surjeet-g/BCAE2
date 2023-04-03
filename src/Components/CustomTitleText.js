import { View, Text } from "react-native";
import React from "react";

const CustomTitleText = ({ title, textStyle }) => {
  return (
    <Text
      style={{
        paddingHorizontal: 10,
        marginTop: 10,
        fontSize: 18,
        fontWeight: 600,
        color: "#000",
        ...textStyle,
      }}
    >
      {title}
    </Text>
  );
};

export default CustomTitleText;
