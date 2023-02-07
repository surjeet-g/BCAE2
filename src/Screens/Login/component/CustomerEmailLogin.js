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

import { Button, TextInput } from "react-native-paper";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";

const CustomerEmailLogin = (props) => {
  let login = useSelector((state) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        let pasHash = passwordHash(password).then((datahash) => {
          dispatch(verifyLoginData(props.navigation, username, datahash));
        });
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
        <TextInput
          value={username}
          label={strings.customer_email_ID}
          placeHolder={strings.customer_email_ID}
          onChangeText={(text) => onIDChange(text)}
          right={
            <TextInput.Icon
              onPress={clearTextClick}
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/ic_close.png")}
            />
          }
        />

        {!login.initLogin &&
          login?.loggedProfile?.errorCode == "404" &&
          showErrorMessage(login?.loggedProfile?.message)}
        {usernameError !== "" && showErrorMessage(usernameError)}
      </View>

      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <TextInput
          value={password}
          label={strings.password}
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

      <View style={{ alignSelf: "center", marginBottom: spacing.HEIGHT_20 }}>
        <Pressable
          onPress={() =>
            props.navigation.navigate("ForgotPassword", { isFirst: true })
          }
        >
          <Text style={styles.forgotText}>
            {strings.forgot_password.toUpperCase()}
          </Text>
        </Pressable>
      </View>

      <View>
        {login.initLogin ? (
          <CustomActivityIndicator
            size={buttonSize.LARGE}
            bgColor={color.BLACK}
            loderColor={color.WHITE}
          />
        ) : (
          <Button
            mode="contained"
            onPress={submit}
            disabled={username == "" || password == "" ? true : false}
          >
            {strings.login}
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
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
});

export default CustomerEmailLogin;
