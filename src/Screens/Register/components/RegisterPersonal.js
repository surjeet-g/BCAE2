import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { CustomDropDown } from "../../../Components/CustomDropDown";
import { strings } from "../../../Utilities/Language/index";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { setOtpFormData } from "../RegisterAction";
import { TextBoxWithCTAEmail } from "../../../Components/TextBoxWithCTAEmail";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
} from "../RegisterDispatcher";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { TextBoxWithCTA } from "../../../Components/TextBoxWithCTA";
import { Button, TextInput } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import { styles } from "../Register";
import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
  validatePassword,
  passwordHash,
  TDLog,
  DEBUG_BUILD,
  STAGE_TERMS,
  PROD_TERMS,
  STAGE_PRIVACY,
  PROD_PRIVACY,
} from "../../../Utilities/Constants/Constant";
import { useNavigation } from "@react-navigation/native";

export const showErrorMessage = (errMessage) => {
  if (typeof errMessage != "string") return null;
  let pattern = /Successful/i;
  let result = errMessage.match(pattern);

  if (result != null) {
    return null;
  }

  return (
    <View style={{ marginTop: spacing.HEIGHT_10, flexDirection: "row" }}>
      <Image
        style={styles.errorLogo}
        source={require("../../../Assets/icons/ci_error_warning.png")}
      />
      <Text style={styles.errorText}>{errMessage}</Text>
    </View>
  );
};
export const RegisterPersonal = ({ navigation }) => {
  // let navigation = useNavigation;
  const dispatch = useDispatch([
    fetchRegisterFormData,
    sendOtp,
    userRegister,
    getOtpForCheck,
  ]);
  let registerForm = useSelector((state) => state.registerForm);
  //4 minute
  const OTP_TIMER = 60 * 4;
  const onConfirmPasswordChange = (textStr) => {
    setConfirmPassword(textStr);

    setConfirmPasswordError("");
    buttonEnableDiable();
  };
  const hideShowClick = () => {
    setsecureTextEntry(!secureTextEntry);
  };
  const hideShowClickConfirm = () => {
    setsecureTextEntryConfim(!secureTextEntryConfim);
  };

  const onPasswordChange = (textStr) => {
    setPassword(textStr);

    setPasswordError("");
    buttonEnableDiable();
  };

  const onPlaceChosen = (params) => {
    setLatitude(params.currentLatitude);
    setLongitude(params.currentLongitude);

    setStreet(params.street);
    setStateProfile(params.state);
    setDistrict(params.district);
    setCountry(params.country);
    setPostcode(params.postCode);
  };

  const formatOtpTimer = (otpTmr) => {
    let minute = 0;

    let second = 0;

    let finalString = "";

    minute = parseInt(otpTmr / 60);

    second = otpTmr % 60;

    if (minute > 0) {
      finalString = minute + "m " + second + "s";
    } else {
      finalString = second + "s";
    }

    return finalString;
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [idNumber, setIdNumber] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");

  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [mobileNo, setMobileNo] = useState("");
  const [countryCode, setCountryCode] = useState("673");
  const [otp, setOTP] = useState("");
  const [otpEmail, setEmailOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerm, setSelectionTerm] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [isButtomDiable, setButtomEnableDisable] = useState(true);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [idNumberError, setIdNumberError] = useState("");

  const [genderError, setgenderError] = useState("");
  const [titleError, setTitleError] = useState("");

  const [countryError, setCountryError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [otpNumberError, setOtpNumberError] = useState("");
  const [isMobileOtpSuccess, setIsMobileOtpSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpEmailError, setOtpEmailError] = useState("");
  const [isEmailOtpSuccess, setIsEmailOtpSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setConfirmPasswordError] = useState("");
  const [termError, setTermError] = useState("");
  const [privaceyError, setPrivaceyError] = useState("");
  const [otpTimer, setOtpTimer] = useState(OTP_TIMER);
  const [isDisableSendOtp, setIsDisableSendOtp] = useState(false);
  const [selectedValueServ, setValueServ] = useState("");
  const [selectedValueGender, setValueGender] = useState("");
  const [selectedValueTitle, setValueTitle] = useState("");

  const [street, setStreet] = useState("");
  const [state, setStateProfile] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");

  const onFirstNameChange = (textStr) => {
    setFirstName(textStr);
    setFirstNameError("");
    buttonEnableDiable();
  };
  const onLocationChanged = (textStr) => {
    setLocation(textStr);
    setLocationError("");
    buttonEnableDiable();
  };
  const submit = () => {
    if (!mobileOTPVerifcation) {
      Toast.show({
        type: "bctError",
        text1: strings.otpErrorMsgForMobile,
      });
      return null;
    }
    if (!emailOTPVerification) {
      Toast.show({
        type: "bctError",
        text1: strings.otpErrorMsgForEmail,
      });
      return null;
    }

    if (firstName.trim() === "") {
      setFirstNameError(strings.firstNameError);
    } else if (lastName.trim() === "") {
      setLastNameError(strings.lastNameError);
    } else if (idNumberError === "") {
      setIdNumberError(strings.idNumberError);
    } else if (gender?.code === "") {
      setgenderError(strings.genderError);
    } else if (title?.code === "") {
      setTitleError(strings.titleError);
    } else if (!validateNumber(mobileNo)) {
      setNumberError(strings.mobileValidError);
    } else if (otp.trim() === "") {
      setOtpNumberError(strings.numberOtpError);
    } else if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else if (otpEmail.trim() === "") {
      setOtpEmailError(strings.emailOtpError);
    } else if (!isSelectedTerm) {
      setTermError(strings.termError);
    } else if (!isSelected) {
      setPrivaceyError(strings.privaceyError);
    } else {
      let registerObject = {
        firstName: firstName,
        lastName: lastName,
        userType: "string",
        gender: gender.code,
        // country: myArray.length > 0 ? myArray[0] : "",
        extn: 0,
        contactNo: mobileNo,
        mobileOTP: otp,
        email: email,

        emailOTP: otpEmail,
      };

      console.log("userRegister===>2" + JSON.stringify(registerObject));
      dispatch(
        userRegister(registerObject, "Register", (message) =>
          showAlert(message)
        )
      );
      // });
    }
  };

  const showMobileErrorMessage = () => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{strings.otpMobileFailed}</Text>
      </View>
    );
  };

  const showEmailErrorMessage = () => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{strings.otpEmailFailed}</Text>
      </View>
    );
  };

  const showOtpSentMessage = () => {
    setIsDisableSendOtp(true);
    runOtpTimer(otpTimer);
  };
  const emailOTPVerification =
    registerForm?.otpFormDataForEmail?.data?.otp === otpEmail;
  const mobileOTPVerifcation =
    registerForm?.otpFormDataForMobile?.data?.otp === otp;
  const submitResndOTP = () => {
    if (mobileNo.length !== 7) {
      Alert.alert(strings.attention, strings.sevenDigit, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      if (firstName.trim() === "") {
        Toast.show({
          type: "bctError",
          text1: strings.firstNameError,
        });
        setFirstNameError(strings.firstNameError);
      } else if (!validateNumber(mobileNo)) {
        Toast.show({
          type: "bctError",
          text1: strings.mobileValidError,
        });
        setNumberError(strings.mobileValidError);
      } else {
        //alert("submitResndOTP");
        dispatch(
          sendOtp(
            countryCode + mobileNo,
            firstName,
            "mobile",
            showOtpSentMessage
          )
        );
        buttonEnableDiable();
        //setIsDisableSendOtp(true);
        //runOtpTimer(otpTimer);
      }
    }
  };
  const buttonEnableDiable = () => {
    // console.log("buttonEnableDiable==>"+firstName+"<===>"+lastName+"<===>"+gender+"<===>"+location
    // +"<===>"+mobileNo+"<===>"+otp+"<===>"+email
    // +"<===>"+otpEmail+"<===>"+password+"<===>"+confirmPassword)
    if (
      firstName === "" ||
      lastName === "" ||
      gender === "" ||
      mobileNo === "" ||
      otp === "" ||
      email === "" ||
      otpEmail === ""
    ) {
      setButtomEnableDisable(true);
      //console.log("buttonEnableDiable==>1");
    } else {
      //console.log("buttonEnableDiable==>2");

      setButtomEnableDisable(false);
    }
  };

  const runOtpTimer = (otpTimer) => {
    setTimeout(() => {
      setOtpTimer(otpTimer);
      otpTimer = otpTimer - 1;
      if (otpTimer < 0) {
        setIsDisableSendOtp(false);
        setOtpTimer(OTP_TIMER);
      } else {
        runOtpTimer(otpTimer);
        //alert(otpTimer);
      }
    }, 1000);
  };

  const submitConfirmMobileOTP = () => {
    if (otp === "") {
      setOtpNumberError(strings.numberOtpError);
    } else {
      //alert(countryCode + mobileNo);
      dispatch(getOtpForCheck(countryCode + mobileNo, "mobileOtp")); // country code to be added to verify OTP
      buttonEnableDiable();
    }
  };
  //alert(JSON.stringify(Register));
  const submitConfirmEmailOTP = () => {
    if (otpEmail === "") {
      setOtpEmailError(strings.emailOtpError);
    } else {
      dispatch(getOtpForCheck(email, "emailOtp"));
      buttonEnableDiable();
    }
  };
  const submitEmail = () => {
    if (firstName.trim() === "") {
      Toast.show({
        type: "bctError",
        text1: strings.firstNameError,
      });
      setFirstNameError(strings.firstNameError);
    } else if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else {
      dispatch(sendOtp(email, firstName, "email"));
      buttonEnableDiable();
    }
  };

  const onCheckBoxClick = () => {
    //console.log("onCheckBoxClick====>isSelected===>"+isSelected)
    setSelection(!isSelected);
    setTermError("");
    setPrivaceyError("");
  };

  const onCheckBoxClickTerm = () => {
    //console.log("onCheckBoxClickTerm====>isSelectedTerm==>"+isSelectedTerm)
    setSelectionTerm(!isSelectedTerm);

    setTermError("");
  };
  const clearFirstName = () => {
    setFirstName("");
    setFirstNameError(strings.firstNameError);
  };
  const locationIconClick = () => {
    navigation.navigate("AddLocation", {
      onPlaceChosen,
      fromPage: "Register",
    });
  };
  const onLastNameChange = (textStr) => {
    setLastName(textStr);
    setLastNameError("");
    buttonEnableDiable();
  };
  const clearLastName = () => {
    setLastName("");
    setLastNameError(strings.lastNameError);
  };

  const onGenderClick = (textStr) => {
    // console.log(textStr.description)
    setGender(textStr);
    buttonEnableDiable();
  };

  const onCountryClick = (textStr) => {
    setCountry(textStr.onChangeText);
    setCountryCode(textStr?.mapping?.countryCode ?? "");
    buttonEnableDiable();
  };
  const onLocationClick = (textStr) => {
    setLocation(textStr.onChangeText);
    buttonEnableDiable();
  };

  const onMobleNoChange = (textStr) => {
    setMobileNo(textStr);
    setNumberError("");
    buttonEnableDiable();
  };
  const onOTPChange = (textStr) => {
    setOTP(textStr);
    setOtpNumberError("");
    buttonEnableDiable();
  };
  const onEmailOTPChange = (textStr) => {
    setEmailOTP(textStr);
    setOtpEmailError("");
    buttonEnableDiable();
  };
  const onEmailChange = (textStr) => {
    setEmail(textStr);
    setEmailError("");
    buttonEnableDiable();
  };

  console.log(
    "registerForm?.registerFormData?.GENDER",
    registerForm?.registerFormData?.GENDER
  );
  return (
    <View>
      <View style={{ marginTop: 5 }}>
        <CustomDropDown
          selectedValue={selectedValueTitle?.description}
          setValue={setValueTitle}
          data={[
            { code: "Mr", description: "Mr" },
            { code: "Mrs", description: "Mrs" },
            { code: "Ms", description: "Ms" },
            { code: "Miss", description: "Miss" },
          ]}
          onChangeText={(text) => {
            console.log("a", text);
            setValueTitle(text);
            buttonEnableDiable();
          }}
          value={title?.description}
          placeHolder={strings.title}
        />

        {titleError !== "" && showErrorMessage(titleError)}
      </View>
      <View style={{ marginTop: spacing.HEIGHT_30 }}>
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          onChangeText={(text) => onFirstNameChange(text)}
          value={firstName}
          label={strings.first_name}
          placeHolder={strings.first_name}
          right={
            <TextInput.Icon
              onPress={clearFirstName}
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/ic_close.png")}
            />
          }
        />

        {firstNameError !== "" && showErrorMessage(firstNameError)}
      </View>

      {/* Last Name */}
      <View style={{ marginTop: 5 }}>
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          onChangeText={(text) => onLastNameChange(text)}
          value={lastName}
          placeHolder={strings.last_name}
          label={strings.last_name}
          right={
            <TextInput.Icon
              onPress={clearLastName}
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/ic_close.png")}
            />
          }
        />

        {lastNameError !== "" && showErrorMessage(lastNameError)}
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          onChangeText={setIdNumber}
          value={idNumber}
          label={"ID Number"}
          placeHolder={"ID Number"}
          right={
            <TextInput.Icon
              onPress={() => setIdNumber("")}
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/ic_close.png")}
            />
          }
        />
        {idNumberError !== "" && showErrorMessage(idNumberError)}
      </View>
      {/* Gender */}
      <View style={{ marginTop: 10 }}>
        <CustomDropDown
          selectedValue={selectedValueGender}
          setValue={setValueGender}
          data={registerForm?.registerFormData?.GENDER ?? []}
          onChangeText={(text) => onGenderClick(text)}
          value={gender?.description}
          placeHolder={strings.gender}
        />

        {genderError !== "" && showErrorMessage(genderError)}
      </View>
      <View style={{ marginTop: spacing.HEIGHT_30 }}>
        {location != "" && (
          <Text style={styles.placeHolderText}>{strings.location}</Text>
        )}

        <Pressable
          onPress={() => locationIconClick()}
          style={styles.textLocation}
        >
          <Text
            style={{
              color: location != "" ? color.BLACK : color.PLACEHOLDER,
              fontSize: 14,
              marginBottom: 0,
              width: "90%",
              marginBottom: "2%",
            }}
            placeHolder={strings.location}
          >
            {location || strings.location}
          </Text>
          <Image
            style={{
              position: "absolute",
              right: 5,
              bottom: 5,
              height: 20,
              width: 20,
            }}
            source={require("../../../Assets/icons/map.png")}
          ></Image>
        </Pressable>
      </View>
      {/* Country */}
      {/* <View style={{ marginTop: spacing.HEIGHT_20 }}>
                            <CustomDropDown
                                data={registerForm?.registerFormData?.COUNTRY ?? []}
                                onChangeText={(text) => onCountryClick(text)}
                                value={country}
                                placeHolder={strings.country}
                            />
                            {!registerForm.initRegisterForm && registerForm?.loggedProfile?.errorCode == '404' &&
                                showErrorMessage(registerForm?.otpFormDataForEmail?.message||registerForm?.otpFormDataForEmail?.message)
                            }
                            {countryError !== "" &&
                                showErrorMessage(countryError)
                            }
                        </View> */}

      {/* <View style={{ marginTop: spacing.HEIGHT_30 }}>
              {location != "" && (
                <Text style={styles.placeHolderText}>{strings.location}</Text>
              )}

              <Pressable
                onPress={() => locationIconClick()}
                style={styles.textLocation}
              >
                <Text
                  style={{
                    color: location != "" ? color.BLACK : color.PLACEHOLDER,
                    fontSize: 14,
                    marginBottom: 0,
                    width: "90%",
                    marginBottom: "2%",
                  }}
                  placeHolder={strings.location}
                >
                  {location || strings.location}
                </Text>
                <Image
                  style={{
                    position: "absolute",
                    right: 5,
                    bottom: 5,
                    height: 20,
                    width: 20,
                  }}
                  source={require("../../../Assets/icons/map.png")}
                ></Image>
              </Pressable>
            </View> */}

      {/* Location */}
      {/* <View style={{ marginTop: spacing.HEIGHT_20 }}>
                            <CustomDropDown
                                data={registerForm?.registerFormData?.LOCATION ?? []}
                                onChangeText={(text) => onLocationClick(text)}
                                value={location}
                                placeHolder={strings.location}
                            />
                            {!registerForm.initRegisterForm && registerForm?.loggedProfile?.errorCode == '404' &&
                                showErrorMessage(registerForm?.otpFormDataForEmail?.message||registerForm?.otpFormDataForEmail?.message)
                            }

                            {locationError !== "" &&
                                showErrorMessage(locationError)
                            }
                        </View> */}

      {/* Mobile Number */}
      <View style={{ marginTop: 5 }}>
        <TextBoxWithCTA
          onChangeText={(text) => onMobleNoChange(text)}
          value={mobileNo}
          placeHolder={strings.mobile_number}
          isResendOTP={true}
          loader={
            registerForm?.initOtpForm && registerForm?.otpUsageType === "mobile"
              ? true
              : false
          }
          countryCode={countryCode}
          label={strings.send_otp}
          onPress={submitResndOTP}
          bgColor={color.BCAE_PRIMARY}
          keyboardType={"numeric"}
          isDisableButton={isDisableSendOtp}
          btnTextPro={{
            color: color.WHITE,
            fontSize: fontSizes.FONT_12,
            fontWeight: "400",
            lineHeight: spacing.HEIGHT_14,
          }}
        />
        {otpTimer > 0 && otpTimer < OTP_TIMER && (
          <View style={{ alignItems: "flex-end", marginTop: 10 }}>
            <Text style={styles.errorText}>
              {strings.otp_sent} {formatOtpTimer(otpTimer)}
            </Text>
          </View>
        )}
        {!registerForm.initOtpForm &&
          registerForm?.isOtpFormError &&
          registerForm?.otpFormDataForMobile?.errorCode > 200 &&
          registerForm?.otpUsageType === "mobile" &&
          showErrorMessage(registerForm?.otpFormDataForMobile?.message)}
        {numberError !== "" && showErrorMessage(numberError)}
      </View>
      {/* OTP */}
      <View style={{ marginTop: 5 }}>
        <TextBoxWithCTA
          onChangeText={(text) => onOTPChange(text)}
          value={otp}
          placeHolder={strings.otp}
          isConfirmOTP={true}
          label={strings.confirm_otp}
          loader={
            registerForm?.initOtpForm &&
            registerForm?.otpUsageType === "mobileOtp"
              ? true
              : false
          }
          correctOtp={mobileOTPVerifcation}
          onPress={submitConfirmMobileOTP}
          bgColor={color.BCAE_PRIMARY}
          keyboardType={"numeric"}
          btnTextPro={{
            color: color.WHITE,
            fontSize: fontSizes.FONT_12,
            fontWeight: "400",
            lineHeight: spacing.HEIGHT_14,
          }}
        />
        {otp !== "" &&
          !registerForm.initOtpForm &&
          registerForm?.otpFormDataForMobile?.data?.otp !== undefined &&
          registerForm?.otpFormDataForMobile?.data?.otp !== otp &&
          registerForm?.otpUsageType === "mobileOtp" &&
          showMobileErrorMessage()}

        {otp !== "" &&
          !registerForm.initOtpForm &&
          registerForm?.otpFormDataForMobile?.data?.data === null &&
          registerForm?.otpUsageType === "mobileOtp" &&
          showMobileErrorMessage()}

        {otpNumberError !== "" && showErrorMessage(otpNumberError)}
      </View>
      {/* Email */}
      <View style={{ marginTop: 5 }}>
        <TextBoxWithCTAEmail
          onChangeText={(text) => onEmailChange(text)}
          value={email}
          placeHolder={strings.email}
          isEmail={true}
          loader={
            registerForm?.initOtpForm && registerForm?.otpUsageType === "email"
              ? true
              : false
          }
          label={"CONFIRM EMAIL"}
          onPress={submitEmail}
          bgColor={color.BCAE_PRIMARY}
          btnTextPro={{
            color: color.WHITE,
            fontSize: fontSizes.FONT_12,
            fontWeight: "400",
            lineHeight: spacing.HEIGHT_14,
          }}
        />
        {!registerForm.initOtpForm &&
          registerForm?.isOtpFormError &&
          registerForm?.otpFormDataForEmail?.errorCode > 200 &&
          registerForm?.otpUsageType === "email" &&
          showErrorMessage(registerForm?.otpFormDataForEmail?.message)}

        {emailError !== "" && showErrorMessage(emailError)}
      </View>

      {/* OTP */}
      {/* {console.log("registerForm====>"+registerForm?.otpUsageType  +"===="+registerForm?.otpFormData.data.otp)} */}

      <View style={{ marginTop: 5 }}>
        <TextBoxWithCTA
          onChangeText={(text) => onEmailOTPChange(text)}
          value={otpEmail}
          placeHolder={strings.otp}
          isConfirmOTP={true}
          label={"CONFIRM OTP"}
          loader={
            registerForm?.initOtpForm &&
            registerForm?.otpUsageType === "emailOtp"
              ? true
              : false
          }
          correctOtp={emailOTPVerification}
          onPress={submitConfirmEmailOTP}
          bgColor={color.BCAE_PRIMARY}
          keyboardType={"numeric"}
          btnTextPro={{
            color: color.WHITE,
            fontSize: fontSizes.FONT_12,
            fontWeight: "400",
            lineHeight: spacing.HEIGHT_14,
          }}
        />
        {/* //{ console.log("otpEmail==>"+otpEmail+"===>"+registerForm.initOtpForm+"===="+registerForm?.otpFormData?.data?.otp+"===="+registerForm?.otpUsageTyp )} */}
        {otpEmail !== "" &&
          !registerForm.initOtpForm &&
          registerForm?.otpFormDataForEmail?.data?.otp !== undefined &&
          registerForm?.otpFormDataForEmail?.data?.otp !== otpEmail &&
          registerForm?.otpUsageType === "emailOtp" &&
          showEmailErrorMessage()}

        {otpEmail !== "" &&
          !registerForm.initOtpForm &&
          registerForm?.otpFormDataForEmail?.data?.data === null &&
          registerForm?.otpUsageType === "emailOtp" &&
          showEmailErrorMessage()}

        {otpEmailError !== "" && showErrorMessage(otpEmailError)}
      </View>

      <Pressable
        onPress={onCheckBoxClickTerm}
        style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
      >
        <Image
          style={styles.checkBox}
          source={
            isSelectedTerm
              ? require("../../../Assets/icons/ci_checked.png")
              : require("../../../Assets/icons/ci_uncheck.png")
          }
        ></Image>
        <Text style={{ marginLeft: spacing.WIDTH_8 }}>
          I have agree to your{" "}
        </Text>
        <Text
          onPress={() =>
            navigation.navigate("ShowWebPage", {
              fromLogin: true,
              title: "Terms & Conditions",
              url: DEBUG_BUILD ? STAGE_TERMS : PROD_TERMS,
            })
          }
          style={{ color: color.BCAE_DARK_BLUE }}
        >
          Terms &amp; Conditions.
        </Text>
      </Pressable>

      {termError !== "" && showErrorMessage(termError)}
      <Pressable
        onPress={onCheckBoxClick}
        style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
      >
        <Image
          style={styles.checkBox}
          source={
            isSelected
              ? require("../../../Assets/icons/ci_checked.png")
              : require("../../../Assets/icons/ci_uncheck.png")
          }
        ></Image>
        <Text style={{ marginLeft: spacing.WIDTH_8 }}>I have read your </Text>
        <Text
          onPress={() =>
            navigation.navigate("ShowWebPage", {
              fromLogin: true,
              title: "Privacy Policy",
              url: DEBUG_BUILD ? STAGE_PRIVACY : PROD_PRIVACY,
            })
          }
          style={{ color: color.BCAE_DARK_BLUE }}
        >
          Privacy Policy.
        </Text>
      </Pressable>

      {privaceyError !== "" && showErrorMessage(privaceyError)}

      {/* {
                                    console.log("registerForm===>"+JSON.stringify(registerForm?.otpFormData))
                                } */}
      {!registerForm.initRegisterForm &&
        registerForm?.otpFormData?.errorCode !== "200" &&
        registerForm?.otpUsageType === "Register" &&
        showErrorMessage(registerForm?.otpFormData?.message)}

      {/* {showAlert()} */}

      <View style={{ marginTop: spacing.HEIGHT_24 }}>
        {registerForm?.initOtpForm &&
        registerForm?.otpUsageType === "Register" ? (
          <CustomActivityIndicator
            size={buttonSize.LARGE}
            bgColor={color.BLACK}
            loderColor={color.WHITE}
          />
        ) : (
          <Button disabled={isButtomDiable} onPress={submit}>
            {"NEXT"}
          </Button>
        )}
      </View>
    </View>
  );
};
