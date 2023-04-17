import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import {
  setServiceProductsDataInStore,
  setServiceProductsErrorDataInStore,
  setCreateCustomerDataInStore,
  setCreateCustomerErrorDataInStore,
} from "./CreateCustomerAction";

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
        birthDate: formData.customerDetails.birthData,
        idType: formData.customerDetails.idType.code,
        idValue: formData.customerDetails.idValue,
        customerCategory: formData.customerDetails.categoryType.code,
        registeredNo: formData.customerDetails.registeredNo,
        registeredDate: formData.customerDetails.registeredDate,
      },
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    if (result.success) {
      dispatch(setCreateCustomerDataInStore(result.data.data));
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
    }
  };
}
