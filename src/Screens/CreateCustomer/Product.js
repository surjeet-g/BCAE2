import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DashedDivider from "./../../Components/DashedDivider";

// Usage
/* <Product item={{ id: 21, name: "", type: "", price: 0, quantity:0 }} />; */

const Product = (props) => {
  const { item, products, setProducts } = props;

  const handleQuantity = (step) => {
    let currentQuantity = item?.quantity;
    if (step === 1) {
      currentQuantity = currentQuantity + step;
    } else if (step === -1) {
      if (currentQuantity > 0) currentQuantity = currentQuantity + step;
    }

    let newProducts = products.map((product) => {
      if (product.productId === item?.productId) {
        product.quantity = currentQuantity;
      }
      return product;
    });
    setProducts(newProducts);
  };

  return (
    <View
      style={item?.quantity > 0 ? styles.selectedContainer : styles.container}
    >
      <Text style={styles.bestvalue} numberOfLines={1}>
        {"Best Value"}
      </Text>
      {/* Product */}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View>
          <Image
            style={{ height: 80, width: 80, borderRadius: 10 }}
            source={{ uri: item?.productImage }}
          />
          <Text style={styles.serviceTypeTxt}>
            {item?.productTypeDescription?.description}
          </Text>
        </View>
        <View style={styles.productTxtView}>
          <Text numberOfLines={2} style={styles.productNameTxt}>
            {item?.productName}
          </Text>
          <Text numberOfLines={1} style={styles.productTypeTxt}>
            {"\u2B24 Service Type: " +
              item?.serviceTypeDescription?.description}
          </Text>
          <Text numberOfLines={1} style={styles.productTypeTxt}>
            {"\u2B24 " + item?.productChargesList[0]?.chargeDetails?.chargeName}
          </Text>
        </View>
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
          <Text style={styles.oldpriceTxt}>{"$" + item.price * 2}</Text>
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
  productTxtView: {
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
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
  quantityIcon: { backgroundColor: "#E4EDFF", borderRadius: 5, padding: 3 },
  quantityTxt: {
    color: "#000000",
    fontWeight: 600,
    fontSize: 14,
    marginHorizontal: 10,
  },
  serviceTypeTxt: {
    textAlign: "center",
    backgroundColor: "#EFA848",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    color: "#fff",
    marginVertical: 5,
    fontWeight: 600,
    fontSize: 12,
  },
});
