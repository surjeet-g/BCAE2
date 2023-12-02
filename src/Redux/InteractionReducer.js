import get from "lodash.get";
import { INPUT_TYPE } from "../Utilities/Constants/Constant";

import {
  ATTACHED_ENTITY_DATA,
  ATTACHED_ENTITY_DATA_ERROR,
  CANCEL_REASONS_DATA,
  CANCEL_REASONS_DATA_FAILURE,
  CREATE_FOLLOWUP,
  CREATE_FOLLOWUP_FAILURE, GETAPPOINMENTS_DATA, GETAPPOINMENTS_ERROR, INTERACTION_ADD_LOADER_ENABLE, INTERACTION_ASSIGN_SELF,
  INTERACTION_ASSIGN_SELF_FAILURE, INTERACTION_DATA,
  INTERACTION_EDIT_LOADER_ENABLE,
  INTERACTION_ERROR,
  INTERACTION_FORM_ERROR, INTERACTION_GET_DETAILS_FAILURE,
  INTERACTION_GET_DETAILS_SUCCESS,
  INTERACTION_GET_FOLLOWUP_FAILURE,
  INTERACTION_GET_FOLLOWUP_SUCCESS, INTERACTION_GET_WORKFLOW_FAILURE,
  INTERACTION_GET_WORKFLOW_SUCCESS, INTERACTION_INIT, INTERACTION_KNEWLEGE_HISTORY, INTERACTION_KNEWLEGE_HISTORY_REMOVE_USER_INPUTS, INTERACTION_KNEWLEGE_HISTORY_RESET, INTERACTION_RESET,
  INTERACTION_SEARCH_DETAILS_FAILURE,
  INTERACTION_SEARCH_DETAILS_SUCCESS,
  INTERACTION_SET_FORM,
  INTERACTION_USERS_BY_ROLE,
  INTERACTION_USERS_BY_ROLE_FAILURE,
  INTXN_ATTACHMENT_DATA,
  INTXN_ATTACHMENT_ERROR_DATA,
  INTXN_DOWNLOAD_ATTACHMENT_DATA,
  INTXN_DOWNLOAD_ATTACHMENT_ERROR_DATA,
  MEETING_HALLS_DATA,
  MEETING_HALLS_ERROR_DATA,
  MEETING_HALL_EVENTS_DATA,
  MEETING_HALL_EVENTS_ERROR_DATA,
  SOURCE_DATA,
  SOURCE_DATA_FAILURE,
  STATUS_DATA,
  STATUS_DATA_FAILURE
} from "./InteractionAction";

