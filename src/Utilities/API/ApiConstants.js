const SERVER_TYE = "stage"
// test "https://bcae-test.comquest-brunei.com:1443/bcae/";

//Staging environment

// export const BASE_URL = (SERVER_TYE == "stage") ? "https://bcae-test.comquest-brunei.com:1443/dtWorks/stage/" : "https://bcae-demo.comquest-brunei.com:9443/dtWorks/"

// export const BASE_URL = (SERVER_TYE == "stage") ? "https://bcae-test.comquest-brunei.com:1443/dtWorks/stage/" : "https://bcae-demo.comquest-brunei.com:9443/dtWorks/"

// export const BASE_URL = "https://bcae-test.comquest-brunei.com:1443/dtWorks/comquest/"

// export const BASE_URL = "https://st-td123.comquest-brunei.com:13443/td123/";

// https://bcae-test.comquest-brunei.com:1443/bcae-staging/api/knowledge-base/search-knowledge-base-consumer?q=i%20wan&st=undefined

export const BASE_URL_TENANT = "https://bcae-test.comquest-brunei.com:1443/tenant/";

export const PROD_BASE_URL = "https://123.comquest-brunei.com/NCC/";

export const PROD_BASE_URL_TENANT =
  "https://bcae-prod.comquest-brunei.com:19443/tenant/";
const testTenatId = "a89d6593-3aa8-437b-9629-9fcbaa201da6";
console.log('SERVER_TYE---->', SERVER_TYE)

// Recently using tenant id
// export const TENANT_ID = (SERVER_TYE == "stage") ? "a89d6593-3aa8-437b-9629-9fcbaa201da8" : "a89d6593-3aa8-437b-9629-9fcbaa201da4";



// ----------------------------------------------------------------------------------------------------------------------------

// Helpdesk 2.0 production details
// export const BASE_URL = "https://dtworks-prod.comquest-brunei.com:19443/comquest/api/"
// export const TENANT_ID = "e67e7c76-a6b3-4eff-8ea6-1b3c7b9316df";

// Helpdesk 2.0 staging url
// export const BASE_URL = "https://dtworks-test.comquest-brunei.com:1443/dtWorks/stage/"





// Telecom url
// Internal
export const BASE_URL = "https://dtworks-demo.comquest-brunei.com:9443/dtWorks-int/"
// External
// export const BASE_URL = "https://dtworks-demo.comquest-brunei.com:9443/dtWorks/"





// Helpdesk 2.0 tenant id
// export const TENANT_ID = "a89d6593-3aa8-437b-9629-9fcbaa201dc9";

// External helpdesk demo tenant id
// export const TENANT_ID = "d2ba51d3-370b-4e93-a4f1-27ef0274a693";

// Comquest tenant id (currently using in web app)
export const TENANT_ID = "2da69f8d-c52c-4a18-93d3-e2d4eb69d0f2";


// Comquest demo tenant id
// export const TENANT_ID = "844ed6d4-4735-477c-b1a3-ad168sac952f9";



// nrctc tenant id
// export const TENANT_ID = "f2cd5d2f-39c9-4dcc-acfe-f20190476971";






// Telecom tenant id
// Internal
// export const TENANT_ID = "a89d6593-3aa8-437b-9629-9fcbaa201da1";
// External
// export const TENANT_ID = "a89d6593-3aa8-437b-9629-9fcbaa201da4";


// Demo tenant id
// export const TENANT_ID = "a89d6593-3aa8-437b-9629-9fcbaa201da1";


// --------------------------------------------------------------------------------------------------------------------------

console.log('TENANT_ID---->', TENANT_ID)





