import { View, Text, Image } from "react-native";
import React from "react";

const FileName = (props) => {
  const { filename } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 20,
        margin: 5,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: 15,
          width: 15,
        }}
        source={require("../Assets/icons/attachment.png")}
      />
      <Text
        style={{
          color: "#202223",
          fontWeight: 600,
          fontSize: 14,
          marginLeft: 10,
        }}
      >
        {filename}
      </Text>
    </View>
  );
};

export default FileName;
