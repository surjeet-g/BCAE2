import { supportedCountriesList } from "../Utilities/Constants/Constant";
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPhoneNumberLength = (code) => {
  let country = supportedCountriesList.find(
    (country) => country.countryShortCode === code
  );
  return country?.numberLength || 10;
};
