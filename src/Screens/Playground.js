import React, { useEffect } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import {
  useTheme
} from "react-native-paper";
import { LineCharts } from '../Components/charts/LineCharts';
// import { Success } from "../Components/InteractionSuccess";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
export const Playground = () => {
  useEffect(() => { }, []);
  var { height, width } = Dimensions.get('screen');
  const theme = useTheme();
  console.log("them", theme);
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  return (
    <View style={styles.container}>
      <LineCharts />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
