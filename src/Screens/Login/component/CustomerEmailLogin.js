import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
// import { EditText } from "../../../Components/EditText";
import { verifyLoginData, resetLogin } from "../LoginDispatcher";
import { useDispatch, useSelector } from "react-redux";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  validateEmail,
  validatePassword,
  hashPassword,
  passwordHash,
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";

import { Button, RadioButton, TextInput, useTheme } from "react-native-paper";
import { CustomInput } from "../../../Components/CustomInput";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { capitalizeFirstLetter } from "../../../Utilities/utils";
import { CustomButton } from "../../../Components/CustomButton";
import { CustomErrorText } from "../../../Components/CustomErrorText";

const CustomerEmailLogin = (props) => {
  const { colors } = useTheme();
  const { userType, navigation } = props;
  let login = useSelector((state) => state.login);

  const [username, setUsername] = useState("vvvipindsm@gmail.com");
  const [password, setPassword] = useState("JSX2EB8E");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const dispatch = useDispatch([verifyLoginData, resetLogin]);

  const onIDChange = (textStr) => {
    setUsername(textStr);
    if (textStr.length == 0) {
      dispatch(resetLogin());
    }
    setUsernameError("");
  };

  const onPasswordChange = (textStr) => {
    setPassword(textStr);
    if (textStr.length == 0) {
      dispatch(resetLogin());
    }
    setPasswordError("");
  };

  const clearTextClick = () => {
    setUsername("");
    dispatch(resetLogin());
  };

  const hideShowClick = () => {
    setsecureTextEntry(!secureTextEntry);
  };

  const submit = () => {
    console.log("$$$-", { username, password, userType });
    if (username.includes("@")) {
      if (username === "") {
        setUsernameError(strings.emailValidError);
      } else if (password === "") {
        setPasswordError(strings.passwordValidErrorLogin);
      } else {
        //let hashpass =  hashPassword(password)
        // let pasHash = passwordHash(password).then((datahash) => {
        dispatch(
          verifyLoginData(navigation, {
            username,
            password,
            userType,
          })
        );
        // });
      }
    } else {
      setUsernameError(strings.emailValidError);
    }
  };

  return (
    <View>
      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <CustomInput
          caption="Email Address"
          value={username}
          onChangeText={(text) => onIDChange(text)}
          right={
            <TextInput.Icon
              onPress={clearTextClick}
              style={{ width: 23, height: 23 }}
              icon="close"
            />
          }
        />

        {!login.initLogin && login?.loggedProfile?.errorCode == "404" && (
          <CustomErrorText errMessage={login?.loggedProfile?.message} />
        )}
        {usernameError !== "" && <CustomErrorText errMessage={usernameError} />}
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
          isDisabled={username == "" || password == "" ? true : false}
          onPress={submit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomerEmailLogin;
