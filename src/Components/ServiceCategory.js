import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const ServiceCategory = (props) => {
  const { categoryName = "NA", categoryIcon = "" } = props;
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require("../Assets/icons/ic_word.png")}
        />
      </View>
      <Text style={styles.nameTxt}>{categoryName}</Text>
    </View>
  );
};

export default ServiceCategory;

const styles = StyleSheet.create({
  container: { alignSelf: "flex-start", margin: 10 },
  imgView: {
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 10,
    padding: 10,
  },
  img: {
    height: 50,
    width: 50,
  },
  nameTxt: {
    marginTop: 5,
    color: "#2B2B2B",
    fontSize: 12,
    fontWeight: 400,
    textAlign: "center",
  },
});
