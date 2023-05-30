import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import {
  color,
  spacing,
  fontSizes,
  buttonSize,
} from "../Utilities/Constants/Constant";

export const CustomInputWithCC = (props) => {
  const { caption = "", multiline = false, countryCode } = props;
  const MULT_LINE = multiline ? {} : { height: 45 };
  const { roundness, colors } = useTheme();
  const [active, setActive] = useState(false);

  return (
    <View style={{ marginTop: 5 }}>
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
      <View
        style={{
          backgroundColor: colors.background,
          borderRadius: 10,
          paddingVertical: 0,
          // elevation: 1,
          borderColor: colors.gray,
          borderWidth: active ? 2 : 1,
          borderStyle: "solid",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            zIndex: 1,
            marginHorizontal: 10,
            alignSelf: "center",
          }}
          onPress={() => {
            !props?.disabled &&
              props?.onPressOnCountyCode &&
              props.onPressOnCountyCode();
          }}
        >
          <Text
            style={{
              color: color.DARK_GREY,
              fontSize: fontSizes.FONT_14,
              fontWeight: 500,
            }}
          >
            {countryCode}{" "}
            <Image
              source={require("../Assets/icons/ci_dropdown.png")}
              style={{ width: spacing.WIDTH_16, height: spacing.WIDTH_16 }}
            />
          </Text>
        </TouchableOpacity>
        <View
          style={{ width: 2, backgroundColor: "#D9D9D9", marginVertical: 3 }}
        />
        <TextInput
          {...props}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={{
            ...MULT_LINE,
            padding: 0,
            margin: 0,
            borderRadius: 10,
            flex: 1,
          }}
          placeholderTextColor="#C7CAD1"
          placeholder={caption}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(false);
          }}
        />
      </View>
    </View>
  );
};
