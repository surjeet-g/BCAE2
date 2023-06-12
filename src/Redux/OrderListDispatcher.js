import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "..//Utilities/API";
import {
  initOrderListData,
  setOrderListData,
  setOrderListError
} from "./OrderListAction";
// import Geocoder from "@timwangdev/react-native-geocoder";
import { getCustomerUUID } from "../Utilities/UserManagement/userInfo";

export function getOrderListData(navigation, limit = 100, page = 0) {
  return async (dispatch) => {
    dispatch(initOrderListData());

    const customerID = await getCustomerUUID();

    let params = {
      searchParams: {
        customerUuid: customerID,
      },
    };

    let result = await serverCall(
      `${endPoints.ORDER_LIST_API}?page=${page}&limit=${limit}`,
      requestMethod.POST,
      params,
      navigation
    );
    console.log('order list', result)

    if (result.success) {
      //result.data.data.rows
      dispatch(setOrderListData(result.data.data.row));
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
