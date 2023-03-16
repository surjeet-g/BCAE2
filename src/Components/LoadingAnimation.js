import React from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { ClearSpace } from "./ClearSpace";
var { height, width } = Dimensions.get('screen');
export default function LoadingAnimation({ title = "" }) {

  return (
    <View style={{
      position: "absolute", top: 1, height: height, width: width,
      backgroundColor: "white", opacity: .8, zIndex: 9999999
    }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }}>

        <Text variant="labelLarge">Please wait</Text>
        <ClearSpace size={3} />
        <Text variant="labelMedium">{title}</Text>
      </View>
    </View>
  );
}

