export const KNOWLEDGE_SEARCH_INIT = "KNOWLEDGE_SEARCH_INIT";
export const KNOWLEDGE_SEARCH_DATA = "KNOWLEDGE_SEARCH_DATA";
export const KNOWLEDGE_SEARCH_ERROR = "KNOWLEDGE_SEARCH_ERROR";
export const RESET_KNOW_SEARCH = "RESET_KNOW_SEARCH"
export const INTERACTION_KNEWLEGE_HISTORY = "INTERACTION_KNEWLEGE_HISTORY"

export const initKnowledgeSearchData = () => {
  return { type: KNOWLEDGE_SEARCH_INIT };
};

export const setInteractionHistory = (data) => {
  return { type: INTERACTION_KNEWLEGE_HISTORY, data };
};

export const setKnowledgeSearchData = (data) => {
  return { type: KNOWLEDGE_SEARCH_DATA, data };
};

export const setKnowledgeSearchError = (data) => {
  return { type: KNOWLEDGE_SEARCH_ERROR, data };
};


export function resetKnowSearch() {
  return async (dispatch) => {
    dispatch({ type: RESET_KNOW_SEARCH });
  };
}

