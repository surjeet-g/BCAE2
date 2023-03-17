import get from "lodash.get";
import { INPUT_TYPE } from "../Utilities/Constants/Constant";
import {
  INTERACTION_ADD_LOADER_ENABLE,
  INTERACTION_DATA,
  INTERACTION_EDIT_LOADER_ENABLE,
  INTERACTION_ERROR,
  INTERACTION_FORM_ERROR,
  INTERACTION_GET_WORKFLOW_FAILURE,
  INTERACTION_GET_WORKFLOW_SUCCESS,
  INTERACTION_INIT,
  INTERACTION_RESET,
  INTERACTION_SET_FORM,
  INTERACTION_GET_DETAILS_FAILURE,
  INTERACTION_GET_DETAILS_SUCCESS,
} from "./InteractionAction";

const InteractionInitialState = {
  initInteraction: false,
  loaderAdd: false,
  loaderEdit: false,
  interactionError: false,
  InteractionData: {},
  InteractionWorkFlowData: {},
  interactionWorkFlowErrorData: {},
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
      value: { code: "", description: "" },
      type: INPUT_TYPE.DROPDOWN,
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
        ...state,
        InteractionWorkFlowData: action.data,
        interactionWorkFlowErrorData: {},
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
    default:
      return state;
  }
};
export default InteractionReducer;
