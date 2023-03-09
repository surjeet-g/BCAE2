import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  initKnowledgeSearchData,
  setKnowledgeSearchData,
  setKnowledgeSearchError
} from "./KnowledgeSearchAction";

export const getKnowledgeSearchData = (searchQuery, navigation) => {
  return async (dispatch) => {
    await dispatch(initKnowledgeSearchData());
    let params = {};

    let result = await serverCall(
      endPoints.KNOWLEDGE_SEARCH + "?q=" + searchQuery,
      requestMethod.GET,
      params,
      navigation
    );

    if (result.success) {
      return await dispatch(setKnowledgeSearchData(result?.data?.data));
    } else {
      return await dispatch(setKnowledgeSearchError(result));
    }
  };
};
