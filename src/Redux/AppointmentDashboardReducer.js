import {
  APPOINTMENT_DASHBOARD_DATA,
  APPOINTMENT_DASHBOARD_ERROR,
  APPOINTMENT_DASHBOARD_INIT,
  HELPDESK_AGENT_WISE_DATA,
  HELPDESK_AGENT_WISE_DATA_ERROR,
  HELPDESK_BY_AGEING_DATA,
  HELPDESK_BY_AGEING_DATA_ERROR,
  HELPDESK_BY_SEVERITY_DATA,
  HELPDESK_BY_SEVERITY_DATA_ERROR,
  HELPDESK_BY_STATUS_DATA,
  HELPDESK_BY_STATUS_DATA_ERROR,
  HELPDESK_BY_STATUS_LIST_DATA,
  HELPDESK_BY_STATUS_LIST_DATA_ERROR,
  HELPDESK_BY_STATUS_LIST_DATA_ERROR_LIVE,
  HELPDESK_BY_STATUS_LIST_DATA_LIVE,
  HELPDESK_BY_TYPE_DATA_ERROR_LIVE,
  HELPDESK_BY_TYPE_DATA_LIVE,
  HELPDESK_PROJECT_WISE_DATA,
  HELPDESK_PROJECT_WISE_DATA_ERROR,
  HELPDESK_PROJECT_WISE_DATA_ERROR_LIVE,
  HELPDESK_PROJECT_WISE_DATA_LIVE,
  HELPDESK_SUMMARY_CLARIFICATION_DATA,
  HELPDESK_SUMMARY_CLARIFICATION_DATA_ERROR,
  HELPDESK_SUMMARY_DATA,
  HELPDESK_SUMMARY_DATA_ERROR,
  HELPDESK_SUMMARY_INCIDENT_DATA,
  HELPDESK_SUMMARY_INCIDENT_DATA_ERROR,
  HELPDESK_SUMMARY_SERVICE_REQUEST_DATA,
  HELPDESK_SUMMARY_SERVICE_REQUEST_DATA_ERROR,
  HELPDESK_SUMMARY_UNCLASSIFIED_DATA,
  HELPDESK_SUMMARY_UNCLASSIFIED_DATA_ERROR,
  INTERACTION_AGENT_WISE_DATA,
  INTERACTION_AGENT_WISE_DATA_ERROR,
  INTERACTION_AGENT_WISE_LIST_DATA,
  INTERACTION_AGENT_WISE_LIST_DATA_ERROR,
  INTERACTION_BY_AGEING_DATA,
  INTERACTION_BY_AGEING_DATA_ERROR,
  INTERACTION_BY_AGEING_FIVE_DAYS_DATA,
  INTERACTION_BY_AGEING_FIVE_DAYS_DATA_ERROR,
  INTERACTION_BY_AGEING_MORE_FIVE_DAYS_DATA,
  INTERACTION_BY_AGEING_MORE_FIVE_DAYS_DATA_ERROR,
  INTERACTION_BY_AGEING_THREE_DAYS_DATA,
  INTERACTION_BY_AGEING_THREE_DAYS_DATA_ERROR,
  INTERACTION_BY_AVG_WISE,
  INTERACTION_BY_AVG_WISE_ERROR,
  INTERACTION_BY_CATEGORY_DATA,
  INTERACTION_BY_CATEGORY_DATA_ERROR,
  INTERACTION_BY_CHANNEL_WISE_DATA,
  INTERACTION_BY_CHANNEL_WISE_DATA_ERROR,
  INTERACTION_BY_CUSTOMER_WISE_DATA,
  INTERACTION_BY_CUSTOMER_WISE_DATA_ERROR,
  INTERACTION_BY_DEPARTMENT,
  INTERACTION_BY_DEPARTMENT_ERROR,
  INTERACTION_BY_DEPARTMENT_VS_ROLES,
  INTERACTION_BY_DEPARTMENT_VS_ROLES_ERROR,
  INTERACTION_BY_FOLLOW_UPS_DATA,
  INTERACTION_BY_FOLLOW_UPS_DATA_ERROR,
  INTERACTION_BY_FOLLOW_UPS_FIVE_DAYS_DATA,
  INTERACTION_BY_FOLLOW_UPS_FIVE_DAYS_DATA_ERROR,
  INTERACTION_BY_FOLLOW_UPS_MORE_FIVE_DAYS_DATA,
  INTERACTION_BY_FOLLOW_UPS_MORE_FIVE_DAYS_DATA_ERROR,
  INTERACTION_BY_FOLLOW_UPS_THREE_DAYS_DATA,
  INTERACTION_BY_FOLLOW_UPS_THREE_DAYS_DATA_ERROR,
  INTERACTION_BY_LIVE_CUSTOMER_WISE_DATA,
  INTERACTION_BY_LIVE_CUSTOMER_WISE_DATA_ERROR,
  INTERACTION_BY_LIVE_PRIORITY_DATA,
  INTERACTION_BY_LIVE_PRIORITY_DATA_ERROR,
  INTERACTION_BY_LIVE_PROJECT_WISE_DATA,
  INTERACTION_BY_LIVE_PROJECT_WISE_DATA_ERROR,
  INTERACTION_BY_LOCATION_WISE_DATA,
  INTERACTION_BY_LOCATION_WISE_DATA_ERROR,
  INTERACTION_BY_NPS_CSAT_CHAMP,
  INTERACTION_BY_NPS_CSAT_CHAMP_ERROR,
  INTERACTION_BY_PRIORITY_DATA,
  INTERACTION_BY_PRIORITY_DATA_ERROR,
  INTERACTION_BY_PRIORITY_HIGH_DATA,
  INTERACTION_BY_PRIORITY_HIGH_DATA_ERROR,
  INTERACTION_BY_PRIORITY_LOW_DATA,
  INTERACTION_BY_PRIORITY_LOW_DATA_ERROR,
  INTERACTION_BY_PRIORITY_MEDIUM_DATA,
  INTERACTION_BY_PRIORITY_MEDIUM_DATA_ERROR,
  INTERACTION_BY_PRIORITY_STATUS_WISE,
  INTERACTION_BY_PRIORITY_STATUS_WISE_ERROR,
  INTERACTION_BY_PRIORITY_STATUS_WISE_LIST,
  INTERACTION_BY_PRIORITY_STATUS_WISE_LIST_ERROR,
  INTERACTION_BY_RES_MTTR_WAITING,
  INTERACTION_BY_RES_MTTR_WAITING_ERROR,
  INTERACTION_BY_SERVICE_CATEGORY_DATA,
  INTERACTION_BY_SERVICE_CATEGORY_DATA_ERROR,
  INTERACTION_BY_SERVICE_TYPE_DATA,
  INTERACTION_BY_SERVICE_TYPE_DATA_ERROR,
  INTERACTION_BY_STATEMENT_WISE_DATA,
  INTERACTION_BY_STATEMENT_WISE_DATA_ERROR,
  INTERACTION_BY_STATUS_LIVE_LIST,
  INTERACTION_BY_STATUS_LIVE_LIST_ERROR,
  INTERACTION_BY_STATUS_WISE_COUNT_DATA,
  INTERACTION_BY_STATUS_WISE_COUNT_DATA_ERROR,
  INTERACTION_BY_TYPE_DATA,
  INTERACTION_BY_TYPE_DATA_ERROR,
  INTERACTION_LIVE_BY_STATUS,
  INTERACTION_LIVE_BY_STATUS_ERROR,
  INTERACTION_LIVE_BY_STATUS_LIST,
  INTERACTION_LIVE_BY_STATUS_LIST_ERROR,
  INTERACTION_LIVE_BY_STATUS_LIST_TWO,
  INTERACTION_LIVE_BY_STATUS_LIST_TWO_ERROR,
  INTERACTION_MANAGERS_LIST_DATA,
  INTERACTION_MANAGERS_LIST_DATA_ERROR,
  INTERACTION_PROJECT_WISE_DATA,
  INTERACTION_PROJECT_WISE_DATA_ERROR,
  INTERACTION_PROJECT_WISE_LIST_DATA,
  INTERACTION_PROJECT_WISE_LIST_DATA_ERROR,
  MONTHLY_TREND_DATA,
  MONTHLY_TREND_DATA_ERROR,
  SUPPORT_TTK_PENDING_DATA,
  SUPPORT_TTK_PENDING_DATA_COUNTS,
  SUPPORT_TTK_PENDING_DATA_COUNTS_ERROR,
  SUPPORT_TTK_PENDING_DATA_ERROR
} from "./AppointmentDashboardAction";

