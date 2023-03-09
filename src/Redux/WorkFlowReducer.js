import {
  GET_WORKFLOW_LIST_DATA,
  GET_WORKFLOW_LIST_SUCCESS,
  GET_WORKFLOW_LIST_FAILURE,
  CREATE_WORKFLOW_SUCCESS,
  CREATE_WORKFLOW_FAILURE,
  UPDATE_WORKFLOW_SUCCESS,
  UPDATE_WORKFLOW_FAILURE,
  GET_WORKFLOW_SUCCESS,
  GET_WORKFLOW_FAILURE,
  DELETE_WORKFLOW_SUCCESS,
  DELETE_WORKFLOW_FAILURE,
} from "./WorkFlowActions";

const initialState = {
  showingLoadingIndicator: false,
  workflowListData: [],
  workflowError: false,
  workflowErrorData: {},
};

const WorkFlowReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKFLOW_LIST_DATA:
      return {
        ...state,
        showingLoadingIndicator: true,
        workflowError: false,
        workflowErrorData: {},
      };
    case GET_WORKFLOW_LIST_SUCCESS:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowListData: action.data,
        workflowError: false,
        workflowErrorData: {},
      };
    case GET_WORKFLOW_LIST_FAILURE:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowListData: [],
        workflowError: true,
        workflowErrorData: action.data,
      };
    case CREATE_WORKFLOW_SUCCESS:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: false,
        workflowErrorData: {},
      };
    case CREATE_WORKFLOW_FAILURE:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: true,
        workflowErrorData: action.data,
      };
    case UPDATE_WORKFLOW_SUCCESS:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: false,
        workflowErrorData: {},
      };
    case UPDATE_WORKFLOW_FAILURE:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: true,
        workflowErrorData: action.data,
      };
    case GET_WORKFLOW_SUCCESS:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: false,
        workflowErrorData: {},
      };
    case GET_WORKFLOW_FAILURE:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: true,
        workflowErrorData: action.data,
      };
    case DELETE_WORKFLOW_SUCCESS:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: false,
        workflowErrorData: {},
      };
    case DELETE_WORKFLOW_FAILURE:
      return {
        ...state,
        showingLoadingIndicator: false,
        workflowError: true,
        workflowErrorData: action.data,
      };
    default:
      return state;
  }
};
export default WorkFlowReducer;
