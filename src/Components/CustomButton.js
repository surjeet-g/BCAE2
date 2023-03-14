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
    buttonStyle,
  } = props;

  return (
    <View
      style={{
        margin: spacing.HEIGHT_10,
      }}
    >
      <Button
        style={{ padding: 7, borderRadius: 10, ...buttonStyle }}
        loading={loading}
        mode={mode}
        label={label}
        color={isDisabled ? colors.inverseSecondary : colors.buttonDisableColor}
        buttonColor={isDisabled ? colors.buttonDisableColor : colors.primary}
        onPress={isDisabled ? () => {} : () => onPress()}
      >
        {label}
      </Button>
    </View>
  );
};
