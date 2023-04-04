import {
  FETCH_SERVICE_PRODUCTS_SUCCESS,
  FETCH_SERVICE_PRODUCTS_FAILURE,
} from "./CreateCustomerAction";

const initialState = {
  initCreateCustomer: false,
  products: [],
  productsError: {},
};

const CreateCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICE_PRODUCTS_SUCCESS: {
      let newdata = action.data.map((product) => {
        // let price = 0;
        // const { productChargesList } = product;
        // productChargesList.forEach((element) => {
        //   price = price + parseInt(element.chargeAmount);
        // });
        // product.price = price;
        product.quantity = 0;
        return product;
      });
      return {
        ...state,
        products: newdata,
      };
    }
    case FETCH_SERVICE_PRODUCTS_FAILURE:
      return {
        ...state,
        productsError: action.data,
      };
    default:
      return state;
  }
};
export default CreateCustomerReducer;
