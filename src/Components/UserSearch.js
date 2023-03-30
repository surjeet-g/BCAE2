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
import { setProfileReset, setSearchProfileReset } from "../Redux/ProfileAction";
import {
  fetchSavedProfileDataByUser,
  seachCustomers
} from "../Redux/ProfileDispatcher";

const { height, width } = Dimensions.get("screen");

export const userNavigationIcon = (props) => {
  return props.navigation.setOptions({
    headerRight: () => {
      return (
        <View>
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
                        style={{ width: width * 0.7, height: 50 }}
                        placeholder={"Search customer"}
                        onChangeText={async (text) => {
                          searchString = text;
                          props.setLoader(true);

                          await props.profileDispatch(
                            seachCustomers()
                          );
                          console.log('data', props.profileSearchData)
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
      {props.profileSearchData.length == 0 ? (
        <Text></Text>
      ) : (
        <FlatList
          contentContainerStyle={{
            height: 500,
          }}
          data={props.profileSearchData}
          renderItem={({ item }) => {
            return (
              <List.Item
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

                  borderBottomWidth: 0.5,
                  paddingHorizontal: 4,
                  // borderRadius: 3,
                }}
                onPress={async () => {
                  props.setLoader(true);
                  const status = await props.profileDispatch(
                    fetchSavedProfileDataByUser(
                      "ce2b267e-4fb3-4c6d-b3b1-9ea52280ab9d"
                    )
                  );
                  if (status) {
                    props.navigation.setOptions({
                      headerRight: props.headerRightForNav,
                      headerTitle: props.headerTitle,
                    });
                    props.profileDispatch(setProfileReset());
                  }
                  props.setLoader(false);
                  // setUserSeachEnable(false)
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};
