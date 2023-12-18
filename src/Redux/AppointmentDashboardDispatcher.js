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
  setAppPerformanceData,
  setAppPerformanceErrorData,
  setAppointmentDashboardData,
  setAppointmentDashboardError,
  setAppointmentEventsData,
  setAppointmentEventsErrorData,
  setAppointmentRemindersData,
  setAppointmentRemindersErrorData,
  setAssignedAppointmentsGraphData,
  setAssignedAppointmentsGraphErrorData,
  setChannelWiseData,
  setChannelWiseDataError,
  setClosedAppointmentsData,
  setClosedAppointmentsErrorData,
  setCustomerWiseData,
  setCustomerWiseDataError,
  setDepartmentInteractionsData,
  setDepartmentInteractionsDataError,
  setDepartmentVsRolesInteractionsData,
  setDepartmentVsRolesInteractionsDataError,
  setHelpdeskAgentWiseData,
  setHelpdeskAgentWiseDataError,
  setHelpdeskByAgeingData,
  setHelpdeskByAgeingDataError,
  setHelpdeskBySeverityData,
  setHelpdeskBySeverityDataError,
  setHelpdeskBySeverityDataErrorLive,
  setHelpdeskBySeverityDataLive,
  setHelpdeskBySeverityListData,
  setHelpdeskBySeverityListDataError,
  setHelpdeskByStatusData,
  setHelpdeskByStatusDataError,
  setHelpdeskByStatusListData,
  setHelpdeskByStatusListDataError,
  setHelpdeskByStatusListDataErrorLive,
  setHelpdeskByStatusListDataLive,
  setHelpdeskByTypeDataErrorLive,
  setHelpdeskByTypeDataLive,
  setHelpdeskProjectWiseData,
  setHelpdeskProjectWiseDataError,
  setHelpdeskProjectWiseDataErrorLive,
  setHelpdeskProjectWiseDataLive,
  setHelpdeskSummaryClarificationData,
  setHelpdeskSummaryClarificationDataError,
  setHelpdeskSummaryData,
  setHelpdeskSummaryDataError,
  setHelpdeskSummaryIncidentData,
  setHelpdeskSummaryIncidentDataError,
  setHelpdeskSummaryServiceRequestData,
  setHelpdeskSummaryServiceRequestDataError,
  setHelpdeskSummaryUnclassifiedData,
  setHelpdeskSummaryUnclassifiedDataError,
  setHourlyTicketsData,
  setHourlyTicketsErrorData,
  setInteractionAgentWiseData,
  setInteractionAgentWiseDataError,
  setInteractionAgentWiseListData,
  setInteractionAgentWiseListDataError,
  setInteractionAvgWiseData,
  setInteractionAvgWiseDataError,
  setInteractionByAgeingData,
  setInteractionByAgeingDataError,
  setInteractionByAgeingFiveDaysData,
  setInteractionByAgeingFiveDaysDataError,
  setInteractionByAgeingMoreFiveDaysData,
  setInteractionByAgeingMoreFiveDaysDataError,
  setInteractionByAgeingThreeDaysData,
  setInteractionByAgeingThreeDaysDataError,
  setInteractionByCategoryData,
  setInteractionByCategoryDataError,
  setInteractionByFollowupsData,
  setInteractionByFollowupsDataError,
  setInteractionByFollowupsFiveDaysData,
  setInteractionByFollowupsFiveDaysDataError,
  setInteractionByFollowupsMoreFiveDaysData,
  setInteractionByFollowupsMoreFiveDaysDataError,
  setInteractionByFollowupsThreeDaysData,
  setInteractionByFollowupsThreeDaysDataError,
  setInteractionByLivePriorityData,
  setInteractionByLivePriorityDataError,
  setInteractionByPriorityData,
  setInteractionByPriorityDataError,
  setInteractionByPriorityHighData,
  setInteractionByPriorityHighDataError,
  setInteractionByPriorityLowData,
  setInteractionByPriorityLowDataError,
  setInteractionByPriorityMediumData,
  setInteractionByPriorityMediumDataError,
  setInteractionByPriorityStatusWiseData,
  setInteractionByPriorityStatusWiseListData,
  setInteractionByPriorityStatusWiseListDataError,
  setInteractionByServiceCategoryData,
  setInteractionByServiceCategoryDataError,
  setInteractionByServiceTypeData,
  setInteractionByServiceTypeDataError,
  setInteractionByTypeData,
  setInteractionByTypeDataError,
  setInteractionByTypeListData,
  setInteractionByTypeListDataError,
  setInteractionProjectWiseData,
  setInteractionProjectWiseDataError,
  setInteractionProjectWiseListData,
  setInteractionProjectWiseListDataError,
  setInteractionsByStatusListData,
  setInteractionsByStatusListDataError,
  setInteractionsByStatusListDataErrorTwo,
  setInteractionsByStatusListDataTwo,
  setInteractionsByStatusLiveListData,
  setInteractionsByStatusLiveListDataError,
  setIntxnPerformanceGraphData,
  setIntxnPerformanceGraphErrorData,
  setLiveCustomerWiseData,
  setLiveCustomerWiseDataError,
  setLiveInteractionsByStatusData,
  setLiveInteractionsByStatusDataError,
  setLiveProjectWiseData,
  setLiveProjectWiseDataError,
  setLocationWiseData,
  setLocationWiseDataError,
  setManagersListData,
  setManagersListDataError,
  setMonthlyTrendData,
  setMonthlyTrendDataError,
  setNpsCsatChampData,
  setNpsCsatChampDataError,
  setOperationalAppointmentOverviewData,
  setOperationalAppointmentOverviewErrorData,
  setOperationalAssignedInteractionsData,
  setOperationalAssignedInteractionsErrorData,
  setOperationalAssignedToMeData,
  setOperationalAssignedToMeErrorData,
  setOperationalInteractionHistoryGraphData,
  setOperationalInteractionHistoryGraphErrorData,
  setOperationalInteractionHistoryGraphTeamData,
  setOperationalInteractionHistoryGraphTeamErrorData,
  setOperationalPooledInteractionsData,
  setOperationalPooledInteractionsErrorData,
  setOperationalTeamAppointmentOverviewData,
  setOperationalTeamAppointmentOverviewErrorData,
  setOperationalTeamAssignedInteractionsData,
  setOperationalTeamAssignedInteractionsErrorData,
  setOperationalTeamPooledInteractionsData,
  setOperationalTeamPooledInteractionsErrorData,
  setResMttrWaitingData,
  setResMttrWaitingDataError,
  setStatementWiseData,
  setStatementWiseDataError,
  setStatusWiseCountData,
  setStatusWiseCountDataError,
  setSupportTtkPendingData,
  setSupportTtkPendingDataCounts,
  setSupportTtkPendingDataCountsError,
  setSupportTtkPendingDataError,
  setTeamAssignedAppointmentsGraphData,
  setTeamAssignedAppointmentsGraphErrorData,
  setTeamCategoryPerformanceData,
  setTeamCategoryPerformanceErrorData,
  setTopFivePerformanceChatData,
  setTopFivePerformanceChatErrorData,
  setTopFivePerformanceData,
  setTopFivePerformanceErrorData,
  setTypeBasedAppData,
  setTypeBasedAppErrorData,
  setUpcomingAppointmentsData,
  setUpcomingAppointmentsErrorData
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



