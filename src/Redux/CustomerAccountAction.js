export const CUSTOMER_ACCOUNT_INIT = "CUSTOMER_ACCOUNT_INIT";
export const CUSTOMER_ACCOUNT_DATA = "CUSTOMER_ACCOUNT_DATA";
export const CUSTOMER_ACCOUNT_ERROR = "CUSTOMER_ACCOUNT_ERROR";

export const initCustomerAccountData = () => {
  return { type: CUSTOMER_ACCOUNT_INIT };
};

export const setCustomerAccountData = (data) => {
  return { type: CUSTOMER_ACCOUNT_DATA, data };
};

export const setCustomerAccountError = (data) => {
  return { type: CUSTOMER_ACCOUNT_ERROR, data };
};
