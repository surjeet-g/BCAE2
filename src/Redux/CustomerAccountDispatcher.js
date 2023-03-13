import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  initCustomerAccountData,
  setCustomerAccountData,
  setCustomerAccountError
} from "./CustomerAccountAction";

export const getCustomerAccountData = (navigation, uuId) => {
  return async (dispatch) => {
    await dispatch(initCustomerAccountData());
    let params = {
      customerUuid: "7f550934-ea8b-4950-82ce-3eec4f5809c2", //uuId,
    };

    let result = await serverCall(
      endPoints.CUSTOMER_ACCOUNT,
      requestMethod.POST,
      params,
      navigation
    );

    if (result.success) {
      console.log("surjeet", JSON.stringify(result));
      dispatch(setCustomerAccountData(result?.data?.rows));
      return true;
    } else {
      dispatch(setCustomerAccountError(result));
      return false;
    }
  };
};
