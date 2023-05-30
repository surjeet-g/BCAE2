export const APPOINTMENT_DASHBOARD_INIT = "APPOINTMENT_DASHBOARD_INIT";
export const APPOINTMENT_DASHBOARD_DATA = "APPOINTMENT_DASHBOARD_DATA";
export const APPOINTMENT_DASHBOARD_ERROR = "APPOINTMENT_DASHBOARD_ERROR";

export const initAppointmentDashboardData = () => {
  return { type: APPOINTMENT_DASHBOARD_INIT };
};

export const setAppointmentDashboardData = (data) => {
  return { type: APPOINTMENT_DASHBOARD_DATA, data };
};

export const setAppointmentDashboardError = (data) => {
  return { type: APPOINTMENT_DASHBOARD_ERROR, data };
};
