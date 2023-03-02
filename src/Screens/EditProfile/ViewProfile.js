import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
  Switch,
} from "react-native";
import Toast from "react-native-toast-message";
import { Divider, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  spacing,
  fontSizes,
  color,
  validateNumber,
} from "../../Utilities/Constants/Constant";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../Utilities/Language";
import { ICON_STYLE } from "../../Utilities/Style/navBar";
import { fetchSavedProfileData } from "../../Redux/ProfileDispatcher";
import { getDataFromDB, saveDataToDB } from "../../Storage/token";
import {
  DEFAULT_PROFILE_IMAGE,
  storageKeys,
} from "../../Utilities/Constants/Constant";
import { deleteNdLogoutUser, logoutUser } from "../../Redux/LogoutDispatcher";
import { serverCall } from "../../Utilities/API";
import { endPoints } from "../../Utilities/API/ApiConstants";
import { requestMethod } from "../../Utilities/API/ApiConstants";
import {
  getCustomerUUID,
  getUserId,
} from "../../Utilities/UserManagement/userInfo";
const ICON = 17;

export const ViewProfile = ({ navigation }) => {
  const dispatch2 = useDispatch([fetchSavedProfileData]);

  const { colors, fonts, roundness } = useTheme();
  let profile = useSelector((state) => state.profile);

  const [userInfo, setUserInfo] = useState({
    email: "",
    profilePicture: null,
    name: "",
    userId: "",
  });
  const [isNotiEnabled, setIsNotiEnabled] = useState(false);

  useEffect(() => {
    getDataFromDB(storageKeys.PUSH_NOTIFICATION).then((result) => {
      if (result) {
        setIsNotiEnabled(result.push_notification);
      }
    });
  }, []);
  useEffect(() => {
    async function fetchMyAPI() {
      const customerUUDI = await getCustomerUUID();

      let profileResult = await serverCall(
        endPoints.PROFILE_DETAILS + "/" + customerUUDI,
        requestMethod.GET,
        {}
      );
      const userID = await getUserId();
      console.log("userid", profileResult);
      if (profileResult?.success) {
        setUserInfo({
          email: profileResult?.data?.data?.customerContact[0]?.emailId,
          name: `${profileResult?.data.data.firstName} ${profileResult?.data?.data?.lastName}`,
          userId: userID,
          profilePicture: profileResult?.data?.data?.customerPhoto,
        });
      } else {
        console.log(">>err");
      }
    }
    fetchMyAPI();
  }, []);

  const toggleSwitch = () => {
    setIsNotiEnabled(!isNotiEnabled);
    saveDataToDB(storageKeys.PUSH_NOTIFICATION, {
      push_notification: !isNotiEnabled,
    }).then(function () {
      Toast.show({
        type: "bctSuccess",
        text1: strings.settings_updated,
      });
    });
  };
  const dispatch = useDispatch([
    deleteNdLogoutUser,
    fetchSavedProfileData,
    logoutUser,
  ]);
  useEffect(() => {
    getDataFromDB(storageKeys.PUSH_NOTIFICATION).then((result) => {
      if (result) {
        setIsNotiEnabled(result.push_notification);
      }
    });
    fetchMyProfileData();
  }, []);
  const onDeletePressed = () =>
    Alert.alert(strings.attention, strings.are_you_sure_delete_account, [
      {
        text: strings.cancel,
        onPress: () => console.log("Cancel Pressed"),
      },
      {
        text: strings.ok,
        onPress: () => {
          performLogoutDeleUser();
        },
      },
    ]);

  const performLogoutDeleUser = () => {
    //while logout we have to reset the data of first two tab as still it has logout info
    // dispatch(deleteNdLogoutUser(props.navigation, profile?.savedProfileData));
  };
  const fetchMyProfileData = () => dispatch(fetchSavedProfileData());
  console.log("profile", profile);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${
              userInfo.profileImageData || DEFAULT_PROFILE_IMAGE
            }`,
          }}
          // imageStyle={{ borderRadius: 80 }}
          style={{ height: 110, width: 110 }}
        />
        <ClearSpace size={2} />
        <Text
          variant="bodyMedium"
          style={{ color: "#3E60A0", fontWeight: "600" }}
        >
          {userInfo.name}
        </Text>
        <ClearSpace size={1} />
        <Text
          variant="bodySmall"
          style={{ color: colors.onSurfaceDisabled, fontWeight: "500" }}
        >
          {userInfo.email}
        </Text>
        <ClearSpace size={2} />
        <Pressable
          onPress={() => {
            navigation.navigate("Changepassword", {
              isChangePassword: true,
              email: userInfo.email,
            });
          }}
          style={styles.listItem}
        >
          <Icon
            name="lock-open-outline"
            size={ICON}
            color={colors.onSurfaceDisabled}
            style={{ marginRight: 14 }}
          />

          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "600",
              color: colors.secondary,
            }}
          >
            {strings.change_password}
          </Text>
        </Pressable>
        <Divider />
        <Pressable style={styles.listItem}>
          <Icon
            name="map-marker-outline"
            size={ICON}
            color={colors.onSurfaceDisabled}
            style={{ marginRight: 14 }}
          />

          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "600",

              color: colors.secondary,
            }}
          >
            {strings.saved_location}
          </Text>
        </Pressable>
        <Divider />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable
            onPress={() => {
              alert("To do");
            }}
            style={styles.listItem}
          >
            <Icon
              name="bell-outline"
              size={ICON}
              color={colors.onSurfaceDisabled}
              style={{ marginRight: 14 }}
            />

            <Text
              variant="bodyMedium"
              style={{
                fontWeight: "600",

                color: colors.secondary,
              }}
            >
              {strings.notification}
            </Text>
          </Pressable>
          <Switch
            trackColor={{
              false: colors.inversePrimary,
              true: "#ca5b5ea8",
            }}
            thumbColor={isNotiEnabled ? colors.primary : colors.inversePrimary}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isNotiEnabled}
          />
        </View>
        <Divider />
        <Pressable onPress={onDeletePressed} style={styles.listItem}>
          <Icon
            name="delete-outline"
            size={ICON}
            color={colors.onSurfaceDisabled}
            style={{ marginRight: 14 }}
          />

          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "600",

              color: colors.secondary,
            }}
          >
            Delete Account
          </Text>
        </Pressable>
        <ClearSpace size={2} />
        <CustomButton
          label="Logout"
          onPress={async () => {
            Alert.alert(strings.attention, strings.are_you_sure_logout, [
              {
                text: strings.cancel,
                onPress: () => console.log("Cancel Pressed"),
              },
              {
                text: strings.ok,
                onPress: () => {
                  dispatch(logoutUser(navigation, userInfo.userId));
                },
              },
            ]);
          }}
        />

        <ClearSpace size={8} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  toast: {
    position: "absolute",
    bottom: spacing.HEIGHT_31 * 2,
  },
});
