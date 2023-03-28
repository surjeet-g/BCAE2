import { StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";

const ServiceType = (props) => {
  const { name = "NA" } = props;
  const [selected, setSelected] = useState(false);
  return (
    <Pressable
      style={{
        ...styles.container,
        backgroundColor: selected ? "#4C5A81" : "white",
        borderColor: selected ? "#4C5A81" : "#AEADB0",
      }}
      onPress={() => setSelected(!selected)}
    >
      <Text
        style={{ ...styles.nameTxt, color: selected ? "white" : "#2B2B2B" }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default ServiceType;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#AEADB0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
    margin: 10,
  },
  nameTxt: {
    color: "#2B2B2B",
    fontWeight: 400,
    fontSize: 14,
  },
});
