import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Slider,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme, Switch } from "react-native-paper";
import moment from "moment";
function CustomCalendar(props) {
  const initDate = new Date();
  const [selected, setSelected] = useState(initDate);
  const [showIndex, setShowIndex] = useState(0);

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
  const marked = ["2023-03-08", "2023-03-18", "2023-03-23", "2023-03-28"];

  return (
    <Calendar
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
              {console.log(
                moment(date?.year + "-" + date?.month + "-" + date?.day).format(
                  "YYYY-MM-DD"
                )
              )}

              {
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
              }
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 5,
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
                ? "completed appointment"
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
                ? "Upcomming appointment"
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
}

export const HomeScreen = () => {
  const { colors, fonts, roundness } = useTheme();

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
                fontSize: 16,
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
              {"RS. 250"}
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
            <TouchableOpacity onPress={() => setShowIndex(index)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => setShowIndex(index)}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#EFA848",
                  }}
                >
                  View More
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
    const { item, index } = props;
    return (
      <View
        style={{
          width: 140,
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
                {"Order ID : 1234"}
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
                {"Date : 10 Jan 2023"}
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
                {"Inter. ID : 1234"}
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
                {"Date : 10 Jan 2023"}
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
                {"Date : 10 Jan 2023"}
              </Text>
            </View>
          )}
          {/* View More view */}
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => setShowIndex(index)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => setShowIndex(index)}
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
                  View More
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
    <ScrollView style={{ flex: 1, marginBottom: 80 }}>
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
          Account Details
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
          <FlatList
            horizontal
            initialNumToRender={2}
            data={[
              { title: "Balance" },
              { title: "Usage" },
              { title: "Not Available" },
            ]}
            renderItem={({ item, index }) => (
              <FlatListItemTop item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
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
          Appointments
        </Text>
        <View style={{ margin: 10 }}>
          <CustomCalendar
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
          History
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
          <FlatList
            horizontal
            initialNumToRender={2}
            data={[
              { title: "Orders" },
              { title: "Interactions" },
              { title: "Appointments" },
            ]}
            renderItem={({ item, index }) => (
              <FlatListItemBottom item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
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
    color: "grey",
  },
  defaultText: {
    color: "#000000",
  },
  customDay: {
    textAlign: "center",
  },
});
