import get from "lodash.get";
import { getDataFromDB } from "../../Storage/token";
import { storageKeys } from "../Constants/Constant";

export const USERTYPE = {
  CUSTOMER: "CUSTOMER",
  USER: "USER"
}

export const getCustomerUUID = async () => {
  let custUUDI;
  try {
    custUUDI = get(
      await getDataFromDB(storageKeys.PROFILE_DETAILS),
      "customerUuid",
      ""
    );
    if (custUUDI == "") throw "Customer UUDI is empty";
  } catch (error) {
    console.log("getCustomerUUID ", error);
  }
  return custUUDI;
};

export const getUserId = async () => {
  let userId;
  try {
    userId = get(
      await getDataFromDB(storageKeys.PROFILE_DETAILS),
      "userId",
      ""
    );
    if (userId == "") throw "Customer UserID is empty";
  } catch (error) {
    console.log("getUserId ", error);
  }
  return userId;
};

export const getCustomerID = async () => {
  let userId;
  try {
    userId = get(
      await getDataFromDB(storageKeys.PROFILE_DETAILS),
      "customerId",
      ""
    );
    if (userId == "") throw "Customer customerIDis empty";
  } catch (error) {
    console.log("getUserId ", error);
  }

  return parseInt(userId);
};
export const getUserType = async () => {
  let userType;
  try {

    userType = await getDataFromDB(storageKeys.USERTYPE)
    if (["PersonalCustomer"].includes(userType)) {

      userType = USERTYPE.CUSTOMER
    }
    else {
      userType = USERTYPE.USER
    }

    if (userType == null) throw "User Type  empty";

  } catch (error) {
    console.log("user Type is ", error);
  }

  return userType;
};