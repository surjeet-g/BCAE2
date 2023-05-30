import {
  enableLoaderAddInteractionAdd,
  enableLoaderEditInteraction,
  initInteraction, setAssignInteractionToSelfDataInStore,
  setAssignInteractionToSelfErrorDataInStore, setFollowupDataInStore,
  setFollowupErrorDataInStore, setInteractionData,
  setInteractionError, setInteractionsDetailsDataInStore,
  setInteractionsDetailsErrorDataInStore, setInteractionsFollowupDataInStore,
  setInteractionsFollowupErrorDataInStore, setInteractionsWorkFlowDataInStore,
  setInteractionsWorkFlowErrorDataInStore,
  setknowledgeHistory
} from "./InteractionAction";

import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";

import get from "lodash.get";
import Toast from "react-native-toast-message";
import { typeOfAccrodin } from "../Screens/TabScreens/InteractionsToOrder";
import {
  getCustomerID,
  getCustomerUUID
} from "../Utilities/UserManagement/userInfo";

export function fetchInteractionAction(type = "", params = {}, isRemovedHistory = false) {
  return async (dispatch) => {
    if (type != typeOfAccrodin.knowlegde.value) {
      dispatch(initInteraction());
    }
    const customerUUID = await getCustomerUUID();
    const customerID = await getCustomerID();
    let flowId;
    console.log("hititng", customerID, type);
    let interactionResult;
    if (type == typeOfAccrodin.rencently.value) {
      interactionResult = await serverCall(
        `${endPoints.INTERACTION_FETCH}?page=0&limit=4`,
        requestMethod.POST,
        {
          searchParams: {
            customerId: customerID,
          },
        }
      );
    } else if (type == typeOfAccrodin.frequently.value) {
      interactionResult = await serverCall(
        `${endPoints.FREQUENTLY_ASKED}?limit=4`,
        requestMethod.GET,
        {}
      );
    } else if (type == typeOfAccrodin.category.value) {
      interactionResult = await serverCall(
        `${endPoints.FREQUENTLY_ASKED}?limit=4`,
        requestMethod.GET,
        {}
      );
    }
    else if (type == typeOfAccrodin.workflow.value) {
      //remove all userinput knowlege data
      if (isRemovedHistory) {
        dispatch(intractionKnowlegeHistoryRemoveUserInputTypes())
      }
      let converstionHistory = []
      const mockArray = Array.from({ length: 50 }, (_, x) => x + 1)
      for await (const num of mockArray) {
        const workflowResult = await serverCall(
          `${endPoints.INTERACTION_WORKFLOW}`,
          requestMethod.POST,
          params
        );
        if (workflowResult.success) {
          console.log('workflow response', workflowResult.data)
          const tempConv = get(workflowResult, 'data.data.conversation', [])
          console.log('conversation', tempConv)
          if (tempConv.length != 0) {
            converstionHistory.push(tempConv)
          }

          const callAgain = get(workflowResult, 'data.data.callAgain', false)
          const actionType = get(workflowResult, 'data.data.actionType', false)

          console.log('callagain', callAgain)
          if (!callAgain || actionType == "COLLECTINPUT" || actionType == "WORKFLOWEND") {
            break;
          }
        }
        else {
          break;
        }
      }
      dispatch(setknowledgeHistory(converstionHistory))
      return null

    } else if (type == typeOfAccrodin.knowlegde.value) {

      interactionResult = await serverCall(
        `${endPoints.KNOWLEDGE_SEARCH_STATEMENT}`,
        requestMethod.POST,
        {
          ...params,
          customerUuid: customerUUID,
        }
      );
      console.log('dispatcher result', interactionResult)

    } else {
      dispatch(setInteractionError([]));
      return false;
    }

    if (interactionResult?.success) {
      let data = [];

      if (type == typeOfAccrodin.rencently.value) {
        data = interactionResult?.data?.data?.rows;
      } else if (type == typeOfAccrodin.frequently.value) {
        data = interactionResult?.data?.data;
      } else if (type == typeOfAccrodin.category.value) {
        data = interactionResult?.data?.data;
      } else if (type == typeOfAccrodin.searchbox.value) {
        data = interactionResult?.data?.data;
      }
      else if (type == typeOfAccrodin.knowlegde.value) {
        //knowledge value
        //array of data for showing history of resol
        flowId = get(interactionResult, 'data.data.flwId', '')
        console.log('interact->dispater->knwolege:flowId', flowId)
        console.log('interact->dispater->knwolege result', interactionResult)
        //for showing history in pop 
        let converstionHistory = []
        if (flowId != "") {
          const conversationID = get(interactionResult, 'data.data.conversationUid', '')
          const mockArray = Array.from({ length: 50 }, (_, x) => x + 1)
          // console.log('mockArray', mockArray)
          // (async function () {
          for await (const num of mockArray) {
            console.log('hititng inside',)
            const workflowResult = await serverCall(
              `${endPoints.INTERACTION_WORKFLOW}`,
              requestMethod.POST,
              {
                flowId: flowId,
                conversationUid: conversationID,
                data: {
                  source: "knowledgeBase"
                },
              }
            );
            console.log('workflow response', workflowResult.data)
            const tempConv = get(workflowResult, 'data.data.conversation', [])
            console.log('conversation', tempConv)
            if (tempConv.length != 0) {
              converstionHistory.push(tempConv)
            }
            const callAgain = get(workflowResult, 'data.data.callAgain', false)
            const actionType = get(workflowResult, 'data.data.actionType', false)

            console.log('callagain', callAgain)
            if (!callAgain || actionType == "COLLECTINPUT" || actionType == "WORKFLOWEND") {
              break;
            }
          }
          // })();



          console.log('converstionHistory', converstionHistory)

          dispatch(setknowledgeHistory(converstionHistory))
        }

        data = get(interactionResult, 'data.data', []);
      }
      else {
        data = [];
      }
      // if (type == typeOfAccrodin.knowlegde.value) {

      // }

      dispatch(setInteractionData(data, false));
      console.log('data after', data)
      if (type == typeOfAccrodin.knowlegde.value) {
        const actionTypea = (flowId != "") ? "auto_resolution" : "choose_item"
        return { response: data, actionType: actionTypea };
      }
      else {
        return { response: data, actionType: "auto_resolution" }
      }

    } else {
      console.log("error response", interactionResult);
      dispatch(setInteractionError([]));
      return false;
    }
    return { response: [], actionType: "auto_resolution" }
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
      dispatch(enableLoaderEditInteraction(false));
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

export function addInteractionAction(obj, fileAttachments) {
  return async (dispatch) => {
    // const validation = await validateFormData(obj, dispatch);
    // if (!validation) return null;

    dispatch(enableLoaderAddInteractionAdd(true));
    // if (fileAttachments.length != 0) {
    //   const uploadNW = await serverCall(
    //     endPoints.UPLOAD_ATTACHMENT,
    //     requestMethod.POST,
    //     params
    //   );
    //   let Ids = [];
    //   if (uploadNW?.success && uploadNW?.data) {
    //     const uploadIds = uploadNW?.data?.data;
    //     console.log("point follow", uploadIds);
    //     if (get(uploadIds, "length", false)) {
    //       Ids = uploadIds.map((id) => id.entityId);
    //     }
    //   }
    // }
    //if attachment having data
    // if (Ids.length != 0) {
    //   obj = { ...obj, ...{ attachment: [Ids] } }
    // }

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

      return {
        status: true,
        response: {
          intxnNo: result?.data?.data?.intxnNo,
          message: result?.data?.message,
        },
      };
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

export function getWorkFlowForInteractionID(interactionId, navigation = null) {
  return async (dispatch) => {
    let url =
      endPoints.INTERACTION_GET_WORKFLOW + interactionId + "?getFollowUp=false";
    let result = await serverCall(url, requestMethod.GET, {}, navigation);
    if (result.success) {
      dispatch(setInteractionsWorkFlowDataInStore(result.data.data));
    } else {
      dispatch(setInteractionsWorkFlowErrorDataInStore(result));
    }
  };
}

export function getFollowupForInteractionID(interactionId, navigation = null) {
  return async (dispatch) => {
    let url =
      endPoints.INTERACTION_GET_WORKFLOW + interactionId + "?getFollowUp=true";
    let result = await serverCall(url, requestMethod.GET, {}, navigation);
    if (result.success) {
      dispatch(setInteractionsFollowupDataInStore(result.data.data));
    } else {
      dispatch(setInteractionsFollowupErrorDataInStore(result));
    }
  };
}

export function getInteractionDetailsForID(interactionId, navigation = null) {
  return async (dispatch) => {
    let url = endPoints.INTERACTION_FETCH + "?page=0&limit=1";
    let params = {
      searchParams: {
        interactionId,
      },
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    if (result.success) {
      dispatch(setInteractionsDetailsDataInStore(result.data.data));
    } else {
      dispatch(setInteractionsDetailsErrorDataInStore(result));
    }
  };
}

export function createFollowupForInteractionID(
  interactionId,
  param,
  navigation = null
) {
  return async (dispatch) => {
    let url = endPoints.INSERTFOLLOWUP;
    let params = {
      interactionNumber: interactionId,
      remarks: param.formRemarks,
      priorityCode: param.formPriority.code,
      source: param.formSource.code,
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    console.log("$$$-createFollowupForInteractionID-result", result);

    if (result.success) {
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message,
      });
      dispatch(setFollowupDataInStore(result.data.data));
      return true
    } else {
      Toast.show({
        type: "bctError",
        text1: result.message,
      });
      dispatch(setFollowupErrorDataInStore(result));
      return false
    }
  };
}

export function assignInteractionToSelf(
  interactionId,
  type,
  navigation = null
) {
  return async (dispatch) => {
    let url = endPoints.INTERACTION_ASSIGN_SELF + interactionId;
    let params = {
      type,
    };
    let result = await serverCall(url, requestMethod.PUT, params, navigation);
    if (result.success) {
      dispatch(setAssignInteractionToSelfDataInStore(result.data.data));
    } else {
      dispatch(setAssignInteractionToSelfErrorDataInStore(result));
    }
  };
}
