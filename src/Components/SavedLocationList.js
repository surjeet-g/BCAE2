import React from "react";
import {
  FlatList,
  StyleSheet,
  Text, TouchableOpacity, View
} from "react-native";

import get from "lodash.get";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DeleteImage from "../Assets/svg/delete.svg";
import EditImage from "../Assets/svg/edit_icon_round.svg";
import AddressImage from "../Assets/svg/location_green.svg";
import PrimaryAddress from "../Assets/svg/primary_address.svg";
import { deleteSavedLocation } from "../Redux/SavedLocationDispatcher";
import {
  color, spacing
} from "../Utilities/Constants/Constant";
import { addresObjToString } from "../Utilities/utils";
import { ClearSpace } from './ClearSpace';
function SavedLocationItem({
  item,
  onDeleteClicked,
  onEditClicked,
  onItemClicked,
  onSetPrimary,
}) {
  const { colors } = useTheme();
  let masterReducer = useSelector((state) => state.masterdata);
  console.log("saved date", masterReducer);
  const getAllAddressType = get(
    masterReducer,
    "masterdataData.ADDRESS_TYPE",
    []
  );

  const dispatch = useDispatch([deleteSavedLocation]);

  const getAddressString = (data) => {
    let addressString = "";

    if (data?.hno) addressString += data?.hno + ",";
    if (data?.block) addressString += data?.block + ",";
    if (data?.buildingName) addressString += data?.buildingName + ",";
    if (data?.street) addressString += data?.street + ",";
    if (data?.road) addressString += data?.road + ",";
    if (data?.city) addressString += data?.city + ",";
    if (data?.town) addressString += data?.town + ",";
    if (data?.state) addressString += data?.state + ",";
    if (data?.district) addressString += data?.district + ",";
    if (data?.country) addressString += data?.country + ",";
    if (data?.postCode) addressString += data?.postCode;

    return addressString;
  };
  const getAddresType = (code) => {
    if (getAllAddressType.length == 0) return "";

    return get(
      getAllAddressType.filter((d) => d.code == code),
      "[0].description",
      ""
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        if (item.isPrimary) return null;
        onSetPrimary({
          addressNo: item.addressNo,
          addressType: item.addressType,
          isPrimary: item.isPrimary,
          address1: item.address1,
          address2: item.address2,
          address3: item.address3,
          addrZone: item.addrZone,
          city: item.city,
          district: item.district,
          state: item.state,
          postcode: item.postcode,
          country: item.country,
          latitude: item.latitude,
          longitude: item.longitude,
        });
      }}

      style={({ pressed }) => pressed && styles.pressed}

    >
      <View style={{ borderColor: 'transparent', borderWidth: .5, borderBottomColor: "#38383885", marginTop: 12 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
          <View style={{ flex: .7, justifyContent: "center", }}>
            <AddressImage></AddressImage>
          </View>
          <View style={{ flex: 5, }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: colors.secondary,
                // marginBottom: 5,
              }}
            >
              {getAddresType(item.addressType)}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: colors.secondary,
              }}
            >
              {addresObjToString(item)}
            </Text>
          </View>
          <View
            style={{

              flex: 2.3,
              flexDirection: "row",
              // alignItems: "center",
              justifyContent: "flex-end",
              color: color.BLACK,
            }}
          >
            {/* <Image
              style={[
                styles.rightArrow,
                styles.searchIcon,
                { marginRight: 20 },
              ]}
              source={require("../Assets/icons/ic_edit_nav.png")}
            /> */}
            {/* {item?.isPrimary == false && ( */}
            <TouchableOpacity
              activeOpacity={0.5}

              onPress={() =>
                onEditClicked(item.addressNo, addresObjToString(item))
              }
            >
              <EditImage></EditImage>
            </TouchableOpacity>
            {/* )} */}
            {item?.isPrimary == false && (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                activeOpacity={0.5}
                onPress={() =>
                  onDeleteClicked(item.addressNo, addresObjToString(item))
                }
              >
                <DeleteImage></DeleteImage>
              </TouchableOpacity>
            )}

            {item?.isPrimary == true && (
              <TouchableOpacity style={{ marginLeft: 10 }}
                activeOpacity={0.5}>
                <PrimaryAddress></PrimaryAddress>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ClearSpace size={4} />
      </View>
    </TouchableOpacity>
  );
}

const SavedLocationList = ({
  savedLocationList,
  onDeleteClicked,
  onEditClicked,
  onItemClicked,
  onSetPrimary,
}) => (
  <View >
    {savedLocationList?.length > 0 ? (
      <FlatList
        contentContainerStyle={{
          // paddingBottom: 20,
          paddingLeft: 2,
          paddingRight: 2,

        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={savedLocationList}
        key={savedLocationList.custFavAddrId}
        renderItem={({ item }) => (
          <SavedLocationItem
            item={item}
            onDeleteClicked={onDeleteClicked}
            onEditClicked={onEditClicked}
            onItemClicked={onItemClicked}
            onSetPrimary={onSetPrimary}
          />
        )}
      />
    ) : (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25, color: color.BCAE_PRIMARY }}>
          Saved Location list is empty !!
        </Text>
      </View>
    )}
  </View>
);

export default SavedLocationList;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  ticketItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "blue",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    minWidth: "90%",
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
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    fontWeight: "400",
    color: color.BLACK,
  },
  requestText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#292D32",
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
    flex: 1,
    padding: 5,
  },
  box2: {
    flex: 4,
    height: 50,
    padding: 5,
  },
  box3: {
    flex: 1,
    justifyContent: "center",
    height: 50,
  },
  amount: {
    color: "pink",
    fontWeight: "bold",
  },
  searchIcon: {
    width: spacing.WIDTH_22,
    height: spacing.WIDTH_22,
  },
  rightArrow: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
