import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { strings } from "../../Utilities/Language";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { getLanguage } from "../../Utilities/Language/language";
import { spacing, fontSizes, color } from "../../Utilities/Constants/Constant";

import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../Storage/token";
import { getVersionCheckData } from "../../Redux/VersionCheckDispatcher";
import { Button } from "react-native-paper";

const Splash = ({ route, navigation }) => {
  const dispatchVersionCheck = useDispatch([getVersionCheckData]);
  const versioncheck = useSelector((state) => state.versioncheck);

  useEffect(() => {
    checkLanguage();
  }, []);

  const fetchVersionData = async () => {
    await dispatchVersionCheck(getVersionCheckData());
  };

  // useEffect(() => {
  //   const willFocusSubscription = navigation.addListener("focus", () => {
  //     fetchVersionData();
  //   });
  //   return willFocusSubscription;
  // }, []);

  const checkLanguage = async () => {
    let language = await getLanguage();
    if (language != null && language != undefined) {
      changeLanguage(language);
    } else {
      changeLanguage({ name: "English", langCode: "en" });
    }
  };

  const checkLogin = () => {
    getToken()
      .then(function (token) {
        return token;
      })
      .then(function (token) {
        if (
          token.accessToken == null &&
          typeof token.accessToken == "undefined"
        ) {
          navigation.navigate("Login");
        } else {
          navigation.navigate("BottomBar");
        }
      });
  };

  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 1.3, backgroundColor: "white", padding: 20 }}>
        <Image
          style={styles.logo}
          source={require("../../Assets/icons/ic_td123_logo.png")}
        ></Image>
      </View>
      <View style={[styles.triangleCorner]}></View>
      <View style={{ flex: 3, backgroundColor: color.BCAE_PRIMARY }}>
        <View style={{ width: "100%", padding: 40 }}>
          <Text style={styles.highlightText}>{strings.brand_name}</Text>
          <Text
            style={{
              alignSelf: "flex-end",
              backgroundColor: color.VERSION_BACKGROUND,
            }}
          >
            {strings.version}
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Button
            label={strings.get_started}
            disabled={false}
            onPress={checkLogin}
          >
            {strings.get_started}
          </Button>
        </View>
      </View>
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
    color: color.WHITE,
    fontSize: fontSizes.FONT_19 * 2,
    fontWeight: "100",
    lineHeight: spacing.HEIGHT_27 * 2,
  },
});
export default Splash;
