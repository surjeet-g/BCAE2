import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import AnnouIcon from "../../Assets/svg/anno.svg";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { deleteNdLogoutUser, logoutUser } from "../../Redux/LogoutDispatcher";
import { fetchMyProfileData } from "../../Redux/ProfileDispatcher";
import AnnouncementItem from "../../Screens/Announcement/component/AnnouncementItem";
import { getDataFromDB, saveDataToDB } from "../../Storage/token";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import {
  DEFAULT_PROFILE_IMAGE,
  mockAnnouncementList,
  spacing,
  storageKeys,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { ICON_STYLE } from "../../Utilities/Style/navBar";
import {
  getCustomerUUID,
  getUserId,
} from "../../Utilities/UserManagement/userInfo";
import { useSelector } from "react-redux";
const ICON = 17;

export const ViewProfile = ({ navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  // ref
  const bottomSheetModalRef = useRef(BottomSheetModal);
  // variables
  const snapPoints = useMemo(() => ["60%"], []);
  // callbacks
  const openAnnoncementModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeAnnoncementModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("$$$-handleSheetChanges", index);
  }, []);
  const [userInfo, setUserInfo] = useState({
    email: "",
    profilePicture: null,
    name: "",
    userId: "",
  });
  const [isNotiEnabled, setIsNotiEnabled] = useState(false);
  let profileReducer = useSelector((state) => state.profile);
  let profileResult = profileReducer.savedProfileData;

  useEffect(() => {
    dispatch(fetchMyProfileData(navigation));
    async function getUserID() {
      const userID = await getUserId();
      setUserInfo({
        email: profileResult?.customerContact[0]?.emailId,
        name: `${profileResult?.firstName} ${profileResult?.lastName}`,
        userId: userID,
        profilePicture: profileResult?.customerPhoto,
      });
    }
    getUserID();
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
    fetchMyProfileData,
    logoutUser,
  ]);
  useEffect(() => {
    getDataFromDB(storageKeys.PUSH_NOTIFICATION).then((result) => {
      if (result) {
        setIsNotiEnabled(result.push_notification);
      }
    });
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

  const onFaqPressed = () => {};
  const onAnnouncementPressed = () => {
    openAnnoncementModal();
  };

  const performLogoutDeleUser = () => {
    //while logout we have to reset the data of first two tab as still it has logout info
    // dispatch(deleteNdLogoutUser(props.navigation, profile?.savedProfileData));
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
        <Divider />
        <Pressable onPress={onFaqPressed} style={styles.listItem}>
          <Icon
            name="bank-check"
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
            FAQ
          </Text>
        </Pressable>
        <Divider />
        <Pressable onPress={onAnnouncementPressed} style={styles.listItem}>
          <Icon
            name="arrow-expand-all"
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
            Announcement
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
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BottomSheetScrollView style={styles.contentContainer}>
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
                <TouchableOpacity onPress={closeAnnoncementModal}>
                  <Image
                    style={{ ...ICON_STYLE }}
                    source={require("../../Assets/icons/close_black.png")}
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
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
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
