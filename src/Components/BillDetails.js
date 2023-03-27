import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BillDetails = (props) => {
  const { gTotal, total, gst, discount } = props.details;
  const Item = (
    title,
    price,
    color = "#000",
    backgroundColor = "transparent"
  ) => {
    return (
      <View style={{ ...styles.itemView, backgroundColor }}>
        <Text style={{ color, fontWeight: 600, fontSize: 16 }}>{title}</Text>
        <Text style={{ color, fontWeight: 600, fontSize: 16 }}>{price}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {Item("Grand Total", "$1250.00", "#686B6C")}
      <View
        style={{
          height: 1,
          backgroundColor: "#8E8F95",
        }}
      />
      {Item("GST", "$50.00", "#5677D2")}
      <View
        style={{
          height: 1,
          backgroundColor: "#8E8F95",
        }}
      />
      {Item("Discount", "-$100.00", "#EFA848")}
      {Item("Total", "$1250.00", "#000000", "#DADADA")}
    </View>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  container: { borderRadius: 10, backgroundColor: "white" },
  itemView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});
