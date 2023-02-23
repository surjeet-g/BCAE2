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
export const BUSINESS = "bussiness";
export const CONSUMER = "consumer";

const CustomerEmailLogin = (props) => {
  const { colors } = useTheme();

  let login = useSelector((state) => state.login);
  const [checked, setChecked] = useState(BUSINESS);

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
    if (username.includes("@")) {
      if (username === "") {
        setUsernameError(strings.emailValidError);
      } else if (password === "") {
        setPasswordError(strings.passwordValidErrorLogin);
      } else {
        //let hashpass =  hashPassword(password)
        // let pasHash = passwordHash(password).then((datahash) => {
        dispatch(
          verifyLoginData(props.navigation, {
            username,
            password,
            userType: checked,
          })
        );
        // });
      }
    } else {
      setUsernameError(strings.emailValidError);
    }
  };

  const showErrorMessage = (errMessage) => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{errMessage}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <CustomInput
          caption="Username"
          // error="sdfsdf"
          value={username}
          // label={strings.customer_email_ID}
          onChangeText={(text) => onIDChange(text)}
          right={
            <TextInput.Icon
              onPress={clearTextClick}
              style={{ width: 23, height: 23 }}
              icon="close"
            />
          }
        />

        {!login.initLogin &&
          login?.loggedProfile?.errorCode == "404" &&
          showErrorMessage(login?.loggedProfile?.message)}
        {usernameError !== "" && showErrorMessage(usernameError)}
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
          login?.loggedProfile?.errorCode != "10001" &&
          showErrorMessage(login?.loggedProfile?.message)}
        {passwordError !== "" && showErrorMessage(passwordError)}
      </View>

      <View>
        <CustomButton
          loading={login.initLogin}
          label={strings.login}
          isDisabled={username == "" || password == "" ? true : false}
          onClick={submit}
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
