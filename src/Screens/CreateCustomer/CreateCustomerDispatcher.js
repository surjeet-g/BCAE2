import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import Toast from "react-native-toast-message";
import moment from "moment";
import {
  setServiceProductsDataInStore,
  setServiceProductsErrorDataInStore,
  setCreateCustomerDataInStore,
  setCreateCustomerErrorDataInStore,
  setCurrentStepInStore,
  setCreateCustomerServiceInStore,
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
  console.log("$$$-createCustomer");
  console.log("$$$-createCustomer-formData", formData);

  return async (dispatch) => {
    let url = endPoints.CREATE_CUSTOMER_API;
    let params = {
      details: {
        source: "CREATE_CUSTOMER",
        firstName: formData.customerDetails.firstName,
        lastName: formData.customerDetails.lastName,
        gender: formData.customerDetails.gender.code,
        birthDate: moment(formData.customerDetails.birthDate).format(
          "YYYY-MM-DD"
        ),
        idType: formData.customerDetails.idType.code,
        idValue: formData.customerDetails.idValue,
        customerCategory: formData.customerDetails.categoryType.code,
        registeredNo: formData.customerDetails.registeredNo,
        registeredDate: moment(formData.customerDetails.registeredDate).format(
          "YYYY-MM-DD"
        ),
      },
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    console.log("$$$-createCustomer-result", result);
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
        birthDate: moment(formData.customerDetails.birthDate).format(
          "YYYY-MM-DD"
        ),
        idType: formData.customerDetails.idType.code,
        idValue: formData.customerDetails.idValue,
        customerCategory: formData.customerDetails.categoryType.code,
        registeredNo: formData.customerDetails.registeredNo,
        registeredDate: moment(formData.customerDetails.registeredDate).format(
          "YYYY-MM-DD"
        ),
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

export function createCustomerService(formData, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.CREATE_CUSTOMER_SERVICE_API;
    let params = {
      service: contructServicePayload(formData),
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    if (result.success) {
      dispatch(setCreateCustomerServiceInStore(result.data.data));
      formData?.getQuote
        ? dispatch(setCurrentStepInStore(10))
        : dispatch(setCurrentStepInStore(5));
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

const contructServicePayload = (formData) => {
  let params = formData.serviceDetails.details.map((item) => {
    let newitem = {
      details: {
        action: "ADD",
        serviceName: item.productName,
        serviceCategory: item.productCategory,
        serviceType: item.serviceType,
        planPayload: {
          productId: item.productId,
          productUuid: item.productUuid,
        },
        quantity: "" + item.quantity,
        customerUuid: formData.customerUuid,
        currency: item.productChargesList[0].chargeDetails.currency,
        billLanguage: "BLENG",
      },
    };
    return newitem;
  });
  return params;
};

export function updateCustomerServiceData(formData, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.UPDATE_CUSTOMER_SERVICE_API;
    let params = contructUpdateServicePayload();
    let result = await serverCall(url, requestMethod.PUT, params, navigation);
    console.log("$$$-createCustomerService-result", JSON.stringify(result));
    if (result.success) {
      dispatch(setCreateCustomerDataInStore(result.data.data));
      // dispatch(setCurrentStepInStore(5));
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

const contructUpdateServicePayload = (formData) => {
  let params = formData.serviceDetails.details.map((item) => {
    let newitem = {
      details: {
        action: "UPDATE",
        serviceName: item.productName,
        serviceCategory: item.productCategory,
        serviceType: item.serviceType,
        planPayload: {
          productId: item.productId,
          productUuid: item.productUuid,
        },
        quantity: "" + item.quantity,
        customerUuid: formData.customerUuid,
        currency: item.productChargesList[0].chargeDetails.currency,
        billLanguage: "BLENG",
        accountUuid: formData.accountUuid,
        serviceUuid: item.serviceUuid,
      },
      address: {
        isPrimary: false,
        address1: formData.serviceDetails.address1,
        address2: formData.serviceDetails.address2,
        address3: formData.serviceDetails.address3,
        city: formData.serviceDetails.city,
        state: formData.serviceDetails.state,
        district: formData.serviceDetails.district,
        country: formData.serviceDetails.country,
        postcode: formData.serviceDetails.postCode,
      },
    };
    return newitem;
  });
  return params;
};

export function updateAccountData(formData, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.UPDATE_ACCOUNT_API + formData.customerUuid;
    let params = contructUpdateAccountPayload();
    let result = await serverCall(url, requestMethod.PUT, params, navigation);
    if (result.success) {
      dispatch(setCreateCustomerDataInStore(result.data.data));
      // dispatch(setCurrentStepInStore(5));
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

const contructUpdateAccountPayload = (formData) => {
  let params = {
    details: {
      action: "UPDATE",
      firstName: formData.accountDetails.firstName,
      lastName: formData.accountDetails.lastName,
      gender: formData.accountDetails.gender.code,
      idType: formData.accountDetails.idType.code,
      idValue: formData.accountDetails.idValue,
      registeredNo: formData.accountDetails.registeredNo,
      registeredDate: formData.accountDetails.registeredDate,
      accountCategory: formData.accountDetails.accountCategory.code,
      accountLevel: formData.accountDetails.accountLevel.code,
      billLanguage: formData.accountDetails.billLang.code,
      accountType: formData.accountDetails.accountType.code,
      notificationPreference: formData.accountDetails.notifPref.code,
      currency: formData.accountDetails.currency.code,
    },
    contact: {
      contactNo: formData.contactNo,
      isPrimary: true,
      firstName: formData.accountDetails.firstName,
      lastName: formData.accountDetails.lastName,
      emailId: formData.accountDetails.emailId,
      mobilePrefix: formData.accountDetails.mobilePrefix,
      mobileNo: formData.accountDetails.mobileNo,
    },
  };
  return params;
};

export function updateCustomerStatus(formData, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.UPDATE_CUSTOMER_STATUS_API;
    let params = {
      customerUuid: formData.customerUuid,
      accountUuid: formData.accountUuid,
      service: formData.serviceDetails.details.map((item) => {
        return item.serviceUuid;
      }),
      getQuote: false,
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    if (result.success) {
      dispatch(setCreateCustomerDataInStore(result.data.data));
      // dispatch(setCurrentStepInStore(5));
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
