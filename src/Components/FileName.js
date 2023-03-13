import { View, Text, Image } from "react-native";
import React from "react";

const FileName = (props) => {
  const { filename } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "green",
        margin: 2,
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
        numberOfLines={2}
        ellipsizeMode={"tail"}
      >
        {filename}
      </Text>
    </View>
  );
};

export default FileName;
