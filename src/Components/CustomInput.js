import React, { useEffect } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";

export const CustomInput = (props) => {
  const { caption = "" } = props;
  const { roundness, colors } = useTheme();
  return (
    <View>
      <Text
        variant="labelSmall"
        style={{ marginBottom: 6, marginLeft: 8, color: colors.graylabel }}
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
          underlineColor="transparant"
          activeUnderlineColor="transparant"
          style={{
            height: 45,
            borderRadius: roundness,
          }}
          placeholderTextColor="#C7CAD1"
          placeholder={caption}
          {...props}
        />
      </View>
    </View>
  );
};
