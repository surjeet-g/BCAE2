import React from "react";
import { Image, Text, View } from "react-native";
import { ClearSpace } from "./ClearSpace";
import { CustomButton } from "./CustomButton";
import { styles } from "./InteractionSuccess";

export const InteractionFailed = ({ okHandler = () => {} }) => {
  return (
    <View style={styles.successContainer}>
      <Image
        source={require("../Assets/icons/interaction_error.gif")}
        style={styles.gif}
      />

      <Text style={{ ...styles.idText, textAlign: "center" }}>
        Aw Snap! {"\n\n"}
        Unable to create an interaction, try again later.
      </Text>
      <ClearSpace size={5} />
      <CustomButton label={"Go Back"} onPress={okHandler} />
    </View>
  );
};
