import get from "lodash.get";
import {
  INTERACTION_ADD_LOADER_ENABLE,
  INTERACTION_DATA,
  INTERACTION_EDIT_LOADER_ENABLE,
  INTERACTION_ERROR,
  INTERACTION_FORM_ERROR,
  INTERACTION_INIT,
  INTERACTION_RESET,
  INTERACTION_SET_FORM
} from "./InteractionAction";

const InteractionInitialState = {
  initInteraction: false,
  loaderAdd: false,
  loaderEdit: false,
  interactionError: false,
  InteractionData: {},
  formData: {
    customerId: {
      field: "customerId",
      required: true,
      error: "",
      value: ""
    },
    statement: {
      field: "statement",
      required: true,
      error: "",
      value: ""
    },
    interactionType: {
      field: "interactionType",
      required: true,
      error: "",
      value: ""
    },
    channel: {
      field: "channel",
      required: true,
      error: "",
      value: ""
    },
    problemCode: {
      field: "problemCode",
      required: true,
      error: "",
      value: ""
    },
    priorityCode: {
      field: "priorityCode",
      required: true,
      error: "",
      value: ""
    },
    contactPerference: {
      field: "contactPerference",
      required: true,
      error: "",
      value: ""
    },
    remarks: {
      field: "remarks",
      required: true,
      error: "",
      value: ""
    },
    attachment: {
      field: "attachment",
      required: true,
      error: "",
      value: ""
    },
  },
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
      state = InteractionInitialState;
      return state;
    case INTERACTION_SET_FORM:
      const {
        clearError = true,
        value,
        field,
        errMessage = "",
        isRequired = false,
      } = action.data;
      console.log('>>INTERACTION_SET_FORM', action.data)

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
    default:
      return state;
  }
};
export default InteractionReducer;
