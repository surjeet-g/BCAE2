import React, { useEffect } from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";

import { Text, useTheme } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import BCAE_LOGO from "../../Assets/svg/bcae_logo.svg";
import { CustomButton } from "../../Components/CustomButton";
import { getVersionCheckData } from "../../Redux/VersionCheckDispatcher";
import { getToken } from "../../Storage/token";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { getLanguage } from "../../Utilities/Language/language";
var { height, width } = Dimensions.get("screen");

const Splash = ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatchVersionCheck = useDispatch([getVersionCheckData]);
  const versioncheck = useSelector((state) => state.versioncheck);

  useEffect(() => {
    checkLanguage();
  }, []);

  const fetchVersionData = async () => {
    await dispatchVersionCheck(getVersionCheckData(navigation));
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
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <ImageBackground
        source={require("../../Assets/icons/bg.png")}
        resizeMode="cover"
        style={{
          // backgroundColor: colors.background,
          flex: 0.6,
        }}
        // style={[
        //   styles.container,
        //   {
        //     // Try setting `flexDirection` to `"row"`.
        //   },
        // ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 65,
          }}
        >
          <BCAE_LOGO />
        </View>
        <View style={{ marginTop: height * 0.2, alignItems: "center" }}>
          <Text variant="headlineLarge" style={styles.highlightText}>
            {strings.brand_name}
          </Text>
          <Text
            style={{
              backgroundColor: color.VERSION_BACKGROUND,
            }}
          >
            {strings.version}
          </Text>
        </View>

        <View
          style={{
            marginTop: 80,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <CustomButton
            loading={false}
            label={strings.get_started}
            isDisabled={false}
            onPress={checkLogin}
          />
        </View>
      </ImageBackground>
      <Text
        variant="labelSmall"
        style={{
          alignItems: "center",
          textAlign: "center",
          position: "absolute",
          bottom: 15,
          left: "13%",
        }}
      >
        © {new Date().getFullYear()} Bahwan CyberTek. All rights reserved.
      </Text>
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
    color: "#202223",
    fontSize: fontSizes.FONT_19 * 2,
    fontWeight: "600",
    lineHeight: spacing.HEIGHT_27 * 2,
  },
});
export default Splash;
