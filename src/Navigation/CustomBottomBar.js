import React, { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
// import { Button } from "../Components/Button";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { getDataFromDB } from "../Storage/token";
import {
  bottomBarHeight,
  color,
  fontSizes,
  spacing,
  storageKeys
} from "../Utilities/Constants/Constant";
import { strings } from "../Utilities/Language";
import { getUserType } from "../Utilities/UserManagement/userInfo";

var { height, width } = Dimensions.get("screen");
// var currDeptDesc = "", currRoleDesc = ""

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

      case "Profile":
        navigation.navigate("Profile", {});
        break;

      case "Search":
        navigation.navigate("InteractionSearch")
        break;

      case "Settings":
        navigation.navigate("Settings")
        break;

      case "Interactions":
        navigation.navigate("MyTicketsStack", {});
        break;
      case "Announcement":
        navigation.navigate("Announcement", {});
        break;
      case "Chat":
        navigation.navigate("Chat", {
          contactNo: "123213",
        });
        break;

      case "Offers":
        // navigation.navigate("Offers", {});
        break;
      case "Help":
        navigation.navigate("Help", {});
        break;
      default:
        break;
    }
  };

  const onNavClickButton = async (val) => {
    setModal(false);
    switch (val) {
      case "InteractionsToOrder":
        const userID = await getUserType();
        navigation.navigate("InteractionsToOrder", {
          refresh: true, userTypeParams: userID
        });
        break;
      case "ViewOrder":
        navigation.navigate("ViewOrder", { refresh: true });
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
            onPress={() => onNavClickButton("ViewOrder")}
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
              state.index === 0 ? "#FFF" : "transparent",
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
          onPress={() => onNavClick("Profile")}
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
              state.index === 1 ? color.WHITE : "transparent",
          }}
        >
          <Image
            style={state.index === 1 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/ic_regular.png")}
          />
          <Text
            style={state.index === 1 ? styles.selectedText : styles.upperText}
          >
            Profile
          </Text>
        </Pressable>


        {/* {((currDeptDesc == "Brunei Application Support") || (currDeptDesc == "Global Application Support"))
          && (currRoleDesc == "Back Office") && (
            <View
              style={{
                marginTop: spacing.HEIGHT_2,
                marginBottom: spacing.HEIGHT_2,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "20%",
              }}
            >
            </View>
          )} */}


        {/* button */}
        {/* {((currDeptDesc !== "Brunei Application Support") && (currDeptDesc !== "Global Application Support"))
          && (currRoleDesc !== "Back Office") && ( */}
        <Pressable
          // onPress={() => openModal()}
          onPress={async () => {
            var currDeptDesc = await getDataFromDB(storageKeys.CURRENT_DEPT_DESC)
            var currRoleDesc = await getDataFromDB(storageKeys.CURRENT_ROLE_DESC)

            console.log("currDeptDesc3...", currDeptDesc)
            console.log("currRoleDesc3...", currRoleDesc)

            if (((currDeptDesc == "Brunei Application Support") || (currDeptDesc == "Global Application Support"))
              && (currRoleDesc == "Back Office")) {
              console.log("1........")
              Toast.show({
                type: "bctError",
                text1: strings.create_intxn_not_allowed,
              });
            }
            else if (((currDeptDesc == "CQ Team") || (currDeptDesc == "Admin Operations") ||
              (currDeptDesc == "HR Operations") || (currDeptDesc == "IT Operations"))
              && ((currRoleDesc == "Reporting Manager") || (currRoleDesc == "Admin Manager") ||
                (currRoleDesc == "HR Manager") || (currRoleDesc == "ITOps Manager"))) {
              console.log("2........")
              Toast.show({
                type: "bctError",
                text1: strings.create_intxn_not_allowed,
              });
            }
            else {
              console.log("3........")
              onNavClickButton("InteractionsToOrder")
            }
          }}
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
              source={require("../Assets/icons/add_ic_2.png")}
            />
          </View>
          {/* <Text style={styles.upperText}>{strings.announcement}</Text> */}
        </Pressable>
        {/* )} */}

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
            borderWidth: state.index === 2 ? 3 : 0,
            borderTopColor:
              state.index === 2 ? color.WHITE : "transparent",
          }}
        >
          <Image
            style={state.index === 2 ? styles.selectedLogo : styles.upperLogo}
            source={require("../Assets/icons/search_intxn_icon.png")}
          />
          <Text
            style={state.index === 2 ? styles.selectedText : styles.upperText}
          >
            {strings.search}
          </Text>
        </Pressable>


        <Pressable
          onPress={() => onNavClick("Settings")}
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
            source={require("../Assets/icons/settings.png")}
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={state.index === 3 ? styles.selectedText : styles.upperText}
          >
            Settings
          </Text>
        </Pressable>

        {/* <Pressable
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
        </Pressable> */}


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
    backgroundColor: "#4c3794",
    flexDirection: "row",
  },
  upperText: {
    color: color.WHITE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    tintColor: "#FFF",
    width: spacing.WIDTH_20,
    height: spacing.WIDTH_20,
  },
  selectedText: {
    color: "#FFF",
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  selectedLogo: {
    tintColor: "#FFF",
    width: spacing.WIDTH_20,
    height: spacing.WIDTH_20,
  },
  addLogo: {
    padding: 18,
    backgroundColor: "#4c3794",
    tintColor: "#FFFFFF",
    width: 40,
    height: 40,
    marginBottom: 60,
    zIndex: 10,
    borderRadius: 30,
    borderColor: "#FFF",
    borderWidth: 5,
  },
  button: {
    width: 100,
    height: spacing.WIDTH_35,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    borderRadius: 15,
    backgroundColor: color.WHITE,
  },
  buttontext: {
    fontSize: 14,
    color: color.WHITE,
  },
});

export default CustomBottomBar;
