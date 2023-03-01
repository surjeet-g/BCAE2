import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableHighlight,
  Alert,
} from "react-native";
import Geocoder from "react-native-geocoder";
import { useTheme } from "react-native-paper";

import { strings } from "../../Utilities/Language";
import { useDispatch, useSelector } from "react-redux";
import { addNewLocations } from "../../Redux/SavedLocationDispatcher";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  validateEmail,
  validatePassword,
  Platform,
  TDLog,
} from "../../Utilities/Constants/Constant";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
} from "react-native-maps";

// import Modal from "react-native-modal";
import Header from "../TabScreens/Component/Header";
import RNLocation from "react-native-location";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";

import { Button } from "react-native-paper";
import { CustomDropDownAddress as CustomDropDown } from "../../Components/CustomDropDownAddress";
const { height } = Dimensions.get("screen");
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import get from "lodash.get";
import { CustomButton } from "../../Components/CustomButton";
import { countryCodes } from "../../Components/react-native-country-codes-picker/constants/countryCodes";

const AddLocation = ({ route, navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  const [activeDropDown, setActiveDropDown] = useState("district");

  let savedLocation = useSelector((state) => state.savedLocations);

  let savedLocationWithoutAuth = useSelector((state) => state.registerForm);
  const dispatch = useDispatch([addNewLocations]);
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const [isCurrentLocation, setIsCurrentLocation] = useState(true);
  const [addlocationTitle, setAddLocationTitle] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isAddLocationModalVisible, setAddLocationModalVisible] =
    useState(false);
  const [markerSelected, setMarkerSelected] = useState(false);
  const [currentLatitude, setCurrentLatitude] = useState(0.0);
  const [currentLongitude, setCurrentLongitude] = useState(0.0);
  const [mapOnLatitude, setMapOnLatitude] = useState(0.0);
  const [mapOnLongitude, setMapOnLongitude] = useState(0.0);
  const [geoAddress, setGeoAddress] = useState("");
  const [dialPick, setDialPick] = useState("+673");
  const [locationGet, setCurrentLocationget] = useState(false);
  const [country, setCountry] = useState("");
  const mapRef = useRef(null);
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;

  let location;
  const [initAddLocation, setInitAddLocation] = useState(false);

  const { customerId, fromPage } = route.params;
  // const { customerId, fromPage } = { customerId: 123132, fromPage: false };
  if (fromPage === "Register") {
    savedLocation = savedLocationWithoutAuth;
  }

  const [selectedValueDist, setValueDist] = useState("");
  const [selectedValueAddr, setValueSelAddr] = useState("");
  const [selectedValueKampong, setValueKampong] = useState("");
  const [selectedValuePostcode, setValuePostcode] = useState("");

  const [distName, setDistName] = useState("");
  const [kampongName, setKampongName] = useState("");
  const [postcode, setPostcodeName] = useState("");
  const [simpangText, setSimpangText] = useState("");
  const [addreType, setAddrType] = useState("");

  const hideAddLocationModal = () => setAddLocationModalVisible(false);
  const showAddLocationModal = () => setAddLocationModalVisible(true);

  const onClickedSaveLocationButton = () => {
    // isAddLocationModalVisible
    setAddLocationModalVisible(!isAddLocationModalVisible);
    if (geoAddress != "") {
      showAddLocationModal();
      setValueDist("");
      setDistName("");
      setAddrType("");
      setValueSelAddr("");
      setValueKampong("");
      setKampongName("");
      setValuePostcode("");
      setPostcodeName("");
      setSimpangText("");
    }
  };

  const onClickedAddLocationTitleButton = async () => {
    if (!initAddLocation) {
      setInitAddLocation(true);
      // if (addlocationTitle != "") {
      if (fromPage === "Register") {
        route.params.onPlaceChosen({
          geoAddress: geoAddress,
          currentLatitude: currentLatitude,
          currentLongitude: currentLongitude,
          street: simpangText,
          state: kampongName,
          district: distName,
          country: "Brunei Darussalam",
          longitude: currentLongitude,
          latitude: currentLatitude,
          postCode: postcode,
          dialPick,
          addressType: addreType,
        });

        navigation.goBack();
      } else {
        const addressParams = {
          address: {
            isPrimary: false,
            addressType: addreType,
            address1: simpangText,
            address2: kampongName,
            address3: `${country},${postcode}`,
            addrZone: country,
            city: simpangText,
            district: simpangText,
            state: kampongName,
            postcode: postcode,
            country: country,
            longitude: currentLongitude.toString(),
            latitude: currentLatitude.toString(),
          },
        };
        // const addressParams = {
        //   address: {
        //     addrZone: "kerala",
        //     isPrimary: false,
        //     addressType: "DIFF",
        //     address1: "sdsd",
        //     address2: "sdsd,Kampong Bang Nukat",
        //     address3: ",TG2343",
        //     city: "sfs",
        //     district: "sfs",
        //     state: "Kampong Bang Nukat",
        //     postcode: "TG2343",
        //     country: "dsfsd",
        //     longitude: (114.7214024043128).toString(),
        //     latitude: (4.543040540540541).toString(),
        //   },
        // };
        console.log("hititng", addressParams);
        if (isCurrentLocation) {
          await addSavedLocation(addressParams);
        } else {
          await addSavedLocation(addressParams);
        }

        //alert(JSON.stringify(savedLocation.savedLocationData))
        setTimeout(() => {
          //   if(savedLocation.savedLocationData.data.message == 'Successfully Created Customer Favourite Address'){
          hideAddLocationModal();
          navigation.goBack();
          //}
        }, 1000);
      }
      // } else {
      //   Alert.alert(strings.attention, strings.please_enter_title, [
      //     { text: strings.ok, onPress: () => {} },
      //   ]);
      // }
    }
  };

  const addSavedLocation = async (addressparams) => {
    await dispatch(addNewLocations(addressparams));
    setInitAddLocation(false);
  };

  const onClickLocationOnMap = () => {
    setIsCurrentLocation(false);
    setMapOnLatitude(currentLatitude);
    setMapOnLongitude(currentLongitude);
    animateToCurrentLocation();
  };

  const getLocationAddress = (latitude, longitude) => {
    const obj = {
      lat: latitude,
      lng: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };

    Geocoder.geocodePosition(obj)
      .then((res) => {
        console.log(res);

        const myAddress = res["0"]?.formattedAddress;
        const countryCode = res["0"]?.countryCode;
        setCountry(res["0"]?.country);

        if (countryCode != "") {
          setDialPick(
            get(
              countryCodes.filter((a) => a.code == countryCode),
              "[0].dial_code"
            )
          );
        }
        console.log("res====>", myAddress, "----", countryCode);
        setGeoAddress(myAddress);
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };

  const permissionHandle = async () => {
    try {
      let permission = await RNLocation.checkPermission({
        ios: "whenInUse", // or 'always'
        android: {
          detail: "coarse", // or 'fine'
        },
      });

      if (!permission) {
        permission = await RNLocation.requestPermission({
          ios: "whenInUse",
          android: {
            detail: "coarse",
            rationale: {
              title: "We need to access your location",
              message: "We use your location to show where you are on the map",
              buttonPositive: "OK",
              buttonNegative: "Cancel",
            },
          },
        });
        console.log(permission);

        RNLocation.getLatestLocation({ timeout: 60000 }).then(
          (locationCurrent) => {
            // Use the location here
            location = locationCurrent;
            setCurrentLatitude(locationCurrent.latitude + 0.0025);
            setCurrentLongitude(locationCurrent.longitude + 0.001);
            setCurrentLocationget(true);
            console.log(
              "locationCurrent===>1==>",
              locationCurrent,
              locationCurrent.longitude,
              locationCurrent.latitude,
              locationCurrent.timestamp
            );
          }
        );
      } else {
        RNLocation.getLatestLocation({ timeout: 60000 }).then(
          (locationCurrent) => {
            // Use the location here
            location = locationCurrent;
            setCurrentLatitude(locationCurrent.latitude + 0.0025);
            setCurrentLongitude(locationCurrent.longitude + 0.001);
            setCurrentLocationget(true);
            console.log(
              "locationCurrent===>2==>",
              locationCurrent,
              locationCurrent.longitude,
              locationCurrent.latitude,
              locationCurrent.timestamp
            );
          }
        );
      }
    } catch (error) {
      console.log(
        "There has been a problem with RNLocation fetch operation: " +
          error.message
      );
    }
  };

  const getUniqueDistricts = () => {
    let uniqueDistrictKey = [];

    let uniqueDistrictData = [];
    if (savedLocation?.addressLoopupData?.length > 0) {
      savedLocation?.addressLoopupData?.map((item) => {
        if (!(uniqueDistrictKey.indexOf(item.district) > -1)) {
          uniqueDistrictKey.push(item.district);
        }
      });

      uniqueDistrictKey?.map((item) => {
        uniqueDistrictData.push({ description: item, id: item });
      });
    }

    return uniqueDistrictData;
  };
  const getAddresType = () => {
    let result = [];
    if (savedLocationWithoutAuth?.registerFormData?.ADDRESS_TYPE?.length > 0) {
      savedLocationWithoutAuth?.registerFormData?.ADDRESS_TYPE.map((item) => {
        result.push({ description: item.description, id: item.code });
      });
    }
    return result;
  };

  useEffect(() => {
    animateToCurrentLocation();
  }, [locationGet]);

  useEffect(() => {
    permissionHandle();
  }, [location]);

  useEffect(() => {
    getUniqueDistricts();
  }, []);

  const CheckForGPSEnablement = () => {
    return new Promise((resolve) => {
      RNLocation.configure({
        distanceFilter: 100, // Meters
        desiredAccuracy: {
          ios: "best",
          android: "balancedPowerAccuracy",
        },
        // Android only
        androidProvider: "auto",
        interval: 5000, // Milliseconds
        fastestInterval: 10000, // Milliseconds
        maxWaitTime: 5000, // Milliseconds
        // iOS Only
        activityType: "other",
        allowsBackgroundLocationUpdates: false,
        headingFilter: 1, // Degrees
        headingOrientation: "portrait",
        pausesLocationUpdatesAutomatically: false,
        showsBackgroundLocationIndicator: false,
      })
        .then((x) => {
          console.log({ x });
          resolve(true);
        })
        .catch((err) => {
          console.log({ err });
          resolve(false);
        });
    });
  };

  const onDistrictClick = (text) => {
    setDistName(text.description);
    setValueKampong("");
    setKampongName("");
    setValuePostcode("");
    setPostcodeName("");
  };

  const onKampongClick = (text) => {
    setKampongName(text?.description);
    setValuePostcode("");
    setPostcodeName("");
  };
  const onPostcodeClick = (text) => {
    setPostcodeName(text?.description);
  };
  const onMarkerPressed = () => {
    setMarkerSelected(true);
  };

  const animateToCurrentLocation = () => {
    console.log(
      "locationCurrent===>1==>" + currentLatitude + "===>" + currentLongitude
    );
    setIsCurrentLocation(true);
    mapRef.current.animateToRegion(
      {
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      1000
    );
    getLocationAddress(currentLatitude, currentLongitude);
  };

  const getKampongByDistrict = () => {
    // let finalKampongData = [{ description: "sdfsdf", id: 12 }];
    let finalKampongData = [];
    //("entering inside");
    if (savedLocation?.addressLoopupData?.length > 0 && distName != "") {
      // console.warn("entering inside");
      const addrByDistrict = savedLocation?.addressLoopupData.filter(
        (addr) => addr.district == distName
      );
      //console.warn("point", addrByDistrict);
      finalKampongData = addrByDistrict.map((item) => {
        return { description: item.kampong, id: item.kampong };
      });
    }
    // console.warn("", savedLocation?.addressLoopupData);

    return finalKampongData;
  };

  const getPostCodeByKampong = () => {
    // let finalKampongData = [{ description: "sdfsdf", id: 12 }];
    let finalPostcodeData = [];

    if (savedLocation?.addressLoopupData?.length > 0 && kampongName != "") {
      const addrByDistrict = savedLocation?.addressLoopupData.filter(
        (addr) => addr.kampong == kampongName
      );

      finalPostcodeData = addrByDistrict.map((item) => {
        return { description: item.postCode, id: item.postCode };
      });
    }

    return finalPostcodeData;
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        onMapReady={animateToCurrentLocation}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        onPress={(e) => {
          console.log(e.nativeEvent.coordinate);
          setMapOnLatitude(e.nativeEvent.coordinate.latitude);
          setMapOnLongitude(e.nativeEvent.coordinate.longitude);
          getLocationAddress(
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude
          );
        }}
      >
        <Marker
          coordinate={{
            latitude: mapOnLatitude,
            longitude: mapOnLongitude,
          }}
          title={"Location on map"}
        >
          <View>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../Assets/icons/ic_overlay_highlighted.png")}
            />
          </View>

          <Callout style={styles.ticketItem}>
            <Text style={[{ color: colors.primary }, styles.description]}>
              {geoAddress}
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{
            latitude: currentLatitude,
            longitude: currentLongitude,
          }}
          //coordinate={{latitude: 4.931796, longitude: 114.836504}}
          title={geoAddress}
        >
          <View>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../Assets/icons/ic_gps.png")}
            />
          </View>

          <Callout style={styles.ticketItem}>
            <Text style={[styles.textBase, styles.description]}>
              {geoAddress}
            </Text>
          </Callout>
        </Marker>
        <Circle
          center={{ latitude: currentLatitude, longitude: currentLongitude }}
          radius={200}
          strokeColor="#4F6D7A"
          strokeWidth={2}
        />
      </MapView>

      <View>
        {/* <Header
          navigation={navigation}
          Text={""}
          backIconVisibility={true}
          transparent={true}
          bcae={false}
          rightIconsVisibility={fromPage !== "Register"}
        ></Header> */}
      </View>

      <View
        style={{
          ...styles.inputBox,
          ...{ borderRadius: roundness + 5 },
        }}
      >
        <TextInput
          mode="flat"
          style={{
            height: 40,
            padding: 0,
            margin: 0,
            borderRadius: roundness,
            color: colors.onSurfaceVariant,
          }}
          // style={styles.searchInput}
          //onChangeText={setSearchText}
          value={geoAddress}
          placeholder="Search"
          keyboardType="default"
          inlineImageLeft="Search"
        />
      </View>

      <View
        style={[
          { height: 55, marginBottom: 100, paddingStart: 10, paddingEnd: 10 },
          styles.bottomView,
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 10,
              marginEnd: 5,
              marginStart: 5,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => animateToCurrentLocation()}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 4 }}>
                  <Text style={[styles.loconMap]}>
                    {strings.current_location}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require("../../Assets/icons/ic_gps.png")}
                    style={styles.icon}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: 10,
              marginEnd: 5,
              marginStart: 5,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => onClickLocationOnMap()}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 4 }}>
                  <Text style={[styles.loconMap]}>
                    {strings.location_on_map}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require("../../Assets/icons/ic_overlay_normal.png")}
                    style={styles.icon}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[
          { height: 55, marginBottom: 40, paddingStart: 10, paddingEnd: 10 },
          styles.bottomView,
        ]}
      >
        <CustomButton
          style={styles.savelocBtn}
          label={strings.save_location}
          onPress={() => onClickedSaveLocationButton()}
        />
      </View>
      {isAddLocationModalVisible && (
        <ScrollView style={{ position: "absolute", top: "-3%", left: "5%" }}>
          <View style={styles.addLocationContainer}>
            <View
              style={{
                // height: height * 0.65,
                backgroundColor: color.WHITE,
                borderRadius: 10,
                padding: 20,
              }}
            >
              <View
                style={{
                  padding: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    marginLeft: "8%",
                    color: color.BLACK,
                    fontSize: 14,
                    color: color.BCAE_PRIMARY,
                    // alignItems: "center",
                  }}
                >
                  {fromPage === "Register" || fromPage === "EditProfile"
                    ? strings.select_location_confirmation
                    : strings.save_location_confirmation}
                </Text>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    left: 12,
                    position: "relative",
                    marginLeft: "12%",
                    marginTop: "-10%",
                    alignItems: "flex-end",
                  }}
                  onPress={() => setAddLocationModalVisible(false)}
                >
                  <Image
                    source={require("../../Assets/icons/ic_close.png")}
                    style={{
                      resizeMode: "cover",
                      width: spacing.WIDTH_16,
                      height: spacing.WIDTH_16,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  // flex: 1,
                  // justifyContent: "center",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Text>{geoAddress}</Text>
              </View>
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Text>{strings.additional_address_info}</Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginBottom: 12,
                  zIndex: 4,
                  elevation: 12,
                }}
              >
                <CustomDropDown
                  setDropDownEnable={() => setActiveDropDown("setAddrType")}
                  isDisable={true}
                  selectedValue={selectedValueAddr}
                  setValue={setValueSelAddr}
                  data={
                    getAddresType() ?? []
                    // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                  }
                  onChangeText={(text) => {
                    setAddrType(text.description);
                  }}
                  value={addreType}
                  isDisableDropDown={activeDropDown != "setAddrType"}
                  placeHolder={strings.address_type + "*"}
                />
              </View>
              <View>
                <View style={{ marginTop: 10 }}>
                  <TextInput
                    style={styles.searchInputStreet}
                    onChangeText={setSimpangText}
                    value={simpangText}
                    placeholder={strings.simpang}
                    keyboardType="default"
                  />
                </View>

                <View style={{ marginTop: 12, zIndex: 4, elevation: 12 }}>
                  <CustomDropDown
                    setDropDownEnable={() => setActiveDropDown("district")}
                    isDisable={true}
                    selectedValue={selectedValueDist}
                    setValue={setValueDist}
                    data={
                      getUniqueDistricts() ?? []
                      // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                    }
                    onChangeText={(text) => onDistrictClick(text)}
                    value={distName}
                    isDisableDropDown={activeDropDown != "district"}
                    placeHolder={strings.district + "*"}
                  />
                </View>

                <View style={{ marginTop: 12, zIndex: 3, elevation: 6 }}>
                  <CustomDropDown
                    setDropDownEnable={() => setActiveDropDown("kampong")}
                    isDisableDropDown={activeDropDown != "kampong"}
                    selectedValue={selectedValueKampong}
                    setValue={setValueKampong}
                    data={
                      getKampongByDistrict() ?? []
                      // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                    }
                    onChangeText={(text) => onKampongClick(text)}
                    value={kampongName}
                    placeHolder={strings.kampong + "*"}
                  />
                </View>
                <View
                  style={{
                    marginTop: 12,
                    marginBottom: spacing.HEIGHT_40,
                    zIndex: 2,
                    elevation: 2,
                  }}
                >
                  <CustomDropDown
                    setDropDownEnable={() => setActiveDropDown("postCode")}
                    isDisable={false}
                    selectedValue={selectedValuePostcode}
                    isDisableDropDown={activeDropDown != "postCode"}
                    setValue={setValuePostcode}
                    data={
                      getPostCodeByKampong() ?? []

                      // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                    }
                    onChangeText={(text) => onPostcodeClick(text)}
                    value={postcode}
                    placeHolder={strings.postCode + "*"}
                  />
                </View>
                <View
                  style={{
                    // position: "absolute",
                    // bottom: -(height * 0.15),
                    maringTop: 12,
                    zIndex: 0,
                    elevation: 0,
                  }}
                >
                  {initAddLocation ? (
                    <CustomActivityIndicator
                      size={buttonSize.LARGE}
                      bgColor={color.BLACK}
                      loderColor={color.WHITE}
                    />
                  ) : (
                    <Button
                      label={strings.ok}
                      disabled={
                        distName === "" ||
                        kampongName === "" ||
                        postcode === "" ||
                        simpangText === ""
                      }
                      onPress={onClickedAddLocationTitleButton}
                    >
                      {strings.ok}
                    </Button>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  addLocationContainer: {
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    paddingBottom: 20,
    marginBottom: 0,
    alignItems: "center",
  },
  bottomView: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: -20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  ticketItem: {
    width: 270,
    padding: 10,
    marginRight: 35,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  ticketItemHeading: {
    minWidth: "95%",
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",
  },
  textBase: {
    color: color.BCAE_PRIMARY,
  },
  description: {
    fontSize: 20,
    fontWeight: "400",
  },
  ticketNo: {
    fontSize: 16,
    fontWeight: "500",
    color: "#090A0A",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#375B9E",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  box1: {
    flex: 4,
    height: 50,
  },
  box3: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 50,
  },
  box1loc: {
    flex: 1,
    height: 50,
  },
  box3add: {
    flex: 4,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 50,
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: "#7D7D7D",
  },
  searchIcon: {
    width: spacing.WIDTH_21,
    height: spacing.WIDTH_21,
  },
  rightArrow: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: -20,
  },
  savelocBtn: {
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: color.BCAE_PRIMARY,
    borderRadius: 5,
  },
  loconMapBtn: {
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: color.WHITE,
    borderRadius: 5,
  },
  saveLocText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  loconMap: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  inputBox: {
    margin: 20,
    paddingLeft: 12,
    alignItems: "stretch",
    backgroundColor: "white",
    elevation: 1,
    borderColor: "#9FA5AA",
    borderWidth: 1,
  },
  inputBoxModal: {
    margin: 10,

    marginTop: 10,
    alignItems: "stretch",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#9FA5AA",
    borderWidth: 1,
  },
  searchInput: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 3,
    color: "#9E9E9E",
    paddingLeft: "3%",
  },
  searchInputStreet: {
    height: 45,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderRadius: 3,
    borderBottomColor: color.INPUT_TEXT_BORDER,
  },
  inputBoxModal: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#9FA5AA",
    borderWidth: 1,
  },
  searchInputModal: {
    height: 45,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 3,
    color: "#9E9E9E",
  },
  searchIcon: {
    width: spacing.WIDTH_21,
    height: spacing.WIDTH_21,
    marginLeft: 5,
    marginRight: 5,
  },
});
export default AddLocation;