const appointmentDashboardInitialState = {
  initAppointmentDashboard: false,
  isAppointmentDashboardError: false,
  appointmentDashboardData: {},
  helpdeskSummaryData: {},
  helpdeskSummaryDataError: {},
  helpdeskSummaryClarificationData: {},
  helpdeskSummaryClarificationDataError: {},
  helpdeskSummaryIncidentData: {},
  helpdeskSummaryIncidentDataError: {},
  helpdeskSummaryServiceRequestData: {},
  helpdeskSummaryServiceRequestDataError: {},
  helpdeskSummaryUnclassifiedData: {},
  helpdeskSummaryUnclassifiedDataError: {},
  supportTtkPendingDataCounts: {},
  supportTtkPendingDataCountsError: {},
  supportTtkPendingData: {},
  supportTtkPendingDataError: {},
  monthlyTrendData: {},
  monthlyTrendDataError: {},
  helpdeskByStatusData: {},
  helpdeskByStatusDataError: {},
  helpdeskByStatusListData: {},
  helpdeskByStatusListDataError: {},
  helpdeskByStatusListDataLive: {},
  helpdeskByStatusListDataErrorLive: {},
  helpdeskByTypeDataLive: {},
  helpdeskByTypeDataErrorLive: {},
  helpdeskByAgeingData: {},
  helpdeskByAgeingDataError: {},
  helpdeskBySeverityData: {},
  helpdeskBySeverityDataError: {},
  helpdeskProjectWiseData: {},
  helpdeskProjectWiseDataError: {},
  helpdeskAgentWiseData: {},
  helpdeskAgentWiseDataError: {},

  statementWiseData: {},
  statementWiseDataError: {},
  statusWiseCountData: {},
  statusWiseCountDataError: {},
  channelWiseData: {},
  channelWiseDataError: {},
  customerWiseData: {},
  customerWiseDataError: {},
  liveCustomerWiseData: {},
  liveCustomerWiseDataError: {},
  liveProjectWiseData: {},
  liveProjectWiseDataError: {},
  locationWiseData: {},
  locationWiseDataError: {},
  departmentInteractionsData: {},
  departmentInteractionsDataError: {},
  departmentVsRolesInteractionsData: {},
  departmentVsRolesInteractionsDataError: {},
  npsCsatChampData: {},
  npsCsatChampDataError: {},
  resMttrWaitingData: {},
  resMttrWaitingDataError: {},
  liveInteractionsByStatusData: {},
  liveInteractionsByStatusDataError: {},
  interactionsByStatusListData: {},
  interactionsByStatusListDataError: {},
  interactionsByStatusListDataTwo: {},
  interactionsByStatusListDataTwoError: {},
  interactionsByStatusLiveListData: {},
  interactionsByStatusLiveListDataError: {},
  interactionAvgWiseData: {},
  interactionAvgWiseDataError: {},
  interactionByPriorityStatusWiseData: {},
  interactionByPriorityStatusWiseDataError: {},
  interactionByPriorityStatusWiseListData: {},
  interactionByPriorityStatusWiseListDataError: {},
  managersListData: {},
  managersListDataError: {},
  interactionByPriorityData: {},
  interactionByPriorityDataError: {},
  interactionByLivePriorityData: {},
  interactionByLivePriorityDataError: {},
  interactionByPriorityHighData: {},
  interactionByPriorityHighDataError: {},
  interactionByPriorityLowData: {},
  interactionByPriorityLowDataError: {},
  interactionByPriorityMediumData: {},
  interactionByPriorityMediumDataError: {},
  interactionByAgeingData: {},
  interactionByAgeingDataError: {},
  interactionByAgeingThreeDaysData: {},
  interactionByAgeingThreeDaysDataError: {},
  interactionByAgeingFiveDaysData: {},
  interactionByAgeingFiveDaysDataError: {},
  interactionByAgeingMoreFiveDaysData: {},
  interactionByAgeingMoreFiveDaysDataError: {},
  interactionByFollowupsData: {},
  interactionByFollowupsDataError: {},
  interactionByFollowupsThreeDaysData: {},
  interactionByFollowupsThreeDaysDataError: {},
  interactionByFollowupsFiveDaysData: {},
  interactionByFollowupsFiveDaysDataError: {},
  interactionByFollowupsMoreFiveDaysData: {},
  interactionByFollowupsMoreFiveDaysDataError: {},
  interactionByCategoryData: {},
  interactionByCategoryDataError: {},
  interactionByTypeData: {},
  interactionByTypeDataError: {},
  interactionByServiceCategoryData: {},
  interactionByServiceCategoryDataError: {},
  interactionByServiceTypeData: {},
  interactionByServiceTypeDataError: {},
  interactionByProjectWiseData: {},
  interactionByProjectWiseDataError: {},
  interactionByProjectWiseListData: {},
  interactionByProjectWiseListDataError: {},
  interactionByAgentWiseData: {},
  interactionByAgentWiseDataError: {},
  interactionByAgentWiseListData: {},
  interactionByAgentWiseListDataError: {}
};

