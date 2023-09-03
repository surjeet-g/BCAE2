import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import CustomSwitch from "react-native-custom-switch-new";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { Modal, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { CustomErrorText } from "../../Components/CustomErrorText";
import { CustomInput } from "../../Components/CustomInput";
import { CustomInputWithCC } from "../../Components/CustomInputWithCC";
import { Toast } from "../../Components/Toast";
import { ToggleButton } from "../../Components/ToggleButton";
import { STACK_CREATE_CUSTOMER } from "../../Navigation/MyStack";
import {
  color,
  fontSizes,
  isValidNumber,
  spacing
} from "../../Utilities/Constants/Constant";
import {
  notificationListener,
  requestUserPermission
} from "../../Utilities/FCM/NotificationService";
import { strings } from "../../Utilities/Language";
import {
  excludedCountriesList,
  getPhoneNumberLength
} from "../../Utilities/utils";
import { StickyFooter } from "./../../Components/StickyFooter";
import { HeaderTitle } from "./../../Components/headerTitle";
import {
  callLogoutAndLogin,
  resetLogin,
  resetShowSecondLoginAlert,
  sendLoginOTPData,
  verifyLoginData
} from "./LoginDispatcher";

export const BUSINESS = "Business";
export const CONSUMER = "Consumer";
const EMAIL = "Email Address";
const MOBILE = "Mobile Number";
const PASSWORD = "password";
const OTP = "otp";
/**
 * Login : Handle Login Business and Customer login
 * @namespace Login  
 */
export const Login = ({ navigation }) => {
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      requestUserPermission();
      notificationListener(navigation);
    });
    return willFocusSubscription;
  }, []);

  const [userType, setUserType] = useState(CONSUMER); // BUSINESS or CONSUMER
  const [loginMode, setLoginMode] = useState(EMAIL); // EMAIL or MOBILE
  const [loginType, setLoginType] = useState(PASSWORD); // PASSWORD or OTP
  const [isRegisterFirstSelected, setFirstSelected] = useState(false);
  // const [username, setUsername] = useState("aher.dipak@bahwancybertek.com");
  // const [password, setPassword] = useState("Test@123");
  // const [username, setUsername] = useState("skavi7060@gmail.com");
  // const [password, setPassword] = useState("Test@123");
  //bussiness
  // const [username, setUsername] = useState("mobappbcae@yopmail.com");
  // const [password, setPassword] = useState("Test@123");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [params, setParams] = useState("");
  const [countryCode, setCountryCode] = useState("+673");
  const [numberMaxLength, setNumberMaxLength] = useState(7);
  const [countryPickModel, setCountryPickModel] = useState(false);

  const [isEmailLoginMode, setIsEmailLoginMode] = React.useState(true);

  const onToggleSwitch = () => {
    if (isEmailLoginMode) {
      onSelectEmailLoginMode();
    } else {
      onSelectMobileLoginMode();
    }
    setIsEmailLoginMode(!isEmailLoginMode);
  };

  let login = useSelector((state) => state.login);

  const dispatch = useDispatch([
    resetLogin,
    verifyLoginData,
    resetShowSecondLoginAlert,
    callLogoutAndLogin,
    sendLoginOTPData,
  ]);
  /**
  * Toggle of login type
  * @memberOf Login
  */
  const onSelectBusinessUserType = () => {
    setFirstSelected(true);
    setUserType(BUSINESS);
    setUsernameError("");
    setPasswordError("");
    setNumberError("");
    dispatch(resetLogin());
    // navigation.navigate("Register with us")
  };

  const onSelectConsumerUserType = () => {
    setFirstSelected(false);
    setUserType(CONSUMER);
    setUsernameError("");
    setPasswordError("");
    setNumberError("");
    dispatch(resetLogin());
  };

  const onSelectEmailLoginMode = () => {
    setLoginMode(EMAIL);
    setUsernameError("");
    setPasswordError("");
    setNumberError("");
    dispatch(resetLogin());
  };

  const onSelectMobileLoginMode = () => {
    setLoginMode(MOBILE);
    setUsernameError("");
    setPasswordError("");
    setNumberError("");
    dispatch(resetLogin());
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
  /**
  * Handle API Call for login 
  * @memberOf Login
   * @param  {string} loginType type of login (eg BUSINESS or Customer)
  */

  const submitWithEmail = (loginType) => {
    setLoginType(loginType);
    if (username.includes("@")) {
      if (username === "") {
        setUsernameError(strings.emailValidError);
      } else if (password === "") {
        setPasswordError(strings.passwordValidErrorLogin);
      } else {
        let param = {
          loginId: username,
          password,
          userType,
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
  /**
  * Handle API Call for login with mobile number
  *  @memberOf Login
   * @param  {string} loginType type of login (eg BUSINESS or Customer)
  */
  /**
   *  Get OTP for mobile validation
   *  @memberOf Login
    * @param  {string} loginType type of login (eg BUSINESS or Customer)
   */
  const submitWithMobile = (loginType) => {
    if (!isValidNumber(number)) {
      setNumberError(strings.mobileValidError);
    } else {
      setLoginType(loginType);
      if (number.length !== numberMaxLength) {
        setNumberError(
          `Please enter a ${numberMaxLength} digit mobile number!!`
        );
      } else if (password === "") {
        setPasswordError(strings.passwordValidErrorLogin);
      } else {
        let param = {
          loginId: number,
          password,
          userType,
          loginType: loginType.toUpperCase(),
          loginMode,
        };
        setParams(param);
        dispatch(verifyLoginData(navigation, param));
      }
    }
  };
  /**
  *  Get OTP for email validation
  *  @memberOf Login
   * @param  {string} loginType type of login (eg BUSINESS or Customer)
  */
  const submitWithEmailOTP = (loginType) => {
    setLoginType(loginType);
    if (username.includes("@")) {
      if (username === "") {
        setUsernameError(strings.emailValidError);
      } else {
        let param = {
          loginId: username,
          userType,
          loginType: loginType.toUpperCase(),
          loginMode,
          extn: 0,
        };
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
      let param = {
        loginId: number,
        userType,
        loginType: loginType.toUpperCase(),
        loginMode,
        extn: countryCode.substring(1),
      };
      setParams(param);
      dispatch(sendLoginOTPData(navigation, param, true));
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../Assets/icons/bg_others.png")}
      resizeMode="cover"
    >
      <HeaderTitle header="Let us know," subHeader="Who you are?" />
      <KeyboardAwareView animated={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <ScrollView nestedScrollEnabled={true}>
            <View
              style={{
                margin: 10,
                flex: 1,
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 16,
                elevation: 5,
              }}
            >
              {/* Toggle Button View */}
              <View>
                {/* <Text style={{ fontWeight: 600, marginBottom: 10 }}>
                  {strings.check_usertype}
                </Text> */}
                <ToggleButton
                  isFirstSelected={isRegisterFirstSelected}
                  label={{
                    first: BUSINESS,
                    second: CONSUMER,
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
                    lineHeight: spacing.HEIGHT_20,
                  }}
                  onPressFirst={onSelectBusinessUserType}
                  onPressSecond={onSelectConsumerUserType}
                ></ToggleButton>
              </View>


              {/* Radio Button View */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 20,
                  marginBottom: -20,
                }}
              >
                <CustomSwitch
                  buttonWidth={25}
                  buttonPadding={5}
                  switchWidth={90}
                  startOnLeft={isEmailLoginMode}
                  onSwitch={onToggleSwitch}
                  onSwitchReverse={onToggleSwitch}
                  buttonColor={"#5B5372"}
                  switchBackgroundColor={"#F2EFFF"}
                  switchLeftText={"Email"}
                  switchLeftTextStyle={{
                    color: "#4B3694",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  switchRightText={"Mobile"}
                  switchRightTextStyle={{
                    color: "#4B3694",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                />

                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value={EMAIL}
                    status={loginMode === EMAIL ? "checked" : "unchecked"}
                    onPress={onSelectEmailLoginMode}
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
                    onPress={onSelectMobileLoginMode}
                  />
                  <Text style={{ color: "#3D3D3D", fontWeight: 600 }}>
                    {capitalizeFirstLetter(MOBILE)}
                  </Text>
                </View> */}
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
                      onChangeText={(text) => {
                        text = text.replace(/[^0-9]/g, '')
                        onIDChange(text)
                      }
                      }
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
                    <CustomErrorText
                      errMessage={login?.loggedProfile?.message}
                    />
                  )}
                {passwordError !== "" && (
                  <CustomErrorText errMessage={passwordError} />
                )}
              </View>
            </View>

            {/* Bottom View */}
            <View
              style={{
                marginVertical: 10,
              }}
            >
              {/* Login with OTP View */}
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    marginVertical: spacing.HEIGHT_10,
                    color: "#BF873A",
                    fontWeight: 700,
                    fontSize: fontSizes.FONT_20,
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

              {/* Forgot Password View */}
              <View
                style={{
                  alignSelf: "center",
                  marginVertical: 10,
                }}
              >
                <Pressable
                  onPress={() => navigation.navigate("ForgotPassword")}
                  style={{ flexDirection: "row" }}
                >
                  <Text style={styles.noAccText}>{"Trouble Sign-In? "}</Text>
                  <Text style={styles.forgotText}>
                    {strings.forgot_password}
                  </Text>
                </Pressable>
              </View>


              {/* Register View */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={styles.noAccText}>{strings.dont_account}</Text>
                <Pressable
                  onPress={() => navigation.navigate("Register with us", {})}
                >
                  <Text style={styles.rgisterText}> {strings.register}</Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={styles.noAccText}>Customer Onboarding?</Text>
                <Pressable
                  onPress={() => navigation.navigate(STACK_CREATE_CUSTOMER, {})}
                >
                  <Text style={styles.rgisterText}> Customer Onboarding</Text>
                </Pressable>
              </View>
              <ClearSpace size={2} />
            </View>

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

          <KeyboardAvoidingView style={{ flex: -75 }}>
            <StickyFooter>
              {/* Login View */}
              {/* <View> */}
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
              {/* </View> */}
              <Text
                style={{
                  color: "#393939",
                  fontSize: fontSizes.FONT_14,
                  textAlign: "center",
                  fontWeight: 400,
                  marginTop: 10,
                }}
              >
                By continuing, I accept and agree to Dtworks
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: fontSizes.FONT_14,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#4B3694",
                    marginTop: 5,
                  }}
                  onPress={() => navigation.navigate("TermConidtion")}
                >
                  Terms & Conditions of Use
                </Text>
                <Text
                  style={{
                    fontSize: fontSizes.FONT_14,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#000000",
                    marginTop: 5,
                  }}
                >
                  {" "}
                  &{" "}
                </Text>
                <Text
                  style={{
                    fontSize: fontSizes.FONT_14,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#4B3694",
                    marginTop: 5,
                  }}
                  onPress={() => alert("Navigate to Privacy Policy")}
                >
                  Privacy Policy
                </Text>
              </View>
              <Text
                style={{
                  color: "#393939",
                  fontSize: fontSizes.FONT_12,
                  textAlign: "center",
                  fontWeight: 400,
                  marginTop: 10,
                }}
              >
                © {new Date().getFullYear()} Dtworks. All rights reserved.
              </Text>
            </StickyFooter>
          </KeyboardAvoidingView>

        </View>
      </KeyboardAwareView>
      {/* Modal for showing the second login alert */}
      <Modal
        visible={login?.showSecondLoginAlert}
        dismissable={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            borderRadius: 10,
          }}
        >
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
