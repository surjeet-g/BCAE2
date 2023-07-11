import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View
} from "react-native";
import { List, Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { setSearchProfileReset } from "../Redux/ProfileAction";
import {
  fetchSavedProfileDataByUser,
  seachCustomers
} from "../Redux/ProfileDispatcher";
import { navBar } from "../Utilities/Style/navBar";

const { height, width } = Dimensions.get("screen");

export const userNavigationIcon = (props) => {
  return props.navigation.setOptions({
    headerRight: () => {
      return (
        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
          <Pressable
            onPress={() => {
              props.navigation.setOptions({
                headerTitle: () => {
                  let searchString = "";
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Searchbar
                        style={{ width: width * 0.7, height: 40 }}
                        placeholder={"Search customer"}
                        onChangeText={async (text) => {
                          searchString = text;
                          props.setLoader(true);

                          await props.profileDispatch(
                            seachCustomers(text)
                          );
                          props.setSearchOpen(true)

                          props.setLoader(false);
                        }}
                      />
                      <Icon
                        onPress={() => {
                          props.profileDispatch(setSearchProfileReset());
                          props.navigation.setOptions({
                            headerRight: props.headerRightForNav,
                            headerTitle: props.headerTitle,
                          });
                        }}
                        name="close-circle"
                        size={25}
                        color={"#000"}
                      />
                    </View>
                  );
                },
              });
            }}
          >
            <Image
              source={require("../Assets/icons/search_user.png")}
              style={{ width: 60, height: 60 }}
            />

          </Pressable>
          <Pressable
            onPress={() => props.setOpenBottomModal(true)}
            style={{ ...navBar.roundIcon, backgroundColor: "#D9D9D9", width: 30, height: 30, marginRight: 5 }}
          >
            <Icon name="plus" size={19} color={"#1231232"} />
          </Pressable>

        </View>
      );
    },
  });
};
/**
 * Change Header middle section
 * @param {obj} profileSearchData data for search result
 * @param {obj} setLoader loader for pre loader screen
 *
 */
export const RenderUserSelectResult = (props) => {
  console.log("vipin - enter readner seraerch result ", props.profileSearchData)
  const SearchModelisOpen = props.SearchModelisOpen
  const setSearchOpen = props.setSearchOpen

  return (
    <View
      style={{
        top: 60,
        right: 10,
        position: "absolute",
        width: width * 0.9,
        zIndex: 99999999,
        elevation: 999,

      }}
    >

      {(props.profileSearchData.length == 0 || SearchModelisOpen == false) ? (
        <Text></Text>
      ) : (
        <FlatList
          contentContainerStyle={{
            maxHeight: 500,
          }}
          data={props.profileSearchData}
          renderItem={({ item }) => {
            return (
              <List.Item
                description={
                  `customer No : ${item.customerNo}`
                }
                title={`${item.firstName} ${item.lastName}`}
                titleStyle={{
                  fontSize: 10,
                  padding: 0,
                  margin: 0,
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  height: 40,
                  zIndex: 99999,
                  elevation: 5,
                  borderBottomWidth: 0.5,
                  paddingHorizontal: 4,
                  // borderRadius: 3,
                }}
                onPress={async () => {
                  props.setLoader(true);
                  const status = await props.profileDispatch(
                    fetchSavedProfileDataByUser(
                      item.customerUuid
                    )
                  );
                  if (status) {
                    props.navigation.setOptions({
                      headerRight: props.headerRightForNav,
                      headerTitle: props.headerTitle,
                    });
                    props.setUserSeachEnable(false)

                    // props.profileDispatch(setProfileReset());
                  }
                  setSearchOpen(false)
                  props.setLoader(false);

                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};
