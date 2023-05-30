import {
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_ERROR, NOTIFICATIONS_INIT
} from "./NotificationsAction";

const DATA = [
];
const notificationsInitialState = {
  initNotifications: false,
  isNotificationsError: false,
  notificationsData: DATA,
};

const NotificationsReducer = (state = notificationsInitialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_INIT:
      console.log('hitting reducer init',)
      return {
        ...state,
        initNotifications: true,
        isNotificationsError: false,
        notificationsData: {},
      };

    case NOTIFICATIONS_ERROR:
      return {
        ...state,
        initNotifications: false,
        isNotificationsError: true,
        notificationsData: action.data,
      };

    case NOTIFICATIONS_DATA:
      console.log('hitting reducer data',)
      return {
        ...state,
        initNotifications: false,
        isNotificationsError: false,
        notificationsData: action.data,
      };
    default:
      return state;
  }
};
export default NotificationsReducer;
