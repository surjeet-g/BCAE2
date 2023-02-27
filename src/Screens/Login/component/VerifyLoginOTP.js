import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SvgBG } from "../../../Components/SvgBG";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { TextInput } from "react-native-paper";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  DEBUG_BUILD,
  STAGE_FAQ,
  PROD_FAQ,
  WEBCLIENT_ID,
} from "../../../Utilities/Constants/Constant";
import OtpInputs, { OtpInputsRef } from "react-native-otp-inputs";
import { strings } from "../../../Utilities/Language";
import { verifyLoginData, sendLoginOTPData } from ".././LoginDispatcher";
import { useDispatch, useSelector } from "react-redux";

const VerifyLoginOTP = (props) => {
  console.log("$$$-VerifyLoginOTP");
  console.log("$$$-VerifyLoginOTP-props", props);
  const { navigation, route } = props;
  const { loginId, loginMode, loginType, userType } = route.params;
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch([verifyLoginData, sendLoginOTPData]);
  let login = useSelector((state) => state.login);

  useEffect(() => {
    console.log("$$$-otp", otp);
    if (otp.length === 6) {
      console.log("$$$-otp-length is 6 - calling login endpoint");
      param = {
        loginId,
        password: otp,
        userType,
        loginType: loginType.toUpperCase(),
        loginMode,
      };
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
    <View style={styles.container}>
      <SvgBG />
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
            // backgroundColor: "red",
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
              color: "#B1AFAF",
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
                borderColor: "#BABEC5",
                borderRadius: 12,
                margin: 3,
              }}
              inputStyles={{
                borderRadius: 12,
                textAlign: "center",
                fontSize: 20,
                color: "#F5AD47",
                fontWeight: "bold",
              }}
              // focusStyles={{ backgroundColor: "#F5AD47" }}
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
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              fontWeight: 400,
              color: "#36393D",
              fontSize: fontSizes.FONT_16,
            }}
          >
            {strings.didt_receive_code}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontWeight: 600,
              color: "#F5AD47",
              fontSize: fontSizes.FONT_16,
            }}
            onPress={clickOnRequestAgainOTP}
          >
            {strings.request_again}
          </Text>
        </View>
      </KeyboardAwareView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
});

export default VerifyLoginOTP;
