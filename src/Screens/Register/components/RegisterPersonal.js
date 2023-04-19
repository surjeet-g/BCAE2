import moment from "moment";
import React, { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, View } from "react-native";

import DatePicker from "react-native-date-picker";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { CustomDropDown } from "../../../Components/CustomDropDown";
import { CountryPicker } from "../../../Components/react-native-country-codes-picker";
import { TextBoxWithCTAEmail } from "../../../Components/TextBoxWithCTAEmail";
import { setOtpFormData } from "../../../Redux/RegisterAction";
import { strings } from "../../../Utilities/Language/index";
import {
  excludedCountriesList,
  getPhoneNumberLength,
} from "../../../Utilities/utils";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
} from "../../../Redux/RegisterDispatcher";

import get from "lodash.get";
import { Card, Text, TextInput, useTheme } from "react-native-paper";
import { ClearSpace } from "../../../Components/ClearSpace";
import { CustomButton as Button } from "../../../Components/CustomButton";
import { CustomInput } from "../../../Components/CustomInput";
import { StickyFooter } from "../../../Components/StickyFooter";
import { TextBoxWithCTA } from "../../../Components/TextBoxWithCTA";
import {
  color,
  fontSizes,
  isValidNumber,
  spacing,
  validateEmail,
  validatePassword,
} from "../../../Utilities/Constants/Constant";
import { SHADOW_STYLE } from "../../../Utilities/themeConfig";
import { styles } from "../Register";
var { height, width } = Dimensions.get("screen");
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

