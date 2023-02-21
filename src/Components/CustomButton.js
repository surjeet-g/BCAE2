import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { spacing, color } from "../Utilities/Constants/Constant";
import { useTheme } from "react-native-paper";

const CustomButton = (props) => {
  const { colors } = useTheme();

  const {
    label = "",
    isDisabled = false,
    onClick = () => {},
    loading = true,
  } = props;

  return (
    <View
      style={{
        margin: spacing.HEIGHT_10,
      }}
    >
      <Button
        loading={loading}
        mode="contained"
        label={label}
        textColor={isDisabled ? colors.gray : colors.buttonDisableColor}
        buttonColor={isDisabled ? colors.buttonDisableColor : colors.primary}
        onPress={isDisabled ? () => {} : onClick}
      >
        {label}
      </Button>
    </View>
  );
};

export default CustomButton;
