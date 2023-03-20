import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import moment from "moment";

const Followup = (props) => {
  const { route, navigation } = props;
  const { InteractionFollowupData } = route.params;

  const PlaceHolderText = ({ text = "Followup", top, right }) => {
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

  const FollowupUI = () => {
    return (
      <View style={{ alignItems: "center", margin: 15 }}>
        <Image
          source={require("../../Assets/icons/ic_eclipse_orange_border.png")}
          style={{ width: 30, height: 30 }}
        />
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../../Assets/icons/ic_veritical_line.png")}
            style={{ height: 100 }}
          />
          <PlaceHolderText text={"Followup 2"} top={20} right={-45} />
        </View>
        {/* Card View data*/}
        {InteractionFollowupData.map((item) => {
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
              {moment(item?.createdAt).format("DD MMMM YYYY, hh:mm A")}
            </Text>

            {/* Row 1 */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {/* Priority View */}
              <FollowupItem
                title={"Priority"}
                value={item?.priorityCodeDesc?.description}
              />
            </View>

            {/* Row 2 */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              {/* Source View */}
              <FollowupItem title={"Source"} value={"Dissatisfaction"} />

              {/* Remark View */}
              <FollowupItem title={"Remark"} value={item?.remarks} />
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
          </View>;
        })}
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
      <ScrollView nestedScrollEnabled={true}>
        {/* FollowupUI View */}
        {InteractionFollowupData?.length > 0 ? (
          <FollowupUI />
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,
              padding: 20,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            No Followup data available for this Interaction
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: 50,
  },
});
export default Followup;
