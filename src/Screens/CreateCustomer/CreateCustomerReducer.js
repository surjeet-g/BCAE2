import {
  FETCH_SERVICE_PRODUCTS_SUCCESS,
  FETCH_SERVICE_PRODUCTS_FAILURE,
  REMOVE_SERVICE_PRODUCTS,
} from "./CreateCustomerAction";

const initialState = {
  initCreateCustomer: false,
  products: [],
  productsError: {},
};

const CreateCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICE_PRODUCTS_SUCCESS: {
      let newProducts = action.data.map((product) => {
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
      return {
        ...state,
        products: [...state.products, ...newProducts],
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
      return {
        ...state,
        products: newProducts,
      };
    }
    default:
      return state;
  }
};
export default CreateCustomerReducer;