export async function getHelpdeskHourlyTickets() {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_HOURLY_TICKETS;
    console.log("getHelpdeskHourlyTickets url..", url);

    let result = await serverCall(url, requestMethod.POST, {});
    console.log("getHelpdeskHourlyTickets result..", result);

    if (result.success) {
      console.log("getHelpdeskHourlyTickets result success..", result);
      dispatch(setHourlyTicketsData(result.data));
    } else {
      console.log("getHelpdeskHourlyTickets result failed..", result);
      dispatch(setHourlyTicketsErrorData(result));
    }

  };
}



export async function getHelpdeskSummary(params) {
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


export async function getHelpdeskSummaryClarification(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_SUMMARY;
    console.log("getHelpdeskSummaryClarification url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskSummaryClarification result..", result);

    if (result.success) {
      console.log("getHelpdeskSummaryClarification result success..", result);
      dispatch(setHelpdeskSummaryClarificationData(result.data));
    } else {
      console.log("getHelpdeskSummaryClarification result failed..", result);
      dispatch(setHelpdeskSummaryClarificationDataError(result));
    }

  };
}


export async function getHelpdeskSummaryIncident(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_SUMMARY;
    console.log("getHelpdeskSummaryIncident url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskSummaryIncident result..", result);

    if (result.success) {
      console.log("getHelpdeskSummaryIncident result success..", result);
      dispatch(setHelpdeskSummaryIncidentData(result.data));
    } else {
      console.log("getHelpdeskSummaryIncident result failed..", result);
      dispatch(setHelpdeskSummaryIncidentDataError(result));
    }

  };
}



export async function getHelpdeskSummaryServiceRequest(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_SUMMARY;
    console.log("getHelpdeskSummaryServiceRequest url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskSummaryServiceRequest result..", result);

    if (result.success) {
      console.log("getHelpdeskSummaryServiceRequest result success..", result);
      dispatch(setHelpdeskSummaryServiceRequestData(result.data));
    } else {
      console.log("getHelpdeskSummaryServiceRequest result failed..", result);
      dispatch(setHelpdeskSummaryServiceRequestDataError(result));
    }

  };
}


export async function getHelpdeskSummaryUnclassified(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_SUMMARY;
    console.log("getHelpdeskSummaryUnclassified url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskSummaryUnclassified result..", result);

    if (result.success) {
      console.log("getHelpdeskSummaryUnclassified result success..", result);
      dispatch(setHelpdeskSummaryUnclassifiedData(result.data));
    } else {
      console.log("getHelpdeskSummaryUnclassified result failed..", result);
      dispatch(setHelpdeskSummaryUnclassifiedDataError(result));
    }

  };
}


export async function getSupportTtkPending(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_SUPPORT_TTK_PENDING;
    console.log("getSupportTtkPending url..", url);

    let result = await serverCall(url, requestMethod.POST, {});
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
      dispatch(setSupportTtkPendingDataCounts(pendingTktsCounts));
      dispatch(setSupportTtkPendingData(result?.data?.data));
    } else {
      console.log("getSupportTtkPending result failed..", result);
      dispatch(setSupportTtkPendingDataCountsError(result));
      dispatch(setSupportTtkPendingDataError(result));

    }

  };
}



export async function getMonthlyTrend() {
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



export async function getHelpdeskByStatus(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_STATUS;
    console.log("getHelpdeskByStatus url..", url);
    console.log("getHelpdeskByStatus params..", params);

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


export async function getHelpdeskByStatusList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_STATUS;
    console.log("getHelpdeskByStatusList url..", url);
    console.log("getHelpdeskByStatusList params..", params);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskByStatusList result..", result);

    if (result.success) {
      console.log("getHelpdeskByStatusList result success..", result);
      dispatch(setHelpdeskByStatusListData(result.data));
    } else {
      console.log("getHelpdeskByStatusList result failed..", result);
      dispatch(setHelpdeskByStatusListDataError(result));
    }

  };
}


export function getHelpdeskByStatusListLive(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_STATUS;
    console.log("getHelpdeskByStatusListLive url..", url);
    console.log("getHelpdeskByStatusListLive params..", params);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskByStatusListLive result..", result);

    if (result.success) {
      console.log("getHelpdeskByStatusListLive result success..", result);
      dispatch(setHelpdeskByStatusListDataLive(result.data));
    } else {
      console.log("getHelpdeskByStatusList result failed..", result);
      dispatch(setHelpdeskByStatusListDataErrorLive(result));
    }

  };
}


