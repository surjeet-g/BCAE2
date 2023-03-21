import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import { saveDataToDB, getDataFromDB } from "../../Storage/token";
import {
  storageKeys,
  DEFAULT_PROFILE_IMAGE,
} from "../../Utilities/Constants/Constant";
import Toast from "react-native-toast-message";
import {
  setWorkFlowListErrorDataInStore,
  setWorkFlowListDataInStore,
  createWorkFlowSuccessInStore,
  createWorkFlowErrorInStore,
  updateWorkFlowSuccessInStore,
  updateWorkFlowErrorInStore,
  getWorkFlowSuccessInStore,
  getWorkFlowErrorInStore,
  deleteWorkFlowSuccessInStore,
  deleteWorkFlowErrorInStore,
} from "./WorkFlowActions";

export function fetchWorkFlowListData(params, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.GET_WORKFLOW_LIST + "?limit=10&page=1";
    let result = await serverCall(url, requestMethod.GET, params, navigation);
    if (result.success) {
      dispatch(setWorkFlowListDataInStore(result.data.data));
    } else {
      dispatch(setWorkFlowListErrorDataInStore(result));
    }
  };
}

export function createWorkFlow(params, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.CREATE_WORKFLOW;
    let payload = {
      interactionType: "string",
      productType: "string",
      workflowName: "string",
      status: "string",
      wfDefinition: {},
    };
    let result = await serverCall(url, requestMethod.POST, payload, navigation);
    if (result.success) {
      dispatch(createWorkFlowSuccessInStore(result.data.data));
    } else {
      dispatch(createWorkFlowErrorInStore(result));
    }
  };
}

export function updateWorkFlow(params, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.UPDATE_WORKFLOW + params.workFlowId;
    let payload = {
      interactionType: "string",
      productType: "string",
      workflowName: "string",
      status: "string",
      wfDefinition: {},
    };
    let result = await serverCall(url, requestMethod.PUT, payload, navigation);
    if (result.success) {
      dispatch(updateWorkFlowSuccessInStore(result.data.data));
    } else {
      dispatch(updateWorkFlowErrorInStore(result));
    }
  };
}

export function getWorkFlow(params, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.GET_WORKFLOW_FOR_ID + params.workFlowId;
    let result = await serverCall(url, requestMethod.GET, params, navigation);
    if (result.success) {
      dispatch(getWorkFlowSuccessInStore(result.data.data));
    } else {
      dispatch(getWorkFlowErrorInStore(result));
    }
  };
}

export function deleteWorkFlow(params, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.DELETE_WORKFLOW + params.workFlowId;
    let result = await serverCall(
      url,
      requestMethod.DELETE,
      params,
      navigation
    );
    if (result.success) {
      dispatch(deleteWorkFlowSuccessInStore(result.data.data));
    } else {
      dispatch(deleteWorkFlowErrorInStore(result));
    }
  };
}
