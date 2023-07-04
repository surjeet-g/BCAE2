import moment from "moment";
import Toast from "react-native-toast-message";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import {
  setCreateCustomerDataInStore,
  setCreateCustomerErrorDataInStore, setCreateCustomerServiceInStore, setCurrentStepInStore, setServiceProductsDataInStore,
  setServiceProductsErrorDataInStore, setShowAccountCreationModal
} from "./CreateCustomerAction";
import { handleNextHandle, STEP_CUSTOMER_ADDRESS } from "./Steps";

export function fetchServiceProducts(serviceType, navigation = null) {
  return async (dispatch) => {
    let url =
      endPoints.FETCH_SERVICE_PRODUCTS_API + "?productType=" + serviceType;
    let result = await serverCall(url, requestMethod.GET, {}, navigation);
    if (result.success) {
      dispatch(setServiceProductsDataInStore(result.data.data, serviceType));
      // return true
    } else {
      dispatch(setServiceProductsErrorDataInStore(result));
      // return false
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
        birthDate: moment(formData.customerDetails.birthDate).format(
          "YYYY-MM-DD"
        ),
        idType: formData.customerDetails.idType.code,
        idValue: formData.customerDetails.idValue,
        // customerCategory: formData.customerDetails.categoryType.code,
        // registeredNo: formData.customerDetails.registeredNo,
        // registeredDate: moment(formData.customerDetails.registeredDate).format(
        //   "YYYY-MM-DD"
        // ),
      },
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    console.log("Create customer API with Payload", params, result);
    if (result.success) {
      dispatch(
        setCreateCustomerDataInStore({ ...formData, ...result.data.data })
      );
      dispatch(setCurrentStepInStore(STEP_CUSTOMER_ADDRESS));
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
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
        // customerCategory: formData.customerDetails.categoryType.code,
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
    console.log("Address update API", params, result);
    if (result.success) {
      dispatch(setCreateCustomerDataInStore(result.data.data));
      dispatch(setCurrentStepInStore(3));
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
      Toast.show({
        type: "bctError",
        text1: result.message,
      });
    }
  };
}

export function createCustomerService(formData, navigation = null, currenStp = 0) {
  return async (dispatch) => {
    let url = endPoints.CREATE_CUSTOMER_SERVICE_API;
    let params = {
      service: contructServicePayload(formData),
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    console.log("createCustomerService-result", result, params);

    if (result.success) {
      dispatch(setCreateCustomerServiceInStore(formData, result.data.data));
      formData?.getQuote
        ? dispatch(setCurrentStepInStore(10))
        : dispatch(setCurrentStepInStore(handleNextHandle(currenStp)));
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
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

export function updateCustomerServiceData(
  formData,
  currentStep,
  navigation = null
) {
  return async (dispatch) => {
    let url = endPoints.UPDATE_CUSTOMER_SERVICE_API;
    let params = {
      service: contructUpdateServicePayload(formData, currentStep),
    };
    let result = await serverCall(url, requestMethod.PUT, params, navigation);
    console.log("$$$-updateCustomerServiceData-result", result, params);
    if (result.success) {
      dispatch(setCreateCustomerServiceInStore(formData, result.data.data));
      if (currentStep === 5) {
        dispatch(setShowAccountCreationModal(true));
      } else if (currentStep === 8) {
        dispatch(setCurrentStepInStore(currentStep + 1));
      }
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
      Toast.show({
        type: "bctError",
        text1: result.message,
      });
    }
  };
}

const contructUpdateServicePayload = (formData, currentStep) => {
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
        serviceUuid: item.service.serviceUuid,
      },
      address: {
        isPrimary: false,
        address1:
          currentStep === 5
            ? formData.serviceDetails.address1
            : formData.accountDetails.address1,
        address2:
          currentStep === 5
            ? formData.serviceDetails.address2
            : formData.accountDetails.address2,
        address3:
          currentStep === 5
            ? formData.serviceDetails.address3
            : formData.accountDetails.address3,
        city:
          currentStep === 5
            ? formData.serviceDetails.city
            : formData.accountDetails.city,
        state:
          currentStep === 5
            ? formData.serviceDetails.state
            : formData.accountDetails.state,
        district:
          currentStep === 5
            ? formData.serviceDetails.district
            : formData.accountDetails.district,
        country:
          currentStep === 5
            ? formData.serviceDetails.country
            : formData.accountDetails.country,
        postcode:
          currentStep === 5
            ? formData.serviceDetails.postCode
            : formData.accountDetails.postCode,
      },
    };
    return newitem;
  });
  return params;
};

export function updateAccountData(formData, currentStep, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.UPDATE_ACCOUNT_API + formData.accountUuid;
    let params = contructUpdateAccountPayload(formData, currentStep);
    let result = await serverCall(url, requestMethod.PUT, params, navigation);
    console.log("updateAccountData-result", result, params);
    if (result.success) {
      dispatch(setCreateCustomerDataInStore(result.data.data));
      dispatch(setCurrentStepInStore(currentStep + 1));
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
      Toast.show({
        type: "bctError",
        text1: result.message,
      });
    }
  };
}

