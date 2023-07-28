import Toast from "react-native-toast-message";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import {
  failureForgotPassword, initForgotPasswordData, resetForgotPasswordData, setForgotPasswordData
} from "./ForgotPasswordAction";


/**
* Reducer Dispatch
* Handle API call for verify forgot password API
* @memberOf ForgotPassword
* @param  {Object} params payload for API
* @param  {Object} navigation handle section timeout
* @returns {Object} Dispatcher to reducer
*/
export function verifyForgotPasswordData(navigation, params, type) {
  return async (dispatch) => {
    dispatch(initForgotPasswordData());

    let result = await serverCall(
      endPoints.FORGOT_PASSWORD,
      requestMethod.POST,
      params,
      navigation
    );

    // navigation.replace("ConfirmForgotPassword", { email: params.loginId });
    if (result.success) {
      dispatch(setForgotPasswordData(result?.data));
      dispatch(resetForgotPasswordData());
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message || "",
      });
      navigation.replace("ConfirmForgotPassword", {
        email: params?.loginId ?? "",
        lastName: params?.lastName ?? "",
        dob: params?.dob ?? "",
        type: type,
      });
    } else {
      Toast.show({
        visibilityTime: 5000,
        autoHide: true,
        type: "bctError",
        text1: result?.message || "",
      });
      dispatch(failureForgotPassword(result));
    }
  };
}
/**
* Reducer Dispatch
* Handle reset form data
* @memberOf ForgotPassword
* @returns {Object} Dispatcher to reducer
*/
export function resetForgotPassword() {
  return async (dispatch) => {
    dispatch(resetForgotPasswordData());
  };
}

/**
* Reducer Dispatch
* Handle API call for change password
* @memberOf ForgotPassword
* @param  {string} email email address
* @param  {string} oldPassword old password 
* @param  {string} newPassword new password 
* @param  {string} confirmPassword confirm password
* @returns {Object} Dispatcher to reducer
*/
export function changePassword(
  email,
  oldPassword,
  newPassword,
  confirmPassword,
  navigation
) {
  return async (dispatch) => {
    dispatch(initForgotPasswordData());

    let params = {
      email: email,
      oldPassword: oldPassword,
      password: newPassword,
      confirmPassword: confirmPassword,
      forceChangePwd: true,
    };

    let result = await serverCall(
      endPoints.CHANGE_PASSWORD,
      requestMethod.POST,
      params,
      navigation
    );
    console.log(JSON.stringify(result));
    if (result.success) {
      dispatch(setForgotPasswordData(result.data));
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message || "",
      });
    } else {
      dispatch(failureForgotPassword(result));
    }
  };
}

export function resetPasswordChangeData() {
  return async (dispatch) => {
    dispatch(setForgotPasswordData([]));
  };
}
