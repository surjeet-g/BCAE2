import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { CustomDropDown } from "../../../Components/CustomDropDown";
import { strings } from "../../../Utilities/Language/index";
import { setOtpFormData } from "../../../Redux/RegisterAction";
import { TextBoxWithCTAEmail } from "../../../Components/TextBoxWithCTAEmail";
import { CountryPicker } from "../../../Components/react-native-country-codes-picker";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import {
  capitalizeFirstLetter,
  getPhoneNumberLength,
  excludedCountriesList,
} from "../../../Utilities/utils";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
} from "../../../Redux/RegisterDispatcher";

import { TextBoxWithCTA } from "../../../Components/TextBoxWithCTA";
import { CustomInput } from "../../../Components/CustomInput";
import { CustomButton as Button } from "../../../Components/CustomButton";
import { TextInput } from "react-native-paper";
import { styles } from "../Register";
import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
  validatePassword,
} from "../../../Utilities/Constants/Constant";
import { useTheme } from "react-native-paper";
import get from "lodash.get";

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

  const onPlaceChosen = (params) => {
    console.log("hitting back with ", params);
    setLatitude(params.currentLatitude);
    setLongitude(params.currentLongitude);
    setLocation(
      `${params.street},${params.state},${params.country},${params.postCode}`
    );
    setStreet(params.street);
    setStateProfile(params.state);
    setDistrict(params.district);
    setCountry(params.country);
    setPostcode(params.postCode);
    // setDialPick(params.dialPick);
    setAddrType(params.addressType);
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
  const [dialpick, setDialPick] = useState("+673");
  const [emailOTPVerification, setEmailOTPVerification] = useState(false);
  const [mobileOTPVerifcation, setMobileOTPVerifcation] = useState(false);

  // real
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idType, setIdType] = useState("");
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
  const [numberMaxLength, setNumberMaxLength] = useState(7);
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
  // const [postcode, setPostcode] = useState("123123");
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
  const [isDisableSendOtp, setIsDisableSendOtp] = useState(false);
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
  const onCheckBoxClickTerm = () => {
    //console.log("onCheckBoxClickTerm====>isSelectedTerm==>"+isSelectedTerm)
    setSelectionTerm(!isSelectedTerm);

    setTermError("");
  };
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
  const submit = async () => {
    console.log(">>", title);
    // if (!mobileOTPVerifcation) {
    //   Toast.show({
    //     type: "bctError",
    //     text1: strings.otpErrorMsgForMobile,
    //   });
    //   return null;
    // }
    // if (!emailOTPVerification) {
    //   Toast.show({
    //     type: "bctError",
    //     text1: strings.otpErrorMsgForEmail,
    //   });
    //   return null;
    // }

    if (!validatePassword(password)) {
      setPasswordError(strings.passwordValidError);
    } else if (!validatePassword(confirmPassword)) {
      setConfirmPasswordError(strings.passwordValidError);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(strings.passwordandconfirmpasswordnotsame);
    } else if (!isSelectedTerm) {
      setTermError(strings.termError);
    } else if (!isSelected) {
      setPrivaceyError(strings.privaceyError);
    } else if (idNumber === "") {
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
        title: title,
        firstName: firstName,
        lastName: lastName,
        gender: gender?.code, //gender.code
        customerNo: "",
        mobileNo: mobileNo,
        emailId: email,
        birthDate: moment(dob).format("YYYY-MM-DD"),
        idType: idType?.code,
        idValue: idNumber,
        address: {
          addressType: addreType,
          buildingName: "",
          houseNo: street,
          address1: street,
          address2: `${district},${state}`,
          address3: `${country},${postcode}`,
          city: street,
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
        userRegister(registerObject, "Register", (message) =>
          showAlert(message)
        ),
        () => {
          console.log("callback for ");
        }
      );
      // });
    }
  };
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

  const submitResndOTP = () => {
    if (mobileNo.length !== numberMaxLength) {
      setNumberError(`Please enter a ${numberMaxLength} digit mobile number!!`);
    } else {
      if (firstName.trim() === "") {
        Toast.show({
          type: "bctError",
          text1: strings.firstNameError,
        });
        setFirstNameError(strings.firstNameError);
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
      otpEmail === "" ||
      idType === "" ||
      idNumber === "" ||
      location === "" ||
      password === "" ||
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

  const submitConfirmMobileOTP = async () => {
    if (otp === "") {
      setOtpNumberError(strings.numberOtpError);
    } else {
      const resp = await dispatch(
        getOtpForCheck({ reference: countryCode + mobileNo, otp }, "mobileOtp")
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
      dispatch(sendOtp(email, firstName, "email"));
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

  const onIdTypeClick = (textStr) => {
    // console.log(textStr.description)
    setIdType(textStr);
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
      <View style={{ marginTop: spacing.HEIGHT_30 }}>
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
          data={registerForm?.registerFormData?.GENDER ?? []}
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
        }}
      />

      <View style={{ marginTop: 30 }}>
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

      {/* ID Type */}
      <View style={{ marginTop: 5 }}>
        <CustomDropDown
          selectedValue={selectedValueIdType}
          setValue={setValueIdType}
          data={registerForm?.registerFormData?.CUSTOMER_ID_TYPE ?? []}
          onChangeText={(text) => onIdTypeClick(text)}
          value={gender?.description}
          placeHolder={strings.id_type}
        />

        {idTypeError !== "" && showErrorMessage(idTypeError)}
      </View>

      <View style={{ marginTop: 30 }}>
        <CustomInput
          style={{
            backgroundColor: "transparent",
          }}
          onChangeText={setIdNumber}
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
          onChangeText={setConfirmPassword}
          secureTextEntry={secureTextEntryConfim}
          right={
            confirmPassword && (
              <TextInput.Icon
                onPress={() => setsecureTextEntryConfim(!secureTextEntryConfim)}
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

        {passwordConfirmError !== "" && showErrorMessage(passwordConfirmError)}
      </View>
      <Pressable
        onPress={() => {
          console.log("hiint g");
          setSelection(!isSelected);
          setTermError("");
          setPrivaceyError("");
        }}
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

      <View style={{ marginTop: spacing.HEIGHT_24 }}>
        <Button
          label={strings.register}
          // isDisabled={isButtomDiable}
          onPress={submit}
          loading={
            registerForm?.initOtpForm
              ? registerForm?.otpUsageType === "Register"
              : false
          }
          mode="contained"
        />
      </View>
    </View>
  );
});
