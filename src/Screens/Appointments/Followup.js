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

const Followup = (props) => {
  const { route, navigation } = props;
  const { colors, fonts, roundness } = useTheme();
  const [showIndex, setShowIndex] = useState(0);

  const FollowupUI = () => {
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
        {/* Card View data 1*/}
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#fff",
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
              fontWeight: 600,
              fontSize: 16,
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
            <FollowupItem
              title={"Priority"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 2 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {/* Statement View */}
            <FollowupItem title={"Source"} value={" Dissatisfaction"} />

            {/* Statement View */}
            <FollowupItem
              title={"Remark"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 3 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {/* Comments View */}
            <FollowupItem title={"Comments"} value={"Assign to self"} />
          </View>
        </View>

        <Image
          source={require("../../Assets/icons/ic_veritical_line.png")}
          style={{ height: 100 }}
        />

        {/* Card View data 2*/}
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#fff",
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
              fontWeight: 600,
              fontSize: 16,
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
            <FollowupItem
              title={"Priority"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 2 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {/* Statement View */}
            <FollowupItem title={"Source"} value={" Dissatisfaction"} />

            {/* Statement View */}
            <FollowupItem
              title={"Remark"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 3 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {/* Comments View */}
            <FollowupItem title={"Comments"} value={"Assign to self"} />
          </View>
        </View>

        <Image
          source={require("../../Assets/icons/ic_veritical_line.png")}
          style={{ height: 100 }}
        />

        {/* Card View data 3*/}
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#fff",
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
              fontWeight: 600,
              fontSize: 16,
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
            <FollowupItem
              title={"Priority"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 2 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {/* Statement View */}
            <FollowupItem title={"Source"} value={" Dissatisfaction"} />

            {/* Statement View */}
            <FollowupItem
              title={"Remark"}
              value={"Dissatisfaction with Policies"}
            />
          </View>

          {/* Row 3 */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            {/* Comments View */}
            <FollowupItem title={"Comments"} value={"Assign to self"} />
          </View>
        </View>
      </View>
    );
  };

  const FollowupItem = (props) => {
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
        {/* FollowupUI View */}
        <FollowupUI />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  scrollviewContainer: {
    margin: 15,
    backgroundColor: "#F0F0F0",
  },
});
export default Followup;
