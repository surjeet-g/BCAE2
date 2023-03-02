import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { spacing, fontSizes, color } from "../../Utilities/Constants/Constant";
import { CustomButton } from "../../Components/CustomButton";
import {
  capitalizeFirstLetter,
  getPhoneNumberLength,
  excludedCountriesList,
} from "../../Utilities/utils";
import { strings } from "../../Utilities/Language";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../Components/Toast";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import {
  resetLogin,
  verifyLoginData,
  resetShowSecondLoginAlert,
  callLogoutAndLogin,
  sendLoginOTPData,
} from "./LoginDispatcher";
import {
  requestUserPermission,
  notificationListener,
} from "../../Utilities/FCM/NotificationService";
import { ToggleButton } from "../../Components/ToggleButton";
import { RadioButton, Modal } from "react-native-paper";
import { SvgBG } from "../../Components/SvgBG";
import { TextInput, useTheme } from "react-native-paper";
import { CustomInput } from "../../Components/CustomInput";
import { CustomInputWithCC } from "../../Components/CustomInputWithCC";
import { CustomErrorText } from "../../Components/CustomErrorText";
import { HEADER_MARGIN } from "../../Utilities/themeConfig";
import { CountryPicker } from "react-native-country-codes-picker";

const BUSINESS = "business";
const CONSUMER = "consumer";
const EMAIL = "Email Address";
const MOBILE = "Mobile Number";
const PASSWORD = "password";
const OTP = "otp";

