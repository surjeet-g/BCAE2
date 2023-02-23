import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { color, spacing } from "../Utilities/Constants/Constant";
import { useTheme } from "react-native-paper";

export const ToggleButton = (props) => {
  const { colors } = useTheme();

  let label = props.label ?? {};
  let onPressFirst = props.onPressFirst ?? null;
  let onPressSecond = props.onPressSecond ?? null;
  let bgColor = props.bgColor;
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
        backgroundColor: colors.tertiary,
        borderRadius: spacing.HEIGHT_24,
      }}
    >
      <TouchableOpacity
        onPress={onPressFirst}
        activeOpacity={activeOpacity}
        style={{
          paddingHorizontal: spacing.WIDTH_5,
          backgroundColor: isFirstSelected ? colors.secondary : colors.tertiary,
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
              color: isFirstSelected ? colors.tertiary : colors.secondary,
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
          paddingHorizontal: spacing.WIDTH_5,
          backgroundColor: !isFirstSelected
            ? colors.secondary
            : colors.tertiary,
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
              color: !isFirstSelected ? colors.tertiary : colors.secondary,
            }}
          >
            {label.second}
          </Text>
        }
      </TouchableOpacity>
    </View>
  );
};
