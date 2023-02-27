import {
  initLoginData,
  failureLogin,
  setLoginData,
  resetLoginData,
  setShowSecondLoginAlert,
  resetShowSecondLoginAlertData,
} from "./LoginAction";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import { saveDataToDB, getDataFromDB } from "../../Storage/token";
import {
  storageKeys,
  DEFAULT_PROFILE_IMAGE,
} from "../../Utilities/Constants/Constant";
// import { Platform } from "react-native";
// import { encryption } from "../../Utilities/Security/Encryption";

export function verifyLoginData(navigation, params) {
  return async (dispatch) => {
    const { loginId, password, userType, loginType } = params;
    dispatch(initLoginData());
    console.log("$$$-verifyLoginData-params", params);
    getDataFromDB(storageKeys.FCM_DEVICE_ID)
      .then(function (deviceId) {
        return deviceId;
      })
      .then(async (fcmDeviceId) => {
        let params = {
          loginId,
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
          if (result.data?.data?.anotherSession) {
            dispatch(setShowSecondLoginAlert(result));
            dispatch(failureLogin(result));
            // If Ok - call logout and call login api again
          } else {
            if (result?.data?.data?.status == "TEMP") {
              dispatch(setLoginData(result.data));

              navigation.navigate("ResetPassword", {
                email: result?.data?.data?.email,
                inviteToken: result?.data?.data?.inviteToken,
              });
            } else {
              let accessTokenData = {
                accessToken: result.data?.data?.accessToken ?? "",
              };
              await saveDataToDB(storageKeys.ACCESS_TOKEN, accessTokenData);

              let profileResult = await serverCall(
                endPoints.PROFILE_DETAILS +
                  "/" +
                  result?.data?.data?.user?.customerUuid,
                requestMethod.GET,
                {}
              );

              if (profileResult?.success) {
                let profileData = {
                  userId: result.data?.data?.user?.userId,
                  email: profileResult.data?.data?.customerContact[0].emailId,
                  profilePicture:
                    result.data?.data?.customerPhoto || DEFAULT_PROFILE_IMAGE,
                  customerId: profileResult?.data?.data?.customerId,
                  customerId: profileResult?.data?.data?.customerId,
                  customerUuid: profileResult?.data?.data?.customerUuid,
                  birthDate: profileResult?.data?.data?.birthDate,
                  contactNo:
                    profileResult.data?.data?.customerContact[0]?.mobileNo,
                  status: profileResult?.data?.data?.status,
                  firstName:
                    profileResult?.data?.data?.customerContact[0].firstName,
                  lastName:
                    profileResult?.data?.data?.customerContact[0].lastName,
                  gender: profileResult?.data?.data?.gender,
                  ...profileResult?.data?.data?.customerAddress[0],
                };

                await saveDataToDB(storageKeys.PROFILE_DETAILS, profileData);
                dispatch(setLoginData(result.data));
                navigation.replace("BottomBar", {});
              }
            }
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

export function callLogoutAndLogin(userId, navigation, params) {
  return async (dispatch) => {
    let result = await serverCall(
      endPoints.LOGOUT_USER + userId,
      requestMethod.DELETE
    );
    console.log("$$$-callLogoutAndLogin-logout-result", result);
    if (result?.data?.status === 200) {
      console.log("$$$-callLogoutAndLogin-params", params);
      dispatch(verifyLoginData(navigation, params));
    }
  };
}

export function resetShowSecondLoginAlert() {
  return async (dispatch) => {
    dispatch(resetShowSecondLoginAlertData());
  };
}
