import React, { useEffect, useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { View, Button } from "react-native";

export const Login = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "638155044511-6jaevsij1eisl66jeubv7qb7166ejlbs.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("Cancel");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("PLAY_SERVICES_NOT_AVAILABLE");
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const { colors } = useTheme();
  return (
    <View>
      <View>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
      <View>
        {!loggedIn && <Text>You are currently logged out</Text>}
        {loggedIn && (
          <Button onPress={signOut} title="LogOut" color="red"></Button>
        )}
      </View>
    </View>
  );
  return (
    <Grid>
      <Col>
        <Text variant="displayLarge" style={{ color: colors.primary }}>
          Display Large
        </Text>
        <Text variant="displayMedium" style={{ color: colors.secondary }}>
          Display Medium
        </Text>
        <Text variant="displaySmall" style={{ color: colors.tertiary }}>
          Display small
        </Text>

        <Text variant="headlineLarge">Headline Large</Text>
        <Text variant="headlineMedium">Headline Medium</Text>
        <Text variant="headlineSmall">Headline Small</Text>

        <Text variant="titleLarge">Title Large</Text>
        <Text variant="titleMedium">Title Medium</Text>
        <Text variant="titleSmall">Title Small</Text>

        <Text variant="bodyLarge">Body Large</Text>
        <Text variant="bodyMedium">Body Medium</Text>
        <Text variant="bodySmall">Body Small</Text>

        <Text variant="labelLarge">Label Large</Text>
        <Text variant="labelMedium">Label Medium</Text>
        <Text variant="labelSmall">Label Small</Text>
      </Col>
      <Col>
        <Row>
          <Text variant="labelSmall">Label Small</Text>
        </Row>
        <Row>
          <Text variant="labelSmall">Label Small</Text>
        </Row>
      </Col>
    </Grid>
  );
};
