import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { spacing, color } from "../Utilities/Constants/Constant";

const CustomButton = (props) => {
  const { label, isDisabled, onClick } = props;
  return (
    <View
      style={{
        margin: spacing.HEIGHT_10,
      }}
    >
      <Button
        mode="contained"
        label={label}
        disabled={isDisabled}
        textColor={isDisabled ? "#C7CAD1" : "#FFFFFF"}
        buttonColor={isDisabled ? "#FFFFFF" : "#3E73CB"}
        onPress={onClick}
      >
        {label}
      </Button>
    </View>
  );
};

export default CustomButton;
