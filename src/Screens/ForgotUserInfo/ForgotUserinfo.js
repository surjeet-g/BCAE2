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
import {
  spacing,
  fontSizes,
  color,
  buttonType,
  buttonSize,
  validateEmail,
  validatePassword,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";

import { useDispatch, useSelector } from "react-redux";

import { Button, Checkbox, Divider } from "react-native-paper";
import Header from "../TabScreens/Component/Header";
import { Col, Grid, Row } from "react-native-easy-grid";

const ForgotUserinfo = ({ navigation, props }) => {
  const dispatch = useDispatch([]);
  const INITIAL_CHECK_BOX_DATA = {
    idNumber: true,
    customerId: false,
    mobileNo: false,
    email: false,
  };
  const [selectedList, setSelectedList] = useState(INITIAL_CHECK_BOX_DATA);
  const handleSubmit = () => {
    const activeCbox = Object.keys(selectedList).filter(
      (key) => selectedList[key] == true
    );
    navigation.navigate("VerifyForgotUserInfo", {
      selectedParams: activeCbox,
    });
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

  return (
    <View style={styles.container}>
      <Header
        Text="Forgot Login details"
        navigation={navigation}
        backIconVisibility={true}
        registerfaq={true}
      ></Header>
      <ScrollView>
        <Grid>
          <Row>
            <Text>Forgot ID Number</Text>
            <Checkbox
              status={selectedList.idNumber ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedList({
                  ...selectedList,
                  ...{ idNumber: !selectedList.idNumber },
                });
              }}
            />
          </Row>
          <Divider />
          <Row>
            <Text>Forgot Customer ID</Text>
            <Checkbox
              status={selectedList.customerId ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedList({
                  ...selectedList,
                  ...{ customerId: !selectedList.customerId },
                });
              }}
            />
          </Row>
          <Divider />
          <Row>
            <Text>Forgot Mobile</Text>
            <Checkbox
              status={selectedList.mobileNo ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedList({
                  ...selectedList,
                  ...{ mobileNo: !selectedList.mobileNo },
                });
              }}
            />
          </Row>
          <Divider />
          <Row>
            <Text>Forgot Email</Text>
            <Checkbox
              status={selectedList.email ? "checked" : "unchecked"}
              onPress={() => {
                setSelectedList({
                  ...selectedList,
                  ...{ email: !selectedList.email },
                });
              }}
            />
          </Row>
        </Grid>

        <View>
          <Button
            mode="contained"
            label="SUBMIT"
            disabled={Object.keys(selectedList).every(
              (key) => selectedList[key] == false
            )}
            onPress={handleSubmit}
          >
            SUBMIT
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

export default ForgotUserinfo;
