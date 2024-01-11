import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  unstable_batchedUpdates
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import CustomSwitch from "react-native-custom-switch-new";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { Modal, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";
import { CustomErrorText } from "../../Components/CustomErrorText";
import { CustomInputWithCC } from "../../Components/CustomInputWithCC";
import { LoginCustomInput } from "../../Components/LoginCustomInput";
import { Toast } from "../../Components/Toast";
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


const { width, height } = Dimensions.get("window");

export const Login = ({ navigation }) => {



  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      requestUserPermission();
      notificationListener(navigation);
    });
    return willFocusSubscription;
  }, []);

  // Login flow changes
  const [userType, setUserType] = useState(BUSINESS); // BUSINESS or CONSUMER

  const [loginMode, setLoginMode] = useState(EMAIL); // EMAIL or MOBILE
  const [loginType, setLoginType] = useState(PASSWORD); // PASSWORD or OTP

  // Login flow changes
  const [isRegisterFirstSelected, setFirstSelected] = useState(true);


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
    unstable_batchedUpdates(() => {
      setFirstSelected(true);
      setUserType(BUSINESS);
      setUsernameError("");
      setPasswordError("");
      setNumberError("");
      dispatch(resetLogin());
    })
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

    // Login flow changes
    unstable_batchedUpdates(() => {
      setFirstSelected(true);
      setUserType(BUSINESS);
      setUsernameError("");
      setPasswordError("");
      setNumberError("");
      dispatch(resetLogin());
      setLoginType(loginType);
    })


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



  const ShowSecondLoginAlertDialog = (login) => {
    return (
      <View style={{
        padding: 5,
        borderRadius: 10, elevation: 10, marginBottom: 70,
        marginTop: 170, borderWidth: 0, alignSelf: "center",
        position: "absolute", top: 1, width: width - 70,
        backgroundColor: "white", zIndex: 99999999999999
      }}>
        <View
          style={{
            backgroundColor: "white",
            padding: 5,
            margin: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 22, color: "#000000" }}>Login Error</Text>
          <Text style={{ marginTop: 10, fontSize: 18, color: "#000000" }}>
            {login?.secondLoginAlertInfo?.data?.message}
          </Text>

          <View style={{ alignSelf: "center", flexDirection: "row" }}>
            <CustomButton
              style={{ width: 60 }}
              label={"Cancel"}
              onPress={() => dispatch(resetShowSecondLoginAlert())}
            />

            <CustomButton
              style={{ width: 60 }}
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
          </View>

        </View>
      </View>
    )
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../Assets/icons/splash_bg.png")}
      resizeMode="cover"
    >

      <View style={styles.loginContainer}>
        <View style={{
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* FOR NCRTC */}
          <Image
            source={require("../../Assets/icons/logo_new1.png")}
            // resizeMode="cover"
            style={{
              marginTop: 25,
              padding: 0,
              height: 100,
              width: 400
              // flex: 1,
            }}
          />
        </View>

        {/* <HeaderTitle header="Let us know dtWorks," subHeader="Who you are?" /> */}
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
                  margin: 30,
                  flex: 1,
                  paddingLeft: 40,
                  paddingRight: 40,
                  paddingBottom: 20,
                  paddingTop: 10,
                  backgroundColor: "#4c3794",
                  borderRadius: 16,
                  elevation: 5,
                }}
              >
                {/* Toggle Button View */}
                {/* <View> */}
                {/* <Text style={{ fontWeight: 600, marginBottom: 10 }}>
                  {strings.check_usertype}
                </Text> */}
                {/* <ToggleButton
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
              </View> */}


                {/* Radio Button View */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 10
                  }}
                >
                  <CustomSwitch
                    buttonWidth={20}
                    buttonPadding={10}
                    switchWidth={120}
                    startOnLeft={isEmailLoginMode}
                    onSwitch={onToggleSwitch}
                    onSwitchReverse={onToggleSwitch}
                    buttonColor="#4c3794"
                    switchBackgroundColor={"#FFFFFF"}
                    switchLeftText={"Email"}
                    switchLeftTextStyle={{
                      color: "#4c3794",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                    switchRightText={"Mobile"}
                    switchRightTextStyle={{
                      color: "#4c3794",
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
                      <LoginCustomInput
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
                          // Country name styles [Text]
                          countryName: {
                            color: "#000000"
                          },
                          dialCode: {
                            color: "#000000"
                          }
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
                <View style={{ marginBottom: spacing.HEIGHT_10 }}>
                  <LoginCustomInput
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
                  marginVertical: 0,
                }}
              >
                {/* Login with OTP View */}
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: 10,
                      marginBottom: 10,
                      color: "#4c3794",
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
                    marginVertical: 5,
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
                    marginVertical: 5,
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
                    marginVertical: 5,
                  }}
                >
                  <Text style={styles.noAccText}>Customer Onboarding?</Text>
                  <Pressable
                    onPress={() => navigation.navigate(STACK_CREATE_CUSTOMER, {})}
                  >
                    <Text style={styles.rgisterText}> Customer Onboarding</Text>
                  </Pressable>
                </View>
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

            <KeyboardAvoidingView style={{ flex: -65 }}>
              <StickyFooter style={{ marginBottom: 0 }}>
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
                    // onSelectBusinessUserType()
                    loginMode === EMAIL
                      ? submitWithEmail(PASSWORD)
                      : submitWithMobile(PASSWORD);
                  }}
                />
                {/* </View> */}
                {/* <Text
                style={{
                  color: "#4c3794",
                  fontSize: fontSizes.FONT_14,
                  textAlign: "center",
                  fontWeight: 400,
                  marginTop: 0,
                }}
              >
                By continuing, I accept and agree to Dtworks
              </Text> */}
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT_14,
                      textAlign: "center",
                      fontWeight: 400,
                      color: "#4c3794",
                      marginTop: 0,
                    }}
                    onPress={() => navigation.navigate("TermConidtion")}
                  >
                    Terms & Conditions
                  </Text>


                  <Text
                    style={{
                      fontSize: fontSizes.FONT_14,
                      textAlign: "center",
                      fontWeight: 400,
                      color: "#4c3794",
                      marginTop: 0,

                    }}
                    onPress={() => alert("Navigate to Privacy Policy")}
                  >
                    {"\t"}Privacy Policy
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#4c3794",
                    fontSize: fontSizes.FONT_12,
                    textAlign: "center",
                    fontWeight: 400,
                    marginTop: 5,
                  }}
                >
                  © {new Date().getFullYear()} NCRTC. All rights reserved.
                </Text>
              </StickyFooter>
            </KeyboardAvoidingView>

          </View>
        </KeyboardAwareView>


        {/* Modal for showing the second login alert */}
        {/* {login?.showSecondLoginAlert && (ShowSecondLoginAlertDialog(login))} */}


        {/* {login?.showSecondLoginAlert && (showSecondLoginAlert(login?.secondLoginAlertInfo?.data?.message))} */}

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
            <Text style={{ fontSize: 22, color: "#000000" }}>Login Error</Text>
            <Text style={{ marginTop: 10, fontSize: 18, color: "#000000" }}>
              {login?.secondLoginAlertInfo?.data?.message}
            </Text>

            <View style={{ alignSelf: "center", flexDirection: "row" }}>
              <CustomButton
                style={{ width: 60 }}
                label={"Cancel"}
                onPress={() => dispatch(resetShowSecondLoginAlert())}
              />

              <CustomButton
                style={{ width: 60 }}
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
            </View>

          </View>
        </Modal>
      </View>

    </ImageBackground>
  );

};




const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
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
    color: "#4c3794",
    fontSize: fontSizes.FONT_16,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  noAccText: {
    color: "#4c3794",
    fontSize: fontSizes.FONT_16,
    lineHeight: spacing.WIDTH_16,
    textAlign: "center",
    fontWeight: "400",
  },
  rgisterText: {
    fontWeight: "700",
    color: "#4c3794",
    fontSize: fontSizes.FONT_16,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
});
