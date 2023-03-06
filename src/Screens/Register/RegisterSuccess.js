import React from "react";

import { ImageBackground, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import SuccessIMG from "../../Assets/svg/success_register.svg";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { HeaderTitle } from "../../Components/headerTitle";
const RegisterSuccess = ({ navigation, props }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../Assets/icons/bg.png")}
      resizeMode="cover"
    >
      <HeaderTitle header="Congratulations" subHeader="Account created" />

      <Card style={{ marginHorizontal: 12, marginTop: 30 }}>
        <Card.Content style={{ alignItems: "center" }}>
          <SuccessIMG />
          <ClearSpace size={4} />

          <Text variant="labelLarge">Rohit</Text>
          <Text variant="labelLarge">Welcome to BCAE</Text>
        </Card.Content>
      </Card>
      <ClearSpace size={5} />
      <CustomButton
        loading={false}
        label={"Go Login"}
        isDisabled={false}
        onPress={() => navigation.navigate("Login", {})}
      />
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RegisterSuccess;
