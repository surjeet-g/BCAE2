import {
  initLoginData,
  failureLogin,
  setLoginData,
  resetLoginData,
} from "./LoginAction";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import { saveDataToDB, getDataFromDB } from "../../Storage/token";
import {
  storageKeys,
  DEFAULT_PROFILE_IMAGE,
} from "../../Utilities/Constants/Constant";
import { Platform } from "react-native";
import { encryption } from "../../Utilities/Security/Encryption";

export function verifyLoginData(navigation, params) {
  return async (dispatch) => {
    const { username, password, userType, loginType } = params;
    dispatch(initLoginData());

    getDataFromDB(storageKeys.FCM_DEVICE_ID)
      .then(function (deviceId) {
        return deviceId;
      })
      .then(async (fcmDeviceId) => {
        let params = {
          loginId: username,
          password,
          channel: "MOBILE_APP",
          deviceId: fcmDeviceId,
          userType,
          loginType,
        };

        let result = await serverCall(
          endPoints.USER_LOGIN,
          requestMethod.POST,
          params
        );

        if (result.success) {
          console.log("$$$-data", result.data);
          if (result.data?.data?.anotherSession) {
            // Todo - Show alert to the user with OK and Cancel
            // If Ok - call logout and call login api again
            // If cancel - close alert and stay in same screen
          } else {
            let accessTokenData = {
              accessToken: result.data?.data?.accessToken ?? "",
            };
            await saveDataToDB(storageKeys.ACCESS_TOKEN, accessTokenData);
            dispatch(setLoginData(result.data?.data));
            navigation.replace("BottomBar", {});
          }
        } else {
          dispatch(failureLogin(result));
        }
      });
  };
}

export function resetLogin() {
  return async (dispatch) => {
    dispatch(resetLoginData());
  };
}
