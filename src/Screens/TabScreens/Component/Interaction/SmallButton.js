import React from "react";
import { Pressable, Text } from "react-native";
import { commonStyle } from "../../../../Utilities/Style/commonStyle";
import { SHADOW_STYLE } from "../../../../Utilities/themeConfig";

export const SmallButton = ({ color = "#9C8FC4", label = "", onPress = () => { } }) => {
    return (
        <Pressable onPress={onPress} style={{
            backgroundColor: color,
            opacity: 1,
            padding: 10,
            borderRadius: 5,
            ...SHADOW_STYLE,
            marginRight: 5,
            minWidth: 60,
            ...commonStyle.center
        }}>
            <Text style={{ color: 'white' }}>{label}</Text>
        </Pressable>
    )
}