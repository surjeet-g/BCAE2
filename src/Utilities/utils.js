import { supportedCountriesList } from "../Utilities/Constants/Constant";
import { countryCodes as ccc } from "react-native-country-codes-picker/constants/countryCodes";

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

export const addresObjToString = (data) => {
  let addressString = "";

  if (data?.address1) addressString += data?.address1 + ",";
  if (data?.address2) addressString += data?.address2 + ",";
  if (data?.address3) addressString += data?.address3;

  return addressString;
};
export const handleMultipleContact = (addr) => {
  if (addr.length == 0) return "";

  const primaryAddress = addr.filter((d) => d.isPrimary == true);
  if (primaryAddress.length == 0) return "";

  return addresObjToString(primaryAddress[0]);
};
