import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Timeline } from "../Components/TimeLine";
// import { Success } from "../Components/InteractionSuccess";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
export const Playground = () => {

  return (
    <Timeline />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 200,
    backgroundColor: "yellow"
  },
  dropDownCard: {
    // shadowColor: '#171717',
    maxHeight: 50 * 5,
    paddingTop: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "white",
    borderRadius: 6,
    width: "100%",
    marginVertical: 6,
    elevation: 3,
  },
});
