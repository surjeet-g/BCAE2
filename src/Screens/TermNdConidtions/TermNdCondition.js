import React, { useEffect, useState } from "react";
import {
  ImageBackground, StyleSheet
} from "react-native";
import {
  color,
  fontSizes, spacing
} from "../../Utilities/Constants/Constant";
import { HeaderTitle } from "./../../Components/headerTitle";

import get from "lodash.get";
import { WebView } from 'react-native-webview';
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";


export const TermNdCondition = ({ navigation }) => {

  const [html, setHtml] = useState("")
  useEffect(() => {
    async function fetchMyAPI() {

      const result = await serverCall(
        endPoints.TERM_ND_CONDITION,
        requestMethod.GET,
        {}
      );
      console.log("result", result)
      if (result.success) {
        const html = get(result, 'data.data[0].termsContent', '')
        setHtml(html)
      }
    }

    fetchMyAPI();

  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../Assets/icons/bg_others.png")}
      resizeMode="cover"
    >
      <HeaderTitle header="Terms & Conditions" subHeader="" />
      <WebView
        originWhitelist={['*']}
        source={{ html: `<html><body>${html}</body></html>` }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  toast: {
    position: "absolute",
    bottom: spacing.HEIGHT_31 * 2,
  },
  forgotText: {
    fontWeight: "700",
    color: "#4B3694",
    fontSize: fontSizes.FONT_16,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  noAccText: {
    color: "#3D3D3D",
    fontSize: fontSizes.FONT_16,
    lineHeight: spacing.WIDTH_16,
    textAlign: "center",
    fontWeight: "400",
  },
  rgisterText: {
    fontWeight: "700",
    color: "#4B3694",
    fontSize: fontSizes.FONT_16,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
});
