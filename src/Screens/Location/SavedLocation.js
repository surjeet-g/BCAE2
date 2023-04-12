import React, { useEffect, useLayoutEffect } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import SavedLocationList from "../../Components/SavedLocationList";
import {
  deleteSavedLocation,
  fetchSavedLocations,
  setPrimaryAddress,
} from "../../Redux/SavedLocationDispatcher";
import { buttonSize, color, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
// import Header from "../TabScreens/Component/Header";
import get from "lodash.get";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { CustomActivityIndicator } from "../../Components/CustomActivityIndicator";
import {
  getMasterData,
  MASTER_DATA_CONSTANT,
} from "../../Redux/masterDataDispatcher";
import { fetchMyProfileData } from "../../Redux/ProfileDispatcher";
import { navBar } from "../../Utilities/Style/navBar";

const SavedLocation = ({ route, navigation }) => {
  const { colors, fonts, roundness } = useTheme();

  let savedLocation = useSelector((state) => state.savedLocations);

  //const { customerId } = route.params;
  // const { onPlaceChosen , fromPage  } = route.params;
  const { onPlaceChosen, fromPage } = {
    onPlaceChosen: () => {},
    fromPage: true,
  };
  let profile = useSelector((state) => state.profile);

  const dispatch2 = useDispatch([fetchMyProfileData, getMasterData]);

  const dispatch = useDispatch([
    fetchSavedLocations,
    deleteSavedLocation,
    setPrimaryAddress,
  ]);
  const { ADDRESS_TYPE } = MASTER_DATA_CONSTANT;
  useEffect(() => {
    //get master
    // dispatch2(fetchRegisterFormData());

    // dispatch2(fetchMyProfileData(navigation));
    // fetchSavedLocationData();

    const willFocusSubscription = navigation.addListener("focus", () => {
      // dispatch2(fetchRegisterFormData());
      dispatch(getMasterData(`${ADDRESS_TYPE}`));
      dispatch2(fetchMyProfileData(navigation));
    });
    return willFocusSubscription;
  }, [navigation]);

  const onClickedSaveLocationButton = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Pressable
            onPress={async () => {
              const addressCount = get(
                profile,
                "savedProfileData.customerAddress.length",
                0
              );
              if (addressCount < 3) {
                navigation.navigate("AddLocation", {
                  customerId: 33,
                  fromPage: fromPage,
                  addressLookup: [],
                  excludingSavedAddress:
                    profile.savedProfileData?.customerAddress,
                  includingSavedAddress: [],
                });
              } else {
                Alert.alert(strings.attention, strings.max_number_address, [
                  { text: strings.ok, onPress: () => {} },
                ]);
              }
            }}
            style={{ ...navBar.roundIconColored, backgroundColor: "#8FA1C4" }}
          >
            <Icon name="plus" size={25} color={"#fff"} />
          </Pressable>
        </>
      ),
    });
  }, [navigation, profile.savedProfileData]);

  //alert("SavedLocation : " + JSON.stringify(savedLocation.savedLocationData));

  const onClickedDeleteButton = (key, address) => {
    Alert.alert(
      strings.attention,
      strings.are_you_sure_delete + " \n\n" + address,
      [
        {
          text: strings.cancel,
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: strings.ok,
          onPress: async () => {
            const res = await dispatch(deleteSavedLocation(key, navigation));
            if (res) {
              dispatch2(fetchMyProfileData(navigation));
            }
          },
        },
      ]
    );
  };

  const onItemClicked = (
    key,
    address,
    latitude,
    longitude,
    street,
    state,
    district,
    postCode
  ) => {
    if (fromPage === "CreateEnquiry" || fromPage === "EditProfile") {
      route.params.onPlaceChosen({
        geoAddress: address,
        latitude: latitude,
        longitude: longitude,
        street: street,
        state: state,
        district: district,
        country: "Brunei Darussalam",
        postCode: postCode,
      });
    }
  };

  const onClickedEditButton = (key, address) => {
    Alert.alert(strings.attention, strings.confirm_edit_address, [
      {
        text: strings.cancel,
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: strings.ok,
        onPress: () => {
          const allSavedAdd = get(
            profile,
            "savedProfileData.customerAddress",
            []
          );
          if (allSavedAdd.length == 0) return null;

          const addrArray = allSavedAdd.filter((add) => add.addressNo == key);

          navigation.navigate("AddLocation", {
            customerId: 33,
            fromPage: fromPage,
            addressLookup: [],
            excludingSavedAddress: [],
            isEditAddress: true,
            includingSavedAddress: addrArray,
          });
        },
      },
    ]);
  };
  const performPrimaryAddressUpdate = () => {};

  // const onItemClicked = (item) => {
  //   Alert.alert(strings.attention, strings.confirm_primary_address, [
  //     {
  //       text: strings.cancel,
  //       onPress: () => console.log("Cancel Pressed"),
  //     },
  //     {
  //       text: strings.ok,
  //       onPress: () => {
  //         performPrimaryAddressUpdate();
  //       },
  //     },
  //   ]);
  // };

  const address = get(profile, "savedProfileData.customerAddress", []);
  const onSetPrimary = async (selectedAddressObj) => {
    if (route.params.fromPage === "CreateCustomer_2") {
      route.params.onPlaceChosen_2({
        geoAddress: address,
      });
    } else {
      try {
        Alert.alert(strings.attention, strings.confirm_primary_address, [
          {
            text: strings.cancel,
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: strings.ok,
            onPress: async () => {
              delete selectedAddressObj.status;
              const formatedData = { ...selectedAddressObj, isPrimary: true };

              dispatch(
                setPrimaryAddress(formatedData, navigation, () =>
                  dispatch2(fetchMyProfileData(navigation))
                )
              );
            },
          },
        ]);
      } catch (error) {
        console.log(">>", error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {savedLocation.initSavedLocation &&
          !savedLocation?.savedLocationError && (
            <View style={{ alignItems: "center" }}>
              <CustomActivityIndicator
                size={buttonSize.LARGE}
                //bgColor={color.WHITE}
                topMargin={150}
                loderColor={color.BCAE_PRIMARY}
              />
              <Text style={styles.emptyList}>{strings.please_wait}</Text>
            </View>
          )}

        {address.length != 0 ? (
          <View
            style={{ backgroundColor: "white", margin: 10, borderRadius: 3 }}
          >
            <SavedLocationList
              onSetPrimary={onSetPrimary}
              savedLocationList={address}
              onDeleteClicked={onClickedDeleteButton}
              onEditClicked={onClickedEditButton}
              onItemClicked={onItemClicked}
              isFromCreateCustomer={route.params.fromPage}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              height: 70,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!savedLocation.initSavedLocation && (
              <Text>{strings.empty_location_list}</Text>
            )}
          </View>
        )}

        {/* <View>
          <TouchableOpacity
            style={styles.savelocBtn}
            onPress={() => onClickedSaveLocationButton()}
          >
            <Text style={[styles.saveLocText]}>{strings.add_location}</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  bottomView: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: -20,
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
    marginTop: 50,
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
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 3,
    margin: 5,
    borderColor: "#9FA5AA",
    borderWidth: 1,
  },
  searchInput: {
    height: 45,
    width: "90%",
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
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
});
export default SavedLocation;
