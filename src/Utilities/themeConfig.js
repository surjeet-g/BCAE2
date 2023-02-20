import { MD3LightTheme as DefaultTheme } from "react-native-paper";
export const FONT_FAMILY = "Avenir-Book";
export const FONT_FAMILY_MEDIUM = "Avenir-Book";
//roximanova-regular
const theme = {
  ...DefaultTheme,
  roundness: 4, //
  colors: {
    ...DefaultTheme.colors,
    primary: "#375b9e",
    onPrimaryContainer: "#88a5da",
    secondary: "#f5ad46 ",
    tertiary: "#f5ad46",
    // myOwnColor: "blue",
    background: "#ffffff",
    surfaceVariant: "#ffffff",
    // surface: "#ffffff",
    onSurface: "#212223",
    // outline: "black",
  },
  fonts: {
    bodyLarge: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0.15,
      fontWeight: "400",
      lineHeight: 24,
      fontSize: 16,
    },
    bodyMedium: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0.25,
      fontWeight: "400",
      lineHeight: 20,
      fontSize: 14,
    },
    bodySmall: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0.4,
      fontWeight: "400",
      lineHeight: 16,
      fontSize: 12,
    },
    displayLarge: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0,
      fontWeight: "400",
      lineHeight: 64,
      fontSize: 57,
    },
    displayMedium: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0,
      fontWeight: "400",
      lineHeight: 52,
      fontSize: 45,
    },
    displaySmall: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0,
      fontWeight: "400",
      lineHeight: 44,
      fontSize: 36,
    },
    headlineLarge: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0,
      fontWeight: "400",
      lineHeight: 40,
      fontSize: 32,
    },
    headlineMedium: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0,
      fontWeight: "400",
      lineHeight: 36,
      fontSize: 28,
    },
    headlineSmall: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0,
      fontWeight: "400",
      lineHeight: 32,
      fontSize: 24,
    },
    labelLarge: {
      fontFamily: FONT_FAMILY_MEDIUM,
      letterSpacing: 0.1,
      fontWeight: "500",
      lineHeight: 20,
      fontSize: 14,
    },
    labelMedium: {
      fontFamily: FONT_FAMILY_MEDIUM,
      letterSpacing: 0.5,
      fontWeight: "500",
      lineHeight: 16,
      fontSize: 12,
    },
    labelSmall: {
      fontFamily: FONT_FAMILY_MEDIUM,
      letterSpacing: 0.5,
      fontWeight: "500",
      lineHeight: 16,
      fontSize: 13,
    },
    titleLarge: {
      fontFamily: FONT_FAMILY,
      letterSpacing: 0,
      fontWeight: "400",
      lineHeight: 28,
      fontSize: 22,
    },
    titleMedium: {
      fontFamily: FONT_FAMILY_MEDIUM,
      letterSpacing: 0.15,
      fontWeight: "500",
      lineHeight: 24,
      fontSize: 16,
    },
    titleSmall: {
      fontFamily: FONT_FAMILY_MEDIUM,
      letterSpacing: 0.1,
      fontWeight: "500",
      lineHeight: 20,
      fontSize: 17,
    },
  },
};

export default theme;
