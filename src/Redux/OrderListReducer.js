import {
  ORDER_LIST_INIT,
  ORDER_LIST_DATA,
  ORDER_LIST_ERROR,
} from "./OrderListAction";

const orderListInitialState = {
  initOrderList: false,
  isOrderListError: false,
  orderListData: {},
};

const OrderListReducer = (state = orderListInitialState, action) => {
  switch (action.type) {
    case ORDER_LIST_INIT:
      return {
        ...state,
        initOrderList: true,
        isOrderListError: false,
        orderListData: {},
      };

    case ORDER_LIST_ERROR:
      return {
        ...state,
        initOrderList: false,
        isOrderListError: true,
        orderListData: action.data,
      };

    case ORDER_LIST_DATA:
      return {
        ...state,
        initOrderList: false,
        isOrderListError: false,
        orderListData: action.data,
      };
    default:
      return state;
  }
};
export default OrderListReducer;
