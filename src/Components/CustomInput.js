import React, { useEffect } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";

export const CustomInput = (props) => {
  const { caption = "", multiline = false } = props;
  const MULT_LINE = multiline ? {} : { height: 45 };
  const { roundness, colors } = useTheme();
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
          borderRadius: roundness,
          paddingVertical: 2,
          elevation: 1,
        }}
      >
        <TextInput
          {...props}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={{
            ...MULT_LINE,
            padding: 0,
            margin: 0,
            borderRadius: roundness,
          }}
          placeholderTextColor="#C7CAD1"
          placeholder={caption}
        />
      </View>
    </View>
  );
};
