import { MD3LightTheme as DefaultTheme } from "react-native-paper";
export const FONT_FAMILY = "";
export const FONT_FAMILY_MEDIUM = "";
export const HEADER_MARGIN = { marginTop: 0, paddingTop: 70 };

export const SHADOW_STYLE = {
  elevation: 1,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.8,
  shadowRadius: 1,
};
//roximanova-regular
const theme = {
  ...DefaultTheme,
  roundness: 3, //
  colors: {
    ...DefaultTheme.colors,
    primary: "#9C8FC4",
    inversePrimary: "#DBDBDB",
    onPrimaryContainer: "#88a5da",
    secondary: "#23374e",
    yellow: "#f5ad46",
    inverseSecondary: "#fff",
    tertiary: "#fff",
    gray: "#C7CAD1",
    background: "#ffffff",
    surfaceVariant: "#ffffff",
    // surface: "#ffffff",
    onSurface: "#212223",
    buttonDisableColor: "#DBDBDB",
    onSurfaceVariant: "#202223",
    // outline: "black",
    graylabel: "#848A93",
    toggleBackground: "#F2EFFF",
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
      fontSize: 18,
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
      fontWeight: "600",
      lineHeight: 40,
      fontSize: 44,
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
    //button
    labelLarge: {
      fontFamily: FONT_FAMILY_MEDIUM,
      letterSpacing: 0.1,
      fontWeight: "600",
      lineHeight: 20,
      fontSize: 18,
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
      color: "#848A93",
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
