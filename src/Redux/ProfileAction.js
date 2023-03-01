import { useDispatch } from "react-redux";

export const PROFILE_INIT = "PROFILE_INIT";
export const PROFILE_DATA = "PROFILE_DATA";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const PROFILE_RESET = "PROFILE_RESET";
export const PROFILE_SET_FORM = "PROFILE_SET_FORM";

export function initProfile() {
  return { type: PROFILE_INIT };
}

export function setProfileData(data) {
  return { type: PROFILE_DATA, data };
}

export function setProfileError(data) {
  return { type: PROFILE_ERROR, data };
}
//form handle
export function setProfileFormField(data) {
  return async (dispatch) => {
    dispatch({ type: PROFILE_SET_FORM, data });
  };
}

export function setProfileReset() {
  return async (dispatch) => {
    dispatch({ type: PROFILE_RESET });
  };
  return;
}
