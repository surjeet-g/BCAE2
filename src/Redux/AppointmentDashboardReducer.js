import {
  APPOINTMENT_DASHBOARD_INIT,
  APPOINTMENT_DASHBOARD_DATA,
  APPOINTMENT_DASHBOARD_ERROR,
} from "./AppointmentDashboardAction";

const appointmentDashboardInitialState = {
  initAppointmentDashboard: false,
  isAppointmentDashboardError: false,
  appointmentDashboardData: {},
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
    default:
      return state;
  }
};
export default AppointmentDashboardReducer;
