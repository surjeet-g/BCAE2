import React from "react";
import { ActivityIndicator, View } from "react-native";
import { buttonSize, color, spacing } from "../Utilities/Constants/Constant";
/**
* Custom UI for Activity Indicator,Pre Loader component
* @method
* @param  {string} size size of activity indicator
* @param  {Object} bgColor background color of activity indicator
* @returns {JSX} Return JSX
*/
export const CustomActivityIndicator = (props) => {
  let size = props.size ?? buttonSize.FLEXI;
  let bgColor = props.bgColor ? props.bgColor : color.TRANSPARENT;
  let loderColor = props.loderColor ? props.loderColor : color.BLACK;
  let width = size === buttonSize.LARGE ? { width: "100%" } : {};
  let customStyle = props.customStyle ?? {};
  let topMargin = props.topMargin ? props.topMargin : 0;

  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          marginTop: topMargin,
          backgroundColor: bgColor,
          borderRadius: spacing.HEIGHT_3,
          justifyContent: "center",
          alignItems: "center",
          height:
            size === buttonSize.SMALL ? spacing.HEIGHT_30 : spacing.HEIGHT_47,
          ...width,
          ...customStyle,
        }}
      >
        {
          <ActivityIndicator
            color={loderColor}
            animating={true}
            size="small"
            style={{ alignSelf: "center", height: 50, width: 50 }}
          />
        }
      </View>
    </View>
  );
};
