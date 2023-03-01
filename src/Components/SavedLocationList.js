import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../Utilities/Constants/Constant";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteSavedLocation } from "../Redux/SavedLocationDispatcher";
import { strings } from "../Utilities/Language";
import { navBar } from "../Utilities/Style/navBar";
import { useTheme } from "react-native-paper";
import { addresObjToString } from "../Utilities/utils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddressImage from "../Assets/svg/location_green.svg";
import EditImage from "../Assets/svg/edit_icon_round.svg";
import DeleteImage from "../Assets/svg/delete.svg";
import PrimaryAddress from "../Assets/svg/primary_address.svg";
function SavedLocationItem({
  item,
  onDeleteClicked,
  onEditClicked,
  onItemClicked,
  onSetPrimary,
}) {
  const { colors } = useTheme();

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

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onItemClicked(item)}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <AddressImage></AddressImage>
          </View>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.secondary,
                marginBottom: 5,
              }}
            >
              {item.addressType}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: colors.secondary,
              }}
            >
              {addresObjToString(item)}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
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
            {item?.isPrimary == false && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  onEditClicked(item.addressNo, addresObjToString(item))
                }
              >
                <EditImage></EditImage>
              </TouchableOpacity>
            )}
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
              <TouchableOpacity style={{ marginLeft: 10 }} activeOpacity={0.5}>
                <PrimaryAddress></PrimaryAddress>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Divider style={{ marginTop: 10 }} />
      </View>
    </TouchableOpacity>
  );
}

const SavedLocationList = ({
  savedLocationList,
  onDeleteClicked,
  onEditClicked,
  onItemClicked,
}) => (
  <View>
    {savedLocationList?.length > 0 ? (
      <FlatList
        contentContainerStyle={{
          paddingBottom: 20,
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
