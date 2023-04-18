import { combineReducers } from "redux";

import MyTicketDetailsReducer from "../Redux/MyTicketDetailsReducer";
import InteractionListReducer from "../Redux/InteractionListReducer";
import OrderListReducer from "../Redux/OrderListReducer";
import RegisterFormReducer from "../Redux/RegisterReducer";
import AnnouncementsReducer from "../Screens/Announcement/AnnouncementReducer";
import ForgotPasswordReducer from "../Screens/ForgotPassword/ForgotPasswordReducer";
import LoginReducer from "../Screens/Login/LoginReducer";
import AttachmentReducer from "./AttachmentReducer";
import InquiryNotificationsReducer from "./InquiryNotificationsReducer";
import InquiryReducer from "./InquiryReducer";
import InteractionReducer from "./InteractionReducer";
import KnowledgeSearchReducer from "./KnowledgeSearchReducer";
import LogoutReducer from "./LogoutReducer";
import masterDataReducer from "./masterDataReducer";
import MyDashboardReducer from "./MyDashboardReducer";
import NotificationsReducer from "./NotificationsReducer";
import ProfileReducer from "./ProfileReducer";
import SavedLocationReducer from "./SavedLocationReducer";
import VersionCheckReducer from "./VersionCheckReducer";
import CustomerAccountReducer from "./CustomerAccountReducer";
import CreateCustomerReducer from "./../Screens/CreateCustomer/CreateCustomerReducer";
import AppointmentDashboardReducer from "./AppointmentDashboardReducer";
import { LOGOUT_DATA } from "./LogoutAction";

const appReducer = combineReducers({
  interaction: InteractionReducer,
  masterdata: masterDataReducer,
  versioncheck: VersionCheckReducer,
  notifications: NotificationsReducer,
  attachment: AttachmentReducer,
  login: LoginReducer,
  registerForm: RegisterFormReducer,
  interactionList: InteractionListReducer,
  myTicketDetails: MyTicketDetailsReducer,
  myDashboardData: MyDashboardReducer,
  announcements: AnnouncementsReducer,
  savedLocations: SavedLocationReducer,
  profile: ProfileReducer,
  forgot: ForgotPasswordReducer,
  enquiry: InquiryReducer,
  logout: LogoutReducer,
  inquiryNotifications: InquiryNotificationsReducer,
  knowledgeSearch: KnowledgeSearchReducer,
  customerAccount: CustomerAccountReducer,
  orderList: OrderListReducer,
  createCustomerReducerData: CreateCustomerReducer,
  dashboardAppointments: AppointmentDashboardReducer,
});

const RootReducer = (state, action) => {
  if (action.type === LOGOUT_DATA) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default RootReducer;
