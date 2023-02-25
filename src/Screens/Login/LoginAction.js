export const INIT_LOGIN = "INIT_LOGIN";
export const FAILURE_LOGIN = "FAILURE_LOGIN";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const RESET_LOGIN_DATA = "RESET_LOGIN_DATA";
export const SET_SHOW_SECOND_LOGIN_ALERT = "SET_SHOW_SECOND_LOGIN_ALERT";
export const RESET_SHOW_SECOND_LOGIN_ALERT = "RESET_SHOW_SECOND_LOGIN_ALERT";

export function initLoginData() {
  return { type: INIT_LOGIN };
}
export function failureLogin(data) {
  return { type: FAILURE_LOGIN, data };
}

export function setLoginData(data) {
  return { type: SET_LOGIN_DATA, data };
}

export function resetLoginData() {
  return { type: RESET_LOGIN_DATA };
}

export function setShowSecondLoginAlert(data) {
  return { type: SET_SHOW_SECOND_LOGIN_ALERT, data };
}

export function resetShowSecondLoginAlertData() {
  return { type: RESET_SHOW_SECOND_LOGIN_ALERT };
}