export function getHelpdeskByTypeLive(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_TYPE;
    console.log("getHelpdeskByTypeLive url..", url);
    console.log("getHelpdeskByTypeLive params..", params);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskByTypeLive result..", result);

    if (result.success) {
      console.log("getHelpdeskByTypeLive result success..", result);
      dispatch(setHelpdeskByTypeDataLive(result.data));
    } else {
      console.log("getHelpdeskByTypeLive result failed..", result);
      dispatch(setHelpdeskByTypeDataErrorLive(result));
    }

  };
}


export async function getHelpdeskByAgeing(params) {
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


export async function getHelpdeskBySeverity(params) {
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

export async function getHelpdeskBySeverityList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_SEVERITY;
    console.log("getHelpdeskBySeverityList url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskBySeverityList result..", result);

    if (result.success) {
      console.log("getHelpdeskBySeverityList result success..", result);
      dispatch(setHelpdeskBySeverityListData(result.data));
    } else {
      console.log("getHelpdeskBySeverityList result failed..", result);
      dispatch(setHelpdeskBySeverityListDataError(result));
    }

  };
}


export function getHelpdeskBySeverityLive(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_BY_SEVERITY;
    console.log("getHelpdeskBySeverityLive url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskBySeverityLive result..", result);

    if (result.success) {
      console.log("getHelpdeskBySeverityLive result success..", result);
      dispatch(setHelpdeskBySeverityDataLive(result.data));
    } else {
      console.log("getHelpdeskBySeverityLive result failed..", result);
      dispatch(setHelpdeskBySeverityDataErrorLive(result));
    }

  };
}


export async function getHelpdeskProjectWise(params) {
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

export function getHelpdeskProjectWiseLive(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_HELPDESK_PROJECT_WISE;
    console.log("getHelpdeskProjectWiseLive url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getHelpdeskProjectWiseLive result..", result);

    if (result.success) {
      console.log("getHelpdeskProjectWiseLive result success..", result);
      dispatch(setHelpdeskProjectWiseDataLive(result.data));
    } else {
      console.log("getHelpdeskProjectWiseLive result failed..", result);
      dispatch(setHelpdeskProjectWiseDataErrorLive(result));
    }

  };
}


export async function getHelpdeskAgentWise(params) {
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




export function getStatementWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_STATEMENT_WISE;
    console.log("getStatementWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getStatementWise result..", result);

    if (result.success) {
      console.log("getStatementWise result success..", result);
      dispatch(setStatementWiseData(result.data));
    } else {
      console.log("getStatementWise result failed..", result);
      dispatch(setStatementWiseDataError(result));
    }

  };
}


export function getStatusWiseCount(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_STATUS_COUNT;
    console.log("getStatusWiseCount url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getStatusWiseCount result..", result);

    if (result.success) {
      console.log("getStatusWiseCount result success..", result);
      dispatch(setStatusWiseCountData(result.data));
    } else {
      console.log("getStatusWiseCount result failed..", result);
      dispatch(setStatusWiseCountDataError(result));
    }

  };
}



export function getChannelWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_CHANNEL_WISE;
    console.log("getChannelWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getChannelWise result..", result);

    if (result.success) {
      console.log("getChannelWise result success..", result);
      dispatch(setChannelWiseData(result.data));
    } else {
      console.log("getChannelWise result failed..", result);
      dispatch(setChannelWiseDataError(result));
    }

  };
}



export async function getCustomerWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_CUSTOMER_WISE;
    console.log("getCustomerWise url..", url);
    console.log("getCustomerWise params..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getCustomerWise result..", result);

    if (result.success) {
      console.log("getCustomerWise result success..", result);
      dispatch(setCustomerWiseData(result.data));
    } else {
      console.log("getCustomerWise result failed..", result);
      dispatch(setCustomerWiseDataError(result));
    }

  };
}



export function getLiveCustomerWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_LIVE_CUSTOMER_WISE;
    console.log("getLiveCustomerWise url..", url);
    console.log("getLiveCustomerWise params..", params);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getLiveCustomerWise result..", result);

    if (result.success) {
      console.log("getLiveCustomerWise result success..", result);
      dispatch(setLiveCustomerWiseData(result.data));
    } else {
      console.log("getLiveCustomerWise result failed..", result);
      dispatch(setLiveCustomerWiseDataError(result));
    }

  };
}



export function getLiveProjectWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_LIVE_PROJECT_WISE;
    console.log("getLiveProjectWise url..", url);
    console.log("getLiveProjectWise params..", params);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getLiveProjectWise result..", result);

    if (result.success) {
      console.log("getLiveProjectWise result success..", result);
      dispatch(setLiveProjectWiseData(result.data));
    } else {
      console.log("getLiveProjectWise result failed..", result);
      dispatch(setLiveProjectWiseDataError(result));
    }

  };
}



export function getLocationWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_LOCATION_WISE;
    console.log("getLocationWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getLocationWise result..", result);

    if (result.success) {
      console.log("getLocationWise result success..", result);
      dispatch(setLocationWiseData(result.data));
    } else {
      console.log("getLocationWise result failed..", result);
      dispatch(setLocationWiseDataError(result));
    }

  };
}



export function getDepartmentInteractions(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_DEPARTMENT;
    console.log("getDepartmentInteractions url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getDepartmentInteractions result..", result);

    if (result.success) {
      console.log("getDepartmentInteractions result success..", result);
      dispatch(setDepartmentInteractionsData(result.data));
    } else {
      console.log("getDepartmentInteractions result failed..", result);
      dispatch(setDepartmentInteractionsDataError(result));
    }

  };
}