const InteractionInitialState = {
  isgetAppoinmentsError: false, getAppoinmentsData: {}, getAppoinmentsLoader: false,
  initInteraction: false,
  loaderAdd: false,
  userSelectedProfileDetails: {},
  loaderEdit: false,
  interactionError: false,
  InteractionData: {},
  InteractionWorkFlowData: [],
  interactionWorkFlowErrorData: {},
  InteractionFollowupData: [],
  interactionSearchData: [],
  interactionUsersByRoleData: [],
  interactionUsersByRoleErrorData: [],
  intxnAttachmentData: [],
  intxnAttachmentErrorData: [],
  intxnDownloadAttachmentData: {},
  intxnDownloadAttachmentErrorData: {},
  interactionSearchErrorData: {},
  interactionFollowupErrorData: {},
  interactionCancelReasonsData: [],
  interactionCancelReasonsErrorData: {},
  knowledgeHistory: [],
  formData: {
    statement: {
      field: "statement",
      required: false,
      error: "",
      value: "",
      type: INPUT_TYPE.INPUTBOX,
    },
    statementId: {
      field: "statementId",
      required: false,
      error: "",
      value: "",
      type: INPUT_TYPE.INPUTBOX,
    },
    interactionType: {
      field: "interactionType",
      required: true,
      error: "",
      value: { code: "", description: "" },
      type: INPUT_TYPE.DROPDOWN,
    },
    interactionCategory: {
      field: "interactionCategory",
      required: true,
      error: "",
      value: { code: "", description: "" },
      type: INPUT_TYPE.DROPDOWN,
    },
    serviceType: {
      field: "serviceType",
      required: true,
      error: "",
      value: { code: "", description: "" },
      type: INPUT_TYPE.DROPDOWN,
    },
    channel: {
      field: "channel",
      required: true,
      error: "",
      value: "MOBILE_APP",
      type: INPUT_TYPE.INPUTBOX,
    },
    serviceCategory: {
      field: "serviceCategory",
      required: true,
      error: "",
      value: { code: "", description: "" },
      type: INPUT_TYPE.DROPDOWN,
    },
    problemCause: {
      field: "problemCause",
      required: true,
      error: "",
      value: { code: "", description: "" },
      type: INPUT_TYPE.DROPDOWN,
    },
    priorityCode: {
      field: "priorityCode",
      required: true,
      error: "",
      value: { code: "", description: "" },
      type: INPUT_TYPE.DROPDOWN,
    },
    contactPerference: {
      field: "contactPerference",
      required: true,
      error: "",
      value: [],
      type: INPUT_TYPE.ARRAY,
    },
    remarks: {
      field: "remarks",
      required: true,
      error: "",
      value: "",
      type: INPUT_TYPE.INPUTBOX,
    },
    attachment: {
      field: "attachment",
      required: false,
      error: "",
      value: "",
      type: INPUT_TYPE.INPUTBOX,
    },
  },
  InteractionDetailsData: {},
  interactionDetailsErrorData: {},
  followupData: [],
  followupErrorData: {},
  interactionSelfAssignData: {},
  interactionSelfAssignErrorData: {},
  meetingHallsData: [],
  meetingHallsErrorData: {},
  meetingHallEventsData: [],
  meetingHallEventsErrorData: {},
  statusData: [],
  // rolesData: [],
  statusErrorData: {},
  sourceData: {},
  sourceErrorData: {},
  attachedEntityData: {},
  attachedEntityErrorData: {}
};

