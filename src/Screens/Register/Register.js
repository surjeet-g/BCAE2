import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
  TDLog,
  DEBUG_BUILD,
  STAGE_TERMS,
  PROD_TERMS,
  STAGE_PRIVACY,
  PROD_PRIVACY,
} from "../../Utilities/Constants/Constant";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
} from "./RegisterDispatcher";

import { Button, TextInput } from "react-native-paper";

import { strings } from "../../Utilities/Language/index";

import Header from "../TabScreens/Component/Header";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { setOtpFormData } from "./RegisterAction";

const Register = ({ navigation, props }) => {
  let registerForm = useSelector((state) => state.registerForm);

  const [mobileNo, setMobileNo] = useState("");

  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerm, setSelectionTerm] = useState(false);

  const [isButtomDiable, setButtomEnableDisable] = useState(true);

  const [myscreenmae, setscreenname] = useState("Register With Us");

  const [emailError, setEmailError] = useState("");

  const [termError, setTermError] = useState("");
  const [privaceyError, setPrivaceyError] = useState("");
  const [numberError, setNumberError] = useState("");

  const dispatch = useDispatch([
    fetchRegisterFormData,
    sendOtp,
    userRegister,
    getOtpForCheck,
  ]);

  const buttonEnableDiable = () => {
    if (mobileNo === "" || email === "") {
      setButtomEnableDisable(true);
    } else {
      setButtomEnableDisable(false);
    }
  };

  const onMobleNoChange = (textStr) => {
    setMobileNo(textStr);
    setNumberError("");
    buttonEnableDiable();
  };

  const onEmailChange = (textStr) => {
    setEmail(textStr);
    setEmailError("");
    buttonEnableDiable();
  };

  const onCheckBoxClick = () => {
    setSelection(!isSelected);
    setTermError("");
    setPrivaceyError("");
  };

  const onCheckBoxClickTerm = () => {
    setSelectionTerm(!isSelectedTerm);

    setTermError("");
  };

  const showAlert = (message = "") => {
    // if (
    //   !registerForm.initRegisterForm &&
    //   registerForm?.otpFormData?.status == "200" &&
    //   registerForm?.otpUsageType === "Register"
    // ) {
    //showErrorMessage(registerForm?.otpFormData?.message)
    Alert.alert("Info", message, [
      {
        text: "OK",
        onPress: () => {
          dispatch(setOtpFormData({}, "Register"));
          dispatch(setOtpFormData({}, "mobile"));

          dispatch(setOtpFormData({}, "email"));

          navigation.navigate("Login", {});
        },
      },
    ]);
  };

  const submit = () => {
    if (!validateNumber(mobileNo)) {
      setNumberError(strings.mobileValidError);
    } else if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else if (!isSelectedTerm) {
      setTermError(strings.termError);
    } else if (!isSelected) {
      setPrivaceyError(strings.privaceyError);
    } else {
      let registerObject = {
        contactNo: mobileNo,
        email: email,
      };

      dispatch(
        userRegister(registerObject, "Register", (message) =>
          showAlert(message)
        )
      );
    }
  };

  const showErrorMessage = (errMessage) => {
    if (typeof errMessage != "string") return null;
    let pattern = /Successful/i;
    let result = errMessage.match(pattern);

    if (result != null) {
      return null;
    }

    return (
      <View style={{ marginTop: spacing.HEIGHT_10, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{errMessage}</Text>
      </View>
    );
  };

  const orSection = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: spacing.HEIGHT_32,
        }}
      >
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
          }}
        ></View>
        <Text style={styles.orText}>{strings.or}</Text>
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
            alignContent: "flex-end",
          }}
        ></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          Text={myscreenmae}
          navigation={navigation}
          backIconVisibility={true}
          registerfaq={true}
        ></Header>

        <ScrollView
          style={{
            flexGrow: 1,
            paddingHorizontal: spacing.WIDTH_30,
            paddingTop: spacing.HEIGHT_20,
          }}
          nestedScrollEnabled={true}
        >
          {/* Logo */}
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.logo}
              source={require("../../Assets/icons/ic_td123_logo.png")}
            ></Image>
          </View>

          <View style={{ marginTop: 5 }}>
            <TextInput
              onChangeText={(text) => onMobleNoChange(text)}
              value={mobileNo}
              label={strings.mobile_number}
              placeHolder={strings.mobile_number}
              mode="flat"
              style={{
                backgroundColor: "transparent",
              }}
              textColor="#ea272c"
              placeholderTextColor=""
              right={
                <TextInput.Icon
                  onPress={() => setMobileNo("")}
                  style={{ width: 23, height: 23 }}
                  icon={require("../../Assets/icons/ic_close.png")}
                />
              }
            />
            {numberError && showErrorMessage(numberError)}
          </View>

          <View style={{ marginTop: 5 }}>
            <TextInput
              mode="flat"
              style={{
                backgroundColor: "transparent",
              }}
              textColor="#ea272c"
              onChangeText={(text) => onEmailChange(text)}
              value={email}
              label={strings.email}
              placeHolder={strings.email}
              right={
                <TextInput.Icon
                  onPress={() => setEmail("")}
                  style={{ width: 23, height: 23 }}
                  icon={require("../../Assets/icons/ic_close.png")}
                />
              }
            />

            {!registerForm.initOtpForm &&
              registerForm?.isOtpFormError &&
              registerForm?.otpFormDataForEmail?.errorCode > 200 &&
              registerForm?.otpUsageType === "email" &&
              showErrorMessage(registerForm?.otpFormDataForEmail?.message)}

            {emailError !== "" && showErrorMessage(emailError)}
          </View>

          <Pressable
            onPress={onCheckBoxClickTerm}
            style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
          >
            <Image
              style={styles.checkBox}
              source={
                isSelectedTerm
                  ? require("../../Assets/icons/ci_checked.png")
                  : require("../../Assets/icons/ci_uncheck.png")
              }
            ></Image>
            <Text style={{ marginLeft: spacing.WIDTH_8 }}>
              I have agree to your{" "}
            </Text>
            <Text
              onPress={() =>
                navigation.navigate("ShowWebPage", {
                  fromLogin: true,
                  title: "Terms & Conditions",
                  url: DEBUG_BUILD ? STAGE_TERMS : PROD_TERMS,
                })
              }
              style={{ color: color.BCAE_DARK_BLUE }}
            >
              Terms &amp; Conditions.
            </Text>
          </Pressable>

          {termError !== "" && showErrorMessage(termError)}
          <Pressable
            onPress={onCheckBoxClick}
            style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
          >
            <Image
              style={styles.checkBox}
              source={
                isSelected
                  ? require("../../Assets/icons/ci_checked.png")
                  : require("../../Assets/icons/ci_uncheck.png")
              }
            ></Image>
            <Text style={{ marginLeft: spacing.WIDTH_8 }}>
              I have read your{" "}
            </Text>
            <Text
              onPress={() =>
                navigation.navigate("ShowWebPage", {
                  fromLogin: true,
                  title: "Privacy Policy",
                  url: DEBUG_BUILD ? STAGE_PRIVACY : PROD_PRIVACY,
                })
              }
              style={{ color: color.BCAE_DARK_BLUE }}
            >
              Privacy Policy.
            </Text>
          </Pressable>

          {privaceyError !== "" && showErrorMessage(privaceyError)}

          {!registerForm.initRegisterForm &&
            registerForm?.otpFormData?.errorCode !== "200" &&
            registerForm?.otpUsageType === "Register" &&
            showErrorMessage(registerForm?.otpFormData?.message)}

          {/* {showAlert()} */}

          <View style={{ marginTop: spacing.HEIGHT_24 }}>
            {registerForm?.initOtpForm &&
            registerForm?.otpUsageType === "Register" ? (
              <CustomActivityIndicator
                size={buttonSize.LARGE}
                bgColor={color.BLACK}
                loderColor={color.WHITE}
              />
            ) : (
              <Button disabled={isButtomDiable} onPress={submit}>
                {"REGISTER"}
              </Button>
            )}
          </View>

          {orSection()}

          <View>
            <Text style={styles.alreadyAccount}>{strings.already_acc}</Text>
            <Pressable onPress={() => navigation.navigate("Login", {})}>
              <Text style={styles.loginText}>
                {strings.login.toUpperCase()}
              </Text>
            </Pressable>
          </View>

          <View style={{ paddingBottom: spacing.HEIGHT_50 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  logo: {
    height: 128,
    width: 128,
  },
  orText: {
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_16,
    paddingHorizontal: spacing.WIDTH_7,
  },
  alreadyAccount: {
    marginTop: spacing.HEIGHT_30,
    fontWeight: "400",
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  loginText: {
    marginTop: spacing.HEIGHT_6,
    fontWeight: "500",
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  checkBox: {
    height: spacing.WIDTH_20,
    width: spacing.WIDTH_20,
  },
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
  },
  errorLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
    marginTop: -2,
    marginRight: spacing.WIDTH_4,
  },
  textLocation: {
    marginTop: spacing.HEIGHT_10,
    borderBottomWidth: 1,
    borderBottomColor: color.INPUT_TEXT_BORDER,
    flexDirection: "row",
  },
  placeHolderText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
  },
});

export default Register;
