import React from "react";
import { View } from "react-native";
import BG_SPLASH from "../Assets/svg/bg_splash.svg";
import BG_OTHERS from "../Assets/svg/bg_others.svg";

export const SvgBG = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        zIndex: -99999,
        backgroundColor: "red",
      }}
    >
      {/* <BG_SPLASH /> */}
    </View>
  );
};