const InteractionReducer = (state = InteractionInitialState, action) => {
  switch (action.type) {
    case INTERACTION_INIT:
      return {
        ...state,
        initInteraction: true,
        interactionError: false,
        InteractionData: {},
      };
    case INTERACTION_DATA:
      if (action.isEdit) {
        return {
          ...state,
          initInteraction: false,
          interactionError: false,
          InteractionData: action.data,
          formData: {
            ...state.formData,
            customerId: {
              ...state.formData.customerId,
              value: get(action.data, "customerId", ""),
            },
            statement: {
              ...state.formData.statement,
              value: get(action.data, "statement", ""),
            },
            interactionType: {
              ...state.formData.interactionType,
              value: get(action.data, "interactionType", ""),
            },
            channel: {
              ...state.formData.channel,
              value: get(action.data, "channel", ""),
            },
            problemCode: {
              ...state.formData.problemCode,
              value: get(action.data, "problemCode", ""),
            },
            priorityCode: {
              ...state.formData.priorityCode,
              value: get(action.data, "priorityCode", ""),
            },
            contactPerference: {
              ...state.formData.contactPerference,
              value: get(action.data, "contactPerference", ""),
            },
            remarks: {
              ...state.formData.remarks,
              value: get(action.data, "remarks", ""),
            },
            attachment: {
              ...state.formData.attachment,
              value: get(action.data, "attachment", ""),
            },
          },
        };
      } else {
        console.log('interact->reducer->set inteaction data', action.data)
        return {
          ...state,
          initInteraction: false,
          interactionError: false,
          InteractionData: action.data,
        };
      }
    case INTERACTION_ERROR:
      return {
        ...state,
        initInteraction: false,
        interactionError: true,
        InteractionData: action.data,
      };
    case INTERACTION_RESET:
      return {
        ...state,
        formData: InteractionInitialState.formData,
        userSelectedProfileDetails: {},
        knowledgeHistory: []
      };


    case INTERACTION_SET_FORM:
      const {
        clearError = true,
        value,
        field,
        errMessage = "",
        isRequired = false,
      } = action.data;

      let tempFormData = state.formData;
      tempFormData[field].value = value;

      if (clearError) {
        tempFormData[field].error = "";
      }

      if (isRequired && value == "") {
        tempFormData[field].error = errMessage;
      }
      console.log("after press", tempFormData);
      return {
        ...state,
        formData: tempFormData,
      };
    case INTERACTION_ADD_LOADER_ENABLE:
      return {
        ...state,
        loaderAdd: action.data,
      };
    case INTERACTION_EDIT_LOADER_ENABLE:
      return {
        ...state,
        loaderEdit: action.data,
      };
    case INTERACTION_FORM_ERROR:
      let formDataTemp = state.formData;
      formDataTemp[data.field].error = data.errorMsg;
      return {
        ...state,
        formData: tempFormData,
      };
    case INTERACTION_GET_WORKFLOW_FAILURE:
      return {
        ...state,
        interactionWorkFlowErrorData: action.data,
      };



    case INTERACTION_GET_WORKFLOW_SUCCESS:
      return {
        // todo here logic
        ...state,
        InteractionWorkFlowData: action.data.rows,
        interactionWorkFlowErrorData: {},
      };

    case INTERACTION_GET_FOLLOWUP_FAILURE:
      return {
        ...state,
        interactionFollowupErrorData: action.data,
      };



    case STATUS_DATA:
      return {
        ...state,
        statusData: action.data.entities,

        // rolesData: action.data.entities[0].roles.map(item => {
        //   return { description: item.roleDesc, code: item.roles.roleId }
        // }),

        statusErrorData: {},
      };

    case STATUS_DATA_FAILURE:
      return {
        ...state,
        statusErrorData: action.data,
      };






    case SOURCE_DATA:
      return {
        ...state,
        sourceData: action.data,
      };

    case SOURCE_DATA_FAILURE:
      return {
        ...state,
        sourceErrorData: action.data,
      };



    case ATTACHED_ENTITY_DATA:
      return {
        ...state,
        attachedEntityData: action.data,
      };

    case ATTACHED_ENTITY_DATA_ERROR:
      return {
        ...state,
        attachedEntityErrorData: action.data,
      };



    case INTERACTION_GET_FOLLOWUP_SUCCESS:
      return {
        // todo here logic
        ...state,
        interactionFollowupData: action.data.rows,
        interactionFollowupErrorData: {},
      };

    case INTERACTION_GET_DETAILS_FAILURE:
      return {
        ...state,
        interactionDetailsErrorData: action.data,
      };
    case INTERACTION_GET_DETAILS_SUCCESS:
      return {
        ...state,
        InteractionDetailsData: action.data.rows[0],
        interactionDetailsErrorData: {},
      };






    case INTERACTION_USERS_BY_ROLE:
      return {
        // todo here logic
        ...state,
        interactionUsersByRoleData: action.data.data.map(item => {
          return { description: item.firstName, code: item.userId }
        }),
        // interactionUsersByRoleData: action.data,
        interactionUsersByRoleErrorData: {},
      };

    case INTERACTION_USERS_BY_ROLE_FAILURE:
      return {
        // todo here logic
        ...state,
        interactionUsersByRoleErrorData: action.data,
      };



    case INTERACTION_SEARCH_DETAILS_FAILURE:
      return {
        ...state,
        interactionSearchErrorData: action.data,
      };
    case INTERACTION_SEARCH_DETAILS_SUCCESS:
      return {
        ...state,
        interactionSearchData: action.data.rows,
        interactionSearchErrorData: {},
      };


    case INTXN_ATTACHMENT_DATA:
      return {
        ...state,
        intxnAttachmentData: action.data,
      };
    case INTXN_ATTACHMENT_ERROR_DATA:
      return {
        ...state,
        intxnAttachmentErrorData: action.data,
      };



    case INTXN_DOWNLOAD_ATTACHMENT_DATA:
      return {
        ...state,
        intxnDownloadAttachmentData: action.data,
      };
    case INTXN_DOWNLOAD_ATTACHMENT_ERROR_DATA:
      return {
        ...state,
        intxnDownloadAttachmentErrorData: action.data,
      };



    case CANCEL_REASONS_DATA:
      return {
        ...state,
        interactionCancelReasonsData: action.data,
        // .map(item => {
        //   return { description: item.description, code: item.code }
        // }),
        interactionCancelReasonsErrorData: {},
      };
    case CANCEL_REASONS_DATA_FAILURE:
      return {
        ...state,
        interactionCancelReasonsErrorData: action.data,
      };



    case CREATE_FOLLOWUP_FAILURE:
      return {
        // todo here logic
        ...state,
        followupErrorData: action.data,
      };
    case CREATE_FOLLOWUP:
      return {
        // todo here logic
        ...state,
        followupData: action.data,
        followupErrorData: {},
      };



    case INTERACTION_ASSIGN_SELF:
      return {
        ...state,
        interactionSelfAssignData: action.data,
        interactionSelfAssignErrorData: {}
      };

    case INTERACTION_ASSIGN_SELF_FAILURE:
      return {
        ...state,
        interactionSelfAssignData: {},
        interactionSelfAssignErrorData: action.data
      };



    case MEETING_HALLS_DATA:
      return {
        ...state,
        meetingHallsData: action.data,
      };

    case MEETING_HALLS_ERROR_DATA:
      return {
        ...state,
        meetingHallsErrorData: action.data
      };



    case MEETING_HALL_EVENTS_DATA:
      return {
        ...state,
        meetingHallEventsData: action.data,
      };

    case MEETING_HALL_EVENTS_ERROR_DATA:
      return {
        ...state,
        meetingHallEventsErrorData: action.data
      };





    case INTERACTION_KNEWLEGE_HISTORY:
      console.log('reducers INTERACTION_KNEWLEGE_HISTORY', action.data)
      return {
        ...state,
        knowledgeHistory: action.data
        // todo here logic
      };
    case INTERACTION_KNEWLEGE_HISTORY_RESET:
      console.log('reducers INTERACTION_KNEWLEGE_HISTORY_RESET', action.data)
      return {
        ...state,
        knowledgeHistory: []
        // todo here logic
      };
    case INTERACTION_KNEWLEGE_HISTORY_REMOVE_USER_INPUTS:

      let tempknowledgeHistory = state.knowledgeHistory
      let newHistory = []
      console.log('INTERACTION_KNEWLEGE_HISTORY_REMOVE_USER_INPUTS', tempknowledgeHistory)
      if (tempknowledgeHistory.length != 0) {
        newHistory = tempknowledgeHistory.filter(item => !item?.actionType.includes("COLLECTINPUT"))
      }
      console.log('interaction reducer INTERACTION_KNEWLEGE_HISTORY_REMOVE_USER_INPUTS', "existing", tempknowledgeHistory, "newHistory", newHistory)
      return {
        ...state,
        knowledgeHistory: newHistory
      };

    case GETAPPOINMENTS_ERROR:
      return {
        ...state,
        initgetAppoinments: false,
        getAppoinmentsLoader: false,
        isgetAppoinmentsError: true,
        getAppoinmentsData: action.data,
      }

    case GETAPPOINMENTS_DATA:
      return {
        ...state,
        initgetAppoinments: false,
        getAppoinmentsLoader: false,
        isgetAppoinmentsError: false,
        getAppoinmentsData: action.data,
      }
    default:
      return state;
  }
};
export default InteractionReducer;