export async function getDepartmentVsRolesInteractions(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_DEPARTMENT_VS_ROLES;
    console.log("getDepartmentVsRolesInteractions url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getDepartmentVsRolesInteractions result..", result);

    if (result.success) {
      console.log("getDepartmentVsRolesInteractions result success..", result);
      dispatch(setDepartmentVsRolesInteractionsData(result.data));
    } else {
      console.log("getDepartmentVsRolesInteractions result failed..", result);
      dispatch(setDepartmentVsRolesInteractionsDataError(result));
    }

  };
}



export function getNpsCsatChamp(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_NPS_CSAT_CHAMP;
    console.log("getNpsCsatChamp url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getNpsCsatChamp result..", result);

    if (result.success) {
      console.log("getNpsCsatChamp result success..", result);
      dispatch(setNpsCsatChampData(result.data));
    } else {
      console.log("getNpsCsatChamp result failed..", result);
      dispatch(setNpsCsatChampDataError(result));
    }

  };
}



export function getResMttrWaiting(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_RES_MTTR_WAITING;
    console.log("getResMttrWaiting url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getResMttrWaiting result..", result);

    if (result.success) {
      console.log("getResMttrWaiting result success..", result);
      dispatch(setResMttrWaitingData(result.data));
    } else {
      console.log("getResMttrWaiting result failed..", result);
      dispatch(setResMttrWaitingDataError(result));
    }

  };
}



export function getLiveInteractionsByStatus(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_LIVE_INT_BY_STATUS;
    console.log("getLiveInteractionsByStatus url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getLiveInteractionsByStatus result..", result);

    if (result.success) {
      console.log("getLiveInteractionsByStatus result success..", result);
      dispatch(setLiveInteractionsByStatusData(result.data));
    } else {
      console.log("getLiveInteractionsByStatus result failed..", result);
      dispatch(setLiveInteractionsByStatusDataError(result));
    }

  };
}


export function getInteractionsByStatusList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_LIVE_INT_BY_STATUS_LIST;
    console.log("getInteractionsByStatusList url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionsByStatusList result..", result);

    if (result.success) {
      console.log("getInteractionsByStatusList result success..", result);
      dispatch(setInteractionsByStatusListData(result.data));
    } else {
      console.log("getInteractionsByStatusList result failed..", result);
      dispatch(setInteractionsByStatusListDataError(result));
    }

  };
}

export function getInteractionsByStatusLiveList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_LIVE_INT_BY_STATUS_LIST;
    console.log("getInteractionsByStatusLiveList url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionsByStatusLiveList result..", result);

    if (result.success) {
      console.log("getInteractionsByStatusLiveList result success..", result);
      dispatch(setInteractionsByStatusLiveListData(result.data));
    } else {
      console.log("getInteractionsByStatusLiveList result failed..", result);
      dispatch(setInteractionsByStatusLiveListDataError(result));
    }

  };
}


export function getInteractionsByLiveStatusListTwo(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_LIVE_INT_BY_STATUS;
    console.log("getInteractionsByLiveStatusListTwo url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionsByLiveStatusListTwo result..", result);

    if (result.success) {
      console.log("getInteractionsByLiveStatusListTwo result success..", result);
      dispatch(setInteractionsByStatusListDataTwo(result.data));
    } else {
      console.log("getInteractionsByLiveStatusListTwo result failed..", result);
      dispatch(setInteractionsByStatusListDataErrorTwo(result));
    }

  };
}



export function getInteractionAvgWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_AVG_WISE;
    console.log("getInteractionAvgWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionAvgWise result..", result);

    if (result.success) {
      console.log("getInteractionAvgWise result success..", result);
      dispatch(setInteractionAvgWiseData(result.data));
    } else {
      console.log("getInteractionAvgWise result failed..", result);
      dispatch(setInteractionAvgWiseDataError(result));
    }

  };
}



export async function getInteractionByPriorityStatusWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_PRIORITY_STATUS_WISE;
    console.log("getInteractionByPriorityStatusWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByPriorityStatusWise result..", result);

    if (result.success) {
      console.log("getInteractionByPriorityStatusWise result success..", result);
      dispatch(setInteractionByPriorityStatusWiseData(result.data));
    } else {
      console.log("getInteractionByPriorityStatusWise result failed..", result);
      dispatch(setInteractionByPriorityStatusWiseListDataError(result));
    }

  };
}

export function getInteractionByPriorityStatusWiseList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_PRIORITY_STATUS_WISE_LIST;
    console.log("getInteractionByPriorityStatusWiseList url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByPriorityStatusWiseList result..", result);

    if (result.success) {
      console.log("getInteractionByPriorityStatusWiseList result success..", result);
      dispatch(setInteractionByPriorityStatusWiseListData(result.data));
    } else {
      console.log("getInteractionByPriorityStatusWiseList result failed..", result);
      dispatch(setInteractionByPriorityStatusWiseListDataError(result));
    }

  };
}



export function getManagersList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_GET_MANAGERS_LIST;
    console.log("getManagersList url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getManagersList result..", result);

    if (result.success) {
      console.log("getManagersList result success..", result);
      dispatch(setManagersListData(result.data));
    } else {
      console.log("getManagersList result failed..", result);
      dispatch(setManagersListDataError(result));
    }

  };
}



export function getInteractionByLivePriority(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_PRIORITY;
    console.log("getLiveInteractionByPriority url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getLiveInteractionByPriority result..", result);

    if (result.success) {
      console.log("getLiveInteractionByPriority result success..", result);
      dispatch(setInteractionByLivePriorityData(result.data));
    } else {
      console.log("getLiveInteractionByPriority result failed..", result);
      dispatch(setInteractionByLivePriorityDataError(result));
    }

  };
}


