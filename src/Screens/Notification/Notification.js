import React, { useEffect, useLayoutEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { getNotificationsData } from "../../Redux/NotificationsDispatcher";
import {
  bottomBarHeight,
  color,
  spacing,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language/index";
import { navBar } from "../../Utilities/Style/navBar";
// const dispatchNotifications= useDispatch([Notifications]);

var { height, width } = Dimensions.get("screen");

const Notifications = ({ route, navigation }) => {
  const { colors } = useTheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: () => {
      //   return (
      //     <View style={{ ...navBar.navRightCon, marginLeft: 10 }}>
      //       <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 0 }}>
      //         <Icon
      //           name="close"
      //           size={19}
      //           color={colors.inverseSecondary}
      //         />
      //       </Pressable>
      //     </View>
      //   );
      // },
      headerRight: () => {
        return (
          <View style={navBar.navRightCon}>
            <Pressable
              onPress={() => {
                alert("dsfd");
              }}
              style={{ marginLeft: 0 }}
            >
              <Icon name="delete" size={19} color={colors.inverseSecondary} />
            </Pressable>
          </View>
        );
      },
    });
  }, []);
  const notifications = useSelector((state) => state.notifications);

  // const { fromLogin } = route.params;
  const fromLogin = true;
  const dispatch = useDispatch([getNotificationsData]);

  const fetchNotificationData = () => dispatch(getNotificationsData());

  useEffect(() => {
    fetchNotificationData();
  }, []);
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => console.log(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
      <Pressable
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          console.log(">>", data);
        }}
      >
        <Icon name="delete" size={19} color={colors.inverseSecondary} />
      </Pressable>
    </View>
  );
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };
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
                width: "100%",
              }}
            >
              <SwipeListView
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
                data={notifications?.notificationsData}
                renderItem={({ item }) => {
                  return (
                    <TouchableHighlight
                      style={{
                        ...styles.rowFront,
                        // width: width - spacing.WIDTH_10,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        backgroundColor: "white",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ flex: 0.1, marginRight: "4%" }}>
                          <Image
                            style={styles.editImage}
                            source={require("../../Assets/icons/noti_icon.png")}
                          ></Image>
                        </View>

                        <View style={{ flexDirection: "column", flex: 0.65 }}>
                          <Text>{item?.subject}</Text>
                          <Text style={{ color: "#D72C0D", fontWeight: "500" }}>
                            {item?.title}
                          </Text>
                          <ClearSpace />
                          <Text>{item?.reason}</Text>
                        </View>

                        <View style={{ flexDirection: "column", flex: 0.25 }}>
                          <Text style={{ fontSize: 12 }}>
                            {" "}
                            {moment(item?.createdAt).fromNow()}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  );
                }}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                // rightOpenValue={-75}
                onRowDidOpen={onRowDidOpen}
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
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",

    justifyContent: "center",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
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
export default Notifications;
