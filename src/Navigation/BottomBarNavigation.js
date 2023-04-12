import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { HomeScreen } from "../Screens/TabScreens/HomeScreen";
import { UserHomeScreen } from "../Screens/TabScreens/UserHomeScreen";
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
import get from 'lodash.get';
import { Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfileData } from "../Redux/ProfileDispatcher";
import { DEFAULT_PROFILE_IMAGE } from "../Utilities/Constants/Constant";
import { USERTYPE } from '../Utilities/UserManagement/userInfo';
import Help from "./../Screens/Help";
import Offers from "./../Screens/Offers";
import Search from "./../Screens/Search";

const BottomTab = createBottomTabNavigator();
const initialRoutByPlat =
  Platform.OS === "android" ? "HomeScreen" : "HomeScreen";

const Drawer = createDrawerNavigator();

const BottomBarNavigation = () => {
  // const [profile, setProfile] = useState(null);
  const dispatch2 = useDispatch([fetchMyProfileData]);

  const profileRed = useSelector((state) => state.profile);

  useEffect(() => {
    async function fetchMyAPI() {
      await dispatch2(fetchMyProfileData());

      // if (res.status) {
      //   console.log('data', res)
      //   setProfile(res.data.profilePicture);
      // }

      // console.warn("useeffect", profile?.savedProfileData);
    }

    fetchMyAPI();
  }, []);


  const userType = get(profileRed, 'savedProfileData.typeOfUser', '');
  const isConsumer = (userType == USERTYPE.CUSTOMER)
  const profilePath = isConsumer ? 'savedProfileData.customerPhoto' : 'savedProfileData.profilePicture'
  const profile = get(profileRed, profilePath, null)

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
            onPress={() => navigation.navigate("Notification")}
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
                uri: `data:image/jpeg;base64,${profile || DEFAULT_PROFILE_IMAGE
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
        component={isConsumer ? UserHomeScreen : HomeScreen}
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
                      uri: `data:image/jpeg;base64,${profile || DEFAULT_PROFILE_IMAGE
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
                      uri: `data:image/jpeg;base64,${profile || DEFAULT_PROFILE_IMAGE
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
                      uri: `data:image/jpeg;base64,${profile || DEFAULT_PROFILE_IMAGE
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
