import {
  failureOtpFormData,
  initOtpForm,
  initRegisterForm,
  setAddressLoopUpData,
  setLoaderPreVerify,
  setOtpFormData,
  setPreVerifyUserData,
  setPreVerifyUserData_ERROR
} from "./RegisterAction";

import Toast from "react-native-toast-message";

import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";

/**
* Reducer Dispatch
* Handle API call fetch pre request data for country information
* @memberOf Register
* @param  {string} type which type data fetch eg (POSTAL_CODE,COUNTRY) 
* @returns {Object} dipatcher to reducer
*/
export function fetchRegisterFormData(
  { type = "", search = "" },
  callback = () => { }
) {
  return async (dispatch) => {
    if (type != "COUNTRY" && type != "POSTAL_CODE") {
      dispatch(initRegisterForm());
    }
    let url;
    if (type == "COUNTRY") {
      url = `?country=${search}`;
    } else {
      url = `?postCode=${search}`;
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
      callback(addressLookUpResult?.data?.data);
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
      callback([]);
      dispatch(setAddressLoopUpData(addressLookUpResult.data));
    }
  };
}
/**
* Reducer Dispatch
* Handle API call for send mobile/email OTP
* @memberOf Register
* @param  {string} countryCode country code
* @param  {string} firstname first name 
* @param  {string} mobileno mobile number
* @param  {string} type email OTP or mobile OTP
* @returns {Object} dipatcher to reducer
*/
export function sendOtp(
  countryCode,
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
        extn: countryCode.replace("+", ""),
      };
    }


    console.log("reg req...", params)

    let result = await serverCall(servicePoint, requestMethod.POST, params);

    console.log("reg resp...", result)

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
/**
* Reducer Dispatch
* Handle API call for verify OTP
* @memberOf Register
* @param  {string} otp user enterd OTP
* @param  {string} type email OTP or mobile OTP
* @returns {Object} dipatcher to reducer
*/
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

/**
* Reducer Dispatch
* Handle API call for create customer 
* @memberOf Register
* @userRegister
* @param  {Object} params payload for API
* @param  {function} cbSuccess callback function for registration success
* @param  {function} cbFailed callback function for registration failed
* @returns {Object} Dispatcher to reducer
*/
export function userRegister(
  params,
  type,
  cbSuccess = (_) => { },
  cbFailed = (_) => { }
) {
  return async (dispatch) => {
    dispatch(initOtpForm(type));
    const servicePoint = endPoints.REGISTER;

    console.log("reg req...", params)

    let result = await serverCall(servicePoint, requestMethod.POST, params);

    console.log("reg resp...", result)

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