export function getInteractionByPriority(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_PRIORITY;
    console.log("getInteractionByPriority url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByPriority result..", result);

    if (result.success) {
      console.log("getInteractionByPriority result success..", result);
      dispatch(setInteractionByPriorityData(result.data));
    } else {
      console.log("getInteractionByPriority result failed..", result);
      dispatch(setInteractionByPriorityDataError(result));
    }

  };
}



export async function getInteractionByPriorityHigh(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_PRIORITY;
    console.log("getInteractionByPriorityHigh url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByPriorityHigh result..", result);

    if (result.success) {
      console.log("getInteractionByPriorityHigh result success..", result);
      dispatch(setInteractionByPriorityHighData(result.data));
    } else {
      console.log("getInteractionByPriorityHigh result failed..", result);
      dispatch(setInteractionByPriorityHighDataError(result));
    }

  };
}



export async function getInteractionByPriorityLow(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_PRIORITY;
    console.log("getInteractionByPriorityLow url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByPriorityLow result..", result);

    if (result.success) {
      console.log("getInteractionByPriorityLow result success..", result);
      dispatch(setInteractionByPriorityLowData(result.data));
    } else {
      console.log("getInteractionByPriorityLow result failed..", result);
      dispatch(setInteractionByPriorityLowDataError(result));
    }

  };
}



export async function getInteractionByPriorityMedium(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_PRIORITY;
    console.log("getInteractionByPriorityMedium url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByPriorityMedium result..", result);

    if (result.success) {
      console.log("getInteractionByPriorityMedium result success..", result);
      dispatch(setInteractionByPriorityMediumData(result.data));
    } else {
      console.log("getInteractionByPriorityMedium result failed..", result);
      dispatch(setInteractionByPriorityMediumDataError(result));
    }

  };
}



export function getInteractionByAgeing(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_AGEING;
    console.log("getInteractionByAgeing url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByAgeing result..", result);

    if (result.success) {
      console.log("getInteractionByAgeing result success..", result);
      dispatch(setInteractionByAgeingData(result.data));
    } else {
      console.log("getInteractionByAgeing result failed..", result);
      dispatch(setInteractionByAgeingDataError(result));
    }

  };
}

export async function getInteractionByAgeingThreeDays(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_AGEING;
    console.log("getInteractionByAgeing 3 url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByAgeing 3 result..", result);

    if (result.success) {
      console.log("getInteractionByAgeing 3 result success..", result);
      dispatch(setInteractionByAgeingThreeDaysData(result.data));
    } else {
      console.log("getInteractionByAgeing 3 result failed..", result);
      dispatch(setInteractionByAgeingThreeDaysDataError(result));
    }

  };
}



export async function getInteractionByAgeingFiveDays(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_AGEING;
    console.log("getInteractionByAgeing 5 url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByAgeing 5 result..", result);

    if (result.success) {
      console.log("getInteractionByAgeing 5 result success..", result);
      dispatch(setInteractionByAgeingFiveDaysData(result.data));
    } else {
      console.log("getInteractionByAgeing 5 result failed..", result);
      dispatch(setInteractionByAgeingFiveDaysDataError(result));
    }

  };
}



export async function getInteractionByAgeingMoreFiveDays(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_AGEING;
    console.log("getInteractionByAgeing more 5 url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByAgeing more 5 result..", result);

    if (result.success) {
      console.log("getInteractionByAgeing more 5 result success..", result);
      dispatch(setInteractionByAgeingMoreFiveDaysData(result.data));
    } else {
      console.log("getInteractionByAgeing more 5 result failed..", result);
      dispatch(setInteractionByAgeingMoreFiveDaysDataError(result));
    }

  };
}



export function getInteractionByFollowups(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_FOLLOWUPS;
    console.log("getInteractionByFollowups url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByFollowups result..", result);

    if (result.success) {
      console.log("getInteractionByFollowups result success..", result);
      dispatch(setInteractionByFollowupsData(result.data));
    } else {
      console.log("getInteractionByFollowups result failed..", result);
      dispatch(setInteractionByFollowupsDataError(result));
    }

  };
}



export async function getInteractionByFollowupsThreeDays(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_FOLLOWUPS;
    console.log("getInteractionByFollowups 3 url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByFollowups 3 result..", result);

    if (result.success) {
      console.log("getInteractionByFollowups 3 result success..", result);
      dispatch(setInteractionByFollowupsThreeDaysData(result.data));
    } else {
      console.log("getInteractionByFollowups 3 result failed..", result);
      dispatch(setInteractionByFollowupsThreeDaysDataError(result));
    }

  };
}



export async function getInteractionByFollowupsFiveDays(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_FOLLOWUPS;
    console.log("getInteractionByFollowups 5 url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByFollowups 5 result..", result);

    if (result.success) {
      console.log("getInteractionByFollowups 5 result success..", result);
      dispatch(setInteractionByFollowupsFiveDaysData(result.data));
    } else {
      console.log("getInteractionByFollowups 5 result failed..", result);
      dispatch(setInteractionByFollowupsFiveDaysDataError(result));
    }

  };
}



export async function getInteractionByFollowupsMoreFiveDays(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_BY_FOLLOWUPS;
    console.log("getInteractionByFollowups more 5 url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByFollowups more 5 result..", result);

    if (result.success) {
      console.log("getInteractionByFollowups more 5 result success..", result);
      dispatch(setInteractionByFollowupsMoreFiveDaysData(result.data));
    } else {
      console.log("getInteractionByFollowups more 5 result failed..", result);
      dispatch(setInteractionByFollowupsMoreFiveDaysDataError(result));
    }

  };
}



export function getInteractionByCategory(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_CATEGORY;
    console.log("getInteractionByCategory url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByCategory result..", result);

    if (result.success) {
      console.log("getInteractionByCategory result success..", result);
      dispatch(setInteractionByCategoryData(result.data));
    } else {
      console.log("getInteractionByCategory result failed..", result);
      dispatch(setInteractionByCategoryDataError(result));
    }

  };
}



