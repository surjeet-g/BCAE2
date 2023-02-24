import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  DEBUG_BUILD,
  STAGE_FAQ,
  PROD_FAQ,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { ToggleButton } from "../../Components/ToggleButton";
import CustomerEmailForgotPassword from "./component/CustomerEmailForgotPassword";
import { SvgBG } from "../../Components/SvgBG";
import { Toast } from "../../Components/Toast";

import { useSelector } from "react-redux";
import CustomerIDForgotPassword from "./component/CustomerIDForgotPassword";
import { HEADER_MARGIN } from "../../Utilities/themeConfig";

const ForgotPassword = ({ route, navigation }) => {
  let login = useSelector((state) => state.login);
  // const { isFirst } = route.params;
  const isFirst = false;
  const [isFirstSelected, setFirstSelected] = useState(isFirst);

  const onPressFirst = () => {
    setFirstSelected(true);
  };
  const onPressSecond = () => {
    setFirstSelected(false);
  };

  const orSection = () => {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: spacing.HEIGHT_32,
        }}
      >
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
          }}
        ></View>
        <Text style={styles.orText}>{strings.or}</Text>
        <View
          style={{
            width: "43%",
            height: 1,
            backgroundColor: color.DISABLED_GREY,
            alignContent: "flex-end",
          }}
        ></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SvgBG />
      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: spacing.WIDTH_30,
          ...HEADER_MARGIN,
        }}
        nestedScrollEnabled={true}
      >
        <View style={{ marginBottom: spacing.WIDTH_20 }}>
          <ToggleButton
            isFirstSelected={isFirstSelected}
            label={{
              first: strings.customer_email_ID,
              second: "User ID",
            }}
            bgColor={{
              selected: color.BCAE_PRIMARY,
              unselected: color.BCAE_LIGHT_BLUE_2,
            }}
            textColor={{
              selected: color.WHITE,
              unselected: color.BCAE_PRIMARY,
            }}
            textPro={{
              fontSize: fontSizes.FONT_13,
              fontWeight: "600",
              lineHeight: spacing.HEIGHT_16,
            }}
            onPressFirst={onPressFirst}
            onPressSecond={onPressSecond}
          ></ToggleButton>
        </View>
        {isFirstSelected ? (
          <CustomerEmailForgotPassword navigation={navigation} />
        ) : (
          <CustomerIDForgotPassword navigation={navigation} />
        )}

        {orSection()}

        <View>
          <Text style={styles.noAccText}>{strings.dont_account}</Text>
          <Pressable
            onPress={() => navigation.navigate("Register with us", {})}
          >
            <Text style={styles.rgisterText}>
              {strings.register_with_us.toUpperCase()}
            </Text>
          </Pressable>
        </View>
        <View style={{ paddingBottom: spacing.HEIGHT_40 * 3 }} />
      </ScrollView>

      {!login.initLogin &&
        (login?.loggedProfile?.errorCode == "10000" ||
          login?.loggedProfile?.errorCode == "10001") && (
          <View style={styles.toast}>
            <Toast
              bgColor={color.TOAST_RED}
              customStyle={{ paddingHorizontal: spacing.WIDTH_30 }}
              textPro={{
                color: color.WHITE,
                fontSize: fontSizes.FONT_14,
                fontWeight: "700",
              }}
              img={
                login?.loggedProfile?.errorCode == "10001"
                  ? require("../../Assets/icons/ic_no_Internet.png")
                  : require("../../Assets/icons/ci_error-warning-fill.png")
              }
              message={
                login?.loggedProfile?.errorCode == "10001"
                  ? strings.no_network
                  : strings.something_went_wrong
              }
            />
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
  logo: {
    height: 128,
    width: 128,
  },
  toast: {
    position: "absolute",
    bottom: spacing.HEIGHT_31 * 2,
  },
  orText: {
    color: color.BCAE_LIGHT_BLUE,
    fontSize: fontSizes.FONT_10,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_16,
    paddingHorizontal: spacing.WIDTH_7,
  },
  noAccText: {
    marginTop: spacing.HEIGHT_32,
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    lineHeight: spacing.WIDTH_14,
    textAlign: "center",
  },
  rgisterText: {
    marginTop: spacing.HEIGHT_6,
    fontWeight: "500",
    color: color.BCAE_PRIMARY,
    fontSize: fontSizes.FONT_14,
    lineHeight: spacing.WIDTH_17,
    textAlign: "center",
  },
  upperText: {
    color: color.PLACEHOLDER,
    fontSize: fontSizes.FONT_12,
    fontWeight: "500",
    marginTop: 5,
    lineHeight: spacing.WIDTH_14,
  },
  upperLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
  },
});

export default ForgotPassword;
