import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { CustomButton } from "./../../Components/CustomButton";
import { strings } from "./../../Utilities/Language/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getInteractionDetailsForID,
  getWorkFlowForInteractionID,
} from "./../../Redux/InteractionDispatcher";
import moment from "moment";

const WorkflowHistory = (props) => {
  const { route, navigation } = props;
  // const { interactionId = "116" } = route.params;
  let interactionId = 116;
  const dispatch = useDispatch([
    getInteractionDetailsForID,
    getWorkFlowForInteractionID,
  ]);
  let interactionReducer = useSelector((state) => state.interaction);
  const { InteractionWorkFlowData } = interactionReducer;

  // Calling API to get workflow/followup data
  useEffect(() => {
    dispatch(getWorkFlowForInteractionID(interactionId, {}, navigation));
  }, []);

  const PlaceHolderText = ({ text = "Placeholder", top, right }) => {
    return (
      <Text
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: "#47B065",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          borderRadius: 30,
          position: "absolute",
          top: top,
          right: right,
        }}
      >
        {text}
      </Text>
    );
  };

  const WorkflowUI = (props) => {
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../Assets/icons/ic_eclipse_orange_border.png")}
            style={{ width: 30, height: 30 }}
          />
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../Assets/icons/ic_veritical_line.png")}
              style={{ height: 100 }}
            />
            <PlaceHolderText top={20} right={-45} />
          </View>
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
              <WorkFlowInfoItem
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
              <WorkFlowInfoItem title={"Source"} value={" Dissatisfaction"} />

              {/* Statement View */}
              <WorkFlowInfoItem
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
              <WorkFlowInfoItem title={"Comments"} value={"Assign to self"} />
            </View>
          </View>

          <View>
            <Image
              source={require("../../Assets/icons/ic_veritical_line.png")}
              style={{ height: 150 }}
            />
            <PlaceHolderText top={50} right={-45} />
          </View>

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
              <WorkFlowInfoItem
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
              <WorkFlowInfoItem title={"Source"} value={" Dissatisfaction"} />

              {/* Statement View */}
              <WorkFlowInfoItem
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
              <WorkFlowInfoItem title={"Comments"} value={"Assign to self"} />
            </View>
          </View>

          <View>
            <Image
              source={require("../../Assets/icons/ic_veritical_line.png")}
              style={{ height: 150 }}
            />
            <PlaceHolderText top={50} right={-45} />
          </View>

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
              <WorkFlowInfoItem
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
              <WorkFlowInfoItem title={"Source"} value={" Dissatisfaction"} />

              {/* Statement View */}
              <WorkFlowInfoItem
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
              <WorkFlowInfoItem title={"Comments"} value={"Assign to self"} />
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
        </View>

        {/* Follow up button view */}
        <CustomButton
          label={strings.follow_up}
          onPress={() => navigation.navigate("Followup")}
        />
      </View>
    );
  };

  const WorkFlowInfoItem = (props) => {
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
        {/* WorkflowUI View */}
        <WorkflowUI />
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
export default WorkflowHistory;
