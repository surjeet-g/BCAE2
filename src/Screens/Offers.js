import React from "react";
import { Text, View } from "react-native";

const Offers = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", }}>
      <Text
        style={{
          color: "#F5AD47",
          fontSize: 20,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Coming Soon!!! {"\n"} I am under development
      </Text>
    </View>
  );
};

export default Offers;
