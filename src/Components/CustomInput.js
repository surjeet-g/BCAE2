import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
/**
* Custom UI Textinput box
* @method
* @param  {Object} customStyle customize input style
* @param  {string} caption caption of textinput
* @param  {string} placeHolder placeholder of textinput
* @param  {bool} isDisableButton Toggle state value of button disble or enable
* @param  {function} onClicked invoke clicking on OTP submit
* @returns {JSX} Return JSX
*/
export const CustomInput = (props) => {
  const {
    caption = "",
    placeHolder = "",
    multiline = false,
    hideCaption = false,
    disabled = false,
  } = props;
  const MULT_LINE = multiline ? {} : { height: 45 };
  const { roundness, colors } = useTheme();
  const [active, setActive] = useState(false);

  return (
    <View style={{ marginTop: 5 }}>
      {!hideCaption && (
        <Text
          variant="labelSmall"
          style={{
            marginBottom: 6,
            marginLeft: 8,
            color: colors.onSurfaceVariant,
          }}
        >
          {caption}
        </Text>
      )}
      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: disabled ? 7 : 9,
          paddingVertical: 0,
          // elevation: 1,
          borderColor: colors.gray,
          borderWidth: active ? 2 : 1,
          borderStyle: "solid",
        }}
      >
        <TextInput
          {...props}
          underlineColor="transparent"
          activeUnderlineColor="#b1aeae"
          style={{
            ...MULT_LINE,
            padding: 0,
            margin: 0,
            borderRadius: 0,
            backgroundColor: "transparent",
            width: "99%",
            marginLeft: 2
          }}

          placeholderTextColor="#C7CAD1"
          placeholder={placeHolder || caption}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(false);
          }}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};
