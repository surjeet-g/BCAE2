import {
  initForgotPasswordData,
  failureForgotPassword,
  setForgotPasswordData,
  resetForgotPasswordData,
} from "./ForgotPasswordAction";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import { saveToken, getToken } from "../../Storage/token";
import { passwordHash } from "../../Utilities/Constants/Constant";
import Toast from "react-native-toast-message";

export function verifyForgotPasswordData(navigation, params, type) {
  return async (dispatch) => {
    dispatch(initForgotPasswordData());

    let result = await serverCall(
      endPoints.FORGOT_PASSWORD,
      requestMethod.POST,
      params
    );

    // navigation.replace("ConfirmForgotPassword", { email: params.loginId });
    if (result.success) {
      dispatch(setForgotPasswordData(result?.data));
      dispatch(resetForgotPasswordData());
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message || "",
      });
      navigation.replace("ConfirmForgotPassword", { email: params?.loginId });
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

export function resetForgotPassword() {
  return async (dispatch) => {
    dispatch(resetForgotPasswordData());
  };
}

export function changePassword(
  email,
  oldPassword,
  newPassword,
  confirmPassword
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
      params
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
