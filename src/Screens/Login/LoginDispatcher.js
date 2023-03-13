import Toast from "react-native-toast-message";
import { getDataFromDB, saveDataToDB } from "../../Storage/token";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import {
  DEFAULT_PROFILE_IMAGE, storageKeys
} from "../../Utilities/Constants/Constant";
import {
  failureLogin, initLoginData, resetLoginData, resetShowSecondLoginAlertData, setLoginData, setShowSecondLoginAlert
} from "./LoginAction";

export function verifyLoginData(navigation, params) {
  return async (dispatch) => {
    const { loginId, password, userType, loginType, loginMode } = params;
    dispatch(initLoginData());
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
          params,
          navigation
        );
        if (result.success) {
          if (result.data?.data?.anotherSession) {
            dispatch(setShowSecondLoginAlert(result));
            dispatch(failureLogin(result));
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
              let loginId = {
                loginId: result.data?.data?.user?.loginid ?? "",
              };

              const tokenExpiresAt = result.data?.data?.tokenExpiresAt ?? "";

              await saveDataToDB(storageKeys.LOGIN_ID, loginId);
              await saveDataToDB(storageKeys.ACCESS_TOKEN, accessTokenData);
              await saveDataToDB(storageKeys.TOKEN_EXPIRY, tokenExpiresAt);

              let userTypeInResponse = result?.data?.data?.user?.userType;
              let profileResult = {};

              if (
                userTypeInResponse.length !== 0 &&
                (userTypeInResponse === "UT_INTERNAL" ||
                  userTypeInResponse === "UT_VENDOR")
              ) {
                // Business User Type
                profileResult = await serverCall(
                  endPoints.USERS_SEARCH + result?.data?.data?.user?.userId,
                  requestMethod.GET,
                  {},
                  navigation
                );
              } else if (
                userTypeInResponse.length !== 0 &&
                (userTypeInResponse === "PersonalCustomer" ||
                  userTypeInResponse === "BusinessCustomer")
              ) {
                // Consumer User Type
                profileResult = await serverCall(
                  endPoints.PROFILE_DETAILS +
                  "/" +
                  result?.data?.data?.user?.customerUuid,
                  requestMethod.GET,
                  {},
                  navigation
                );
              }

              if (
                profileResult?.success &&
                userTypeInResponse.length !== 0 &&
                (userTypeInResponse === "PersonalCustomer" ||
                  userTypeInResponse === "BusinessCustomer")
              ) {
                let profileData = {
                  userId: result.data?.data?.user?.userId,
                  email:
                    profileResult.data?.data?.customerContact[0]?.emailId ||
                    result.data?.data?.user?.email,
                  profilePicture:
                    result.data?.data?.customerPhoto || DEFAULT_PROFILE_IMAGE,
                  customerId:
                    profileResult?.data?.data?.customerId ||
                    result.data?.data?.user?.customerId,
                  customerUuid:
                    profileResult?.data?.data?.customerUuid ||
                    result.data?.data?.user?.customerUuid,
                  birthDate:
                    profileResult?.data?.data?.birthDate ||
                    result.data?.data?.user?.dob,
                  contactNo:
                    profileResult.data?.data?.customerContact[0]?.mobileNo ||
                    result.data?.data?.user?.contactNo,
                  status:
                    profileResult?.data?.data?.status ||
                    result.data?.data?.user?.status,
                  firstName:
                    profileResult?.data?.data?.customerContact[0]?.firstName ||
                    result.data?.data?.user?.firstName,
                  lastName:
                    profileResult?.data?.data?.customerContact[0]?.lastName ||
                    result.data?.data?.user?.lastName,
                  gender:
                    profileResult?.data?.data?.gender ||
                    result.data?.data?.user?.gender,
                  ...profileResult?.data?.data?.customerAddress[0],
                };

                await saveDataToDB(storageKeys.PROFILE_DETAILS, profileData);
                dispatch(setLoginData(result.data));
                navigation.replace("BottomBar", {});
              } else if (
                profileResult?.success &&
                userTypeInResponse.length !== 0 &&
                (userTypeInResponse === "UT_INTERNAL" ||
                  userTypeInResponse === "UT_VENDOR")
              ) {
                let profileData = profileResult?.data?.data;
                await saveDataToDB(storageKeys.PROFILE_DETAILS, profileData);
                dispatch(setLoginData(result.data));
                navigation.replace("BottomBar", {});
              }
            }
          }
        } else {
          dispatch(failureLogin(result));
          if (result.errorCode === 422) {
            Toast.show({
              type: "bctError",
              text1: result?.message || "",
            });
          }
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
      requestMethod.DELETE,
      {},
      navigation
    );
    if (result?.data?.status === 200) {
      dispatch(verifyLoginData(navigation, params));
    }
  };
}

export function resetShowSecondLoginAlert() {
  return async (dispatch) => {
    dispatch(resetShowSecondLoginAlertData());
  };
}

export function sendLoginOTPData(navigation, params, toNavigate) {
  return async (dispatch) => {
    const { loginId, userType, loginType, loginMode, extn } = params;
    //dispatch(initLoginData());
    let param = {};
    let url = "";
    if (loginMode.includes("Email")) {
      param = {
        reference: loginId,
      };
      url = endPoints.GET_LOGIN_OTP_FOR_EMAIL;
    } else if (loginMode.includes("Mobile")) {
      param = {
        reference: loginId,
        extn: extn,
      };
      url = endPoints.GET_LOGIN_OTP_FOR_MOBILE;
    }

    let result = await serverCall(url, requestMethod.POST, param, navigation);

    if (result.success) {
      if (toNavigate) {
        navigation.navigate("VerifyLoginOTP", { ...params });
      } else {
        Toast.show({
          type: "bctSuccess",
          text1: "New OTP has been sent",
        });
      }
    } else {
      dispatch(failureLogin(result));
    }
  };
}
