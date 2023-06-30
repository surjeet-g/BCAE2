import { Platform } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
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
  ARRAY: 2,
};
export const DATE_FORMAT = "YYYY-MM-DD";
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
  "data:image/png;base64,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";

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
  APPOINTMENT_BACKGROUND: "#D7E5FF",
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
  USERTYPE: "USERTYPE",
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

export const mockFaq = [
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
