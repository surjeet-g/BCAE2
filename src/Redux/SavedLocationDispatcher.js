import Toast from "react-native-toast-message";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "..//Utilities/API";
import { getCustomerUUID } from "../Utilities/UserManagement/userInfo";
import {
  initSavedLocation, savedLocationError,
  setAddressLoopUpData, setSavedLocation
} from "./SavedLocationAction";

export function fetchSavedLocations(customerId) {
  return async (dispatch) => {
    dispatch(initSavedLocation());

    let params = {};
    let addressLookUpResult = await serverCall(
      endPoints.ADDRESS_LOOKUP,
      requestMethod.GET,
      params
    );
    console.log(
      "result.success outside :" + JSON.stringify(addressLookUpResult)
    );
    if (addressLookUpResult) {
      //result.data.data.
      dispatch(setAddressLoopUpData(addressLookUpResult?.data?.data));

      let params = {};
      let savedLocationResult = await serverCall(
        endPoints.GET_FAVOURITE_LOCATION + "/" + customerId,
        requestMethod.GET,
        params
      );
      if (savedLocationResult.success) {
        //result.data.data.rows
        dispatch(setSavedLocation(savedLocationResult?.data?.data?.rows));
      } else {
        dispatch(savedLocationError(savedLocationResult));
      }
    }
  };
}

export function addNewLocations(obj, navigation) {
  return async (dispatch) => {
    dispatch(initSavedLocation());
    console.log("enter add new location dispatcher");
    const customerUUDI = await getCustomerUUID();
    console.log("enter add new location dispatcher", customerUUDI);

    let result = await serverCall(
      `${endPoints.ADD_FAVOURITE_LOCATION}${customerUUDI}`,
      requestMethod.PUT,
      obj,
      navigation
    );
    console.log("result add address", customerUUDI);
    console.log("result add address", result);

    if (result.success) {
      //result.data.data.rows
      //console.log(getModifiedInteractions(DATA))
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message,
      });
      dispatch(setSavedLocation(result));
      return true;
    } else {
      Toast.show({
        type: "bctError",
        text1: "Something wents wrong",
      });
      dispatch(savedLocationError(result));
      return false;
    }
  };
}
export function setPrimaryAddress(address, navigation, cb = () => { }) {
  return async (dispatch) => {
    const customerUUDI = await getCustomerUUID();

    console.log("params", address);

    let result = await serverCall(
      endPoints.GET_FAVOURITE_LOCATION + customerUUDI,
      requestMethod.PUT,
      { address: address },
      navigation
    );
    console.log(">>", result);
    if (result.success) {
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message,
      });
      cb()
    } else {
      Toast.show({
        type: "bctError",
        text1: "Something wents wrong",
      });
      dispatch(savedLocationError(result));
      return false;
    }
  };
}

export function deleteSavedLocation(custFavAddrId, navigation) {
  return async (dispatch) => {
    // dispatch(initSavedLocation());
    const customerUUDI = await getCustomerUUID();
    let params = {
      address: {
        addressNo: custFavAddrId,
      },
    };

    let result = await serverCall(
      endPoints.GET_FAVOURITE_LOCATION + customerUUDI,
      requestMethod.DELETE,
      params,
      navigation
    );

    if (result.success) {
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message,
      });
      return true;
    } else {
      Toast.show({
        type: "bctError",
        text1: "Something wents wrong",
      });
      dispatch(savedLocationError(result));
      return false;
    }
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
