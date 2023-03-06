import React, { useEffect, useState, useLayoutEffect } from "react";
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
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  spacing,
  color,
  fontSizes,
  buttonSize,
  validateNumber,
  validateEmail,
  DEFAULT_PROFILE_IMAGE,
} from "../../Utilities/Constants/Constant";

import Camara from "../../Assets/svg/camera_icon.svg";
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
import { navBar } from "../../Utilities/Style/navBar";
import get from "lodash.get";
import {
  setProfileFormField,
  setProfileReset,
} from "../../Redux/ProfileAction";
import {
  addresObjToString,
  handleMultipleContact,
} from "../../Utilities/utils";

const EditProfile = ({ navigation, props }) => {
  const { colors, fonts } = useTheme();
  let savedLocation = useSelector((state) => state.savedLocations);
  const dispatchSaveLocation = useDispatch([fetchSavedLocations]);
  const fetchSavedLocationData = () =>
    dispatchSaveLocation(fetchSavedLocations());

  const [locationdelete, setLocation] = useState("");

  const [isSaveButtonDisable, setSaveButtomEnableDisable] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [countryError, setCountryError] = useState("");
  const [locationError, setLocationError] = useState("");

  let registerForm = useSelector((state) => state.registerForm);
  const dispatch1 = useDispatch([
    fetchRegisterFormData,
    setProfileReset,
    setProfileFormField,
  ]);
  let profile = useSelector((state) => state.profile);

  const {
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    gender,
    genderError,
    idValue,
    nationality,
    location,
  } = profile.formData;

  const [street, setStreet] = useState("");
  const [state, setStateProfile] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostcode] = useState("");

  useEffect(() => {
    // dispatch1(setProfileReset());
    dispatch1(fetchRegisterFormData());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return null;
      },
    });
  }, [navigation]);

  const dispatch2 = useDispatch([fetchSavedProfileData, updateProfileData]);
  console.log("res.data.country : ", profile.savedProfileData);

  useEffect(() => {
    async function fetchMyAPI() {
      await dispatch2(fetchSavedProfileData());
    }

    fetchMyAPI();
  }, []);

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
    dispatch1(
      setProfileFormField({
        field: "firstName",
        value: textStr,
        clearError: true,
      })
    );
    buttonEnableDisable();
  };
  const clearFirstName = () => {
    dispatch1(
      setProfileFormField({ field: "firstName", value: "", clearError: true })
    );
  };

  const onLastNameChange = (textStr) => {
    dispatch1(
      setProfileFormField({
        field: "lastName",
        value: textStr,
        clearError: true,
      })
    );

    buttonEnableDisable();
  };
  const clearLastName = () => {
    dispatch1(
      setProfileFormField({ field: "lastName", value: "", clearError: true })
    );
  };

  const onGenderClick = (textStr) => {
    dispatch1(
      setProfileFormField({
        field: "gender",
        value: textStr,
        clearError: false,
      })
    );

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

  const submit = async () => {
    Keyboard.dismiss();
    if (false) {
      Alert.alert(strings.attention, strings.field_empty_alert, [
        { text: strings.ok, onPress: () => {} },
      ]);
    } else {
      // const myArray = location.split(",").reverse();

      if (firstName?.trim() === "") {
        setFirstNameError(strings.firstNameError);
      } else if (lastName?.trim() === "") {
        setLastNameError(strings.lastNameError);
      } else if (gender?.code === "") {
        setgenderError(strings.genderError);
      }
      // else if (country === "") {
      //   setCountryError(strings.countryError);
      // }
      //else if (location === "") { setLocationError(strings.locationError) }
      else {
        let registerObject = {
          details: {
            firstName: firstName,
            lastName: lastName,
            gender: gender?.code,
            idValue: idValue,
            // nationality : country
            // profilePicture: profileImageData,
            // address: {
            //   address: location,
            //   hno: "",
            //   buildingName: "",
            //   street: street,
            //   road: "",
            //   city: "",
            //   state: state,
            //   district: district,
            //   country: country,
            //   latitude: latitude,
            //   longitude: longitude,
            //   postCode: postCode,
            // },
          },
        };

        const status = await dispatch2(updateProfileData(registerObject));
        if (status) {
          await dispatch2(fetchSavedProfileData());
        }
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

  const customerPic =
    get(profile, "savedProfileData.customerPhoto", null) ??
    DEFAULT_PROFILE_IMAGE;

  const addresss = get(profile, "savedProfileData.customerAddress", []);
  console.log(">>l", addresss);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        style={{
          position: "absolute",
          zIndex: 999999999,
          elevation: 10000,
          width: 30,
          right: 10,
          top: "2%",
          ...navBar.roundIcon,
          // backgroundColor: "red",
        }}
        onPress={async () => {
          await submit();
        }}
      >
        <Icon name="content-save" size={19} color={colors.inverseSecondary} />
      </Pressable>

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
            <View style={[{ alignItems: "center" }]}>
              <ImageBackground
                source={{
                  uri: "data:image/jpeg;base64," + customerPic,
                }}
                imageStyle={{ borderRadius: 80 }}
                style={{ height: 110, width: 110 }}
              >
                <Pressable
                  onPress={changeProfileImage}
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Camara width="20" height="20" />
                </Pressable>
              </ImageBackground>

              <Text variant="bodyLarge" style={styles.caption}>
                {get(profile, "savedProfileData.customerNo", "")}
              </Text>
              <ClearSpace />
              <Text variant="bodySmall" style={styles.caption_small}>
                {get(
                  profile,
                  "savedProfileData.customerContact[0].emailId",
                  ""
                )}
              </Text>
              <ClearSpace />
              <Text variant="bodyLarge" style={styles.caption}>
                {get(
                  profile,
                  "savedProfileData.customerContact[0].mobileNo",
                  ""
                )}
              </Text>
              <ClearSpace />
            </View>
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
                  // editable={false}
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
                {/* {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)} */}
                {firstNameError && showErrorMessage(firstNameError)}
              </View>

              {/* Last Name */}
              <View style={{ marginTop: spacing.HEIGHT_5 }}>
                <CustomInput
                  // editable={false}
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
                {lastNameError && showErrorMessage(lastNameError)}
              </View>

              {/* Gender */}
              <View style={{}}>
                <CustomDropDown
                  selectedValue={get(gender, "description", "")}
                  setValue={(text) => onGenderClick(text)}
                  data={registerForm?.registerFormData?.GENDER ?? []}
                  onChangeText={(text) => onGenderClick(text)}
                  value={get(gender, "description", "")}
                  placeHolder={strings.gender}
                />
                {!registerForm.initRegisterForm &&
                  registerForm?.loggedProfile?.errorCode == "404" &&
                  this.showErrorMessage(registerForm?.loggedProfile?.message)}
                {genderError && showErrorMessage(genderError)}
              </View>

              {/* Address */}
              {addresss.length > 0 && (
                <View style={{ marginTop: spacing.HEIGHT_40 }}>
                  <CustomInput
                    multiline={true}
                    numberOfLines={2}
                    style={{
                      backgroundColor: "transparent",
                    }}
                    value={handleMultipleContact(addresss)}
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
              )}

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
              {/* <View style={{ marginTop: spacing.HEIGHT_10 }}>
                <CustomDropDown
                
                  selectedValue={nationality}
                  // setValue={setValueCountry}
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
              </View> */}

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
