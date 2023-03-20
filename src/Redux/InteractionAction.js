export const INTERACTION_INIT = "INTERACTION_INIT";
export const INTERACTION_DATA = "INTERACTION_DATA";
export const INTERACTION_ERROR = "INTERACTION_ERROR";
export const INTERACTION_RESET = "INTERACTION_RESET";
export const INTERACTION_SET_FORM = "INTERACTION_SET_FORM";
export const INTERACTION_ADD_LOADER_ENABLE = "INTERACTION_ADD_LOADER_ENABLE";
export const INTERACTION_EDIT_LOADER_ENABLE = "INTERACTION_EDIT_LOADER_ENABLE";
export const INTERACTION_FORM_ERROR = "INTERACTION_FORM_ERROR";
export const INTERACTION_GET_WORKFLOW_SUCCESS =
  "INTERACTION_GET_WORKFLOW_SUCCESS";
export const INTERACTION_GET_WORKFLOW_FAILURE =
  "INTERACTION_GET_WORKFLOW_FAILURE";
export const INTERACTION_GET_DETAILS_SUCCESS =
  "INTERACTION_GET_DETAILS_SUCCESS";
export const INTERACTION_GET_DETAILS_FAILURE =
  "INTERACTION_GET_DETAILS_FAILURE";
export const CREATE_FOLLOWUP = "CREATE_FOLLOWUP";
export const CREATE_FOLLOWUP_FAILURE = "CREATE_FOLLOWUP_FAILURE";

export function initInteraction() {
  return { type: INTERACTION_INIT };
}

export function setInteractionData(data, isEdit) {
  return { type: INTERACTION_DATA, data, isEdit };
}

export function setInteractionError(data) {
  return { type: INTERACTION_ERROR, data };
}
//form handle
export function setInteractionFormField(data) {
  return async (dispatch) => {
    dispatch({ type: INTERACTION_SET_FORM, data });
  };
}
export function setInteractionFormFieldError(data) {
  return async (dispatch) => {
    dispatch({ type: INTERACTION_FORM_ERROR, data });
  };
}

export function setInteractionReset() {
  return async (dispatch) => {
    dispatch({ type: INTERACTION_RESET });
  };
}

export function initInteractionAdd() {
  return async (dispatch) => {
    dispatch({ type: INTERACTION_RESET });
  };
}

export function enableLoaderAddInteractionAdd(data) {
  return async (dispatch) => {
    dispatch({ type: INTERACTION_ADD_LOADER_ENABLE, data: data });
  };
}

export function enableLoaderEditInteractionAdd(data) {
  return async (dispatch) => {
    dispatch({ type: INTERACTION_EDIT_LOADER_ENABLE, data });
  };
}

export function setInteractionsWorkFlowDataInStore(data) {
  return { type: INTERACTION_GET_WORKFLOW_SUCCESS, data };
}

export function setInteractionsWorkFlowErrorDataInStore(data) {
  return { type: INTERACTION_GET_WORKFLOW_FAILURE, data };
}

export function setInteractionsDetailsDataInStore(data) {
  return { type: INTERACTION_GET_DETAILS_SUCCESS, data };
}

export function setInteractionsDetailsErrorDataInStore(data) {
  return { type: INTERACTION_GET_DETAILS_FAILURE, data };
}

export function setFollowupDataInStore(data) {
  return { type: CREATE_FOLLOWUP, data };
}

export function setFollowupErrorDataInStore(data) {
  return { type: CREATE_FOLLOWUP_FAILURE, data };
}
