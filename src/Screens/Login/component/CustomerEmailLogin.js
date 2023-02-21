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
import Icon from "react-native-vector-icons/EvilIcons";

import { Button, TextInput, RadioButton } from "react-native-paper";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { capitalizeFirstLetter } from "../../../Utilities/utils";
import CustomButton from "../../../Components/CustomButton";
export const BUSINESS = "bussiness";
export const CONSUMER = "consumer";
const CustomerEmailLogin = (props) => {
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
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          textColor="#ea272c"
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
      <Icon name="exclamation" size={30} color="#900" />

      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          textColor="#ea272c"
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioButton
          value={BUSINESS}
          status={checked === BUSINESS ? "checked" : "unchecked"}
          onPress={() => setChecked(BUSINESS)}
        />
        <Text>{capitalizeFirstLetter(BUSINESS)}</Text>
        <RadioButton
          value={CONSUMER}
          status={checked === CONSUMER ? "checked" : "unchecked"}
          onPress={() => setChecked(CONSUMER)}
        />
        <Text>{capitalizeFirstLetter(CONSUMER)}</Text>
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
