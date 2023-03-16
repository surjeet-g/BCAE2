import React from "react";
import { StyleSheet, Image, View } from "react-native";

export const Processing = () => {
  return (
    <View style={styles.container}>
      <View style={{ width: 80, height: 80 }}>
        <Image source={require("../Assets/icons/processing.gif")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
