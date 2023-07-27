import get from "lodash.get";
import { getDataFromDB } from "../../Storage/token";
import { storageKeys } from "../Constants/Constant";

export const USERTYPE = {
  CUSTOMER: "CUSTOMER",
  USER: "USER"
}
/**
* Gives Customer UUID
* @method
* @returns {number} Return UUID
*/
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
/**
* Gives User Id
* @method
* @returns {number} Return User Id
*/
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
/**
* Gives Customer Id
* @method
* @returns {number} Return Customer Id
*/
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
/**
* Gives Type of user (user/customer)
* @method
* @returns {string} Return Type of user 
*/
export const getUserType = async (cb = () => { }) => {
  let userType;
  try {

    userType = await getDataFromDB(storageKeys.USERTYPE)
    if (["UT_CONSUMER"].includes(userType)) {

      userType = USERTYPE.CUSTOMER
    }
    else {
      userType = USERTYPE.USER
    }

    if (userType == null) throw "User Type  empty";

  } catch (error) {
    console.log("user Type is ", error);
  }
  cb(userType);
  return userType;
};

export const getUserTypeForProfile = async () => {
  let userType;
  try {

    userType = await getDataFromDB(storageKeys.USERTYPE)


    if (userType == null) throw "User Type  empty";

  } catch (error) {
    console.log("user Type is ", error);
  }

  return userType;
};