export function getInteractionByType(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_TYPE;
    console.log("getInteractionByType url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByType result..", result);

    if (result.success) {
      console.log("getInteractionByType result success..", result);
      dispatch(setInteractionByTypeData(result.data));
    } else {
      console.log("getInteractionByType result failed..", result);
      dispatch(setInteractionByTypeDataError(result));
    }

  };
}


export function getInteractionByTypeList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_TYPE_LIST;
    console.log("getInteractionByTypeList url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByTypeList result..", result);

    if (result.success) {
      console.log("getInteractionByTypeList result success..", result);
      dispatch(setInteractionByTypeListData(result.data));
    } else {
      console.log("getInteractionByTypeList result failed..", result);
      dispatch(setInteractionByTypeListDataError(result));
    }

  };
}



export function getInteractionByServiceCategory(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_SERVICE_CATEGORY;
    console.log("getInteractionByServiceCategory url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByServiceCategory result..", result);

    if (result.success) {
      console.log("getInteractionByServiceCategory result success..", result);
      dispatch(setInteractionByServiceCategoryData(result.data));
    } else {
      console.log("getInteractionByServiceCategory result failed..", result);
      dispatch(setInteractionByServiceCategoryDataError(result));
    }

  };
}



export function getInteractionByServiceType(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_SERVICE_TYPE;
    console.log("getInteractionByServiceType url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionByServiceType result..", result);

    if (result.success) {
      console.log("getInteractionByServiceType result success..", result);
      dispatch(setInteractionByServiceTypeData(result.data));
    } else {
      console.log("getInteractionByServiceType result failed..", result);
      dispatch(setInteractionByServiceTypeDataError(result));
    }

  };
}



export function getInteractionProjectWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_PROJECT_WISE_COUNT;
    console.log("getInteractionProjectWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionProjectWise result..", result);

    if (result.success) {
      console.log("getInteractionProjectWise result success..", result);
      dispatch(setInteractionProjectWiseData(result.data));
    } else {
      console.log("getInteractionProjectWise result failed..", result);
      dispatch(setInteractionProjectWiseDataError(result));
    }

  };
}





export async function getInteractionProjectWiseList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_PROJECT_WISE_LIST;
    console.log("getInteractionProjectWiseList url..", url);
    console.log("getInteractionProjectWiseList params..", params);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionProjectWiseList result..", result);

    if (result.success) {
      console.log("getInteractionProjectWiseList result success..", result);
      dispatch(setInteractionProjectWiseListData(result.data));
    } else {
      console.log("getInteractionProjectWiseList result failed..", result);
      dispatch(setInteractionProjectWiseListDataError(result));
    }

  };
}



export function getInteractionAgentWise(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_AGENT_WISE_COUNT;
    console.log("getInteractionAgentWise url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionAgentWise result..", result);

    if (result.success) {
      console.log("getInteractionAgentWise result success..", result);
      dispatch(setInteractionAgentWiseData(result.data));
    } else {
      console.log("getInteractionAgentWise result failed..", result);
      dispatch(setInteractionAgentWiseDataError(result));
    }

  };
}



export async function getInteractionAgentWiseList(params) {
  return async (dispatch) => {

    let url = endPoints.DASHBOARD_INTERACTION_AGENT_WISE_LIST;
    console.log("getInteractionAgentWiseList url..", url);

    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionAgentWiseList result..", result);

    if (result.success) {
      console.log("getInteractionAgentWiseList result success..", result);
      dispatch(setInteractionAgentWiseListData(result.data));
    } else {
      console.log("getInteractionAgentWiseList result failed..", result);
      dispatch(setInteractionAgentWiseListDataError(result));
    }

  };
}


// export function getInteractionAgentWise(params) {
//   return async (dispatch) => {

//     let url = endPoints.DASHBOARD_HELPDESK_AGENT_WISE;
//     console.log("getHelpdeskAgentWise url..", url);

//     let result = await serverCall(url, requestMethod.POST, params);
//     console.log("getHelpdeskAgentWise result..", result);

//     if (result.success) {
//       console.log("getHelpdeskAgentWise result success..", result);
//       dispatch(setHelpdeskAgentWiseData(result.data));
//     } else {
//       console.log("getHelpdeskAgentWise result failed..", result);
//       dispatch(setHelpdeskAgentWiseDataError(result));
//     }

//   };
// }


export async function getOperationalAssignedToMe(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_ASSIGNED_TO_ME;
    console.log("getOperationalAssignedToMe url..", url);
    console.log("getOperationalAssignedToMe params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalAssignedToMe result..", result);
    if (result.success) {
      console.log("getOperationalAssignedToMe result success..", result);
      dispatch(setOperationalAssignedToMeData(result.data));
    } else {
      console.log("getOperationalAssignedToMe result failed..", result);
      dispatch(setOperationalAssignedToMeErrorData(result));
    }
  };
}


export async function getOperationalAppointmentOverview(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_APPOINTMENT_OVERVIEW;
    console.log("getOperationalAppointmentOverview url..", url);
    console.log("getOperationalAppointmentOverview params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalAppointmentOverview result..", result);
    if (result.success) {
      console.log("getOperationalAppointmentOverview result success..", result);
      dispatch(setOperationalAppointmentOverviewData(result.data));
    } else {
      console.log("getOperationalAppointmentOverview result failed..", result);
      dispatch(setOperationalAppointmentOverviewErrorData(result));
    }
  };
}


