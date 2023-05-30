import React, { useState } from "react";
import {
  Pressable,
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
import Slot from "./../../Components/Slot";

const AppointmentDetails = (props) => {
  const { route, navigation } = props;
  const { colors, fonts, roundness } = useTheme();

  const [isGetSlotsEnabled, setIsGetSlotsEnabled] = useState(false);
  const [appointDateTime, setAppointDateTime] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactType, setContactType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedSlots, setseSectedSlots] = useState("");

  const HorizontalFlatListItem = (props) => {
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
          <Pressable
            onPress={() => {
              if (index == 0) {
                navigation.navigate("AppointmentDetails");
              } else if (index == 1) {
                navigation.navigate("WorkflowHistory");
              }
            }}
          >
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
              <Image
                source={require("../../Assets/icons/ic_right_arrow.png")}
                style={{ marginLeft: 10, tintColor: "#EFA848" }}
              />
            </View>
          </Pressable>
        </View>
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

  const ProfileInfoItem = (props) => {
    const { title, value } = props;
    return (
      <View style={styles.profileInfoItemView}>
        <Text variant="bodySmall" style={styles.profileInfoItemTitleTxt}>
          {title}
        </Text>
        <Text variant="bodySmall" style={styles.profileInfoItemValueTxt}>
          {value}
        </Text>
      </View>
    );
  };

  const ProfileInfoUIView = () => {
    return (
      <View style={styles.profileInfoView}>
        {/* Profile Image Name & Email View Container */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {/* Profile Image View */}
          <Image
            source={{
              uri: `data:image/jpeg;base64,${DEFAULT_PROFILE_IMAGE}`,
            }}
            style={styles.profileInfoImg}
          />
          {/* Profile Name & Email View */}
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text variant="bodyMedium" style={styles.profileInfoTitleTxt}>
              Rohit Sharma
            </Text>
            <Text variant="bodySmall" style={styles.profileInfoSubTitleTxt}>
              Customer Id: 10
            </Text>
            <Text variant="bodySmall" style={styles.profileInfoSubTitleTxt}>
              rohit@bahawancybertek.com
            </Text>
          </View>
        </View>

        {/* Divider line view */}
        <View
          style={{ marginTop: 10, height: 1, backgroundColor: "#B2B2B2" }}
        ></View>

        {/* More Profile Data View 1 */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {/* Customer Number View */}
          <ProfileInfoItem title={`Customer${"\n"}Number`} value={"1123445"} />

          {/* Customer Type View */}
          <ProfileInfoItem title={`Customer${"\n"}Type`} value={"Business"} />

          {/* Service Type View */}
          <ProfileInfoItem title={`Service${"\n"}Type`} value={"Postpaid"} />
        </View>

        {/* More Profile Data View 2*/}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* Plan Name View */}
          <ProfileInfoItem title={`Plan Name`} value={" 10GB- Internet"} />

          {/* ID Type View */}
          <ProfileInfoItem title={`ID Type`} value={"Passport"} />

          {/* Empty View */}
          <ProfileInfoItem title={""} value={""} />
        </View>

        {/* Interaction History View */}
        <InteractionHistoryUI />
      </View>
    );
  };

  const InteractionHistoryItem = (props) => {
    const { title, value } = props;
    return (
      <View style={styles.interactionHistoryItemView}>
        <Text variant="bodySmall" style={styles.interactionHistoryItemTitleTxt}>
          {title}
        </Text>
        <Text variant="bodySmall" style={styles.interactionHistoryItemValueTxt}>
          {value}
        </Text>
      </View>
    );
  };

  const InteractionHistoryUI = () => {
    return (
      <View style={styles.interactionHistoryView}>
        <Text style={styles.interactionHistoryTxt}>
          {strings.interaction_history}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {/* Total View */}
          <InteractionHistoryItem title={"Total"} value={"02"} />
          {/* Open View */}
          <InteractionHistoryItem title={"Open"} value={"01"} />
          {/* Closed View */}
          <InteractionHistoryItem title={"Closed"} value={"02"} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
        {/* Profile Information View Full Container */}
        <ProfileInfoUIView />
        {/* Flatlist Horizontal view */}
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <FlatList
            horizontal
            initialNumToRender={2}
            showsHorizontalScrollIndicator={false}
            data={[
              { title: `Appointment${"\n"}Details` },
              { title: `Workflow${"\n"}History` },
            ]}
            renderItem={({ item, index }) => (
              <HorizontalFlatListItem item={item} index={index} />
            )}
            keyExtractor={(item, index) => index}
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
    backgroundColor: "#F0F0F0",
    paddingTop: 50,
  },
  scrollviewContainer: {
    margin: 15,
    backgroundColor: "#F0F0F0",
  },
  interactionHistoryView: {
    borderRadius: 10,
    backgroundColor: "#DADADA",
    width: "80%",
    marginTop: 20,
    alignSelf: "center",
    elevation: 2,
    flexDirection: "column",
    padding: 10,
  },
  interactionHistoryTxt: {
    color: "#000000",
    fontWeight: 600,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  interactionHistoryItemView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  interactionHistoryItemTitleTxt: {
    fontWeight: 400,
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "center",
  },
  interactionHistoryItemValueTxt: {
    fontWeight: 700,
    fontSize: 16,
    color: "#000000",
    marginTop: 5,
  },
  profileInfoItemView: {
    flex: 1,
    flexDirection: "column",
  },
  profileInfoItemTitleTxt: {
    fontWeight: 600,
    fontSize: 14,
    color: "#000000",
  },
  profileInfoItemValueTxt: {
    fontWeight: 400,
    fontSize: 12,
    color: "#000000",
    marginTop: 5,
  },
  profileInfoView: {
    margin: 5,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5,
  },
  profileInfoTitleTxt: {
    fontWeight: 700,
    color: "#000000",
  },
  profileInfoSubTitleTxt: {
    fontWeight: 400,
    color: "#000000",
  },
  profileInfoImg: { height: 60, width: 60, borderRadius: 10 },
});
export default AppointmentDetails;