export const endPoints = {
  MASTER_CONFIG: "api/master/get-app-config",
  TERM_ND_CONDITION: "api/master/template/get-terms-conditions?entityType=APPLICATION&serviceType=ALL",
  SERVICE_LIST: "api/accounts/get-service-list?limit=10&page=0",
  APPOINTMENT_CREATE: "api/master/temp-appointment/mobile/create",
  APPOINTEMENT_TEMPLATE: "api/master/interaction-template",
  FACE_MATCH_API: "api/common/face-compare",
  DOCU_SCAN: "api/common/scan-document",
  INTERACTION_APPOINMENT_TEMP: 'api/master/interaction-template/mobile',
  INTERACTION_AVALABLE_APPOINMENT: 'api/master/available-appointment/mobile',
  SEACH_CUSTOMERS: "api/customer/get-customer",
  INTERACTION_ADD: "api/interaction/create",
  UPLOAD_INTERACTION_ATTACHMENT: 'api/common/upload-files/storage?entityType=INTERACTION',
  INTXN_ATTACHMENT_LIST: 'api/common/attachment/',
  DOWNLOAD_INTXN_ATTACHMENT: 'api/common/download-files/',
  INTERACTION_UPDATE: "api/interaction/update/",
  INTERACTION_WORKFLOW: "api/workflow/resolution",
  KNOWLEDGE_SEARCH_STATEMENT: "api/knowledge-Base/get-knowledge-base",
  INTELIGENCE: "api/intelligence-corner/based-on-interaction",
  FREQUENTLY_ASKED: "api/interaction/frequent",
  INTERACTION_FETCH: "api/interaction/search",
  INTERACTION_GET_WORKFLOW: "api/interaction/history/",
  MASTERDATA: "api/master/lookup",
  PREVERIFYUSERDATA: "api/register",
  VERSIONCHECK: "api/bcae-tenant",
  NOTIFICATIONS: "api/notification/pushNotification",
  ANNOUNCEMENT: "api/announcement",
  INSERTFOLLOWUP: "api/interaction/followUp",
  INTERACTION_ASSIGN_SELF: "api/interaction/assignSelf/",
  FOLLOWUP: "api/complaint",
  USER_LOGIN: "api/auth/login",
  USER_ROLE_SWITCH: "api/auth/session/",
  GET_REGISTER_FORM_DATA: "api/master/lookup",
  INTERACTION_LIST_API: "api/interaction/search",
  STATUS_LIST_API: "api/workflow/get-status",
  MY_TICKETS_DETAILS_API: "api/complaint",
  GET_LOGIN_OTP_FOR_MOBILE: "api/auth/send-otp?type=mobile&source=LOGIN",
  GET_LOGIN_OTP_FOR_EMAIL: "api/auth/send-otp?type=email&source=LOGIN",
  GET_OTP_FOR_MOBILE: "api/auth/send-otp?type=mobile&source=REGISTER&userGroup=UG_CONSUMER",
  GET_OTP_FOR_EMAIL: "api/auth/send-otp?type=email&source=REGISTER",
  CHECK_OTP: "api/auth/verify-otp/",
  FORGOT_PASSWORD: "api/auth/send-forgot-password",
  PROFILE_DETAILS: "api/customer/",
  SWITCH_ROLE: "api/users/switch-user/",
  UPDATE_MOBILE_USER: "api/customer/",
  UPDATE_BUSINESS_USER: "api/users/update/",
  REGISTER: "api/customer/register",
  GET_FAVOURITE_LOCATION: "api/customer/address/",
  ADD_FAVOURITE_LOCATION: "api/customer/address/",
  DELETE_FAVOURITE_LOCATION: "api/customer/customer-favorite-address",
  CREATE_INQUIRY: "api/inquiry",
  CREATE_COMPLAINT: "api/complaint",
  CHANGE_PASSWORD: "api/auth/reset-password",
  UPLOAD_ATTACHMENT: "api/attachment",
  LOGOUT_USER: "api/auth/logout/",
  DELETE_ACCOUNT: "api/users/deactivate",
  REFRESH_TOKEN: "api/users/refresh-token",
  INQUIRY_NOTIFICATIONS: "api/KnowledgeBase/inquiry-notification",
  ORGANIZATION: "api/organization",
  ADDRESS_LOOKUP: "api/lookup/address-lookup",
  ADDRESS_LOOKUP_REGISTRATION: "api/master/address-lookup",
  DOCUMENT_SCAN: "api/common/scan-document",
  USERS_SEARCH: "api/users/search/",
  SOURCE_DATA: "api/master/lookup?searchParam=code_type&valueParam=TICKET_SOURCE",
  USERS_ROLE: "api/users/by-role",
  CANCEL_REASONS: "api/master/lookup",
  CANCEL_INTERACTION: "api/interaction/cancel/",
  KNOWLEDGE_SEARCH: "api/knowledge-Base/search",
  GET_WORKFLOW_LIST: "api/workflow/get-workflow-list",
  GET_WORKFLOW_FOR_ID: "api/workflow/get-workflow/",
  CREATE_WORKFLOW: "api/workflow/create",
  UPDATE_WORKFLOW: "api/workflow/update/",
  DELETE_WORKFLOW: "api/workflow/delete/",
  CUSTOMER_ACCOUNT: "api/accounts/get-account-list",
  ORDER_LIST_API: "api/order/search",
  GET_APPOINTMENT_DASHBOARD: "api/appointment",
  FETCH_SERVICE_PRODUCTS_API: "api/product",
  CREATE_CUSTOMER_API: "api/customer/create/mobile",
  UPDATE_CUSTOMER_API: "api/customer/mobile/",
  CREATE_CUSTOMER_SERVICE_API: "api/accounts/service/create/mobile",
  UPDATE_CUSTOMER_SERVICE_API: "api/accounts/service/update/mobile",
  UPDATE_ACCOUNT_API: "api/accounts/update/",
  UPDATE_CUSTOMER_STATUS_API: "api/customer/update-status",
  CREATE_ORDER_API: "api/order/create",

  DASHBOARD_HELPDESK_SUMMARY: "api/helpdesk/summary",
  DASHBOARD_HELPDESK_SUPPORT_TTK_PENDING: "api/helpdesk/support-tkt-pending",
  DASHBOARD_HELPDESK_MONTHLY_TREND: "api/helpdesk/monthly-trend",
  DASHBOARD_HELPDESK_BY_STATUS: "api/helpdesk/helpdesk-by-status",
  DASHBOARD_HELPDESK_BY_STATUS: "api/helpdesk/helpdesk-by-status",
  DASHBOARD_HELPDESK_BY_AGING: "api/helpdesk/open-helpdesk-by-aging",
  DASHBOARD_HELPDESK_BY_SEVERITY: "api/helpdesk/helpdesk-by-severity",
  DASHBOARD_HELPDESK_PROJECT_WISE: "api/helpdesk/project-wise",
  DASHBOARD_HELPDESK_AGENT_WISE: "api/helpdesk/agent-wise",
  DASHBOARD_HELPDESK_BY_TYPE: "api/helpdesk/helpdesk-by-type",
  DASHBOARD_HELPDESK_HOURLY_TICKETS: "api/helpdesk/hourly-tkts",


  DASHBOARD_INTERACTION_STATEMENT_WISE: "api/interaction/statement-wise",
  DASHBOARD_INTERACTION_CHANNEL_WISE: "api/interaction/channel-wise",
  DASHBOARD_INTERACTION_CUSTOMER_WISE: "api/interaction/customer-wise",
  DASHBOARD_INTERACTION_LIVE_CUSTOMER_WISE: "api/interaction/live-customer-wise",
  DASHBOARD_INTERACTION_LIVE_PROJECT_WISE: "api/interaction/live-project-wise",
  DASHBOARD_INTERACTION_LOCATION_WISE: "api/interaction/location-wise",
  DASHBOARD_INTERACTION_DEPARTMENT: "api/interaction/dept-interactions",
  DASHBOARD_INTERACTION_DEPARTMENT_VS_ROLES: "api/interaction/dept-vs-roles-interactions",
  DASHBOARD_INTERACTION_NPS_CSAT_CHAMP: "api/interaction/nps-csat-champ",
  DASHBOARD_INTERACTION_RES_MTTR_WAITING: "api/interaction/res-mttr-waiting",
  DASHBOARD_INTERACTION_LIVE_INT_BY_STATUS: "api/interaction/live-interactions-by-status",
  DASHBOARD_INTERACTION_LIVE_INT_BY_STATUS_LIST: "api/interaction/by-status/list",
  DASHBOARD_INTERACTION_BY_STATUS_COUNT: "api/interaction/by-status/count",
  DASHBOARD_INTERACTION_AVG_WISE: "api/interaction/interaction-avg-wise",
  DASHBOARD_INTERACTION_BY_PRIORITY_STATUS_WISE: "api/interaction/interaction-by-priority-status-wise",
  DASHBOARD_INTERACTION_BY_PRIORITY_STATUS_WISE_LIST: "api/interaction/interaction-by-priority-status-wise-list",
  DASHBOARD_INTERACTION_GET_MANAGERS_LIST: "api/users/get-managerlist",
  DASHBOARD_INTERACTION_BY_PRIORITY: "api/interaction/by-priority",
  DASHBOARD_INTERACTION_BY_AGEING: "api/interaction/by-ageing",
  DASHBOARD_INTERACTION_BY_FOLLOWUPS: "api/interaction/by-followups",
  DASHBOARD_INTERACTION_CATEGORY: "api/interaction/interaction/category/cnt",
  DASHBOARD_INTERACTION_TYPE: "api/interaction/interaction/type/cnt",
  DASHBOARD_INTERACTION_TYPE_LIST: "api/interaction/interaction/type/list",
  DASHBOARD_INTERACTION_SERVICE_CATEGORY: "api/interaction/service/category/cnt",
  DASHBOARD_INTERACTION_SERVICE_TYPE: "api/interaction/service/type/cnt",
  DASHBOARD_INTERACTION_PROJECT_WISE_COUNT: "api/interaction/project-wise/count",
  DASHBOARD_INTERACTION_PROJECT_WISE_LIST: "api/interaction/project-wise/list",
  DASHBOARD_INTERACTION_AGENT_WISE_COUNT: "api/interaction/agent-wise/count",
  DASHBOARD_INTERACTION_AGENT_WISE_LIST: "api/interaction/agent-wise/list",

  DASHBOARD_OPERATIONAL_ASSIGNED_TO_ME: "api/interaction/get-assigned-to-me-tickets",
  DASHBOARD_OPERATIONAL_APPOINTMENT_OVERVIEW: "api/interaction/get-appointment-overview",
  DASHBOARD_OPERATIONAL_POOLED_INTERACTIONS: "api/interaction/get-pooled-interactions",
  DASHBOARD_OPERATIONAL_TEAM_POOLED_INTERACTIONS: "api/interaction/get-team-pooled-interactions",
  DASHBOARD_OPERATIONAL_ASSIGNED_INTERACTIONS: "api/interaction/get-assigned-interactions",
  DASHBOARD_OPERATIONAL_TEAM_ASSIGNED_INTERACTIONS: "api/interaction/get-team-assigned-interactions",
  DASHBOARD_OPERATIONAL_INTERACTION_HISTORY_GRAPH: "api/interaction/interaction-history-graph",
  DASHBOARD_OPERATIONAL_INTERACTION_HISTORY_GRAPH_TEAM: "api/interaction/interaction-history-graph-team",
  DASHBOARD_OPERATIONAL_ASSIGNED_APPOINTMENTS: "api/interaction/get-assigned-appoinments",
  DASHBOARD_OPERATIONAL_TEAM_ASSIGNED_APPOINTMENTS: "api/interaction/get-team-assigned-appoinments",
  DASHBOARD_OPERATIONAL_INTXN_CATEGORY_PERFORMANCE: "api/interaction/get-interaction-category-performance",
  DASHBOARD_OPERATIONAL_INTXN_TOP_FIVE_PERFORMANCE: "api/interaction/get-topfive-performer",
  DASHBOARD_OPERATIONAL_INTXN_TOP_FIVE_PERFORMANCE_CHAT: "api/interaction/get-topfive-performer-chat",
  DASHBOARD_OPERATIONAL_TEAM_CATEGORY_PERFORMANCE: "api/interaction/get-team-category-performance",


  DASHBOARD_APPOINTMENT_GET_UPCOMING: "api/appointment/get-upcoming-appoinments?page=0&limit=500&valueParam=AS_SCHED",
  DASHBOARD_APPOINTMENT_GET_CLOSED: "api/appointment/get-closed-appoinments?page=0&limit=500&valueParam=AS_COMP_SUCCESS,AS_COMP_UNSUCCESS",
  DASHBOARD_APPOINTMENT_GET_EVENTS: "api/appointment/get-appoinment-events",
  DASHBOARD_APPOINTMENT_GET_REMINDER: "api/appointment/get-appoinments-reminder",
  DASHBOARD_APPOINTMENT_GET_APP_BASED_ON_TYPE: "api/appointment/get-based-on-type",
  DASHBOARD_APPOINTMENT_GET_PERFORMANCE: "api/appointment/get-performance",




  EVENT_HALLS_API: "api/appointment/get-halls",
  EVENT_HALLS_AVAILABILITY_API: "api/appointment/get-hall-slots-availability"























};

export const requestMethod = {
  GET: "GET",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  LINK: "LINK",
  UNLINK: "UNLINK",
};
