import {
  CUSTOMER_ACCOUNT_INIT,
  CUSTOMER_ACCOUNT_DATA,
  CUSTOMER_ACCOUNT_ERROR,
} from "./CustomerAccountAction";

const customerAccountInitialState = {
  initCustomerAccount: false,
  isCustomerAccountError: false,
  customerAccountData: {},
};

const CustomerAccountReducer = (
  state = customerAccountInitialState,
  action
) => {
  switch (action.type) {
    case CUSTOMER_ACCOUNT_INIT:
      return {
        ...state,
        initCustomerAccount: true,
        isCustomerAccountError: false,
        customerAccountData: {},
      };

    case CUSTOMER_ACCOUNT_ERROR:
      return {
        ...state,
        initCustomerAccount: true,
        isCustomerAccountError: true,
        customerAccountData: action.data,
      };

    case CUSTOMER_ACCOUNT_DATA:
      return {
        ...state,
        initCustomerAccount: false,
        isCustomerAccountError: false,
        customerAccountData: action.data,
      };
    default:
      return state;
  }
};
export default CustomerAccountReducer;
