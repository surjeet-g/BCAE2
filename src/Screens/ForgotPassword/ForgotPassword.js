import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  DEBUG_BUILD,
  STAGE_FAQ,
  PROD_FAQ,
  validateEmail,
} from "../../Utilities/Constants/Constant";
import DatePicker from "react-native-date-picker";
import {
  resetForgotPassword,
  verifyForgotPasswordData,
} from "../ForgotPassword/ForgotPasswordDispatcher.js";
import moment from "moment";
import { CustomInput } from "../../Components/CustomInput";
import { StickyFooter } from "../../Components/StickyFooter";
import { strings } from "../../Utilities/Language";
import { ToggleButton } from "../../Components/ToggleButton";
import CustomerEmailForgotPassword from "./component/CustomerEmailForgotPassword";
import { CustomButton } from "../../Components/CustomButton";
import { Toast } from "../../Components/Toast";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomerIDForgotPassword from "./component/CustomerIDForgotPassword";
import { HEADER_MARGIN } from "../../Utilities/themeConfig";

const ForgotPassword = ({ navigation }) => {
  let login = useSelector((state) => state.login);
  const { colors } = useTheme();

  let forgot = useSelector((state) => state.forgot);
  // const [username, setUsername] = useState("vvvipindsm@gmail.com");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  // const [lastName, setlastName] = useState("vvv");
  const [customerId, setCustomerId] = useState("");
  const [customerIdError, setCustomerIdError] = useState("");
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [dob, setDob] = useState("");
  // const [dob, setDob] = useState("2023-02-10");
  const [dobError, setDobError] = useState("");
  const [open, setOpen] = useState(false);
  const isFirst = true;
  const [isFirstSelected, setFirstSelected] = useState(isFirst);

  const onPressFirst = () => {
    setFirstSelected(true);
  };
  const onPressSecond = () => {
    setFirstSelected(false);
  };
  useEffect(() => {
    setCustomerId("");
    setCustomerIdError("");
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
  const clearCustomerIdClick = () => {
    setUsername("");
    // dispatch(resetForgotPassword());
    setUsernameError(strings.customerIdValidError);
  };
  const clearLastnameClick = () => {
    setlastName("");
    // dispatch(resetForgotPassword());
    setlastNameError(strings.lastnameValidError);
  };
  const submitEmail = () => {
    if (!validateEmail(username)) {
      setUsernameError(strings.emailValidError);
    } else {
      //to do api call
      const params = {
        loginId: username,
      };

      dispatch(verifyForgotPasswordData(navigation, params));
    }
  };

  const submitCustomerId = () => {
    if (customerId == "") {
      setCustomerIdError(strings.customerIDError);
    } else if (lastName == "") {
      setlastNameError("Last Name is required");
    } else if (dob == "") {
      setDobError("Date of birth is required");
    } else {
      dispatch(
        verifyForgotPasswordData(
          navigation,
          {
            loginId: customerId,
            lastName: lastName,
            dob: moment(dob).format("YYYY-MM-DD"),
          },
          "customerID"
        )
      );
    }
  };
  const showErrorMessage = (errMessage) => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{errMessage}</Text>
      </View>
    );
  };
  const onCustomerIDChange = (textStr) => {
    setCustomerId(textStr);
    // if (textStr.length == 0) {
    //   dispatch(resetForgotPassword());
    // }
    setCustomerIdError("");
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
    <ImageBackground
      style={styles.container}
      source={require("../../Assets/icons/bg_others.png")}
      resizeMode="cover"
    >
      <Text style={{ fontSize: 18, marginLeft: 15, color: "white" }}>
        {"Need our help,"}
      </Text>
      <Text style={{ fontSize: 28, marginLeft: 15, color: "white" }}>
        {"Forgot password?"}
      </Text>
      <ScrollView
        style={{
          flexGrow: 1,
          // paddingHorizontal: spacing.WIDTH_30,
        }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            margin: 10,
            flex: 1,
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 20,
            elevation: 5,
          }}
        >
          <View style={{ marginBottom: spacing.WIDTH_20 }}>
            <ToggleButton
              isFirstSelected={isFirstSelected}
              label={{
                first: strings.customer_email_ID,
                second: strings.loginId,
              }}
              bgColor={{
                selected: color.BCAE_PRIMARY,
                unselected: color.BCAE_LIGHT_BLUE_2,
              }}
              textColor={{
                selected: color.WHITE,
                unselected: color.BCAE_PRIMARY,
              }}
              textPro={{
                fontSize: fontSizes.FONT_13,
                fontWeight: "600",
                lineHeight: spacing.HEIGHT_16,
              }}
              onPressFirst={onPressFirst}
              onPressSecond={onPressSecond}
            ></ToggleButton>
          </View>
          {isFirstSelected ? (
            <View>
              <View style={{ marginBottom: spacing.HEIGHT_20 }}>
                <CustomInput
                  onChangeText={(text) => onIDChange(text)}
                  value={username}
                  caption={strings.customer_email_ID}
                  placeHolder={strings.customer_email_ID}
                  right={
                    username && (
                      <TextInput.Icon
                        onPress={clearTextClick}
                        theme={{ colors: { onSurfaceVariant: colors.gray } }}
                        style={{ width: 23, height: 23 }}
                        icon="close"
                      />
                    )
                  }
                />

                {usernameError !== "" && showErrorMessage(usernameError)}
              </View>
            </View>
          ) : (
            <View>
              <View style={{ marginBottom: spacing.HEIGHT_20 }}>
                <CustomInput
                  onChangeText={(text) => onCustomerIDChange(text)}
                  value={customerId}
                  caption={strings.loginId}
                  placeHolder={strings.loginId}
                  right={
                    customerId && (
                      <TextInput.Icon
                        onPress={clearCustomerIdClick}
                        theme={{ colors: { onSurfaceVariant: colors.gray } }}
                        style={{ width: 23, height: 23 }}
                        icon="close"
                      />
                    )
                  }
                />
                {usernameError !== "" && showErrorMessage(usernameError)}
                <CustomInput
                  onChangeText={(text) => {
                    onIDChangeUsername(text);
                  }}
                  value={lastName}
                  caption={strings.last_name}
                  placeHolder={strings.last_name}
                  right={
                    lastName && (
                      <TextInput.Icon
                        onPress={clearLastnameClick}
                        theme={{ colors: { onSurfaceVariant: colors.gray } }}
                        style={{ width: 23, height: 23 }}
                        icon="close"
                      />
                    )
                  }
                />
                {lastNameError !== "" && showErrorMessage(lastNameError)}
                <DatePicker
                  modal
                  mode="date"
                  validRange={{ endDate: new Date() }}
                  open={open}
                  onCancel={() => setOpen(false)}
                  date={dob == "" ? new Date() : dob}
                  maximumDate={new Date()}
                  onConfirm={(params) => {
                    console.log("data", params);
                    setOpen(false);
                    setDob(params);
                    setDobError("");
                  }}
                />
                <CustomInput
                  // onChangeText={(text) => onIDChange(text)}
                  value={dob == "" ? "" : moment(dob).format("YYYY-MM-DD")}
                  caption={"Date of birth"}
                  onFocus={() => setOpen(true)}
                  placeHolder={"Date of birth"}
                  right={
                    <TextInput.Icon
                      onPress={() => setOpen(true)}
                      style={{ width: 23, height: 23 }}
                      theme={{ colors: { onSurfaceVariant: colors.gray } }}
                      icon={"calendar"}
                    />
                  }
                />
                {dobError !== "" && showErrorMessage(dobError)}
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.rgisterText}>{strings.back_to_login}</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 30,
          }}
        >
          <Text style={styles.noAccText}>{strings.dont_account} </Text>
          <Pressable
            onPress={() => navigation.navigate("Register with us", {})}
          >
            <Text style={styles.rgisterText}>
              {strings.register.toUpperCase()}
            </Text>
          </Pressable>
        </View>
        <View style={{ paddingBottom: spacing.HEIGHT_40 * 3 }} />
      </ScrollView>

      {!login.initLogin &&
        (login?.loggedProfile?.errorCode == "10000" ||
          login?.loggedProfile?.errorCode == "10001") && (
          <View style={styles.toast}>
            <Toast
              bgColor={color.TOAST_RED}
              customStyle={{ paddingHorizontal: spacing.WIDTH_30 }}
              textPro={{
                color: color.WHITE,
                fontSize: fontSizes.FONT_14,
                fontWeight: "700",
              }}
              img={
                login?.loggedProfile?.errorCode == "10001"
                  ? require("../../Assets/icons/ic_no_Internet.png")
                  : require("../../Assets/icons/ci_error-warning-fill.png")
              }
              message={
                login?.loggedProfile?.errorCode == "10001"
                  ? strings.no_network
                  : strings.something_went_wrong
              }
            />
          </View>
        )}
      <StickyFooter isLogin={true}>
        {/* Login View */}
        <View>
          <CustomButton
            loading={forgot?.initForgotPassword}
            label={strings.reset_password}
            isDisabled={
              isFirstSelected
                ? !validateEmail(username)
                : customerId == "" || dob == "" || lastName == ""
                ? true
                : false
            }
            onPress={isFirstSelected ? submitEmail : submitCustomerId}
          />
        </View>
        <Text
          style={{
            color: "#393939",
            fontSize: fontSizes.FONT_14,
            textAlign: "center",
            fontWeight: 400,
            marginTop: 10,
          }}
        >
          By continuing, I accept and agree to BCAE
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: fontSizes.FONT_14,
              textAlign: "center",
              fontWeight: 600,
              color: "#4B3694",
              marginTop: 5,
            }}
            onPress={() => alert("Navigate to T&C")}
          >
            Terms & Conditions of Use
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT_14,
              textAlign: "center",
              fontWeight: 600,
              color: "#000000",
              marginTop: 5,
            }}
          >
            {" "}
            &{" "}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT_14,
              textAlign: "center",
              fontWeight: 600,
              color: "#4B3694",
              marginTop: 5,
            }}
            onPress={() => alert("Navigate to Privacy Policy")}
          >
            Privacy Policy
          </Text>
        </View>
        <Text
          style={{
            color: "#393939",
            fontSize: fontSizes.FONT_12,
            textAlign: "center",
            fontWeight: 400,
            marginTop: 10,
          }}
        >
          © {new Date().getFullYear()} Bahwan CyberTek. All rights reserved.
        </Text>
      </StickyFooter>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...HEADER_MARGIN,
  },
  logo: {
    height: 128,
    width: 128,
  },
  toast: {
    position: "absolute",
    bottom: spacing.HEIGHT_31 * 2,
  },
  orText: {
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_16,
    paddingHorizontal: spacing.WIDTH_7,
  },
  noAccText: {
    color: "#393939",
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_16,
    textAlign: "center",
    fontWeight: 400,
  },
  rgisterText: {
    fontWeight: "700",
    color: "#4B3694",
    fontSize: fontSizes.FONT_16,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  upperText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
  },
});

export default ForgotPassword;
