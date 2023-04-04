export const INIT_CREATE_CUSTOMER = "INIT_CREATE_CUSTOMER";
export const FETCH_SERVICE_PRODUCTS = "FETCH_SERVICE_PRODUCTS";
export const FETCH_SERVICE_PRODUCTS_SUCCESS = "FETCH_SERVICE_PRODUCTS_SUCCESS";
export const FETCH_SERVICE_PRODUCTS_FAILURE = "FETCH_SERVICE_PRODUCTS_FAILURE";

export function initData() {
  return { type: INIT_CREATE_CUSTOMER };
}

export function setServiceProductsDataInStore(data) {
  return { type: FETCH_SERVICE_PRODUCTS_SUCCESS, data };
}

export function setServiceProductsErrorDataInStore(data) {
  return { type: FETCH_SERVICE_PRODUCTS_FAILURE, data };
}
