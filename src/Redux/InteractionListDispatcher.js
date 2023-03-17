import {
  initInteractionListData,
  setInteractionListData,
  setInteractionListError,
} from "./InteractionListAction";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
// import Geocoder from "@timwangdev/react-native-geocoder";
import { storageKeys } from "../Utilities/Constants/Constant";
import { getDataFromDB, saveDataToDB } from "../Storage/token";
import get from "lodash.get";
import { getCustomerID } from "../Utilities/UserManagement/userInfo";

export function getInteractionListData(navigation) {
  return async (dispatch) => {
    dispatch(initInteractionListData());
    const customerID = await getCustomerID();
    let params = {
      searchParams: {
        customerId: customerID,
      },
    };

    let result = await serverCall(
      endPoints.INTERACTION_LIST_API,
      requestMethod.POST,
      params,
      navigation
    );

    console.log(
      "setInteractionListData result" + JSON.stringify(result.data.rows)
    );
    if (result.success) {
      //result.data.data.rows
      console.log("setInteractionListData" + JSON.stringify(result.data.rows));
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
