import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  useTheme
} from "react-native-paper";
// import { Success } from "../Components/InteractionSuccess";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export const Playground = () => {
  useEffect(() => { }, []);

  const theme = useTheme();
  console.log("them", theme);

  return (
    <View style={styles.container}>
      {/* <Success></Success> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
