import React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { spacing } from "../Utilities/Constants/Constant";

/**
* Custom UI for Button
* @method
* @param  {Object} buttonStyle customize input style
* @param  {string} label caption of Button
* @param  {string} placeHolder placeholder of Button
* @param  {bool} isDisabled Toggle state value of button disble or enable
* @param  {function} onPress invoke clicking on submit
* @returns {JSX} Return JSX of
*/
export const CustomButton = (props) => {
  const { colors } = useTheme();

  const {
    label = "",
    isDisabled = false,
    onPress = () => { },
    loading = false,
    mode = "contained",
    buttonStyle,

  } = props;

  return (
    <View
      style={{
        margin: spacing.HEIGHT_20,
        // flex: 1
      }}
    >
      <Button
        style={{ padding: 7, borderRadius: 10, ...buttonStyle }}
        loading={loading}
        mode={mode}
        label={label}
        color={isDisabled ? colors.inverseSecondary : colors.buttonDisableColor}
        buttonColor={isDisabled ? colors.buttonDisableColor : "#4c3794"}
        onPress={isDisabled ? () => { } : () => onPress()}
      >
        {label}
      </Button>
    </View>
  );
};
