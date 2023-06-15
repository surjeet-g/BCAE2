import {
  CREATE_CUSTOMER_FAILURE, CREATE_CUSTOMER_SERVICE_SUCCESS, CREATE_CUSTOMER_SUCCESS, FETCH_SERVICE_PRODUCTS_FAILURE,
  FETCH_SERVICE_PRODUCTS_SUCCESS,
  REMOVE_SERVICE_PRODUCTS, SET_CURRENT_STEP, SET_SERVICE_CATEGORIES, SET_SHOW_ACCOUNT_CREATION_MODAL,
  SET_SIGNATURE
} from "./CreateCustomerAction";
import { FACE_RECOG_UPLOAD_DOCUS } from "./Steps";

const initialState = {
  initCreateCustomer: false,
  formData: {
    currentStep: FACE_RECOG_UPLOAD_DOCUS,
    getQuote: false,
    showAccountCreationModal: false,
    customerDetails: {},
    accountDetails: {},
    serviceDetails: { details: [] },
  },
  customerDataError: {},
  products: [],
  productsError: {},
  serviceCategories: [
    {
      id: 1,
      description: "Postpaid",
      code: "PT_POSTPAID",
      icon: require("../../Assets/icons/ic_postpaid.png"),
      selected: false,
    },
    {
      id: 2,
      description: "Prepaid",
      code: "PT_PREPAID",
      icon: require("../../Assets/icons/ic_prepaid.png"),
      selected: false,
    },
    {
      id: 3,
      description: "Hybrid",
      code: "PT_HYBRID",
      icon: require("../../Assets/icons/ic_word.png"),
      selected: false,
    },
  ],
};

const CreateCustomerReducer = (state = initialState, action) => {

  // console.log("$$$-state", JSON.stringify(state));
  console.log("$$$-action", JSON.stringify(action));
  switch (action.type) {
    case FETCH_SERVICE_PRODUCTS_SUCCESS: {
      const newProducts = action.data.map((product) => {
        let price = 0;
        const { productChargesList } = product;
        if (productChargesList?.length > 0) {
          price = productChargesList?.reduce((price, element) => {
            return price + parseInt(element.chargeAmount);
          }, price);
        }
        product.price = price;
        product.quantity = 0;
        return product;
      });

      const newServiceCategories = state.serviceCategories.map((category) => {
        if (action.serviceType === category.code) {
          category.selected = true;
        }
        return category;
      });
      return {
        ...state,
        products: [...state.products, ...newProducts],
        serviceCategories: newServiceCategories,
      };
    }
    case FETCH_SERVICE_PRODUCTS_FAILURE:
      return {
        ...state,
        productsError: action.data,
      };
    case REMOVE_SERVICE_PRODUCTS: {
      const newProducts = state.products.filter(
        (product) => action.data !== product?.productTypeDescription?.code
      );
      const newServiceCategories = state.serviceCategories.map((category) => {
        if (action.data === category.code) {
          category.selected = false;
        }
        return category;
      });
      return {
        ...state,
        products: newProducts,
        serviceCategories: newServiceCategories,
      };
    }
    case SET_SERVICE_CATEGORIES: {
      const { data } = action;
      let newServiceCategories =
        data !== undefined &&
        data?.map((item) => {
          item.selected = false;
          if (item.code === "PT_PREPAID") {
            item.icon = require("../../Assets/icons/ic_prepaid.png");
          } else if (item.code === "PT_POSTPAID") {
            item.icon = require("../../Assets/icons/ic_postpaid.png");
          } else {
            item.icon = require("../../Assets/icons/ic_pdf.png");
          }
          return item;
        });
      return {
        ...state,
        serviceCategories: [
          ...state.serviceCategories,
          ...newServiceCategories,
        ],
      };
    }
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        formData: { ...state.formData, ...action.data },
      };

    case CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        customerDataError: action.data,
      };
    case SET_CURRENT_STEP:
      return {
        ...state,
        formData: { ...state.formData, currentStep: action.data },
      };
    case CREATE_CUSTOMER_SERVICE_SUCCESS: {
      let newformData = { ...state.formData };
      let { data, formData } = action;
      newformData = { ...newformData, ...formData, ...data[0].account };

      let { serviceDetails } = newformData;
      let { details } = serviceDetails;
      details = details.map((item) => {
        const prtUuid = item.productUuid;
        const obj = data.find((currentItem) => {
          if (currentItem.service.productUuid === prtUuid) return currentItem;
        });
        let newItem = { ...item, ...obj };
        return newItem;
      });
      serviceDetails.details = details;
      newformData = { ...newformData, serviceDetails };
      return {
        ...state,
        formData: newformData,
      };
    }
    case SET_SHOW_ACCOUNT_CREATION_MODAL:
      return {
        ...state,
        formData: {
          ...state.formData,
          showAccountCreationModal: action.data,
        },
      };
    case SET_SIGNATURE:
      return {
        ...state,
        formData: {
          ...state.formData,
          signature: action.data,
        },
      };
    case CREATE_CUSTOMER_SERVICE_SUCCESS: {
      let newformData = { ...state.formData };
      let { data, formData } = action;
      newformData = { ...newformData, ...formData, ...data[0].account };

      let { serviceDetails } = newformData;
      let { details } = serviceDetails;
      details = details.map((item) => {
        const prtUuid = item.productUuid;
        const obj = data.find((currentItem) => {
          if (currentItem.service.productUuid === prtUuid) return currentItem;
        });
        let newItem = { ...item, ...obj };
        return newItem;
      });
      serviceDetails.details = details;
      newformData = { ...newformData, serviceDetails };
      console.log("$$$-newformData-fullydone", JSON.stringify(newformData));
      return {
        ...state,
        formData: newformData,
      };
    }
    case SET_SHOW_ACCOUNT_CREATION_MODAL:
      return {
        ...state,
        formData: {
          ...state.formData,
          showAccountCreationModal: action.data,
        },
      };
    case SET_SIGNATURE:
      return {
        ...state,
        formData: {
          ...state.formData,
          signature: action.data,
        },
      };
    default:
      return state;
  }
};
export default CreateCustomerReducer;
