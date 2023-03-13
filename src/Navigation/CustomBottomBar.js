import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import { Button } from "../Components/Button";
import { useSelector } from "react-redux";
import {
  bottomBarHeight,
  color,
  fontSizes,
  spacing,
} from "../Utilities/Constants/Constant";
import { strings } from "../Utilities/Language";

const CustomBottomBar = ({ state, descriptors, navigation }) => {
  let profile = useSelector((state) => state.profile);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  const onNavClick = (val) => {
    setModal(false);
    switch (val) {
      case "HomeScreen":
        navigation.navigate("HomeScreen", {});
        break;
      case "Interactions":
        navigation.navigate("MyTicketsStack", {});
        break;
      case "Announcement":
        navigation.navigate("Announcement", {});
        break;
      case "Chat":
        navigation.navigate("Chat", {
          contactNo: profile.savedProfileData.contactNo,
        });
        break;
      case "Search":
        navigation.navigate("Search", {});
        break;
      case "Offers":
        navigation.navigate("Offers", {});
        break;
      case "Help":
        navigation.navigate("Help", {});
        break;
      default:
        break;
    }
  };

  const onNavClickButton = (val) => {
    setModal(false);
    switch (val) {
      case "InteractionsToOrder":
        navigation.navigate("InteractionsToOrder", { refresh: true });
        break;
      case "CreateOrder":
        navigation.navigate("CreateOrder", { refresh: true });
        break;
      default:
        break;
    }
  };
  return (
    <Pressable
      onPress={() => setModal(false)}
      style={{
        height: modal ? "100%" : bottomBarHeight,
        position: "absolute",
        justifyContent: "flex-end",
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      {/* modal create  */}
      {modal && (
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => onNavClickButton("CreateOrder")}
            style={styles.button}
          >
            <Text style={styles.buttontext}>{strings.order}</Text>
          </Pressable>
          <Pressable
            onPress={() => onNavClickButton("InteractionsToOrder")}
            style={styles.button}
          >
            <Text style={styles.buttontext}>{strings.interaction}</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.bottomcontainer}>
        <Pressable
          onPress={() => onNavClick("HomeScreen")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            // backgroundColor: "red",
            borderColor: "transparent",
            borderWidth: state.index === 0 ? 3 : 0,
            borderTopColor:
              state.index === 0 ? color.BCAE_PRIMARY : "transparent",
          }}
        >
          <Image
            style={state.index === 0 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/ic_home.png")}
          />
          <Text
            style={state.index === 0 ? styles.selectedText : styles.upperText}
          >
            {strings.home}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onNavClick("Search")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            borderColor: "transparent",
            borderWidth: state.index === 1 ? 3 : 0,
            borderTopColor:
              state.index === 1 ? color.BCAE_PRIMARY : "transparent",
          }}
        >
          <Image
            style={state.index === 1 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/ic_search.png")}
          />
          <Text
            style={state.index === 1 ? styles.selectedText : styles.upperText}
          >
            {strings.search}
          </Text>
        </Pressable>
        {/* button */}
        <Pressable
          onPress={() => openModal()}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
          }}
        >
          <View>
            <Image
              style={styles.addLogo}
              source={require("../Assets/icons/ic_more.png")}
            />
          </View>
          {/* <Text style={styles.upperText}>{strings.announcement}</Text> */}
        </Pressable>

        <Pressable
          onPress={() => onNavClick("Offers")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            borderColor: "transparent",
            borderWidth: state.index === 2 ? 3 : 0,
            borderTopColor:
              state.index === 2 ? color.BCAE_PRIMARY : "transparent",
          }}
        >
          <Image
            style={state.index === 2 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/ic_offers.png")}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={state.index === 2 ? styles.selectedText : styles.upperText}
          >
            {strings.offers}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onNavClick("Help")}
          style={{
            marginTop: spacing.HEIGHT_2,
            marginBottom: spacing.HEIGHT_2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            borderColor: "transparent",
            borderWidth: state.index === 3 ? 3 : 0,
            borderTopColor:
              state.index === 3 ? color.BCAE_PRIMARY : "transparent",
          }}
        >
          <Image
            style={state.index === 3 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/ic_help.png")}
          />
          <Text
            style={state.index === 3 ? styles.selectedText : styles.upperText}
          >
            {strings.help}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: "100%",
    padding: 10,
    backgroundColor: "transparent",

    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomcontainer: {
    height: 60,
    width: "100%",
    backgroundColor: color.WHITE,
    flexDirection: "row",
  },
  upperText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    width: spacing.WIDTH_20,
    height: spacing.WIDTH_20,
  },
  selectedText: {
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  selectedLogo: {
    tintColor: color.BCAE_PRIMARY,
    width: spacing.WIDTH_20,
    height: spacing.WIDTH_20,
  },
  addLogo: {
    width: 60,
    height: 60,
    marginBottom: 60,
    zIndex: 10,
    borderRadius: 30,
    borderColor: "#F3F3F3",
    borderWidth: 5,
  },
  button: {
    width: 100,
    height: spacing.WIDTH_35,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    borderRadius: 15,
    backgroundColor: color.BCAE_PRIMARY,
  },
  buttontext: {
    fontSize: 14,
    color: color.WHITE,
  },
});

export default CustomBottomBar;
