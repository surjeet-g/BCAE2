export const GET_WORKFLOW_LIST_DATA = "GET_WORKFLOW_LIST_DATA";
export const GET_WORKFLOW_LIST_SUCCESS = "GET_WORKFLOW_LIST_SUCCESS";
export const GET_WORKFLOW_LIST_FAILURE = "GET_WORKFLOW_LIST_FAILURE";
export const UPDATE_WORKFLOW_DATA = "UPDATE_WORKFLOW_DATA";
export const UPDATE_WORKFLOW_SUCCESS = "UPDATE_WORKFLOW_SUCCESS";
export const UPDATE_WORKFLOW_FAILURE = "UPDATE_WORKFLOW_FAILURE";
export const DELETE_WORKFLOW_DATA = "DELETE_WORKFLOW_DATA";
export const DELETE_WORKFLOW_SUCCESS = "DELETE_WORKFLOW_SUCCESS";
export const DELETE_WORKFLOW_FAILURE = "DELETE_WORKFLOW_FAILURE";
export const CREATE_WORKFLOW_DATA = "CREATE_WORKFLOW_DATA";
export const CREATE_WORKFLOW_SUCCESS = "CREATE_WORKFLOW_SUCCESS";
export const CREATE_WORKFLOW_FAILURE = "CREATE_WORKFLOW_FAILURE";
export const GET_WORKFLOW_DATA = "GET_WORKFLOW_DATA";
export const GET_WORKFLOW_SUCCESS = "GET_WORKFLOW_SUCCESS";
export const GET_WORKFLOW_FAILURE = "GET_WORKFLOW_FAILURE";

export function setWorkFlowListDataInStore(data) {
  return { type: GET_WORKFLOW_LIST_SUCCESS, data };
}

export function setWorkFlowListErrorDataInStore(data) {
  return { type: GET_WORKFLOW_LIST_FAILURE, data };
}

export function createWorkFlowSuccessInStore(data) {
  return { type: CREATE_WORKFLOW_SUCCESS, data };
}

export function createWorkFlowErrorInStore(data) {
  return { type: CREATE_WORKFLOW_FAILURE, data };
}

export function updateWorkFlowSuccessInStore(data) {
  return { type: UPDATE_WORKFLOW_SUCCESS, data };
}

export function updateWorkFlowErrorInStore(data) {
  return { type: UPDATE_WORKFLOW_FAILURE, data };
}

export function getWorkFlowSuccessInStore(data) {
  return { type: GET_WORKFLOW_SUCCESS, data };
}

export function getWorkFlowErrorInStore(data) {
  return { type: GET_WORKFLOW_FAILURE, data };
}
