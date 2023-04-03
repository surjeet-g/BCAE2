import React, { useEffect } from "react";
import { Dimensions, Platform, ScrollView, StyleSheet } from "react-native";
import {
  useTheme
} from "react-native-paper";
// import { Success } from "../Components/InteractionSuccess";
import { BarChartItems } from '../Components/charts/BarChartItems';
import { LineCharts } from '../Components/charts/LineCharts';
import { PieCharts } from "../Components/charts/PieCharts";
import { ProgressBarCharts } from "../Components/charts/ProgressBarCharts";
import { ClearSpace } from '../Components/ClearSpace';
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
  return <ProgressBarCharts />
  // return (
  //   <View style={{ justifyContent: "center", alignItems: "center", width: 200, height: 200, borderRadius: 100, backgroundColor: "#4c5a81" }}>
  //     <View style={{ justifyContent: "center", alignItems: "center", width: 140, height: 140, borderRadius: 100, backgroundColor: "#f0f0f0" }}>
  //       <Text style={{ fontWeight: '600', fontSize: 20 }}>70%</Text>
  //     </View>

  //   </View>
  // )
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ClearSpace />
      <ClearSpace />
      <PieCharts />
      <ClearSpace />
      <ClearSpace />
      <BarChartItems />
      <ClearSpace size={4} />
      <LineCharts />
      <ClearSpace size={4} />
      <ProgressBarCharts />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginHorizontal: 10
  },
});
