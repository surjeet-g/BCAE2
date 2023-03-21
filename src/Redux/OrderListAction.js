export const ORDER_LIST_INIT = "ORDER_LIST_INIT";
export const ORDER_LIST_DATA = "ORDER_LIST_DATA";
export const ORDER_LIST_ERROR = "ORDER_LIST_ERROR";

export function initOrderListData() {
  return { type: ORDER_LIST_INIT };
}

export function setOrderListData(data) {
  return { type: ORDER_LIST_DATA, data };
}

export function setOrderListError(data) {
  return { type: ORDER_LIST_ERROR, data };
}
