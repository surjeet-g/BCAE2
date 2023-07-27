import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
var { height } = Dimensions.get("window");

/**
* Custom sticky footer,
* wrapper component 
* This component provides stick component in bottom position
* @method
* @param  {Object} children wrapper component
* @param  {boolean} isSplash status of  this component use inside splash screen
* @param  {string} placeHolder placeholder of textinput
* @returns {JSX} Return JSX of
*/
export const StickyFooter = ({
  children,
  isSplash = false,
  isAddlocation = false,
}) => {
  const { colors } = useTheme();
  const [enable, setEnable] = useState(true)
  return (
    <View

      style={{
        padding: isAddlocation ? 2 : 12,
        position: isSplash ? "absolute" : "relative",
        bottom: 0,
        backgroundColor: colors.background,
        width: "100%",
      }}
    >
      {enable && children}
    </View>
  );
};
