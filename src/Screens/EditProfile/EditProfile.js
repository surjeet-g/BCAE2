import React, { useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";

import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
} from "../../Utilities/Constants/Constant";
import { Text, TextInput } from "react-native-paper";
import { CustomDropDown } from "../../Components/CustomDropDown";
import {
  fetchRegisterFormData,
  getOtpForNumber,
} from "../../Redux/RegisterDispatcher";
import {
  fetchSavedProfileData,
  updateProfileData,
} from "../../Redux/ProfileDispatcher";
import { strings } from "../../Utilities/Language/index";
import { FullPageLoder } from "../../Components/FullPageLoder";
import ProfileHeader from "../TabScreens/Component/ProfileHeader";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fetchSavedLocations } from "../../Redux/SavedLocationDispatcher";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import { TDLog } from "../../Utilities/Constants/Constant";
import { useTheme } from "react-native-paper";
import theme from "../../Utilities/themeConfig";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomInput } from "../../Components/CustomInput";

const EditProfile = ({ navigation, props }) => {
  const { colors, fonts } = useTheme();
  let savedLocation = useSelector((state) => state.savedLocations);
  const dispatchSaveLocation = useDispatch([fetchSavedLocations]);
  const fetchSavedLocationData = () =>
    dispatchSaveLocation(fetchSavedLocations());
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [location, setLocation] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [otp, setOTP] = useState("");
  const [otpEmail, setEmailOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [isSaveButtonDisable, setSaveButtomEnableDisable] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [myscreenmae, setscreenname] = useState("Edit Profile");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setgenderError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [otpNumberError, setOtpNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpEmailError, setOtpEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setConfirmPasswordError] = useState("");
  const [profileImageData, setProfileImageData] = useState("");
  const [selectedValueGender, setValueGender] = useState("");
  const [selectedValueCountry, setValueCountry] = useState("");
  let registerForm = useSelector((state) => state.registerForm);
  const dispatch1 = useDispatch([fetchRegisterFormData]);

  const [street, setStreet] = useState("");
  const [state, setStateProfile] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostcode] = useState("");

  useEffect(() => {
    dispatch1(fetchRegisterFormData());
  }, []);

  let profile = useSelector((state) => state.profile);
  const dispatch2 = useDispatch([fetchSavedProfileData, updateProfileData]);
  console.log("res.data.country : " + profile?.savedProfileData?.country);

  useEffect(() => {
    async function fetchMyAPI() {
      const res = await dispatch2(fetchSavedProfileData());

      if (res.status) {
        setUserId(res.data.userId);
        setProfileImageData(res.data.profilePicture);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setGender(res.data.gender);
        setValueGender(res.data.gender);
        setCountry(res.data.country);
        setValueCountry(res.data.country);
        setMobileNo(res.data.contactNo);
        setEmail(res.data.email);
        setLocation(getAddressString(res.data));
      }

      // console.warn("useeffect", profile?.savedProfileData);
    }

    fetchMyAPI();
  }, []);

  const genderLot = (gender) => {
    if (gender === "M") return "Male";
    if (gender === "F") return "Female";
    return gender;
  };
  const getAddressString = (data) => {
    let addressString = "";
    // if (data?.addressNo) {
    //   addressString += data.addressNo + ",";
    // }
    // if (data?.address1) {
    //   addressString += data.address1 + ",";
    // }
    // if (data?.address2) {
    //   addressString += data.address2 + ",";
    // }
    // if (data?.address3) {
    //   addressString += data.address3 + ",";
    // }

    if (data?.city) {
      addressString += data.city + ",";
    }
    if (data?.district) {
      addressString += data.district + ",";
    }
    if (data?.state) {
      addressString += data.state + ",";
    }
    if (data?.country) {
      addressString += data.country + ",";
      setCountry(data?.country);
    } else {
      addressString += "Brunei Darussalam";
      setCountry("Brunei Darussalam");
    }

    if (data?.postcode) {
      addressString += "" + data.postcode;
    }
    return addressString;
  };

  const onPlaceChosen = (params) => {
    // here is your callback function
    TDLog("onPlaceChosen Edit profile", JSON.stringify(params));

    setLatitude(params.currentLatitude);
    setLongitude(params.currentLongitude);
    setStreet(params.street);
    setStateProfile(params.state);
    setDistrict(params.district);
    setCountry(params.country);
    setPostcode(params.postCode);
  };

  const locationIconClick = () => {
    navigation.navigate("SavedLocation", {
      onPlaceChosen,
      fromPage: "EditProfile",
    });
  };

  const changeProfileImage = () => {
    let options = {
      title: "Select Image",
      customButtons: [
        { name: "customOptionKey", title: "Choose Photo from Custom Option" },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton);
        } else {
          const source = { uri: response.uri };

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          //alert(JSON.stringify(response?.assets[0]))
          setProfileImageData(response?.assets[0]?.base64);
        }
      }
    );
  };

  const buttonEnableDisable = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      gender === "" ||
      country === "" ||
      location === ""
    ) {
      setSaveButtomEnableDisable(true);
    } else {
      setSaveButtomEnableDisable(false);
    }
  };

  const onLocationChanged = (textStr) => {
    setLocation(textStr);
    setLocationError("");
  };
  const onFirstNameChange = (textStr) => {
    setFirstName(textStr);
    setFirstNameError("");
    buttonEnableDisable();
  };
  const clearFirstName = () => {
    setFirstName("");
    setFirstNameError(strings.firstNameError);
  };

  const onLastNameChange = (textStr) => {
    setLastName(textStr);
    setLastNameError("");
    buttonEnableDisable();
  };
  const clearLastName = () => {
    setLastName("");
    setLastNameError(strings.lastNameError);
  };

  const onGenderClick = (textStr) => {
    setGender(textStr?.description);
    buttonEnableDisable();
  };
  const onCountryClick = (textStr) => {
    setCountry(textStr?.description);
    setCountryCode(textStr?.mapping?.countryCode ?? "");
    buttonEnableDisable();
  };
  const onLocationClick = (textStr) => {
    setLocation(textStr.onChangeText);
    buttonEnableDisable();
  };

  const onMobleNoChange = (textStr) => {
    setMobileNo(textStr);
    setNumberError("");
    buttonEnableDisable();
  };
  const onOTPChange = (textStr) => {
    setOTP(textStr);
    setOtpNumberError("");
    buttonEnableDisable();
  };
  const onEmailOTPChange = (textStr) => {
    setEmailOTP(textStr);
    setOtpEmailError("");
    buttonEnableDisable();
  };
  const onEmailChange = (textStr) => {
    setEmail(textStr);
    setEmailError("");
    buttonEnableDisable();
  };

  const submitResndOTP = () => {
    if (!validateNumber(mobileNo)) {
      setNumberError(strings.mobileValidError);
    } else {
      //alert('submitResndOTP')
      dispatch1(getOtpForNumber(countryCode + mobileNo, firstName, "mobile"));
      buttonEnableDisable();
    }
  };
  const submitConfirmMobileOTP = () => {
    if (otp === "") {
      setOtpNumberError(strings.numberOtpError);
    } else {
      // dispatch(getOtpForNumber( email, firstName, "email"))
      buttonEnableDisable();
    }
  };

  const submitConfirmEmailOTP = () => {
    if (otpEmail === "") {
      setOtpEmailError(strings.emailOtpError);
    } else {
      //alert('submitResndOTP')
      // dispatch(getOtpForNumber( email, firstName, "email"))
      buttonEnableDisable();
    }
  };
  const submitEmail = () => {
    if (!validateEmail(email)) {
      setEmailError(strings.emailValidError);
    } else {
      //alert('submitResndOTP')
      dispatch1(getOtpForNumber(email, firstName, "email"));
      buttonEnableDisable();
    }
  };

  const onCheckBoxClick = () => {
    setSelection(!isSelected);
    buttonEnableDisable();
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
  };

  const onConfirmPasswordChange = (textStr) => {
    setConfirmPassword(textStr);

    setConfirmPasswordError("");
  };

  const submit = () => {
    if (isSaveButtonDisable) {
      Alert.alert(strings.attention, strings.field_empty_alert, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      console.warn("submit", location, street);
      console.log("submit====>1-->" + location);
      const myArray = location.split(",").reverse();
      console.log("submit====>1-->" + location);
      if (firstName?.trim() === "") {
        setFirstNameError(strings.firstNameError);
      } else if (lastName?.trim() === "") {
        setLastNameError(strings.lastNameError);
      } else if (gender === "") {
        setgenderError(strings.genderError);
      } else if (country === "") {
        setCountryError(strings.countryError);
      }
      //else if (location === "") { setLocationError(strings.locationError) }
      else {
        let registerObject = {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          profilePicture: profileImageData,
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
            postCode: postCode,
          },
        };
        console.log(
          "EditProfile Object ===> " + JSON.stringify(registerObject)
        );
        dispatch2(
          updateProfileData(registerObject, profile.savedProfileData.userId)
        );
      }
      //dispatch2(updateProfileData(registerObject,profile.savedProfileData.userId));
    }
  };

  const showErrorMessage = (errMessage) => {
    return (
      <View
        style={{
          marginTop: spacing.HEIGHT_6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}> {errMessage}</Text>
      </View>
    );
  };

  const orSection = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: spacing.HEIGHT_32,
        }}
      >
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
          }}
        ></View>
        <Text style={styles.orText}>{strings.or}</Text>
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
            alignContent: "flex-end",
          }}
        ></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {profile.initProfile && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 200,
          }}
        >
          <LoadingAnimation></LoadingAnimation>
          <Text style={styles.emptyList}>{strings.please_wait}</Text>
        </View>
      )}
      {!profile.initProfile && (
        <View style={styles.container}>
          <View
            style={{
              // height: 150,
              backgroundColor: colors.secondary,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={changeProfileImage}>
              <View style={[{ alignItems: "center" }]}>
                <ImageBackground
                  source={{ uri: `data:image/jpeg;base64,${profileImageData}` }}
                  imageStyle={{ borderRadius: 80 }}
                  style={{ height: 110, width: 110 }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Image
                      source={require("../../Assets/icons/ic_camera_white.png")}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 30,
                        marginBottom: 10,
                      }}
                    />
                  </View>
                </ImageBackground>

                <Text variant="bodyLarge" style={styles.caption}>
                  {userId}
                </Text>
                <ClearSpace />
                <Text variant="bodySmall" style={styles.caption_small}>
                  {email}
                </Text>
                <ClearSpace />
                <Text variant="bodyLarge" style={styles.caption}>
                  {mobileNo}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {registerForm.initRegisterForm ? (
            <FullPageLoder
              bgColor={color.DISABLED_GREY}
              loderColor={color.BCAE_PRIMARY}
            />
          ) : (
            <ScrollView
              style={{ flexGrow: 1, paddingHorizontal: spacing.WIDTH_30 }}
              nestedScrollEnabled={true}
            >
              {/* First Name */}
              <View style={{ marginTop: spacing.HEIGHT_30 }}>
                <CustomInput
                  editable={false}
                  caption={strings.first_name}
                  placeholder={strings.first_name}
                  onChangeText={(text) => onFirstNameChange(text)}
                  value={firstName}
                  right={
                    <TextInput.Icon
                      onPress={clearFirstName}
                      style={{ width: 23, height: 23 }}
                      icon={require("../../Assets/icons/ic_close.png")}
                    />
                  }
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {firstNameError !== "" && showErrorMessage(firstNameError)}
              </View>

              {/* Last Name */}
              <View style={{ marginTop: spacing.HEIGHT_5 }}>
                <CustomInput
                  editable={false}
                  caption={strings.last_name}
                  placeholder={strings.last_name}
                  onChangeText={(text) => onLastNameChange(text)}
                  value={lastName}
                  right={
                    <TextInput.Icon
                      onPress={clearLastName}
                      style={{ width: 23, height: 23 }}
                      icon={require("../../Assets/icons/ic_close.png")}
                    />
                  }
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {lastNameError !== "" && showErrorMessage(lastNameError)}
              </View>

              {/* Gender */}
              <View style={{}}>
                <CustomDropDown
                  selectedValue={genderLot(selectedValueGender)}
                  setValue={setValueGender}
                  data={registerForm?.registerFormData?.GENDER ?? []}
                  onChangeText={(text) => onGenderClick(text)}
                  value={genderLot(gender)}
                  placeHolder={strings.gender}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {genderError !== "" && showErrorMessage(genderError)}
              </View>

              {/* Address */}
              <View style={{ marginTop: spacing.HEIGHT_40 }}>
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

                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {locationError !== "" && showErrorMessage(locationError)}
              </View>

              {/* Location */}
              {/* <View style={{ marginTop: spacing.HEIGHT_20 }}>
                            <CustomDropDown
                                data={registerForm?.registerFormData?.LOCATION ?? []}
                                onChangeText={(text) => onLocationClick(text)}
                                value={location}
                                placeHolder={strings.location}
                            />
                            {!registerForm.initRegisterForm && registerForm?.loggedProfile?.errorCode == '404' &&
                                this.showErrorMessage(registerForm?.loggedProfile?.message)
                            }

                            {locationError !== "" &&
                                showErrorMessage(locationError)
                            }
                        </View> */}

              {/* Country */}
              <View style={{ marginTop: spacing.HEIGHT_10 }}>
                <CustomDropDown
                  selectedValue={selectedValueCountry}
                  setValue={setValueCountry}
                  data={registerForm?.registerFormData?.COUNTRY ?? []}
                  onChangeText={(text) => {
                    onCountryClick(text);
                  }}
                  value={country}
                  placeHolder={strings.country}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {countryError !== "" && showErrorMessage(countryError)}
              </View>

              {/* Mobile Number */}
              {/* <View style={{ marginTop: spacing.HEIGHT_40 }}>
                <CustomInput
                  value={mobileNo}
                  placeHolder={strings.mobile_number}
                  caption={strings.mobile_number}
                  right={
                    <TextInput.Icon
                      onPress={clearFirstName}
                      style={{ width: 23, height: 23 }}
                      icon={require("../../Assets/icons/ic_close.png")}
                    />
                  }
                  disabled={false}
                />

                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {numberError !== "" && showErrorMessage(numberError)}
              </View> */}

              {/* Email */}
              {/* <View style={{ marginTop: spacing.HEIGHT_20 }}>
                <CustomInput
                  value={email}
                  placeHolder={strings.email}
                  caption={strings.email}
                  right={
                    <TextInput.Icon
                      onPress={clearFirstName}
                      style={{ width: 23, height: 23 }}
                      icon={require("../../Assets/icons/ic_close.png")}
                    />
                  }
                  disabled={false}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.
                  (registerForm?.loggedProfile?.message)}
                {emailError !== "" && 
                (emailError)}
              </View> */}

              <View style={{ paddingBottom: spacing.HEIGHT_50 }} />
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  caption: {
    color: theme.colors.inverseSecondary,
    fontWeight: "700",
  },
  caption_small: {
    color: theme.colors.inverseSecondary,
  },

  logo: {
    height: spacing.WIDTH_40,
    width: spacing.WIDTH_50 * 2,
  },
  orText: {
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_16,
    paddingHorizontal: spacing.WIDTH_7,
  },
  alreadyAccount: {
    marginTop: spacing.HEIGHT_30,
    fontWeight: "400",
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  loginText: {
    marginTop: spacing.HEIGHT_6,
    fontWeight: "500",
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  checkBox: {
    height: spacing.WIDTH_20,
    width: spacing.WIDTH_20,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
  },
  textLocation: {
    marginTop: spacing.HEIGHT_10,
    borderBottomWidth: 1,
    borderBottomColor: color.INPUT_TEXT_BORDER,
    flexDirection: "row",
  },
  placeHolderText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
  },
});

export default EditProfile;
