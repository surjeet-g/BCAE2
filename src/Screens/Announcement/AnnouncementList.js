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
} from "../../Utilities/Constants/Constant";
import Moment from "moment";
import AnnouncementItem from "./component/AnnouncementItem";

const AnnouncementList = ({ announcementItemList }) => (
  <View style={{ marginTop: 60, alignItems: "center" }}>
    {announcementItemList?.length > 0 ? (
      <FlatList
        contentContainerStyle={{
          paddingBottom: 40,
          paddingLeft: 2,
          paddingRight: 2,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={announcementItemList}
        renderItem={({ item }) => (
          <AnnouncementItem
            title={item.announName}
            date={item.createdAt}
            description={item.announMsg}
          />
        )}
      />
    ) : (
      <View>
        <Text style={{ fontSize: 25, color: color.BCAE_PRIMARY }}>
          {" "}
          Announcement list is empty !!
        </Text>
      </View>
    )}
  </View>
);

export default AnnouncementList;
