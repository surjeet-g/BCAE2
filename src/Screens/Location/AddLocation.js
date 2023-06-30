import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Geocoder from "react-native-geocoder";
import { TextInput, useTheme } from "react-native-paper";

import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE
} from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { addNewLocations } from "../../Redux/SavedLocationDispatcher";
import { color, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";

// import Modal from "react-native-modal";
import RNLocation from "react-native-location";

import get from "lodash.get";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { CustomDropDownSearch as CustomDropDownFullWidth } from "../../Components/CustomDropDownSearch";
import { CustomInput } from "../../Components/CustomInput";
import { FooterModel } from "../../Components/FooterModel";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { countryCodes } from "../../Components/react-native-country-codes-picker/constants/countryCodes";
import { StickyFooter } from "../../Components/StickyFooter";
import {
  getMasterData,
  MASTER_DATA_CONSTANT
} from "../../Redux/masterDataDispatcher";
import { fetchRegisterFormData } from "../../Redux/RegisterDispatcher";
const { height } = Dimensions.get("screen");

const AddLocation = ({ route, navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  const [activeDropDown, setActiveDropDown] = useState("district");

  let savedLocation = useSelector((state) => state.savedLocations);

  let savedLocationWithoutAuth = useSelector((state) => state.registerForm);
  const dispatch = useDispatch([addNewLocations, getMasterData]);
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
  const [searchPostalCode, setSerachPostalCode] = useState("");
  const [loader, setLoader] = useState(false);
  const [suggestPostCode, setSuggestPostalCode] = useState("");
  const [isPostalCodeModal, setPostalModalCode] = useState(false);
  const [searchPostal, setSearchPostal] = useState("");
  const [locModalNaviFrom, setAddNaviFrom] = useState("manual");
  const mapRef = useRef(null);
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;

  let location;
  const [initAddLocation, setInitAddLocation] = useState(false);

  // const { customerId,
  //   fromPage,
  //   excludingSavedAddress = [],
  //   includingSavedAddress = [], isEditAddress } = { isEditAddress: false, customerId: 123132, fromPage: false, excludingSavedAddress: [], includingSavedAddress };

  const {
    fromPage,
    excludingSavedAddress = [],
    includingSavedAddress = [],
    isEditAddress = false,
  } = route.params;

  if (fromPage === "Register") {
    savedLocation = savedLocationWithoutAuth;
  }

  const [selectedValueDist, setValueDist] = useState("");
  const [selectedValueState, setValueState] = useState("");

  const [selectedValueCountry, setValueCounty] = useState("");

  const [selectedValueAddr, setValueSelAddr] = useState("");
  const [selectedValueKampong, setValueKampong] = useState("");
  const [selectedValuePostcode, setValuePostcode] = useState("");

  const [distName, setDistName] = useState("");
  const [stateName, setStateName] = useState("");

  const [countyName, setCountryName] = useState("");

  const [kampongName, setKampongName] = useState("");
  const [postcode, setPostcodeName] = useState("");
  const [streetText, setStreetText] = useState("");
  const [buildNameText, setbuildNameText] = useState("");
  const [addreType, setAddrType] = useState("");
  const [hno, setHno] = useState("");
  const hideAddLocationModal = () => setAddLocationModalVisible(false);
  const showAddLocationModal = () => setAddLocationModalVisible(true);

  const onClickedSaveLocationButton = () => {
    // isAddLocationModalVisible
    setPostalModalCode(!isPostalCodeModal);
    if (geoAddress != "") {
      setValueCounty("");
      setValueState("");
      // showAddLocationModal();
      setValueDist("");
      setDistName("");
      setStateName("");
      setCountryName("");
      setbuildNameText("");
      setAddrType("");
      setValueSelAddr("");
      setValueKampong("");
      setKampongName("");
      setValuePostcode("");
      setPostcodeName("");
      setStreetText("");
      setHno("");
      setSearchPostal("");
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
          street: streetText,
          state: stateName,
          district: distName,
          country: countyName,
          longitude: currentLongitude,
          latitude: currentLatitude,
          postCode: postcode,
          hno: hno,
          city: kampongName,
          buildingName: buildNameText,
          dialPick,
          addressType: addreType?.code,
        });

        navigation.goBack();
      } else {
        let addressParams = {
          address: {
            isPrimary: false,
            addressType: addreType?.code,
            address1: `${hno},${buildNameText}`,
            address2: `${distName},${stateName}`,
            address3: `${countyName},${postcode}`,
            addrZone: countyName,
            city: kampongName,
            district: distName,
            state: stateName,
            postcode: postcode,
            country: countyName,
            longitude: currentLongitude.toString(),
            latitude: currentLatitude.toString(),
          },
        };

        // edit address
        console.log("addressParams", addressParams)
        if (!isEditAddress) {
          if (isCurrentLocation) {
            await addSavedLocation(addressParams);
          } else {
            await addSavedLocation(addressParams);
          }
        } else {
          addressParams.address.addressNo = includingSavedAddress[0].addressNo;
          addressParams.address.isPrimary = includingSavedAddress[0].isPrimary;
          await addSavedLocation(addressParams);
        }
        console.log("hiting", navigation)
        //alert(JSON.stringify(savedLocation.savedLocationData))
        // setTimeout(() => {
        //   if(savedLocation.savedLocationData.data.message == 'Successfully Created Customer Favourite Address'){
        // hideAddLocationModal();
        navigation.goBack();
        //}
        // }, 1000);
      }
      // } else {
      //   Alert.alert(strings.attention, strings.please_enter_title, [
      //     { text: strings.ok, onPress: () => {} },
      //   ]);
      // }
    }
  };

  const addSavedLocation = async (addressparams) => {
    await dispatch(addNewLocations(addressparams, navigation));
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
        setSuggestPostalCode(res["0"]?.postalCode);
        // setCountry(res["0"]?.country);

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
  const getAddressForCustomDropDown = (adrs) => {
    const data = adrs.map((item) => {
      return {
        code: JSON.stringify(item),
        description: `${item.state},${item.region},${item.country},${item.district}`,
      };
    });
    return data;
  };
  const getUniqueDistricts = () => {
    let uniqueDistrictKey = [];

    let uniqueDistrictData = [];
    if (savedLocation?.addressLoopupData?.length > 0) {
      savedLocation?.addressLoopupData?.map((item) => {
        if (!(uniqueDistrictKey.indexOf(item.district) > -1)) {
          if (item.state == stateName) {
            uniqueDistrictKey.push(item.district);
          }
        }
      });

      uniqueDistrictKey?.map((item) => {
        uniqueDistrictData.push({ description: item, id: item });
      });
    }

    return uniqueDistrictData;
  };

  const getUniqueState = () => {
    let uniqueDistrictKey = [];

    let uniqueDistrictData = [];
    if (savedLocation?.addressLoopupData?.length > 0) {
      savedLocation?.addressLoopupData?.map((item) => {
        if (!(uniqueDistrictKey.indexOf(item.state) > -1)) {
          uniqueDistrictKey.push(item.state);
        }
      });

      uniqueDistrictKey?.map((item) => {
        uniqueDistrictData.push({ description: item, id: item });
      });
    }

    return uniqueDistrictData;
  };
  const getAddresType = () => {
    const addressTypeList = get(
      masterReducer,
      "masterdataData.ADDRESS_TYPE",
      []
    );

    let excludeAddressType = [];
    let includeAddressTypes = [];
    if (excludingSavedAddress.length != 0) {
      excludeAddressType = excludingSavedAddress.map(
        (addr) => addr.addressType
      );
    }
    if (isEditAddress && includingSavedAddress.length != 0) {
      includeAddressTypes = includingSavedAddress.map(
        (addr) => addr.addressType
      );
    }
    console.log("from getadd", includeAddressTypes);
    let result = [];

    if (addressTypeList?.length > 0) {
      addressTypeList.map((item) => {
        if (!isEditAddress && !excludeAddressType.includes(item.code)) {
          result.push({ description: item.description, code: item.code });
        }
        if (isEditAddress && includeAddressTypes.includes(item.code)) {
          result.push({ description: item.description, code: item.code });
        }
      });
    }
    return result;
  };
  const dispatch1 = useDispatch([fetchRegisterFormData]);
  useEffect(() => {
    // dispatch1(fetchRegisterFormData());
    const { COUNTRY, ADDRESS_TYPE } = MASTER_DATA_CONSTANT;
    dispatch(getMasterData(`${COUNTRY},${ADDRESS_TYPE}`));
    animateToCurrentLocation();
  }, [locationGet]);

  useEffect(() => {
    if (Platform.OS === "android") {
      CheckForGPSEnablement();
    }

    permissionHandle();
  }, [location]);

  useEffect(() => {
    getUniqueDistricts();
  }, []);
  const masterReducer = useSelector((state) => state.masterdata);

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

  const onCountyClick = (text) => {
    setCountryName(text.code);
    setStateName("");
    setValueState("");
    setDistName("");
    setValueDist("");
    setValueKampong("");
    setKampongName("");
    setValuePostcode("");
    setPostcodeName("");
  };

  const onStateClick = (text) => {
    setStateName(text.description);
    setDistName("");
    setValueDist("");
    setValueKampong("");
    setKampongName("");
    setValuePostcode("");
    setPostcodeName("");
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

  const getCityByDistrict = () => {
    // let finalKampongData = [{ description: "sdfsdf", id: 12 }];
    let finalKampongData = [];
    let uniqueDistrictKey = [];

    let uniqueDistrictData = [];
    //("entering inside");
    if (savedLocation?.addressLoopupData?.length > 0 && distName != "") {
      // console.warn("entering inside");
      const addrByDistrict = savedLocation?.addressLoopupData.filter(
        (addr) => addr.district == distName
      );
      //console.warn("point", addrByDistrict);
      if (addrByDistrict.length != 0) {
        // console.log("point 1", addrByDistrict);
        addrByDistrict.map((item) => {
          if (!(uniqueDistrictKey.indexOf(item.city) > -1)) {
            uniqueDistrictKey.push(item.city);
          }
        });

        // console.log("point 2", uniqueDistrictKey);
        finalKampongData = uniqueDistrictKey.map((item) => {
          return { description: item, id: item };
        });
        // console.log("point 3", finalKampongData);
      }
    }
    // console.warn("", savedLocation?.addressLoopupData);

    return finalKampongData;
  };

  const getPostCodeByKampong = () => {
    // let finalKampongData = [{ description: "sdfsdf", id: 12 }];
    let finalPostcodeData = [];

    if (savedLocation?.addressLoopupData?.length > 0 && kampongName != "") {
      const addrByDistrict = savedLocation?.addressLoopupData.filter(
        (addr) => addr.city == kampongName
      );

      finalPostcodeData = addrByDistrict.map((item) => {
        return { description: item.postCode, id: item.postCode };
      });
    }

    return finalPostcodeData;
  };
  const getCountryList = () => {
    const countryGetList = get(masterReducer, "masterdataData.COUNTRY", []);
    if (countryGetList.length == 0) return [];
    return countryGetList.map((item) => ({
      code: item?.code,
      description: item.description,
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
      {loader && <LoadingAnimation title="while we are fetching country" />}
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

      <View></View>

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
      <StickyFooter isSplash={true} isAddlocation={true}>
        {/* <View
          style={[
            { marginBottom: 40, paddingStart: 10, paddingEnd: 10 },
            styles.bottomView,
          ]}
        > */}
        <CustomButton
          loading={false}
          label={strings.save_location}
          isDisabled={false}
          onPress={() => onClickedSaveLocationButton()}
        />
        {/* </View> */}
      </StickyFooter>

      <FooterModel
        open={isPostalCodeModal}
        setOpen={setPostalModalCode}
        title={`Enter address details`}
      >
        <View style={{ paddingHorizontal: "4%" }}>
          {suggestPostCode && (
            <Text style={{ marginLeft: 5 }}>
              Is this is your postal code : {suggestPostCode}?
            </Text>
          )}
          <CustomInput
            value={searchPostal}
            caption={strings.postCode}
            placeHolder={strings.postCode}
            onChangeText={setSearchPostal}
          />
          <ClearSpace size={2} />
          <Pressable
            style={{ paddingVertical: 5 }}
            onPress={() => {
              setAddNaviFrom("manual");
              setAddLocationModalVisible(true);
            }}
          >
            <Text style={{ color: "#0061ff", marginLeft: 5 }}>
              {"Don't you know postal code ?"}
            </Text>
          </Pressable>
          <CustomButton
            loading={false}
            label={strings.search}
            isDisabled={searchPostal == ""}
            onPress={() => {
              setLoader(true);
              dispatch1(
                fetchRegisterFormData(
                  {
                    type: "POSTAL_CODE",
                    search: searchPostal,
                  },
                  (addressRes = []) => {
                    setLoader(false);
                    setPostalModalCode(false);
                    setAddLocationModalVisible(true);

                    if (addressRes.length == 0) return null;
                    setAddNaviFrom("auto");
                    if (addressRes.length == 1) {
                      console.log("address response data", addressRes[0]);
                      setValueState(addressRes[0]?.state);
                      setStateName(addressRes[0]?.state);
                      setCountryName(addressRes[0]?.country);
                      setValueState(addressRes[0]?.state);
                      setStateName(addressRes[0]?.state);

                      setValueDist(addressRes[0]?.district);
                      setDistName(addressRes[0]?.district);

                      setKampongName(addressRes[0]?.city);
                      setValueKampong(addressRes[0]?.city);

                      setPostcodeName(addressRes[0]?.postCode);
                      setValuePostcode(addressRes[0]?.postCode);
                    }
                    else if (addressRes.length > 1) {
                      setValueState(addressRes[0]?.state);
                      setStateName(addressRes[0]?.state);

                      setCountryName(addressRes[0]?.country);
                      setValueState(addressRes[0]?.state);
                      setStateName(addressRes[0]?.state);

                      setValueDist(addressRes[0]?.district);
                      setDistName(addressRes[0]?.district);

                      //setKampongName(addressRes[0]?.city);
                      //setValueKampong(addressRes[0]?.city);

                      setPostcodeName(addressRes[0]?.postCode);
                      setValuePostcode(addressRes[0]?.postCode);
                    }
                  }
                )
              );
            }}
          />
        </View>
      </FooterModel>
      <FooterModel
        open={isAddLocationModalVisible}
        setOpen={setAddLocationModalVisible}
        title={`Enter address details`}
      >
        <View style={{ marginBottom: 30 }}>
          <View
            style={{
              // height: height * 0.65,
              backgroundColor: color.WHITE,
              borderRadius: 10,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}
          >
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
            <View style={{ marginTop: 5, alignItems: "center" }}>
              <Text>{strings.additional_address_info}</Text>
            </View>

            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                zIndex: 4,
                elevation: 12,
              }}
            >
              <CustomDropDownFullWidth
                setDropDownEnable={() => setActiveDropDown("setAddrType")}
                isDisable={true}
                selectedValue={selectedValueAddr}
                setValue={(add) => {
                  console.log(">>", add);
                  setValueSelAddr(add);
                }}
                data={
                  getAddresType() ?? []
                  // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                }
                onChangeText={(text) => {
                  console.log(">>", text);
                  setAddrType(text);
                }}
                value={addreType}
                isDisableDropDown={activeDropDown != "setAddrType"}
                placeHolder={strings.address_type + "*"}
              />
            </View>

            <View>
              {/*point select postal code  */}
              {/* <View style={{ marginTop: 10 }}>
                <CustomInput
                  value={searchPostalCode}
                  caption={"Enter post code"}
                  placeHolder={"Enter post code"}
                  onChangeText={(text) => {
                    setSerachPostalCode(text)
                  }}
                  right={
                    (<TextInput.Icon
                      onPress={() => {
                        dispatch1(fetchRegisterFormData(searchPostalCode));
                      }}
                      style={{ width: 23, height: 23 }}
                      icon="eature-search-outline"
                    />
                    )

                  }
                />
              </View> */}

              {/* {savedLocation?.addressLoopupData?.length > 0 &&
                <View style={{ marginTop: 12, zIndex: 4, elevation: 12 }}>
                  <CustomDropDownFullWidth
                    setDropDownEnable={() => setActiveDropDown("district")}
                    isDisable={true}
                    selectedValue={selectedValueDist}
                    setValue={setValueDist}
                    data={
                      getAddressForCustomDropDown(savedLocation?.addressLoopupData) ?? []
                      // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                    }
                    onChangeText={(text) => {

                      const addressSel = JSON.parse(text.code)
                      console.log('address', addressSel)
                      setDistName(addressSel.district)
                      setValueDist(addressSel.district)
                      setStreetText(addressSel?.region || "")
                      setCountry(addressSel.country)
                      setValueKampong(addressSel.city)
                      setKampongName(addressSel.city)
                      setPostcodeName(addressSel.postCode)
                      setValuePostcode(addressSel.postCode)

                    }
                    }
                    value={distName}
                    isDisableDropDown={activeDropDown != "district"}
                    placeHolder={"Choose address"}
                  />
                </View>
              } */}

              <View style={{ marginTop: 10 }}>
                <CustomInput
                  value={hno}
                  caption={strings.hno}
                  placeHolder={strings.hno}
                  onChangeText={setHno}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <CustomInput
                  onChangeText={setbuildNameText}
                  value={buildNameText}
                  caption={strings.building_name}
                  placeHolder={strings.building_name}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <CustomInput
                  onChangeText={setStreetText}
                  value={streetText}
                  caption={strings.street}
                  placeHolder={strings.street}
                />
              </View>
              {locModalNaviFrom == "manual" && (
                <View style={{ marginTop: 12, zIndex: 4, elevation: 12 }}>
                  <CustomDropDownFullWidth
                    searchEnable={true}
                    setDropDownEnable={() => setActiveDropDown("country")}
                    isDisable={true}
                    selectedValue={selectedValueCountry}
                    setValue={setValueCounty}
                    data={
                      getCountryList() ?? []
                      // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                    }
                    onChangeText={(text) => {
                      console.log(">>", text);
                      onCountyClick(text);
                      setLoader(true);
                      dispatch1(
                        fetchRegisterFormData(
                          {
                            type: "COUNTRY",
                            search: text?.code,
                          },
                          () => setLoader(false)
                        )
                      );
                    }}
                    value={countyName}
                    isDisableDropDown={activeDropDown != "country"}
                    placeHolder={strings.country + "*"}
                    caption={strings.country + "*"}
                  />
                </View>
              )}
              <View style={{ marginTop: 12, zIndex: 4, elevation: 12 }}>
                <CustomDropDownFullWidth
                  setDropDownEnable={() => setActiveDropDown("state")}
                  isDisable={true}
                  selectedValue={selectedValueState}
                  setValue={setValueState}
                  data={
                    getUniqueState() ?? []
                    // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                  }
                  onChangeText={(text) => onStateClick(text)}
                  value={stateName}
                  isDisableDropDown={activeDropDown != "state"}
                  placeHolder={"State" + "*"}
                  caption={"State" + "*"}
                />
              </View>
              <View style={{ marginTop: 12, zIndex: 4, elevation: 12 }}>
                <CustomDropDownFullWidth
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
                  caption={strings.district + "*"}
                />
              </View>

              <View style={{ marginTop: 12, zIndex: 3, elevation: 6 }}>
                <CustomDropDownFullWidth
                  setDropDownEnable={() => setActiveDropDown("kampong")}
                  isDisableDropDown={activeDropDown != "kampong"}
                  selectedValue={selectedValueKampong}
                  setValue={setValueKampong}
                  data={
                    getCityByDistrict() ?? []
                    // enquilryDetailsData?.DetailsDataData?.data?.PROD_TYPE ?? []
                  }
                  onChangeText={(text) => onKampongClick(text)}
                  value={kampongName}
                  placeHolder={"City *"}
                  caption={"City *"}
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
                <CustomDropDownFullWidth
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
                  caption={strings.postCode + "*"}
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
                <CustomButton
                  isDisabled={
                    distName === "" ||
                    kampongName === "" ||
                    postcode === "" ||
                    streetText === ""
                  }
                  loading={initAddLocation}
                  label={strings.ok}
                  onPress={onClickedAddLocationTitleButton}
                />
              </View>
            </View>
          </View>
        </View>
      </FooterModel>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
    // marginTop: 60,
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
    marginTop: 20,
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
