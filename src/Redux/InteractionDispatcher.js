import {
  enableLoaderAddInteractionAdd,
  enableLoaderEditInteraction,
  initInteraction,
  setInteractionData,
  setInteractionError,
  setInteractionsWorkFlowDataInStore,
  setInteractionsWorkFlowErrorDataInStore
} from "./InteractionAction";

import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";

import Toast from "react-native-toast-message";
import { getCustomerID } from "../Utilities/UserManagement/userInfo";

export function fetchInteractionAction(
  isCreateInteraction = false,
  page = 0,
  limit = 2,
  body = {
    searchParams: {},
  }
) {
  return async (dispatch) => {
    dispatch(initInteraction());

    const interactionResult = await serverCall(
      `${endPoints.INTERACTION_FETCH}?page=${page}&limit=${limit}`,
      requestMethod.POST,
      body
    );

    if (interactionResult?.success) {
      console.log(">>freqentlyAskedResult", isCreateInteraction);
      if (isCreateInteraction) {
        const customerId = await getCustomerID();
        const freqentlyAskedResult = await serverCall(
          `${endPoints.FREQUENTLY_ASKED}?customerId=${customerId}&limit=2`,
          requestMethod.GET,
          {}
        );

        const data = {
          frequerntlyAsked: freqentlyAskedResult?.data?.data,
          mostfrequently: interactionResult?.data?.data,
        };
        dispatch(setInteractionData(data, false));

      } else {
        dispatch(setInteractionData(interactionResult?.data?.data, false));
      }

      return true;
    } else {
      dispatch(setInteractionError([]));
      return false;
    }
  };
}

export function updateInteractionAction(obj) {
  return async (dispatch) => {
    const validation = await validateFormData(obj, dispatch);
    if (!validation) return null;
    dispatch(enableLoaderEditInteraction(false));

    let result = await serverCall(
      endPoints.INTERACTION_UPDATE,
      requestMethod.PUT,
      obj
    );

    if (result.success) {
      dispatch(enableLoaderEditInteractionAdd(false));
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message,
      });
      return true;
    } else {
      Toast.show({
        type: "bctError",
        text1: "Something wents wrong",
      });
      dispatch(setInteractionError([]));
      return false;
    }
  };
}

export function addInteractionAction(obj) {

  return async (dispatch) => {
    // const validation = await validateFormData(obj, dispatch);
    // if (!validation) return null;

    dispatch(enableLoaderAddInteractionAdd(true));

    let result = await serverCall(
      endPoints.INTERACTION_ADD,
      requestMethod.POST,
      obj
    );

    if (result.success) {
      dispatch(enableLoaderAddInteractionAdd(false));
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message,
      });
      return { status: true, response: { id: 1 } };
    } else {
      Toast.show({
        type: "bctError",
        text1: "Something wents wrong",
      });
      dispatch(enableLoaderAddInteractionAdd(false));
      return { status: false, response: { id: 1, message: "dfdf" } };
    }
  };
}

const validateFormData = async (formData, dispatch) => {
  let status = false;
  //df,//df,//df,//df,//df,//df,//df,//df,//df
  return status;
};

export function getWorkFlowForInteractionID(
  interactionID,
  params = {},
  requireFollowUpData = false,
  navigation = null
) {
  return async (dispatch) => {
    let url =
      endPoints.INTERACTION_GET_WORKFLOW +
      interactionID +
      "?getFollwUp=" +
      requireFollowUpData;
    let result = await serverCall(url, requestMethod.GET, params, navigation);
    if (result.success) {
      console.log("$$$-getWorkFlowForInteractionID-data", result.data.data);
      dispatch(setInteractionsWorkFlowDataInStore(result.data.data));
    } else {
      console.log("$$$-getWorkFlowForInteractionID-error", result);
      dispatch(setInteractionsWorkFlowErrorDataInStore(result));
    }
  };
}
