import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";

// // Usage
// <BillDetails
// details={{ gTotal: 1250.0, total: 1250.0, gst: 50.0, discount: 100.0 }}
// />
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
  const CDivider = () => {
    return (
      <Divider
        style={{
          borderWidth: 1,
          borderColor: "#8E8F95",
          borderStyle: "dashed",
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      {Item("Grand Total", "$1250.00", "#686B6C")}
      <CDivider />
      {Item("GST", "$50.00", "#5677D2")}
      <CDivider />
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
