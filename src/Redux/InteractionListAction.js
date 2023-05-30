export const INTERACTION_LIST_INIT = "INTERACTION_LIST_INIT";
export const INTERACTION_LIST_DATA = "INTERACTION_LIST_DATA";
export const INTERACTION_LIST_ERROR = "INTERACTION_LIST_ERROR";

export function initInteractionListData() {
  return { type: INTERACTION_LIST_INIT };
}

export function setInteractionListData(data) {
  return { type: INTERACTION_LIST_DATA, data };
}

export function setInteractionListError(data) {
  return { type: INTERACTION_LIST_ERROR, data };
}
