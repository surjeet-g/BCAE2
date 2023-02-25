import React, { useEffect, useState } from "react";
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
import { color, DEFAULT_PROFILE_IMAGE } from "../Utilities/Constants/Constant";
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Pressable } from "react-native";
import NotiIcon from "../Assets/svg/notif.svg";
import AvtrIcon from "../Assets/svg/avatr.svg";
import { useTheme } from "react-native-paper";
import { ViewProfile } from "../Screens/EditProfile/ViewProfile";
import ResetPassword from "../Screens/ForgotPassword/ResetPassword";
import EditProfile from "../Screens/EditProfile/EditProfile";
import { fetchSavedProfileData } from "../Redux/ProfileDispatcher";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();
const initialRoutByPlat =
  Platform.OS === "android" ? "Dashboard" : "MyTicketsStack";

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
    >
      <Tab.Screen
        // options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
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
                  onPress={() =>
                    alert("ToDo - Navigate to Notifications Screen")
                  }
                >
                  <NotiIcon {...ICON_STYLE} />
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
                    style={ICON_STYLE}
                  />
                </Pressable>
              </View>
            );
          },
        })}
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
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
export default Root;
