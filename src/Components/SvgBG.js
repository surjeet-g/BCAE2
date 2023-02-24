import React from "react";
import { View } from "react-native";
import BG_SPLASH from "../Assets/svg/bg_splash.svg";
import BG_OTHERS from "../Assets/svg/bg_others.svg";

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
      <BG_SPLASH />
    </View>
  );
};
