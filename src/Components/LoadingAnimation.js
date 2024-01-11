import React from "react";
import { Dimensions, Image, View } from "react-native";
import { Text } from "react-native-paper";
import { ClearSpace } from "./ClearSpace";
var { height, width } = Dimensions.get('screen');
/**
* Pre Loader component.it's provide custom UI for loader
* @method
* @param  {string} title title of model
* @returns {JSX} Return JSX
*/
export default function LoadingAnimation({ title = "" }) {

  return (
    <View style={{
      marginTop: -40, position: "absolute", top: 1, height: height, width: width,
      backgroundColor: "white", opacity: .8, zIndex: 99999999999999
    }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }}>
        <Image source={require("../Assets/icons/dotted_circle_progress.gif")} />

        <Text variant="labelLarge">Loading..</Text>
        <ClearSpace size={3} />
        <Text variant="labelMedium">{title}</Text>
      </View>
    </View>
  );
}

