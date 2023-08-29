
export const PROFILE_INIT = "PROFILE_INIT";
export const PROFILE_DATA = "PROFILE_DATA";
export const PROFILE_SEARCH_DATA = "PROFILE_SEARCH_DATA";
export const SERVICE_DATA = "SERVICE_DATA";

export const PROFILE_ERROR = "PROFILE_ERROR";
export const PROFILE_SEARCH_ERROR = "PROFILE_SEARCH_ERROR";

export const PROFILE_SEARCH_DATA_RESET = "PROFILE_SEARCH_DATA_RESET";

export const PROFILE_RESET = "PROFILE_RESET";
export const PROFILE_SET_FORM = "PROFILE_SET_FORM";
export const SET_USER_SEARCH = "SET_USER_SEARCH";
export const PROFILE_SET_EMPTY = "PROFILE_SET_EMPTY";
export const PROFILE_SET_USER_SELECTED_PROFILE = "PROFILE_SET_USER_SELECTED_PROFILE";
export const PROFILE_SET_USER_SELECTED_RESET = "PROFILE_SET_USER_SELECTED_RESET";


export const PROFILE_SEARCH_INIT = "PROFILE_SEARCH_INIT";

export function setUserSelectedProfile(data) {
  return { type: PROFILE_SET_USER_SELECTED_PROFILE, data };
}

export function resetUserSeletedProfile() {
  return { type: PROFILE_SET_USER_SELECTED_PROFILE };
}

export function initProfile() {
  return { type: PROFILE_INIT };
}

export function initProfileSearch() {
  return { type: PROFILE_SEARCH_INIT };
}

export function setSearchEmpty(data) {
  return { type: PROFILE_SET_EMPTY, data };
}


export function setProfileData(data) {
  return { type: PROFILE_DATA, data };
}

export function setProfileError(data) {
  return { type: PROFILE_ERROR, data };
}

export function setSearchProfileData(data) {
  return { type: PROFILE_SEARCH_DATA, data };
}

export function setServiceData(data) {
  return { type: SERVICE_DATA, data };
}

export function setSearchProfileReset(data) {

  return async (dispatch) => {
    dispatch({ type: PROFILE_SEARCH_DATA_RESET });
  };
  return;
}

export function setSearchProfileDataError(data) {
  return { type: PROFILE_SEARCH_ERROR, data };
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

export function setUserSearch(data) {
  console.log('task - profile text search dispatch', data)
  return async (dispatch) => {
    dispatch({ type: SET_USER_SEARCH, data });
  };

}