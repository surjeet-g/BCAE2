import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ServiceCategory = (props) => {
  const { item, onSelect, onDeSelect } = props;

  const handleOnPress = () => {
    item.selected ? onDeSelect() : onSelect();
  };

  return (
    <Pressable style={styles.container} onPress={handleOnPress}>
      <View
        style={{
          ...styles.imgView,
          borderColor: item.selected ? "#495470" : "#DADADA",
        }}
      >
        <Image style={styles.img} source={item?.icon} />
      </View>
      <Text
        style={{
          ...styles.nameTxt,
          color: item.selected ? "#495470" : "#2B2B2B",
          fontWeight: item.selected ? "700" : "400",
        }}
      >
        {item?.description}
      </Text>
    </Pressable>
  );
};

export default ServiceCategory;

const styles = StyleSheet.create({
  container: { alignSelf: "center", margin: 10, flex: 1, alignItems: "center" },
  imgView: {
    borderWidth: 2,
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
    fontWeight: "400",
    textAlign: "center",
  },
});
