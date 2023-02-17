import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { ToggleButton } from "../../Components/ToggleButton";

import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { spacing, color, fontSizes } from "../../Utilities/Constants/Constant";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
} from "./RegisterDispatcher";
import { strings } from "../../Utilities/Language/index";
import { FullPageLoder } from "../../Components/FullPageLoder";
import Header from "../TabScreens/Component/Header";
import { resetRegister, setOtpFormData } from "./RegisterAction";

import { RegisterPersonal } from "./components/RegisterPersonal";
import { RegisterExistingUser } from "./components/RegisterExistingUser";

const TAB_EMAIL = true;
const TAB_MOBILE = false;

const Register = ({ navigation, props }) => {
  let registerForm = useSelector((state) => state.registerForm);

  const [isFirstSelected, setFirstSelected] = useState(TAB_EMAIL);

  const [myscreenmae, _] = useState("Register With Us");

  //reseting state
  const dispatch = useDispatch([
    fetchRegisterFormData,
    sendOtp,
    userRegister,
    getOtpForCheck,
  ]);

  const preRequiredDataFetch = () => {
    dispatch(fetchRegisterFormData());

    dispatch(setOtpFormData({}, "Register"));
    dispatch(setOtpFormData({}, "mobile"));
    dispatch(setOtpFormData({}, "mobileOtp"));
    dispatch(setOtpFormData({}, "email"));
    dispatch(setOtpFormData({}, "emailOtp"));
  };
  useEffect(() => {
    preRequiredDataFetch();
  }, []);

  useEffect(() => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            if (Platform.OS === "ios") {
              request(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then((result) => console.log(result))
                .catch((error) => console.log(error));
            }
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }, []);

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
          dispatch(setOtpFormData({}, "mobileOtp"));
          dispatch(setOtpFormData({}, "email"));
          dispatch(setOtpFormData({}, "emailOtp"));
          navigation.navigate("Login", {});
        },
      },
    ]);
    // }
    // if (
    //   !registerForm.initOtpForm &&
    //   !registerForm?.isOtpFormError &&
    //   registerForm?.otpUsageType === "mobile"
    // ) {
    //   setIsDisableSendOtp(true);
    //   runOtpTimer(otpTimer);
    // }
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

  const renderTab = useMemo(() => {
    return isFirstSelected ? (
      <RegisterPersonal navigation={navigation} />
    ) : (
      <RegisterExistingUser navigation={navigation} />
    );
  }, [isFirstSelected]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          Text={myscreenmae}
          navigation={navigation}
          backIconVisibility={true}
          registerfaq={true}
        ></Header>
        {registerForm.initRegisterForm ? (
          <FullPageLoder
            bgColor={color.DISABLED_GREY}
            loderColor={color.WHITE}
          />
        ) : (
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
            <ToggleButton
              isFirstSelected={isFirstSelected}
              label={{
                first: strings.tab_personal,
                second: strings.tab_existing,
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
              onPressFirst={async () => {
                dispatch(resetRegister());
                preRequiredDataFetch();
                setFirstSelected(TAB_EMAIL);
              }}
              onPressSecond={() => {
                dispatch(resetRegister());
                preRequiredDataFetch();
                setFirstSelected(TAB_MOBILE);
              }}
            ></ToggleButton>

            {renderTab}
            {/* First Name */}

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
        )}
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
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
