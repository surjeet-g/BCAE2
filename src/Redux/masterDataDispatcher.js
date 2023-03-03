import { initmasterDataData, setmasterDataData, setmasterDataError } from './masterDataAction';
  import { serverCall } from "../Utilities/API";
  import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
  const MASTER_DATA_CONSTANT = {
    STATUS : "STATUS",
    GENDER : "GENDER",
    CUSTOMER_ID_TYPE : "CUSTOMER_ID_TYPE",
    CUSTOMER_CATEGORY : "CUSTOMER_CATEGORY",
    CUSTOMER_CLASS : "CUSTOMER_CLASS",
    MARITAL_STATUS : "MARITAL_STATUS",
    NATIONALITY : "NATIONALITY",
    YES_NO : "YES_NO",
    CUST_STATUS_REASON : "CUST_STATUS_REASON",
    CONTACT_PREFERENCE : "CONTACT_PREFERENCE",
    STATUS : "STATUS",
    ADDRESS_TYPE : "ADDRESS_TYPE",
    CONTACT_TYPE : "CONTACT_TYPE",
    ACC_STATUS_REASON: "ACC_STATUS_REASON",
    SERVICE_TYPE: "SERVICE_TYPE",
    PAYMENT_METHOD: "PAYMENT_METHOD",
    INTXN_CATEGORY : "INTXN_CATEGORY",
    INTERACTION_STATUS : "INTERACTION_STATUS",
    INTXN_FAMILY: "INTXN_FAMILY",
    INTXN_MODE : "INTXN_MODE",
    TICKET_CHANNEL : "TICKET_CHANNEL",
    PRIORITY: "PRIORITY",
    INTXN_TYPE : "INTXN_TYPE",  //Interaction Type
    SERVICE_TYPE: "SERVICE_TYPE",
    INTXN_STATEMENT : "INTXN_STATEMENT", //Request Statement
    INTXN_FLOW: "INTXN_FLOW", //Interaction Flow
    INTXN_CAUSE: "INTXN_CAUSE", //Interaction Cause
    ENTITY_CATEGORY: "ENTITY_CATEGORY", // Contact Category
    ENTITY_CATEGORY : "ENTITY_CATEGORY" //Address Category
  }
  export const getmasterDataData = (valueParam="") => {
    if(typeof valueParam != "string") {
        console.log("params should be string")
    }
      return async (dispatch) => {
          dispatch(initmasterDataData());
          let params = {
            
           };
          let result = await serverCall(`${endPoints.MASTERDATA}?searchParam=code&valueParam=${valueParam}`, requestMethod.GET, params)
          if (result.success) {
              dispatch(setmasterDataData(result?.data));
          } else {
              dispatch(setmasterDataError(result.data));
          }
      };
  }