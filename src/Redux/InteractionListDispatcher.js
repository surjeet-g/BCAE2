import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "..//Utilities/API";
import {
  initInteractionListData,
  setInteractionListData,
  setInteractionListError
} from "./InteractionListAction";
// import Geocoder from "@timwangdev/react-native-geocoder";
import { getCustomerID } from "../Utilities/UserManagement/userInfo";

export function getInteractionListData(navigation, limit = 4, page = 0) {
  return async (dispatch) => {
    dispatch(initInteractionListData());

    const customerID = await getCustomerID();

    let params = {
      searchParams: {
        customerId: customerID,
      },
    };

    let result = await serverCall(
      `${endPoints.INTERACTION_LIST_API}?page=${page}&limit=${limit}`,
      requestMethod.POST,
      params,
      navigation
    );


    if (result.success) {
      //result.data.data.rows
      dispatch(setInteractionListData(result.data.data.rows));
    } else {
      dispatch(setInteractionListError(result));
    }
  };
}
export function resetInteractionListData() {
  return async (dispatch) => {
    dispatch(setInteractionListData([]));
  };
}
