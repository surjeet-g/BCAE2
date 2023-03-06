import React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { spacing } from "../Utilities/Constants/Constant";

export const CustomButton = (props) => {
  const { colors } = useTheme();

  const {
    label = "",
    isDisabled = false,
    onPress = () => {},
    loading = false,
    mode = "contained",
  } = props;

  return (
    <View
      style={{
        margin: spacing.HEIGHT_10,
      }}
    >
      <Button
        style={{ padding: 7 }}
        loading={loading}
        mode={mode}
        label={label}
        textColor={isDisabled ? colors.gray : colors.buttonDisableColor}
        buttonColor={isDisabled ? colors.buttonDisableColor : colors.primary}
        onPress={isDisabled ? () => {} : () => onPress()}
      >
        {label}
      </Button>
    </View>
  );
};
