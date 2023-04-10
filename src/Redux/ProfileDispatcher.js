import {
  initProfile,
  setProfileData,
  setProfileError,
  setSearchEmpty,
  setSearchProfileData,
  setSearchProfileDataError,
} from "./ProfileAction";

import Toast from "react-native-toast-message";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";
import {
  getCustomerUUID,
  getUserId,
  getUserType,
  USERTYPE,
} from "../Utilities/UserManagement/userInfo";

export function fetchMyProfileData(navigation = null) {
  return async (dispatch) => {
    dispatch(initProfile());
    let profileResult;
    const userType = await getUserType();
    let typeOfUser =
      userType == USERTYPE.CUSTOMER ? USERTYPE.CUSTOMER : USERTYPE.USER;
    if (userType == USERTYPE.CUSTOMER) {
      const customerUUDI = await getCustomerUUID();

      profileResult = await serverCall(
        endPoints.PROFILE_DETAILS + customerUUDI,
        requestMethod.GET,
        {},
        navigation
      );
    }
    //bussines user
    else {
      const userId = await getUserId();
      profileResult = await serverCall(
        endPoints.USERS_SEARCH + userId,
        requestMethod.GET,
        {},
        navigation
      );
    }

    console.log("hiting", profileResult);
    if (profileResult?.success) {
      dispatch(
        setProfileData({ ...profileResult?.data?.data, typeOfUser: typeOfUser })
      );
      return true;
    } else {
      dispatch(setProfileError([]));
      return false;
    }
  };
}
export function fetchSavedProfileDataByUser(customerUUDI) {
  return async (dispatch) => {
    // dispatch(initProfile());

    console.log("task fetch");
    let profileResult = await serverCall(
      endPoints.PROFILE_DETAILS + customerUUDI,
      requestMethod.GET,
      {}
    );
    console.log("task fetch", profileResult);
    if (profileResult?.success) {
      dispatch(setProfileData(profileResult?.data?.data));
      return true;
    } else {
      dispatch(setProfileError([]));
      return false;
    }
  };
}

export function seachCustomers(search = "", limit = 5, page = 0) {
  return async (dispatch) => {
    // dispatch(initProfileSearch());
    //todo search params
    let profileResult = await serverCall(
      `${endPoints.SEACH_CUSTOMERS}?limit=${limit}&page=${page}`,
      requestMethod.POST,
      {
        source: "string",
        filters: {
          email: "adsfsdfsd@gmail.comsdas",
        },
      }
    );
    console.log("task - pro result", profileResult);
    if (profileResult?.success) {
      dispatch(setSearchProfileData(profileResult?.data?.data?.rows));
      const len = profileResult?.data?.data?.rows?.length;
      if (len == 0) dispatch(setSearchEmpty(true));
    } else {
      dispatch(setSearchProfileDataError([]));
      return false;
    }
  };
}

export function updateProfileData(obj, navigation, isCustomer) {
  return async (dispatch) => {
    dispatch(initProfile());

    const customerUUDI = await getCustomerUUID();
    const userId = await getUserId();

    let result = await serverCall(
      isCustomer
        ? endPoints.UPDATE_MOBILE_USER + customerUUDI
        : endPoints.UPDATE_BUSINESS_USER + userId,
      requestMethod.PUT,
      obj,
      navigation
    );
    console.log("res", obj);
    if (result.success) {
      dispatch(setProfileError([]));
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
      dispatch(setProfileError([]));
      return false;
    }
  };
}
