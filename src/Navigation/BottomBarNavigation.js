import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import get from "lodash.get";
import React, { useEffect } from "react";
import { Image, Platform, Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfileData } from "../Redux/ProfileDispatcher";
import { HomeScreen } from "../Screens/TabScreens/HomeScreen";
import { UserHomeScreen } from "../Screens/TabScreens/UserHomeScreen";
import { DEFAULT_PROFILE_IMAGE, color } from "../Utilities/Constants/Constant";
import { navBar } from "../Utilities/Style/navBar";
import { USERTYPE } from "../Utilities/UserManagement/userInfo";
import { Appointment } from "./../Screens/Appointments/Appointment";
import Help from "./../Screens/Help";
import Offers from "./../Screens/Offers";
import CustomBottomBar from "./CustomBottomBar";

const BottomTab = createBottomTabNavigator();
const initialRoutByPlat = Platform.OS === "android" ? "HomeScreen" : "HomeScreen";
const Drawer = createDrawerNavigator();

const BottomBarNavigation = () => {

  // const [profile, setProfile] = useState(null);
  const dispatch2 = useDispatch([fetchMyProfileData]);
  // const [loader, setLoader] = useState(true);
  const profileRed = useSelector((state) => state.profile);

  useEffect(() => {
    async function fetchMyAPI() {
      await dispatch2(fetchMyProfileData());
      // setLoader(false);
      // if (res.status) {
      //   console.log('data', res)
      //   setProfile(res.data.profilePicture);
      // }
      // console.warn("useeffect", profile?.savedProfileData);
    }
    fetchMyAPI();
  }, []);

  const userType = get(profileRed, "savedProfileData.typeOfUser", "");
  const isConsumer = userType == USERTYPE.CUSTOMER;
  const profilePath = isConsumer
    ? "savedProfileData.customerPhoto"
    : "savedProfileData.profilePicture";
  const profile = get(profileRed, profilePath, null);
  console.log("customer pic", profile, profileRed)
  const { colors, fonts } = useTheme();
  const options = (navigation) => ({
    activeTintColor: "#e91e63",
    headerShown: true,
    headerStyle: {
      ...fonts.titleLarge,
      backgroundColor: "#4a5996",
    },
    headerTitleStyle: {
      ...fonts.titleMedium,
      ...{ color: "white", fontWeight: "700" },
    },


    headerRight: () => {
      return (
        <View style={navBar.navRightCon}>
          {/* <Pressable
            onPress={() => {
            
              // navigation.navigate("BottomBar")

            }}
            style={{ ...navBar.roundIcon, backgroundColor: color.WHITE }}
          >
            <Icon name="home-switch" size={28} color={Colors.BLACK} />
          </Pressable> */}

          {/* <Pressable
            onPress={() => navigation.navigate("Notification")}
            style={navBar.roundIcon}
          >
            <Image
              source={require("../Assets/icons/home_bell.png")}
              style={{ width: 35, height: 35 }}
            />
          </Pressable> */}

          <View style={navBar.divider} />

          <Pressable
            onPress={() => navigation.navigate("SwitchRole")}
            style={{ ...navBar.roundIcon, backgroundColor: color.WHITE }}
          >
            <Icon name="account-switch" size={28} color={"#4a5996"} />
          </Pressable>

          <View style={navBar.divider} />

          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{
                uri: profile || DEFAULT_PROFILE_IMAGE
              }}
              // imageStyle={{ borderRadius: 80 }}
              style={navBar.roundIcon}
            />
          </Pressable>

        </View>
      );
    },

    // headerLeft: () => (
    //   <Pressable
    //     onPress={() => {
    //       navigation.dispatch(DrawerActions.openDrawer());
    //     }}
    //     style={{ marginLeft: 5 }}
    //   >
    //     <Icon name="menu" size={25} color={color.WHITE} />
    //   </Pressable>
    // ),
  });



  return (
    <>
      {/* {loader && <LoadingAnimation title="Fetch data...Please wait" />} */}


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
          name="Home"
          component={isConsumer ? HomeScreen : UserHomeScreen}
        />

        <BottomTab.Screen
          // options={{ headerShown: false }}
          name="Search"
          component={Appointment}
          options={({ navigation }) => ({
            ...options,
            headerRight: () => {
              return (
                <View style={navBar.navRightCon}>
                  {/* <Pressable
                    onPress={() => {
                      // alert("ToDo - Navigate to Notifications Screen")
                    }}
                    style={navBar.roundIcon}
                  >
                    <Image
                      source={require("../Assets/icons/home_bell.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </Pressable> */}

                  <View style={navBar.divider} />
                  <Pressable onPress={() => navigation.navigate("Profile")}>
                    <Image
                      source={{
                        uri:
                          profile || DEFAULT_PROFILE_IMAGE,
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
                  {/* <Pressable
                    onPress={() => {

                      // alert("ToDo - Navigate to Notifications Screen")
                    }
                    }
                    style={navBar.roundIcon}
                  >
                    <Image
                      source={require("../Assets/icons/home_bell.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </Pressable> */}

                  <View style={navBar.divider} />
                  <Pressable onPress={() => navigation.navigate("Profile")}>
                    <Image
                      source={{
                        uri: profile || DEFAULT_PROFILE_IMAGE,
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
                  {/* <Pressable
                    onPress={() => {
                      // alert("ToDo - Navigate to Notifications Screen")
                    }
                    }
                    style={navBar.roundIcon}
                  >
                    <Image
                      source={require("../Assets/icons/home_bell.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  </Pressable> */}

                  <View style={navBar.divider} />
                  <Pressable onPress={() => navigation.navigate("Profile")}>
                    <Image
                      source={{
                        uri: profile || DEFAULT_PROFILE_IMAGE,
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
    </>
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
