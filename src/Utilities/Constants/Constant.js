import { Platform } from "react-native";
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { BASE_URL, PROD_BASE_URL } from "../API/ApiConstants";
import theme from "../themeConfig";

const RNFetchBlob = require("rn-fetch-blob").default;

export const ACCOUNT_TYPE = {
  PERSONAL: "personal",
  EXISTING: "existing",
};

export const INPUT_TYPE = {
  INPUTBOX: 0,
  DROPDOWN: 1,

}
export const DATE_FORMAT = "YYYY-MM-DD"
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
  LOGIN_ID: "LOGIN_ID",
  TOKEN_EXPIRY: "TOKEN_EXPIRY",
  USERTYPE: "USERTYPE"
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
  if (text.length > 6) {
    return true;
  } else {
    return false;
  }
}

export function isValidNumber(text) {
  if (text?.charAt(0) == "0") {
    return false;
  } else {
    return true;
  }
}

export function TDLog(fileName, text) {
  if (LOG_ENABLED) {
    console.debug(
      "\n===TDLog==TD123=======>" + fileName + "===========> :" + text
    );
  }
}

export const mockAnnouncementList = [
  {
    id: 1,
    title: "TNEB TANGEDCO AAO Job Recruitment 2023",
    desc: "TNEB Recruitment 2023 Notification For Various Vacancies",
    date: "Today, 03:44 PM",
  },
  {
    id: 2,
    title: "TNEB TANGEDCO AAO Job Recruitment 2022",
    desc: "TNEB Recruitment 2022 Notification For Various Vacancies",
    date: "Today, 12:10 PM",
  },
  {
    id: 3,
    title: "TNEB TANGEDCO AAO Job Recruitment 2021",
    desc: "TNEB Recruitment 2021 Notification For Various Vacancies",
    date: "Today, 11:10 AM",
  },
  {
    id: 4,
    title: "TNEB TANGEDCO AAO Job Recruitment 2020",
    desc: "TNEB Recruitment 2020 Notification For Various Vacancies",
    date: "Today, 09:10 PM",
  },
  {
    id: 5,
    title: "TNEB TANGEDCO AAO Job Recruitment 2019",
    desc: "TNEB Recruitment 2019 Notification For Various Vacancies",
    date: "Today, 01:10 PM",
  },
  {
    id: 6,
    title: "TNEB TANGEDCO AAO Job Recruitment 2018",
    desc: "TNEB Recruitment 2018 Notification For Various Vacancies",
    date: "Today, 06:10 PM",
  },
  {
    id: 7,
    title: "TNEB TANGEDCO AAO Job Recruitment 2017",
    desc: "TNEB Recruitment 2017 Notification For Various Vacancies",
    date: "Today, 01:10 PM",
  },
  {
    id: 8,
    title: "TNEB TANGEDCO AAO Job Recruitment 2016",
    desc: "TNEB Recruitment 2016 Notification For Various Vacancies",
    date: "Today, 06:10 PM",
  },
];

export const supportedCountriesList = [
  {
    countryName: "American Samoa",
    countryShortCode: "AS",
    numberLength: 10,
  },
  {
    countryName: "Antigua and Barbuda",
    countryShortCode: "AG",
    numberLength: 10,
  },
  {
    countryName: "Armenia",
    countryShortCode: "AM",
    numberLength: 8,
  },
  {
    countryName: "Aruba",
    countryShortCode: "AW",
    numberLength: 7,
  },
  {
    countryName: "Australia",
    countryShortCode: "AU",
    numberLength: 9,
  },
  {
    countryName: "Austria",
    countryShortCode: "AT",
    numberLength: 10,
  },
  {
    countryName: "Brunei",
    countryShortCode: "BN",
    numberLength: 7,
  },
  {
    countryName: "China",
    countryShortCode: "CN",
    numberLength: 13,
  },
  {
    countryName: "Czech Republic",
    countryShortCode: "CZ",
    numberLength: 9,
  },
  {
    countryName: "Guadeloupe",
    countryShortCode: "GP",
    numberLength: 9,
  },
  {
    countryName: "Singapore",
    countryShortCode: "SG",
    numberLength: 8,
  },
  {
    countryName: "India",
    countryShortCode: "IN",
    numberLength: 10,
  },
  {
    countryName: "Indonesia",
    countryShortCode: "ID",
    numberLength: 9,
  },
  {
    countryName: "Malaysia",
    countryShortCode: "MY",
    numberLength: 7,
  },
  {
    countryName: "Qatar",
    countryShortCode: "QA",
    numberLength: 8,
  },
  {
    countryName: "Taiwan",
    countryShortCode: "TW",
    numberLength: 9,
  },
  {
    countryName: "Thailand",
    countryShortCode: "TH",
    numberLength: 9,
  },
  {
    countryName: "United Arab Emirates (UAE)",
    countryShortCode: "AE",
    numberLength: 9,
  },
  {
    countryName: "United Kingdom",
    countryShortCode: "GB",
    numberLength: 10,
  },
  {
    countryName: "United States",
    countryShortCode: "US",
    numberLength: 10,
  },
];
