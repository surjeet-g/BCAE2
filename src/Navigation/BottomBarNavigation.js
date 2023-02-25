import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ICON_STYLE, navBar } from "../Utilities/Style/navBar";
import { Dashboard } from "../Screens/TabScreens/Dashboard";
// import Chat from "../Screens/TabScreens/Chat";
// import Announcement from "../Screens/TabScreens/Announcement";
// import AddTickets from "../Screens/TabScreens/AddTickets";
// import MyTicketsStack from "./MyTicketsStack";
import { Image, View, Platform } from "react-native";
import CustomBottomBar from "./CustomBottomBar";
// import CreateEnquiry from "../Screens/TabScreens/CreateEnquiry";
// import CreateComplaint from "../Screens/TabScreens/CreateComplaint";
import { color } from "../Utilities/Constants/Constant";
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Pressable } from "react-native";
import NotiIcon from "../Assets/svg/notif.svg";
import AvtrIcon from "../Assets/svg/avatr.svg";
import { useTheme } from "react-native-paper";
import { ViewProfile } from "../Screens/EditProfile/ViewProfile";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ResetPassword from "../Screens/ForgotPassword/ResetPassword";
import EditProfile from "../Screens/EditProfile/EditProfile";

const Tab = createBottomTabNavigator();
const initialRoutByPlat =
  Platform.OS === "android" ? "Dashboard" : "MyTicketsStack";

const Drawer = createDrawerNavigator();

const BottomBarNavigation = () => {
  const { colors, fonts } = useTheme();
  const options = {
    activeTintColor: "#e91e63",
    headerShown: true,

    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTitleStyle: {
      ...fonts.titleMedium,
      ...{ color: colors.inverseSecondary, fontWeight: "700" },
    },
    headerShown: true,
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomBar {...props} />}
      initialRouteName="Profile"
      backBehavior="history"
      options={({ navigation }) => ({
        activeTintColor: "#e91e63",
        headerShown: true,

        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTitleStyle: {
          ...fonts.titleMedium,
          ...{ color: colors.inverseSecondary, fontWeight: "700" },
        },
        headerRight: () => {
          return (
            <View style={navBar.navRightCon}>
              <Pressable
                onPress={() => alert("ToDo - Navigate to Notifications Screen")}
              >
                <NotiIcon {...ICON_STYLE} />
              </Pressable>
              <View style={navBar.divider} />
              <Pressable onPress={() => navigation.navigate("EditProfile")}>
                <AvtrIcon {...ICON_STYLE} />
              </Pressable>
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
      />

      <Tab.Screen
        name="Changepassword"
        component={ResetPassword}
        options={{ ...options, ...{ title: "Change password" } }}
      />
      <Tab.Screen
        options={{
          ...options,
          ...{
            title: "Profile",
            headerRight: () => {
              return (
                <View style={navBar.navRightCon}>
                  <Pressable
                    onPress={() => navigation.navigate("EditProfile")}
                    style={{
                      width: 26,
                      height: 26,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 26,
                      borderWidth: 0.5,
                      borderStyle: "solid",
                      borderColor: colors.inverseSecondary,
                    }}
                  >
                    <Icon
                      name="pencil-outline"
                      size={19}
                      color={colors.inverseSecondary}
                    />
                  </Pressable>
                </View>
              );
            },
          },
        }}
        name="Profile"
        component={ViewProfile}
      />
      <Tab.Screen
        options={{
          ...options,
          ...{
            title: "Edit Profile",
            headerRight: () => {
              return (
                <View style={navBar.navRightCon}>
                  <Pressable
                    onPress={() => navigation.navigate("EditProfile")}
                    style={{
                      width: 26,
                      height: 26,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 26,
                      borderWidth: 0.5,
                      borderStyle: "solid",
                      borderColor: colors.inverseSecondary,
                    }}
                  >
                    <Icon
                      name="content-save"
                      size={19}
                      color={colors.inverseSecondary}
                    />
                  </Pressable>
                </View>
              );
            },
          },
        }}
        name="EditProfile"
        component={EditProfile}
      />
      {/* 
      <Tab.Screen
        options={{ headerShown: false }}
        name="MyTicketsStack"
        component={MyTicketsStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="AddTickets"
        component={AddTickets}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Announcement"
        component={Announcement}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Chat"
        component={Chat}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="CreateEnquiry"
        component={CreateEnquiry}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="CreateComplaint"
        component={CreateComplaint}
      /> */}
    </Tab.Navigator>
  );
};

const Root = () => {
  return (
    <Drawer.Navigator initialRouteName="BottomApp">
      <Drawer.Screen
        name="BottomApp"
        component={BottomBarNavigation}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
    </Drawer.Navigator>
  );
};
export default Root;
