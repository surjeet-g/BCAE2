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
  Pressable,
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

const InteractionDetails = (props) => {
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

  const DetailInfoItem = (props) => {
    const {
      title = "",
      value = "",
      flex = 1,
      onPress = () => console.log(`Clicked ${title}`),
    } = props;

    return (
      <Pressable
        style={{
          flex: flex,
          flexDirection: "column",
        }}
        onPress={onPress}
      >
        <View
          style={{
            flex: flex,
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
            numberOfLines={1}
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
            numberOfLines={2}
          >
            {value}
          </Text>
        </View>
      </Pressable>
    );
  };

  const DetailsInfoUIFull = () => {
    return (
      <View
        style={{
          margin: 5,
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        {/* Row 1 */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {/* Statement View */}
          <DetailInfoItem
            title={"Statement"}
            value={"Dissatisfaction with Policies"}
            flex={1}
          />
        </View>

        {/* Row 2*/}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* Date & Time View */}
          <DetailInfoItem
            title={"Created Date & time"}
            value={"14 March 2023, 11:30 AM"}
            flex={2}
          />

          {/* Service Type View */}
          <DetailInfoItem title={"Service type"} value={"Addon"} flex={1} />
        </View>

        {/* Row 3*/}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* Interaction Type View */}
          <DetailInfoItem
            title={"Interaction Type"}
            value={"Complaint"}
            flex={2}
          />

          {/* Priority View */}
          <DetailInfoItem title={"Priority"} value={"High"} flex={1} />
        </View>

        {/* Row 4*/}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* Problem Statement View */}
          <DetailInfoItem
            title={"Problem Statement"}
            value={"Dissatisfaction"}
            flex={2}
          />

          {/* Status View */}
          <DetailInfoItem title={"Status"} value={"Business"} flex={1} />
        </View>

        {/* Row 5*/}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* Contact type View */}
          <DetailInfoItem title={"Contact Type"} value={"Business"} flex={2} />

          {/*Follow up View */}
          <DetailInfoItem title={"Follow Up"} value={"3"} flex={1} />
        </View>

        {/* Row 6*/}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* Attachments View */}
          <DetailInfoItem
            title={"Attachments"}
            value={"TODO - Show attachment here"}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
        {/* Interaction Details View Full Container */}
        <DetailsInfoUIFull />
        {/* Flatlist Horizontal view */}
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <FlatList
            horizontal
            initialNumToRender={2}
            showsHorizontalScrollIndicator={false}
            data={[
              { title: `Appointment${"\n"}Details` },
              { title: `Workflow${"\n"}History` },
              { title: "Not Available" },
            ]}
            renderItem={({ item, index }) => (
              <HorizontalFlatListItem item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
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
  },
  scrollviewContainer: {
    margin: 15,
    backgroundColor: "#F0F0F0",
  },
});
export default InteractionDetails;
