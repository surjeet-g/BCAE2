import React, {
  useEffect, useLayoutEffect, useState
} from "react";
import {
  Dimensions, FlatList,
  Image, Pressable,
  ScrollView,
  StyleSheet, TouchableOpacity,
  View,
  Modal
} from "react-native";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import Timetable from "react-native-calendar-timetable";
import { Calendar } from 'react-native-calendars';
import { Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChartItems } from '../../Components/charts/BarChartItems';
import { LineCharts } from '../../Components/charts/LineCharts';
import { PieCharts } from '../../Components/charts/PieCharts';
import { ProgressBarCharts } from '../../Components/charts/ProgressBarCharts';
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from '../../Components/CustomButton';
import { ToggleButton } from "../../Components/ToggleButton";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language/index";
import { commonStyle } from '../../Utilities/Style/commonStyle';
import { navBar } from "../../Utilities/Style/navBar";
import { subString } from "../../Utilities/utils";


const TAB_INTERACTIVE = true;
const TAB_INFORMATIVE = false;

export const Appointment = ({ navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  const [isFirstSelected, setFirstSelected] = useState(TAB_INTERACTIVE);
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const { height, width } = Dimensions.get("screen");
  const changeCalendarModalVisibility = () => {
    setIsCalendarModalVisible(true);
  };
  const [selected, setSelected] = useState(new Date().toString());
  const marked = ["2023-03-08", "2023-03-18", "2023-03-23", "2023-03-28"];

  const hideCalendarModal = () => setIsCalendarModalVisible(false);
  const SLOTS = [
    {
      id: "1",
      isAvailable: true,
      name: "09.00 - 10.00 ",
    },
    {
      id: "",
      isAvailable: false,
      name: "10.00 - 11.00 ",
    },
    {
      id: "3",
      isAvailable: true,
      name: "11.00 - 12.00 ",
    },
    {
      id: "4",
      isAvailable: false,
      name: "12.00 - 01.00 ",
    },
    {
      id: "5",
      isAvailable: true,
      name: "02.00 - 03.00 ",
    },
    {
      id: "6",
      isAvailable: true,
      name: "03.00 - 04.00 ",
    },
    {
      id: "7",
      isAvailable: false,
      name: "04.00 - 05.00 ",
    },
  ];


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Pressable
            style={{ ...navBar.roundIconColored, backgroundColor: "#8FA1C4" }}
          >
            <Icon name="plus" size={25} color={"#fff"} />
          </Pressable>
        </>
      ),
    });
  }, [navigation]);

  const RenderInformative = () => {
    return (
      <>
        <ClearSpace />
        <Text style={styles.caption}>
          Reports by Appointment Type
        </Text>
        <ClearSpace size={4} />
        <BarChartItems />
        <ClearSpace size={4} />
        <Text style={styles.caption}>
          Reports by Appointment
        </Text>
        <ClearSpace size={4} />
        <PieCharts />
        <ClearSpace size={4} />
        <Text style={styles.caption}>
          Average customer age
        </Text>
        <ClearSpace size={4} />
        <LineCharts />
        <ClearSpace size={4} />
        <Text style={styles.caption}>
          Average customer age
        </Text>
        <ClearSpace size={4} />
        <ProgressBarCharts />
      </>
    )
  }

  const FlatListItemTop = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          width: 140,
          height: 100,
          margin: 5,
          padding: 15,
          backgroundColor: "#FFF",
          borderRadius: 3,
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
                color: colors.secondary,
              }}
            >
              {item.title || "No Name"}
            </Text>
          </View>
          {/*required Text to sho like amount */}

          {/* View More view */}
          <View style={styles.bottomView}>
            <TouchableOpacity
            //onPress={() => setShowIndex(index)}
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

  let startDate = moment(); // today
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState("");

  useEffect(() => {
    async function getSelectedDate() {
      // setSelectedDate(moment(moment()).format("YYYY-MM-DD"));
    }
    getSelectedDate();
  }, []);
  const onDateSelected = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
  };
  let datesWhitelist = [
    {
      start: moment().add(-60, "days"),
      end: moment().add(60, "days"), // total 4 days enabled
    },
  ];
  let datesBlacklist = []; // 1 day disabled

  const AppointItems = ({ style, item, dayIndex, daysTotal }) => {
    console.log('>>', item.endDate.diff(item.startDate, 'minutes'), item.startDate
    )
    const isSmallStrip = (item.endDate.diff(item.startDate, 'minutes')) < 45 ? true : false

    return (
      <View
        style={{
          ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
          backgroundColor: item.isAudio ? "#95B9C7" : "#BF97D4",
          borderRadius: 10,
          elevation: 5,
          padding: 5,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: isSmallStrip ? 0.5 : 0.7,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: item.isAudio ? "#0C6B90" : "#652087" }}>
                {subString(item.title, isSmallStrip ? 10 : 90)}
              </Text>
            </View>
            <View style={{ flex: 0.3, flexDirection: 'row' }}>
              {item.isAudio && (
                <Image source={require("../../Assets/icons/audio_join.png")} />
              )}
              {!item.isAudio && (
                <Image source={require("../../Assets/icons/video_join.png")} />
              )}
              {isSmallStrip &&
                <>
                  <Image style={{ marginHorizontal: 3 }}
                    source={require("../../Assets/icons/appointment_edit.png")}
                  />
                  <Image
                    style={{ marginRight: 10 }}
                    source={require("../../Assets/icons/appointment_mask.png")}
                  />
                </>}

            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            {!isSmallStrip &&
              <View
                style={{
                  flex: 0.7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: item.isAudio ? "#0C6B90" : "#652087",
                    fontSize: 10,
                  }}
                >
                  {moment(item.startDate).format("hh-mm A")} -
                  {moment(item.endDate).format("hh-mm A")}
                </Text>
              </View>
            }
            {!isSmallStrip &&
              <View style={{ flex: 0.3 }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ marginRight: 10 }}
                    source={require("../../Assets/icons/appointment_mask.png")}
                  />

                  <Image
                    source={require("../../Assets/icons/appointment_edit.png")}
                  />
                </View>
              </View>
            }
          </View>
        </View>
      </View>
    );
  };
  let i = 0;
  const HourComponent = ({ props }) => {
    i = i + 1;
    return (
      <View
        style={{
          flex: 1,
          // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
          backgroundColor: "white",
          borderRadius: 10,
          elevation: 5,
          padding: 5,
        }}
      >
        {/* {alert(moment(new Date()).format("YYYY-MM-DD hh-mm-ss"))} */}
        {i == 1 && <Text style={{ fontSize: 8 }}>12:00 AM </Text>}
        {i == 2 && <Text style={{ fontSize: 8 }}>1:00 AM</Text>}
        {i == 3 && <Text style={{ fontSize: 8 }}>2:00 AM</Text>}
        {i == 4 && <Text style={{ fontSize: 8 }}>3:00 AM</Text>}
        {i == 5 && <Text style={{ fontSize: 8 }}>4:00 AM</Text>}
        {i == 6 && <Text style={{ fontSize: 8 }}>5:00 AM</Text>}
        {i == 7 && <Text style={{ fontSize: 8 }}>6:00 AM</Text>}
        {i == 8 && <Text style={{ fontSize: 8 }}>7:00 AM</Text>}
        {i == 9 && <Text style={{ fontSize: 8 }}>8:00 AM</Text>}
        {i == 10 && <Text style={{ fontSize: 8 }}>9:00 AM</Text>}
        {i == 11 && <Text style={{ fontSize: 8 }}>10:00 AM</Text>}
        {i == 12 && <Text style={{ fontSize: 8 }}>11:00 AM</Text>}
        {i == 13 && <Text style={{ fontSize: 8 }}>12:00 PM</Text>}
        {i == 14 && <Text style={{ fontSize: 8 }}>1:00 PM</Text>}
        {i == 15 && <Text style={{ fontSize: 8 }}>2:00 PM</Text>}
        {i == 16 && <Text style={{ fontSize: 8 }}>3:00 PM</Text>}
        {i == 17 && <Text style={{ fontSize: 8 }}>4:00 PM</Text>}
        {i == 18 && <Text style={{ fontSize: 8 }}>5:00 PM</Text>}
        {i == 19 && <Text style={{ fontSize: 8 }}>6:00 PM</Text>}
        {i == 20 && <Text style={{ fontSize: 8 }}>7:00 PM</Text>}
        {i == 21 && <Text style={{ fontSize: 8 }}>8:00 PM</Text>}
        {i == 22 && <Text style={{ fontSize: 8 }}>9:00 PM</Text>}
        {i == 23 && <Text style={{ fontSize: 8 }}>10:00 PM</Text>}
        {i == 24 && <Text style={{ fontSize: 8 }}>11:00 PM</Text>}
        {i == 25 && <Text style={{ fontSize: 8 }}>12:00 AM</Text>}
      </View>
    );
  };
  const [date] = React.useState(new Date());
  const [from] = React.useState(moment().subtract(1, "hours").toDate());
  const [till] = React.useState(moment().add(1, "hours").toDate());
  const range = { from, till };

  const [items] = React.useState([
    {
      title: "Payment not working",
      isAudio: true,
      startDate: moment("2023-04-03 0:45:00"),
      endDate: moment("2023-04-03 1:45:00"),
    },
    {
      title: "New connection",
      isAudio: false,
      startDate: moment("2023-04-03 2:00:00"),
      endDate: moment("2023-04-03 2:30:00"),
    },
    {
      title: "Billing Problems",
      isAudio: true,
      startDate: moment("2023-04-03 3:45:00"),
      endDate: moment("2023-04-03 4:45:00"),
    },
    {
      title: "Postpaid connection address change",
      isAudio: false,
      startDate: moment("2023-04-03 12:45:00"),
      endDate: moment("2023-04-03 15:45:00"),
    },
  ]);
  return (
    <>
      {isCalendarModalVisible &&
        <View style={{
          position: "absolute",
          zIndex: 99999,
          // justifyContent: "center",
          width: width,
          height: height,
          left: -5,

          alignItems: "center"
        }}>


          <Calendar
            style={{
              paddingBottom: 12,
              borderRadius: 10,
              width: width * 0.9,
              height: height * 0.6
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
            current={new Date().toString()}
            dayComponent={({ date, state }) => {
              return (
                <View
                  style={{
                    // flex: 1,
                    height: height * .1,
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
                        state === "disabled"
                          ? styles.disabledText
                          : styles.defaultText,
                      ],
                      {
                        color:
                          marked.indexOf(
                            "" +
                            moment(
                              date?.year + "-" + date?.month + "-" + date?.day
                            ).format("YYYY-MM-DD")
                          ) > -1
                            ? "white"
                            : "black",
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
            // markedDates={marked}
            markingType={"custom"}
            onDayPress={(day) => {
              setSelected(day.dateString);
              // props.onDaySelect && props.onDaySelect(day);
            }}
          />
          <View style={{
            ...commonStyle.row_space_arround,
            marginTop: height * 0.13,
            backgroundColor: "white",
            width: width * .88,
            zIndex: 9
          }}>
            <CustomButton label="Close"
              onPress={() => {
                setIsCalendarModalVisible(false)
              }}
            />
            <CustomButton label="Save"
              onPress={() => { alert("save") }}
            />
          </View>

          <Pressable
            onPress={() => {
              setIsCalendarModalVisible(false)
            }}
            style={{
              left: -4,
              position: "absolute",
              width: width, height: height,
              backgroundColor: "gray",
              opacity: .7,
              zIndex: -1
            }} />


        </View>

      }
      <View style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View
            style={{
              backgroundColor: "transparent",
              padding: 12,
            }}
          >
            <ToggleButton
              isFirstSelected={isFirstSelected}
              label={{
                first: strings.tab_interactive,
                second: strings.tab_informative,
              }}
              bgColor={{
                selected: color.BCAE_PRIMARY,
                unselected: color.APPOINTMENT_BACKGROUND,
              }}
              textColor={{
                selected: color.WHITE,
                unselected: color.BCAE_PRIMARY,
              }}
              textPro={{
                fontSize: fontSizes.FONT_13,
                fontWeight: "600",
                lineHeight: spacing.HEIGHT_16,
              }}
              onPressFirst={async () => {
                setFirstSelected(TAB_INTERACTIVE);
              }}
              onPressSecond={() => {
                setFirstSelected(TAB_INFORMATIVE);
              }}
            ></ToggleButton>

          </View>
          {(isFirstSelected) ?
            <>
              <Text
                style={{
                  color: "#2B2B2B",
                  fontSize: 16,
                  fontWeight: "600",
                  padding: 5,
                  marginLeft: 10,
                }}
              >
                {strings.appointment_list}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  initialNumToRender={2}
                  data={[
                    { title: strings.upcoming_appointments },
                    { title: strings.completed_appointments },
                    { title: strings.cancelled_appointments },
                  ]}
                  renderItem={({ item, index }) => (
                    <FlatListItemTop item={item} index={index} />
                  )}
                  keyExtractor={(item, index) => index}
                />
              </View>

              <View style={commonStyle.row_space_arround_between_center}>
                <Text
                  style={{
                    color: "#2B2B2B",
                    fontSize: 16,
                    fontWeight: "600",
                    padding: 5,
                    marginLeft: 10,
                  }}
                >
                  {strings.calendar}
                </Text>
                <Pressable
                  style={{ marginRight: 15 }}
                  onPress={() => {
                    changeCalendarModalVisibility();
                  }}
                >
                  <Icon name="calendar" size={25} color={"#000"} />
                </Pressable>
              </View>

              <View
                style={{
                  margin: 10,
                  flex: 1,
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  elevation: 5,
                }}
              >

                <CalendarStrip

                  calendarAnimation={{ type: "sequence", duration: 30 }}
                  daySelectionAnimation={{
                    type: "background",
                    duration: 300,
                    highlightColor: "#EFA848",
                  }}
            style={{ height: 100, paddingTop: 10, paddingBottom: 10 }}
                  calendarHeaderStyle={{ color: "black" }}
                  calendarColor={"#ffffff"}
                  monthNameStyle={{ color: "black" }}
                  dateNumberStyle={{ color: "black" }}
                  dateNameStyle={{ color: "black" }}
                  highlightDateNumberStyle={{ color: "white" }}
                  highlightDateNameStyle={{ color: "white" }}
                  disabledDateNameStyle={{ color: "grey" }}
                  disabledDateNumberStyle={{ color: "grey" }}
                  datesWhitelist={datesWhitelist}
                  datesBlacklist={datesBlacklist}
                  iconContainer={{ flex: 0.1 }}
                  selectedDate={selectedDate ? selectedDate : moment()}
                  onDateSelected={onDateSelected}
                //markedDates={markedDates}
                />
                {selectedDate ? (
                  <Text style={{ fontSize: 16 }}>Selected Date: {selectedDate}</Text>
                ) : (
                  <Text style={{ fontSize: 16 }}>
                    Selected Date: {moment().format("YYYY-MM-DD")}
                  </Text>
                )}

                <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
                  <View
                    style={{ flex: 0.5, flexDirection: "row", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#CBFFD1",
                        marginRight: 10,
                      }}
                    ></View>
                    <Text style={{ fontSize: 16 }}>{strings.available_slots}</Text>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#FFC8C8",
                        marginRight: 10,
                      }}
                    ></View>
                    <Text style={{ fontSize: 16 }}>{strings.booked_slots}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "center",
                    flexWrap: 'wrap',
                  }}
                >
                  {SLOTS.map((slot) => {
                    return (
                      <View
                        key={slot.id}
                        style={{
                          flexDirection: "row",
                          backgroundColor: slot.isAvailable ? "#CBFFD1" : "#FFC8C8",
                          borderRadius: 5,
                          padding: 5,
                          marginRight: 10,
                          marginBottom: 10,
                          paddingVertical: 7
                        }}
                      >
                        <Text style={{ fontSize: 12 }}>{slot.name}</Text>
                      </View>
                    );
                  })}
                </View>
                <View style={{ alignItems: "center" }}>
                  <Timetable
                    // these two are required
                    items={items}
                    renderItem={(props) => <AppointItems {...props} />}
                    // provide only one of these
                    date={date}
                    range={range}
                    fromHour={0}
                    toHour={24}
                    width={"300"}
                    timeWidth={50}
                    renderHour={(props) => <HourComponent {...props} />}
                  />
                </View>
              </View>
            </> :
            <RenderInformative />
          }
        </ScrollView>
        {/* 
      <Modal
        animationType="fade"
        visible={isCalendarModalVisible}
        mode="overFullScreen"
        onBackdropPress={() => {
          hideCalendarModal();
        }}
        transparent={true}
      >
        <View style={styles.ProfileContainer}>
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Pressable onPress={hideCalendarModal} style={styles.clearView}>
              <Image source={require("../../Assets/icons/close_black.png")} />
            </Pressable>
          </View>



        </View>
      </Modal> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  ProfileContainer: {
    width: "95%",
    flex: 1,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    paddingBottom: 20,
    marginBottom: 0,
  },
  caption: {
    fontSize: 17,
    fontWeight: "600",
  },
});