export const Login = ({ navigation }) => {
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      requestUserPermission();
      notificationListener(navigation);
    });
    return willFocusSubscription;
  }, []);

  const [userType, setUserType] = useState(BUSINESS); // BUSINESS or CONSUMER
  const [loginMode, setLoginMode] = useState(EMAIL); // EMAIL or MOBILE
  const [loginType, setLoginType] = useState(PASSWORD); // PASSWORD or OTP
  const [isFirstSelected, setFirstSelected] = useState(true);
  const [username, setUsername] = useState("vipinv0647@gmail.com");
  const [password, setPassword] = useState("Test@123");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [params, setParams] = useState("");
  const [countryCode, setCountryCode] = useState("+673");
  const [numberMaxLength, setNumberMaxLength] = useState(7);
  const [countryPickModel, setCountryPickModel] = useState(false);

  let login = useSelector((state) => state.login);

  const dispatch = useDispatch([
    resetLogin,
    verifyLoginData,
    resetShowSecondLoginAlert,
    callLogoutAndLogin,
    sendLoginOTPData,
  ]);

  const onSelectBusinessUserType = () => {
    setFirstSelected(true);
    setUserType(BUSINESS);
  };

  const onSelectConsumerUserType = () => {
    setFirstSelected(false);
    setUserType(CONSUMER);
  };

  const onIDChange = (textStr) => {
    if (loginMode === EMAIL) {
      setUsername(textStr);
      setUsernameError("");
    } else {
      setNumber(textStr);
      setNumberError("");
    }

    if (textStr.length == 0) {
      dispatch(resetLogin());
    }
  };

  const onPasswordChange = (textStr) => {
    setPassword(textStr);
    if (textStr.length == 0) {
      dispatch(resetLogin());
    }
    setPasswordError("");
  };

  const clearTextClick = () => {
    loginMode === EMAIL ? setUsername("") : setNumber("");
    dispatch(resetLogin());
  };

  const hideShowClick = () => {
    setsecureTextEntry(!secureTextEntry);
  };

  const submitWithEmail = (loginType) => {
    setLoginType(loginType);
    if (username.includes("@")) {
      if (username === "") {
        setUsernameError(strings.emailValidError);
      } else if (password === "") {
        setPasswordError(strings.passwordValidErrorLogin);
      } else {
        param = {
          loginId: username,
          password,
          userType:
            userType === BUSINESS ? "BusinessCustomer" : "PersonalCustomer",
          loginType: loginType.toUpperCase(),
          loginMode,
        };
        setParams(param);
        dispatch(verifyLoginData(navigation, param));
      }
    } else {
      setUsernameError(strings.emailValidError);
    }
  };

  const submitWithMobile = (loginType) => {
    setLoginType(loginType);
    if (number.length !== numberMaxLength) {
      setNumberError(`Please enter a ${numberMaxLength} digit mobile number!!`);
    } else if (password === "") {
      setPasswordError(strings.passwordValidErrorLogin);
    } else {
      param = {
        loginId: number,
        password,
        userType:
          userType === BUSINESS ? "BusinessCustomer" : "PersonalCustomer",
        loginType: loginType.toUpperCase(),
        loginMode,
      };
      setParams(param);
      dispatch(verifyLoginData(navigation, param));
    }
  };

  const submitWithEmailOTP = (loginType) => {
    setLoginType(loginType);
    console.log("$$$-submitWithEmailOTP");
    console.log("$$$-submitWithEmailOTP-loginType", loginType);
    if (username.includes("@")) {
      console.log("$$$-submitWithEmailOTP");
      if (username === "") {
        setUsernameError(strings.emailValidError);
      } else {
        param = {
          loginId: username,
          userType:
            userType === BUSINESS ? "BusinessCustomer" : "PersonalCustomer",
          loginType: loginType.toUpperCase(),
          loginMode,
          extn: 0,
        };
        console.log("$$$-submitWithEmailOTP-param", param);
        setParams(param);
        dispatch(sendLoginOTPData(navigation, param, true));
      }
    } else {
      setUsernameError(strings.emailValidError);
    }
  };

  const submitWithMobileOTP = (loginType) => {
    setLoginType(loginType);
    if (number.length !== numberMaxLength) {
      setNumberError(`Please enter a ${numberMaxLength} digit mobile number!!`);
    } else {
      param = {
        loginId: number,
        userType:
          userType === BUSINESS ? "BusinessCustomer" : "PersonalCustomer",
        loginType: loginType.toUpperCase(),
        loginMode,
        extn: countryCode.substring(1),
      };
      setParams(param);
      dispatch(sendLoginOTPData(navigation, param, true));
    }
  };

  return (
    <View style={styles.container}>
      <SvgBG />
      <KeyboardAwareView animated={false}>
        <View
          style={{
            paddingHorizontal: spacing.WIDTH_30,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <ScrollView nestedScrollEnabled={true}>
            <View style={{ marginTop: 10, flex: 1 }}>
              <View
                style={{
                  marginBottom: spacing.HEIGHT_20,
                }}
              >
                <Text style={{ fontWeight: 600, marginBottom: 10 }}>
                  {strings.check_usertype}
                </Text>
                <ToggleButton
                  isFirstSelected={isFirstSelected}
                  label={{
                    first: capitalizeFirstLetter(BUSINESS),
                    second: capitalizeFirstLetter(CONSUMER),
                  }}
                  bgColor={{
                    selected: color.BCAE_PRIMARY,
                    unselected: color.BCAE_LIGHT_BLUE_2,
                  }}
                  textColor={{
                    selected: color.WHITE,
                    unselected: color.BCAE_PRIMARY,
                  }}
                  textPro={{
                    fontSize: fontSizes.FONT_13,
                    fontWeight: "600",
                    lineHeight: spacing.HEIGHT_16,
                  }}
                  onPressFirst={onSelectBusinessUserType}
                  onPressSecond={onSelectConsumerUserType}
                ></ToggleButton>
              </View>

              {/* Radio Button View */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: spacing.HEIGHT_10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value={EMAIL}
                    status={loginMode === EMAIL ? "checked" : "unchecked"}
                    onPress={() => setLoginMode(EMAIL)}
                  />
                  <Text style={{ color: "#3D3D3D", fontWeight: 600 }}>
                    {capitalizeFirstLetter(EMAIL)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value={MOBILE}
                    status={loginMode === MOBILE ? "checked" : "unchecked"}
                    onPress={() => setLoginMode(MOBILE)}
                  />
                  <Text style={{ color: "#3D3D3D", fontWeight: 600 }}>
                    {capitalizeFirstLetter(MOBILE)}
                  </Text>
                </View>
              </View>

              {loginMode === EMAIL ? (
                <View>
                  {/* Email Address Input View */}
                  <View style={{ marginBottom: spacing.HEIGHT_20 }}>
                    <CustomInput
                      caption="Email Address"
                      value={username}
                      onChangeText={(text) => onIDChange(text)}
                      right={
                        username && (
                          <TextInput.Icon
                            onPress={clearTextClick}
                            style={{ width: 23, height: 23 }}
                            icon="close"
                          />
                        )
                      }
                    />

                    {!login.initLogin &&
                      login?.loggedProfile?.errorCode == "404" && (
                        <CustomErrorText
                          errMessage={login?.loggedProfile?.message}
                        />
                      )}
                    {usernameError !== "" && (
                      <CustomErrorText errMessage={usernameError} />
                    )}
                  </View>
                </View>
              ) : (
                <View>
                  {/* Mobile Number View */}
                  <View style={{ marginBottom: spacing.HEIGHT_20 }}>
                    <CountryPicker
                      show={countryPickModel}
                      excludedCountries={excludedCountriesList()}
                      pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setCountryPickModel(false);
                        setNumberMaxLength(getPhoneNumberLength(item.code));
                      }}
                      onBackdropPress={() => setCountryPickModel(false)}
                      style={{
                        modal: {
                          height: "65%",
                        },
                      }}
                    />
                    <CustomInputWithCC
                      onPressOnCountyCode={() => setCountryPickModel(true)}
                      countryCode={countryCode}
                      caption={strings.mobile_no}
                      onChangeText={(text) => onIDChange(text)}
                      value={number}
                      placeHolder={strings.mobile_no}
                      keyboardType="numeric"
                      maxLength={numberMaxLength}
                    />
                    {!login.initLogin &&
                      login?.loggedProfile?.errorCode == "404" && (
                        <CustomErrorText
                          errMessage={login?.loggedProfile?.message}
                        />
                      )}
                    {numberError !== "" && (
                      <CustomErrorText errMessage={numberError} />
                    )}
                  </View>
                </View>
              )}
            </View>

            {/* Password Input View */}
            <View style={{ marginBottom: spacing.HEIGHT_20 }}>
              <CustomInput
                value={password}
                caption={strings.password}
                placeHolder={strings.password}
                onChangeText={(text) => onPasswordChange(text)}
                secureTextEntry={secureTextEntry}
                right={
                  password && (
                    <TextInput.Icon
                      onPress={hideShowClick}
                      style={{ width: 23, height: 23 }}
                      icon={
                        secureTextEntry
                          ? require("../../Assets/icons/ic_password_show.png")
                          : require("../../Assets/icons/ic_password_hide.png")
                      }
                    />
                  )
                }
              />

              {!login.initLogin &&
                login?.loggedProfile?.errorCode &&
                login.loggedProfile.errorCode != "404" &&
                login?.loggedProfile?.errorCode != "10000" &&
                login?.loggedProfile?.errorCode != "10001" && (
                  <CustomErrorText errMessage={login?.loggedProfile?.message} />
                )}
              {passwordError !== "" && (
                <CustomErrorText errMessage={passwordError} />
              )}
            </View>

            {/* Bottom View */}
            <View
              style={{
                marginVertical: spacing.HEIGHT_30,
              }}
            >
              {/* Login with OTP View */}
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    marginVertical: spacing.HEIGHT_15,
                    color: "#F5AD47",
                    fontWeight: "700",
                    fontSize: fontSizes.FONT_16,
                  }}
                  onPress={() => {
                    loginMode === EMAIL
                      ? submitWithEmailOTP(OTP)
                      : submitWithMobileOTP(OTP);
                  }}
                >
                  {strings.login_with_otp}
                </Text>
              </View>

              {/* Login View */}
              <View>
                <CustomButton
                  loading={login.initLogin}
                  label={strings.login}
                  isDisabled={
                    loginMode === EMAIL
                      ? username == "" || password == ""
                        ? true
                        : false
                      : number == "" || password == ""
                      ? true
                      : false
                  }
                  onPress={() => {
                    loginMode === EMAIL
                      ? submitWithEmail(PASSWORD)
                      : submitWithMobile(PASSWORD);
                  }}
                />
              </View>

              {/* Forgot Password View */}
              <View
                style={{
                  alignSelf: "center",
                  marginVertical: spacing.HEIGHT_20,
                }}
              >
                <Pressable
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.forgotText}>
                    {strings.forgot_password}
                  </Text>
                </Pressable>
              </View>

              {/* Register View */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <Text style={styles.noAccText}>{strings.dont_account}</Text>
                <Pressable
                  onPress={() => navigation.navigate("Register with us", {})}
                >
                  <Text style={styles.rgisterText}>{strings.register}</Text>
                </Pressable>
              </View>
            </View>
            {/* </ScrollView> */}
            {!login.initLogin &&
              (login?.loggedProfile?.errorCode == "10000" ||
                login?.loggedProfile?.errorCode == "10001") && (
                <View style={styles.toast}>
                  <Toast
                    bgColor={color.TOAST_RED}
                    customStyle={{ paddingHorizontal: spacing.WIDTH_30 }}
                    textPro={{
                      color: color.WHITE,
                      fontSize: fontSizes.FONT_14,
                      fontWeight: "700",
                    }}
                    img={
                      login?.loggedProfile?.errorCode == "10001"
                        ? require("../../Assets/icons/ic_no_Internet.png")
                        : require("../../Assets/icons/ci_error-warning-fill.png")
                    }
                    message={
                      login?.loggedProfile?.errorCode == "10001"
                        ? strings.no_network
                        : strings.something_went_wrong
                    }
                  />
                </View>
              )}
          </ScrollView>
        </View>
        {/* Modal for showing the second login alert */}
        <Modal
          visible={login?.showSecondLoginAlert}
          dismissable={false}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            borderRadius: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 22 }}>Login Error</Text>
            <Text style={{ marginTop: 10, fontSize: 18 }}>
              {login?.secondLoginAlertInfo?.data?.message}
            </Text>
            <CustomButton
              label={"Ok"}
              onPress={() =>
                dispatch(
                  callLogoutAndLogin(
                    login?.secondLoginAlertInfo?.data?.data?.userId,
                    navigation,
                    params
                  )
                )
              }
            />
            <CustomButton
              label={"Cancel"}
              onPress={() => dispatch(resetShowSecondLoginAlert())}
            />
          </View>
        </Modal>
      </KeyboardAwareView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
    ...HEADER_MARGIN,
  },
  toast: {
    position: "absolute",
    bottom: spacing.HEIGHT_31 * 2,
  },
  forgotText: {
    color: "#E22D2D",
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  noAccText: {
    color: "#202223",
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
    fontWeight: 400,
  },
  rgisterText: {
    fontWeight: "600",
    color: "#202223",
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
});
