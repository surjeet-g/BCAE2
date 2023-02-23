import React from "react";
import { View } from "react-native";
import BG from "../Assets/svg/bg.svg";

export const SvgBG = () => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        bottom: 0,
        zIndex: -99999,
      }}
    >
      <BG />
    </View>
  );
};
