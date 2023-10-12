import moment from "moment";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Followup = (props) => {
  const { route, navigation } = props;
  let interactionReducer = useSelector((state) => state.interaction);
  const { interactionFollowupData } = interactionReducer;
  console.log("InteractionFollowupData2....", interactionFollowupData)

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
        {interactionFollowupData.map((item, index) => (
          <View
            key={item.intxnId}
            style={{ width: "100%", alignItems: "center" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../Assets/icons/ic_veritical_line.png")}
                style={{ height: 100 }}
              />
              <PlaceHolderText
                text={`Followup ${index + 1}`}
                top={20}
                right={-45}
              />
            </View>
            {/* Card View data*/}

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
                {moment(item?.intxnCreatedDate).format("DD MMMM YYYY, hh:mm A")}
              </Text>

              {/* Row 1 */}
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <FollowupItem
                  title={"From Department / Role"}
                  value={item?.fromEntityName.unitDesc + " - " + item?.fromRoleName.roleDesc} />
              </View>

              {/* Row 2 */}
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <FollowupItem
                  title={"To Department / Role"}
                  value={item?.toEntityName.unitDesc + " - " + item?.toRoleName.roleDesc} />
              </View>

              {/* Row 3 */}
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <FollowupItem
                  title={"User"}
                  value={item?.flwCreatedby.flwCreatedBy} />
                <FollowupItem
                  title={"Status"}
                  value={item?.statusDescription.description} />
              </View>

              {/* Row 4 */}
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <FollowupItem
                  title={"Action Performed"}
                  value={item?.flowActionDesc.description} />
              </View>

              {/* Row 5 */}
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <FollowupItem
                  title={"Comments"}
                  value={item?.remarks} />
              </View>


            </View>
          </View>
        ))}
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
        {interactionFollowupData?.length > 0 ? (
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
