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
} from "./WorkFlowActions";

export function fetchWorkFlowListData(userId, params, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.GET_WORKFLOW_LIST + "?limit=10&page=1";
    let result = await serverCall(url, requestMethod.GET, params, navigation);
    if (result.success) {
      console.log("$$$-workflow-data", result.data.data);
      dispatch(setWorkFlowListDataInStore(result.data.data));
    } else {
      console.log("$$$-workflow-data", result);
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
      console.log("$$$-create-workflow-data", result.data.data);
      dispatch(createWorkFlowSuccessInStore(result.data.data));
    } else {
      console.log("$$$-create-workflow-error", result);
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
      console.log("$$$-update-workflow-data", result.data.data);
      dispatch(updateWorkFlowSuccessInStore(result.data.data));
    } else {
      console.log("$$$-update-workflow-error", result);
      dispatch(updateWorkFlowErrorInStore(result));
    }
  };
}
