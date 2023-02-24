import {
  INIT_LOGIN,
  FAILURE_LOGIN,
  SET_LOGIN_DATA,
  RESET_LOGIN_DATA,
  SET_SHOW_SECOND_LOGIN_ALERT,
  RESET_SHOW_SECOND_LOGIN_ALERT,
} from "./LoginAction";

const loginInitialState = {
  initLogin: false,
  isLoginError: false,
  loggedProfile: {},
  showSecondLoginAlert: false,
  secondLoginAlertInfo: {},
};

const LoginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        initLogin: true,
        isLoginError: false,
        loggedProfile: {},
        showSecondLoginAlert: false,
      };

    case FAILURE_LOGIN:
      return {
        ...state,
        initLogin: false,
        isLoginError: true,
        loggedProfile: action.data,
      };

    case SET_LOGIN_DATA:
      return {
        ...state,
        initLogin: false,
        isLoginError: false,
        loggedProfile: action.data,
        showSecondLoginAlert: false,
      };

    case RESET_LOGIN_DATA:
      return {
        ...state,
        initLogin: false,
        isLoginError: false,
        loggedProfile: {},
        showSecondLoginAlert: false,
      };
    case SET_SHOW_SECOND_LOGIN_ALERT:
      return {
        ...state,
        showSecondLoginAlert: true,
        secondLoginAlertInfo: action.data,
      };
    case RESET_SHOW_SECOND_LOGIN_ALERT:
      return {
        ...state,
        showSecondLoginAlert: false,
        secondLoginAlertInfo: {},
      };
    default:
      return state;
  }
};
export default LoginReducer;