export const RegisterPersonal = React.memo(({ navigation }) => {
  // let navigation = useNavigation;
  const dispatch = useDispatch([
    fetchRegisterFormData,
    sendOtp,
    userRegister,
    getOtpForCheck,
  ]);
  const { colors } = useTheme();
  let registerForm = useSelector((state) => state.registerForm);
  //4 minute
  const OTP_TIMER = 90;

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
  const [dialpick, setDialPick] = useState("+673");
  const [emailOTPVerification, setEmailOTPVerification] = useState(false);
  const [mobileOTPVerifcation, setMobileOTPVerifcation] = useState(false);
  const [numberMaxLength, setNumberMaxLength] = useState(7);
  const [idType, setIdType] = useState("");
  // real
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
  const [street, setStreet] = useState("");
  const [state, setStateProfile] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //  mock

  // const [firstName, setFirstName] = useState("vipin");
  // const [lastName, setLastName] = useState("v");
  // const [idNumber, setIdNumber] = useState("123123");
  // const [gender, setGender] = useState({ code: "NC" });
  // const [title, setTitle] = useState("MR");
  // const [country, setCountry] = useState("india");
  // const [location, setLocation] = useState(
  //   "thirssur,kerala,india,thirssur,kerala,india"
  // );
  // const [latitude, setLatitude] = useState("1233123");
  // const [longitude, setLongitude] = useState("123123");
  // const [mobileNo, setMobileNo] = useState("1231231");
  // const [countryCode, setCountryCode] = useState("673");
  // const [otp, setOTP] = useState("123123");
  // const [otpEmail, setEmailOTP] = useState("123123");
  // const [email, setEmail] = useState("vvvipinmds@gmail.com");
  // const [street, setStreet] = useState("kerala");
  // const [state, setStateProfile] = useState("kerala");
  // const [district, setDistrict] = useState("thrissur");
  // const [postcode, setPostcoonde] = useState("123123");
  // const [password, setPassword] = useState("Mock@123");
  // const [confirmPassword, setConfirmPassword] = useState("Mock@123");
  //  mockend
  const [isButtomDiable, setButtomEnableDisable] = useState(true);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [idNumberError, setIdNumberError] = useState("");

  const [genderError, setgenderError] = useState("");
  const [titleError, setTitleError] = useState("");

  const [idTypeError, setIdTypeError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [otpNumberError, setOtpNumberError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [otpEmailError, setOtpEmailError] = useState("");

  const [otpTimer, setOtpTimer] = useState(OTP_TIMER);
  const [otpTimerEmail, setOtpTimerEmail] = useState(OTP_TIMER);
  const [isDisableSendOtp, setIsDisableSendOtp] = useState(false);
  const [isDisableSendOtpEmail, setIsDisableSendOtpEmail] = useState(false);
  const [selectedValueGender, setValueGender] = useState("");
  const [selectedValueTitle, setValueTitle] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerm, setSelectionTerm] = useState(false);
  const [selectedValueIdType, setValueIdType] = useState("");
  const [countryPickModel, setCountryPickModel] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setConfirmPasswordError] = useState("");

  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [termError, setTermError] = useState("");
  const [privaceyError, setPrivaceyError] = useState("");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");
  const [open, setOpen] = useState(false);
  const [addreType, setAddrType] = useState("");
  const [hno, setHno] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [city, setCity] = useState("");
  const onCheckBoxClickTerm = () => {
    //console.log("onCheckBoxClickTerm====>isSelectedTerm==>"+isSelectedTerm)
    setSelectionTerm(!isSelectedTerm);

    setTermError("");
  };
  const onPlaceChosen = (params) => {
    console.log("hitting back with ", params);
    setLatitude(params.currentLatitude);
    setLongitude(params.currentLongitude);
    setLocation(
      `${params.hno},${params.buildingName},${params.street},${params.city},${params.district},${params.state},${params.country},${params.postCode}`
    );
    setBuildingNo(params.buildingName);
    setStreet(params.street);
    setStateProfile(params.state);
    setDistrict(params.district);
    setCountry(params.country);
    setHno(params.hno);
    setPostcode(params.postCode);
    // setDialPick(params.dialPick);
    setAddrType(params.addressType);
    setCity(params.city);
  };
  const onFirstNameChange = (textStr) => {
    setFirstName(textStr);
    setFirstNameError("");
    buttonEnableDiable();
  };
  // const onLocationChanged = (textStr) => {
  //   setLocation(textStr);
  //   setLocationError("");
  //   buttonEnableDiable();
  // };
  const submit = async () => {
    // if (!mobileOTPVerifcation) {
    //   Toast.show({
    //     type: "bctError",
    //     text1: strings.otpErrorMsgForMobile,
    //   });
    //   return null;
    // }
    if (!emailOTPVerification) {
      Toast.show({
        type: "bctError",
        text1: strings.otpErrorMsgForEmail,
      });
      return null;
    }

    if (!validatePassword(password)) {
      setPasswordError(strings.passwordValidError);
    } else if (!validatePassword(confirmPassword)) {
      setConfirmPasswordError(strings.passwordValidError);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(strings.passwordandconfirmpasswordnotsame);
    }
    // else if (!isSelectedTerm) {

    //   setTermError(strings.termError);
    // } else if (!isSelected) {
    //   setPrivaceyError(strings.privaceyError);
    // }
    else if (idNumber === "") {
      setIdNumberError(strings.idNumberError);
    } else if (idType === "") {
      setIdTypeError(strings.idTypeError);
    } else if (gender?.code === "") {
      setgenderError(strings.genderError);
    } else if (title?.code === "") {
      setTitleError(strings.titleError);
    } else if (mobileNo.length !== numberMaxLength) {
      setNumberError(`Please enter a ${numberMaxLength} digit mobile number!!`);
    } else if (otp.trim() === "") {
      setOtpNumberError(strings.numberOtpError);
    } else if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else if (otpEmail.trim() === "") {
      setOtpEmailError(strings.emailOtpError);
    } else {
      console.log("submit validation success");

      let registerObject = {
        accountType: "personal",
        //userSource:"US_MOBILEAPP",
        title: title,
        firstName: firstName,
        lastName: lastName,
        gender: gender?.code, //gender.code
        //customerNo: "",  not required for personal customer
        extNo: countryCode,
        mobileNo: mobileNo,
        emailId: email,
        birthDate: moment(dob).format("YYYY-MM-DD"),
        idType: idType?.code,
        idValue: idNumber,
        address: {
          addressType: addreType,
          buildingName: buildingNo,
          houseNo: hno,
          address1: `${hno},${buildingNo}`,
          address2: `${district},${state}`,
          address3: `${country},${postcode}`,
          city,
          town: street,
          state: state,
          district: district,
          country: country,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          postcode: postcode,
        },
        password: password,
        confirmPassword: confirmPassword,
        isVerified: true,
      };
      console.log("submit validation success", registerObject);

      dispatch(
        userRegister(registerObject, "Register", (message) => {
          dispatch(setOtpFormData({}, "Register"));
          dispatch(setOtpFormData({}, "mobile"));
          dispatch(setOtpFormData({}, "mobileOtp"));
          dispatch(setOtpFormData({}, "email"));
          dispatch(setOtpFormData({}, "emailOtp"));
          navigation.navigate("RegisterSuccess", {
            name: `${firstName} ${lastName}`,
          });
        }),
        () => {
          console.log("callback for ");
        }
      );
      // });
    }
  };
  let masterReducer = useSelector((state) => state.masterdata);
  const genderList = get(masterReducer, "masterdataData.GENDER", []);
  const addreList = get(masterReducer, "masterdataData.ADDRESS_TYPE", []);
  const customerIdList = get(
    masterReducer,
    "masterdataData.CUSTOMER_ID_TYPE",
    []
  );

  const showAlert = (message = "") => {
    // if (
    //   !registerForm.initRegisterForm &&
    //   registerForm?.otpFormData?.status == "200" &&
    //   registerForm?.otpUsageType === "Register"
    // ) {
    //showErrorMessage(registerForm?.otpFormData?.message)
    Alert.alert("Info", message, [
      {
        text: "OK",
        onPress: () => {
          dispatch(setOtpFormData({}, "Register"));
          dispatch(setOtpFormData({}, "mobile"));
          dispatch(setOtpFormData({}, "mobileOtp"));
          dispatch(setOtpFormData({}, "email"));
          dispatch(setOtpFormData({}, "emailOtp"));
          navigation.navigate("Login", {});
        },
      },
    ]);
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

  const showOtpEmailSentMessage = () => {
    setIsDisableSendOtpEmail(true);
    runOtpTimerEmail(otpTimer);
  };

  const submitResndOTP = () => {
    if (!isValidNumber(mobileNo)) {
      setNumberError(strings.mobileValidError);
    } else {
      if (mobileNo.length !== numberMaxLength) {
        setNumberError(
          `Please enter a ${numberMaxLength} digit mobile number!!`
        );
      } else {
        if (firstName.trim() === "") {
          Toast.show({
            type: "bctError",
            text1: strings.firstNameError,
          });
          setFirstNameError(strings.firstNameError);
        } else {
          //alert("submitResndOTP");
          // const mobileNumberWIthCounty = (countryCode + mobileNo).replace(
          //   "+",
          //   ""
          // );
          //console.log("count", mobileNumberWIthCounty);
          dispatch(
            sendOtp(
              countryCode,
              mobileNo,
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
      otpEmail === "" ||
      idType === "" ||
      idNumber === "" ||
      location === "" ||
      password === "" ||
      dob === "" ||
      confirmPassword === ""
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

  const runOtpTimerEmail = (otpTimer) => {
    setTimeout(() => {
      setOtpTimerEmail(otpTimer);
      otpTimer = otpTimer - 1;
      if (otpTimer < 0) {
        setIsDisableSendOtpEmail(false);
        setOtpTimerEmail(OTP_TIMER);
      } else {
        runOtpTimerEmail(otpTimer);
      }
    }, 1000);
  };

  const submitConfirmMobileOTP = async () => {
    if (otp === "") {
      setOtpNumberError(strings.numberOtpError);
    } else {
      //const mobileNumberWIthCounty = (countryCode + mobileNo).replace("+", "");

      const resp = await dispatch(
        getOtpForCheck({ reference: mobileNo, otp }, "mobileOtp")
      ); // country code to be added to verify OTP
      if (resp.status) {
        setMobileOTPVerifcation(true);
      } else {
        setMobileOTPVerifcation(false);
      }
      buttonEnableDiable();
    }
  };
  //alert(JSON.stringify(Register));
  const submitConfirmEmailOTP = async () => {
    if (otpEmail === "") {
      setOtpEmailError(strings.emailOtpError);
    } else {
      const resp = await dispatch(
        getOtpForCheck({ reference: email, otp: otpEmail }, "emailOtp")
      );
      console.log("hitting", resp);
      if (resp.status) {
        setEmailOTPVerification(true);
      } else {
        setEmailOTPVerification(false);
      }
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
      dispatch(sendOtp("", email, firstName, "email", showOtpEmailSentMessage));
      buttonEnableDiable();
    }
  };

  const onCheckBoxClick = () => {
    //console.log("onCheckBoxClick====>isSelected===>"+isSelected)
  };
  const onClickPasswordChange = (text) => {
    //console.log("onCheckBoxClick====>isSelected===>"+isSelected)
    setPassword(text);
    setPasswordError("");
    buttonEnableDiable();
  };
  const onClickConfirmPasswordChange = (text) => {
    //console.log("onCheckBoxClick====>isSelected===>"+isSelected)
    setConfirmPassword(text);
    setConfirmPasswordError("");
    buttonEnableDiable();
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
    setgenderError("");
    buttonEnableDiable();
  };

  const onIdTypeClick = (textStr) => {
    // console.log(textStr.description)
    setIdType(textStr);
    setIdTypeError("");
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 12 }}>
        <ScrollView nestedScrollEnabled={true}>
          <Card
            style={{
              ...SHADOW_STYLE,
              padding: 12,
              // marginTop: 2,
              backgroundColor: colors.background,
              borderRadius: 16,
            }}
          >
            <View style={{ marginVertical: 5 }}>
              <CustomDropDown
                selectedValue={selectedValueTitle?.description}
                setValue={setTitle}
                data={[
                  { code: "Mr", description: "Mr" },
                  { code: "Mrs", description: "Mrs" },
                  { code: "Ms", description: "Ms" },
                  { code: "Miss", description: "Miss" },
                ]}
                onChangeText={(text) => {
                  setValueTitle(text);
                  buttonEnableDiable();
                }}
                value={title?.description}
                placeHolder={strings.title}
              />

              {titleError !== "" && showErrorMessage(titleError)}
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomInput
                style={{
                  backgroundColor: "transparent",
                }}
                onChangeText={(text) => onFirstNameChange(text)}
                value={firstName}
                caption={strings.first_name}
                placeHolder={strings.first_name}
                right={
                  firstName && (
                    <TextInput.Icon
                      onPress={clearFirstName}
                      // style={{ width: 15, height: 15 }}
                      theme={{ colors: { onSurfaceVariant: colors.gray } }}
                      icon="close"
                    />
                  )
                }
              />

              {firstNameError !== "" && showErrorMessage(firstNameError)}
            </View>

            {/* Last Name */}
            <View style={{ marginTop: 5 }}>
              <CustomInput
                style={{
                  backgroundColor: "transparent",
                }}
                onChangeText={(text) => onLastNameChange(text)}
                value={lastName}
                placeHolder={strings.last_name}
                caption={strings.last_name}
                right={
                  lastName && (
                    <TextInput.Icon
                      onPress={clearLastName}
                      theme={{ colors: { onSurfaceVariant: colors.gray } }}
                      icon="close"
                    />
                  )
                }
              />

              {lastNameError !== "" && showErrorMessage(lastNameError)}
            </View>
            {/* Gender */}
            <View style={{ marginTop: 5 }}>
              <CustomDropDown
                selectedValue={selectedValueGender}
                setValue={setValueGender}
                data={genderList}
                onChangeText={(text) => onGenderClick(text)}
                value={gender?.description}
                placeHolder={strings.gender}
              />

              {genderError !== "" && showErrorMessage(genderError)}
            </View>
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
                buttonEnableDiable();
              }}
            />
            <View style={{ marginTop: 10 }}>
              <CustomInput
                style={{
                  backgroundColor: "transparent",
                }}
                // onChangeText={(text) => onIDChange(text)}
                value={dob == "" ? "" : moment(dob).format("YYYY-MM-DD")}
                caption={"Date of birth"}
                onFocus={() => setOpen(true)}
                placeHolder={"Date of birth"}
                right={
                  <TextInput.Icon
                    onPress={() => setOpen(true)}
                    theme={{ colors: { onSurfaceVariant: colors.primary } }}
                    icon="calendar"
                  />
                }
              />
              {dobError !== "" && showErrorMessage(dobError)}
            </View>
            <View style={{ marginTop: 5 }}>
              <CustomDropDown
                selectedValue={selectedValueIdType}
                setValue={setValueIdType}
                data={customerIdList}
                onChangeText={(text) => onIdTypeClick(text)}
                value={gender?.description}
                placeHolder={strings.id_type}
              />

              {idTypeError !== "" && showErrorMessage(idTypeError)}
            </View>

            <View style={{ marginTop: 10 }}>
              <CustomInput
                style={{
                  backgroundColor: "transparent",
                }}
                onChangeText={(text) => {
                  setIdNumber(text);
                  buttonEnableDiable();
                }}
                value={idNumber}
                caption={strings.id_number}
                placeHolder={strings.id_number}
                right={
                  idNumber && (
                    <TextInput.Icon
                      onPress={() => setIdNumber("")}
                      theme={{ colors: { onSurfaceVariant: colors.gray } }}
                      icon="close"
                    />
                  )
                }
              />
              {idNumberError !== "" && showErrorMessage(idNumberError)}
            </View>

            <View style={{ marginTop: 10 }}>
              <CustomInput
                multiline={true}
                numberOfLines={2}
                style={{
                  backgroundColor: "transparent",
                }}
                value={location || strings.location}
                caption={strings.location}
                placeHolder={strings.location}
                right={
                  <TextInput.Icon
                    onPress={() => locationIconClick()}
                    theme={{ colors: { onSurfaceVariant: colors.primary } }}
                    icon="map"
                  />
                }
              />
            </View>
          </Card>

          {/* ID Type */}

          <CountryPicker
            show={countryPickModel}
            excludedCountries={excludedCountriesList()}
            pickerButtonOnPress={(item) => {
              setDialPick(item.dial_code);
              setCountryPickModel(false);

              setNumberMaxLength(getPhoneNumberLength(item.code));
            }}
            onBackdropPress={() => setCountryPickModel(false)}
            style={{
              modal: {
                height: "65%",
              },
            }}
          />
          <ClearSpace size={1} />
          <Text variant="headlineSmall">Mobile Verification</Text>
          <ClearSpace size={1} />
          {/* Mobile Number */}
          <Card
            style={{
              ...SHADOW_STYLE,
              padding: 12,
              marginTop: 2,
              backgroundColor: colors.background,
            }}
          >
            <View style={{ marginTop: 5 }}>
              <TextBoxWithCTA
                onChangeText={(text) => onMobleNoChange(text)}
                value={mobileNo}
                placeHolder={strings.mobile_number}
                isResendOTP={true}
                loader={
                  registerForm?.initOtpForm &&
                  registerForm?.otpUsageType === "mobile"
                    ? true
                    : false
                }
                onPressOnCountyCode={() => setCountryPickModel(true)}
                countryCode={dialpick}
                label={strings.send_otp}
                onPress={submitResndOTP}
                bgColor={color.BCAE_PRIMARY}
                keyboardType={"numeric"}
                isDisableButton={isDisableSendOtp}
                maxLength={numberMaxLength}
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
                placeHolder={strings.mobile_otp}
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
          </Card>
          <ClearSpace size={1} />
          <Text variant="headlineSmall">Email Verification</Text>
          <ClearSpace size={1} />
          {/* Mobile Number */}
          <Card
            style={{
              ...SHADOW_STYLE,
              padding: 12,
              marginTop: 2,
              backgroundColor: colors.background,
            }}
          >
            {/* Email */}
            <View style={{ marginTop: 5 }}>
              <TextBoxWithCTAEmail
                onChangeText={(text) => onEmailChange(text)}
                value={email}
                placeHolder={strings.email}
                isEmail={true}
                loader={
                  registerForm?.initOtpForm &&
                  registerForm?.otpUsageType === "email"
                    ? true
                    : false
                }
                isDisableButton={isDisableSendOtpEmail}
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
              {otpTimerEmail > 0 && otpTimerEmail < OTP_TIMER && (
                <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                  <Text style={styles.errorText}>
                    {strings.otp_sent} {formatOtpTimer(otpTimerEmail)}
                  </Text>
                </View>
              )}
              {!registerForm.initOtpForm &&
                registerForm?.isOtpFormError &&
                registerForm?.otpFormDataForEmail?.errorCode > 200 &&
                registerForm?.otpUsageType === "email" &&
                showErrorMessage(registerForm?.otpFormDataForEmail?.message)}

              {emailError !== "" && showErrorMessage(emailError)}
            </View>

            {/* OTP */}

            <View style={{ marginTop: 5 }}>
              <TextBoxWithCTA
                onChangeText={(text) => onEmailOTPChange(text)}
                value={otpEmail}
                placeHolder={strings.email_otp}
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
          </Card>
          <ClearSpace size={1} />
          <Text variant="headlineSmall">Set password</Text>
          <ClearSpace size={1} />
          {/* Mobile Number */}
          <Card
            style={{
              ...SHADOW_STYLE,
              padding: 12,
              marginTop: 2,
              backgroundColor: colors.background,
            }}
          >
            <View style={{ marginTop: 5 }}>
              <CustomInput
                value={password}
                caption={strings.password}
                placeHolder={strings.password}
                onChangeText={onClickPasswordChange}
                secureTextEntry={secureTextEntry}
                right={
                  password && (
                    <TextInput.Icon
                      onPress={() => setsecureTextEntry(!secureTextEntry)}
                      style={{ width: 23, height: 23 }}
                      icon={
                        secureTextEntry
                          ? require("../../../Assets/icons/ic_password_show.png")
                          : require("../../../Assets/icons/ic_password_hide.png")
                      }
                    />
                  )
                }
              />

              {/* {showErrorMessage("sds")} */}
              {passwordError !== "" && showErrorMessage(passwordError)}
            </View>
            <View style={{ marginBottom: spacing.HEIGHT_20 }}>
              <CustomInput
                value={confirmPassword}
                caption={strings.confirmPassword}
                placeHolder={strings.confirmPassword}
                onChangeText={onClickConfirmPasswordChange}
                secureTextEntry={secureTextEntryConfim}
                right={
                  confirmPassword && (
                    <TextInput.Icon
                      onPress={() =>
                        setsecureTextEntryConfim(!secureTextEntryConfim)
                      }
                      style={{ width: 23, height: 23 }}
                      icon={
                        secureTextEntryConfim
                          ? require("../../../Assets/icons/ic_password_show.png")
                          : require("../../../Assets/icons/ic_password_hide.png")
                      }
                    />
                  )
                }
              />

              {passwordConfirmError !== "" &&
                showErrorMessage(passwordConfirmError)}
            </View>
          </Card>
        </ScrollView>
      </View>
      <StickyFooter>
        <>
          <View>
            <Button
              label={strings.register}
              isDisabled={isButtomDiable}
              onPress={submit}
              loading={
                registerForm?.initOtpForm
                  ? registerForm?.otpUsageType === "Register"
                  : false
              }
              mode="contained"
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
              onPress={
                () => alert("Navigate to T&C")
                // navigation.navigate("ShowWebPage", {
                //   fromLogin: true,
                //   title: "Privacy Policy",
                //   url: DEBUG_BUILD ? STAGE_PRIVACY : PROD_PRIVACY,
                // })
              }
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
        </>
      </StickyFooter>
    </View>
  );
});
