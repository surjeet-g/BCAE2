import {
  INTERACTION_LIST_INIT,
  INTERACTION_LIST_DATA,
  INTERACTION_LIST_ERROR,
} from "./InteractionListAction";

const interactionListInitialState = {
  initInteractionList: false,
  isInteractionListError: false,
  interactionListData: {},
};

const InteractionListReducer = (
  state = interactionListInitialState,
  action
) => {
  switch (action.type) {
    case INTERACTION_LIST_INIT:
      return {
        ...state,
        initInteractionList: true,
        isInteractionListError: false,
        interactionListData: {},
      };

    case INTERACTION_LIST_ERROR:
      return {
        ...state,
        initInteractionList: false,
        isInteractionListError: true,
        interactionListData: action.data,
      };

    case INTERACTION_LIST_DATA:
      return {
        ...state,
        initInteractionList: false,
        isInteractionListError: false,
        interactionListData: action.data,
      };
    default:
      return state;
  }
};
export default InteractionListReducer;
