import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { SHADOW_STYLE } from "../Utilities/themeConfig";
import { ClearSpace } from "./ClearSpace";

var { height, width } = Dimensions.get("screen");

/**
* Footer Model Popup.it is  wrapper component
* @method
* @param  {Object} children wrapper component
* @param  {string} subtitle sub-caption of model
* @param  {string} title title of model
* @param  {bool} open Toggle state value of close  or open the model
* @param  {function} setOpen invoke clicking on close buttom
* @returns {JSX} Return JSX of
*/
export const FooterModel = ({
  setOpen = () => { },
  open = false,
  children,
  title = "",
  subtitle = "",
  disableCloseBut
}) => {
  if (!open) return null;
  return (
    <>
      <View style={{ backgroundColor: "#928d8dab", height: height, width: width, position: "absolute" }} />


      <View
        style={{
          position: "absolute",
          bottom: 1,
          width: width,
          backgroundColor: "transparent",
        }}
      >
        {/* header */}
        <View
          style={{
            backgroundColor: "white",
            minHeight: height * 0.2,
            maxHeight: height * 0.8,
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
            <ClearSpace size={3} />
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
              marginVertical: 5,
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

            {disableCloseBut === undefined && (
              <Icon
                onPress={() => {
                  setOpen(false);
                }}
                name="close-circle"
                size={25}
                color={"#000"}
              />
            )}



          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // position: "relative",
              marginVertical: 5,
              // flex: 1,
              // height: 300,
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{
                fontWeight: 400,
                color: "#3D3D3D",
                fontSize: 16,
                // flex: 1,
              }}
            >
              {subtitle}
            </Text>
          </View>

          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={{ marginBottom: 20 }}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </>

  );
};
