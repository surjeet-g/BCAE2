import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { HomeScreen } from "../Screens/TabScreens/HomeScreen";
import { navBar } from "../Utilities/Style/navBar";
// import Chat from "../Screens/TabScreens/Chat";
// import Announcement from "../Screens/TabScreens/Announcement";
// import AddTickets from "../Screens/TabScreens/AddTickets";
// import MyTicketsStack from "./MyTicketsStack";
import { DrawerActions } from "@react-navigation/native";

import { Image, Platform, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomBottomBar from "./CustomBottomBar";
// import CreateEnquiry from "../Screens/TabScreens/CreateEnquiry";
// import CreateComplaint from "../Screens/TabScreens/CreateComplaint";
import { Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { fetchSavedProfileData } from "../Redux/ProfileDispatcher";
import { DEFAULT_PROFILE_IMAGE } from "../Utilities/Constants/Constant";
import Help from "./../Screens/Help";
import Offers from "./../Screens/Offers";
import Search from "./../Screens/Search";

const BottomTab = createBottomTabNavigator();
const initialRoutByPlat =
  Platform.OS === "android" ? "HomeScreen" : "HomeScreen";

const Drawer = createDrawerNavigator();

const BottomBarNavigation = () => {
  const [profile, setProfile] = useState(null);
  const dispatch2 = useDispatch([fetchSavedProfileData]);
  useEffect(() => {
    async function fetchMyAPI() {
      const res = await dispatch2(fetchSavedProfileData());
      if (res.status) {
        setProfile(res.data.profilePicture);
      }

      // console.warn("useeffect", profile?.savedProfileData);
    }

    fetchMyAPI();
  }, []);

  const { colors, fonts } = useTheme();
  const options = (navigation) => ({
    activeTintColor: "#e91e63",
    headerShown: true,

    headerStyle: {
      backgroundColor: "white",
    },
    headerTitleStyle: {
      ...fonts.titleMedium,
      ...{ color: "black", fontWeight: "700" },
    },
    headerRight: () => {
      return (
        <View style={navBar.navRightCon}>
          <Pressable
            onPress={() => alert("ToDo - Navigate to Notifications Screen")}
            style={navBar.roundIcon}
          >
            <Image
              source={require("../Assets/icons/home_bell.png")}
              style={{ width: 35, height: 35 }}
            />
          </Pressable>
          <View style={navBar.divider} />
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${
                  profile || DEFAULT_PROFILE_IMAGE
                }`,
              }}
              // imageStyle={{ borderRadius: 80 }}
              style={navBar.roundIcon}
            />
          </Pressable>
        </View>
      );
    },
    headerLeft: () => (
      <Pressable
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={{ marginLeft: 5 }}
      >
        <Icon name="menu" size={25} color={colors.primary} />
      </Pressable>
    ),
  });

  return (
    <BottomTab.Navigator
      tabBar={(props) => <CustomBottomBar {...props} />}
      initialRouteName="HomeScreen"
      backBehavior="history"
    >
      <BottomTab.Screen
        // options={{ headerShown: false }}
        options={({ navigation }) => ({
          ...options(navigation),
        })}
        name="HomeScreen"
        component={HomeScreen}
      />

      <BottomTab.Screen
        // options={{ headerShown: false }}
        name="Search"
        component={Search}
        options={({ navigation }) => ({
          ...options,
          headerRight: () => {
            return (
              <View style={navBar.navRightCon}>
                <Pressable
                  onPress={() =>
                    alert("ToDo - Navigate to Notifications Screen")
                  }
                  style={navBar.roundIcon}
                >
                  <Image
                    source={require("../Assets/icons/home_bell.png")}
                    style={{ width: 35, height: 35 }}
                  />
                </Pressable>
                <View style={navBar.divider} />
                <Pressable onPress={() => navigation.navigate("Profile")}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${
                        profile || DEFAULT_PROFILE_IMAGE
                      }`,
                    }}
                    // imageStyle={{ borderRadius: 80 }}
                    style={navBar.roundIcon}
                  />
                </Pressable>
              </View>
            );
          },
        })}
      />
      <BottomTab.Screen
        // options={{ headerShown: false }}
        name="Offers"
        component={Offers}
        options={({ navigation }) => ({
          ...options,
          headerRight: () => {
            return (
              <View style={navBar.navRightCon}>
                <Pressable
                  onPress={() =>
                    alert("ToDo - Navigate to Notifications Screen")
                  }
                  style={navBar.roundIcon}
                >
                  <Image
                    source={require("../Assets/icons/home_bell.png")}
                    style={{ width: 35, height: 35 }}
                  />
                </Pressable>
                <View style={navBar.divider} />
                <Pressable onPress={() => navigation.navigate("Profile")}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${
                        profile || DEFAULT_PROFILE_IMAGE
                      }`,
                    }}
                    // imageStyle={{ borderRadius: 80 }}
                    style={navBar.roundIcon}
                  />
                </Pressable>
              </View>
            );
          },
        })}
      />

      <BottomTab.Screen
        // options={{ headerShown: false }}
        name="Help"
        component={Help}
        options={({ navigation }) => ({
          ...options,
          headerRight: () => {
            return (
              <View style={navBar.navRightCon}>
                <Pressable
                  onPress={() =>
                    alert("ToDo - Navigate to Notifications Screen")
                  }
                  style={navBar.roundIcon}
                >
                  <Image
                    source={require("../Assets/icons/home_bell.png")}
                    style={{ width: 35, height: 35 }}
                  />
                </Pressable>
                <View style={navBar.divider} />
                <Pressable onPress={() => navigation.navigate("Profile")}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${
                        profile || DEFAULT_PROFILE_IMAGE
                      }`,
                    }}
                    // imageStyle={{ borderRadius: 80 }}
                    style={navBar.roundIcon}
                  />
                </Pressable>
              </View>
            );
          },
        })}
      />
    </BottomTab.Navigator>
  );
};

const Root = () => {
  return (
    <Drawer.Navigator initialRouteName="BottomApp">
      <Drawer.Screen
        name="BottomApp"
        component={BottomBarNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
export default Root;
