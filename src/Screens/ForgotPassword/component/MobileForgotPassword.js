import React, { useState } from "react";
import {
  Alert, Dimensions,
  Image,
  Pressable, StyleSheet, Text,
  TouchableOpacity, View
} from "react-native";
import CountryPicker from "react-native-country-codes-picker";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import {
  excludedCountriesList
} from "../../../Utilities/utils";

import {
  buttonSize, color, fontSizes, spacing
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";
import {
  resetForgotPassword,
  verifyForgotPasswordData
} from "../ForgotPasswordDispatcher";
const { height, width } = Dimensions.get("screen");

const MobileLoging = (props) => {
  let forgot = useSelector((state) => state.forgot);

  const [number, setNumber] = useState("");
  const [show, setShow] = useState(false);
  const [numberError, setNumberError] = useState("");

  const [countryCode, setCountryCode] = useState("+673");

  const dispatch = useDispatch([verifyForgotPasswordData, resetForgotPassword]);

  const submit = () => {
    if (number === "") {
      //setUsernameError(strings.numberError);
    } else if (number.length !== 7) {
      Alert.alert(strings.attention, strings.sevenDigit, [
        { text: strings.ok, onPress: () => { } },
      ]);
    } else {
      dispatch(verifyForgotPasswordData(props.navigation, number));
    }
  };

  const onChangeNumber = (textStr) => {
    setNumber(textStr);

    setNumberError("");
  };
  const clearTextClick = () => {
    setNumber("");
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
      <CountryPicker
        style={{
          modal: {
            height: "65%",
          },
        }}
        show={show}
        excludedCountries={excludedCountriesList()}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
      <View>
        <View style={{ flexDirection: "row", marginBottom: spacing.HEIGHT_20 }}>
          <TouchableOpacity
            //onPress={() => setShow(true)}
            style={styles.countrycode}
          >
            <Text style={styles.countrycodetext}>
              {countryCode}
              {/* <Image
                source={require("../../../Assets/icons/dropdown.png")}
              ></Image> */}
            </Text>
          </TouchableOpacity>

          <View style={{}}>
            <TextInput
              mode="flat"
              style={{
                backgroundColor: "transparent",
              }}
              textColor="#ea272c"
              onChangeText={(text) => onChangeNumber(text)}
              value={number}
              placeHolder={strings.mobile_no}
              keyboardType="numeric"
              right={
                <TextInput.Icon
                  onPress={clearTextClick}
                  style={{ width: 23, height: 23 }}
                  icon={require("../../../Assets/icons/ic_close.png")}
                />
              }
            />
          </View>
        </View>
        {!forgot?.initForgotPassword &&
          (forgot?.loggedProfile?.errorCode === "404" ||
            forgot?.loggedProfile?.errorCode === "500") &&
          showErrorMessage(forgot?.loggedProfile?.message)}
        {numberError !== "" && showErrorMessage(numberError)}
      </View>

      <View style={{ marginTop: 40 }}>
        {forgot?.initForgotPassword ? (
          <CustomActivityIndicator
            size={buttonSize.LARGE}
            bgColor={color.BLACK}
            loderColor={color.WHITE}
          />
        ) : (
          <Button
            label={strings.reset_password}
            disabled={number == "" ? true : false}
            onPress={submit}
            buttonColor={"#4a5996"}
          >
            {" "}
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
  countrycode: {
    // width: "25%",
    height: height / 17,
    marginTop: height / 44.3,
    backgroundColor: color.BCAE_OFF_WHITE,
    padding: 10,
    paddingLeft: 0,
    alignItems: "center",
    // borderBottomWidth: 0.4,
    //   borderColor: color.BCAE_PRIMARY,
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
});

export default MobileLoging;
