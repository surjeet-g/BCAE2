import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { getToken } from "../../Storage/token";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { changeLanguage } from "../../Utilities/Language/MulitLanguageSupport";
import { getLanguage } from "../../Utilities/Language/language";
var { height, width } = Dimensions.get("screen");

/**
* Check if user is already logged in or not. if logged, navigate to homescreen 
* @namespace Splash
*/
const Splash = ({ route, navigation }) => {
  const [counter, setCounter] = useState(1)
  const { colors } = useTheme();
  // const dispatchVersionCheck = useDispatch([getVersionCheckData]);
  // const versioncheck = useSelector((state) => state.versioncheck);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      checkLanguage();
      setTimeout(() => {
        checkLogin()
      }, 3000)
    });
    return willFocusSubscription;
  }, []);

  const checkLanguage = async () => {
    let language = await getLanguage();
    if (language != null && language != undefined) {
      changeLanguage(language);
    } else {
      changeLanguage({ name: "English", langCode: "en" });
    }
    setCounter(counter + 1)
  };

  /**
  * Check if user is already logged in or not. if logged, navigate to homescreen 
  * @memberOf Splash
  */
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
    <View style={{ justifyContent: "center", backgroundColor: colors.background, flex: 1 }}>

      <Image
        source={require("../../Assets/icons/logo_new1.png")}
        // resizeMode="cover"
        style={{
          alignSelf: "center",
          padding: 0,
          width: 400,
          height: 100
          // flex: 1,
        }}
      />

      <Text
        variant="labelSmall"
        style={{ textAlign: "center", marginTop: 20 }}
      >
        1.0.0
      </Text>

      {/* <Text
        variant="labelSmall"
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        © {new Date().getFullYear()} NCRTC. All rights reserved.
      </Text> */}


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
    color: color.BCAE_DARK_BLUE,
    textAlign: "left",
    fontSize: fontSizes.FONT_19 * 2,
    fontWeight: "600",
    lineHeight: spacing.HEIGHT_25 * 2,
  },
});

export default Splash;
