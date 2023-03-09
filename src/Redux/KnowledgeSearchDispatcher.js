import {
  initKnowledgeSearchData,
  setKnowledgeSearchData,
  setKnowledgeSearchError,
} from "./KnowledgeSearchAction";
import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { saveDataToDB } from "../Storage/token";
import { storageKeys } from "../Utilities/Constants/Constant";
import get from "lodash.get";
const EMPTY_DATA = [];
const DATA = [];

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
      return await dispatch(setKnowledgeSearchData(DATA));
    } else {
      return await dispatch(setKnowledgeSearchError(DATA));
    }
  };
};
