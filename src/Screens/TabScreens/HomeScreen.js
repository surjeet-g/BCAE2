import get from "lodash.get";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Slider,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import { getAppointmentDashboardData } from "../../Redux/AppointmentDashboardDispatcher";
import { getCustomerAccountData } from "../../Redux/CustomerAccountDispatcher";
import { getInteractionListData } from "../../Redux/InteractionListDispatcher";
import { getOrderListData } from "../../Redux/OrderListDispatcher";
import { DATE_FORMAT } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { getCustomerUUID } from "../../Utilities/UserManagement/userInfo";

var { height, width } = Dimensions.get("screen");





/**
 * HomeScreen : Home screen showing KPI information 
 * @namespace HomeScreen  
 */
export const HomeScreen = ({ navigation }) => {

  const { colors, fonts, roundness } = useTheme();
  let customerAccount = useSelector((state) => state.customerAccount);
  let interactionList = useSelector((state) => state.interactionList);
  const appoinmentListRed = useSelector((state) => state.dashboardAppointments);
  console.log("appoinment data",
  )
  const [marked, setMarkedDate] = useState(["2023-07-07"])
  let orderList = useSelector((state) => state.orderList);
  const [showIn, setShowIndex] = useState(0)
  const dispatch = useDispatch([
    getCustomerAccountData,
    getInteractionListData,
    getOrderListData,
    getAppointmentDashboardData
  ]);
  //set appoinment 
  useEffect(() => {
    const appoinments = get(appoinmentListRed, 'appointmentDashboardData', [])
    if (appoinments.length > 0) {
      const result = appoinments.map(item => {
        return item.appointDate
      })
      // console.log("resukt", result)
      //console.log("appoinmentListRed.appointmentDashboardData", appoinmentListRed.appointmentDashboardData)
      setMarkedDate(result)
    }
  }, [appoinmentListRed.appointmentDashboardData])

  useEffect(() => {
    /**
  * fetch user information (account,interaction,appointment)
  * @memberOf HomeScreen
  */
    async function fetchAccountAPI() {
      const customerUUDI = await getCustomerUUID();
      dispatch(getCustomerAccountData(navigation, customerUUDI));
      dispatch(getInteractionListData(navigation, 1));
      dispatch(getOrderListData(navigation, 1));
      dispatch(getAppointmentDashboardData())
    }
    fetchAccountAPI();
  }, []);

  const onHandleAppointment = () => {
    navigation.navigate("Appointment");
  };
  /**
  * provide horizontal scroll view with tabs for KPI data
  * @memberOf HomeScreen
  * @param  {Object} props each tab details
  * @returns {JSX} Return JSX
  */
  const FlatListItemTop = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          width: 140,
          height: 140,
          margin: 5,
          padding: 15,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          {/* Title & Image View */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: colors.secondary,
              }}
            >
              {item.title || "No Name"}
            </Text>

            <Image
              source={require("../../Assets/icons/frequent_interaction.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
          {/*required Text to sho like amount */}
          {index === 0 && (
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: colors.yellow,
              }}
            >
              {"RS. "}
              {get(
                customerAccount,
                "customerAccountData[0].accountBalance",
                "NA"
              )}
            </Text>
          )}
          {index === 1 && (
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: colors.yellow,
              }}
            >
              {"70 % Utilization"}
            </Text>
          )}

          {index === 1 && (
            <Slider
              step={1}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#009688"
              value={70}
              style={{ width: "100%" }}
            />
          )}
          {/* View More view */}
          <View style={styles.bottomView}>
            <TouchableOpacity
            // onPress={() => setShowIndex(index)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              // onPress={() => setShowIndex(index)}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#EFA848",
                  }}
                >
                  {strings.view_more}
                </Text>
                <Image
                  source={require("../../Assets/icons/right_arrow.png")}
                  style={{ marginLeft: 20, tintColor: "#EFA848" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const FlatListItemBottom = (props) => {
    const HEADER_INDEX = { ORDER: 0, INTERACTION: 1, APPOINMENT: 2 }
    const { item, index } = props;
    return (
      <View
        style={{
          width: 150,
          height: 140,
          margin: 5,
          padding: 15,
          backgroundColor:
            index === 0 ? "#5E5676" : index === 1 ? "#EFA848" : "#CA404A",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          {/* Title & Image View */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color:
                  index === 0 ? "#ffffff" : index === 1 ? "#775324" : "#ffffff",
              }}
            >
              {item.title || "No Name"}
            </Text>
            <ClearSpace size={3} />


            {/* <Image
              source={require("../../Assets/icons/frequent_interaction.png")}
              style={{ width: 50, height: 50 }}
            /> */}
          </View>
          {/*required Text to sho like amount */}
          {index === 0 && (
            <View>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {/* Id: {orderList?.orderListData[0]?.intxnId || "NA"} */}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {/* Date :
                {moment(orderList?.orderListData[0]?.createdAt).format(
                  DATE_FORMAT
                )} */}
              </Text>
            </View>
          )}
          {index === 1 && (
            <View>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                Id: {interactionList?.interactionListData[0]?.intxnId || "NA"}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {strings.date} :
                {moment(
                  interactionList?.interactionListData[0]?.createdAt
                ).format(DATE_FORMAT)}
              </Text>
            </View>
          )}
          {index === 2 && (
            <View>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {"Appt. ID : 1234"}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {strings.date}:{"10 Jan 2023"}
              </Text>
            </View>
          )}
          {/* View More view */}
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => {
                if (index == HEADER_INDEX.INTERACTION) {
                  if (interactionList?.interactionListData[0]?.intxnId) {
                    navigation.navigate(STACK_INTERACTION_DETAILS, {
                      interactionID: interactionList?.interactionListData[0]?.intxnId
                    })
                  }
                }
                else {
                  // onHandleAppointment()
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color:
                      index === 0
                        ? "#ffffff"
                        : index === 1
                          ? "#775324"
                          : "#ffffff",
                  }}
                >
                  {strings.view_more}
                </Text>
                <Image
                  source={require("../../Assets/icons/right_arrow.png")}
                  style={{
                    marginLeft: 20,
                    tintColor:
                      index === 0
                        ? "#ffffff"
                        : index === 1
                          ? "#775324"
                          : "#ffffff",
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (

    <View style={styles.container}>
      <Pressable
        onPress={() => {
          openWhatsApp(SUPPORT_NUM)
        }}
        style={{
          position: "absolute",
          bottom: height * 0.15,
          right: 20,
          flex: 1,
          elevation: 999,
          zIndex: 99999999,
          height: 50,
          width: 50,
        }}
      >
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          source={require("../../Assets/icons/floating_whatsapp.png")}
        />
      </Pressable>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              color: "#2B2B2B",
              fontSize: 16,
              fontWeight: "600",
              padding: 5,
              marginLeft: 10,
            }}
          >
            {strings.account_details}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              initialNumToRender={2}
              data={[
                { title: strings.balance },
                { title: strings.usage },
                { title: strings.not_available },
              ]}
              renderItem={({ item, index }) => (
                <FlatListItemTop item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
          <Text
            style={{
              color: "#2B2B2B",
              fontSize: 16,
              fontWeight: "600",
              padding: 5,
              marginLeft: 10,
            }}
          >
            {strings.appointment}
          </Text>
          <View style={{ margin: 10 }}>
            <CustomCalendar
              marked={marked}
              onDaySelect={(day) =>
                console.log(`Date selected: ${day.dateString}`)
              }
            />
          </View>
          <Text
            style={{
              color: "#2B2B2B",
              fontSize: 16,
              fontWeight: "600",
              padding: 5,
              marginLeft: 10,
            }}
          >
            {strings.history}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              initialNumToRender={2}
              data={[
                { title: strings.order },
                { title: strings.interaction },
                { title: strings.appointment },
              ]}
              renderItem={({ item, index }) => (
                <FlatListItemBottom item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
        <ClearSpace size={20} />
      </ScrollView>
    </View>
  );
};

/**
  * Provide UI for calender 
  * By using package react-native-calendars"
  * @memberOf HomeScreen
  * @param  {Object} props each tab details
  * @returns {JSX} Return JSX
  */
export const CustomCalendar = (props) => {
  const initDate = new Date().toString();
  const [selected, setSelected] = useState(initDate);
  const [showIndex, setShowIndex] = useState(0);
  const marked = props.marked

  // const marked = useMemo(
  //   () => ({
  //     [selected]: {
  //       selected: true,
  //       selectedColor: "#000000",
  //       selectedTextColor: "red",
  //     },
  //   }),
  //   [selected]
  // );

  return (
    <Calendar
      style={{
        paddingBottom: 12,
        borderRadius: 10,
      }}
      theme={{
        "stylesheet.calendar.header": {
          dayTextAtIndex0: {
            color: "white",
            backgroundColor: "red",
          },
          dayTextAtIndex6: {
            color: "white",
            backgroundColor: "red",
          },
          dayTextAtIndex1: {
            color: "black",
            backgroundColor: "#F5AD47",
          },
          dayTextAtIndex2: {
            color: "black",
            backgroundColor: "#F5AD47",
          },
          dayTextAtIndex3: {
            color: "black",
            backgroundColor: "#F5AD47",
          },
          dayTextAtIndex4: {
            color: "black",
            backgroundColor: "#F5AD47",
          },
          dayTextAtIndex5: {
            color: "black",
            backgroundColor: "#F5AD47",
          },
        },
        "stylesheet.calendar.main": {
          dayContainer: {
            borderColor: "#ffffff",
            borderWidth: 2,
            backgroundColor: "#E1E4EB",
            flex: 1,
          },
          emptyDayContainer: {
            borderColor: "#D1D3D4",
            borderWidth: 1,
            flex: 1,
            padding: 5,
          },
          week: {
            marginTop: 0,
            marginBottom: 0,
            flexDirection: "row",
            justifyContent: "space-around",
          },
        },
      }}
      dayComponent={({ date, state }) => {
        return (
          <View
            style={{
              flex: 1,
              paddingTop: 5,
              backgroundColor:
                marked.indexOf(
                  "" +
                  moment(
                    date?.year + "-" + date?.month + "-" + date?.day
                  ).format("YYYY-MM-DD")
                ) > -1 &&
                  moment(date?.year + "-" + date?.month + "-" + date?.day).format(
                    "YYYY-MM-DD"
                  ) < moment(new Date()).format("YYYY-MM-DD")
                  ? "green"
                  : marked.indexOf(
                    "" +
                    moment(
                      date?.year + "-" + date?.month + "-" + date?.day
                    ).format("YYYY-MM-DD")
                  ) > -1 &&
                    moment(
                      date?.year + "-" + date?.month + "-" + date?.day
                    ).format("YYYY-MM-DD") >
                    moment(new Date()).format("YYYY-MM-DD")
                    ? "#F5AD47"
                    : "#E1E4EB",
            }}
          >
            <Text
              style={
                ([
                  styles.customDay,
                  state == "disabled"
                    ? styles.disabledText
                    : styles.defaultText,
                ],
                {
                  color: state == "disabled" ? "gray" : "#000000",
                  // color:
                  //   marked.indexOf(
                  //     "" +
                  //     moment(
                  //       date?.year + "-" + date?.month + "-" + date?.day
                  //     ).format("YYYY-MM-DD")
                  //   ) > -1
                  //     ? "white"
                  //     : "black",
                  textAlign:
                    marked.indexOf(
                      "" +
                      moment(
                        date?.year + "-" + date?.month + "-" + date?.day
                      ).format("YYYY-MM-DD")
                    ) > -1
                      ? "right"
                      : "center",
                  fontSize:
                    marked.indexOf(
                      "" +
                      moment(
                        date?.year + "-" + date?.month + "-" + date?.day
                      ).format("YYYY-MM-DD")
                    ) > -1
                      ? 5
                      : 10,
                  paddingRight:
                    marked.indexOf(
                      "" +
                      moment(
                        date?.year + "-" + date?.month + "-" + date?.day
                      ).format("YYYY-MM-DD")
                    ) > -1
                      ? 5
                      : 0,
                })
              }
            >
              {date?.day}
              {/* {console.log(
                moment(date?.year + "-" + date?.month + "-" + date?.day).format(
                  "YYYY-MM-DD"
                )
              )} */}

              {/* {
                console.log(
                  marked.indexOf(
                    "" +
                    moment(
                      date?.year + "-" + date?.month + "-" + date?.day
                    ).format("YYYY-MM-DD")
                  ) > -1
                )
                // console.log(item.name);
                // console.log(date?.year + "-" + date?.month + "-" + date?.day);
              } */}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 5,
                paddingBottom: 5,
                color:
                  marked.indexOf(
                    "" +
                    moment(
                      date?.year + "-" + date?.month + "-" + date?.day
                    ).format("YYYY-MM-DD")
                  ) > -1 &&
                    moment(
                      date?.year + "-" + date?.month + "-" + date?.day
                    ).format("YYYY-MM-DD") <
                    moment(new Date()).format("YYYY-MM-DD")
                    ? "white"
                    : marked.indexOf(
                      "" +
                      moment(
                        date?.year + "-" + date?.month + "-" + date?.day
                      ).format("YYYY-MM-DD")
                    ) > -1 &&
                      moment(
                        date?.year + "-" + date?.month + "-" + date?.day
                      ).format("YYYY-MM-DD") >
                      moment(new Date()).format("YYYY-MM-DD")
                      ? "black"
                      : "black",
              }}
            >
              {marked.indexOf(
                "" +
                moment(
                  date?.year + "-" + date?.month + "-" + date?.day
                ).format("YYYY-MM-DD")
              ) > -1 &&
                moment(date?.year + "-" + date?.month + "-" + date?.day).format(
                  "YYYY-MM-DD"
                ) < moment(new Date()).format("YYYY-MM-DD")
                ? strings.completed_appointment
                : marked.indexOf(
                  "" +
                  moment(
                    date?.year + "-" + date?.month + "-" + date?.day
                  ).format("YYYY-MM-DD")
                ) > -1 &&
                  moment(
                    date?.year + "-" + date?.month + "-" + date?.day
                  ).format("YYYY-MM-DD") >
                  moment(new Date()).format("YYYY-MM-DD")
                  ? strings.upcoming_appointment
                  : ""}
            </Text>
          </View>
        );
      }}
      current={initDate}
      // markedDates={marked}
      markingType={"custom"}
      onDayPress={(day) => {
        setSelected(day.dateString);
        props.onDaySelect && props.onDaySelect(day);
      }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: -20, //Here is the trick
  },
  disabledText: {
    color: "red",
  },
  defaultText: {
    color: "#000000",
  },
  customDay: {
    textAlign: "center",
  },
  floatingImg: {
    width: "10%",
    position: "absolute",
    right: 0,
    marginRight: 10,
  },
});
