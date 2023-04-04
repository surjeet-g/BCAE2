import Toast from "react-native-toast-message";
import { getDataFromDB, saveDataToDB } from "../../Storage/token";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import {
  setServiceProductsDataInStore,
  setServiceProductsErrorDataInStore,
} from "./CreateCustomerAction";

export function fetchServiceProducts(serviceType, navigation = null) {
  return async (dispatch) => {
    let url =
      endPoints.FETCH_SERVICE_PRODUCTS_API + "?serviceType=" + serviceType;
    let result = await serverCall(url, requestMethod.GET, {}, navigation);
    // console.log("$$$-result", JSON.stringify(result));
    if (result.success) {
      dispatch(setServiceProductsDataInStore(result.data.data));
    } else {
      dispatch(setServiceProductsErrorDataInStore(result));
    }
  };
}
