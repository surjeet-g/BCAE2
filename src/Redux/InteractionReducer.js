import get from "lodash.get";
import { INPUT_TYPE } from "../Utilities/Constants/Constant";
import {
  CREATE_FOLLOWUP,
  CREATE_FOLLOWUP_FAILURE, INTERACTION_ADD_LOADER_ENABLE, INTERACTION_ASSIGN_SELF,
  INTERACTION_ASSIGN_SELF_FAILURE, INTERACTION_DATA,
  INTERACTION_EDIT_LOADER_ENABLE,
  INTERACTION_ERROR,
  INTERACTION_FORM_ERROR, INTERACTION_GET_DETAILS_FAILURE,
  INTERACTION_GET_DETAILS_SUCCESS, INTERACTION_GET_FOLLOWUP_FAILURE,
  INTERACTION_GET_FOLLOWUP_SUCCESS, INTERACTION_GET_WORKFLOW_FAILURE,
  INTERACTION_GET_WORKFLOW_SUCCESS, INTERACTION_INIT, INTERACTION_KNEWLEGE_HISTORY, INTERACTION_KNEWLEGE_HISTORY_REMOVE_USER_INPUTS, INTERACTION_KNEWLEGE_HISTORY_RESET, INTERACTION_RESET,
  INTERACTION_SET_FORM
} from "./InteractionAction";

const InteractionInitialState = {
  initInteraction: false,
  loaderAdd: false,
  loaderEdit: false,
  interactionError: false,
  InteractionData: {},
  InteractionWorkFlowData: [],
  interactionWorkFlowErrorData: {},
  InteractionFollowupData: [],
  interactionFollowupErrorData: {},
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
      required: false,
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
    case INTERACTION_ASSIGN_SELF_FAILURE:
      return {
        ...state,
        // todo here logic
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
      if (tempknowledgeHistory.length != 0) {
        newHistory = tempknowledgeHistory.filter(item => !item?.actionType.includes("COLLECTINPUT"))
      }
      return {
        ...state,
        knowledgeHistory: newHistory
      };
    case INTERACTION_ASSIGN_SELF:
      return {
        ...state,
        // todo here logic
      };
    default:
      return state;
  }
};
export default InteractionReducer;
