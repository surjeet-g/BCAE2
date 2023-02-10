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
import { SegmentedButtons } from "react-native-paper";
const TAB_EMAIL = 1;
const TAB_MOBILE = 0;
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

  return (
    <View style={styles.container}>
      <KeyboardAwareView animated={false}>
        <SegmentedButtons
          value={isFirstSelected}
          onValueChange={(value) => {
            dispatch(resetLogin());
            setFirstSelected(value);
          }}
          buttons={[
            {
              value: TAB_EMAIL,
              label: strings.customer_email_ID,
            },
            {
              value: TAB_MOBILE,
              label: strings.mobile_no,
            },
          ]}
        />
        <ScrollView
          style={{
            flexGrow: 1,
            paddingHorizontal: spacing.WIDTH_30,
            paddingTop: spacing.HEIGHT_50 * 2,
          }}
          nestedScrollEnabled={true}
        >
          {isFirstSelected ? (
            <CustomerEmailLogin navigation={navigation} />
          ) : (
            <MobileLoging navigation={navigation} isFirst={isFirstSelected} />
          )}
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
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
