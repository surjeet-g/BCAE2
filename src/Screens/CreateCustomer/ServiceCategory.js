import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

const ServiceCategory = (props) => {
  const { name = "NA", icon = "" } = props;
  const [selected, setSelected] = useState(false);

  return (
    <Pressable style={styles.container} onPress={() => setSelected(!selected)}>
      <View
        style={{
          ...styles.imgView,
          borderColor: selected ? "#495470" : "#DADADA",
        }}
      >
        <Image style={styles.img} source={icon} />
      </View>
      <Text
        style={{
          ...styles.nameTxt,
          color: selected ? "#495470" : "#2B2B2B",
          fontWeight: selected ? 700 : 400,
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default ServiceCategory;

const styles = StyleSheet.create({
  container: { alignSelf: "center", margin: 10, flex: 1, alignItems: "center" },
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