const contructUpdateAccountPayload = (formData, currentStep) => {
  let params =
    currentStep === 8
      ? {
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
          notificationPreference: [[formData.accountDetails.notifPref.code]],
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

        address: {
          isPrimary: true,
          address1: formData.accountDetails.address1,
          address2: formData.accountDetails.address2,
          address3: formData.accountDetails.address3,
          city: formData.accountDetails.city,
          state: formData.accountDetails.state,
          district: formData.accountDetails.district,
          country: formData.accountDetails.country,
          postcode: formData.accountDetails.postCode,
        },
      }
      : {
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
          notificationPreference: [[formData.accountDetails.notifPref.code]],
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
        return item.service.serviceUuid;
      }),
      getQuote: formData.getQuote,
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    console.log("Update customerStatus result", result, params);
    if (result.success) {
      // TODO: Check what to next step - like where to navigate
      Toast.show({
        type: "bctSuccess",
        text1: result.data.message,
      });
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
      Toast.show({
        type: "bctError",
        text1: result.message,
      });
    }
  };
}

export function createOrderForCustomer(formData, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.CREATE_ORDER_API;
    let params = constructCreateOrderPayload(formData);
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    console.log("$$$-createOrderForCustomer-result", JSON.stringify(result));
    if (result.success) {
      // TODO: Check what to next step - like where to navigate
      Toast.show({
        type: "bctSuccess",
        text1: result.data.message,
      });
    } else {
      dispatch(setCreateCustomerErrorDataInStore(result));
      Toast.show({
        type: "bctError",
        text1: result.message,
      });
    }
  };
}

const constructCreateOrderPayload = (formData) => {
  let params = {
    customerUuid: formData.customerUuid,
    orderCategory: "OC_N",
    orderSource: "CC",
    orderType: "OT_SU",
    orderChannel: "CHNL004",
    orderCause: "CHNL024",
    orderPriority: "PRTYHGH",
    billAmount: calculateTotalBillAmount(formData.serviceDetails.details),
    orderDescription: "Customer Order",
    order: formData.serviceDetails.details.map((item) => {
      let modifiedItem = {
        orderFamily: "OF_PHYCL",
        orderMode: "ONLINE",
        billAmount: item.price * item.quantity,
        orderDescription: item.productTypeDescription.description,
        serviceType: item.serviceTypeDescription.code,
        accountUuid: item.account.accountUuid,
        serviceUuid: item.service.serviceUuid,
        contactPreference: ["CHNL004"],
        product: [
          {
            productId: parseInt(item.productId),
            productQuantity: item.quantity,
            productAddedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            billAmount: item.price * item.quantity,
            edof: moment().format("YYYY-MM-DD"),
            productSerialNo: item.productNo,
          },
        ],
      };
      return modifiedItem;
    }),
  };
  return params;
};

const calculateTotalBillAmount = (products) => {
  let gTotal = 0;
  products.forEach((product) => {
    if (product.quantity > 0)
      gTotal = gTotal + product.quantity * product.price;
  });
  return gTotal;
};
