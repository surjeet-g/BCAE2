import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  //getCustomerUUID,
  getUserId,
  getUserType,
  USERTYPE,
} from "../Utilities/UserManagement/userInfo";
import {
  initAppointmentDashboardData,
  setAppointmentDashboardData,
  setAppointmentDashboardError
} from "./AppointmentDashboardAction";
export const getAppointmentDashboardData = (navigation) => {
  return async (dispatch) => {
    await dispatch(initAppointmentDashboardData());
    const userType = await getUserType();
    const userId = await getUserId();

    let appointment_url =
      userType == USERTYPE.CUSTOMER
        ? endPoints.GET_APPOINTMENT_DASHBOARD + "/customer/" + "286"
        : endPoints.GET_APPOINTMENT_DASHBOARD + "/user/" + userId;

    let params = {};
    let result = await serverCall(
      appointment_url,
      requestMethod.GET,
      params,
      navigation
    );

    if (result.success) {
      dispatch(setAppointmentDashboardData(result?.data?.data));
      return true;
    } else {
      dispatch(setAppointmentDashboardError(result));
      return false;
    }
  };
};
