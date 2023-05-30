import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const CustomHeaderBackMoreIcon = (props) => {
  const {
    navigation,
    headerTitle = "CustomHeader",
    onPressLeftIcon = () => navigation.goBack(),
    onPressRightIcon = () => {},
  } = props;
  return (
    <View style={styles.container}>
      {/* LEft Icon */}
      <TouchableOpacity onPress={onPressLeftIcon}>
        <Image
          style={styles.leftIcon}
          source={require("../Assets/icons/ic_left_arrow_back.png")}
        />
      </TouchableOpacity>
      {/* Header Title */}
      <Text style={styles.headerTitle} numberOfLines={1}>
        {headerTitle}
      </Text>
      {/* Right Icon */}
      <TouchableOpacity onPress={onPressRightIcon}>
        <Image source={require("../Assets/icons/ic_more_vertical.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeaderBackMoreIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#4C5A81",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  leftIcon: { tintColor: "#fff" },
  headerTitle: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 20,
    flex: 1,
    marginHorizontal: 10,
    textAlignVertical: "center",
    textAlign: "center",
  },
});
