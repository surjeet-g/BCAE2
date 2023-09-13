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
  HELPDESK_PROJECT_WISE_DATA,
  HELPDESK_PROJECT_WISE_DATA_ERROR,
  HELPDESK_SUMMARY_DATA,
  HELPDESK_SUMMARY_DATA_ERROR,
  MONTHLY_TREND_DATA,
  MONTHLY_TREND_DATA_ERROR,
  SUPPORT_TTK_PENDING_DATA,
  SUPPORT_TTK_PENDING_DATA_ERROR
} from "./AppointmentDashboardAction";

const appointmentDashboardInitialState = {
  initAppointmentDashboard: false,
  isAppointmentDashboardError: false,
  appointmentDashboardData: {},
  helpdeskSummaryData: {},
  helpdeskSummaryDataError: {},
  supportTtkPendingData: {},
  supportTtkPendingDataError: {},
  monthlyTrendData: {},
  monthlyTrendDataError: {},
  helpdeskByStatusData: {},
  helpdeskByStatusDataError: {},
  helpdeskByAgeingData: {},
  helpdeskByAgeingDataError: {},
  helpdeskBySeverityData: {},
  helpdeskBySeverityDataError: {},
  helpdeskProjectWiseData: {},
  helpdeskProjectWiseDataError: {},
  helpdeskAgentWiseData: {},
  helpdeskAgentWiseDataError: {},
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



    default:
      return state;
  }
};
export default AppointmentDashboardReducer;
