import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../TabScreens/Component/Header";
import { Button, TextInput } from "react-native-paper";
import {
  spacing,
  color,
  validatePassword,
} from "../../../Utilities/Constants/Constant";
import { strings } from "../../../Utilities/Language";
import { showErrorMessage } from "./RegisterPersonal";
export const SetPasswordScreen = ({ navigation, route }) => {
  // const {
  //   params: { formData },
  // } = route;

  const formData = '{"dummy":"dummy","accountType":"personal"}';
  let accountType = "";

  try {
    accountType = JSON.parse(formData).accountType;
    console.log("accountType", accountType);
  } catch (error) {
    console.log("Can't parse account type");
    navigation.back();
  }
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setConfirmPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [secureTextEntryConfim, setsecureTextEntryConfim] = useState(true);
  const [isButtomDiable, setButtomEnableDisable] = useState(true);
  const [termError, setTermError] = useState("");
  const [privaceyError, setPrivaceyError] = useState("");
  const submit = () => {
    if (!validatePassword(password)) {
      setPasswordError(strings.passwordValidError);
    } else if (!validatePassword(confirmPassword)) {
      setConfirmPasswordError(strings.passwordValidError);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(strings.passwordandconfirmpasswordnotsame);
    } else {
      //to do api
    }
  };

  return (
    <View style={styles.container}>
      <Header
        Text={"Set Password"}
        navigation={navigation}
        backIconVisibility={true}
        registerfaq={true}
      />

      <View style={{ marginBottom: spacing.HEIGHT_20 }}>
        <TextInput
          mode="flat"
          style={{
            backgroundColor: "transparent",
          }}
          textColor="#ea272c"
          value={password}
          label={strings.password}
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
      <Button
        disabled={password === "" || confirmPassword === ""}
        onPress={submit}
        mode="contained"
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
