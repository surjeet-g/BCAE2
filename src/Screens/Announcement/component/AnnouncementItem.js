import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
} from "../../../Utilities/Constants/Constant";
import Moment from "moment";

const AnnouncementItem = ({ title, date, description }) => {
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
          <View style={{ flexDirection: "column" }}>
            <Text numberOfLines={1} style={{}}>
              {"Today"}
            </Text>
            {/* <Text style={[styles.status]}>{Moment(date).fromNow()}</Text> */}
            <Text style={[styles.status]}>{"12:42 PM"}</Text>
          </View>

          {/* Vertical Divider */}
          <View
            style={{
              marginHorizontal: 8,
              width: 3,
              maxHeight: 50,
              backgroundColor: "grey",
            }}
          />

          <View style={{ flexDirection: "column" }}>
            <Text numberOfLines={2} style={{ fontWeight: "bold" }}>
              {"title"}
            </Text>
            <Text style={{}} numberOfLines={3}>
              {"description"}
            </Text>
          </View>
        </View>
        {/* Bottom Horizontal Divider */}
        <View style={{ marginTop: 8, height: 2, backgroundColor: "grey" }} />
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
