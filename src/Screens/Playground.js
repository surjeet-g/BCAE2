import React, { useEffect } from "react";
import { View, Image, ScrollView, Platform } from "react-native";
import BG from "../Assets/svg/bg.svg";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  Button,
  TextInput,
  RadioButton,
  Divider,
  Text,
  useTheme,
  Surface,
  ActivityIndicator,
  Appbar,
  Badge,
  ProgressBar,
  Tooltip,
  IconButton,
} from "react-native-paper";
import { Col, Grid, Row } from "react-native-easy-grid";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
import SvgUri from "react-native-svg-uri";

export const Playground = () => {
  const theme = useTheme();
  console.log("them", theme);

  return (
    <ScrollView>
      <Surface elevation={4}>
        {false && (
          <>
            <Appbar.Header>
              <Appbar.Content title="Title" subtitle={"Subtitle"} />
              <Appbar.Action icon="magnify" onPress={() => {}} />
              <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
            </Appbar.Header>
            <Badge>3</Badge>
            <ProgressBar progress={0.5} />

            {/* <Grid>
          <Col size={1} style={{ backgroundColor: "red" }}>
            <Text>One</Text>
            <Text>Two</Text>
          </Col>
          <Col size={2} style={{ backgroundColor: "green" }}>
            <Text>Three</Text>
            <Text>Four</Text>
          </Col>
        </Grid> */}
            <Tooltip title="Selected Camera">
              <Text>Tooltip</Text>
            </Tooltip>
            <ActivityIndicator animating={true} />

            <TextInput
              mode="flat"
              style={{
                backgroundColor: "transparent",
              }}
              value={"Value"}
              label="Name"
              placeHolder="Name"
              //   onChangeText={(text) => onIDChange(text)}
              right={
                <TextInput.Icon
                  //   style={{ width: 23, height: 23 }}
                  icon={require("../Assets/icons/ic_close.png")}
                />
              }
            />
            <Divider style={{ marginVertical: 12 }} />
            <Button
              mode="contained"
              // onPress={submit}
              // disabled={username == "" || password == "" ? true : false}
              disabled={false}
            >
              Submit
            </Button>
            <Divider style={{ marginVertical: 12 }} />
            <RadioButton status="checked" />
            <Text variant="labelMedium">Male</Text>
            <Divider />
            <Grid>
              <Row>
                <Text
                  variant="labelSmall"
                  style={{
                    // fontFamily: "Proximanova-regular",
                    fontSize: 15,
                  }}
                >
                  - Primary:
                </Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,

                    backgroundColor: theme.colors.primary,
                  }}
                ></View>
                <Text variant="labelSmall">secondary</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.secondary,
                  }}
                ></View>
                <Text variant="labelSmall">tertiary</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.tertiary,
                  }}
                ></View>
              </Row>
              <Row>
                <Text variant="labelSmall">pContainer</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.primaryContainer,
                  }}
                ></View>

                <Text variant="labelSmall">secondary</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.secondaryContainer,
                  }}
                ></View>
                <Text variant="labelSmall">t-tertiary</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.tertiaryContainer,
                  }}
                ></View>
              </Row>

              <Row>
                <Text variant="labelSmall">error</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.error,
                  }}
                ></View>
                <Text variant="labelSmall">errorContainer</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.errorContainer,
                  }}
                ></View>
              </Row>
              <Row>
                <Text variant="labelSmall">backgorund</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.background,
                  }}
                ></View>
              </Row>
              <Row>
                <Text variant="labelSmall">surfaceVariant</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.surfaceVariant,
                  }}
                ></View>
                <Text variant="labelSmall">OUTLIINE</Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 22,
                    marginLeft: 12,
                    backgroundColor: theme.colors.outline,
                  }}
                ></View>
              </Row>
            </Grid>
          </>
        )}
        {/* <Divider style={{ marginVertical: 12 }} /> */}
        {true && (
          <>
            <Text variant="displayLarge">Display Large</Text>
            <Text variant="displayMedium">Display Medium</Text>
            <Text variant="displaySmall">Display small</Text>

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
          </>
        )}
      </Surface>
    </ScrollView>
  );
};
