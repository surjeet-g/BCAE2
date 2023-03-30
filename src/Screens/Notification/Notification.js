import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { strings } from "../../Utilities/Language/index";
import {
  bottomBarHeight,
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../../Utilities/Constants/Constant";
import { commonStyle } from "../../Utilities/Style/commonStyle";
import { getNotificationsData } from "../../Redux/NotificationsDispatcher";
import moment from "moment";
import LoadingAnimation from "../../Components/LoadingAnimation";
// const dispatchNotifications= useDispatch([Notifications]);

var { height, width } = Dimensions.get("screen");

const Notification = ({ route, navigation }) => {
  const notifications = useSelector((state) => state.notifications);

  // const { fromLogin } = route.params;
  const fromLogin = true;
  const dispatch = useDispatch([getNotificationsData]);

  const fetchNotificationData = () => dispatch(getNotificationsData());

  useEffect(() => {
    fetchNotificationData();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={
          fromLogin ? styles.outerContainerFromLogin : styles.outerContainer
        }
      >
        <View style={styles.innerContainer}>
          {notifications.initNotifications && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 200,
              }}
            >
              <LoadingAnimation></LoadingAnimation>
            </View>
          )}

          {!notifications?.initNotifications &&
          !notifications?.isNotificationsError &&
          notifications?.notificationsData?.length > 0 ? (
            <View
              style={{
                margin: 5,
                flex: 1,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={notifications?.notificationsData}
                ItemSeparatorComponent={() => <View style={styles.line} />}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: width - spacing.WIDTH_10,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        backgroundColor: "red",
                      }}
                    >
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 0.1 }}>
                          <Image
                            style={styles.editImage}
                            source={require("../../Assets/icons/noti_icon.png")}
                          ></Image>
                        </View>
                        <View style={{ flexDirection: "column", flex: 0.7 }}>
                          <Text>{item?.subject}</Text>
                          <Text>{item?.title}</Text>
                          <Text>{item?.reason}</Text>
                        </View>
                        <View style={{ flexDirection: "column", flex: 0.2 }}>
                          <Text>time</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {notifications?.initNotifications ? (
                <Text style={styles.emptyList}>{strings.please_wait}</Text>
              ) : (
                <Text style={styles.emptyList}>
                  {!notifications?.notificationsData?.errorCode === "10001"
                    ? strings.no_internet
                    : strings.empty_notification_list}
                </Text>
              )}
            </View>
          )}

          {!notifications?.initNotifications &&
            notifications?.isNotificationsError && (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.emptyList}>
                  {!notifications?.notificationsData?.errorCode === "10001"
                    ? strings.no_internet
                    : ""}
                </Text>
              </View>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roundIcon: {
    width: spacing.WIDTH_8,
    height: spacing.WIDTH_8,
    borderRadius: spacing.WIDTH_8,
  },
  line: {
    marginVertical: spacing.HEIGHT_20,
    marginLeft: spacing.WIDTH_40,
    width: width - spacing.WIDTH_40,
    height: 0.5,
    backgroundColor: color.DISABLED_GREY,
  },
  outerContainer: {
    flex: 1,
    marginBottom: bottomBarHeight,
    backgroundColor: color.WHITE,
    alignItems: "center",
  },
  outerContainerFromLogin: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: color.WHITE,
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: color.WHITE,
    alignItems: "center",
  },
  bottomView: {
    flex: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  emptyList: {
    fontSize: 20,
    color: color.BCAE_PRIMARY,
  },
});
export default Notification;
