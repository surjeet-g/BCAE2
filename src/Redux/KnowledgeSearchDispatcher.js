import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  initKnowledgeSearchData,
  setKnowledgeSearchData,
  setKnowledgeSearchError
} from "./KnowledgeSearchAction";

export const getKnowledgeSearchData = (searchQuery, service) => {
  return async (dispatch) => {
    await dispatch(initKnowledgeSearchData());
    let params = {};

    let result = await serverCall(
      endPoints.KNOWLEDGE_SEARCH + "?q=" + encodeURI(searchQuery) + "&st=" + "undefined",
      requestMethod.GET,
      params
    );

    if (result.success) {
      console.log('knowledge search result..', endPoints.KNOWLEDGE_SEARCH + "?q=" + searchQuery, result?.data?.data)
      dispatch(setKnowledgeSearchData(result?.data?.data));
      return true;
    } else {
      dispatch(setKnowledgeSearchError(result));
      return false;
    }
  };
};
