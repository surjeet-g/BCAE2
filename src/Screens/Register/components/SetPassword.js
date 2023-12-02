import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import { CustomInput } from "../../../Components/CustomInput";
import { userRegister } from "../../../Redux/RegisterDispatcher";
import {
  DEBUG_BUILD,
  PROD_PRIVACY,
  PROD_TERMS,
  STAGE_PRIVACY,
  STAGE_TERMS,
  color,
  spacing,
  validatePassword,
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";
import { showErrorMessage } from "./RegisterPersonal";

export const SetPasswordScreen = ({ navigation, route }) => {
  // const {
  //   params: { formData },
  // } = route;
  const dispatch = useDispatch([userRegister]);
  const formData = '{"dummy":"dummy","accountType":"personal"}';
  let accountType = "";

  try {
    accountType = JSON.parse(formData).accountType;
    console.log("accountType", accountType);
  } catch (error) {
    console.log("Can't parse account type");
    navigation.back();
  }
  const [isSelected, setSelection] = useState(false);
  const [isSelectedTerm, setSelectionTerm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setConfirmPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [isButtomDiable, setButtomEnableDisable] = useState(true);
  const [termError, setTermError] = useState("");
  const [privaceyError, setPrivaceyError] = useState("");

  const submit = async () => {
    setLoader(true);
    const resp = await dispatch(
      userRegister(
        { data: "123" },
        "Register",
        (msg) => {
          setLoader(false);
          alert(msg);
        },
        () => {
          setLoader(false);
        }
      )
    );

    return;
    if (!validatePassword(password)) {
      setPasswordError(strings.passwordValidError);
    } else if (!validatePassword(confirmPassword)) {
      setConfirmPasswordError(strings.passwordValidError);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(strings.passwordandconfirmpasswordnotsame);
    } else if (!isSelectedTerm) {
      setTermError(strings.termError);
    } else if (!isSelected) {
      setPrivaceyError(strings.privaceyError);
    } else {
      //to do api
    }
  };
  const onCheckBoxClickTerm = () => {
    //console.log("onCheckBoxClickTerm====>isSelectedTerm==>"+isSelectedTerm)
    setSelectionTerm(!isSelectedTerm);

    setTermError("");
  };
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <CustomInput
          value={password}
          caption={strings.password}
          placeHolder={strings.password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              onPress={() => setsecureTextEntry(!secureTextEntry)}
              style={{ width: 23, height: 23 }}
              icon={
                secureTextEntry
                  ? require("../../../Assets/icons/ic_password_show.png")
                  : require("../../../Assets/icons/ic_password_hide.png")
              }
            />
          }
        />

        {/* {showErrorMessage("sds")} */}
        {passwordError !== "" && showErrorMessage(passwordError)}
      </View>

      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          textColor="#ea272c"
          value={confirmPassword}
          label={strings.confirmPassword}
          placeHolder={strings.confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={secureTextEntryConfim}
          right={
            <TextInput.Icon
              onPress={() => setsecureTextEntryConfim(!secureTextEntryConfim)}
              style={{ width: 23, height: 23 }}
              icon={
                secureTextEntryConfim
                  ? require("../../../Assets/icons/ic_password_show.png")
                  : require("../../../Assets/icons/ic_password_hide.png")
              }
            />
          }
        />

        {passwordConfirmError !== "" && showErrorMessage(passwordConfirmError)}
      </View>
      <Pressable
        onPress={() => {
          console.log("hiint g");
          setSelection(!isSelected);
          setTermError("");
          setPrivaceyError("");
        }}
        style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
      >
        <Image
          style={styles.checkBox}
          source={
            isSelected
              ? require("../../../Assets/icons/ci_checked.png")
              : require("../../../Assets/icons/ci_uncheck.png")
          }
        ></Image>
        <Text style={{ marginLeft: spacing.WIDTH_8 }}>I have read your </Text>
        <Text
          onPress={() =>
            navigation.navigate("ShowWebPage", {
              fromLogin: true,
              title: "Privacy Policy",
              url: DEBUG_BUILD ? STAGE_PRIVACY : PROD_PRIVACY,
            })
          }
          style={{ color: color.BCAE_DARK_BLUE }}
        >
          Privacy Policy.
        </Text>
      </Pressable>
      {privaceyError !== "" && showErrorMessage(privaceyError)}

      <Pressable
        onPress={onCheckBoxClickTerm}
        style={{ flexDirection: "row", marginTop: spacing.HEIGHT_24 }}
      >
        <Image
          style={styles.checkBox}
          source={
            isSelectedTerm
              ? require("../../../Assets/icons/ci_checked.png")
              : require("../../../Assets/icons/ci_uncheck.png")
          }
        ></Image>
        <Text style={{ marginLeft: spacing.WIDTH_8 }}>
          I have agree to your{" "}
        </Text>
        <Text
          onPress={() =>
            navigation.navigate("ShowWebPage", {
              fromLogin: true,
              title: "Terms & Conditions",
              url: DEBUG_BUILD ? STAGE_TERMS : PROD_TERMS,
            })
          }
          style={{ color: color.BCAE_DARK_BLUE }}
        >
          Terms &amp; Conditions.
        </Text>
      </Pressable>
      {termError !== "" && showErrorMessage(termError)}

      <Button
        // disabled={password === "" || confirmPassword === ""}
        onPress={submit}
        mode="contained"
        loading={loader}
        buttonColor={"#4a5996"}
      >
        REGISTER
      </Button>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BCAE_OFF_WHITE,
  },
});