const AppointmentDashboardReducer = (
  state = appointmentDashboardInitialState,
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DASHBOARD_INIT:
      return {
        ...state,
        initAppointmentDashboard: true,
        isAppointmentDashboardError: false,
        appointmentDashboardData: {},
      };

    case APPOINTMENT_DASHBOARD_ERROR:
      return {
        ...state,
        initAppointmentDashboard: true,
        isAppointmentDashboardError: true,
        appointmentDashboardData: action.data,
      };

    case APPOINTMENT_DASHBOARD_DATA:
      return {
        ...state,
        initAppointmentDashboard: false,
        isAppointmentDashboardError: false,
        appointmentDashboardData: action.data,
      };







    case HELPDESK_SUMMARY_DATA:
      return {
        ...state,
        helpdeskSummaryData: action.data,
      };

    case HELPDESK_SUMMARY_DATA_ERROR:
      return {
        ...state,
        helpdeskSummaryDataError: action.data,
      };


    case HELPDESK_SUMMARY_CLARIFICATION_DATA:
      return {
        ...state,
        helpdeskSummaryClarificationData: action.data,
      };

    case HELPDESK_SUMMARY_CLARIFICATION_DATA_ERROR:
      return {
        ...state,
        helpdeskSummaryClarificationDataError: action.data,
      };



    case HELPDESK_SUMMARY_INCIDENT_DATA:
      return {
        ...state,
        helpdeskSummaryIncidentData: action.data,
      };

    case HELPDESK_SUMMARY_INCIDENT_DATA_ERROR:
      return {
        ...state,
        helpdeskSummaryIncidentDataError: action.data,
      };



    case HELPDESK_SUMMARY_SERVICE_REQUEST_DATA:
      return {
        ...state,
        helpdeskSummaryServiceRequestData: action.data,
      };

    case HELPDESK_SUMMARY_SERVICE_REQUEST_DATA_ERROR:
      return {
        ...state,
        helpdeskSummaryServiceRequestDataError: action.data,
      };



    case HELPDESK_SUMMARY_UNCLASSIFIED_DATA:
      return {
        ...state,
        helpdeskSummaryUnclassifiedData: action.data,
      };

    case HELPDESK_SUMMARY_UNCLASSIFIED_DATA_ERROR:
      return {
        ...state,
        helpdeskSummaryUnclassifiedDataError: action.data,
      };



    case SUPPORT_TTK_PENDING_DATA_COUNTS:
      return {
        ...state,
        supportTtkPendingCountsData: action.data,
      };

    case SUPPORT_TTK_PENDING_DATA_COUNTS_ERROR:
      return {
        ...state,
        supportTtkPendingCountsDataError: action.data,
      };


    case SUPPORT_TTK_PENDING_DATA:
      return {
        ...state,
        supportTtkPendingData: action.data,
      };

    case SUPPORT_TTK_PENDING_DATA_ERROR:
      return {
        ...state,
        supportTtkPendingDataError: action.data,
      };



    case MONTHLY_TREND_DATA:
      return {
        ...state,
        supportMonthlyTrendData: action.data,
      };

    case MONTHLY_TREND_DATA_ERROR:
      return {
        ...state,
        supportMonthlyTrendDataError: action.data,
      };



    case HELPDESK_BY_STATUS_DATA:
      return {
        ...state,
        helpdeskByStatusData: action.data,
      };

    case HELPDESK_BY_STATUS_DATA_ERROR:
      return {
        ...state,
        helpdeskByStatusDataError: action.data,
      };



    case HELPDESK_BY_STATUS_LIST_DATA:
      return {
        ...state,
        helpdeskByStatusListData: action.data,
      };

    case HELPDESK_BY_STATUS_LIST_DATA_ERROR:
      return {
        ...state,
        helpdeskByStatusListDataError: action.data,
      };


    case HELPDESK_BY_STATUS_LIST_DATA_LIVE:
      return {
        ...state,
        helpdeskByStatusListDataLive: action.data,
      };

    case HELPDESK_BY_STATUS_LIST_DATA_ERROR_LIVE:
      return {
        ...state,
        helpdeskByStatusListDataErrorLive: action.data,
      };



    case HELPDESK_BY_TYPE_DATA_LIVE:
      return {
        ...state,
        helpdeskByTypeDataLive: action.data,
      };

    case HELPDESK_BY_TYPE_DATA_ERROR_LIVE:
      return {
        ...state,
        helpdeskByTypeDataErrorLive: action.data,
      };



    case HELPDESK_BY_AGEING_DATA:
      return {
        ...state,
        helpdeskByAgeingData: action.data,
      };

    case HELPDESK_BY_AGEING_DATA_ERROR:
      return {
        ...state,
        helpdeskByAgeingDataError: action.data,
      };



    case HELPDESK_BY_SEVERITY_DATA:
      return {
        ...state,
        helpdeskBySeverityData: action.data,
      };

    case HELPDESK_BY_SEVERITY_DATA_ERROR:
      return {
        ...state,
        helpdeskBySeverityDataError: action.data,
      };



    case HELPDESK_PROJECT_WISE_DATA:
      return {
        ...state,
        helpdeskProjectWiseData: action.data,
      };

    case HELPDESK_PROJECT_WISE_DATA_ERROR:
      return {
        ...state,
        helpdeskProjectWiseDataError: action.data,
      };


    case HELPDESK_PROJECT_WISE_DATA_LIVE:
      return {
        ...state,
        helpdeskProjectWiseDataLive: action.data,
      };

    case HELPDESK_PROJECT_WISE_DATA_ERROR_LIVE:
      return {
        ...state,
        helpdeskProjectWiseDataErrorLive: action.data,
      };



    case HELPDESK_AGENT_WISE_DATA:
      return {
        ...state,
        helpdeskAgentWiseData: action.data,
      };

    case HELPDESK_AGENT_WISE_DATA_ERROR:
      return {
        ...state,
        helpdeskAgentWiseDataError: action.data,
      };





    case INTERACTION_BY_STATEMENT_WISE_DATA:
      return {
        ...state,
        statementWiseData: action.data,
      };

    case INTERACTION_BY_STATEMENT_WISE_DATA_ERROR:
      return {
        ...state,
        statementWiseDataError: action.data,
      };



    case INTERACTION_BY_STATUS_WISE_COUNT_DATA:
      return {
        ...state,
        statusWiseCountData: action.data,
      };

    case INTERACTION_BY_STATUS_WISE_COUNT_DATA_ERROR:
      return {
        ...state,
        statusWiseCountDataError: action.data,
      };



    case INTERACTION_BY_CHANNEL_WISE_DATA:
      return {
        ...state,
        channelWiseData: action.data,
      };

    case INTERACTION_BY_CHANNEL_WISE_DATA_ERROR:
      return {
        ...state,
        channelWiseDataError: action.data,
      };



    case INTERACTION_BY_CUSTOMER_WISE_DATA:
      return {
        ...state,
        customerWiseData: action.data,
      };

    case INTERACTION_BY_CUSTOMER_WISE_DATA_ERROR:
      return {
        ...state,
        customerWiseDataError: action.data,
      };



    case INTERACTION_BY_LIVE_CUSTOMER_WISE_DATA:
      return {
        ...state,
        liveCustomerWiseData: action.data,
      };

    case INTERACTION_BY_LIVE_CUSTOMER_WISE_DATA_ERROR:
      return {
        ...state,
        liveCustomerWiseDataError: action.data,
      };



    case INTERACTION_BY_LIVE_PROJECT_WISE_DATA:
      return {
        ...state,
        liveProjectWiseData: action.data,
      };

    case INTERACTION_BY_LIVE_PROJECT_WISE_DATA_ERROR:
      return {
        ...state,
        liveProjectWiseDataError: action.data,
      };



    case INTERACTION_BY_LOCATION_WISE_DATA:
      return {
        ...state,
        locationWiseData: action.data,
      };

    case INTERACTION_BY_LOCATION_WISE_DATA_ERROR:
      return {
        ...state,
        locationWiseDataError: action.data,
      };



    case INTERACTION_BY_DEPARTMENT:
      return {
        ...state,
        departmentInteractionsData: action.data,
      };

    case INTERACTION_BY_DEPARTMENT_ERROR:
      return {
        ...state,
        departmentInteractionsDataError: action.data,
      };



    case INTERACTION_BY_DEPARTMENT_VS_ROLES:
      return {
        ...state,
        departmentVsRolesInteractionsData: action.data,
      };

    case INTERACTION_BY_DEPARTMENT_VS_ROLES_ERROR:
      return {
        ...state,
        departmentVsRolesInteractionsDataError: action.data,
      };



    case INTERACTION_BY_NPS_CSAT_CHAMP:
      return {
        ...state,
        npsCsatChampData: action.data,
      };

    case INTERACTION_BY_NPS_CSAT_CHAMP_ERROR:
      return {
        ...state,
        npsCsatChampDataError: action.data,
      };



    case INTERACTION_BY_RES_MTTR_WAITING:
      return {
        ...state,
        resMttrWaitingData: action.data,
      };

    case INTERACTION_BY_RES_MTTR_WAITING_ERROR:
      return {
        ...state,
        resMttrWaitingDataError: action.data,
      };



    case INTERACTION_LIVE_BY_STATUS:
      return {
        ...state,
        liveInteractionsByStatusData: action.data,
      };

    case INTERACTION_LIVE_BY_STATUS_ERROR:
      return {
        ...state,
        liveInteractionsByStatusDataError: action.data,
      };



    case INTERACTION_LIVE_BY_STATUS_LIST:
      return {
        ...state,
        interactionsByStatusListData: action.data,
      };

    case INTERACTION_LIVE_BY_STATUS_LIST_ERROR:
      return {
        ...state,
        interactionsByStatusListDataError: action.data,
      };



    case INTERACTION_BY_STATUS_LIVE_LIST:
      return {
        ...state,
        interactionsByStatusLiveListData: action.data,
      };

    case INTERACTION_BY_STATUS_LIVE_LIST_ERROR:
      return {
        ...state,
        interactionsByStatusLiveListDataError: action.data,
      };



    case INTERACTION_LIVE_BY_STATUS_LIST_TWO:
      return {
        ...state,
        interactionsByStatusListDataTwo: action.data,
      };

    case INTERACTION_LIVE_BY_STATUS_LIST_TWO_ERROR:
      return {
        ...state,
        interactionsByStatusListDataErrorTwo: action.data,
      };



    case INTERACTION_BY_AVG_WISE:
      return {
        ...state,
        interactionAvgWiseData: action.data,
      };

    case INTERACTION_BY_AVG_WISE_ERROR:
      return {
        ...state,
        interactionAvgWiseDataError: action.data,
      };



    case INTERACTION_BY_PRIORITY_STATUS_WISE:
      return {
        ...state,
        interactionByPriorityStatusWiseData: action.data,
      };

    case INTERACTION_BY_PRIORITY_STATUS_WISE_ERROR:
      return {
        ...state,
        interactionByPriorityStatusWiseDataError: action.data,
      };



    case INTERACTION_BY_PRIORITY_STATUS_WISE_LIST:
      return {
        ...state,
        interactionByPriorityStatusWiseListData: action.data,
      };

    case INTERACTION_BY_PRIORITY_STATUS_WISE_LIST_ERROR:
      return {
        ...state,
        interactionByPriorityStatusWiseListDataError: action.data,
      };



    case INTERACTION_MANAGERS_LIST_DATA:
      return {
        ...state,
        managersListData: action.data,
      };

    case INTERACTION_MANAGERS_LIST_DATA_ERROR:
      return {
        ...state,
        managersListDataError: action.data,
      };



    case INTERACTION_BY_PRIORITY_DATA:
      return {
        ...state,
        interactionByPriorityData: action.data,
      };

    case INTERACTION_BY_PRIORITY_DATA_ERROR:
      return {
        ...state,
        interactionByPriorityDataError: action.data,
      };



    case INTERACTION_BY_LIVE_PRIORITY_DATA:
      return {
        ...state,
        interactionByLivePriorityData: action.data,
      };

    case INTERACTION_BY_LIVE_PRIORITY_DATA_ERROR:
      return {
        ...state,
        interactionByLivePriorityDataError: action.data,
      };



    case INTERACTION_BY_PRIORITY_HIGH_DATA:
      return {
        ...state,
        interactionByPriorityHighData: action.data,
      };

    case INTERACTION_BY_PRIORITY_HIGH_DATA_ERROR:
      return {
        ...state,
        interactionByPriorityHighDataError: action.data,
      };



    case INTERACTION_BY_PRIORITY_LOW_DATA:
      return {
        ...state,
        interactionByPriorityLowData: action.data,
      };

    case INTERACTION_BY_PRIORITY_LOW_DATA_ERROR:
      return {
        ...state,
        interactionByPriorityLowDataError: action.data,
      };



    case INTERACTION_BY_PRIORITY_MEDIUM_DATA:
      return {
        ...state,
        interactionByPriorityMediumData: action.data,
      };

    case INTERACTION_BY_PRIORITY_MEDIUM_DATA_ERROR:
      return {
        ...state,
        interactionByPriorityMediumDataError: action.data,
      };



    case INTERACTION_BY_AGEING_DATA:
      return {
        ...state,
        interactionByAgeingData: action.data,
      };

    case INTERACTION_BY_AGEING_DATA_ERROR:
      return {
        ...state,
        interactionByAgeingDataError: action.data,
      };




    case INTERACTION_BY_AGEING_THREE_DAYS_DATA:
      return {
        ...state,
        interactionByAgeingThreeDaysData: action.data,
      };

    case INTERACTION_BY_AGEING_THREE_DAYS_DATA_ERROR:
      return {
        ...state,
        interactionByAgeingThreeDaysDataError: action.data,
      };



    case INTERACTION_BY_AGEING_FIVE_DAYS_DATA:
      return {
        ...state,
        interactionByAgeingFiveDaysData: action.data,
      };

    case INTERACTION_BY_AGEING_FIVE_DAYS_DATA_ERROR:
      return {
        ...state,
        interactionByAgeingFiveDaysDataError: action.data,
      };



    case INTERACTION_BY_AGEING_MORE_FIVE_DAYS_DATA:
      return {
        ...state,
        interactionByAgeingMoreFiveDaysData: action.data,
      };

    case INTERACTION_BY_AGEING_MORE_FIVE_DAYS_DATA_ERROR:
      return {
        ...state,
        interactionByAgeingMoreFiveDaysDataError: action.data,
      };



    case INTERACTION_BY_FOLLOW_UPS_DATA:
      return {
        ...state,
        interactionByFollowupsData: action.data,
      };

    case INTERACTION_BY_FOLLOW_UPS_DATA_ERROR:
      return {
        ...state,
        interactionByFollowupsDataError: action.data,
      };



    case INTERACTION_BY_FOLLOW_UPS_THREE_DAYS_DATA:
      return {
        ...state,
        interactionByFollowupsThreeDaysData: action.data,
      };

    case INTERACTION_BY_FOLLOW_UPS_THREE_DAYS_DATA_ERROR:
      return {
        ...state,
        interactionByFollowupsThreeDaysDataError: action.data,
      };



    case INTERACTION_BY_FOLLOW_UPS_FIVE_DAYS_DATA:
      return {
        ...state,
        interactionByFollowupsFiveDaysData: action.data,
      };

    case INTERACTION_BY_FOLLOW_UPS_FIVE_DAYS_DATA_ERROR:
      return {
        ...state,
        interactionByFollowupsFiveDaysDataError: action.data,
      };



    case INTERACTION_BY_FOLLOW_UPS_MORE_FIVE_DAYS_DATA:
      return {
        ...state,
        interactionByFollowupsMoreFiveDaysData: action.data,
      };

    case INTERACTION_BY_FOLLOW_UPS_MORE_FIVE_DAYS_DATA_ERROR:
      return {
        ...state,
        interactionByFollowupsMoreFiveDaysDataError: action.data,
      };



    case INTERACTION_BY_CATEGORY_DATA:
      return {
        ...state,
        interactionByCategoryData: action.data,
      };

    case INTERACTION_BY_CATEGORY_DATA_ERROR:
      return {
        ...state,
        interactionByCategoryDataError: action.data,
      };



    case INTERACTION_BY_TYPE_DATA:
      return {
        ...state,
        interactionByTypeData: action.data,
      };

    case INTERACTION_BY_TYPE_DATA_ERROR:
      return {
        ...state,
        interactionByTypeDataError: action.data,
      };



    case INTERACTION_BY_SERVICE_CATEGORY_DATA:
      return {
        ...state,
        interactionByServiceCategoryData: action.data,
      };

    case INTERACTION_BY_SERVICE_CATEGORY_DATA_ERROR:
      return {
        ...state,
        interactionByServiceCategoryDataError: action.data,
      };



    case INTERACTION_PROJECT_WISE_DATA:
      return {
        ...state,
        interactionByProjectWiseData: action.data,
      };

    case INTERACTION_PROJECT_WISE_DATA_ERROR:
      return {
        ...state,
        interactionByProjectWiseDataError: action.data,
      };



    case INTERACTION_PROJECT_WISE_LIST_DATA:
      return {
        ...state,
        interactionByProjectWiseListData: action.data,
      };

    case INTERACTION_PROJECT_WISE_LIST_DATA_ERROR:
      return {
        ...state,
        interactionByProjectWiseListDataError: action.data,
      };



    case INTERACTION_AGENT_WISE_DATA:
      return {
        ...state,
        interactionByAgentWiseData: action.data,
      };

    case INTERACTION_AGENT_WISE_DATA_ERROR:
      return {
        ...state,
        interactionByAgentWiseDataError: action.data,
      };



    case INTERACTION_AGENT_WISE_LIST_DATA:
      return {
        ...state,
        interactionByAgentWiseListData: action.data,
      };

    case INTERACTION_AGENT_WISE_LIST_DATA_ERROR:
      return {
        ...state,
        interactionByAgentWiseListDataError: action.data,
      };



    case INTERACTION_BY_SERVICE_TYPE_DATA:
      return {
        ...state,
        interactionByServiceTypeData: action.data,
      };

    case INTERACTION_BY_SERVICE_TYPE_DATA_ERROR:
      return {
        ...state,
        interactionByServiceTypeDataError: action.data,
      };



    default:
      return state;
  }
};
export default AppointmentDashboardReducer;
