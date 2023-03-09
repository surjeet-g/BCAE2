import {
  KNOWLEDGE_SEARCH_INIT,
  KNOWLEDGE_SEARCH_DATA,
  KNOWLEDGE_SEARCH_ERROR,
} from "./KnowledgeSearchAction";

const knowledgeSearchInitialState = {
  initKnowledgeSearch: false,
  isKnowledgeSearchError: false,
  knowledgeSearchData: {},
};

const KnowledgeSearchReducer = (
  state = knowledgeSearchInitialState,
  action
) => {
  switch (action.type) {
    case KNOWLEDGE_SEARCH_INIT:
      return {
        ...state,
        initKnowledgeSearch: true,
        isKnowledgeSearchError: false,
        knowledgeSearchData: {},
      };

    case KNOWLEDGE_SEARCH_ERROR:
      return {
        ...state,
        initKnowledgeSearch: true,
        isKnowledgeSearchError: true,
        knowledgeSearchData: action.data,
      };

    case KNOWLEDGE_SEARCH_DATA:
      return {
        ...state,
        initKnowledgeSearch: false,
        isKnowledgeSearchError: false,
        knowledgeSearchData: action.data,
      };
    default:
      return state;
  }
};
export default KnowledgeSearchReducer;
