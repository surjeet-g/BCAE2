import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  DEBUG_BUILD,
  STAGE_FAQ,
  PROD_FAQ,
  WEBCLIENT_ID,
} from "../../Utilities/Constants/Constant";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
import { capitalizeFirstLetter } from "../../Utilities/utils";
import { strings } from "../../Utilities/Language";

import CustomerEmailLogin from "./component/CustomerEmailLogin";
import MobileLoging from "./component/MobileLoging";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "../../Components/Toast";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { resetLogin, verifyLoginData } from "./LoginDispatcher";
import {
  requestUserPermission,
  notificationListener,
} from "../../Utilities/FCM/NotificationService";
import { ToggleButton } from "../../Components/ToggleButton";
import { Button, RadioButton } from "react-native-paper";
import { SvgBG } from "../../Components/SvgBG";

const BUSINESS = "business";
const CONSUMER = "consumer";
const EMAIL = "Email Address";
const MOBILE = "Mobile Number";

export const Login = ({ navigation }) => {
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      requestUserPermission();
      notificationListener(navigation);
    });
    return willFocusSubscription;
  }, []);

  const [userType, setUserType] = useState(BUSINESS);
  const [loginMode, setLoginMode] = useState(EMAIL);
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const [visible, setVisible] = React.useState(false);

  const [isFirstSelected, setFirstSelected] = useState(true);
  let login = useSelector((state) => state.login);
  const dispatch = useDispatch([resetLogin, verifyLoginData]);
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: WEBCLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      console.log(accessToken, idToken);
      // dispatch(verifyLoginData(props.navigation, "", ""));

      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("Cancel");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onSelectBusinessUserType = () => {
    setFirstSelected(true);
    setUserType(BUSINESS);
  };

  const onSelectConsumerUserType = () => {
    setFirstSelected(false);
    setUserType(CONSUMER);
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
    <View style={styles.container}>
      <SvgBG />
      <KeyboardAwareView animated={false}>
        <ScrollView
          style={{
            flexGrow: 1,
            paddingHorizontal: spacing.WIDTH_30,
            paddingTop: 80,
          }}
          nestedScrollEnabled={true}
        >
          <View
            style={{
              marginTop: spacing.HEIGHT_50,
              marginBottom: spacing.HEIGHT_30,
            }}
          >
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value={EMAIL}
              status={loginMode === EMAIL ? "checked" : "unchecked"}
              onPress={() => setLoginMode(EMAIL)}
            />
            <Text>{capitalizeFirstLetter(EMAIL)}</Text>
            <RadioButton
              value={MOBILE}
              status={loginMode === MOBILE ? "checked" : "unchecked"}
              onPress={() => setLoginMode(MOBILE)}
            />
            <Text>{capitalizeFirstLetter(MOBILE)}</Text>
          </View>

          {loginMode === EMAIL ? (
            <CustomerEmailLogin navigation={navigation} />
          ) : (
            <MobileLoging navigation={navigation} isFirst={isFirstSelected} />
          )}

          {/* <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          /> */}

          {/* Forgot Password View */}
          <View
            style={{ alignSelf: "center", marginVertical: spacing.HEIGHT_20 }}
          >
            <Pressable
              onPress={() =>
                props.navigation.navigate("ForgotPassword", { isFirst: true })
              }
            >
              <Text style={styles.forgotText}>{strings.forgot_password}</Text>
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
        </ScrollView>
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
      </KeyboardAwareView>
    </View>
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
  forgotText: {
    color: "#E22D2D",
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  noAccText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  rgisterText: {
    fontWeight: "700",
    color: color.gray,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  upperText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
  },
});
