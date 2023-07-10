import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  getCustomerID,
  //getCustomerUUID,
  getUserId,
  getUserType,
  USERTYPE
} from "../Utilities/UserManagement/userInfo";
import {
  initAppointmentDashboardData,
  setAppointmentDashboardData,
  setAppointmentDashboardError
} from "./AppointmentDashboardAction";
export const getAppointmentDashboardData = (navigation = null) => {
  return async (dispatch) => {
    await dispatch(initAppointmentDashboardData());
    const userType = await getUserType();
    const userId = await getUserId();
    const customerId = await getCustomerID()

    let appointment_url =
      userType == USERTYPE.CUSTOMER
        ? endPoints.GET_APPOINTMENT_DASHBOARD + "/customer/" + customerId
        : endPoints.GET_APPOINTMENT_DASHBOARD + "/user/" + userId;

    let params = {};
    let result = await serverCall(
      appointment_url,
      requestMethod.GET,
      params,
      navigation
    );

    console.log('data appoinment', result, appointment_url)
    if (result.success) {
      dispatch(setAppointmentDashboardData(result?.data?.data));
      return true;
    } else {
      dispatch(setAppointmentDashboardError(result));
      return false;
    }
  };
};
