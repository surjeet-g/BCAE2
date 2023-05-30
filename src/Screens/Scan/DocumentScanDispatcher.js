import { initScanData, setScanData, setScanError } from "./DocumentScanAction";
import { storageKeys } from "../Utilities/Constants/Constant";
import { getDataFromDB, saveDataToDB } from "../Storage/token";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import get from "lodash.get";

export function getScanData(file) {
  return async (dispatch) => {
    dispatch(initScanData());
    let params = {
      file: file,
    };
    //scan api call
    let result = await serverCall(
      endPoints.DOCUMENT_SCAN,
      requestMethod.POST,
      params
    );

    if (result.success) {
      dispatch(setScanData([]));
    } else {
      dispatch(setScanError(result));
    }
  };
}
