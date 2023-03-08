import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
} from "react-native";
import {
  color,
  fontSizes,
  spacing,
  DEFAULT_PROFILE_IMAGE,
} from "../../Utilities/Constants/Constant";
import { useTheme, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import BCAE_LOGO from "../../Assets/svg/bcae_logo.svg";
import { CustomButton } from "../../Components/CustomButton";
import { StickyFooter } from "../../Components/StickyFooter";
import { getVersionCheckData } from "../../Redux/VersionCheckDispatcher";
import { getToken } from "../../Storage/token";
import { strings } from "../../Utilities/Language";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { getLanguage } from "../../Utilities/Language/language";
var { height, width } = Dimensions.get("screen");

import BottomSheet from "@gorhom/bottom-sheet";
import { ICON_STYLE } from "./../../Utilities/Style/navBar";
import { CustomDropDown } from "./../../Components/CustomDropDown";
import { CustomInput } from "./../../Components/CustomInput";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";

const InteractionsToOrder = ({ route, navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  // ref
  const interactionsModalRef = useRef(BottomSheet);
  // variables
  const interactionsModalSnapPoints = useMemo(() => ["15%", "90%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    interactionsModalRef.current?.snapToIndex(index);
  }, []);
  const handleExpandPress = useCallback(() => {
    interactionsModalRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    interactionsModalRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    interactionsModalRef.current?.close();
  }, []);

  const [isEnableInteractions, setIsEnableInteractions] = useState(false);
  const onToggleInteractionSwitch = () => {
    if (isEnableInteractions) {
      handleSnapPress(0);
    } else {
      handleSnapPress(1);
    }
    setIsEnableInteractions(!isEnableInteractions);
  };

  const [searchText, setSearchText] = useState("");
  const [interactionType, setInteractionType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [problemCause, setProblemCause] = useState("");
  const [priorityType, setPriorityType] = useState("");
  const [contactType, setContactType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [attachments, setAttachments] = useState([]);

  const onCancelPressed = () => {
    alert("Cancel Clicked");
  };

  const onSubmitPressed = () => {
    alert("Submit Clicked");
  };

  const InteractionsModalView = () => {
    return (
      <View style={styles.modalContainer}>
        {/* ENable Interactions with Switch */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              color: "#202223",
              fontSize: 16,
              flex: 1,
            }}
          >
            {"Enable Interactions"}
          </Text>
          <Switch
            value={isEnableInteractions}
            onValueChange={onToggleInteractionSwitch}
          />
        </View>

        {isEnableInteractions ? (
          <View style={{ flex: 1 }}>
            {/* Field View */}
            <View style={{ marginHorizontal: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={""}
                setValue={""}
                data={[]}
                onChangeText={(text) => console.log(text)}
                value={""}
                caption={strings.intractionType}
                placeHolder={"Select " + strings.intractionType}
              />
              <CustomDropDownFullWidth
                selectedValue={""}
                setValue={""}
                data={[]}
                onChangeText={(text) => console.log(text)}
                value={""}
                caption={strings.serviceType}
                placeHolder={"Select " + strings.serviceType}
              />
              <CustomDropDownFullWidth
                selectedValue={""}
                setValue={""}
                data={[]}
                onChangeText={(text) => console.log(text)}
                value={""}
                caption={strings.problem_stat_cause}
                placeHolder={"Select " + strings.problem_stat_cause}
              />
              <CustomDropDownFullWidth
                selectedValue={""}
                setValue={""}
                data={[]}
                onChangeText={(text) => console.log(text)}
                value={""}
                caption={strings.priority_type}
                placeHolder={"Select " + strings.priority_type}
              />
              <CustomDropDownFullWidth
                selectedValue={""}
                setValue={""}
                data={[]}
                onChangeText={(text) => console.log(text)}
                value={""}
                caption={strings.contact_type}
                placeHolder={"Select " + strings.contact_type}
              />
              <CustomInput
                value={""}
                caption={strings.remarks}
                placeHolder={strings.remarks}
                onChangeText={(text) => console.log(text)}
              />
              <CustomInput
                value={""}
                caption={strings.attachment}
                placeHolder={strings.attachment}
                onChangeText={(text) => console.log(text)}
              />
            </View>

            {/* Bottom Button View */}
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "white",
                marginHorizontal: 15,
              }}
            >
              <View style={{ flex: 1 }}>
                <CustomButton
                  label={strings.cancel}
                  onPress={onCancelPressed}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomButton
                  label={strings.submit}
                  onPress={onSubmitPressed}
                />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          margin: 5,
          padding: 20,
          backgroundColor: "#F26E77",
          borderRadius: 20,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${DEFAULT_PROFILE_IMAGE}`,
              }}
              imageStyle={{ borderRadius: 60 }}
              style={{ height: 60, width: 60 }}
            />
          </View>
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: "700",
                color: colors.inverseSecondary,
              }}
            >
              RML transportation Business
            </Text>
            <Text
              variant="bodySmall"
              style={{
                fontWeight: "400",
                color: colors.inverseSecondary,
              }}
            >
              Customer Id: 10
            </Text>
            <Text
              variant="bodySmall"
              style={{
                fontWeight: "400",
                color: colors.inverseSecondary,
              }}
            >
              rohit@bahawancybertek.com
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Image source={require("../../Assets/icons/line.png")} />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <Image
            source={require("../../Assets/icons/in_call.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            variant="bodySmall"
            style={{
              fontWeight: "400",
              color: colors.inverseSecondary,
            }}
          >
            64511445666892
          </Text>
          <Image
            source={require("../../Assets/icons/in_location.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            numberOfLines={2}
            variant="bodySmall"
            style={{
              fontWeight: "400",
              color: colors.inverseSecondary,
            }}
          >
            BE3119, Simpang {"\n"} 63-37, Brunei
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 0.5,
            margin: 5,
            padding: 10,
            backgroundColor: "#FFF",
            borderRadius: 20,
            elevation: 5,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: "700",
                  color: colors.secondary,
                }}
              >
                Most {"\n"} frequent {"\n"} Interactions
              </Text>

              <Image
                source={require("../../Assets/icons/frequent_interaction.png")}
                style={{ width: 50, height: 50, marginLeft: 10 }}
              />
            </View>
            <Text
              variant="bodySmall"
              style={{
                marginTop: 15,
                fontWeight: "400",
                color: "#848A93",
              }}
            >
              Billing Problem
            </Text>
            <Text
              variant="bodySmall"
              style={{
                marginTop: 15,
                fontWeight: "400",
                color: "#848A93",
              }}
            >
              Billing Summary not received
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            margin: 5,
            padding: 10,
            backgroundColor: "#FFF",
            borderRadius: 20,
            elevation: 5,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: "700",
                  color: colors.secondary,
                }}
              >
                Last used {"\n"} Interactions {"\n"} for this {"\n"} customer
              </Text>

              <Image
                source={require("../../Assets/icons/last_interaction.png")}
                style={{ width: 50, height: 50, marginLeft: 10 }}
              />
            </View>
            <Text
              variant="bodySmall"
              style={{
                marginTop: 15,
                fontWeight: "400",
                color: "#848A93",
              }}
            >
              Billing Problem
            </Text>
            <Text
              variant="bodySmall"
              style={{
                marginTop: 15,
                fontWeight: "400",
                color: "#848A93",
              }}
            >
              Billing Summary not received
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(searchString) => {
            this.setState({ searchString });
          }}
          underlineColorAndroid="transparent"
        />
        <Icon
          style={styles.searchIcon}
          name="magnify"
          size={30}
          color="#C7CAD1"
        />
      </View>
      <BottomSheet
        ref={interactionsModalRef}
        index={1}
        snapPoints={interactionsModalSnapPoints}
        onChange={handleSheetChanges}
      >
        <InteractionsModalView />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#d0d0d0",
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    padding: 10,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "white",
    borderRightColor: color.BCAE_PRIMARY,
    borderRightWidth: 400,
    borderTopWidth: 200,
    borderTopColor: "white",
  },
  highlightText: {
    color: "#202223",
    textAlign: "left",
    fontSize: fontSizes.FONT_19 * 2,
    fontWeight: "600",
    lineHeight: spacing.HEIGHT_27 * 2,
  },
  searchSection: {
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
});
export default InteractionsToOrder;
