import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "../../../Components/Button";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
// import { EditText } from "../../../Components/EditText";
import {
  fontSizes,
  color,
  spacing,
  buttonSize,
  buttonType,
  validateNumber,
  validatePassword,
  passwordHash,
} from "../../../Utilities/Constants/Constant";
import { capitalizeFirstLetter } from "../../../Utilities/utils";

import { strings } from "../../../Utilities/Language";
import { resetLogin, verifyLoginData } from "../LoginDispatcher";
import { BUSINESS, CONSUMER } from "./CustomerEmailLogin";
import { CustomButton } from "../../../Components/CustomButton";
import { CustomInput } from "../../../Components/CustomInput";

import CustomErrorText from "../../../Components/CustomErrorText";
const { height, width } = Dimensions.get("screen");

const MobileLoging = (props) => {
  let login = useSelector((state) => state.login);
  const [number, setNumber] = useState("");
  const [checked, setChecked] = useState(BUSINESS);

  const [password, setPassword] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+673");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const dispatch = useDispatch([verifyLoginData, resetLogin]);

  const submit = () => {
    if (!validateNumber(number)) {
      setNumberError(strings.mobileValidError);
    } else if (password === "") {
      setPasswordError(strings.passwordValidErrorLogin);
    } else if (number.length !== 7) {
      Alert.alert(strings.attention, strings.sevenDigit, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      let pasHash = passwordHash(password).then((datahash) => {
        dispatch(verifyLoginData(props.navigation, number, datahash));
      });
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
    <View style={{ flex: 1 }}>
      <View>
        <View>
          <CustomInput
            caption={strings.mobile_no}
            onChangeText={(text) => onIDChange(text)}
            value={number}
            placeHolder={strings.mobile_no}
            keyboardType="numeric"
          />
        </View>
        {!login.initLogin &&
          login?.loggedProfile?.errorCode == "404" &&
          showErrorMessage(login?.loggedProfile?.message)}
        {numberError !== "" && showErrorMessage(numberError)}
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
        {passwordError !== "" && <CustomErrorText errMessage={passwordError} />}
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
      <Pressable
        onPress={() => props.navigation.navigate("ForgotPassword", {})}
      >
        <View
          style={{
            alignSelf: "center",
            marginBottom: spacing.HEIGHT_20,
            marginTop: 20,
          }}
        >
          <Text style={styles.forgotText}>
            {strings.forgot_password.toUpperCase()}
          </Text>
        </View>
      </Pressable>
      <View>
        {login.initLogin ? (
          <CustomActivityIndicator
            size={buttonSize.LARGE}
            bgColor={color.BLACK}
            loderColor={color.WHITE}
          />
        ) : (
          <CustomButton
            label={strings.login}
            isDisabled={number == "" || password == "" ? true : false}
            onClick={submit}
          />
        )}
      </View>
      {/* <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.countrycode}
      >
        <Text style={styles.countrycodetext}>dsdsd</Text>
      </TouchableOpacity> */}
      <CountryPicker
        style={{ width: "100%", backgroundColor: "red" }}
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  forgotText: {
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  countrycode: {
    // width: "25%",
    height: height / 17,
    marginTop: height / 44.3,
    backgroundColor: color.BCAE_OFF_WHITE,
    padding: 10,
    paddingLeft: 0,
    alignItems: "center",
    // borderBottomWidth: 0.4,
    // borderColor: color.BCAE_PRIMARY,
    position: "absolute",
  },
  countrycodetext: {
    color: color.BLACK,
    marginTop: spacing.HEIGHT_8,
    fontSize: fontSizes.FONT_14,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_18,
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

export default MobileLoging;
