import React, {
  useEffect, useState
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
  View
} from "react-native";
import { Button, Divider, Modal, Text, useTheme } from "react-native-paper";
import RNRestart from "react-native-restart";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import AnnouIcon from "../../Assets/svg/anno.svg";
import { ClearSpace } from "../../Components/ClearSpace";
import { deleteNdLogoutUser, logoutUser } from "../../Redux/LogoutDispatcher";
import { fetchMyProfileData } from "../../Redux/ProfileDispatcher";
import AnnouncementItem from "../../Screens/Announcement/component/AnnouncementItem";
import { getDataFromDB, saveDataToDB } from "../../Storage/token";
import {
  DEFAULT_PROFILE_IMAGE,
  mockAnnouncementList,
  spacing,
  storageKeys
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { getLanguage } from "../../Utilities/Language/language";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { commonStyle } from "../../Utilities/Style/commonStyle";
import { ICON_STYLE } from "../../Utilities/Style/navBar";
import { getUserId, getUserType, USERTYPE } from "../../Utilities/UserManagement/userInfo";
const ICON = 25;

export const ViewProfile = ({ navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    profilePicture: null,
    name: "",
    userId: "",
  });
  const [isNotiEnabled, setIsNotiEnabled] = useState(false);
  const [ischangeLanguageModalVisible, setIschangeLanguageModalVisible] =
    useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  let profileReducer = useSelector((state) => state.profile);
  let profileResult = profileReducer.savedProfileData;

  useEffect(() => {
    dispatch(fetchMyProfileData(navigation));
  }, []);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    async function getUserID() {
      const userType = await getUserType();
      console.log(">>rrr", userType);
      setUserType(userType);
      const userID = await getUserId();
      const language = await getLanguage();
      setSelectedLanguage(language.name);
      if (profileResult.typeOfUser == USERTYPE.CUSTOMER) {
        setUserInfo({
          email: profileResult?.customerContact[0]?.emailId,
          name: `${profileResult?.firstName} ${profileResult?.lastName}`,
          userId: userID,
          profilePicture: profileResult?.profilePicture,
        });
      } else {
        console.log("hititn", profileResult);
        setUserInfo({
          email: profileResult?.email,
          name: `${profileResult?.firstName} ${profileResult?.lastName}`,
          userId: userID,
          profilePicture: profileResult?.customerPhoto,
        });
      }
    }
    getUserID();
  }, [profileResult.typeOfUser]);

  // async function getUserID() {
  //   const language = await getLanguage();
  //   const userID = await getUserId();
  //   setSelectedLanguage(language.name);
  //   setUserInfo({
  //     email: profileResult?.email,
  //     name: `${profileResult?.firstName} ${profileResult?.lastName}`,
  //     userId: userID,
  //     profilePicture: profileResult?.customerPhoto,
  //   });
  // }
  // getUserID();

  const showLanguageModal = () => {
    setIschangeLanguageModalVisible(true);
  };

  const closeLanguageModal = () => {
    setIschangeLanguageModalVisible(false);
  };
  const handlechangeLanguage = async (language) => {
    const status = await changeLanguage(language);
    if (status) {
      navigation.navigate("Splash");
      RNRestart.restart();
    } else {
      console.log("somthing wents wrong");
    }
  };
  const selectLanguage = (language) => {
    closeLanguageModal();
    Alert.alert(
      strings.attention,
      "Do you want to change the language to " + language,
      [
        {
          text: strings.cancel,
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: strings.ok,
          onPress: () => {
            switch (language) {
              case "English":
                handlechangeLanguage({ name: "English", langCode: "en" });
                break;
              case "Malay":
                handlechangeLanguage({ name: "Malay", langCode: "ml" });
                break;
              case "Tamil":
                handlechangeLanguage({ name: "Tamil", langCode: "ta" });
                break;
              case "Malayalam":
                handlechangeLanguage({ name: "Malayalam", langCode: "en" });
                break;
              case "Hindi":
                handlechangeLanguage({ name: "Hindi", langCode: "hi" });
                break;
              default:
                break;
            }
          },
        },
      ]
    );
  };

  const toggleSwitch = () => {
    setIsNotiEnabled(!isNotiEnabled);
    saveDataToDB(storageKeys.PUSH_NOTIFICATION, {
      push_notification: !isNotiEnabled,
    }).then(function () {
      Toast.show({
        type: "bctSuccess",
        text1: strings.notification_settings_updated,
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

  const onFaqPressed = () => { };
  const onAnnouncementPressed = () => {
    openAnnoncementModal();
  };

  const performLogoutDeleUser = () => {
    //while logout we have to reset the data of first two tab as still it has logout info
    // dispatch(deleteNdLogoutUser(props.navigation, profile?.savedProfileData));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={commonStyle.row_start}>
          <View>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${userInfo.profileImageData || DEFAULT_PROFILE_IMAGE
                  }`,
              }}
              // imageStyle={{ borderRadius: 80 }}
              style={{
                height: 110,
                width: 110,
                borderRadius: 20,
                elevation: 5,
              }}
            />
          </View>
          <View style={{ marginLeft: 15, marginTop: 20 }}>
            <Text
              variant="bodyLarge"
              style={{ color: "#3E60A0", fontWeight: "600" }}
            >
              {userInfo.name}
            </Text>
            <ClearSpace size={2} />
            <Text
              variant="bodySmall"
              style={{ color: colors.profile_enabled, fontWeight: "500" }}
            >
              {userInfo.email}
            </Text>
          </View>
        </View>

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
            color={colors.profile_enabled}
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
            {"\n"}
            <Text
              variant="bodySmall"
              style={{
                fontWeight: "600",
                color: "gray",
                lineHeight: 20,
              }}
            >
              {strings.change_your_password}
            </Text>
          </Text>
        </Pressable>
        <Divider />
        <ClearSpace size={2} />
        <Pressable onPress={() => showLanguageModal()} style={styles.listItem}>
          <Icon
            name="google-translate"
            size={ICON}
            color={colors.profile_enabled}
            style={{ marginRight: 14 }}
          />

          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "600",
              color: colors.secondary,
            }}
          >
            {strings.change_language}
            {"\n"}
            <Text
              variant="bodySmall"
              style={{
                fontWeight: "600",
                color: "gray",
                lineHeight: 20,
              }}
            >
              {strings.selected_language}: {selectedLanguage}
            </Text>
          </Text>
        </Pressable>
        <Divider />
        {userType == USERTYPE.CUSTOMER &&

          <Pressable
            style={styles.listItem}
            onPress={() => {
              navigation.navigate("SavedLocation");
            }}
          >
            <Icon
              name="map-marker-outline"
              size={ICON}
              color={colors.profile_enabled}
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
              {"\n"}
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: "600",
                  color: "gray",
                  lineHeight: 20,
                }}
              >
                {strings.choose_saved_location}
              </Text>
            </Text>
          </Pressable>
        }
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
              color={colors.profile_enabled}
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
              {"\n"}
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: "600",
                  color: "gray",
                  lineHeight: 20,
                }}
              >
                {strings.notification_alert}
              </Text>
            </Text>
          </Pressable>
          <Switch
            trackColor={{
              false: "#feeeda",
              true: "#F5AD47",
            }}
            thumbColor={isNotiEnabled ? "#F5AD47" : "#feeeda"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isNotiEnabled}
          />
        </View>
        <Divider />
        <Pressable onPress={onFaqPressed} style={styles.listItem}>
          <Icon
            name="bank-check"
            size={ICON}
            color={colors.profile_enabled}
            style={{ marginRight: 14 }}
          />

          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "600",

              color: colors.secondary,
            }}
          >
            {strings.faq}
            {"\n"}
            <Text
              variant="bodySmall"
              style={{
                fontWeight: "600",
                color: "gray",
                lineHeight: 20,
              }}
            >
              {strings.faq}
            </Text>
          </Text>
        </Pressable>
        <Divider />
        <Pressable
          onPress={() => setShowAnnouncementModal(true)}
          style={styles.listItem}
        >
          <Icon
            name="arrow-expand-all"
            size={ICON}
            color={colors.profile_enabled}
            style={{ marginRight: 14 }}
          />

          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "600",

              color: colors.secondary,
            }}
          >
            {strings.announcement}
            {"\n"}
            <Text
              variant="bodySmall"
              style={{
                fontWeight: "600",
                color: "gray",
                lineHeight: 20,
              }}
            >
              {strings.announcement}
            </Text>
          </Text>
        </Pressable>
        <Divider />
        <Pressable onPress={onDeletePressed} style={styles.listItem}>
          <Icon
            name="delete-outline"
            size={ICON}
            color={colors.profile_enabled}
            style={{ marginRight: 14 }}
          />

          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "600",

              color: colors.secondary,
            }}
          >
            {strings.delete_account}
            {"\n"}
            <Text
              variant="bodySmall"
              style={{
                fontWeight: "600",
                color: "gray",
                lineHeight: 20,
              }}
            >
              {strings.delete_your_account}
            </Text>
          </Text>
        </Pressable>

        <ClearSpace size={2} />

        <Button
          style={{
            padding: 2,
            borderRadius: 21,
            width: "70%",
            alignSelf: "center",
          }}
          icon="logout"
          mode="contained"
          // color={"white"}
          buttonColor={"#4C5A81"}
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
        >
          {strings.logout}
        </Button>

        <ClearSpace size={8} />
      </ScrollView>
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
        </View>
      </Modal>
      {
        ischangeLanguageModalVisible && (
          <View style={styles.changeLanguageContainer}>
            <View
              style={{
                ...commonStyle.row_start,
                ...commonStyle.borderBottom,
                width: "100%",
                paddingVertical: 10,
              }}
            >
              <Text
                variant="bodyLarge"
                style={{
                  flex: 0.9,
                  textAlign: "center",
                  fontWeight: "700",
                  color: colors.secondary,
                }}
              >
                Change Language
              </Text>
              <TouchableOpacity
                onPress={closeLanguageModal}
                style={{ flex: 0.1 }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../Assets/icons/close_black.png")}
                />
              </TouchableOpacity>
            </View>
            <Divider />
            <View>
              <Pressable
                onPress={() => selectLanguage("English")}
                style={{
                  ...commonStyle.row_space_arround_evenly,
                  width: "50%",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: "600",
                      color: colors.secondary,
                    }}
                  >
                    English
                  </Text>
                  {selectedLanguage == "English" && (
                    <Icon name="hand-pointing-left" size={25} color={"red"} />
                  )}
                </View>
              </Pressable>
              <Divider></Divider>
            </View>
            <View>
              <Pressable
                onPress={() => selectLanguage("Malay")}
                style={{
                  ...commonStyle.row_space_arround_evenly,
                  width: "50%",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: "600",
                      color: colors.secondary,
                    }}
                  >
                    Malay
                  </Text>
                  {selectedLanguage == "Malay" && (
                    <Icon name="hand-pointing-left" size={25} color={"red"} />
                  )}
                </View>
              </Pressable>
              <Divider></Divider>
            </View>
            <View>
              <Pressable
                onPress={() => selectLanguage("Tamil")}
                style={{
                  ...commonStyle.row_space_arround_evenly,
                  width: "50%",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: "600",
                      color: colors.secondary,
                    }}
                  >
                    Tamil
                  </Text>
                  {selectedLanguage == "Tamil" && (
                    <Icon name="hand-pointing-left" size={25} color={"red"} />
                  )}
                </View>
              </Pressable>
              <Divider></Divider>
            </View>
            <View>
              <Pressable
                onPress={() => selectLanguage("Malayalam")}
                style={{
                  ...commonStyle.row_space_arround_evenly,
                  width: "50%",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: "600",
                      color: colors.secondary,
                    }}
                  >
                    Malayalam
                  </Text>
                  {selectedLanguage == "Malayalam" && (
                    <Icon name="hand-pointing-left" size={25} color={"red"} />
                  )}
                </View>
              </Pressable>
              <Divider></Divider>
            </View>
            <View>
              <Pressable
                onPress={() => selectLanguage("Hindi")}
                style={{
                  ...commonStyle.row_space_arround_evenly,
                  width: "50%",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: "600",
                      color: colors.secondary,
                    }}
                  >
                    Hindi
                  </Text>
                  {selectedLanguage == "Hindi" && (
                    <Icon name="hand-pointing-left" size={25} color={"red"} />
                  )}
                </View>
              </Pressable>
              <Divider></Divider>
            </View>
          </View>
        )
      }
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  modalContainer: {
    padding: 10,
    height: "70%",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
  changeLanguageContainer: {
    width: "90%",
    top: "20%",
    flex: 1,
    position: "absolute",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 1,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    paddingBottom: 20,
    marginBottom: 0,
    alignItems: "center",
    // marginTop: 20,
  },
});
