import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import DatePicker from "react-native-date-picker";

import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
  Dimensions,
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
import moment from "moment";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
} from "./RegisterDispatcher";

import { Button, Divider, TextInput } from "react-native-paper";

import { strings } from "../../Utilities/Language/index";

import Header from "../TabScreens/Component/Header";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { setOtpFormData } from "./RegisterAction";

const STEP_INITIAL_SCREEN = 1;
const STEP_FORM = 2;
const STEP_VERIFY = 3;
const STEP_OTP_VERIFY_WITHOUT_CUSTOMER_ID = 4;

const Register = ({ navigation, props }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextConfirmEntry, setsecureTextConfirmEntry] = useState(true);
  const [dob, setDob] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileOTP, setMobileOTP] = useState("");
  const [emailOTP, setEmailOTP] = useState("");
  const { height, width } = Dimensions.get("screen");
  let registerForm = useSelector((state) => state.registerForm);
  const [step, setStep] = useState(STEP_INITIAL_SCREEN);
  const [haveCustomerId, sethaveCustomerId] = useState(true);
  const [mobileNo, setMobileNo] = useState("");
  const [customerID, setCustomerID] = useState("123123");

  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerm, setSelectionTerm] = useState(false);

  const [isButtomDiable, setButtomEnableDisable] = useState(true);

  const [myscreenmae, setscreenname] = useState("Register With Us");

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [termError, setTermError] = useState("");
  const [privaceyError, setPrivaceyError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
  const customerIdSubmit = () => {
    //to do api call after trigger follow instr
    setStep(STEP_FORM);
    sethaveCustomerId(true);
  };
  const submit = () => {
    if (!isSelectedTerm) {
      setTermError(strings.termError);
    } else if (!isSelected) {
      setPrivaceyError(strings.privaceyError);
    } else if (password.length < 7) {
      setPasswordError(strings.passwordValidError);
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
  const verifyOTPWithCustomerId = () => {
    //to do api call
    setStep(STEP_VERIFY);
  };
  //submit action for verify email and mobile
  const confirmUserInfoWIthoutCustomerID = () => {
    // if (!validateEmail(email)) {
    //   setEmailError(strings.emailValidError);
    //   return;
    // }
    // if (!validateNumber(mobileNo)) {
    //   setMobileError(strings.mobileValidError);
    //   return;
    // }

    setStep(STEP_OTP_VERIFY_WITHOUT_CUSTOMER_ID);
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
  const renderInitialScreenWithCustomerID = () => {
    return (
      <View>
        <TextInput
          onChangeText={setCustomerID}
          value={customerID}
          label="Customer Id"
          placeHolder="Customer Id"
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          right={
            <TextInput.Icon
              onPress={() => setMobileNo("")}
              style={{ width: 23, height: 23 }}
              icon={require("../../Assets/icons/ic_close.png")}
            />
          }
        />
        <View style={{ height: 23 }} />

        <Button
          disabled={customerID == ""}
          mode="contained"
          onPress={customerIdSubmit}
        >
          CONFIRM
        </Button>
        <View style={{ height: 23 }} />
        <Button
          mode="text"
          onPress={() => {
            setStep(STEP_FORM);
            sethaveCustomerId(false);
          }}
        >
          Don't you remember customerID
        </Button>
      </View>
    );
  };
  const renderUserDetailsWithOTP = () => {
    return (
      <View>
        <View style={{ marginTop: 5 }}>
          <TextInput
            keyboardType="number-pad"
            onChangeText={setMobileOTP}
            value={mobileOTP}
            label="Enter Mobile OTP"
            placeHolder="Enter Mobile OTP"
            mode="flat"
            style={{
              backgroundColor: "transparent",
            }}
            right={
              <TextInput.Icon
                onPress={() => setmobileOTP("")}
                style={{ width: 23, height: 23 }}
                icon={require("../../Assets/icons/ic_close.png")}
              />
            }
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <TextInput
            keyboardType="number-pad"
            onChangeText={setEmailOTP}
            value={emailOTP}
            label="Enter Email otp"
            placeHolder="Enter Email otp"
            mode="flat"
            style={{
              backgroundColor: "transparent",
            }}
            right={
              <TextInput.Icon
                onPress={() => setEmailOTP("")}
                style={{ width: 23, height: 23 }}
                icon={require("../../Assets/icons/ic_close.png")}
              />
            }
          />
        </View>
        <View style={{ height: 23 }} />
        <Button
          disabled={mobileOTP == "" || emailOTP == ""}
          mode="contained"
          onPress={verifyOTPWithCustomerId}
        >
          VERIFY
        </Button>
      </View>
    );
  };
  const renderWithoutCustomerID = () => {
    return (
      <>
        <View style={{ marginTop: 5 }}>
          <TextInput
            keyboardType="number-pad"
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
          {mobileError && showErrorMessage(mobileError)}
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
          {emailError && showErrorMessage(emailError)}
        </View>
        <View style={{ marginTop: 5 }}>
          <DatePicker
            modal
            mode="date"
            validRange={{ endDate: new Date() }}
            open={open}
            onCancel={() => setOpen(false)}
            date={dob == "" ? new Date() : dob}
            maximumDate={new Date()}
            onConfirm={(params) => {
              setOpen(false);
              setDob(params);
            }}
          />
          <TextInput
            mode="flat"
            style={{
              backgroundColor: "transparent",
            }}
            textColor="#ea272c"
            // onChangeText={(text) => onIDChange(text)}
            value={dob == "" ? "" : moment(dob).format("YYYY-MM-DD")}
            label={"Date of birth"}
            onFocus={() => setOpen(true)}
            placeHolder={"Date of birth"}
            right={
              <TextInput.Icon
                onPress={() => setOpen(true)}
                style={{ width: 23, height: 23 }}
                icon={require("../../Assets/icons/mail.png")}
              />
            }
          />
          {passwordError && showErrorMessage(passwordError)}
          {!registerForm.initOtpForm &&
            registerForm?.isOtpFormError &&
            registerForm?.otpFormDataForEmail?.errorCode > 200 &&
            registerForm?.otpUsageType === "email" &&
            showErrorMessage(registerForm?.otpFormDataForEmail?.message)}

          {emailError !== "" && showErrorMessage(emailError)}
          <View style={{ height: 23 }} />
          <Button
            disabled={mobileNo == "" || email == "" || dob == ""}
            mode="contained"
            onPress={confirmUserInfoWIthoutCustomerID}
          >
            CONFIRM
          </Button>
        </View>
      </>
    );
  };
  const rendersetUserPassword = () => {
    return (
      <View>
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          textColor="#ea272c"
          value={password}
          label={strings.password}
          placeHolder={strings.password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{ width: 23, height: 23 }}
              icon={
                secureTextEntry
                  ? require("../../Assets/icons/ic_password_show.png")
                  : require("../../Assets/icons/ic_password_hide.png")
              }
            />
          }
        />
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          textColor="#ea272c"
          value={confirmPassword}
          label={strings.confirmPassword}
          placeHolder={strings.confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={secureTextConfirmEntry}
          right={
            <TextInput.Icon
              onPress={() => setsecureTextConfirmEntry(!secureTextConfirmEntry)}
              style={{ width: 23, height: 23 }}
              icon={
                secureTextEntry
                  ? require("../../Assets/icons/ic_password_show.png")
                  : require("../../Assets/icons/ic_password_hide.png")
              }
            />
          }
        />
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
            minHeight: height / 2,
            paddingHorizontal: spacing.WIDTH_30,
            paddingTop: spacing.HEIGHT_20,
          }}
          nestedScrollEnabled={true}
        >
          <View
            style={{
              minHeight: height / 4,
            }}
          >
            {step == STEP_INITIAL_SCREEN && renderInitialScreenWithCustomerID()}

            {step == STEP_FORM && !haveCustomerId && renderWithoutCustomerID()}
            {step == STEP_FORM && haveCustomerId && renderUserDetailsWithOTP()}
            {step == STEP_OTP_VERIFY_WITHOUT_CUSTOMER_ID &&
              renderUserDetailsWithOTP()}

            {step == STEP_VERIFY && rendersetUserPassword()}

            {step == STEP_VERIFY && (
              <>
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
                <Button
                  disabled={
                    password == "" ||
                    confirmPassword == "" ||
                    password != confirmPassword
                  }
                  onPress={submit}
                >
                  REGISTER
                </Button>
              </>
            )}
            {privaceyError !== "" && showErrorMessage(privaceyError)}

            {!registerForm.initRegisterForm &&
              registerForm?.otpFormData?.errorCode !== "200" &&
              registerForm?.otpUsageType === "Register" &&
              showErrorMessage(registerForm?.otpFormData?.message)}
          </View>
          {/* {showAlert()} */}

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
