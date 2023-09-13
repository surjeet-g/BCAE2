import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { ToggleButton } from "../../Components/ToggleButton";

import {
  ImageBackground,
  Platform,
  StyleSheet, View
} from "react-native";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";

import { FullPageLoder } from "../../Components/FullPageLoder";
import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister
} from "../../Redux/RegisterDispatcher";
import { strings } from "../../Utilities/Language/index";

import { resetRegister, setOtpFormData } from "../../Redux/RegisterAction";

import { useTheme } from "react-native-paper";
import { HeaderTitle } from "../../Components/headerTitle";
import { getMasterConfig, getMasterData, MASTER_DATA_CONSTANT } from "../../Redux/masterDataDispatcher";
import theme from "../../Utilities/themeConfig";
import { RegisterExistingUser } from "./components/RegisterExistingUser";
import { RegisterPersonal } from "./components/RegisterPersonal";

const TAB_EMAIL = true;
const TAB_MOBILE = false;

const Register = ({ navigation, props }) => {
  let registerForm = useSelector((state) => state.registerForm);
  const { colors, roundness } = useTheme();
  const [isFirstSelected, setFirstSelected] = useState(TAB_EMAIL);

  //reseting state
  const dispatch = useDispatch([
    fetchRegisterFormData,
    sendOtp,
    userRegister,
    getOtpForCheck,
    getMasterData,
    getMasterConfig
  ]);

  const preRequiredDataFetch = () => {

    const { GENDER, ADDRESS_TYPE, CUSTOMER_ID_TYPE } = MASTER_DATA_CONSTANT;

    dispatch(getMasterData(`${GENDER},${ADDRESS_TYPE},${CUSTOMER_ID_TYPE}`));
    dispatch(getMasterConfig());

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
    if (Platform.OS === "ios") {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              // if (Platform.OS === "ios") {
              request(PERMISSIONS.IOS.LOCATION_ALWAYS)
                .then((result) => console.log(result))
                .catch((error) => console.log(error));
              // }
              break;
            case RESULTS.DENIED:
              console.log(
                "The permission has not been requested / is denied but requestable"
              );
              break;
            case RESULTS.LIMITED:
              console.log(
                "The permission is limited: some actions are possible"
              );
              break;
            case RESULTS.GRANTED:
              console.log("The permission is granted");
              break;
            case RESULTS.BLOCKED:
              console.log(
                "The permission is denied and not requestable anymore"
              );
              break;
          }
        })
        .catch((error) => {
          // …
        });
    }
  }, []);

  const renderTab = useMemo(() => {
    return isFirstSelected ? (
      <RegisterPersonal navigation={navigation} />
    ) : (
      <RegisterExistingUser navigation={navigation} />
    );
  }, [isFirstSelected]);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../Assets/icons/bg_others.png")}
      resizeMode="cover"
    >
      <HeaderTitle header="New to dtWorks?" subHeader="Create your account" />
      {registerForm.initRegisterForm ? (
        <FullPageLoder bgColor={color.DISABLED_GREY} loderColor={color.WHITE} />
      ) : (
        <View
          style={{
            flexGrow: 1,
            // paddingHorizontal: spacing.WIDTH_30,
            // marginTop: 50,
            // paddingTop: 10,
            // ...HEADER_MARGIN,
            marginTop: 12,
            borderRadius: roundness,
            // backgroundColor: colors.background,
            //marginHorizontal: 12,
            //padding: 12,
            // ...SHADOW_STYLE,
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              padding: 12,
            }}
          >
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
                // lineHeight: spacing.HEIGHT_16,
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
          </View>
          {renderTab}
        </View>
      )}
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  alreadyAccount: {
    marginTop: spacing.HEIGHT_30,
    fontWeight: "400",
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  loginText: {
    marginTop: spacing.HEIGHT_6,
    fontWeight: "500",
    color: theme.colors.secondary,

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
