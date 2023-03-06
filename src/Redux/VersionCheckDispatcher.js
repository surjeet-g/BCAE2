import {
  initVersionCheckData,
  setVersionCheckData,
  setVersionCheckError,
} from "./VersionCheckAction";
import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { saveDataToDB } from "../Storage/token";
import { storageKeys } from "../Utilities/Constants/Constant";
import get from "lodash.get";
const EMPTY_DATA = [];
const DATA = [];

export const getVersionCheckData = (navigation) => {
  return async (dispatch) => {
    await dispatch(initVersionCheckData());
    let params = {};

    let result = await serverCall(
      endPoints.VERSIONCHECK,
      requestMethod.POST,
      params,
      navigation
    );

    if (result.success) {
      //to store version code
      await saveDataToDB(storageKeys.VERSION_CODE, get(result, "data", "2.0"));

      return await dispatch(setVersionCheckData(DATA));
    } else {
      return await dispatch(setVersionCheckError(DATA));
    }
  };
};
