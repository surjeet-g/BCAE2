import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomSignature from "./CustomSignature";

const CustomerAgreement = (props) => {
  const { signature, setSignature } = props;
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Icon name={"checkbox-outline"} size={25} color={"#000"} />
        <Text style={styles.contractTxt}>Contract Agreement</Text>
      </View>
      <Text style={styles.contractSubTxt}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <CustomSignature signature={signature} setSignature={setSignature} />
    </View>
  );
};

export default CustomerAgreement;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    margin: 10,
  },
  headerView: { flexDirection: "row", alignItems: "center" },
  contractTxt: { color: "#000", fontWeight: 400, fontSize: 16, marginLeft: 10 },
  contractSubTxt: {
    color: "#9A9A9A",
    fontWeight: 400,
    fontSize: 12,
    marginVertical: 10,
  },
});
