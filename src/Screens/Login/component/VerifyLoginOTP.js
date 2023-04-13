import React, { useEffect, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { Modal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../../Components/CustomButton";
import {
  color,
  fontSizes,
  spacing,
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";
import { HEADER_MARGIN } from "../../../Utilities/themeConfig";
import {
  callLogoutAndLogin,
  resetShowSecondLoginAlert,
  sendLoginOTPData,
  verifyLoginData,
} from ".././LoginDispatcher";
import OtpInputs, { OtpInputsRef } from "react-native-otp-inputs";

const VerifyLoginOTP = (props) => {
  const { navigation, route } = props;
  const { loginId, loginMode, loginType, userType } = route.params;
  const [otp, setOTP] = useState("");
  const [params, setParams] = useState("");
  const dispatch = useDispatch([
    verifyLoginData,
    sendLoginOTPData,
    resetShowSecondLoginAlert,
    callLogoutAndLogin,
  ]);
  let login = useSelector((state) => state.login);

  useEffect(() => {
    if (otp.length === 6) {
      let param = {
        loginId,
        password: otp,
        userType,
        loginType: loginType.toUpperCase(),
        loginMode,
      };
      setParams(param);
      dispatch(verifyLoginData(navigation, param));
    }
  }, [otp]);

  const clickOnRequestAgainOTP = () => {
    setOTP("");
    otpRef.current.reset();
    let param = {
      loginId,
      userType,
      loginType,
      loginMode,
    };
    setParams(param);
    dispatch(sendLoginOTPData(navigation, param, false));
  };

  const otpRef = useRef(OtpInputsRef);

  const maskingFunction = (text) => {
    let maskedText = "";
    if (loginMode.includes("Email")) {
      let txtStart = text.toString().substring(0, 5);
      let txtEnd = text.toString().substring(text.length - 5, text.length);
      maskedText = txtStart + "xxxxxxxxxxxx" + txtEnd;
    } else if (loginMode.includes("Mobile")) {
      let txtStart = text.toString().substring(0, 2);
      let txtEnd = text.toString().substring(text.length - 2, text.length);
      maskedText = txtStart + "xxxxx" + txtEnd;
    }
    return maskedText;
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../Assets/icons/bg_others.png")}
      resizeMode="cover"
    >
      <Text style={{ fontSize: 18, marginLeft: 15 }}>{"Let us know,"}</Text>
      <Text style={{ fontSize: 28, marginLeft: 15 }}>{"Who you are?"}</Text>
      <KeyboardAwareView
        animated={false}
        style={{
          flex: 1,
          paddingHorizontal: spacing.WIDTH_30,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 40,
              fontWeight: 600,
              color: "#202223",
              fontSize: fontSizes.FONT_18,
            }}
          >
            Verify your {loginMode} {"\n"} {maskingFunction(loginId)}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 400,
              color: "#000000",
              fontSize: fontSizes.FONT_16,
            }}
          >
            {strings.enter_otp_here}
          </Text>
          {/* OTP Box */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <OtpInputs
              style={{
                flexDirection: "row",
              }}
              inputContainerStyles={{
                backgroundColor: "white",
                width: 50,
                height: 50,
                borderWidth: 1,
                borderColor: "#C7CAD1",
                borderRadius: 12,
                margin: 3,
              }}
              inputStyles={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#5E5676",
                textAlign: "center",
                fontSize: 20,
                color: "#5E5676",
                fontWeight: "bold",
              }}
              // focusStyles={{ backgroundColor: "#5E5676" }}
              // caretHidden={true}
              autofillFromClipboard={true}
              autofillListenerIntervalMS={2000}
              keyboardType="phone-pad"
              ref={otpRef}
              selectTextOnFocus={false}
              handleChange={(code) => setOTP(code)}
              numberOfInputs={6}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: 400,
                color: "#3D3D3D",
                fontSize: fontSizes.FONT_16,
              }}
            >
              {strings.didt_receive_code}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: 700,
                color: "#4B3694",
                fontSize: fontSizes.FONT_16,
              }}
              onPress={clickOnRequestAgainOTP}
            >
              {strings.request_again}
            </Text>
          </View>
        </View>
      </KeyboardAwareView>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
    ...HEADER_MARGIN,
  },
});

export default VerifyLoginOTP;
