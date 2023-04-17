import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import Toast from "react-native-toast-message";

import { useSelector } from "react-redux";
import {
  setServiceProductsDataInStore,
  setServiceProductsErrorDataInStore,
  setCreateCustomerDataInStore,
  setCreateCustomerErrorDataInStore,
  setCurrentStepInStore,
} from "./CreateCustomerAction";

// const createCustomerReducerData = useSelector(
//   (state) => state.createCustomerReducerData
// );
export function fetchServiceProducts(serviceType, navigation = null) {
  return async (dispatch) => {
    let url =
      endPoints.FETCH_SERVICE_PRODUCTS_API + "?serviceType=" + serviceType;
    let result = await serverCall(url, requestMethod.GET, {}, navigation);
    if (result.success) {
      dispatch(setServiceProductsDataInStore(result.data.data, serviceType));
    } else {
      dispatch(setServiceProductsErrorDataInStore(result));
    }
  };
}

export function createCustomer(formData, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.CREATE_CUSTOMER_API;
    let params = {
      details: {
        source: "CREATE_CUSTOMER",
        firstName: formData.customerDetails.firstName,
        lastName: formData.customerDetails.lastName,
        gender: formData.customerDetails.gender.code,
        birthDate: formData.customerDetails.birthDate,
        idType: formData.customerDetails.idType.code,
        idValue: formData.customerDetails.idValue,
        customerCategory: formData.customerDetails.categoryType.code,
        registeredNo: formData.customerDetails.registeredNo,
        registeredDate: formData.customerDetails.registeredDate,
      },
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    if (result.success) {
      dispatch(
        setCreateCustomerDataInStore({ ...formData, ...result.data.data })
      );
      dispatch(setCurrentStepInStore(2));
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
      if (result.errorCode === 401)
        Toast.show({
          type: "bctError",
          text1: result.message,
        });
    }
  };
}

export function updateCustomerData(formData, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.UPDATE_CUSTOMER_API + formData.customerUuid;
    let params = {
      details: {
        customerNo: formData.customerNo,
        firstName: formData.customerDetails.firstName,
        lastName: formData.customerDetails.lastName,
        gender: formData.customerDetails.gender.code,
        birthDate: formData.customerDetails.birthDate,
        idType: formData.customerDetails.idType.code,
        idValue: formData.customerDetails.idValue,
        customerCategory: formData.customerDetails.categoryType.code,
        registeredNo: formData.customerDetails.registeredNo,
        registeredDate: formData.customerDetails.registeredDate,
      },
      address: {
        isPrimary: true,
        address1: formData.customerDetails.address1,
        address2: formData.customerDetails.address2,
        address3: formData.customerDetails.address3,
        city: formData.customerDetails.city,
        state: formData.customerDetails.state,
        district: formData.customerDetails.district,
        country: formData.customerDetails.country,
        postcode: formData.customerDetails.postCode,
      },
      contact: {
        isPrimary: true,
        firstName: formData.customerDetails.firstName,
        lastName: formData.customerDetails.lastName,
        emailId: formData.customerDetails.emailId,
        mobilePrefix: formData.customerDetails.mobilePrefix,
        mobileNo: formData.customerDetails.mobileNo,
      },
    };
    let result = await serverCall(url, requestMethod.PUT, params, navigation);
    if (result.success) {
      dispatch(setCreateCustomerDataInStore(result.data.data));
      dispatch(setCurrentStepInStore(3));
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
      if (result.errorCode === 401)
        Toast.show({
          type: "bctError",
          text1: result.message,
        });
    }
  };
}