export async function getOperationalTeamAppointmentOverview(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_APPOINTMENT_OVERVIEW;
    console.log("getOperationalTeamAppointmentOverview url..", url);
    console.log("getOperationalTeamAppointmentOverview params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalTeamAppointmentOverview result..", result);
    if (result.success) {
      console.log("getOperationalTeamAppointmentOverview result success..", result);
      dispatch(setOperationalTeamAppointmentOverviewData(result.data));
    } else {
      console.log("getOperationalTeamAppointmentOverview result failed..", result);
      dispatch(setOperationalTeamAppointmentOverviewErrorData(result));
    }
  };
}


export async function getOperationalPooledInteractions(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_POOLED_INTERACTIONS;
    console.log("getOperationalPooledInteractions url..", url);
    console.log("getOperationalPooledInteractions params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalPooledInteractions result..", result);
    if (result.success) {
      console.log("getOperationalPooledInteractions result success..", result);
      dispatch(setOperationalPooledInteractionsData(result.data));
    } else {
      console.log("getOperationalPooledInteractions result failed..", result);
      dispatch(setOperationalPooledInteractionsErrorData(result));
    }
  };
}


export async function getOperationalTeamPooledInteractions(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_TEAM_POOLED_INTERACTIONS;
    console.log("getOperationalTeamPooledInteractions url..", url);
    console.log("getOperationalTeamPooledInteractions params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalTeamPooledInteractions result..", result);
    if (result.success) {
      console.log("getOperationalTeamPooledInteractions result success..", result);
      dispatch(setOperationalTeamPooledInteractionsData(result.data));
    } else {
      console.log("getOperationalTeamPooledInteractions result failed..", result);
      dispatch(setOperationalTeamPooledInteractionsErrorData(result));
    }
  };
}


export async function getOperationalAssignedInteractions(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_ASSIGNED_INTERACTIONS;
    console.log("getOperationalAssignedInteractions url..", url);
    console.log("getOperationalAssignedInteractions params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalAssignedInteractions result..", result);
    if (result.success) {
      console.log("getOperationalAssignedInteractions result success..", result);
      dispatch(setOperationalAssignedInteractionsData(result.data));
    } else {
      console.log("getOperationalAssignedInteractions result failed..", result);
      dispatch(setOperationalAssignedInteractionsErrorData(result));
    }
  };
}


export async function getOperationalTeamAssignedInteractions(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_TEAM_ASSIGNED_INTERACTIONS;
    console.log("getOperationalTeamAssignedInteractions url..", url);
    console.log("getOperationalTeamAssignedInteractions params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalTeamAssignedInteractions result..", result);
    if (result.success) {
      console.log("getOperationalTeamAssignedInteractions result success..", result);
      dispatch(setOperationalTeamAssignedInteractionsData(result.data));
    } else {
      console.log("getOperationalTeamAssignedInteractions result failed..", result);
      dispatch(setOperationalTeamAssignedInteractionsErrorData(result));
    }
  };
}


export async function getOperationalInteractionHistoryGraph(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_INTERACTION_HISTORY_GRAPH;
    console.log("getOperationalInteractionHistoryGraph url..", url);
    console.log("getOperationalInteractionHistoryGraph params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalInteractionHistoryGraph result..", result);
    if (result.success) {
      console.log("getOperationalInteractionHistoryGraph result success..", result);
      dispatch(setOperationalInteractionHistoryGraphData(result.data));
    } else {
      console.log("getOperationalInteractionHistoryGraph result failed..", result);
      dispatch(setOperationalInteractionHistoryGraphErrorData(result));
    }
  };
}


export async function getOperationalInteractionHistoryGraphTeam(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_INTERACTION_HISTORY_GRAPH_TEAM;
    console.log("getOperationalInteractionHistoryGraphTeam url..", url);
    console.log("getOperationalInteractionHistoryGraphTeam params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getOperationalInteractionHistoryGraphTeam result..", result);
    if (result.success) {
      console.log("getOperationalInteractionHistoryGraphTeam result success..", result);
      dispatch(setOperationalInteractionHistoryGraphTeamData(result.data));
    } else {
      console.log("getOperationalInteractionHistoryGraphTeam result failed..", result);
      dispatch(setOperationalInteractionHistoryGraphTeamErrorData(result));
    }
  };
}


export async function getAssignedAppointments(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_ASSIGNED_APPOINTMENTS;
    console.log("getAssignedAppointments url..", url);
    console.log("getAssignedAppointments params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getAssignedAppointments result..", result);
    if (result.success) {
      console.log("getAssignedAppointments result success..", result);
      dispatch(setAssignedAppointmentsGraphData(result.data));
    } else {
      console.log("getAssignedAppointments result failed..", result);
      dispatch(setAssignedAppointmentsGraphErrorData(result));
    }
  };
}


export async function getTeamAssignedAppointments(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_TEAM_ASSIGNED_APPOINTMENTS;
    console.log("getTeamAssignedAppointments url..", url);
    console.log("getTeamAssignedAppointments params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getTeamAssignedAppointments result..", result);
    if (result.success) {
      console.log("getTeamAssignedAppointments result success..", result);
      dispatch(setTeamAssignedAppointmentsGraphData(result.data));
    } else {
      console.log("getTeamAssignedAppointments result failed..", result);
      dispatch(setTeamAssignedAppointmentsGraphErrorData(result));
    }
  };
}


export async function getInteractionPerformance(_params, _type) {
  return async (dispatch) => {
    let params = { searchParams: _params, type: _type }
    let url = endPoints.DASHBOARD_OPERATIONAL_INTXN_CATEGORY_PERFORMANCE;
    console.log("getInteractionPerformance url..", url);
    console.log("getInteractionPerformance params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getInteractionPerformance result..", result);
    if (result.success) {
      console.log("getInteractionPerformance result success..", result);
      dispatch(setIntxnPerformanceGraphData(result.data));
    } else {
      console.log("getInteractionPerformance result failed..", result);
      dispatch(setIntxnPerformanceGraphErrorData(result));
    }
  };
}


