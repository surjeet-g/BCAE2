import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "./CustomButton";
export const InteractionSuccess = ({
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

      {cancelButtonRequired ? (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.5 }}>
            <CustomButton label={"Cancel"} onPress={cancelHandler} />
          </View>
          <View style={{ flex: 0.5 }}>
            <CustomButton label={"Ok"} onPress={okHandler} />
          </View>
        </View>
      ) : <CustomButton label={"ok"} onPress={okHandler} />}


    </View>
  );
};

const styles = StyleSheet.create({
  successContainer: {

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
