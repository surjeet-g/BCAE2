import { initProfile, setProfileData, setProfileError } from "./ProfileAction";

import Toast from "react-native-toast-message";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";
import { getCustomerUUID } from "../Utilities/UserManagement/userInfo";

export function fetchSavedProfileData(navigation = null) {
  return async (dispatch) => {
    dispatch(initProfile());
    const customerUUDI = await getCustomerUUID();

    let profileResult = await serverCall(
      endPoints.PROFILE_DETAILS + "/" + customerUUDI,
      requestMethod.GET,
      {},
      navigation
    );
    console.log("hiting", profileResult);
    if (profileResult?.success) {
      dispatch(setProfileData(profileResult?.data?.data));
    } else {
      dispatch(setProfileError([]));
    }
  };
}

export function updateProfileData(obj, navigation) {
  return async (dispatch) => {
    dispatch(initProfile());

    const customerUUDI = await getCustomerUUID();

    let result = await serverCall(
      endPoints.UPDATE_MOBILE_USER + customerUUDI,
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

    // let profileResult = await serverCall(
    //   endPoints.PROFILE_DETAILS + "/" + customerUUDI,
    //   requestMethod.GET,
    //   profileParams
    // );
    // if (profileResult.success) {
    //   // await saveDataToDB(storageKeys.PROFILE_DETAILS, profileData);
    //   dispatch(setProfileData(profileData.data));

    //   // getDataFromDB(storageKeys.PROFILE_DETAILS).then((resultData) =>{
    //   //     if (resultData) {//result.data.data
    //   //         dispatch(setProfileData(result));
    //   //     } else{
    //   //         dispatch(setProfileError([]));
    //   //     }
    //   // });
    // } else {
    //   Toast.show({
    //     type: "bctError",
    //     text1: profileResult?.message,
    //   });
    //   dispatch(setProfileError([]));
    // }
  };
}
