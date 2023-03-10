import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  initCustomerAccountData,
  setCustomerAccountData,
  setCustomerAccountError,
} from "./CustomerAccountAction";

export const getCustomerAccountData = (uuId, navigation) => {
  return async (dispatch) => {
    await dispatch(initCustomerAccountData());
    let params = {
      customerUuid: uuId,
    };

    let result = await serverCall(
      endPoints.CUSTOMER_ACCOUNT,
      requestMethod.POST,
      params,
      navigation
    );

    if (result.success) {
      dispatch(setCustomerAccountData(result?.data?.data));
      return true;
    } else {
      return false;
      dispatch(setCustomerAccountError(result));
    }
  };
};
