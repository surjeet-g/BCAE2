import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  setmasterDataData,
  setmasterDataError
} from "./masterDataAction";
export const MASTER_DATA_CONSTANT = {
  COUNTRY: "COUNTRY",
  NOTIFICATION_TYPE: "NOTIFICATION_TYPE",
  SERVICE_CATEGORY: "SERVICE_CATEGORY",
  STATUS: "STATUS",
  GENDER: "GENDER",
  CUSTOMER_ID_TYPE: "CUSTOMER_ID_TYPE",
  CUSTOMER_CATEGORY: "CUSTOMER_CATEGORY",
  CUSTOMER_CLASS: "CUSTOMER_CLASS",
  MARITAL_STATUS: "MARITAL_STATUS",
  NATIONALITY: "NATIONALITY",
  YES_NO: "YES_NO",
  PROBLEM_CODE: "PROBLEM_CODE",
  PROBLEM_CAUSE: "PROBLEM_CAUSE",
  CUST_STATUS_REASON: "CUST_STATUS_REASON",
  CONTACT_PREFERENCE: "CONTACT_PREFERENCE",
  ADDRESS_TYPE: "ADDRESS_TYPE",
  CONTACT_TYPE: "CONTACT_TYPE",
  ACC_STATUS_REASON: "ACC_STATUS_REASON",
  SERVICE_TYPE: "SERVICE_TYPE",
  PAYMENT_METHOD: "PAYMENT_METHOD",
  INTXN_CATEGORY: "INTXN_CATEGORY",
  INTERACTION_STATUS: "INTERACTION_STATUS",
  INTXN_FAMILY: "INTXN_FAMILY",
  INTXN_MODE: "INTXN_MODE",
  TICKET_CHANNEL: "TICKET_CHANNEL",
  PRIORITY: "PRIORITY",
  INTXN_TYPE: "INTXN_TYPE", //Interaction Type
  INTXN_STATEMENT: "INTXN_STATEMENT", //Request Statement
  INTXN_FLOW: "INTXN_FLOW", //Interaction Flow
  INTXN_CAUSE: "INTXN_CAUSE", //Interaction Cause
  ENTITY_CATEGORY: "ENTITY_CATEGORY", // Contact Category
  SOURCE: "SOURCE"

};
export const getMasterData = (valueParam = "") => {
  console.log('hititnf',)
  if (typeof valueParam != "string") {
    console.log("params should be string");
  }
  console.log('masterdate para', valueParam)
  return async (dispatch) => {
    // dispatch(initmasterDataData());
    let params = {};
    let result = await serverCall(
      `${endPoints.MASTERDATA}?searchParam=code&valueParam=${valueParam}`,
      requestMethod.GET,
      params
    );
    console.log('>>master date', result)
    if (result.success) {
      dispatch(setmasterDataData(result?.data?.data));
    } else {
      dispatch(setmasterDataError(result.data));
    }
  };
};
