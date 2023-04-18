import {
  FETCH_SERVICE_PRODUCTS_FAILURE,
  FETCH_SERVICE_PRODUCTS_SUCCESS,
  REMOVE_SERVICE_PRODUCTS,
  SET_SERVICE_CATEGORIES,
  CREATE_CUSTOMER_FAILURE,
  CREATE_CUSTOMER_SUCCESS,
  SET_CURRENT_STEP,
  CREATE_CUSTOMER_SERVICE_SUCCESS,
} from "./CreateCustomerAction";

const initialState = {
  initCreateCustomer: false,
  currentStep: 0,
  customerData: {},
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
      console.log("$$$-action", action);
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
      console.log("$$$-newServiceCategories", newServiceCategories);
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
        customerData: { ...state.customerData, ...action.data },
      };

    case CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        customerDataError: action.data,
      };
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.data,
      };
    case CREATE_CUSTOMER_SERVICE_SUCCESS:
      console.log("$$$-------->>>>>>>>>");
      {
        let newformData = { ...state.customerData };
        let { data } = action;
        newformData = { ...newformData, ...data[0].account };
        let { serviceDetails } = newformData;
        let { details } = serviceDetails;
        details = details.map((item) => {
          const prtUuid = item.productUuid;
          const service = data.find((currentItem) => {
            if (currentItem.service.productUuid === prtUuid)
              return currentItem.service;
          });
          console.log("$$$-service", service);
          let newItem = { ...item, ...service };
          return newItem;
        });
        serviceDetails.details = details;
        newformData = { ...newformData, serviceDetails };
        return {
          ...state,
          customerData: newformData,
        };
      }
    default:
      return state;
  }
};
export default CreateCustomerReducer;
