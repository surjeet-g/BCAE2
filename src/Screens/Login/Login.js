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
import { Button } from "react-native-paper";
const TAB_EMAIL = true;
const TAB_MOBILE = false;

export const Login = ({ navigation }) => {
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      requestUserPermission();
      notificationListener(navigation);
    });
    return willFocusSubscription;
  }, []);

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const [visible, setVisible] = React.useState(false);

  const [isFirstSelected, setFirstSelected] = useState(TAB_EMAIL);
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

  const onPressFirst = () => {
    dispatch(resetLogin());
    setFirstSelected(TAB_EMAIL);
  };
  const onPressSecond = () => {
    dispatch(resetLogin());
    setFirstSelected(TAB_MOBILE);
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
      <KeyboardAwareView animated={false}>
        <ScrollView
          style={{
            flexGrow: 1,
            paddingHorizontal: spacing.WIDTH_30,
            // paddingTop: spacing.HEIGHT_50 * 2,
            marginBottom: spacing.HEIGHT_30,
          }}
          nestedScrollEnabled={true}
        >
          <View
            style={{ marginBottom: spacing.WIDTH_30, alignItems: "center" }}
          >
            <Image
              style={styles.logo}
              source={require("../../Assets/icons/ic_td123_logo.png")}
            ></Image>
          </View>

          <View
            style={{
              marginTop: spacing.WIDTH_15,
              marginBottom: spacing.WIDTH_30,
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Pressable
              onPress={() =>
                navigation.navigate("Anouncement", { fromLogin: true })
              }
              style={{
                marginTop: spacing.HEIGHT_6,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Image
                style={styles.upperLogo}
                source={require("../../Assets/icons/announcement_login.png")}
              />
              <Text style={styles.upperText}>{strings.announcement}</Text>
            </Pressable>

            <View
              style={{
                width: 1,
                height: 40,
                backgroundColor: color.DISABLED_GREY,
              }}
            ></View>

            <Pressable
              onPress={() =>
                navigation.navigate("ShowWebPage", {
                  fromLogin: false,
                  url: DEBUG_BUILD ? STAGE_FAQ : PROD_FAQ,
                  title: "FAQ",
                })
              }
              style={{
                marginTop: spacing.HEIGHT_6,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Image
                style={styles.upperLogo}
                source={require("../../Assets/icons/faq_login.png")}
              />
              <Text style={styles.upperText}>{strings.faq}</Text>
            </Pressable>
          </View>

          <View style={{ marginBottom: spacing.WIDTH_20 }}>
            <ToggleButton
              isFirstSelected={isFirstSelected}
              label={{
                first: strings.customer_email_ID,
                second: strings.mobile_no,
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
              onPressFirst={onPressFirst}
              onPressSecond={onPressSecond}
            ></ToggleButton>
          </View>

          {isFirstSelected ? (
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

          {orSection()}

          <View>
            <Text style={styles.noAccText}>{strings.dont_account}</Text>
            <Pressable
              onPress={() => navigation.navigate("Register with us", {})}
            >
              <Text style={styles.rgisterText}>
                {strings.register_with_us.toUpperCase()}
              </Text>
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
    color: color.BCAE_PRIMARY,
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
