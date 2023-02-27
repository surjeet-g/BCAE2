import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Platform } from "react-native";

const RNFetchBlob = require("rn-fetch-blob").default;
import { BASE_URL, PROD_BASE_URL } from "../API/ApiConstants";
import theme from "../themeConfig";

export const ACCOUNT_TYPE = {
  PERSONAL: "personal",
  EXISTING: "existing",
};
export const SECERT_KEY = "(*Hnjkn2kjn";

export const WEBCLIENT_ID =
  "638155044511-6jaevsij1eisl66jeubv7qb7166ejlbs.apps.googleusercontent.com";
export const GOOGLE_API_KEY = "AIzaSyBGKi6f1zYwwra1LVNtthEp6VPzUkvcPkk";
const salt = "AE0DB48EBF4DDE3E59ABF92F1953F02A390B584CF65EE981E4598561D69F09D5";

const LOG_ENABLED = false;
export const DEBUG_BUILD = true;
export const STAGE_CHAT_URL =
  "https://st-td123.comquest-brunei.com:13443/chatbot/";
export const PROD_CHAT_URL = "https://123.comquest-brunei.com/chatbot/";

export const STAGE_FAQ = BASE_URL + "FAQ.html";
export const PROD_FAQ = PROD_BASE_URL + "FAQ.html";

export const STAGE_TERMS =
  "https://bcae-test.comquest-brunei.com:1443/terms.html";
export const PROD_TERMS = PROD_BASE_URL + "terms.html";

export const STAGE_PRIVACY =
  "https://bcae-test.comquest-brunei.com:1443/privacy.html";
export const PROD_PRIVACY = PROD_BASE_URL + "privacy.html";

export const ISIPAD = Platform.isPad;

export const DEFAULT_PROFILE_IMAGE =
  "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";

export const spacing = {
  WIDTH_1: wp("0.25%"),
  HEIGHT_1: hp("0.125%"),

  WIDTH_2: wp("0.5%"),
  HEIGHT_2: hp("0.25%"),

  WIDTH_3: wp("0.75%"),
  HEIGHT_3: hp("0.37%"),

  WIDTH_4: wp("1%"),
  HEIGHT_4: hp("0.5%"),

  WIDTH_5: wp("1.25%"),
  HEIGHT_5: hp("0.63%"),

  WIDTH_6: wp("1.5%"),
  HEIGHT_6: hp("0.75%"),

  WIDTH_7: wp("1.75%"),
  HEIGHT_7: hp("0.88%"),

  WIDTH_8: wp("2%"),
  HEIGHT_8: hp("1%"),

  WIDTH_9: wp("2.25%"),
  HEIGHT_9: hp("1.12%"),

  WIDTH_10: wp("2.5%"),
  HEIGHT_10: hp("1.25%"),

  WIDTH_11: wp("2.75%"),
  HEIGHT_11: hp("1.37%"),

  WIDTH_12: wp("3%"),
  HEIGHT_12: hp("1.5%"),

  WIDTH_13: wp("3.25%"),
  HEIGHT_13: hp("1.63%"),

  WIDTH_14: wp("3.5%"),
  HEIGHT_14: hp("1.75%"),

  WIDTH_15: wp("3.75%"),
  HEIGHT_15: hp("1.88%"),

  WIDTH_16: wp("4%"),
  HEIGHT_16: hp("2%"),

  WIDTH_17: wp("4.25%"),
  HEIGHT_17: hp("2.4%"),

  WIDTH_18: wp("4.5%"),
  HEIGHT_18: hp("2.25%"),

  WIDTH_19: wp("4.75%"),
  HEIGHT_19: hp("2.375%"),

  WIDTH_20: wp("5%"),
  HEIGHT_20: hp("2.5%"),

  WIDTH_21: wp("5.25%"),
  HEIGHT_21: hp("2.625%"),

  WIDTH_22: wp("5.5%"),
  HEIGHT_22: hp("2.75%"),

  WIDTH_23: wp("5.75%"),
  HEIGHT_23: hp("2.88%"),

  WIDTH_24: wp("6%"),
  HEIGHT_24: hp("3%"),

  WIDTH_25: wp("6.25%"),
  HEIGHT_25: hp("3.12%"),

  WIDTH_26: wp("6.5%"),
  HEIGHT_26: hp("3.25%"),

  WIDTH_27: wp("6.75%"),
  HEIGHT_27: hp("3.375%"),

  WIDTH_28: wp("7%"),
  HEIGHT_28: hp("3.5%"),

  WIDTH_29: wp("7.25%"),
  HEIGHT_29: hp("3.625%"),

  WIDTH_30: wp("7.5%"),
  HEIGHT_30: hp("3.75%"),

  WIDTH_31: wp("7.75%"),
  HEIGHT_31: hp("3.87%"),

  WIDTH_32: wp("8%"),
  HEIGHT_32: hp("4%"),

  WIDTH_33: wp("8.25%"),
  HEIGHT_33: hp("4.12%"),

  WIDTH_34: wp("8.5%"),
  HEIGHT_34: hp("4.25%"),

  WIDTH_35: wp("8.75%"),
  HEIGHT_35: hp("4.37%"),

  WIDTH_36: wp("9%"),
  HEIGHT_36: hp("4.5%"),

  WIDTH_37: wp("9.25%"),
  HEIGHT_37: hp("4.625%"),

  WIDTH_38: wp("9.5%"),
  HEIGHT_38: hp("4.75%"),

  WIDTH_39: wp("9.75%"),
  HEIGHT_39: hp("4.87%"),

  WIDTH_40: wp("10%"),
  HEIGHT_40: hp("5%"),

  WIDTH_41: wp("10.25%"),
  HEIGHT_41: hp("5.12%"),

  WIDTH_42: wp("10.5%"),
  HEIGHT_42: hp("5.25%"),

  WIDTH_43: wp("10.75%"),
  HEIGHT_43: hp("5.37%"),

  WIDTH_44: wp("11%"),
  HEIGHT_44: hp("5.5%"),

  WIDTH_45: wp("11.25"),
  HEIGHT_45: hp("5.625"),

  WIDTH_46: wp("11.5"),
  HEIGHT_46: hp("5.75"),

  WIDTH_47: wp("11.75"),
  HEIGHT_47: hp("5.87"),

  WIDTH_48: wp("12"),
  HEIGHT_48: hp("6"),

  WIDTH_49: wp("12.25"),
  HEIGHT_49: hp("6.125"),

  WIDTH_50: wp("12.5%"),
  HEIGHT_50: hp("6.25%"),
};

