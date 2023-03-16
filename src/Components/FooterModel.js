import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { SHADOW_STYLE } from "../Utilities/themeConfig";
import { ClearSpace } from "./ClearSpace";
Icon
var { height, width } = Dimensions.get("screen");

export const FooterModel = ({ setOpen = () => { }, open = false, children, title = "" }) => {
  if (!open) return null
  return (
    <View
      style={{
        backgroundColor: "transparent",
      }}
    >
      {/* header */}
      <View
        style={{
          backgroundColor: "white",
          minHeight: height * .2,
          maxHeight: height * .6,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          ...SHADOW_STYLE,
        }}
      >
        <View
          style={{
            position: "relative",
            top: 1,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClearSpace size={4} />
          <View
            style={{
              width: 70,
              height: 3,
              backgroundColor: "black",
              borderRadius: 5,
            }}
          />
        </View>

        <ClearSpace size={2} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // position: "relative",
            marginVertical: 10,
            // flex: 1,
            // height: 300,
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              color: "#202223",
              fontSize: 16,
              // flex: 1,
            }}
          >
            {title}
          </Text>


          <Icon
            onPress={() => {
              setOpen(false);
            }} name='close-circle' size={25} color={"#000"} />
        </View>

        <ScrollView contentContainerStyle={{ marginBottom: 20 }}>
          {children}
        </ScrollView>

      </View>
    </View>
  );
};
