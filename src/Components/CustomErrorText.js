import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { spacing, fontSizes, color } from "../Utilities/Constants/Constant";

const CustomErrorText = (props) => {
  const { errMessage } = props;
  return (
    <View style={{ marginTop: spacing.HEIGHT_6, flexDirection: "row" }}>
      <Image
        style={styles.errorLogo}
        source={require("../Assets/icons/ci_error_warning.png")}
      />
      <Text style={styles.errorText}>{errMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: color.ERROR_TEXT_RED,
    fontSize: fontSizes.FONT_14,
    fontWeight: "500",
    lineHeight: spacing.WIDTH_14,
  },
  errorLogo: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
    marginTop: -2,
    marginRight: spacing.WIDTH_4,
  },
});

export default CustomErrorText;
