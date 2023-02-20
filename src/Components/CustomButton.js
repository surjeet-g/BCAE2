import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { spacing } from "/../Utilities/Constants/Constant";

const CustomButton = (props) => {
  const { label, isDisabled, onClick } = props;
  return (
    <View style={{ margin: spacing.HEIGHT_20 }}>
      <Button
        mode="contained"
        label={label}
        disabled={isDisabled}
        onPress={onClick}
      >
        {label}
      </Button>
    </View>
  );
};

export default CustomButton;
