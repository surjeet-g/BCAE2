import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "..//Utilities/API";
import {
  initOrderListData,
  setOrderListData,
  setOrderListError,
} from "./OrderListAction";
// import Geocoder from "@timwangdev/react-native-geocoder";
import { getCustomerID } from "../Utilities/UserManagement/userInfo";

export function getOrderListData(navigation, limit = 100, page = 0) {
  return async (dispatch) => {
    dispatch(initOrderListData());

    const customerID = await getCustomerID();

    let params = {
      searchParams: {
        customerId: customerID,
      },
    };

    let result = await serverCall(
      `${endPoints.ORDER_LIST_API}?page=${page}&limit=${limit}`,
      requestMethod.POST,
      params,
      navigation
    );

    if (result.success) {
      //result.data.data.rows
      dispatch(setOrderListData(result.data.data.rows));
    } else {
      dispatch(setOrderListError(result));
    }
  };
}
export function resetOrderListData() {
  return async (dispatch) => {
    dispatch(setOrderListData([]));
  };
}
