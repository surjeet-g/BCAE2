import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SvgBG } from "../../../Components/SvgBG";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
import { TextInput } from "react-native-paper";
import {
  spacing,
  fontSizes,
  color,
  buttonSize,
  DEBUG_BUILD,
  STAGE_FAQ,
  PROD_FAQ,
  WEBCLIENT_ID,
} from "../../../Utilities/Constants/Constant";

const VerifyLoginOTP = (props) => {
  const { navigation, userType, loginMode = "Phone Number" } = props;

  const clickOnRequestAgainOTP = () => {
    alert("ToDo - Call API here");
  };

  return (
    <View style={styles.container}>
      <SvgBG />
      <KeyboardAwareView
        animated={false}
        style={{
          flex: 1,
          paddingHorizontal: spacing.WIDTH_30,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 40,
              fontWeight: 600,
              color: "#202223",
              fontSize: fontSizes.FONT_18,
            }}
          >
            Verify your {loginMode} {"\n"} 99******35
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 400,
              color: "#B1AFAF",
              fontSize: fontSizes.FONT_16,
            }}
          >
            Enter your OTP here
          </Text>
          {/* OTP Box */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TextInput
              mode="outlined"
              multiline={false}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <TextInput
              mode="outlined"
              multiline={false}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <TextInput
              mode="outlined"
              multiline={false}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <TextInput
              mode="outlined"
              multiline={false}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <TextInput
              mode="outlined"
              multiline={false}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <TextInput
              mode="outlined"
              multiline={false}
              style={{
                height: 50,
                width: 50,
              }}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              fontWeight: 400,
              color: "#36393D",
              fontSize: fontSizes.FONT_16,
            }}
          >
            Did't receive code?
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontWeight: 600,
              color: "#F5AD47",
              fontSize: fontSizes.FONT_16,
            }}
            onPress={clickOnRequestAgainOTP}
          >
            Request again?
          </Text>
        </View>
      </KeyboardAwareView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
});

export default VerifyLoginOTP;
