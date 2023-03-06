import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { color, spacing } from "../Utilities/Constants/Constant";
import { SHADOW_STYLE } from "../Utilities/themeConfig";

export const ToggleButton = (props) => {
  const { colors } = useTheme();

  let label = props.label ?? {};
  let onPressFirst = props.onPressFirst ?? null;
  let onPressSecond = props.onPressSecond ?? null;
  let { bgColor } = props;
  let textColor = props.textColor ? props.textColor : color.BLACK;
  let width = { width: "50%" };
  let customStyle = props.customStyle ?? {};
  let activeOpacity = props.opacity ?? 0.2;
  let textPro = props.textPro ?? {};
  let isFirstSelected = props.isFirstSelected ?? false;

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.toggleBackground,
        ...SHADOW_STYLE,
        // padding: 2,
        borderRadius: spacing.HEIGHT_24,
      }}
    >
      <TouchableOpacity
        onPress={onPressFirst}
        activeOpacity={activeOpacity}
        style={{
          paddingHorizontal: spacing.WIDTH_9,
          backgroundColor: isFirstSelected
            ? colors.tertiary
            : colors.toggleBackground,
          borderRadius: spacing.HEIGHT_24,
          //...SHADOW_STYLE,
          justifyContent: "center",
          alignItems: "center",
          height: spacing.HEIGHT_32,
          ...width,
          ...customStyle,
        }}
      >
        {
          <Text
            style={{
              ...textPro,
              color: isFirstSelected ? colors.secondary : colors.secondary,
            }}
          >
            {label.first}
          </Text>
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressSecond}
        activeOpacity={activeOpacity}
        style={{
          paddingHorizontal: spacing.WIDTH_9,
          backgroundColor: !isFirstSelected
            ? colors.tertiary
            : colors.toggleBackground,
          borderRadius: spacing.HEIGHT_24,
          justifyContent: "center",
          alignItems: "center",
          height: spacing.HEIGHT_32,
          ...width,
          ...customStyle,
        }}
      >
        {
          <Text
            style={{
              ...textPro,
              color: !isFirstSelected ? colors.secondary : colors.secondary,
            }}
          >
            {label.second}
          </Text>
        }
      </TouchableOpacity>
    </View>
  );
};
