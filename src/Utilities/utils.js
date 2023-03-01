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
