import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DashedDivider from "./../../Components/DashedDivider";

// Usage
/* <Product item={{ id: 21, name: "", type: "", price: 0, quantity:0 }} />; */

const Product = (props) => {
  const { item, products, setProducts } = props;

  const calculatePrice = () => {
    let price = 0;
    const { productChargesList } = item;
    if (productChargesList?.length > 0) {
      productChargesList?.forEach((element) => {
        price = price + parseInt(element.chargeAmount);
      });
    }
    return price;
  };

  const handleQuantity = (step) => {
    let currentQuantity = item.quantity;
    if (step === 1) {
      currentQuantity = currentQuantity + step;
    } else if (step === -1) {
      if (currentQuantity > 0) currentQuantity = currentQuantity + step;
    }

    let newProducts = products.map((product) => {
      if (product.id === item.id) {
        product.quantity = currentQuantity;
      }
      return product;
    });
    setProducts(newProducts);
  };

  return (
    <View
      style={item.quantity > 0 ? styles.selectedContainer : styles.container}
    >
      <Text style={styles.bestvalue} numberOfLines={1}>
        {"Best Value"}
      </Text>
      {/* Product */}
      <View style={styles.productTxtView}>
        <Text style={styles.productNameTxt}>{item.productName}</Text>
        <Text style={styles.productTypeTxt}>
          {"\u2B24 Service Type: " + item.serviceTypeDescription?.description}
        </Text>
        <Text style={styles.productTypeTxt}>
          {"\u2B24 Product Type: " + item.productTypeDescription?.description}
        </Text>
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
          <Text style={styles.priceTxt}>{"$ " + calculatePrice()}</Text>
          <Text style={styles.oldpriceTxt}>
            {"$ " + (calculatePrice() + 200)}
          </Text>
        </View>
        {/* Quantity */}
        <View style={styles.quantityView}>
          <Pressable
            style={styles.quantityIcon}
            onPress={() => handleQuantity(-1)}
          >
            <Icon name={"minus"} size={20} color={"#4C5A81"} />
          </Pressable>
          <Text style={styles.quantityTxt}>{item.quantity}</Text>
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
