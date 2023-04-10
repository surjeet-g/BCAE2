import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

const ServiceCategory = (props) => {
  const { item, onSelect, onDeSelect } = props;
  const [selected, setSelected] = useState(false);

  const handleOnPress = () => {
    selected ? onDeSelect() : onSelect();
    setSelected(!selected);
  };

  return (
    <Pressable style={styles.container} onPress={handleOnPress}>
      <View
        style={{
          ...styles.imgView,
          borderColor: selected ? "#495470" : "#DADADA",
        }}
      >
        <Image style={styles.img} source={item?.icon} />
      </View>
      <Text
        style={{
          ...styles.nameTxt,
          color: selected ? "#495470" : "#2B2B2B",
          fontWeight: selected ? 700 : 400,
        }}
      >
        {item?.name}
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
    fontWeight: 400,
    textAlign: "center",
  },
});
