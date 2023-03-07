import React, { useEffect, useRef, useMemo, useCallback } from "react";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";

import { useTheme, Switch } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import BCAE_LOGO from "../../Assets/svg/bcae_logo.svg";
import { CustomButton } from "../../Components/CustomButton";
import { StickyFooter } from "../../Components/StickyFooter";
import { getVersionCheckData } from "../../Redux/VersionCheckDispatcher";
import { getToken } from "../../Storage/token";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { getLanguage } from "../../Utilities/Language/language";
var { height, width } = Dimensions.get("screen");

import BottomSheet from "@gorhom/bottom-sheet";
import { ICON_STYLE } from "./../../Utilities/Style/navBar";
import { CustomDropDown } from "./../../Components/CustomDropDown";
import { CustomInput } from "./../../Components/CustomInput";

const InteractionsToOrder = ({ route, navigation }) => {
  // ref
  const interactionsModalRef = useRef(BottomSheet);
  // variables
  const interactionsModalSnapPoints = useMemo(() => ["10%", "70%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [isEnableInteractions, setIsEnableInteractions] = React.useState(false);
  const onToggleInteractionSwitch = () =>
    setIsEnableInteractions(!isEnableInteractions);

  const InteractionsModalView = () => {
    return (
      <View style={styles.modalContainer}>
        {/* ENable Interactions with Close */}
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
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={{ ...ICON_STYLE, color: "#36393D" }}
              source={require("../../Assets/icons/ic_close.png")}
            />
          </TouchableOpacity>
        </View>

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

        {/* Field View */}
        <View style={{ marginHorizontal: 10 }}>
          <CustomDropDown
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            placeHolder={strings.intractionType}
          />
          <CustomDropDown
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            placeHolder={strings.serviceType}
          />
          <CustomDropDown
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            placeHolder={strings.problem_stat_cause}
          />
          <CustomDropDown
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            placeHolder={strings.priority_type}
          />
          <CustomDropDown
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            placeHolder={strings.contact_type}
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
            <CustomButton label={strings.cancel} onPress={() => {}} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.submit} onPress={() => {}} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
  logo: {
    height: "100%",
  },
  container: {
    flex: 1,
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
});
export default InteractionsToOrder;
