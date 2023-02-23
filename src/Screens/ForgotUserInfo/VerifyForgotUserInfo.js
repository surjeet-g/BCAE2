import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
} from "react-native";
import { spacing, fontSizes, color } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";

import { useDispatch, useSelector } from "react-redux";

import { Button, Checkbox, Divider, TextInput } from "react-native-paper";
import moment from "moment";
import Header from "../TabScreens/Component/Header";
import { Col, Grid, Row } from "react-native-easy-grid";

const VerifyForgotUserInfo = ({ navigation, route }) => {
  console.log("param", route);
  const {
    params: { selectedParams },
  } = route;
  console.log("selected", selectedParams);
  const dispatch = useDispatch([]);
  const [userInput, setUserInput] = useState("");
  const [userInputError, setUserInputError] = useState("");
  const handleSubmit = () => {
    const activeCbox = Object.keys(selectedList).filter(
      (key) => selectedList[key] == true
    );
    console.warn("", activeCbox);
  };
  const showErrorMessage = (errMessage) => {
    return (
      <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
        <Image
          style={styles.errorLogo}
          source={require("../../Assets/icons/ci_error_warning.png")}
        />
        <Text style={styles.errorText}>{errMessage}</Text>
      </View>
    );
  };
  const radioAction = async () => {
    //to do app
  };
  return (
    <View style={styles.container}>
      <Header
        Text="Verify"
        navigation={navigation}
        backIconVisibility={true}
        registerfaq={true}
      ></Header>
      <ScrollView>
        <View>
          <View style={{ marginBottom: spacing.HEIGHT_30 }}>
            <TextInput
              onChangeText={setUserInput}
              value={userInput}
              label={strings.first_name}
              //   placeHolder={strings.first_name}
              right={
                <TextInput.Icon
                  onPress={() => setUserInput("")}
                  style={{ width: 23, height: 23 }}
                  icon={require("../../Assets/icons/ic_close.png")}
                />
              }
            />

            {userInputError !== "" && showErrorMessage(userInputError)}
          </View>

          <Button
            mode="contained"
            label="SUBMIT"
            disabled={false}
            onPress={handleVerify}
          >
            VERIFY
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  forgotText: {
    color: color.BCAE_DARK_BLUE,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
  },
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
  },
  errorLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
    marginTop: -2,
    marginRight: spacing.WIDTH_4,
  },
  noAccText: {
    marginTop: spacing.HEIGHT_32,
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
});

export default VerifyForgotUserInfo;
