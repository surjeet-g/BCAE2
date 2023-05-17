import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Chip } from "react-native-paper";
const { height, width } = Dimensions.get('screen');
export const Playground = () => {
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(true);

  const [selected, setSelected] = useState(new Date().toString());

  const d = {
    "status": 200,
    "message": "Success",
    "data": {
      "events": [
        {
          "id": "c38db937-bae9-4480-967c-4d07bdc9db85",
          "title": "Appointment Available",
          "start": "2023-05-16 07:00:00",
          "end": "2023-05-16 08:00:00",
          "extendedProps": {
            "availableUsers": 3,
            "appointDtlId": 4619,
            "appointDate": "2023-05-16",
            "appointStartTime": "07:00:00",
            "appointEndTime": "08:00:00"
          },
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB"
        },
        {
          "id": "6adbee89-56e5-4819-9838-2d655889aad8",
          "title": "Appointment Available",
          "start": "2023-05-16 08:00:00",
          "end": "2023-05-16 09:00:00",
          "extendedProps": {
            "availableUsers": 3,
            "appointDtlId": 4620,
            "appointDate": "2023-05-16",
            "appointStartTime": "08:00:00",
            "appointEndTime": "09:00:00"
          },
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB"
        },
        {
          "id": "f65fb8fc-3759-433a-b40d-cc6fcf2395e7",
          "title": "Appointment Available",
          "start": "2023-05-16 09:00:00",
          "end": "2023-05-16 10:00:00",
          "extendedProps": {
            "availableUsers": 3,
            "appointDtlId": 4621,
            "appointDate": "2023-05-16",
            "appointStartTime": "09:00:00",
            "appointEndTime": "10:00:00"
          },
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB"
        },
        {
          "id": "a482fc0d-606e-4a42-ae87-00591e27b5d3",
          "title": "Appointment Available",
          "start": "2023-05-16 10:00:00",
          "end": "2023-05-16 11:00:00",
          "extendedProps": {
            "availableUsers": 3,
            "appointDtlId": 4622,
            "appointDate": "2023-05-16",
            "appointStartTime": "10:00:00",
            "appointEndTime": "11:00:00"
          },
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB"
        }
      ],
      "currentAppointments": [
        {
          "id": "8a1e0f0b-e024-4b0a-abbe-1b933ad1f328",
          "title": "Appointment Available",
          "start": "2023-05-16 07:00:00",
          "end": "2023-05-16 08:00:00",
          "extendedProps": {},
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB",
          "appointDtlId": 4619,
          "slotName": "07:00 AM - 08:00 AM",
          "appointUserId": 5,
          "availableUsers": 3,
          "appointDate": "2023-05-16",
          "appointStartTime": "07:00:00",
          "appointEndTime": "08:00:00"
        },
        {
          "id": "276b2a62-c0bf-4302-8312-fc3122da37d0",
          "title": "Appointment Available",
          "start": "2023-05-16 08:00:00",
          "end": "2023-05-16 09:00:00",
          "extendedProps": {},
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB",
          "appointDtlId": 4620,
          "slotName": "08:00 AM - 09:00 AM",
          "appointUserId": 5,
          "availableUsers": 3,
          "appointDate": "2023-05-16",
          "appointStartTime": "08:00:00",
          "appointEndTime": "09:00:00"
        },
        {
          "id": "8c979398-f884-45a7-b889-748248a1d21b",
          "title": "Appointment Available",
          "start": "2023-05-16 09:00:00",
          "end": "2023-05-16 10:00:00",
          "extendedProps": {},
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB",
          "appointDtlId": 4621,
          "slotName": "09:00 AM - 10:00 AM",
          "appointUserId": 5,
          "availableUsers": 3,
          "appointDate": "2023-05-16",
          "appointStartTime": "09:00:00",
          "appointEndTime": "10:00:00"
        },
        {
          "id": "f9be1f6a-86ef-4af4-9c96-96c257dd35cb",
          "title": "Appointment Available",
          "start": "2023-05-16 10:00:00",
          "end": "2023-05-16 11:00:00",
          "extendedProps": {},
          "backgroundColor": "#14A44D",
          "borderColor": "#14A44D",
          "textColor": "#FBFBFB",
          "appointDtlId": 4622,
          "slotName": "10:00 AM - 11:00 AM",
          "appointUserId": 5,
          "availableUsers": 3,
          "appointDate": "2023-05-16",
          "appointStartTime": "10:00:00",
          "appointEndTime": "11:00:00"
        }
      ]
    }
  }

  const currenEvent = d.data.currentAppointments;

  let marked = []


  currenEvent.length && currenEvent.map(item => {

    marked.push(item);
    return true
  })
  console.log("marked marked", marked)
  const checkIfExistingDateNdAppointDateMatching = (dateString, marked) => {
    if (marked.length == 0) return false;
    const data = marked.filter(it => it.appointDate == dateString)
    console.log("hitin", data)
    return data.length != 0 ? data[0] : false


  }
  const themConfig = {

    "stylesheet.calendar.header": {
      dayTextAtIndex0: {
        color: "black",
        backgroundColor: "#F5AD47",
      },
      dayTextAtIndex6: {
        color: "black",
        backgroundColor: "#F5AD47",
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
  }
  return (
    <SafeAreaView style={{ flex: 1 }} >
      {isCalendarModalVisible && (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Calendar
            style={{
              paddingBottom: 12,
              borderRadius: 10,
              width: width * 0.9,
              height: height * 0.7,
            }}
            di
            theme={themConfig}
            current={new Date().toString()}
            dayComponent={({ date, state, }) => {
              const dayStatus = checkIfExistingDateNdAppointDateMatching(date?.dateString, marked)
              return (
                <View
                  style={{
                    // flex: 1,
                    height: height * 0.1,
                    paddingTop: 5,
                    backgroundColor: dayStatus == false ? "#ffffff" : dayStatus.backgroundColor,
                    paddingHorizontal: 2,
                    borderColor: 'gray',
                    borderWidth: .5
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
                        color: state === "disabled" ? "##d3d9de" : dayStatus == false ? "black" : dayStatus.textColor,
                        textAlign: dayStatus == false ? "right" : "left",
                        fontSize: dayStatus == false ? 10 : 10,
                        paddingRight: dayStatus == false ? 0 : 5,
                      })
                    }
                  >
                    {date?.day}
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: 10,
                      paddingBottom: 5,
                      color: dayStatus == false ? "black" : dayStatus.textColor,
                    }}
                  >
                    {dayStatus == false ? "" : dayStatus.title}
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

          <View style={{ position: "relative", flexDirection: "row", alignSelf: "flex-start", marginLeft: 30, top: -height * .06, zIndex: 999 }}>
            <Chip style={{ backgroundColor: 'green', marginRight: 5 }} textStyle={{ fontSize: 12 }} onPress={() => console.log('Pressed')} color="black" >Example Chip</Chip>
            <Chip style={{ backgroundColor: 'green' }} textStyle={{ fontSize: 12 }} onPress={() => console.log('Pressed')} color="black" >Example Chip</Chip>

          </View>

        </View>
      )
      }
    </SafeAreaView >
  );

};
const styles = StyleSheet.create({

});
