import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AnnouIcon from "../Assets/svg/anno.svg";
import TermIcon from "../Assets/svg/terms.svg";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import SavedLocation from "../Screens/Location/SavedLocation";
import { Login } from "../Screens/Login/Login";
import Register from "../Screens/Register/Register";
import Splash from "../Screens/Splash/Splash";
import BottomBarNavigation from "./BottomBarNavigation";

// import Location from "../Screens/Location/Location";
import AddLocation from "../Screens/Location/AddLocation";

//import ShowWebPage from "../Screens/TabScreens/ShowWebPage";

// import Anouncement from "../Screens/TabScreens/Announcement";
import AnnouncementList from "../Screens/Announcement/AnnouncementList";
import ConfirmForgotPassword from "../Screens/ForgotPassword/ConfirmForgotPassword";
import ResetPassword from "../Screens/ForgotPassword/ResetPassword";
import ForgotUserinfo from "../Screens/ForgotUserInfo/ForgotUserinfo";
import VerifyForgotUserInfo from "../Screens/ForgotUserInfo/VerifyForgotUserInfo";
// import About from "../Screens/TabScreens/About";
// import InquiryNotification from "../Screens/TabScreens/InquiryNotification";
import { Modal, useTheme } from "react-native-paper";
import AnnouncementItem from "../Screens/Announcement/component/AnnouncementItem";
import { Appointment } from "../Screens/Appointments/Appointment";
import ViewOrder from "../Screens/Appointments/ViewOrder";
import EditProfile from "../Screens/EditProfile/EditProfile";
import { ViewProfile } from "../Screens/EditProfile/ViewProfile";
import VerifyLoginOTP from "../Screens/Login/component/VerifyLoginOTP";
import RegisterSuccess from "../Screens/Register/RegisterSuccess";
import InteractionsToOrder from "../Screens/TabScreens/InteractionsToOrder";

import Chat from "../Screens/Chat/Chat";
import Notification from "../Screens/Notification/Notification";
import { ProductListing } from "../Screens/TabScreens/Component/Interaction/ProductListing";
import { TermNdCondition } from "../Screens/TermNdConidtions/TermNdCondition";
import { mockAnnouncementList } from "../Utilities/Constants/Constant";
import { ICON_STYLE, navBar } from "../Utilities/Style/navBar";
import AppointmentDetails from "./../Screens/Appointments/AppointmentDetails";
import Followup from "./../Screens/Appointments/Followup";
import InteractionDetails from "./../Screens/Appointments/InteractionDetails";
import WorkflowHistory from "./../Screens/Appointments/WorkflowHistory";
import ComingSoon from "./../Screens/ComingSoon";
import CreateCustomer from "./../Screens/CreateCustomer/CreateCustomer";

const STACK_EDIT_PROFILE = "EditProfile";
const STACK_REGISTER = "Register with us";
const STACK_SAVED_LOC = "SavedLocation";
const STACK_LOGIN = "Login";
const STACK_SPLASH = "Splash";
export const STACK_VIEW_ORDER = "ViewOrder";
const STACK_VERIFY_LOGIN_OTP = "VerifyLoginOTP";
const STACK_INTERACTION = "InteractionsToOrder";
export const STACK_INTERACTION_DETAILS = "InteractionDetails";
const STACK_FOLLOWUP = "Followup";
const STACK_WORKFLOW_HISTORY = "WorkflowHistory";
const STACK_APPOINTMENT_DETAILS = "AppointmentDetails";
export const STACK_CREATE_CUSTOMER = "CreateCustomer";
const STACK_NOTIFICATION = "Notification";

const Stack = createStackNavigator();

