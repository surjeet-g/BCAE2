const SERVER_TYE = "test"

//Staging environment
export const BASE_URL = (SERVER_TYE == "stage") ? "https://bcae-test.comquest-brunei.com:1443/bcae-staging/" : "https://bcae-test.comquest-brunei.com:1443/bcae/";
// export const BASE_URL = "https://st-td123.comquest-brunei.com:13443/td123/";

export const BASE_URL_TENANT =
  "https://bcae-test.comquest-brunei.com:1443/tenant/";

export const PROD_BASE_URL = "https://123.comquest-brunei.com/NCC/";

export const PROD_BASE_URL_TENANT =
  "https://bcae-prod.comquest-brunei.com:19443/tenant/";

export const TENANT_ID = (SERVER_TYE == "stage") ? "a89d6593-3aa8-437b-9629-9fcbaa201da8" : "a89d6593-3aa8-437b-9629-9fcbaa201da6";

export const endPoints = {
  APPOINTMENT_CREATE: "api/master/temp-appointment/create",
  APPOINTEMENT_TEMPLATE: "api/master/interaction-template",
  FACE_MATCH_API: "api/common/face-compare",
  DOCU_SCAN: "api/common/scan-document",
  INTERACTION_APPOINMENT_TEMP: 'api/master/interaction-template',
  INTERACTION_AVALABLE_APPOINMENT: 'api/master/available-appointment',
  SEACH_CUSTOMERS: "api/customer/get-customer",
  INTERACTION_ADD: "api/interaction/create",
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
  GET_REGISTER_FORM_DATA: "api/master/lookup",
  INTERACTION_LIST_API: "api/interaction/search",
  MY_TICKETS_DETAILS_API: "api/complaint",
  GET_LOGIN_OTP_FOR_MOBILE: "api/auth/send-otp?type=mobile&source=LOGIN",
  GET_LOGIN_OTP_FOR_EMAIL: "api/auth/send-otp?type=email&source=LOGIN",
  GET_OTP_FOR_MOBILE: "api/auth/send-otp?type=mobile&source=REGISTER",
  GET_OTP_FOR_EMAIL: "api/auth/send-otp?type=email&source=REGISTER",
  CHECK_OTP: "api/auth/verify-otp/",
  FORGOT_PASSWORD: "api/auth/send-forgot-password",
  PROFILE_DETAILS: "api/customer/",
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
  CREATE_CUSTOMER_API: "api/customer/create",
  UPDATE_CUSTOMER_API: "api/customer/",
  CREATE_CUSTOMER_SERVICE_API: "api/accounts/service/create",
  UPDATE_CUSTOMER_SERVICE_API: "api/accounts/service/update",
  UPDATE_ACCOUNT_API: "api/accounts/update/",
  UPDATE_CUSTOMER_STATUS_API: "api/customer/update-status",
  CREATE_ORDER_API: "api/order/create",
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
