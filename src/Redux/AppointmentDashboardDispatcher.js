import moment from "moment";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "../Utilities/API";
import {
  USERTYPE,
  getCustomerID,
  //getCustomerUUID,
  getUserId,
  getUserType
} from "../Utilities/UserManagement/userInfo";
import {
  initAppointmentDashboardData,
  setAppointmentDashboardData,
  setAppointmentDashboardError,
  setHelpdeskAgentWiseData,
  setHelpdeskAgentWiseDataError,
  setHelpdeskByAgeingData,
  setHelpdeskByAgeingDataError,
  setHelpdeskBySeverityData,
  setHelpdeskBySeverityDataError,
  setHelpdeskProjectWiseData,
  setHelpdeskProjectWiseDataError,
  setHelpdeskSummaryData,
  setHelpdeskSummaryDataError,
  setMonthlyTrendData,
  setMonthlyTrendDataError,
  setSupportTtkPendingData,
  setSupportTtkPendingDataError
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


export function getHelpdeskSummary(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_SUMMARY;
    console.log("getHelpdeskSummary url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskSummary result..", result);

    if (result.success) {
      console.log("getHelpdeskSummary result success..", result);
      dispatch(setHelpdeskSummaryData(result.data));
    } else {
      console.log("getHelpdeskSummary result failed..", result);
      dispatch(setHelpdeskSummaryDataError(result));
    }

  };
}


export function getSupportTtkPending(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_SUPPORT_TTK_PENDING;
    console.log("getSupportTtkPending url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getSupportTtkPending result.xxx.", result);

    if (result.success) {
      console.log('here------>', result?.data?.data?.rows)
      const pendingTktsCounts = {};
      result?.data?.data?.rows?.forEach(item => {
        const description = item?.project;
        if (pendingTktsCounts[description]) {
          pendingTktsCounts[description]++;
        } else {
          pendingTktsCounts[description] = 1;
        }
      });
      console.log("getSupportTtkPending result success.---pendingTktsCounts---.", pendingTktsCounts);
      dispatch(setSupportTtkPendingData(pendingTktsCounts));
    } else {
      console.log("getSupportTtkPending result failed..", result);
      dispatch(setSupportTtkPendingDataError(result));
    }

  };
}



export function getMonthlyTrend() {
  return async (dispatch) => {

    var date = new Date();
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    console.log("req start date..", new Date(date.getFullYear(), date.getMonth(), 1))
    console.log("req end date..", new Date(date.getFullYear(), date.getMonth() + 1, 0))


    var startDate = moment(firstDate).format("YYYY-MM-DD");
    var endDate = moment(lastDate).format("YYYY-MM-DD");

    console.log("req start date2..", startDate)
    console.log("req end date2..", endDate)

    let params = {
      startDate: startDate,
      endDate: endDate,
      // project,
      type: "COUNT",
      // priority,
      // currUser,
      // status
    };

    let url = endPoints.DASHBOARD_HELPDESK_MONTHLY_TREND;
    console.log("getMonthlyTrend url..", url);
    console.log("getMonthlyTrend params..", params);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getMonthlyTrend result..", result);

    if (result.success) {
      console.log("getMonthlyTrend result success..", result);
      dispatch(setMonthlyTrendData(result.data));
    } else {
      console.log("getMonthlyTrend result failed..", result);
      dispatch(setMonthlyTrendDataError(result));
    }

  };
}



export function getHelpdeskByStatus(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_STATUS;
    console.log("getHelpdeskByStatus url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskByStatus result..", result);

    if (result.success) {
      console.log("getHelpdeskByStatus result success..", result);
      dispatch(setHelpdeskByStatusData(result.data));
    } else {
      console.log("getHelpdeskByStatus result failed..", result);
      dispatch(setHelpdeskByStatusDataError(result));
    }

  };
}


export function getHelpdeskByAgeing(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_AGING;
    console.log("getHelpdeskByAgeing url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskByAgeing result..", result);

    if (result.success) {
      console.log("getHelpdeskByAgeing result success..", result);
      dispatch(setHelpdeskByAgeingData(result.data));
    } else {
      console.log("getHelpdeskByAgeing result failed..", result);
      dispatch(setHelpdeskByAgeingDataError(result));
    }

  };
}


export function getHelpdeskBySeverity(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_SEVERITY;
    console.log("getHelpdeskBySeverity url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskBySeverity result..", result);

    if (result.success) {
      console.log("getHelpdeskBySeverity result success..", result);
      dispatch(setHelpdeskBySeverityData(result.data));
    } else {
      console.log("getHelpdeskBySeverity result failed..", result);
      dispatch(setHelpdeskBySeverityDataError(result));
    }

  };
}


export function getHelpdeskProjectWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_PROJECT_WISE;
    console.log("getHelpdeskProjectWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskProjectWise result..", result);

    if (result.success) {
      console.log("getHelpdeskProjectWise result success..", result);
      dispatch(setHelpdeskProjectWiseData(result.data));
    } else {
      console.log("getHelpdeskProjectWise result failed..", result);
      dispatch(setHelpdeskProjectWiseDataError(result));
    }

  };
}


export function getHelpdeskAgentWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_AGENT_WISE;
    console.log("getHelpdeskAgentWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskAgentWise result..", result);

    if (result.success) {
      console.log("getHelpdeskAgentWise result success..", result);
      dispatch(setHelpdeskAgentWiseData(result.data));
    } else {
      console.log("getHelpdeskAgentWise result failed..", result);
      dispatch(setHelpdeskAgentWiseDataError(result));
    }

  };
}
