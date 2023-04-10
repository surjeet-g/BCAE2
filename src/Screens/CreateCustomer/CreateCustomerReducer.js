import {
  FETCH_SERVICE_PRODUCTS_SUCCESS,
  FETCH_SERVICE_PRODUCTS_FAILURE,
  REMOVE_SERVICE_PRODUCTS,
} from "./CreateCustomerAction";

const initialState = {
  initCreateCustomer: false,
  products: [],
  productsError: {},
  serviceCategories: [
    {
      id: 1,
      name: "Postpaid",
      code: "PT_POSTPAID",
      icon: require("../../Assets/icons/ic_postpaid.png"),
      selected: false,
    },
    {
      id: 2,
      name: "Prepaid",
      code: "PT_PREPAID",
      icon: require("../../Assets/icons/ic_prepaid.png"),
      selected: false,
    },
    {
      id: 3,
      name: "Hybrid",
      code: "PT_HYBRID",
      icon: require("../../Assets/icons/ic_word.png"),
      selected: false,
    },
  ],
  customerTypes: [
    {
      id: 1,
      name: "Business",
      code: "BUS",
      icon: require("../../Assets/icons/ic_business.png"),
    },
    {
      id: 2,
      name: "Government",
      code: "GOVN",
      icon: require("../../Assets/icons/ic_government.png"),
    },
    {
      id: 3,
      name: "Regular",
      code: "REG",
      icon: require("../../Assets/icons/ic_regular.png"),
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
    default:
      return state;
  }
};
export default CreateCustomerReducer;