export async function getTopFivePerformanceActivityTeam(_params, _type) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_INTXN_TOP_FIVE_PERFORMANCE;
    console.log("getTopFivePerformanceActivityTeam url..", url);
    console.log("getTopFivePerformanceActivityTeam params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getTopFivePerformanceActivityTeam result..", result);
    if (result.success) {
      console.log("getTopFivePerformanceActivityTeam result success..", result);
      dispatch(setTopFivePerformanceData(result.data));
    } else {
      console.log("getTopFivePerformanceActivityTeam result failed..", result);
      dispatch(setTopFivePerformanceErrorData(result));
    }
  };
}


export async function getTopFivePerformanceChat(_params, _type) {
  return async (dispatch) => {
    let params = { searchParams: _params, type: _type }
    let url = endPoints.DASHBOARD_OPERATIONAL_INTXN_TOP_FIVE_PERFORMANCE_CHAT;
    console.log("getTopFivePerformanceChat url..", url);
    console.log("getTopFivePerformanceChat params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getTopFivePerformanceChat result..", result);
    if (result.success) {
      console.log("getTopFivePerformanceChat result success..", result);
      dispatch(setTopFivePerformanceChatData(result.data));
    } else {
      console.log("getTopFivePerformanceChat result failed..", result);
      dispatch(setTopFivePerformanceChatErrorData(result));
    }
  };
}


export async function getTeamCategoryPerformance(_params) {
  return async (dispatch) => {
    let params = { searchParams: _params }
    let url = endPoints.DASHBOARD_OPERATIONAL_TEAM_CATEGORY_PERFORMANCE;
    console.log("getTeamCategoryPerformance url..", url);
    console.log("getTeamCategoryPerformance params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getTeamCategoryPerformance result..", result);
    if (result.success) {
      console.log("getTeamCategoryPerformance result success..", result);
      dispatch(setTeamCategoryPerformanceData(result.data));
    } else {
      console.log("getTeamCategoryPerformance result failed..", result);
      dispatch(setTeamCategoryPerformanceErrorData(result));
    }
  };
}


export async function getUpcomingAppointments(params) {
  return async (dispatch) => {
    let url = endPoints.DASHBOARD_APPOINTMENT_GET_UPCOMING;
    console.log("getUpcomingAppointments url..", url);
    console.log("getUpcomingAppointments params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getUpcomingAppointments result..", result);
    if (result.success) {
      console.log("getUpcomingAppointments result success..", result);
      dispatch(setUpcomingAppointmentsData(result.data));
    } else {
      console.log("getUpcomingAppointments result failed..", result);
      dispatch(setUpcomingAppointmentsErrorData(result));
    }
  };
}



export async function getClosedAppointments(params) {
  return async (dispatch) => {
    let url = endPoints.DASHBOARD_APPOINTMENT_GET_CLOSED;
    console.log("getClosedAppointments url..", url);
    console.log("getClosedAppointments params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getClosedAppointments result..", result);
    if (result.success) {
      console.log("getClosedAppointments result success..", result);
      dispatch(setClosedAppointmentsData(result.data));
    } else {
      console.log("getClosedAppointments result failed..", result);
      dispatch(setClosedAppointmentsErrorData(result));
    }
  };
}



export async function getAppointmentEvents(params) {
  return async (dispatch) => {
    let url = endPoints.DASHBOARD_APPOINTMENT_GET_EVENTS;
    console.log("getAppointmentEvents url..", url);
    console.log("getAppointmentEvents params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getAppointmentEvents result..", result);
    if (result.success) {
      console.log("getAppointmentEvents result success..", result);
      dispatch(setAppointmentEventsData(result.data));
    } else {
      console.log("getAppointmentEvents result failed..", result);
      dispatch(setAppointmentEventsErrorData(result));
    }
  };
}



export async function getAppointmentReminder() {
  return async (dispatch) => {
    let params = { date: moment(new Date()).format("YYYY-MM-DD'T'HH:mm:ss.SSS'Z'") }
    let url = endPoints.DASHBOARD_APPOINTMENT_GET_REMINDER;
    console.log("getAppointmentReminder url..", url);
    console.log("getAppointmentReminder params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getAppointmentReminder result..", result);
    if (result.success) {
      console.log("getAppointmentReminder result success..", result);
      dispatch(setAppointmentRemindersData(result.data));
    } else {
      console.log("getAppointmentReminder result failed..", result);
      dispatch(setAppointmentRemindersErrorData(result));
    }
  };
}


export async function getAppointmentsBasedOnType(params) {
  return async (dispatch) => {
    let url = endPoints.DASHBOARD_APPOINTMENT_GET_APP_BASED_ON_TYPE;
    console.log("getAppointmentsBasedOnType url..", url);
    console.log("getAppointmentsBasedOnType params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getAppointmentsBasedOnType result..", result);
    if (result.success) {
      console.log("getAppointmentsBasedOnType result success..", result);
      dispatch(setTypeBasedAppData(result.data));
    } else {
      console.log("getAppointmentsBasedOnType result failed..", result);
      dispatch(setTypeBasedAppErrorData(result));
    }
  };
}



export async function getAppointmentPerformance(params) {
  return async (dispatch) => {
    let url = endPoints.DASHBOARD_APPOINTMENT_GET_PERFORMANCE;
    console.log("getAppointmentPerformance url..", url);
    console.log("getAppointmentPerformance params..", params);
    let result = await serverCall(url, requestMethod.POST, params);
    console.log("getAppointmentPerformance result..", result);
    if (result.success) {
      console.log("getAppointmentPerformance result success..", result);
      dispatch(setAppPerformanceData(result.data));
    } else {
      console.log("getAppointmentPerformance result failed..", result);
      dispatch(setAppPerformanceErrorData(result));
    }
  };
}