import {
  enableLoaderAddInteractionAdd,
  enableLoaderEditInteraction,
  initInteraction, intractionKnowlegeHistoryRemoveUserInputTypes, setAssignInteractionToSelfDataInStore,
  setAssignInteractionToSelfErrorDataInStore, setFollowupDataInStore,
  setFollowupErrorDataInStore, setgetAppoinmentsData, setInteractionData,
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
  getCustomerID
} from "../Utilities/UserManagement/userInfo";

export function fetchInteractionAction(type = "", params = {},
  isRemovedHistory = false) {
  return async (dispatch) => {
    const debg = true;
    try {
      if (type != typeOfAccrodin.knowlegde.value && type != typeOfAccrodin.workflow.value) {
        dispatch(initInteraction());
      }
      // const customerUUID = await getCustomerUUID();
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
        console.log('payload for workflow', params)
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
        console.log('param knowledge', params)
        interactionResult = await serverCall(
          `${endPoints.KNOWLEDGE_SEARCH_STATEMENT}`,
          requestMethod.POST,
          params
        );
        console.log('dispatcher result', interactionResult)

      } else {
        dispatch(setInteractionError([]));
        return false;
      }
      if (debg) {
        console.log('API Requrest', interactionResult, "API STATUS", interactionResult?.success, "API DATA", interactionResult?.data)
      }
      let noService;
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
          console.log('workflow success search result', interactionResult)
          flowId = get(interactionResult, 'data.data.flwId', '')
          console.log('interact->dispater->knwolege:flowId', flowId)
          console.log('interact->dispater->knwolege result', interactionResult)
          //for showing history in pop 
          let converstionHistory = []
          noService = get(interactionResult, 'data.data.resolutionAction.noService', false)
          if (flowId != "") {
            const conversationID = get(interactionResult, 'data.data.conversationUid', '')
            const mockArray = Array.from({ length: 50 }, (_, x) => x + 1)
            // console.log('mockArray', mockArray)
            // (async function () {
            const bodyworkflow = {
              flowId: flowId,
              conversationUid: conversationID,
              data: {
                source: "knowledgeBase"
              },
            }
            for await (const num of mockArray) {
              console.log('hititng inside',)
              const workflowResult = await serverCall(
                `${endPoints.INTERACTION_WORKFLOW}`,
                requestMethod.POST,
                bodyworkflow
              );
              if (debg) {
                console.log('WORFLOW', "Body", bodyworkflow, "API Resp", workflowResult.data, "API ", workflowResult)
              }
              const tempConv = get(workflowResult, 'data.data.conversation', [])
              console.log('conversation', tempConv)
              if (tempConv.length != 0) {
                converstionHistory.push(tempConv)
              }
              const callAgain = get(workflowResult, 'data.data.callAgain', false)
              const actionType = get(workflowResult, 'data.data.actionType', false)
              const description = get(workflowResult, 'data.data.description', false)
              console.log('callagain', callAgain)
              if (!callAgain || actionType == "COLLECTINPUT" || actionType == "WORKFLOWEND" || (actionType == "SENDMESSAGE" && description == "PRODUCT PURCHASE")) {
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
          console.log('flow Id ', flowId)

          const actionTypea = noService ? "noservive" : (flowId != "") ? "auto_resolution" : "choose_item"
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
    } catch (error) {

      console.log('error', error)
      return null
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
    console.log("add interaction payload", obj)
    let result = await serverCall(
      endPoints.INTERACTION_ADD,
      requestMethod.POST,
      obj
    );
    console.log("add interaction payload", result)
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
          intxnId: result?.data?.data?.intxnId,
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
    console.log("interactionL ID", interactionId)
    let url = endPoints.INTERACTION_FETCH + "?page=0&limit=1";
    let params = {
      searchParams: {
        interactionId,
      },
    };
    let result = await serverCall(url, requestMethod.POST, params, navigation);
    console.log("interactionL resul", result)
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

export const getAppoinmentsData = (payload, type = "templete") => {
  return async (dispatch) => {
    // const appPayload = {

    // }
    let result;
    if (type == "getAppoinment") {
      result = await serverCall(endPoints.INTERACTION_AVALABLE_APPOINMENT, requestMethod.POST, payload)

    }
    else {
      result = await serverCall(endPoints.INTERACTION_APPOINMENT_TEMP, requestMethod.POST, payload)
    }


    console.log("templete API ", result)
    if (type !== "getAppoinment") {
      result = {
        "success": true,
        "status": 200,
        "message": "Success",
        "data": {
          "mappedTemplate": {
            "templateId": 82,
            "templateCategory": "TC_APPOINT",
            "templateName": "Business Visit - Technicians",
            "userGroup": "UG_BUSINESS",
            "templateNo": "TEMP00000080",
            "templateMap": [
              {
                "templateMapId": 5241,
                "templateId": 82,
                "templateMapName": "Temp clone",
                "mapCategory": "INTERACTION",
                "serviceCategory": "PF_BANK",
                "serviceType": "ST_CREDITCARD",
                "customerClass": null,
                "tranType": "INTEREST",
                "tranPriority": "PRTYMED"
              }
            ],
            "appointmentHdr": [
              {
                "appointId": 79,
                "appointName": "Business Visit",
                "appointType": "CUST_VISIT",
                "userGroup": "UG_BUSINESS",
                "notifyId": 1,
                "rosterId": 1,
                "appointmentDet": [
                  {
                    "appointDtlId": 4519,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-09",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "14:00:00",
                    "appointEndTime": "15:00:00"
                  },
                  {
                    "appointDtlId": 4520,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-09",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "15:00:00",
                    "appointEndTime": "16:00:00"
                  },
                  {
                    "appointDtlId": 4617,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "13:00:00",
                    "appointEndTime": "14:00:00"
                  },
                  {
                    "appointDtlId": 4618,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:30:00",
                    "appointEndTime": "15:45:00"
                  },
                  {
                    "appointDtlId": 3927,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "17:00:00",
                    "appointEndTime": "17:10:00"
                  },
                  {
                    "appointDtlId": 4619,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-16",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "07:00:00",
                    "appointEndTime": "08:00:00"
                  },
                  {
                    "appointDtlId": 4620,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-16",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "08:00:00",
                    "appointEndTime": "09:00:00"
                  },
                  {
                    "appointDtlId": 4621,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-16",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "09:00:00",
                    "appointEndTime": "10:00:00"
                  },
                  {
                    "appointDtlId": 4622,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-16",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "10:00:00",
                    "appointEndTime": "11:00:00"
                  },
                  {
                    "appointDtlId": 2886,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:10:00",
                    "appointEndTime": "12:20:00"
                  },
                  {
                    "appointDtlId": 2887,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:20:00",
                    "appointEndTime": "12:30:00"
                  },
                  {
                    "appointDtlId": 2888,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:30:00",
                    "appointEndTime": "12:40:00"
                  },
                  {
                    "appointDtlId": 2889,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:40:00",
                    "appointEndTime": "12:50:00"
                  },
                  {
                    "appointDtlId": 2905,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:00:00",
                    "appointEndTime": "12:10:00"
                  },
                  {
                    "appointDtlId": 2906,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:10:00",
                    "appointEndTime": "12:20:00"
                  },
                  {
                    "appointDtlId": 2907,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:20:00",
                    "appointEndTime": "12:30:00"
                  },
                  {
                    "appointDtlId": 2908,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:30:00",
                    "appointEndTime": "12:40:00"
                  },
                  {
                    "appointDtlId": 2909,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:40:00",
                    "appointEndTime": "12:50:00"
                  },
                  {
                    "appointDtlId": 2910,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:50:00",
                    "appointEndTime": "13:00:00"
                  },
                  {
                    "appointDtlId": 2911,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:00:00",
                    "appointEndTime": "13:10:00"
                  },
                  {
                    "appointDtlId": 2912,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:10:00",
                    "appointEndTime": "13:20:00"
                  },
                  {
                    "appointDtlId": 2913,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:20:00",
                    "appointEndTime": "13:30:00"
                  },
                  {
                    "appointDtlId": 2914,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:30:00",
                    "appointEndTime": "13:40:00"
                  },
                  {
                    "appointDtlId": 2915,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:40:00",
                    "appointEndTime": "13:50:00"
                  },
                  {
                    "appointDtlId": 2916,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:50:00",
                    "appointEndTime": "14:00:00"
                  },
                  {
                    "appointDtlId": 2917,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:00:00",
                    "appointEndTime": "15:15:00"
                  },
                  {
                    "appointDtlId": 2918,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:15:00",
                    "appointEndTime": "15:30:00"
                  },
                  {
                    "appointDtlId": 2919,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:30:00",
                    "appointEndTime": "15:45:00"
                  },
                  {
                    "appointDtlId": 2920,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:45:00",
                    "appointEndTime": "16:00:00"
                  },
                  {
                    "appointDtlId": 2921,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:00:00",
                    "appointEndTime": "16:15:00"
                  },
                  {
                    "appointDtlId": 2922,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:15:00",
                    "appointEndTime": "16:30:00"
                  },
                  {
                    "appointDtlId": 2923,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:30:00",
                    "appointEndTime": "16:45:00"
                  },
                  {
                    "appointDtlId": 2924,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:45:00",
                    "appointEndTime": "17:00:00"
                  },
                  {
                    "appointDtlId": 2900,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:45:00",
                    "appointEndTime": "16:00:00"
                  },
                  {
                    "appointDtlId": 2901,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:00:00",
                    "appointEndTime": "16:15:00"
                  },
                  {
                    "appointDtlId": 2902,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:15:00",
                    "appointEndTime": "16:30:00"
                  },
                  {
                    "appointDtlId": 2903,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:30:00",
                    "appointEndTime": "16:45:00"
                  },
                  {
                    "appointDtlId": 2904,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "16:45:00",
                    "appointEndTime": "17:00:00"
                  },
                  {
                    "appointDtlId": 2885,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:00:00",
                    "appointEndTime": "12:10:00"
                  },
                  {
                    "appointDtlId": 2890,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "12:50:00",
                    "appointEndTime": "13:00:00"
                  },
                  {
                    "appointDtlId": 2891,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:00:00",
                    "appointEndTime": "13:10:00"
                  },
                  {
                    "appointDtlId": 2892,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:10:00",
                    "appointEndTime": "13:20:00"
                  },
                  {
                    "appointDtlId": 2893,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:20:00",
                    "appointEndTime": "13:30:00"
                  },
                  {
                    "appointDtlId": 2894,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:30:00",
                    "appointEndTime": "13:40:00"
                  },
                  {
                    "appointDtlId": 2895,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:40:00",
                    "appointEndTime": "13:50:00"
                  },
                  {
                    "appointDtlId": 2896,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "13:50:00",
                    "appointEndTime": "14:00:00"
                  },
                  {
                    "appointDtlId": 2897,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:00:00",
                    "appointEndTime": "15:15:00"
                  },
                  {
                    "appointDtlId": 2898,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:15:00",
                    "appointEndTime": "15:30:00"
                  },
                  {
                    "appointDtlId": 2965,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-04",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "07:00:00",
                    "appointEndTime": "08:00:00"
                  },
                  {
                    "appointDtlId": 2966,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-04",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "08:00:00",
                    "appointEndTime": "09:00:00"
                  },
                  {
                    "appointDtlId": 2967,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-04",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "09:00:00",
                    "appointEndTime": "10:00:00"
                  },
                  {
                    "appointDtlId": 2968,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-04",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "10:00:00",
                    "appointEndTime": "11:00:00"
                  },
                  {
                    "appointDtlId": 2899,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-04-29",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 4,
                    "appointStartTime": "15:30:00",
                    "appointEndTime": "15:45:00"
                  },
                  {
                    "appointDtlId": 4511,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 7,
                    "appointDate": "2023-05-09",
                    "appointInterval": "15",
                    "appointAgentsAvailability": 3,
                    "appointStartTime": "13:00:00",
                    "appointEndTime": "14:00:00"
                  },
                  {
                    "appointDtlId": 3937,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "18:40:00",
                    "appointEndTime": "18:50:00"
                  },
                  {
                    "appointDtlId": 3938,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "18:50:00",
                    "appointEndTime": "19:00:00"
                  },
                  {
                    "appointDtlId": 3939,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "19:00:00",
                    "appointEndTime": "19:10:00"
                  },
                  {
                    "appointDtlId": 3940,
                    "appointMode": "CUST_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "19:10:00",
                    "appointEndTime": "19:20:00"
                  }
                ]
              },
              {
                "appointId": 111,
                "appointName": "Business Visit",
                "appointType": "BUS_VISIT",
                "userGroup": "UG_BUSINESS",
                "notifyId": 1,
                "rosterId": 4,
                "appointmentDet": [
                  {
                    "appointDtlId": 3943,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "19:40:00",
                    "appointEndTime": "19:50:00"
                  },
                  {
                    "appointDtlId": 3944,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "19:50:00",
                    "appointEndTime": "20:00:00"
                  },
                  {
                    "appointDtlId": 3942,
                    "appointMode": "BUS_VISIT",
                    "calenderId": 1,
                    "shiftId": 1,
                    "appointDate": "2023-05-17",
                    "appointInterval": "10",
                    "appointAgentsAvailability": 2,
                    "appointStartTime": "19:30:00",
                    "appointEndTime": "19:40:00"
                  }
                ]
              }
            ]
          }
        }
      }
    }
    if (result.success) {
      const templeteId = get(result, 'data.mappedTemplate.templateId', '');
      console.log("templete getAppoinmentsData disp templete id", result?.data, templeteId)

      dispatch(setgetAppoinmentsData(result?.data));
      return (templeteId == "") ? false : templeteId
    } else {

      console.log("error getAppoinments", result)
      return false;

    }
  };
}