import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Avatr from "../../Assets/svg/avtr_full.svg";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../Utilities/Language";

import { ICON_STYLE } from "../../Utilities/Style/navBar";
import {
  fetchSavedProfileData,
  logoutUser,
} from "../../Redux/ProfileDispatcher";
import { getDataFromDB } from "../../Storage/token";
import { storageKeys } from "../../Utilities/Constants/Constant";
import { deleteNdLogoutUser } from "../../Redux/LogoutDispatcher";
const ICON = 17;
export const ViewProfile = () => {
  const { colors, fonts, roundness } = useTheme();
  let profile = useSelector((state) => state.profile);

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
        <Avatr />
        <ClearSpace size={2} />
        <Text
          variant="bodyMedium"
          style={{ color: "#3E60A0", fontWeight: "600" }}
        >
          Rohit sharma
        </Text>
        <ClearSpace size={1} />
        <Text
          variant="bodySmall"
          style={{ color: colors.onSurfaceDisabled, fontWeight: "500" }}
        >
          vvvipindsm@gmail.com
        </Text>
        <ClearSpace size={2} />
        <Pressable
          onPress={() => {
            alert("To do");
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
            Change Password
          </Text>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => {
            alert("To do");
          }}
          style={styles.listItem}
        >
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
            Saved Location
          </Text>
        </Pressable>
        <Divider />
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
            Notification Alert
          </Text>
        </Pressable>
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
                  dispatch(
                    logoutUser(
                      props.navigation,
                      profile?.savedProfileData?.userId
                    )
                  );
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
});
