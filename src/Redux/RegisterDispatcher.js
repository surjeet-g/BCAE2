import {
  failureOtpFormData, initOtpForm, initRegisterForm, setAddressLoopUpData, setLoaderPreVerify, setOtpFormData, setPreVerifyUserData,
  setPreVerifyUserData_ERROR
} from "./RegisterAction";

import Toast from "react-native-toast-message";

import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";

export function fetchRegisterFormData({ type = "", search = "" }, callback = () => { }) {
  return async (dispatch) => {

    if (type != "COUNTRY" && type != "POSTAL_CODE") {
      dispatch(initRegisterForm());
    }
    let url;
    if (type == "COUNTRY") {
      url = `?country=${search}`
    }
    else {
      url = `?postCode=${search}`
    }
    let params = {};
    let addressLookUpResult = await serverCall(
      endPoints.ADDRESS_LOOKUP_REGISTRATION + url,
      requestMethod.GET,
      params
    );



    if (addressLookUpResult) {
      //result.data.data.

      dispatch(setAddressLoopUpData(addressLookUpResult?.data?.data));
      callback(addressLookUpResult?.data?.data)
      // let bussineEntities = "GENDER,ADDRESS_TYPE,CUSTOMER_ID_TYPE";
      // let result = await serverCall(
      //   `${endPoints.GET_REGISTER_FORM_DATA}?searchParam=code&valueParam=${bussineEntities}`,
      //   requestMethod.GET
      // );

      // if (result.success && result?.data?.data) {
      //   let serviceCode = {
      //     SERVICECODE: [
      //       {
      //         code: "",
      //         description: "TD123",
      //         codeType: "TD123",
      //         mapping: null,
      //         status: "AC",
      //       },
      //     ],
      //   };

      //   let Data = Object.assign(result.data.data, serviceCode);
      //   dispatch(setRegisterFormData(result.data.data));
      // } else {
      //   dispatch(failureRegisterFormData(result));
      // }
    } else {
      callback([])
      dispatch(setAddressLoopUpData(addressLookUpResult.data));
    }
  };
}

export function sendOtp(
  mobileno,
  firstname,
  type,
  showOtpSentMessage = () => { }
) {
  return async (dispatch) => {
    dispatch(initOtpForm(type));
    let servicePoint = "";
    let params = {};
    if (type === "email") {
      servicePoint = endPoints.GET_OTP_FOR_EMAIL;

      params = {
        reference: mobileno,
      };
    } else {
      servicePoint = endPoints.GET_OTP_FOR_MOBILE;
      params = {
        reference: mobileno,

        extn: 0,
      };
    }

    let result = await serverCall(servicePoint, requestMethod.POST, params);

    if (result.success && result?.data) {
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message || "",
      });
      showOtpSentMessage();
      dispatch(setOtpFormData(result?.data, type));
    } else {
      Toast.show({
        type: "bctError",
        text1: result?.message || "",
      });
      dispatch(failureOtpFormData(result, type));
    }
  };
}

export function getOtpForCheck({ otp, reference }, type) {
  return async (dispatch) => {
    dispatch(initOtpForm(type));
    let servicePoint = "";

    const refType = type == "mobileOtp" ? "mobile" : "email";
    servicePoint = `${endPoints.CHECK_OTP}${reference}?type=${refType}&otp=${otp}`;
    let result = await serverCall(servicePoint, requestMethod.GET);

    if (result.success) {
      dispatch(setOtpFormData(result?.data, type));
      return { status: true };
    } else {
      Toast.show({
        type: "bctError",
        text1: result?.message || "",
      });
      dispatch(failureOtpFormData(result, type));
      return { status: false };
    }
  };
}

export function userRegister(
  params,
  type,
  cbSuccess = (_) => { },
  cbFailed = (_) => { }
) {
  return async (dispatch) => {
    dispatch(initOtpForm(type));
    const servicePoint = endPoints.REGISTER;

    let result = await serverCall(servicePoint, requestMethod.POST, params);

    if (result.success) {
      cbSuccess(result?.data?.message);
      dispatch(setOtpFormData(result?.data, type));
    } else {
      Toast.show({
        type: "bctError",
        text1: result?.message,
      });

      cbFailed();
      dispatch(failureOtpFormData(result, type));
    }
  };
}

export const PreVerifyUserDataData = () => {
  return async (dispatch) => {
    dispatch(setLoaderPreVerify(true));
    let params = {};
    let result = await serverCall(
      endPoints.PREVERIFYUSERDATA,
      requestMethod.POST,
      params
    );
    if (result.success) {
      dispatch(setPreVerifyUserData(result?.data));
      return { status: true, response: result?.data };
    } else {
      //to do remove mock response

      dispatch(setPreVerifyUserData_ERROR(result));
      return {
        status: true, //false
        response: { msg: result?.message || "Something wents wrong" },
      };
    }
  };
};