function MyStack() {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const { colors, fonts } = useTheme();
  const options = {
    headerTintColor: colors.inverseSecondary,
    activeTintColor: "#e91e63",
    headerShown: true,
    headerTransparent: false,

    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTitleStyle: {
      ...fonts.titleLarge,
      ...{ color: colors.inverseSecondary, fontWeight: "700" },
    },
  };

  return (
    <NavigationContainer>
      {/* Register with u */}
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={() => ({
          headerTransparent: true,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            ...fonts.titleLarge,
            ...{ color: colors.onSurfaceVariant, fontWeight: "700" },
          },
          headerTitle: "",

          headerRight: () => {
            return (
              <View style={navBar.navRightCon}>
                <Pressable
                  onPress={() =>
                    alert("ToDo - Navigate to Notifications Screen")
                  }
                >
                  <TermIcon {...ICON_STYLE} />
                </Pressable>
                <View style={navBar.divider} />
                <Pressable onPress={() => setShowAnnouncementModal(true)}>
                  <AnnouIcon {...ICON_STYLE} />
                </Pressable>
              </View>
            );
          },
        })}
      >

        <Stack.Screen
          options={({ navigation }) => ({
            ...options,
            ...{
              headerTitle: "Profile",
              headerStyle: {
                backgroundColor: "#4C5A81",
              },
              headerRight: () => {
                return (
                  <View>
                    <Pressable
                      onPress={() => navigation.navigate("EditProfile")}
                    >
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={require("../Assets/icons/ic_edit.png")}
                      />
                    </Pressable>
                  </View>
                );
              },
            },
          })}
          name="Profile"
          component={ViewProfile}
        />

        <Stack.Screen
          options={({ navigation }) => ({
            ...options,
            ...{
              headerTitle: "Appointment Dashboard",
              headerStyle: {
                backgroundColor: "#4C5A81",
              },
              headerRight: () => {
                return (
                  <View>
                    <Pressable>
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={require("../Assets/icons/ic_edit.png")}
                      />
                    </Pressable>
                  </View>
                );
              },
            },
          })}
          name="Appointment"
          component={Appointment}
        />

        <Stack.Screen
          options={({ navigation }) => ({
            ...options,
            ...{
              headerTitle: "Notification",
              headerStyle: {
                backgroundColor: "#4C5A81",
              },
              headerRight: () => {
                return <View></View>;
              },
            },
          })}
          name={STACK_NOTIFICATION}
          component={Notification}
        />

        <Stack.Screen
          options={({ navigation }) => ({
            ...options,
            ...{
              headerTitle: "Edit Profile",
            },
          })}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{
            title: "",
          }}
          name="RegisterSuccess"
          component={RegisterSuccess}
        />
        <Stack.Screen
          options={() => ({
            ...options,
            ...{
              headerTintColor: "white",
              headerTitle: "Chat",
              headerStyle: {
                tint: "white",
                backgroundColor: "#4C5A81",
              },
              headerRight: null
            },
          })}
          name="Chat"
          component={Chat}
        />

        <Stack.Screen
          name="Changepassword"
          component={ResetPassword}
          options={{
            ...options,
            ...{
              title: "Change password",
              headerRight: () => null,
              headerTitle: "Change password",
              headerTintColor: colors.inverseSecondary,
            },
          }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomBar"
          component={BottomBarNavigation}
        />

        <Stack.Screen
          options={{ headerShown: true }}
          name="ConfirmForgotPassword"
          component={ConfirmForgotPassword}
        />
        <Stack.Screen
          component={ResetPassword}
          options={{
            headerShown: true,
            title: "Announcements",
          }}
          name="ResetPassword"
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotUserInfo"
          component={ForgotUserinfo}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Login",
            headerLeft: null,
            headerRight: () => { }
          }}
          name={STACK_LOGIN}
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Login",

          }}
          name={STACK_VERIFY_LOGIN_OTP}
          component={VerifyLoginOTP}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            title: "Forgot Password",
            headerRight: null
          }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Forgot Password",
            headerRight: null
          }}
          name="TermConidtion"
          component={TermNdCondition}
        />
        <Stack.Screen
          options={{ headerShown: true, title: "Registration", headerRight: null }}
          name="Register with us"
          component={Register}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...options,
            ...{
              headerTintColor: "white",
              headerTitle: "Location on Map",
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "white", fontWeight: "500" },
              },
              headerStyle: {
                tint: "white",
                backgroundColor: "#4C5A81",
              },
              headerRight: null,
            },
          })}
          name="AddLocation"
          component={AddLocation}
        />
        <Stack.Screen
          options={() => ({
            ...options,
            ...{
              headerTintColor: "white",
              headerTitle: "Saved Locations",
              headerStyle: {
                tint: "white",
                backgroundColor: "#4C5A81",
              },
            },
          })}
          name="SavedLocation"
          component={SavedLocation}
        />
        {/* second step for user registration */}

        {/* forgot password verify step */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="VerifyForgotUserInfo"
          component={VerifyForgotUserInfo}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            title: "Announcements",
          }}
          name="Announcements"
          component={AnnouncementList}
        />

        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "Interactions",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
            },
          })}
          name="InteractionsToOrder"
          component={InteractionsToOrder}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "Choose Product",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
              headerRight: () => null
            },
          })}
          name="ProductList"
          component={ProductListing}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "View Order",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
              headerRight: () => { },
            },
          })}
          name={STACK_VIEW_ORDER}
          component={ViewOrder}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "Appointment Details",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
              headerRight: () => { },
            },
          })}
          name={STACK_APPOINTMENT_DETAILS}
          component={AppointmentDetails}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "Interaction Details",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
            },
          })}
          name={STACK_INTERACTION_DETAILS}
          component={InteractionDetails}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "Followup History",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
              headerRight: () => { },
            },
          })}
          name={STACK_FOLLOWUP}
          component={Followup}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "Workflow History",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
              headerRight: () => { },
            },
          })}
          name={STACK_WORKFLOW_HISTORY}
          component={WorkflowHistory}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...{
              headerTintColor: "#fff",
              headerTitle: "Create Customer",
              headerBackgroundContainerStyle: { backgroundColor: "#4C5A81" },
              headerTitleStyle: {
                ...fonts.titleLarge,
                ...{ color: "#fff", fontWeight: "700" },
              },
              headerRight: () => { },
            },
          })}
          name={STACK_CREATE_CUSTOMER}
          component={CreateCustomer}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            ...options,
            ...{
              headerTitle: "Coming Soon",
            },
          })}
          name="ComingSoon"
          component={ComingSoon}
        />

        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="ShowWebPage"
          component={ShowWebPage}
        /> */}
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SavedLocation"
          component={SavedLocation}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Location"
          component={Location}
        />

       
        <Stack.Screen
          options={{ headerShown: false }}
          name="ShowWebPage"
          component={ShowWebPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Anouncement"
          component={Anouncement}
        />
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="ConfirmForgotPassword"
          component={ConfirmForgotPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="About"
          component={About}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="InquiryNotification"
          component={InquiryNotification}
        /> */}
      </Stack.Navigator>
      <Modal
        visible={showAnnouncementModal}
        dismissable={false}
        contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <AnnouIcon fill={"#22374E"} style={{ ...ICON_STYLE }} />
            <Text
              style={{
                fontWeight: 600,
                color: "#22374E",
                fontSize: 20,
                flex: 1,
                marginHorizontal: 15,
              }}
            >
              Annoucements
            </Text>
            <TouchableOpacity onPress={() => setShowAnnouncementModal(false)}>
              <Image
                style={{ ...ICON_STYLE }}
                source={require("../Assets/icons/close_black.png")}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockAnnouncementList}
            renderItem={({ item }) => (
              <AnnouncementItem
                title={item.title}
                desc={item.desc}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    padding: 10,
    height: "70%",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default MyStack;
