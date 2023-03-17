import React, { useEffect } from "react";
import { StyleSheet, Platform, ScrollView, View, Image } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import {
  ActivityIndicator,
  Appbar,
  Badge,
  Button,
  Divider,
  ProgressBar,
  RadioButton,
  Text,
  TextInput,
  Tooltip,
  useTheme,
} from "react-native-paper";
import Logo from "../Assets/svg/logo.svg";
import { SvgBG } from "../Components/SvgBG";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export const Playground = () => {
  useEffect(() => {}, []);

  const theme = useTheme();
  console.log("them", theme);

  return (
    <View style={styles.container}>
      <Success></Success>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
