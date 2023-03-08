import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { DEFAULT_PROFILE_IMAGE } from "../../Utilities/Constants/Constant";
import { useTheme, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";
import { strings } from "../../Utilities/Language";
import { CustomInput } from "./../../Components/CustomInput";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";

const CreateOrder = (props) => {
  const { route, navigation } = props;
  const { colors, fonts, roundness } = useTheme();

  const [isGetSlotsEnabled, setIsGetSlotsEnabled] = useState(false);
  const [appointDateTime, setAppointDateTime] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactType, setContactType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedSlots, setseSectedSlots] = useState("");

  const Item = () => {
    return (
      <View
        style={{
          flex: 0.5,
          margin: 5,
          padding: 20,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "column" }}>
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
              Appointment {"\n"} Details
            </Text>

            <Image
              source={require("../../Assets/icons/frequent_interaction.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          {/* View MOre view */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
            }}
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
            <TouchableOpacity onPress={() => alert("View More")}>
              <Image
                source={require("../../Assets/icons/ic_right_arrow.png")}
                style={{ marginLeft: 10, tintColor: "#EFA848" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
        {/* Profile Information View Full Container */}
        <View
          style={{
            margin: 5,
            padding: 20,
            backgroundColor: "#F26E77",
            borderRadius: 10,
            elevation: 5,
          }}
        >
          {/* Profile Image Name & Email View Container */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {/* Profile Image View */}
            <View>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${DEFAULT_PROFILE_IMAGE}`,
                }}
                style={{ height: 60, width: 60, borderRadius: 10 }}
              />
            </View>
            {/* Profile Name & Email View */}
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  color: colors.inverseSecondary,
                }}
              >
                Rohit Sharma
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  color: colors.inverseSecondary,
                }}
              >
                Customer Id: 10
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  color: colors.inverseSecondary,
                }}
              >
                rohit@bahawancybertek.com
              </Text>
            </View>
          </View>
          {/* Divider line view */}
          <View style={{ marginTop: 10 }}>
            <Image source={require("../../Assets/icons/line.png")} />
          </View>

          {/* More Profile Data View 1 */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {/* Customer Number View */}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                //   backgroundColor: "blue",
                alignItems: "center",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.inverseSecondary,
                  textAlign: "center",
                }}
              >
                Customer{"\n"}Number
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: colors.inverseSecondary,
                  marginTop: 5,
                }}
              >
                1123445
              </Text>
            </View>

            {/* Customer Type View */}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                //   backgroundColor: "green",
                alignItems: "center",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.inverseSecondary,
                  textAlign: "center",
                }}
              >
                Customer{"\n"}Type
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: colors.inverseSecondary,
                  marginTop: 5,
                }}
              >
                Business
              </Text>
            </View>

            {/* Service Type View */}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                //   backgroundColor: "red",
                alignItems: "center",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.inverseSecondary,
                  textAlign: "center",
                }}
              >
                Service{"\n"}Type
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: colors.inverseSecondary,
                  marginTop: 5,
                }}
              >
                Postpaid
              </Text>
            </View>
          </View>

          {/* More Profile Data View 2*/}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* Plan Name View */}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                //   backgroundColor: "blue",
                alignItems: "center",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.inverseSecondary,
                  textAlign: "center",
                }}
              >
                Plan Name
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: colors.inverseSecondary,
                  marginTop: 5,
                }}
              >
                10GB- Internet
              </Text>
            </View>

            {/* ID Type View */}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                //   backgroundColor: "green",
                alignItems: "center",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.inverseSecondary,
                  textAlign: "center",
                }}
              >
                ID Type
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  fontSize: 12,
                  color: colors.inverseSecondary,
                  marginTop: 5,
                }}
              >
                Passport
              </Text>
            </View>

            {/* Customer Number View */}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                //   backgroundColor: "red",
                alignItems: "center",
              }}
            ></View>
          </View>

          {/* Interaction History View */}
          <View
            style={{
              borderRadius: 10,
              backgroundColor: "#FFEEEF",
              width: "80%",
              marginTop: 20,
              alignSelf: "center",
              elevation: 5,
              flexDirection: "column",
              padding: 10,
            }}
          >
            <Text
              style={{
                color: "#CA404A",
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              Interaction History
            </Text>
            <View style={{ flexDirection: "row" }}>
              {/* Total View */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  //   backgroundColor: "blue",
                  alignItems: "center",
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#7E282E",
                    textAlign: "center",
                  }}
                >
                  Total
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#CA404A",
                    marginTop: 5,
                  }}
                >
                  02
                </Text>
              </View>

              {/* Divider */}
              <View style={{ width: 1, backgroundColor: "#DADADA" }} />

              {/* Open View */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  //   backgroundColor: "blue",
                  alignItems: "center",
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#7E282E",
                    textAlign: "center",
                  }}
                >
                  Open
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#CA404A",
                    marginTop: 5,
                  }}
                >
                  02
                </Text>
              </View>

              {/* Divider */}
              <View style={{ width: 1, backgroundColor: "#DADADA" }} />

              {/* Closed View */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  //   backgroundColor: "blue",
                  alignItems: "center",
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#7E282E",
                    textAlign: "center",
                  }}
                >
                  Closed
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#CA404A",
                    marginTop: 5,
                  }}
                >
                  02
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Flatlist Horizontal view */}
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <FlatList
            horizontal
            initialNumToRender={2}
            data={[{}, {}, {}, {}, {}, {}]}
            renderItem={({ item }) => <Item />}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Appointment Details View */}
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "white",
            marginTop: 15,
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "#3FB94D",
              fontWeight: 700,
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            Appointment Details
          </Text>
          <CustomInput
            value={appointDateTime}
            caption={strings.appoint_date_time}
            placeHolder={strings.appoint_date_time}
            onChangeText={(text) => setAppointDateTime(text)}
          />
          <CustomInput
            value={contactName}
            caption={strings.contact_name}
            placeHolder={strings.contact_name}
            onChangeText={(text) => setContactName(text)}
          />
          <CustomInput
            value={contactNumber}
            caption={strings.contact_number}
            placeHolder={strings.contact_number}
            onChangeText={(text) => setContactNumber(text)}
          />

          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.contact_type}
            placeHolder={"Select " + strings.contact_type}
          />

          {/* ENable Interactions with Switch */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                color: "#282A2C",
                fontSize: 16,
                flex: 1,
              }}
            >
              {strings.get_slots}
            </Text>
            <Switch
              value={isGetSlotsEnabled}
              onValueChange={() => setIsGetSlotsEnabled(!isGetSlotsEnabled)}
            />
          </View>

          {isGetSlotsEnabled ? (
            <View
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.gray,
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                {/* Available & Selected View */}
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {/* Available view */}
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 5,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        backgroundColor: "#3FB94D",
                      }}
                    />
                    <Text
                      style={{
                        color: "#282A2C",
                        fontWeight: 400,
                        fontSize: 14,
                        marginLeft: 10,
                      }}
                    >
                      Available
                    </Text>
                  </View>
                  {/* Selected View */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 20,
                      margin: 5,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 15,
                        width: 15,
                        backgroundColor: "#F5AD47",
                      }}
                    />
                    <Text
                      style={{
                        color: "#282A2C",
                        fontWeight: 400,
                        fontSize: 14,
                        marginLeft: 10,
                      }}
                    >
                      Selected
                    </Text>
                  </View>
                </View>
                {/* Add Flatlist here to display the slots */}
              </View>
            </View>
          ) : null}

          <CustomInput
            value={remarks}
            caption={strings.remarks}
            placeHolder={strings.remarks}
            onChangeText={(text) => setRemarks(text)}
          />
        </View>
      </ScrollView>

      {/* Bottom Button View */}
      <View
        style={{
          flexDirection: "row",
          bottom: 0,
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 1 }}>
          <CustomButton label={strings.cancel} onPress={() => {}} />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton label={strings.submit} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollviewContainer: {
    margin: 15,
    backgroundColor: "#F0F0F0",
  },
});
export default CreateOrder;
