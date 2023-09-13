export const APPOINTMENT_DASHBOARD_INIT = "APPOINTMENT_DASHBOARD_INIT";
export const APPOINTMENT_DASHBOARD_DATA = "APPOINTMENT_DASHBOARD_DATA";
export const APPOINTMENT_DASHBOARD_ERROR = "APPOINTMENT_DASHBOARD_ERROR";


export const HELPDESK_SUMMARY_DATA = "HELPDESK_SUMMARY_DATA";
export const HELPDESK_SUMMARY_DATA_ERROR = "HELPDESK_SUMMARY_DATA_ERROR";

export const SUPPORT_TTK_PENDING_DATA = "SUPPORT_TTK_PENDING_DATA";
export const SUPPORT_TTK_PENDING_DATA_ERROR = "SUPPORT_TTK_PENDING_DATA_ERROR";

export const MONTHLY_TREND_DATA = "MONTHLY_TREND_DATA";
export const MONTHLY_TREND_DATA_ERROR = "MONTHLY_TREND_DATA_ERROR";


export const HELPDESK_BY_STATUS_DATA = "HELPDESK_BY_STATUS_DATA";
export const HELPDESK_BY_STATUS_DATA_ERROR = "HELPDESK_BY_STATUS_DATA_ERROR";


export const HELPDESK_BY_AGEING_DATA = "HELPDESK_BY_AGEING_DATA";
export const HELPDESK_BY_AGEING_DATA_ERROR = "HELPDESK_BY_AGEING_DATA_ERROR";


export const HELPDESK_BY_SEVERITY_DATA = "HELPDESK_BY_SEVERITY_DATA";
export const HELPDESK_BY_SEVERITY_DATA_ERROR = "HELPDESK_BY_SEVERITY_DATA_ERROR";


export const HELPDESK_PROJECT_WISE_DATA = "HELPDESK_PROJECT_WISE_DATA";
export const HELPDESK_PROJECT_WISE_DATA_ERROR = "HELPDESK_PROJECT_WISE_DATA_ERROR";


export const HELPDESK_AGENT_WISE_DATA = "HELPDESK_AGENT_WISE_DATA";
export const HELPDESK_AGENT_WISE_DATA_ERROR = "HELPDESK_AGENT_WISE_DATA_ERROR";



export const initAppointmentDashboardData = () => {
  return { type: APPOINTMENT_DASHBOARD_INIT };
};

export const setAppointmentDashboardData = (data) => {
  return { type: APPOINTMENT_DASHBOARD_DATA, data };
};

export const setAppointmentDashboardError = (data) => {
  return { type: APPOINTMENT_DASHBOARD_ERROR, data };
};





export const setHelpdeskSummaryData = (data) => {
  return { type: HELPDESK_SUMMARY_DATA, data };
};

export const setHelpdeskSummaryDataError = (data) => {
  return { type: HELPDESK_SUMMARY_DATA_ERROR, data };
};



export const setSupportTtkPendingData = (data) => {
  return { type: SUPPORT_TTK_PENDING_DATA, data };
};

export const setSupportTtkPendingDataError = (data) => {
  return { type: SUPPORT_TTK_PENDING_DATA_ERROR, data };
};



export const setMonthlyTrendData = (data) => {
  return { type: MONTHLY_TREND_DATA, data };
};

export const setMonthlyTrendDataError = (data) => {
  return { type: MONTHLY_TREND_DATA_ERROR, data };
};



export const setHelpdeskByStatusData = (data) => {
  return { type: HELPDESK_BY_STATUS_DATA, data };
};

export const setHelpdeskByStatusDataError = (data) => {
  return { type: HELPDESK_BY_STATUS_DATA_ERROR, data };
};



export const setHelpdeskByAgeingData = (data) => {
  return { type: HELPDESK_BY_AGEING_DATA, data };
};

export const setHelpdeskByAgeingDataError = (data) => {
  return { type: HELPDESK_BY_AGEING_DATA_ERROR, data };
};



export const setHelpdeskBySeverityData = (data) => {
  return { type: HELPDESK_BY_SEVERITY_DATA, data };
};

export const setHelpdeskBySeverityDataError = (data) => {
  return { type: HELPDESK_BY_SEVERITY_DATA_ERROR, data };
};



export const setHelpdeskProjectWiseData = (data) => {
  return { type: HELPDESK_PROJECT_WISE_DATA, data };
};

export const setHelpdeskProjectWiseDataError = (data) => {
  return { type: HELPDESK_PROJECT_WISE_DATA_ERROR, data };
};



export const setHelpdeskAgentWiseData = (data) => {
  return { type: HELPDESK_AGENT_WISE_DATA, data };
};

export const setHelpdeskAgentWiseDataError = (data) => {
  return { type: HELPDESK_AGENT_WISE_DATA_ERROR, data };
};
