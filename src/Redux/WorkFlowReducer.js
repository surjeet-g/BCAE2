import {
  GET_WORKFLOW_LIST_DATA,
  GET_WORKFLOW_LIST_SUCCESS,
  GET_WORKFLOW_LIST_FAILURE,
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

    default:
      return state;
  }
};
export default WorkFlowReducer;
