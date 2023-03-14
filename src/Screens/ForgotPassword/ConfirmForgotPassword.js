import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  validateEmail,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { Button, Text } from "react-native-paper";
import BCAE_LOGO from "../../Assets/svg/bcae_logo.svg";
import { HEADER_MARGIN } from "../../Utilities/themeConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForgotPassword,
  verifyForgotPasswordData,
} from "../ForgotPassword/ForgotPasswordDispatcher.js";
import moment from "moment";

const ConfirmForgotPassword = ({ route, navigation }) => {
  const [myscreenmae, setscreenname] = useState("Forgot Password");

  const isEMail = validateEmail(route?.params?.email);

  const email = route?.params?.email ?? "";
  const lastName = route?.params?.lastName ?? "";
  const routeDob = route?.params?.dob ?? "";
  const type = route?.params?.type ?? "";
  const dispatch = useDispatch([verifyForgotPasswordData, resetForgotPassword]);

  const resendPassword = () => {
    if (type === "customerID") {
      dispatch(
        verifyForgotPasswordData(
          navigation,
          {
            loginId: email,
            lastName: lastName,
            dob: moment(routeDob).format("YYYY-MM-DD"),
          },
          "customerID"
        )
      );
    } else {
      const params = {
        loginId: email,
      };

      dispatch(verifyForgotPasswordData(navigation, params));
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../Assets/icons/bg_others.png")}
      resizeMode="cover"
    >
      <Text style={{ fontSize: 18, marginLeft: 15, color: "white" }}>
        {"Congratulations !!"}
      </Text>
      <Text style={{ fontSize: 28, marginLeft: 15, color: "white" }}>
        {"Reset successfull."}
      </Text>
      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: spacing.WIDTH_30,
          paddingTop: spacing.HEIGHT_50 * 2,
        }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            margin: 2,
            flex: 1,
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 16,
            elevation: 5,
          }}
        >
          <Image
            style={{ alignSelf: "center" }}
            source={require("../../Assets/icons/tick.gif")}
          />
          <Text style={styles.headline}>{strings.checkYourMail}</Text>

          <Text style={styles.subtext}>{strings.wesent}</Text>

          <Text style={styles.email}>{route?.params?.email}</Text>

          <Text style={styles.didtntrec}>{strings.didNotReceive_email}</Text>

          <Text style={styles.clicktoresend} onPress={resendPassword}>
            {strings.clicktoresend.toUpperCase()}
          </Text>
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 35,
            }}
          >
            <Text style={{ marginLeft: 10, color: "#4B3694" }}>
              {strings.back_to_login}
            </Text>
          </View>
        </Pressable>

        <View style={{ paddingBottom: spacing.HEIGHT_40 * 3 }} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...HEADER_MARGIN,
  },
  logo: {
    height: spacing.WIDTH_40,
    width: spacing.WIDTH_50 * 2,
  },
  headline: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  subtext: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_16,
    marginTop: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  email: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_14,
    marginTop: 5,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  didtntrec: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    marginTop: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  clicktoresend: {
    color: "#4B3694",
    fontSize: fontSizes.FONT_16,
    marginTop: 10,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  toast: {
    position: "absolute",
    bottom: spacing.HEIGHT_31 * 2,
  },
  orText: {
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_16,
    paddingHorizontal: spacing.WIDTH_7,
  },
  noAccText: {
    marginTop: spacing.HEIGHT_32,
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  rgisterText: {
    marginTop: spacing.HEIGHT_6,
    fontWeight: "500",
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
});

export default ConfirmForgotPassword;
