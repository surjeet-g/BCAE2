import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

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

const Tab = createBottomTabNavigator();
const initialRoutByPlat =
  Platform.OS === "android" ? "Dashboard" : "MyTicketsStack";

const Drawer = createDrawerNavigator();

function BottomBarNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomBar {...props} />}
      initialRouteName={initialRoutByPlat}
      backBehavior="history"
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
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
}

const Root = () => {
  return (
    <Drawer.Navigator initialRouteName="BottomApp">
      <Drawer.Screen
        name="BottomApp"
        component={BottomBarNavigation}
        options={({ navigation }, a) => ({
          drawerLabel: "First page Option",
          activeTintColor: "#e91e63",
          // headerShown: true,
          title: "Dashboard",
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => {
                  console.log("htting", navigation);
                  navigation.openDrawer();
                }}
              >
                <Text>CLick me</Text>
              </Pressable>
            );
          },
          drawerInactiveTintColor: "red",
        })}
      />
    </Drawer.Navigator>
  );
};
export default Root;
