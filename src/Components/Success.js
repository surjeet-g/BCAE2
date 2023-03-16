import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { CustomButton } from "../Components/CustomButton";
export const Success = ({
  intxId,
  cancelButtonRequired,
  okHandler,
  cancelHandler,
}) => {
  return (
    <View style={styles.successContainer}>
      <Image
        source={require("../Assets/icons/success.gif")}
        style={styles.gif}
      />
      <Text style={styles.interactionText}>
        We have Successfully Created your interaction.
      </Text>
      <Text style={styles.idText}>Your Interaction ID : {intxId}</Text>

      {cancelButtonRequired && (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.5 }}>
            <CustomButton label={"ok"} onPress={() => okHandler} />
          </View>
          <View style={{ flex: 0.5 }}>
            <CustomButton label={"Ok"} onPress={() => cancelHandler} />
          </View>
        </View>
      )}

      <CustomButton label={"okml,nlnlnl"} onPress={() => okHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  successContainer: {
    width: "70%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  gif: {
    width: 200,
    height: 200,
    alignItems: "center",
    backgroundColor: "blue",
  },
  interactionText: {
    textAlign: "center",
    marginTop: 30,
  },
  idText: {
    color: "black",
    fontWeight: 700,
    marginTop: 30,
  },
});
