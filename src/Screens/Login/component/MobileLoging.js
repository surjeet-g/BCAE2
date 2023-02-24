import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fontSizes,
  color,
  spacing,
  validateNumber,
} from "../../../Utilities/Constants/Constant";

import { strings } from "../../../Utilities/Language";
import { resetLogin, verifyLoginData } from "../LoginDispatcher";
import { CustomButton } from "../../../Components/CustomButton";
import { CustomInput } from "../../../Components/CustomInput";
import { CustomErrorText } from "../../../Components/CustomErrorText";

const MobileLoging = (props) => {
  let login = useSelector((state) => state.login);
  const { userType, navigation } = props;
  const [number, setNumber] = useState("987654321");
  const [numberError, setNumberError] = useState("");
  const [password, setPassword] = useState("Test@123");
  const [passwordError, setPasswordError] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const dispatch = useDispatch([verifyLoginData, resetLogin]);

  const submit = () => {
    if (!validateNumber(number)) {
      setNumberError(strings.mobileValidError);
    } else if (password === "") {
      setPasswordError(strings.passwordValidErrorLogin);
    } else if (number.length < 7) {
      Alert.alert(strings.attention, strings.sevenDigit, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      dispatch(
        verifyLoginData(navigation, {
          username: number,
          password,
          userType,
          loginType: "PASSWORD",
        })
      );
    }
  };

  const onIDChange = (textStr) => {
    setNumber(textStr);
    if (textStr.length == 0) {
      dispatch(resetLogin());
    }
    setNumberError("");
  };

  const hideShowClick = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const onPasswordChange = (textStr) => {
    setPassword(textStr);
    if (textStr.length == 0) {
      dispatch(resetLogin());
    }
    setPasswordError("");
  };

  const clearTextClick = () => {
    setNumber("");
    dispatch(resetLogin());
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={{ marginBottom: spacing.HEIGHT_20 }}>
          <CustomInput
            caption={strings.mobile_no}
            onChangeText={(text) => onIDChange(text)}
            value={number}
            placeHolder={strings.mobile_no}
            keyboardType="numeric"
          />
        </View>
        {!login.initLogin && login?.loggedProfile?.errorCode == "404" && (
          <CustomErrorText errMessage={login?.loggedProfile?.message} />
        )}
        {numberError !== "" && <CustomErrorText errMessage={numberError} />}
      </View>

      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <CustomInput
          value={password}
          caption={strings.password}
          placeHolder={strings.password}
          onChangeText={(text) => onPasswordChange(text)}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              onPress={hideShowClick}
              style={{ width: 23, height: 23 }}
              icon={
                secureTextEntry
                  ? require("../../../Assets/icons/ic_password_show.png")
                  : require("../../../Assets/icons/ic_password_hide.png")
              }
            />
          }
        />
        {!login.initLogin &&
          login?.loggedProfile?.errorCode &&
          login.loggedProfile.errorCode != "404" &&
          login?.loggedProfile?.errorCode != "10000" &&
          login?.loggedProfile?.errorCode != "10001" && (
            <CustomErrorText errMessage={login?.loggedProfile?.message} />
          )}
        {passwordError !== "" && <CustomErrorText errMessage={passwordError} />}
      </View>

      <Text
        style={{
          textAlign: "center",
          alignSelf: "center",
          marginVertical: spacing.HEIGHT_15,
          color: "#F5AD47",
          fontWeight: "700",
          fontSize: fontSizes.FONT_16,
        }}
        onPress={() => navigation.navigate("VerifyLoginOTP")}
      >
        {strings.login_with_otp}
      </Text>

      <View>
        <CustomButton
          loading={login.initLogin}
          label={strings.login}
          isDisabled={number == "" || password == "" ? true : false}
          onPress={submit}
        />
      </View>
    </View>
  );
};

export default MobileLoging;
