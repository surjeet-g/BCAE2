export const INIT_CREATE_CUSTOMER = "INIT_CREATE_CUSTOMER";
export const FETCH_SERVICE_PRODUCTS = "FETCH_SERVICE_PRODUCTS";
export const FETCH_SERVICE_PRODUCTS_SUCCESS = "FETCH_SERVICE_PRODUCTS_SUCCESS";
export const FETCH_SERVICE_PRODUCTS_FAILURE = "FETCH_SERVICE_PRODUCTS_FAILURE";
export const REMOVE_SERVICE_PRODUCTS = "REMOVE_SERVICE_PRODUCTS";
export const CREATE_CUSTOMER_SUCCESS = "CREATE_CUSTOMER_SUCCESS";
export const CREATE_CUSTOMER_FAILURE = "CREATE_CUSTOMER_FAILURE";

export function initData() {
  return { type: INIT_CREATE_CUSTOMER };
}

export function setServiceProductsDataInStore(data, serviceType) {
  return { type: FETCH_SERVICE_PRODUCTS_SUCCESS, data, serviceType };
}

export function setServiceProductsErrorDataInStore(data) {
  return { type: FETCH_SERVICE_PRODUCTS_FAILURE, data };
}

export function removeCategoryProducts(data) {
  return { type: REMOVE_SERVICE_PRODUCTS, data };
}

export function setCreateCustomerDataInStore(data) {
  return { type: CREATE_CUSTOMER_SUCCESS, data };
}

export function setCreateCustomerErrorDataInStore(data) {
  return { type: CREATE_CUSTOMER_FAILURE, data };
}
