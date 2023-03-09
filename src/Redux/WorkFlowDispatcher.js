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
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    if (result.success) {
      console.log("$$$-create-workflow-data", result.data.data);
    } else {
      console.log("$$$-create-workflow-error", result);
    }
  };
}
