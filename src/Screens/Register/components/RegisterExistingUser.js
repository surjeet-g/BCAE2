import React, { useEffect, useState } from "react";
import { Text, View, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { CustomDropDown } from "../../../Components/CustomDropDown";
import { strings } from "../../../Utilities/Language/index";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { setOtpFormData } from "../../../Redux/RegisterAction";
import { TextBoxWithCTAEmail } from "../../../Components/TextBoxWithCTAEmail";
import moment from "moment";
import { CustomInput } from "../../../Components/CustomInput";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
  PreVerifyUserDataData,
} from "../../../Redux/RegisterDispatcher";
import { TextBoxWithCTA } from "../../../Components/TextBoxWithCTA";
import { CustomButton as Button } from "../../../Components/CustomButton";

import DatePicker from "react-native-date-picker";
import { styles } from "../Register";
import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
} from "../../../Utilities/Constants/Constant";
import { TextInput, useTheme } from "react-native-paper";

export const RegisterExistingUser = React.memo(({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch([
    fetchRegisterFormData,
    sendOtp,
    userRegister,
    getOtpForCheck,
    PreVerifyUserDataData,
  ]);
  let registerForm = useSelector((state) => state.registerForm);
  //4 minute
  const OTP_TIMER = 60 * 4;
  const onConfirmPasswordChange = (textStr) => {
    setConfirmPassword(textStr);

    setConfirmPasswordError("");
    buttonEnableDiable();
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
  //to do remove dummy data
  const [firstName, setFirstName] = useState("vipin");
  const [lastName, setLastName] = useState("vv");
  const [customerID, setCustomerID] = useState("123123");
  const [idNumber, setIdNumber] = useState("123123");
  const [gender, setGender] = useState("M");
  const [mobileNo, setMobileNo] = useState("1231233");
  const [otp, setOTP] = useState("123123");
  const [otpEmail, setEmailOTP] = useState("123123");
  const [email, setEmail] = useState("vvv@gmail.com");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [customerID, setCustomerID] = useState("");
  // const [idNumber, setIdNumber] = useState("");
  // const [gender, setGender] = useState("");
  // const [mobileNo, setMobileNo] = useState("");
  // const [otp, setOTP] = useState("");
  // const [otpEmail, setEmailOTP] = useState("");
  // const [email, setEmail] = useState("");

  const [countryCode, setCountryCode] = useState("673");

  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerm, setSelectionTerm] = useState(false);

  const [isButtomDiable, setButtomEnableDisable] = useState(true);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [customerIDError, setCustomerIDError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");

  const [genderError, setgenderError] = useState("");

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
  const [selectedValueGender, setValueGender] = useState("");

  const [dob, setDob] = useState("");
  // const [dob, setDob] = useState("2023-02-10");
  const [dobError, setDobError] = useState("");
  const [open, setOpen] = useState(false);
  const onFirstNameChange = (textStr) => {
    setFirstName(textStr);
    setFirstNameError("");
    buttonEnableDiable();
  };

  const submit = async () => {
    const resp = await dispatch(PreVerifyUserDataData());
    if (resp.status) {
      navigation.navigate("SetPassword", {
        formData: JSON.stringify({ dummy: "dummy", accountType: "bussiness" }),
      });
    } else {
      Toast.show({
        type: "bctError",
        text1: result.response?.msg,
      });
    }
    //to do bypass otp validation
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

    if (firstName.trim() === "") {
      setFirstNameError(strings.firstNameError);
    } else if (lastName.trim() === "") {
      setLastNameError(strings.lastNameError);
    } else if (customerID === "") {
      setCustomerIDError(strings.customerIDError);
    } else if (idNumberError === "") {
      setIdNumberError(strings.idNumberError);
    } else if (dob === "") {
      dobError(strings.dobError);
    } else if (gender?.code === "") {
      setgenderError(strings.genderError);
    } else if (!validateNumber(mobileNo)) {
      setNumberError(strings.mobileValidError);
    } else if (otp.trim() === "") {
      setOtpNumberError(strings.numberOtpError);
    } else if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else if (otpEmail.trim() === "") {
      setOtpEmailError(strings.emailOtpError);
    } else {
      //to do   API call and verify if response 200 redirect to Set password
      // let registerObject = {
      //   firstName: firstName,
      //   lastName: lastName,
      //   userType: "string",
      //   gender: gender.code,
      //   // country: myArray.length > 0 ? myArray[0] : "",
      //   extn: 0,
      //   contactNo: mobileNo,
      //   mobileOTP: otp,
      //   email: email,
      //   dob: moment(dob).format("YYYY-MM-DD"),
      //   emailOTP: otpEmail,
      // };
      // console.log("userRegister===>2" + JSON.stringify(registerObject));
      // dispatch(
      //   userRegister(registerObject, "Register", (message) =>
      //     showAlert(message)
      //   )
      // );
      // });
      navigation.navigate("SetPassword", {
        formData: JSON.stringify({ dummy: "dummy", accountType: "personal" }),
      });
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

  const showErrorMessage = (errMessage) => {
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
      dob === "" ||
      firstName === "" ||
      lastName === "" ||
      gender === "" ||
      mobileNo === "" ||
      otp === "" ||
      email === "" ||
      otpEmail === "" ||
      customerID === "" ||
      idNumber === ""
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
  return (
    <View>
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
            <TextInput.Icon
              onPress={clearFirstName}
              theme={{ colors: { onSurfaceVariant: colors.gray } }}
              icon="close"
            />
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
            <TextInput.Icon
              onPress={clearLastName}
              theme={{ colors: { onSurfaceVariant: colors.gray } }}
              icon="close"
            />
          }
        />

        {lastNameError !== "" && showErrorMessage(lastNameError)}
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
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/mail.png")}
            />
          }
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <CustomInput
          style={{
            backgroundColor: "transparent",
          }}
          onChangeText={setCustomerID}
          value={customerID}
          caption={"Cusomer ID"}
          placeHolder={"Cusomer ID"}
          right={
            <TextInput.Icon
              onPress={() => setCustomerID("")}
              theme={{ colors: { onSurfaceVariant: colors.gray } }}
              icon="close"
            />
          }
        />
        {customerIDError !== "" && showErrorMessage(customerIDError)}
      </View>
      <View style={{ marginTop: 10 }}>
        <CustomInput
          style={{
            backgroundColor: "transparent",
          }}
          onChangeText={setIdNumber}
          value={idNumber}
          caption={"ID Number"}
          placeHolder={"ID Number"}
          right={
            <TextInput.Icon
              onPress={() => setIdNumber("")}
              theme={{ colors: { onSurfaceVariant: colors.gray } }}
              icon="close"
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

      {!registerForm.initRegisterForm &&
        registerForm?.otpFormData?.errorCode !== "200" &&
        registerForm?.otpUsageType === "Register" &&
        showErrorMessage(registerForm?.otpFormData?.message)}

      <View style={{ marginTop: spacing.HEIGHT_24 }}>
        {registerForm?.initOtpForm &&
        registerForm?.otpUsageType === "Register" ? (
          <CustomActivityIndicator
            size={buttonSize.LARGE}
            bgColor={color.BLACK}
            loderColor={color.WHITE}
          />
        ) : (
          <Button
            label="NEXT"
            // disabled={isButtomDiable}
            loading={
              registerForm?.initOtpForm
                ? registerForm?.otpUsageType === "Register"
                : false
            }
            onPress={submit}
            mode="contained"
          />
        )}
      </View>
    </View>
  );
});
