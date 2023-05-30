export const INIT_CREATE_CUSTOMER = "INIT_CREATE_CUSTOMER";
export const FETCH_SERVICE_PRODUCTS = "FETCH_SERVICE_PRODUCTS";
export const FETCH_SERVICE_PRODUCTS_SUCCESS = "FETCH_SERVICE_PRODUCTS_SUCCESS";
export const FETCH_SERVICE_PRODUCTS_FAILURE = "FETCH_SERVICE_PRODUCTS_FAILURE";
export const REMOVE_SERVICE_PRODUCTS = "REMOVE_SERVICE_PRODUCTS";
export const CREATE_CUSTOMER_SUCCESS = "CREATE_CUSTOMER_SUCCESS";
export const CREATE_CUSTOMER_FAILURE = "CREATE_CUSTOMER_FAILURE";
export const SET_SERVICE_CATEGORIES = "SET_SERVICE_CATEGORIES";
export const SET_CURRENT_STEP = "SET_CURRENT_STEP";
export const CREATE_CUSTOMER_SERVICE_SUCCESS =
  "CREATE_CUSTOMER_SERVICE_SUCCESS";
export const SET_SHOW_ACCOUNT_CREATION_MODAL =
  "SET_SHOW_ACCOUNT_CREATION_MODAL";
export const SET_SIGNATURE = "SET_SIGNATURE";

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

export function setServiceCategoriesDataInStore(data) {
  return { type: SET_SERVICE_CATEGORIES, data };
}

export function setCurrentStepInStore(data) {
  return { type: SET_CURRENT_STEP, data };
}

export function setCreateCustomerServiceInStore(formData, data) {
  return { type: CREATE_CUSTOMER_SERVICE_SUCCESS, formData, data };
}

export function setShowAccountCreationModal(data) {
  return { type: SET_SHOW_ACCOUNT_CREATION_MODAL, data };
}

export function setSignatureInFormData(data) {
  return { type: SET_SIGNATURE, data };
}
