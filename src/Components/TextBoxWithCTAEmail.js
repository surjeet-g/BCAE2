import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  color,
  spacing,
  fontSizes,
  buttonSize,
} from "../Utilities/Constants/Constant";
import { CustomActivityIndicator } from "./CustomActivityIndicator";
import { useTheme } from "react-native-paper";

export const TextBoxWithCTAEmail = (props) => {
  const { roundness, colors } = useTheme();

  let customStyle = props.customStyle ?? {};
  let btnTextPro = props.btnTextPro ?? {};
  let bgColor = colors.primary;
  let onClicked = props.onPress ?? null;
  let isDisableButton = props.isDisableButton ?? false;
  return (
    <View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.placeHolderText}>
          {props.value != ""
            ? props.placeHolder
            : props?.isResendOTP && props?.countryCode != ""
            ? props.placeHolder
            : " "}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        {props?.correctOtp && (
          <View style={{ ...styles.correctStyle }}>
            <Image source={require("../Assets/icons/Verify.png")} />
          </View>
        )}
        {props?.loader ? (
          <View style={{ backgroundColor: color.BLACK, ...styles.ctaStyle }}>
            <CustomActivityIndicator
              size={buttonSize.SMALL}
              bgColor={color.BLACK}
              loderColor={color.WHITE}
            />
          </View>
        ) : props?.label ? (
          <TouchableOpacity
            onPress={onClicked}
            disabled={isDisableButton}
            style={{
              borderRadius: roundness,
              backgroundColor: isDisableButton ? color.BLACK : bgColor,
              ...styles.ctaStyle,
            }}
          >
            <Text style={{ ...btnTextPro }}>{props.label}</Text>
          </TouchableOpacity>
        ) : null}

        <View
          style={{
            flexDirection: "row",
            marginVertical: spacing.HEIGHT_3,
            height: 55,
            backgroundColor: colors.background,
            borderRadius: roundness,
            alignItems: "center",
            paddingHorizontal: 12,
          }}
        >
          {props?.isResendOTP && props?.countryCode != "" && (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                position: "absolute",
                zIndex: 1,
                justifyContent: "space-between",
                width: spacing.WIDTH_35 * 2,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: color.DARK_GREY,
                  fontSize: fontSizes.FONT_14,
                  fontWeight: "500",
                }}
              >
                {" "}
                {"+" + props.countryCode}
              </Text>
              <Image
                source={require("../Assets/icons/ci_dropdown.png")}
                style={{ width: spacing.WIDTH_16, height: spacing.WIDTH_16 }}
              />
            </TouchableOpacity>
          )}
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            editable={
              props?.isResendOTP && props?.countryCode == "" ? false : true
            }
            placeholder={
              props?.isResendOTP && props?.countryCode != ""
                ? ""
                : props.placeHolder
            }
            onChangeText={(text) => props.onChangeText(text)}
            style={{
              color: color.secondary,
              ...styles.textInput,
              ...customStyle,
              paddingLeft:
                props?.isResendOTP && props?.countryCode != ""
                  ? spacing.WIDTH_37 * 2
                  : 0,
            }}
            keyboardType={props.keyboardType ? props.keyboardType : "default"}
            value={props.value}
            onSubmitEditing={() =>
              props.onSubmitEditing ? props.onSubmitEditing : null
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeHolderText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    marginBottom: spacing.WIDTH_5,
  },
  textInput: {
    width: "100%",
    height: 40,

    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  ctaStyle: {
    position: "absolute",
    marginRight: 12,
    right: 0,
    bottom: 10,
    zIndex: 1,
    padding: spacing.WIDTH_10,

    justifyContent: "center",
    alignItems: "center",
    height: spacing.HEIGHT_38,
  },

  correctStyle: {
    position: "absolute",
    right: 0,
    bottom: 10,
    marginRight: 120,
    zIndex: 1,

    justifyContent: "center",
    alignItems: "center",
    height: spacing.HEIGHT_38,
  },
});
