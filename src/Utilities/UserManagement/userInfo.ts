import get from "lodash.get";
import { getDataFromDB } from "../../Storage/token";
import { storageKeys } from "../Constants/Constant";
import { IdsInterface } from "./types";

export const getCustomerUUID:IdsInterface = async () => {
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

export const getUserId:IdsInterface = async () => {
  let userId;
  try {
    userId = get(
      await getDataFromDB(storageKeys.PROFILE_DETAILS),
      "userId",
      ""
    );
    if (userId == "") throw "Customer UUDI is empty";
  } catch (error) {
    console.log("getCustomerUUID ", error);
  }
  return userId;
};
