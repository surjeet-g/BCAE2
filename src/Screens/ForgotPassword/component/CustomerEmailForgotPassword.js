import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  validateEmail,
  validatePassword,
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";
import { DatePickerModal } from "react-native-paper-dates";

import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForgotPassword,
  verifyForgotPasswordData,
} from "../ForgotPasswordDispatcher";
import { Button, TextInput } from "react-native-paper";
import moment from "moment";

const CustomerEmailForgotPassword = (props) => {
  let forgot = useSelector((state) => state.forgot);
  const [username, setUsername] = useState("vvvipindsm@gmail.com");
  // const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [lastName, setlastName] = useState("vvv");
  // const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [dob, setDob] = useState("");
  // const [dob, setDob] = useState("2023-02-10");
  const [dobError, setDobError] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setUsername("");
    setUsernameError("");
    setlastNameError("");
    setDob("");
    setDobError("");
    setOpen(false);
  }, []);
  const dispatch = useDispatch([verifyForgotPasswordData, resetForgotPassword]);

  const onIDChange = (textStr) => {
    setUsername(textStr);
    // if (textStr.length == 0) {
    //   dispatch(resetForgotPassword());
    // }
    setUsernameError("");
  };

  const onIDChangeUsername = (textStr) => {
    setlastName(textStr);
    setlastNameError("");
  };

  const clearTextClick = () => {
    setUsername("");
    dispatch(resetForgotPassword());
    setUsernameError(strings.emailValidError);
  };

  const submit = () => {
    if (!validateEmail(username)) {
      setUsernameError(strings.emailValidError);
    } else if (lastName == "") {
      setlastNameError("Last Name sould be required");
    } else if (dob == "") {
      setDobError("Date of birth sould be required");
    } else {
      dispatch(
        verifyForgotPasswordData(props.navigation, {
          loginId: username,
          lastName,
          dob: moment(dob).format("YYYY-MM-DD"),
        })
      );
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
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDob(params.date);
      setDobError("");
    },
    [setOpen, setDob]
  );

  return (
    <View>
      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <TextInput
          onChangeText={(text) => onIDChange(text)}
          value={username}
          label={strings.customer_email_ID}
          placeHolder={strings.customer_email_ID}
          right={
            <TextInput.Icon
              onPress={clearTextClick}
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/ic_close.png")}
            />
          }
        />
        <TextInput
          onChangeText={(text) => onIDChangeUsername(text)}
          value={lastName}
          label="Last Name"
          placeHolder="Last Name"
        />

        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={dob}
          onConfirm={onConfirmSingle}
        />
        <TextInput
          // onChangeText={(text) => onIDChange(text)}
          value={dob == "" ? "" : moment(dob).format("YYYY-MM-DD")}
          label={"Date of birth"}
          onFocus={() => setOpen(true)}
          placeHolder={"Date of birth"}
          right={
            <TextInput.Icon
              onPress={() => setOpen(true)}
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/mail.png")}
            />
          }
        />
        {!forgot?.initForgotPassword &&
          (forgot?.loggedProfile?.errorCode == "404" ||
            forgot?.loggedProfile?.errorCode == "500") &&
          showErrorMessage(forgot?.loggedProfile?.message)}
        {usernameError !== "" && showErrorMessage(usernameError)}
        {lastNameError !== "" && showErrorMessage(lastNameError)}
        {dobError !== "" && showErrorMessage(dobError)}
      </View>

      <View style={{ marginBottom: spacing.HEIGHT_20 }}></View>
      <View>
        {forgot?.initForgotPassword ? (
          <CustomActivityIndicator
            size={buttonSize.LARGE}
            bgColor={color.BLACK}
            loderColor={color.WHITE}
          />
        ) : (
          <Button
            label={strings.reset_password}
            disabled={
              username == "" && dob == "" && lastName == "" ? true : false
            }
            onPress={submit}
          >
            {strings.reset_password}
          </Button>
        )}
      </View>

      <Pressable onPress={() => props.navigation.goBack()}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <Image source={require("../../../Assets/icons/ic_left_arrow.png")} />
          <Text style={{ marginLeft: 10, color: color.PLACEHOLDER }}>
            {strings.back_to_login}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    color: color.BCAE_DARK_BLUE,
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
  noAccText: {
    marginTop: spacing.HEIGHT_32,
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
});

export default CustomerEmailForgotPassword;
