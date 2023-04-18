import { countryCodes as ccc } from "react-native-country-codes-picker/constants/countryCodes";
import { supportedCountriesList } from "../Utilities/Constants/Constant";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPhoneNumberLength = (code) => {
  let country = supportedCountriesList?.find(
    (country) => country?.countryShortCode === code
  );
  return country?.numberLength || 10;
};

export const excludedCountriesList = () => {
  let supportedCountriesShortCodeList = supportedCountriesList?.map(
    (country) => country?.countryShortCode
  );

  let excludedCountriesList = ccc
    .filter(
      (country) => !supportedCountriesShortCodeList.includes(country?.code)
    )
    .map((country) => country?.code);
  return excludedCountriesList;
};

export const addresObjToString = (params) => {

  return `${params.address1},${params.city},${params.district},${params.state},${params.country},${params.postcode}`;
};
export const handleMultipleContact = (addr) => {
  if (addr.length == 0) return "";

  const primaryAddress = addr.filter((d) => d.isPrimary == true);
  if (primaryAddress.length == 0) return "";

  return addresObjToString(primaryAddress[0]);
};

export const subString = (str, length = 10) => {

  try {
    if (str == "") return ""
    let resul = ""
    if (str.length < length) return str;
    return str.substring(0, length) + "..."
  } catch (error) {

  }
}
export const handleUserStatus = (status) => {
  if (status == "") return ""
  let result = ""
  switch (status) {
    case "CS_ACTIVE":
      result = "Active"
      break;
    case "CS_INACTIVE":
      result = "Inactive"
      break;
    case "CS_SUSPEND":
      result = "Suspended"
      break;

    default:
      return status


  }
  return result


};
