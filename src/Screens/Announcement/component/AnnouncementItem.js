import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Moment from "moment";

const AnnouncementItem = ({ title, date, desc }) => {
  const navigation = useNavigation();
  const [toggleImage, setToggle] = useState(false);

  function OnClickAnnouncementItem() {
    // navigation.navigate('MyTicketDetails', {ticketNo:ticketNo, intxnId:intxnId, intxnType:intxnType})
  }

  return (
    <Pressable
      onPress={OnClickAnnouncementItem}
      style={({ pressed }) => pressed && styles.pressed}
      onPressIn={() => setToggle(true)}
      onPressOut={() => setToggle(false)}
    >
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image
            style={{ height: 20, width: 20 }}
            source={require("../../../Assets/icons/ic_selected_radio.png")}
          />

          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text
              numberOfLines={2}
              style={{ fontWeight: 600, fontSize: 14, color: "#202223" }}
            >
              {title}
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontWeight: 400,
                fontSize: 14,
                color: "#6C7072",
              }}
              numberOfLines={3}
            >
              {desc}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                marginTop: 5,
                fontWeight: 400,
                fontSize: 14,
                color: "#6C7072",
              }}
            >
              {date}
            </Text>
          </View>
        </View>
        {/* Bottom Horizontal Divider */}
        <View style={{ marginTop: 8, height: 1, backgroundColor: "#293F56" }} />
      </View>
    </Pressable>
  );
};

export default AnnouncementItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
