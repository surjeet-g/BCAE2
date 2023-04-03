import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DashedDivider from "./../../Components/DashedDivider";

// Usage
/* <Product item={{ id: 21, name: "", type: "", price: 0 }} />; */

const Product = (props) => {
  const { item, selectedProducts, setSelectedProducts } = props;
  const [quantity, setQuantity] = useState(0);

  const handleQuantity = (step) => {
    if (step === 1) setQuantity(quantity + step);
    else if (step === -1) {
      if (quantity > 0) setQuantity(quantity + step);
    }

    let selectedItem = selectedProducts.find(
      (product) => product.id === item.id
    );
    if (selectedItem === undefined) {
      selectedItem = item;
      selectedItem.quantity = quantity + step;
      setSelectedProducts([...selectedProducts, selectedItem]);
    } else {
      selectedItem.quantity = quantity + step;
      setSelectedProducts([
        ...selectedProducts.filter((product) => product.id !== item.id),
        selectedItem,
      ]);
    }
  };

  return (
    <View style={quantity > 0 ? styles.selectedContainer : styles.container}>
      <Text style={styles.bestvalue} numberOfLines={1}>
        {"Best Value"}
      </Text>
      {/* Product */}
      <View style={styles.productTxtView}>
        <Text style={styles.productNameTxt}>{item.name}</Text>
        <Text style={styles.productTypeTxt}>
          {"\u2B24 1 Regular + 3 Free family add-ons"}
        </Text>
        <Text style={styles.productTypeTxt}>{"\u2B24 Specification"}</Text>
      </View>
      <DashedDivider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.priceTxt}>{"$" + item.price}</Text>
          <Text style={styles.oldpriceTxt}>{"$" + (item.price + 200)}</Text>
        </View>
        {/* Quantity */}
        <View style={styles.quantityView}>
          <Pressable
            style={styles.quantityIcon}
            onPress={() => handleQuantity(-1)}
          >
            <Icon name={"minus"} size={20} color={"#4C5A81"} />
          </Pressable>
          <Text style={styles.quantityTxt}>{quantity}</Text>
          <Pressable
            style={styles.quantityIcon}
            onPress={() => handleQuantity(1)}
          >
            <Icon name={"plus"} size={20} color={"#4C5A81"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
  selectedContainer: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: "#3FB94D",
  },
  bestvalue: {
    backgroundColor: "rgba(63, 185, 77, 0.23)",
    color: "#3FB94D",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: "absolute",
    top: 0,
    right: 30,
    fontSize: 14,
    fontWeight: 600,
  },
  productTxtView: { flexDirection: "column", padding: 10 },
  productNameTxt: {
    color: "#202223",
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 5,
  },
  productTypeTxt: {
    color: "#686B6C",
    fontWeight: 400,
    fontSize: 12,
    marginVertical: 5,
  },
  priceTxt: { color: "#4C5A81", fontWeight: 600, fontSize: 20 },
  oldpriceTxt: {
    color: "#E22D2D",
    fontWeight: 600,
    fontSize: 13,
    marginLeft: 10,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  quantityView: { flexDirection: "row", alignItems: "center" },
  quantityIcon: { backgrounColor: "#E4EDFF", borderRadius: 10, padding: 5 },
  quantityTxt: { color: "#000000", fontWeight: 600, fontSize: 14 },
});
