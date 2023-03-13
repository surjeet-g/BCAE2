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
import FileName from "./../../Components/FileName";
import Slot from "./../../Components/Slot";

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
  const [showIndex, setShowIndex] = useState(0);

  const FlatListItem = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          margin: 5,
          padding: 20,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          {/* Title & Image View */}
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              variant="bodyMedium"
              numberOfLines={2}
              style={{
                fontWeight: 700,
                fontSize: 16,
                width: 100,
                color: colors.secondary,
                flex: 2,
                marginRight: 5,
              }}
            >
              {item.title || "No Name"}
            </Text>

            <Image
              source={require("../../Assets/icons/frequent_interaction.png")}
              style={{ width: 50, height: 50, flex: 1 }}
            />
          </View>
          {/* View More view */}
          <TouchableOpacity onPress={() => setShowIndex(index)}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
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
                source={require("../../Assets/icons/ic_right_arrow.png")}
                style={{ marginLeft: 10, tintColor: "#EFA848" }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const WorkFlowUI = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../Assets/icons/ic_eclipse_orange_border.png")}
          style={{ width: 30, height: 30 }}
        />
        <Image
          source={require("../../Assets/icons/ic_veritical_line.png")}
          style={{ height: 100 }}
        />
        {/* Card View data */}
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#FCEEDA",
            padding: 10,
            width: "100%",
          }}
        >
          {/* Date & Time View */}
          <Text
            style={{
              borderRadius: 10,
              backgroundColor: "#EFA848",
              padding: 10,
              textAlign: "center",
              width: "70%",
              alignSelf: "center",
              color: "white",
              bottom: 30,
            }}
          >
            10 Feb 2023 09:30 AM
          </Text>

          {/* Row 1 */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {/* Statement View */}
            <WorkFlowItem
              title={"Statement"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 2 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            {/* Statement View */}
            <WorkFlowItem title={"Statement"} value={" Dissatisfaction"} />

            {/* Statement View */}
            <WorkFlowItem title={"Statement"} value={" Dissatisfaction"} />
          </View>

          {/* Row 3 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            {/* Statement View */}
            <WorkFlowItem
              title={"Statement"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 4 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            {/* Comments View */}
            <WorkFlowItem title={"Comments"} value={"Assign to self"} />
          </View>
        </View>
        <Image
          source={require("../../Assets/icons/ic_veritical_line.png")}
          style={{ height: 50 }}
        />
        <Image
          source={require("../../Assets/icons/ic_eclipse_orange.png")}
          style={{ width: 20, height: 20 }}
        />
        {/* Follow up button view */}
        <CustomButton
          buttonStyle={{ width: "100%" }}
          label={strings.follow_up}
          onPress={() => alert("Go to Follow up history")}
        />
      </View>
    );
  };

  const WorkFlowItem = (props) => {
    const { title, value } = props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Text
          variant="bodySmall"
          style={{
            fontWeight: 400,
            fontSize: 14,
            color: "#686B6C",
          }}
        >
          {title}
        </Text>
        <Text
          variant="bodySmall"
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: "#202223",
            marginTop: 5,
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  const AppointmentUIForm = () => {
    return (
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
              <Slot time={"12:00PM - 1:00PM"} isSelected={false} />
              <Slot time={"10:30AM - 11:30AM"} isSelected={true} />
              <Slot time={"5:00AM - 6:00PM"} isSelected={false} />
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
    );
  };

  const CustomerInfoItem = (props) => {
    const { title, value } = props;
    return (
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
          {title}
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
          {value}
        </Text>
      </View>
    );
  };

  const CustomerInfoUIFull = () => {
    return (
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
          <CustomerInfoItem title={`Customer${"\n"}Number`} value={"1123445"} />

          {/* Customer Type View */}
          <CustomerInfoItem title={`Customer${"\n"}Type`} value={"Business"} />

          {/* Service Type View */}
          <CustomerInfoItem title={`Service${"\n"}Type`} value={"Postpaid"} />
        </View>

        {/* More Profile Data View 2*/}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* Plan Name View */}
          <CustomerInfoItem title={`Plan Name`} value={" 10GB- Internet"} />

          {/* ID Type View */}
          <CustomerInfoItem title={`ID Type`} value={"Passport"} />

          {/* Empty View */}
          <CustomerInfoItem title={""} value={""} />
        </View>

        {/* Interaction History View */}
        <CustomerInfoInteractionHistoryUI />
      </View>
    );
  };

  const CustomerInfoInteractionHistoryUI = () => {
    return (
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
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
        {/* Profile Information View Full Container */}
        <CustomerInfoUIFull />
        {/* Flatlist Horizontal view */}
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <FlatList
            horizontal
            initialNumToRender={2}
            data={[
              { title: `Appointment${"\n"}Details` },
              { title: `Workflow${"\n"}History` },
              { title: "Not Available kamal is good person" },
            ]}
            renderItem={({ item, index }) => (
              <FlatListItem item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        {/* Appointment Details View */}
        {showIndex === 0 ? <AppointmentUIForm /> : null}
        {/* Workflow History View */}
        {showIndex === 1 ? <WorkFlowUI /> : null}
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