export const bottomBarHeight = 50;

export const fontSizes = {
  FONT_6: ISIPAD ? wp("1%") : wp("1.5%"),
  FONT_8: ISIPAD ? wp("1.5%") : wp("2%"),
  FONT_10: ISIPAD ? wp("2%") : wp("2.5%"),
  FONT_11: ISIPAD ? wp("2.25%") : wp("2.75%"),
  FONT_12: ISIPAD ? wp("2.5%") : wp("3%"),
  FONT_13: ISIPAD ? wp("2.75%") : wp("3.25%"),
  FONT_14: ISIPAD ? wp("3%") : wp("3.5%"),
  FONT_15: ISIPAD ? wp("3.25%") : wp("3.75"),
  FONT_16: ISIPAD ? wp("3.5%") : wp("4%"),
  FONT_17: ISIPAD ? wp("3.75%") : wp("4.25%"),
  FONT_18: ISIPAD ? wp("4%") : wp("4.5%"),
  FONT_19: ISIPAD ? wp("4.25%") : wp("4.75%"),
  FONT_20: ISIPAD ? wp("4.5%") : wp("5%"),
  FONT_22: ISIPAD ? wp("5%") : wp("5.5%"),
  FONT_24: ISIPAD ? wp("5.5%") : wp("6%"),
  FONT_26: ISIPAD ? wp("6%") : wp("6.5%"),
  FONT_28: ISIPAD ? wp("6.5%") : wp("7%"),
  FONT_30: ISIPAD ? wp("7%") : wp("7.5%"),
  FONT_32: ISIPAD ? wp("7.5%") : wp("8%"),
  FONT_34: ISIPAD ? wp("8%") : wp("8.5%"),
  FONT_36: ISIPAD ? wp("8.5%") : wp("9%"),
  FONT_38: ISIPAD ? wp("9%") : wp("9.5%"),
  FONT_40: ISIPAD ? wp("9.5%") : wp("10%"),
};

export const color = {
  BCAE_PRIMARY: theme.colors.primary,
  BCAE_LIGHT_BLUE: "#365B9E",
  BCAE_LIGHT_BLUE_2: "#FFF7F7",
  BCAE_LIGHT_BLUE_3: "#4F86EC",
  BCAE_DARK_BLUE: "#292D32",
  BCAE_OFF_WHITE: "#F5F5F5",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  TRANSPARENT: "transparent",
  PLACEHOLDER: "#9E9E9E",
  DISABLED_GREY: "#DCDCDC",
  DARK_GREY: "#6C6C6C",
  INPUT_TEXT_BORDER: "#CECECE",
  ERROR_TEXT_RED: "#D64538",
  TOAST_RED: "#FF0000",
  PROFILE_NAME: "#292D32",
  CLICK_BACK_TEXT: "#090A0A",
  VERSION_BACKGROUND: "#FAD706",
};

export const buttonType = {
  PRIMARY: 1,
  SECONDARY: 2,
};

export const buttonSize = {
  LARGE: 1,
  FLEXI: 2,
  FIXED: 3,
  SMALL: 4,
  MEDIUM: 5,
};

export const storageKeys = {
  LAST_LOGINT_TIMESTAMP: "LAST_LOGINT_TIMESTAMP",
  VERSION_CODE: "VERSION_CODE",
  DASHBOARD_DATA: "DASHBOARD_DATA",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  LANGUAGE_KEY: "LANGUAGE_KEY",
  SAVED_LOCATION: "SAVED_LOCATION",
  PROFILE_DETAILS: "PROFILE_DETAILS",
  FCM_DEVICE_ID: "FCM_DEVICE_ID",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
  GEOCODER_DATA: "GEOCODER_DATA",
};

export function validateEmail(text) {
  let reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(text) === false) {
    //console.log("Email is Not Correct");
    return false;
  } else {
    //console.log("Email is Correct");
    return true;
  }
}

export function validatePassword(text) {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

  let reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  if (reg.test(text) === false) {
    //console.log("Password is Not Correct");
    return false;
  } else {
    //console.log("Password is Correct");
    return true;
  }
}

export async function passwordHash(password) {
  console.log("passwordHash===>" + password);

  const encodedPassword = await RNFetchBlob.base64.encode(password);
  console.log(encodedPassword);
  let val = [encodedPassword, salt].join("$");

  console.log("val===>" + val);
  return val;
}

export function validateNumber(text) {
  if (text.length >= 6) {
    return true;
  } else {
    return false;
  }
}

export function TDLog(fileName, text) {
  if (LOG_ENABLED) {
    console.debug(
      "\n===TDLog==TD123=======>" + fileName + "===========> :" + text
    );
  }
}
