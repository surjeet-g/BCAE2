import React, { useEffect } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

import { Text, useTheme } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import BCAE_LOGO from "../../Assets/svg/bcae_logo.svg";
import { CustomButton } from "../../Components/CustomButton";
import { StickyFooter } from "../../Components/StickyFooter";
import { getVersionCheckData } from "../../Redux/VersionCheckDispatcher";
import { getToken } from "../../Storage/token";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { getLanguage } from "../../Utilities/Language/language";
var { height, width } = Dimensions.get("screen");

const InteractionsToOrder = ({ route, navigation }) => {
  return <View style={{ flex: 1 }}></View>;
};

const styles = StyleSheet.create({
  logo: {
    height: "100%",
  },
  container: {
    flex: 1,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "white",
    borderRightColor: color.BCAE_PRIMARY,
    borderRightWidth: 400,
    borderTopWidth: 200,
    borderTopColor: "white",
  },
  highlightText: {
    color: "#202223",
    textAlign: "left",
    fontSize: fontSizes.FONT_19 * 2,
    fontWeight: "600",
    lineHeight: spacing.HEIGHT_27 * 2,
  },
});
export default InteractionsToOrder;
