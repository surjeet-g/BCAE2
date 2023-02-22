import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { CustomDropDown } from "../../../Components/CustomDropDown";
import { strings } from "../../../Utilities/Language/index";
import { CustomActivityIndicator } from "../../../Components/CustomActivityIndicator";
import { setOtpFormData } from "../../../Redux/RegisterAction";
import { TextBoxWithCTAEmail } from "../../../Components/TextBoxWithCTAEmail";
import { CountryPicker } from "react-native-country-codes-picker";

import {
  fetchRegisterFormData,
  getOtpForCheck,
  sendOtp,
  userRegister,
  PreVerifyUserDataData,
} from "../../../Redux/RegisterDispatcher";

import { TextBoxWithCTA } from "../../../Components/TextBoxWithCTA";
import { CustomInput as TextInput } from "../../../Components/CustomInput";
import { CustomButton as Button } from "../../../Components/CustomButton";

import { styles } from "../Register";
import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
} from "../../../Utilities/Constants/Constant";

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
    PreVerifyUserDataData,
  ]);

  let registerForm = useSelector((state) => state.registerForm);
  //4 minute
  const OTP_TIMER = 60 * 4;

  const onPlaceChosen = (params) => {
    setLatitude(params.currentLatitude);
    setLongitude(params.currentLongitude);

    setStreet(params.street);
    setStateProfile(params.state);
    setDistrict(params.district);
    setCountry(params.country);
    setPostcode(params.postCode);
    setDialPick(params.dialPick);
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

  const [isButtomDiable, setButtomEnableDisable] = useState(true);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [idNumberError, setIdNumberError] = useState("");

  const [genderError, setgenderError] = useState("");
  const [titleError, setTitleError] = useState("");

  const [numberError, setNumberError] = useState("");
  const [otpNumberError, setOtpNumberError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [otpEmailError, setOtpEmailError] = useState("");

  const [otpTimer, setOtpTimer] = useState(OTP_TIMER);
  const [isDisableSendOtp, setIsDisableSendOtp] = useState(false);
  const [selectedValueGender, setValueGender] = useState("");
  const [selectedValueTitle, setValueTitle] = useState("");

  const [street, setStreet] = useState("");
  const [state, setStateProfile] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [countryPickModel, setCountryPickModel] = useState(false);

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
    alert("sdfd");
    const resp = await dispatch(PreVerifyUserDataData());

    if (resp.status) {
      navigation.navigate("SetPassword", {
        formData: JSON.stringify({ dummy: "dummy", accountType: "personal" }),
      });
    } else {
      Toast.show({
        type: "bctError",
        text1: result.response?.msg,
      });
    }
    //to do remove this bypass
    return false;
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
    } else {
      const myArray = location.split(",").reverse();
      let registerObject = {
        firstName: firstName,
        lastName: lastName,
        userType: "string",
        gender: gender.code,
        country: myArray.length > 0 ? myArray[0] : "",
        extn: countryCode,
        contactNo: mobileNo,
        mobileOTP: otp,
        email: email,
        address: {
          address: location,
          hno: "",
          buildingName: "",
          street: street,
          road: "",
          city: "",
          state: state,
          district: district,
          country: country,
          latitude: latitude,
          longitude: longitude,
          postCode: postcode,
        },
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
              style={{ width: 23, height: 23 }}
              icon={require("../../../Assets/icons/ic_close.png")}
            />
          }
        />

        {lastNameError !== "" && showErrorMessage(lastNameError)}
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
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
      <CountryPicker
        show={countryPickModel}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setDialPick(item.dial_code);
          setCountryPickModel(false);
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
        <Button
          label="NEXT"
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
