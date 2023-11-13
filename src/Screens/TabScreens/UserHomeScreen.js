import get from "lodash.get";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  unstable_batchedUpdates
} from "react-native";
import { BarChart, LineChart, ProgressChart, StackedBarChart } from "react-native-chart-kit";
import DatePicker from "react-native-date-picker";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Divider, Text, TextInput } from "react-native-paper";
import PieChart from "react-native-pie-chart";
// import { color } from "react-native-reanimated";
import EventCalendar from "react-native-events-calendar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { CustomDropDownFullWidth } from "../../Components/CustomDropDownFullWidth";
import { CustomInput } from "../../Components/CustomInput";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { STACK_INTERACTION_DETAILS, STACK_ORDER_DETAILS } from "../../Navigation/MyStack";
import {
  getAppointmentEvents,
  getAppointmentsBasedOnType,
  getAssignedAppointments,
  getChannelWise,
  getClosedAppointments,
  getCustomerWise,
  getDepartmentInteractions,
  getDepartmentVsRolesInteractions,
  getHelpdeskAgentWise,
  getHelpdeskByAgeing,
  getHelpdeskBySeverity,
  getHelpdeskBySeverityList,
  getHelpdeskBySeverityLive,
  getHelpdeskByStatus,
  getHelpdeskByStatusList,
  getHelpdeskByStatusListLive,
  getHelpdeskByTypeLive,
  getHelpdeskHourlyTickets,
  getHelpdeskProjectWise,
  getHelpdeskProjectWiseLive,
  getHelpdeskSummary,
  getHelpdeskSummaryClarification,
  getHelpdeskSummaryIncident,
  getHelpdeskSummaryServiceRequest,
  getHelpdeskSummaryUnclassified,
  getInteractionAgentWise,
  getInteractionAgentWiseList,
  getInteractionAvgWise,
  getInteractionByAgeing,
  getInteractionByAgeingFiveDays, getInteractionByAgeingMoreFiveDays, getInteractionByAgeingThreeDays,
  getInteractionByCategory,
  getInteractionByFollowups,
  getInteractionByFollowupsFiveDays,
  getInteractionByFollowupsMoreFiveDays,
  getInteractionByFollowupsThreeDays,
  getInteractionByLivePriority,
  getInteractionByPriority,
  getInteractionByPriorityHigh, getInteractionByPriorityLow, getInteractionByPriorityMedium,
  getInteractionByPriorityStatusWise,
  getInteractionByPriorityStatusWiseList,
  getInteractionByServiceCategory,
  getInteractionByServiceType,
  getInteractionByType,
  getInteractionByTypeList,
  getInteractionPerformance,
  getInteractionProjectWise,
  getInteractionProjectWiseList,
  getInteractionsByLiveStatusListTwo,
  getInteractionsByStatusList,
  getInteractionsByStatusLiveList,
  getLiveCustomerWise,
  getLiveInteractionsByStatus,
  getLiveProjectWise,
  getLocationWise,
  getMonthlyTrend,
  getNpsCsatChamp,
  getOperationalAppointmentOverview,
  getOperationalAssignedInteractions,
  getOperationalAssignedToMe,
  getOperationalInteractionHistoryGraph,
  getOperationalInteractionHistoryGraphTeam,
  getOperationalPooledInteractions,
  getOperationalTeamAppointmentOverview,
  getOperationalTeamAssignedInteractions,
  getOperationalTeamPooledInteractions,
  getResMttrWaiting,
  getStatementWise,
  getStatusWiseCount,
  getSupportTtkPending,
  getTeamAssignedAppointments,
  getTeamCategoryPerformance,
  getTopFivePerformanceActivityTeam,
  getUpcomingAppointments
} from "../../Redux/AppointmentDashboardDispatcher";
import { getInteractionDetailsSearch } from "../../Redux/InteractionDispatcher";
import { getDataFromDB } from "../../Storage/token";
import { color, storageKeys } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { getUserId } from "../../Utilities/UserManagement/userInfo";

var { height, width } = Dimensions.get("screen");
var dispatch = {}
var intDashRed
var interactionReducer
var filterParams = {}
var dialogHeading

const TAB_INTERACTIVE = true;
const TAB_INFORMATIVE = false;


export const UserHomeScreen = (props) => {

  console.log("UserHomeScreen rendering..");

  const [loader, setLoader] = useState(true);
  const [projCode, setProjCode] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [statusDesc, setStatusDesc] = useState("");
  const [channelCode, setChannelCode] = useState("");
  const [channelDesc, setChannelDesc] = useState("");
  const [priorityCode, setPriorityCode] = useState("");
  const [priorityDesc, setPriorityDesc] = useState("");
  const [userCode, setUserCode] = useState("");
  const [userDesc, setUserDesc] = useState("");
  const [intCatCode, setIntCatCode] = useState("");
  const [intCatDesc, setIntCatDesc] = useState("");
  const [intTypeCode, setIntTypeCode] = useState("");
  const [intTypeDesc, setIntTypeDesc] = useState("");
  const [serviceCatCode, setServiceCatCode] = useState("");
  const [serviceCatDesc, setServiceCatDesc] = useState("");
  const [serviceTypeCode, setServiceTypeCode] = useState("");
  const [serviceTypeDesc, setServiceTypeDesc] = useState("");
  const [project, setProject] = useState("");
  const { navigation } = props
  const [openDashboardPopUp, setOpenDashboardPopUp] = useState(false);

  const [showHelpdeskDashboard, setShowHelpdeskDashboard] = useState(false);
  const [helpdeskDetDialogVisible, setHelpdeskDetDialogVisible] = React.useState(false);
  const [helpdeskDialogData, setHelpdeskDialogData] = useState([]);
  const [helpdeskFilterDialogVisible, setHelpdeskFilterDialogVisible] = React.useState(false);
  const [helpdeskFilterOn, setHelpdeskFilterOn] = useState(false);
  const [helpdeskFilterReq, setHelpdeskFilterReq] = useState({});

  const [showInteractionDashboard, setShowInteractionDashboard] = useState(false);
  const [intxnDetDialogVisible, setIntxnDetDialogVisible] = React.useState(false);
  const [dialogData, setDialogData] = useState([]);
  const [intxnFilterDialogVisible, setIntxnFilterDialogVisible] = React.useState(false);
  const [intxnFilterOn, setIntxnFilterOn] = useState(false);
  const [intxnFilterReq, setIntxnFilterReq] = useState({});

  const [showOperationalDashboard, setShowOperationalDashboard] = useState(false);
  const [operationalDetDialogVisible, setOperationalDetDialogVisible] = React.useState(false);
  const [operationalDialogData, setOperationalDialogData] = useState([]);
  const [operationalFilterDialogVisible, setOperationalFilterDialogVisible] = React.useState(false);
  const [operationalFilterOn, setOperationalFilterOn] = useState(false);
  const [operationalFilterReq, setOperationalFilterReq] = useState({});

  const [showAppointmentDashboard, setShowAppointmentDashboard] = useState(true);
  const [appointmentDetDialogVisible, setAppointmentDetDialogVisible] = React.useState(false);
  const [appointmentDialogData, setAppointmentDialogData] = useState([]);
  const [appointmentFilterDialogVisible, setAppointmentFilterDialogVisible] = React.useState(false);
  const [appointmentFilterOn, setAppointmentFilterOn] = useState(false);
  const [appointmentFilterReq, setAppointmentFilterReq] = useState({});

  const [selectedAppTab1, setSelectedAppTab1] = useState("INTXN");
  const [showIntxnAppTab, setShowIntxnAppTab] = useState(true);
  const [showInfoAppTab, setShowInfoAppTab] = useState(true);

  const [showOverallAppointments, setShowOverallAppointments] = useState(true);
  const [showCalendarAppointments, setShowCalendarAppointments] = useState(false);
  const [showUpcomingAppointments, setShowUpcomingAppointments] = useState(false);
  const [showClosedAppointments, setShowClosedAppointments] = useState(false);

  const [showOverallInfoApp, setShowOverallInfoApp] = useState(true);
  const [showBasedAppType, setShowBasedAppType] = useState(false);
  const [showBasedLocHistory, setShowBasedLocHistory] = useState(false);


  const [showAssignedToMe, setShowAssignedToMe] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showPooledInteractions, setShowPooledInteractions] = useState(false);
  const [showAssignedInteractions, setShowAssignedInteractions] = useState(false);

  const [openFromDatePicker, setOpenFromDatePicker] = useState(false);
  const [openToDatePicker, setOpenToDatePicker] = useState(false);
  const [selFromDate, setSelFromDate] = useState(new Date());
  const [selToDate, setSelToDate] = useState(new Date());
  const [helpdeskLiveStream, setHelpdeskLiveStream] = useState(false);
  const [interactionLiveStream, setInteractionLiveStream] = useState(false);
  const [priorityStatusData, setPriorityStatusWiseData] = useState([]);
  intDashRed = useSelector((state) => state.dashboardAppointments);
  interactionReducer = useSelector((state) => state.interaction);

  const [assignToMeData, setAssignToMeData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);

  const [owner, setOwner] = useState([]);
  const [viewType, setViewType] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [specificData, setSpecificData] = useState([]);

  const [ownerDesc, setOwnerDesc] = useState([]);
  const [viewTypeDesc, setViewTypeDesc] = useState([]);
  const [viewDataDesc, setViewDataDesc] = useState([]);
  const [specificDataDesc, setSpecificDataDesc] = useState([]);

  const [showOperationalSearch, setShowOperationalSearch] = useState(false);
  const [isFirstSelected, setFirstSelected] = useState(false);

  const [selectedTab0, setSelectedTab0] = useState("ME");
  const [selectedTab1, setSelectedTab1] = useState("INTXN");
  const [selectedTab2, setSelectedTab2] = useState("ASGN_TO_ME");
  const [selectedTab3, setSelectedTab3] = useState("");
  const [selectedTab4, setSelectedTab4] = useState("");


  const [topFivePerfCode, setTopFivePerfCode] = useState("");
  const [topFivePerfDesc, setTopFivePerfDesc] = useState("");
  const [topFiveIntxnPerfData, setTopFiveIntxnPerfData] = useState({});

  const [topFivePerfActivityTeamCode, setTopFivePerfActivityTeamCode] = useState("");
  const [topFivePerfActivityTeamDesc, setTopFivePerfActivityTeamDesc] = useState("");
  const [topPerfActivityTeam, setTopPerfActivityTeam] = useState({});


  const [topCategoryPerformanceTeamCode, setTopCategoryPerformanceTeamCode] = useState("");
  const [topCategoryPerformanceTeamDesc, setTopCategoryPerformanceTeamDesc] = useState("");
  const [topCategoryPerformanceTeamLabels, setTopCategoryPerformanceTeamLabels] = useState([]);
  const [topCategoryPerformanceTeamData, setTopCategoryPerformanceTeamData] = useState([]);

  const [selectedRole, setSelectedRole] = useState([]);
  const [roleLabel, setRoleLabel] = useState([]);
  const [roleData, setRoleData] = useState([]);

  const [selAppTypeCode, setSelAppTypeCode] = useState("");
  const [selAppTypeDesc, setSelAppTypeDesc] = useState("");

  dispatch = useDispatch([
    // ---------------------------------------------Interaction methods-------------------------------------------------------------
    getStatusWiseCount,
    getStatementWise,
    getChannelWise,
    getCustomerWise,
    getLiveCustomerWise,
    getLiveProjectWise,
    getLocationWise,
    getDepartmentInteractions,
    getDepartmentVsRolesInteractions,
    getNpsCsatChamp,
    getResMttrWaiting,
    getLiveInteractionsByStatus,
    // getInteractionByStatusList,
    getInteractionAvgWise,
    getInteractionByPriorityStatusWise,
    getInteractionByPriorityStatusWiseList,
    // getManagersList,
    getInteractionByPriority,
    getInteractionByPriorityHigh,
    getInteractionByPriorityMedium,
    getInteractionByPriorityLow,
    getInteractionByAgeing,
    getInteractionByAgeingThreeDays,
    getInteractionByAgeingFiveDays,
    getInteractionByAgeingMoreFiveDays,
    getInteractionByFollowups,
    getInteractionByFollowupsThreeDays,
    getInteractionByFollowupsFiveDays,
    getInteractionByFollowupsMoreFiveDays,
    getInteractionByCategory,
    getInteractionByType,
    getInteractionByServiceCategory,
    getInteractionByServiceType,
    getInteractionProjectWiseList,
    getInteractionAgentWiseList,
    // ---------------------------------------------Interaction methods-------------------------------------------------------------

    // ---------------------------------------------Operational methods-------------------------------------------------------------
    getOperationalAssignedToMe,
    getOperationalAppointmentOverview,
    getOperationalPooledInteractions,
    getOperationalAssignedInteractions,
    getOperationalTeamPooledInteractions,
    getOperationalTeamAssignedInteractions,
    getInteractionDetailsSearch,
    getOperationalInteractionHistoryGraph,
    getOperationalInteractionHistoryGraphTeam,
    getAssignedAppointments,
    getTeamAssignedAppointments,
    getInteractionPerformance,
    getTopFivePerformanceActivityTeam,
    getTeamCategoryPerformance,
    // ---------------------------------------------Operational methods-------------------------------------------------------------


    // ---------------------------------------------Appointment methods-------------------------------------------------------------
    getUpcomingAppointments,
    getClosedAppointments,
    getAppointmentEvents,
    getAppointmentsBasedOnType,
    // ---------------------------------------------Appointment methods-------------------------------------------------------------


    // ---------------------------------------------Helpdesk methods-------------------------------------------------------------
    getHelpdeskSummary,
    getHelpdeskHourlyTickets,
    getHelpdeskSummaryClarification,
    getSupportTtkPending,
    getMonthlyTrend,
    getHelpdeskByStatus,
    getHelpdeskByAgeing,
    getHelpdeskBySeverity,
    getHelpdeskProjectWise,
    getHelpdeskAgentWise,
    getHelpdeskByStatusListLive,
    getHelpdeskProjectWiseLive,
    getHelpdeskBySeverityList
    // ---------------------------------------------Helpdesk methods-------------------------------------------------------------
  ]);

  useEffect(() => {
    async function getData() {
      console.log("helpdeskFilterOn rendering..", helpdeskFilterOn);
      setLoader(true)

      // ---------------------------------request params----------------------------------------------------------------

      var params = {}
      if (intxnFilterOn) {
        params = { searchParams: intxnFilterReq }
      }
      else if (helpdeskFilterOn) {
        params = helpdeskFilterReq
      }
      else {
        params = { type: "COUNT" };
      }
      console.log("params..", params)

      // ---------------------------------------------Interaction requests start-------------------------------------------------------------

      if (showInteractionDashboard) {

        // ---------------------------------------------Interaction live requests start-------------------------------------------------------------

        if (interactionLiveStream) {
          var fromDateVal = moment(new Date()).format("YYYY-MM-DD")
          var toDateVal = moment(new Date()).format("YYYY-MM-DD HH:MM:SS")

          var liveProjectParams = { fromDate: fromDateVal, toDate: toDateVal }
          dispatch(getLiveProjectWise(liveProjectParams))
          console.log("getLiveProjectWise result UI..", intDashRed.liveProjectWiseData);

          var liveCustParams = { searchParams: { fromDate: fromDateVal, toDate: toDateVal, categoryType: "Internal", category: "LIST" } }
          dispatch(getLiveCustomerWise(liveCustParams))
          console.log("getLiveCustomerWise result UI..", intDashRed.liveCustomerWiseData);

          var livePriorityParams = { searchParams: { fromDate: fromDateVal, toDate: toDateVal, category: "LIST" } }
          dispatch(getInteractionByLivePriority(livePriorityParams))
          console.log("getInteractionByLivePriority result UI..", intDashRed.interactionByLivePriorityData);

          var liveOverviewParams = { fromDate: fromDateVal, toDate: toDateVal }
          dispatch(getInteractionsByLiveStatusListTwo(liveOverviewParams))
          console.log("getInteractionsByLiveStatusListTwo result UI..", intDashRed.interactionsByStatusListDataTwo);

          var liveStatusParams = { fromDate: fromDateVal, toDate: toDateVal }
          dispatch(getInteractionsByStatusLiveList(liveStatusParams))
          console.log("getInteractionsByStatusLiveList result UI..", intDashRed.interactionsByStatusLiveListData);
        }

        // ---------------------------------------------Interaction live requests end-------------------------------------------------------------

        dispatch(getStatusWiseCount({ searchParams: {} }))
        console.log("getStatusWiseCount result UI..", intDashRed.statusWiseCountData);

        dispatch(getStatementWise({ category: "STATEMENT" }))
        console.log("getStatementWise result UI..", intDashRed.statementWiseData);

        dispatch(getChannelWise(params))
        console.log("getChannelWise result UI..", intDashRed.channelWiseData);

        await dispatch(await getCustomerWise(
          {
            "searchParams": {
              "category": "COUNT",
              "fromDate": new Date()
            }
          }
        ))
        console.log("getCustomerWise result UI..", intDashRed.customerWiseData);

        dispatch(getLocationWise(params))
        console.log("getLocationWise result UI..", intDashRed.locationWiseData);

        dispatch(getDepartmentInteractions(params))
        console.log("getDepartmentInteractions result UI..", intDashRed.departmentInteractionsData);



        dispatch(getNpsCsatChamp(params))
        console.log("getNpsCsatChamp result UI..", intDashRed.npsCsatChampData);

        dispatch(getResMttrWaiting(params))
        console.log("getResMttrWaiting result UI..", intDashRed.resMttrWaitingData);

        dispatch(getLiveInteractionsByStatus(params))
        console.log("getLiveInteractionsByStatus result UI..", intDashRed.liveInteractionsByStatusData);

        dispatch(getInteractionsByStatusList(params))
        console.log("getInteractionsByStatusList result UI..", intDashRed.interactionsByStatusListData);

        dispatch(getInteractionAvgWise(params))
        console.log("getInteractionAvgWise result UI..", intDashRed.interactionAvgWiseData);

        await dispatch(await getInteractionByPriorityStatusWise({ searchParams: {} }))
        console.log("getInteractionByPriorityStatusWise result UI..", intDashRed.interactionByPriorityStatusWiseData);

        dispatch(getInteractionByPriorityStatusWiseList(params))
        console.log("getInteractionByPriorityStatusWiseList result UI..", intDashRed.interactionByPriorityStatusWiseListData);

        // dispatch(getManagersList(params))
        // console.log("getManagersList result UI..", intDashRed.managersListData);

        dispatch(getInteractionByPriority(params))
        console.log("getInteractionByPriority result UI..", intDashRed.interactionByPriorityData);

        dispatch(getInteractionByAgeing(params))
        console.log("getInteractionByAgeing result UI..", intDashRed.interactionByAgeingData);

        dispatch(getInteractionByFollowups(params))
        console.log("getInteractionByFollowups result UI..", intDashRed.interactionByFollowupsData);

        dispatch(getInteractionByCategory(params))
        console.log("getInteractionByCategory result UI..", intDashRed.interactionByCategoryData);

        dispatch(getInteractionByType(params))
        console.log("getInteractionByType result UI..", intDashRed.interactionByTypeData);

        dispatch(getInteractionByTypeList(params))
        console.log("getInteractionByTypeList result UI..", intDashRed.interactionByTypeListData);

        dispatch(getInteractionByServiceCategory(params))
        console.log("getInteractionByServiceCategory result UI..", intDashRed.interactionByServiceCategoryData);

        dispatch(getInteractionByServiceType(params))
        console.log("getInteractionByServiceType result UI..", intDashRed.interactionByServiceTypeData);

        dispatch(getInteractionProjectWise(params))
        console.log("getInteractionProjectWise count result UI..", intDashRed.interactionByProjectWiseData);

        dispatch(getInteractionAgentWise(params))
        console.log("getInteractionAgentWise result UI..", intDashRed.interactionByAgentWiseData);

        await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "ALL" } }))
        console.log("getInteractionByPriorityStatusWise ALL UI..", intDashRed.interactionByPriorityStatusWiseData);

        setLoader(false)
      }

      // ---------------------------------------------Interaction requests end-------------------------------------------------------------


      // ---------------------------------------------Operational requests start-------------------------------------------------------------

      if (showOperationalDashboard) {
        var assignedToMeParams, appointmentOverviewParams, teamAppointmentOverviewParams, pooledInteractionParams,
          teamPooledInteractionParams, assignedInteractionParams, teamAssignedInteractionParams, interactionHistoryGraphParams,
          interactionHistoryGraphTeamParams, assignedAppointmentGraphParams, teamAssignedAppointmentGraphParams

        if (operationalFilterOn) {
          assignedToMeParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "entityType": "all",
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0,
            ...operationalFilterReq
          }
        }
        else {
          assignedToMeParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "entityType": "all",
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0
          }
        }
        await dispatch(await getOperationalAssignedToMe(assignedToMeParams))
        console.log("getOperationalAssignedToMe result UI..", intDashRed?.operationalAssignedToMeData);

        if (operationalFilterOn) {
          appointmentOverviewParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "type": "Me",
            "fromDate": new Date(),
            ...operationalFilterReq
          }
        }
        else {
          appointmentOverviewParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "type": "Me",
            "fromDate": new Date()
          }
        }
        await dispatch(await getOperationalAppointmentOverview(appointmentOverviewParams))
        console.log("getOperationalAppointmentOverview result UI..", intDashRed?.operationalAppointmentOverviewData);

        if (operationalFilterOn) {
          teamAppointmentOverviewParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "type": "My Team",
            "fromDate": new Date()
          }
        }
        else {
          teamAppointmentOverviewParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "type": "My Team",
            "fromDate": new Date()
          }
        }
        await dispatch(await getOperationalTeamAppointmentOverview(teamAppointmentOverviewParams))
        console.log("getOperationalTeamAppointmentOverview result UI..", intDashRed?.operationalTeamAppointmentOverviewData);

        if (operationalFilterOn) {
          pooledInteractionParams = {
            ...operationalFilterReq,
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0
          }
        }
        else {
          pooledInteractionParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0
          }
        }
        await dispatch(await getOperationalPooledInteractions(pooledInteractionParams))
        console.log("getOperationalPooledInteractions result UI..", intDashRed?.operationalPooledInteractionsData);

        if (operationalFilterOn) {
          teamPooledInteractionParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0,
            ...operationalFilterReq
          }
        }
        else {
          teamPooledInteractionParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0
          }
        }
        await dispatch(await getOperationalTeamPooledInteractions(teamPooledInteractionParams))
        console.log("getOperationalTeamPooledInteractions result UI..", intDashRed?.operationalTeamPooledInteractionsData);

        if (operationalFilterOn) {
          assignedInteractionParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0,
            ...operationalFilterReq
          }
        }
        else {
          assignedInteractionParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0
          }
        }
        await dispatch(await getOperationalAssignedInteractions(assignedInteractionParams))
        console.log("getOperationalAssignedInteractions result UI..", intDashRed?.operationalAssignedInteractionsData);

        if (operationalFilterOn) {
          teamAssignedInteractionParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0,
            ...operationalFilterReq
          }
        }
        else {
          teamAssignedInteractionParams = {
            "userId": await getUserId(),
            "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
            "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
            "limit": 500,
            "page": 0
          }
        }
        await dispatch(await getOperationalTeamAssignedInteractions(teamAssignedInteractionParams))
        console.log("getOperationalTeamAssignedInteractions result UI..", intDashRed?.operationalTeamAssignedInteractionsData);

        if (operationalFilterOn) {
          interactionHistoryGraphParams = {
            "userId": await getUserId(),
            ...operationalFilterReq
          }
        }
        else {
          interactionHistoryGraphParams = {
            "userId": await getUserId(),
          }
        }
        await dispatch(await getOperationalInteractionHistoryGraph(interactionHistoryGraphParams))
        console.log("getOperationalInteractionHistoryGraph result UI..", intDashRed?.operationalInteractionHistoryGraphData);

        if (operationalFilterOn) {
          interactionHistoryGraphTeamParams = {
            "userId": await getUserId(),
            ...operationalFilterReq
          }
        }
        else {
          interactionHistoryGraphTeamParams = {
            "userId": await getUserId(),
          }
        }
        await dispatch(await getOperationalInteractionHistoryGraphTeam(interactionHistoryGraphTeamParams))
        console.log("getOperationalInteractionHistoryGraphTeam result UI..", intDashRed?.operationalInteractionHistoryGraphTeamData);

        if (operationalFilterOn) {
          assignedAppointmentGraphParams = {
            "userId": await getUserId(),
            ...operationalFilterReq
          }
        }
        else {
          assignedAppointmentGraphParams = {
            "userId": await getUserId(),
          }
        }
        await dispatch(await getAssignedAppointments(assignedAppointmentGraphParams))
        console.log("getAssignedAppointments result UI..", intDashRed?.operationalAssignedAppointmentsGraphData);

        if (operationalFilterOn) {
          teamAssignedAppointmentGraphParams = {
            "userId": await getUserId(),
            ...operationalFilterReq
          }
        }
        else {
          teamAssignedAppointmentGraphParams = {
            "userId": await getUserId(),
          }
        }
        await dispatch(await getTeamAssignedAppointments(teamAssignedAppointmentGraphParams))
        console.log("getTeamAssignedAppointments result UI..", intDashRed?.operationalTeamAssignedAppointmentsGraphData);

        dispatch(getInteractionByServiceCategory(params))
        console.log("getInteractionByServiceCategory result UI..", intDashRed.interactionByServiceCategoryData);

        dispatch(getInteractionByServiceType(params))
        console.log("getInteractionByServiceType result UI..", intDashRed.interactionByServiceTypeData);

        setLoader(false)
      }

      // ---------------------------------------------Operational requests end-------------------------------------------------------------



      // ---------------------------------------------Appointment requests start-------------------------------------------------------------

      if (showAppointmentDashboard) {

        await dispatch(await getUpcomingAppointments())
        console.log("getUpcomingAppointments result UI..", intDashRed.upcomingAppointmentsData);

        await dispatch(await getClosedAppointments())
        console.log("getClosedAppointments result UI..", intDashRed.closedAppointmentsData);

        await dispatch(await getAppointmentEvents())
        console.log("getAppointmentEvents result UI..", intDashRed.appointmentsEventsData);

        setLoader(false)
      }

      // ---------------------------------------------Appointment requests end-------------------------------------------------------------



      // ---------------------------------------------Helpdesk requests start-------------------------------------------------------------

      if (showHelpdeskDashboard) {

        // ---------------------------------------------Helpdesk live requests start-------------------------------------------------------------

        if (helpdeskLiveStream) {
          var fromDateVal = moment(new Date()).format("YYYY-MM-DD")
          var toDateVal = moment(new Date()).format("YYYY-MM-DD HH:MM:SS")

          var liveHelpdeskProjectWiseParams = { fromDate: fromDateVal, toDate: toDateVal }
          dispatch(getHelpdeskProjectWiseLive(liveHelpdeskProjectWiseParams))
          console.log("getHelpdeskProjectWiseLive result UI2..", intDashRed.helpdeskProjectWiseDataLive);

          var liveHelpdeskStatusParams = { fromDate: fromDateVal, toDate: toDateVal, type: "LIST" }
          dispatch(getHelpdeskByStatusListLive(liveHelpdeskStatusParams))
          console.log("getHelpdeskByStatusListLive result UI2..", intDashRed.helpdeskByStatusListDataLive);

          var liveHelpdeskByTypeDataParams = { fromDate: fromDateVal, toDate: toDateVal, type: "LIST" }
          dispatch(getHelpdeskByTypeLive(liveHelpdeskByTypeDataParams))
          console.log("getHelpdeskByTypeLive result UI2..", intDashRed.helpdeskByTypeDataLive);

          var liveHelpdeskBySeverityDataParams = { fromDate: fromDateVal, toDate: toDateVal, type: "LIST" }
          dispatch(getHelpdeskBySeverityLive(liveHelpdeskBySeverityDataParams))
          console.log("getHelpdeskBySeverityLive result UI2..", intDashRed.helpdeskBySeverityDataLive);
        }

        // ---------------------------------------------Helpdesk live requests end-------------------------------------------------------------

        dispatch(getHelpdeskSummary(params))
        console.log("getHelpdeskSummary result UI2..", intDashRed?.helpdeskSummaryData);

        dispatch(getHelpdeskHourlyTickets())
        console.log("getHelpdeskHourlyTickets result UI2..", intDashRed?.helpdeskSummaryData);

        dispatch(getSupportTtkPending(params))
        console.log("getSupportTtkPending count result UI3..", intDashRed?.supportTtkPendingCountsData);
        console.log("getSupportTtkPending result UI4..", intDashRed?.supportTtkPendingData);

        dispatch(getMonthlyTrend())
        console.log("getMonthlyTrend result UI2..", intDashRed.supportMonthlyTrendData);

        dispatch(getHelpdeskByStatus(params))
        console.log("getHelpdeskByStatus result UI2..", intDashRed.helpdeskByStatusData);

        dispatch(getHelpdeskByAgeing(params))
        console.log("getHelpdeskByAgeing result UI2..", intDashRed.helpdeskByAgeingData);

        await dispatch(await getHelpdeskBySeverity(params))
        console.log("getHelpdeskBySeverity result UI2..", intDashRed.helpdeskBySeverityData);

        dispatch(getHelpdeskProjectWise(params))
        console.log("getHelpdeskProjectWise result UI2..", intDashRed.helpdeskProjectWiseData);

        dispatch(getHelpdeskAgentWise(params))
        console.log("getHelpdeskAgentWise result UI2..", intDashRed.helpdeskAgentWiseData);

        let params1 = {
          helpdeskType: "CLARIFICATION",
          type: "LIST"
        };
        dispatch(getHelpdeskSummaryClarification(params1))
        console.log("getHelpdeskSummaryClarification result UI..", intDashRed?.helpdeskSummaryClarificationData);

        let params02 = {
          helpdeskType: "INCIDENT",
          type: "LIST"
        };
        dispatch(getHelpdeskSummaryIncident(params02))
        console.log("getHelpdeskSummaryIncident result UI..", intDashRed?.helpdeskSummaryIncidentData);

        let params3 = {
          helpdeskType: "SERVICEREQUEST",
          type: "LIST"
        };
        dispatch(getHelpdeskSummaryServiceRequest(params3))
        console.log("getHelpdeskSummaryServiceRequest result UI..", intDashRed?.helpdeskSummaryServiceRequestData);

        let params4 = {
          helpdeskType: null,
          type: "LIST"
        };

        await dispatch(await getHelpdeskSummaryUnclassified(params4))
        console.log("getHelpdeskSummaryUnclassified result UI..", intDashRed?.helpdeskSummaryUnclassifiedData);

        setLoader(false)
      }

      // ---------------------------------------------Helpdesk Requests end-------------------------------------------------------------
    }
    getData()
  }, [showHelpdeskDashboard, showInteractionDashboard, showOperationalDashboard, showAppointmentDashboard, helpdeskFilterOn, intxnFilterOn, operationalFilterOn]);


  useEffect(() => {
    async function getData() {
      let params = {
        "filterParams": {
          "tran_category_type": selAppTypeCode
        },
        "searchParams": {}
      }
      await dispatch(await getAppointmentsBasedOnType(params))
      console.log("getAppointmentsBasedOnType result UI..", intDashRed.typeBasedAppointmentData);
    }
    getData()
  }, [selAppTypeCode])


  useEffect(() => {
    async function getData() {
      var xAxisData = []
      var legend = []
      var dataParent = []
      var intxnPerformanceParams = {}

      if (topFivePerfCode == "INTXN_TYPE") {
        intxnPerformanceParams = {
          "userId": await getUserId(),
          "limit": 5
        }
        await dispatch(await getInteractionPerformance(intxnPerformanceParams, "interactionType"))
        console.log("top 5 interactions result 1..", intDashRed?.operationalIntxnPerformanceGraphData);
        xAxisData = [... new Set(intDashRed?.operationalIntxnPerformanceGraphData?.data?.rows?.map(n => n.status))]
        legend = [... new Set(intDashRed?.operationalIntxnPerformanceGraphData?.data?.rows?.map(n => n.type))]
        console.log("calculated xAxisData2....", xAxisData)
        console.log("calculated legend2....", legend)

        let data = []
        for (const x of Array.from(xAxisData)) {
          // for (const l of Array.from(legend)) {
          data = []
          let filteredData = []
          for (const l of Array.from(legend)) {
            // for (const x of Array.from(xAxisData)) {
            // let value = 0
            filteredData = intDashRed?.operationalIntxnPerformanceGraphData?.data?.rows?.filter(r => {
              if (r.type === l && r.status === x) {
                console.log("r.type.status....", r.type + " / " + r.status + " / " + r.count)
                data.push(Number(r.count))
                // console.log("r.status....", r.status + " / " + x + " / " + r.count)
                // value += Number(r.count)
              }
            })
          }
          dataParent.push(data)
        }
        console.log("calculated data3....", data)
        console.log("calculated data2....", dataParent)
      }

      else if (topFivePerfCode == "INTXN_CAT") {
        intxnPerformanceParams = {
          "userId": await getUserId(),
          "limit": 5
        }
        await dispatch(await getInteractionPerformance(intxnPerformanceParams, "interactionCategory"))
        console.log("top 5 interactions result 2..", intDashRed?.operationalIntxnPerformanceGraphData);
        xAxisData = [... new Set(intDashRed?.operationalIntxnPerformanceGraphData?.data?.rows?.map(n => n.status))]
        legend = [... new Set(intDashRed?.operationalIntxnPerformanceGraphData?.data?.rows?.map(n => n.type))]
        console.log("calculated xAxisData2....", xAxisData)
        console.log("calculated legend2....", legend)

        let data = []
        for (const x of Array.from(xAxisData)) {
          // for (const l of Array.from(legend)) {
          data = []
          let filteredData = []
          for (const l of Array.from(legend)) {
            // for (const x of Array.from(xAxisData)) {
            // let value = 0
            filteredData = intDashRed?.operationalIntxnPerformanceGraphData?.data?.rows?.filter(r => {
              if (r.type === l && r.status === x) {
                console.log("r.type.status....", r.type + " / " + r.status + " / " + r.count)
                data.push(Number(r.count))
                // console.log("r.status....", r.status + " / " + x + " / " + r.count)
                // value += Number(r.count)
              }
            })
          }
          dataParent.push(data)
        }
        console.log("calculated data3....", data)
        console.log("calculated data2....", dataParent)
      }

      const data = {
        labels: xAxisData,
        legend: legend,
        data: dataParent,
        // data: [[31, 6, 3, 2], [6]],
        barColors: ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]
      };

      setTopFiveIntxnPerfData(data)
    }
    getData()
  }, [topFivePerfDesc])

  // For top 5 performance team
  useEffect(() => {
    async function getData() {
      var xAxisData = []
      var legend = []
      var dataParent = []
      var intxnPerformanceParams = {}

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      var fromDateVal = moment(firstDay).format("YYYY-MM-DD")
      var toDateVal = moment(lastDay).format("YYYY-MM-DD")


      if (topFivePerfActivityTeamCode == "INTXN") {
        intxnPerformanceParams = {
          "fromDate": fromDateVal,
          "toDate": toDateVal,
          "limit": 5,
          "entityName": "interaction"
        }
        await dispatch(await getTopFivePerformanceActivityTeam(intxnPerformanceParams, "interaction"))
        console.log("top 5 interactions result 1..", intDashRed?.operationalTopFivePerformanceData);
        xAxisData = [... new Set(intDashRed?.operationalTopFivePerformanceData?.data?.rows?.map(n => n.oUserDesc))]
        legend = [... new Set(intDashRed?.operationalTopFivePerformanceData?.data?.rows?.map(n => n.oEntity))]
        console.log("calculated xAxisData2....", xAxisData)
        console.log("calculated legend2....", legend)

        let data = []
        for (const x of Array.from(xAxisData)) {
          // for (const l of Array.from(legend)) {
          data = []
          let filteredData = []
          for (const l of Array.from(legend)) {
            // for (const x of Array.from(xAxisData)) {
            // let value = 0
            filteredData = intDashRed?.operationalTopFivePerformanceData?.data?.rows?.filter(r => {
              if (r.type === l && r.status === x) {
                console.log("r.type.status....", r.type + " / " + r.status + " / " + r.count)
                data.push(Number(r.count))
                // console.log("r.status....", r.status + " / " + x + " / " + r.count)
                // value += Number(r.count)
              }
            })
          }
          dataParent.push(data)
        }
        console.log("calculated data3....", data)
        console.log("calculated data3....", dataParent)
      }

      else if (topFivePerfActivityTeamCode == "ORDER") {
        intxnPerformanceParams = {
          "fromDate": fromDateVal,
          "toDate": toDateVal,
          "limit": 5,
          "entityName": "order"
        }
        await dispatch(await getTopFivePerformanceActivityTeam(intxnPerformanceParams, "order"))
        console.log("top 5 interactions result 2..", intDashRed?.operationalTopFivePerformanceData);
        xAxisData = [... new Set(intDashRed?.operationalTopFivePerformanceData?.data?.rows?.map(n => n.oUserDesc))]
        legend = [... new Set(intDashRed?.operationalTopFivePerformanceData?.data?.rows?.map(n => n.oEntity))]
        console.log("calculated xAxisData4....", xAxisData)
        console.log("calculated legend4....", legend)

        let data = []
        for (const x of Array.from(xAxisData)) {
          // for (const l of Array.from(legend)) {
          data = []
          let filteredData = []
          for (const l of Array.from(legend)) {
            // for (const x of Array.from(xAxisData)) {
            // let value = 0
            filteredData = intDashRed?.operationalTopFivePerformanceData?.data?.rows?.filter(r => {
              if (r.type === l && r.status === x) {
                console.log("r.type.status....", r.type + " / " + r.status + " / " + r.count)
                data.push(Number(r.count))
                // console.log("r.status....", r.status + " / " + x + " / " + r.count)
                // value += Number(r.count)
              }
            })
          }
          dataParent.push(data)
        }
        console.log("calculated data5....", data)
        console.log("calculated data5....", dataParent)
      }

      const data = {
        labels: xAxisData,
        legend: legend,
        data: dataParent,
        // data: [[31, 6, 3, 2], [6]],
        barColors: ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]
      };

      setTopPerfActivityTeam(data)
    }
    getData()
  }, [topFivePerfActivityTeamDesc])

  // For top 5 category team
  useEffect(() => {
    async function getData() {
      var xAxisData = []
      var legend = []
      var dataParent = []
      var intxnPerformanceParams = {}

      if (topCategoryPerformanceTeamCode == "SOURCE") {
        intxnPerformanceParams = {
          "userId": await getUserId(),
          "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
          "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
        }
        await dispatch(await getTeamCategoryPerformance(intxnPerformanceParams))
        console.log("getTeamCategoryPerformance result0..", intDashRed?.operationalTeamCategoryPerformanceData);

        xAxisData = [... new Set(intDashRed?.operationalTeamCategoryPerformanceData?.data?.rows?.map(n => n.source))]
        console.log("calculated xAxisData0....", xAxisData)

        for (const x of Array.from(xAxisData)) {
          // data = []
          let filteredData = []
          let value = 0
          filteredData = intDashRed?.operationalTeamCategoryPerformanceData?.data?.rows?.filter(r => {
            if (r.source === x) {
              console.log("r.source....", r.source)
              value = value + 1
            }
          })
          dataParent.push(value)
        }
        console.log("calculated data0....", dataParent)
      }

      if (topCategoryPerformanceTeamCode == "SERVICE_TYPE") {
        intxnPerformanceParams = {
          "userId": await getUserId(),
          "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
          "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
        }
        await dispatch(await getTeamCategoryPerformance(intxnPerformanceParams))
        console.log("getTeamCategoryPerformance result0..", intDashRed?.operationalTeamCategoryPerformanceData);

        xAxisData = [... new Set(intDashRed?.operationalTeamCategoryPerformanceData?.data?.rows?.map(n => n.serviceType))]
        console.log("calculated xAxisData0....", xAxisData)

        for (const x of Array.from(xAxisData)) {
          // data = []
          let filteredData = []
          let value = 0
          filteredData = intDashRed?.operationalTeamCategoryPerformanceData?.data?.rows?.filter(r => {
            if (r.serviceType === x) {
              console.log("r.serviceType....", r.serviceType)
              value = value + 1
            }
          })
          dataParent.push(value)
        }
        console.log("calculated data0....", dataParent)
      }

      if (topCategoryPerformanceTeamCode == "CHANNEL") {
        intxnPerformanceParams = {
          "userId": await getUserId(),
          "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
          "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
        }
        await dispatch(await getTeamCategoryPerformance(intxnPerformanceParams))
        console.log("getTeamCategoryPerformance result0..", intDashRed?.operationalTeamCategoryPerformanceData);

        xAxisData = [... new Set(intDashRed?.operationalTeamCategoryPerformanceData?.data?.rows?.map(n => n.channel))]
        console.log("calculated xAxisData0....", xAxisData)

        for (const x of Array.from(xAxisData)) {
          // data = []
          let filteredData = []
          let value = 0
          filteredData = intDashRed?.operationalTeamCategoryPerformanceData?.data?.rows?.filter(r => {
            if (r.channel === x) {
              console.log("r.channel....", r.channel)
              value = value + 1
            }
          })
          dataParent.push(value)
        }
        console.log("calculated data0....", dataParent)
      }

      setTopCategoryPerformanceTeamLabels(xAxisData)
      setTopCategoryPerformanceTeamData(dataParent)
    }
    getData()
  }, [topCategoryPerformanceTeamDesc])


  const renderItem = ({ item }) => (
    <Pressable
      style={{
        borderRadius: 10,
        borderWidth: 0,
        borderColor: "#AEB3BE",
        padding: 0,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        justifyContent: "center",
        alignItems: "center",
      }}

      onPress={() => {

      }}
    >
      <Item body={item} />
    </Pressable>
  );

  const Item = ({ body }) => {
    console.log("body..", body)
    return (
      <Card style={{
        width: width - 60,
        alignContent: "center",
        flexDirection: "column",
        backgroundColor: "#FFF",
        marginTop: 5
      }}>
        <View style={{
          margin: 2,
          padding: 2,
          backgroundColor: "#FFF",
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.interaction_number}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oIntxnNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.intractionCategory}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oInteractionCategory}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.intractionType}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oInteractionType}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.serviceCategory}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oServiceCategory}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.serviceType}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oServiceType}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.priority}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oPriority}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.project}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oProject}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.status}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oStatus}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.channel}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oChannel}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.created_by}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oCreatedUser}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 200, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.created_date}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>
          </View>

        </View>
      </Card>
    );
  }

  const renderItem2 = ({ item }) => (
    <Pressable
      style={{
        borderRadius: 10,
        borderWidth: 0,
        borderColor: "#AEB3BE",
        padding: 0,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        justifyContent: "center",
        alignItems: "center",
      }}

      onPress={() => {

      }}
    >
      <Item2 body={item} />
    </Pressable>
  );

  const Item2 = ({ body }) => {
    console.log("body..", body)


    var helpdeskNo = ""
    if (!(body.oHelpdeskNo == undefined)) {
      helpdeskNo = body.oHelpdeskNo
    }
    else {
      helpdeskNo = body.helpdeskNo
    }

    var mailId = ""
    if (!(body.oMailId == undefined)) {
      mailId = body.oMailId
    }
    else {
      mailId = body.mailId
    }

    var userName = ""
    if (!(body.oUserName == undefined)) {
      userName = body.oUserName
    }
    else {
      userName = body.userName
    }

    var helpdeskSource = ""
    if (!(body.oHelpdeskSource == undefined)) {
      helpdeskSource = body.oHelpdeskSource
    }
    else {
      helpdeskSource = body.helpdeskSource
    }

    var priority = ""
    if (!(body.oPriority == undefined)) {
      priority = body.oPriority
    }
    else {
      priority = body.priority
    }

    var project = ""
    if (!(body.oProject == undefined)) {
      project = body.oProject
    }
    else {
      project = body.project
    }

    var helpdeskSubject = ""
    if (!(body.oHelpdeskSubject == undefined)) {
      helpdeskSubject = body.oHelpdeskSubject
    }
    else {
      helpdeskSubject = body.helpdeskSubject
    }

    var currUser = ""
    if (!(body.oCurrUser == undefined)) {
      currUser = body.oCurrUser
    }
    else {
      currUser = body.currUser
    }

    var status = ""
    if (!(body.oStatus == undefined)) {
      status = body.oStatus
    }
    else {
      status = body.status
    }

    var createdAt = ""
    if (!(body.oCreatedAt == undefined)) {
      createdAt = body.oCreatedAt
    }
    else {
      createdAt = body.createdAt
    }


    return (
      <Card style={{
        width: width - 60,
        alignContent: "center",
        flexDirection: "column",
        backgroundColor: "#FFF",
        margin: 3
      }}>
        <View style={{
          margin: 2,
          padding: 2,
          backgroundColor: "#FFF",
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 200, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Helpdesk No.</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{helpdeskNo}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 200, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Email</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{mailId}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 200, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Project</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{project}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 200, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Helpdesk Subject</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{helpdeskSubject}</Text>
            </View>

            {/* <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Current User</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{currUser}</Text>
            </View> */}
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Username</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{userName}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginLeft: 10 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Source</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{helpdeskSource}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Severity</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{priority}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginLeft: 10 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Current User</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{currUser}</Text>
            </View>
          </View>



          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginLeft: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Status</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{status}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginLeft: 10 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Actioned Date</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{moment(createdAt).format("DD MMM YYYY")}</Text>
            </View>
          </View>

        </View>
      </Card>
    );
  }

  // ---------------------------------------Dialogs start-----------------------------------------------------------------

  const ShowDashboardDialog = () => {
    return (
      <View style={{
        borderRadius: 10, elevation: 10,
        marginTop: 120, borderWidth: 0, alignSelf: "center",
        position: "absolute", top: 1, height: height - 450, width: width - 90,
        backgroundColor: "#FFF", opacity: 1, zIndex: 99999999999999
      }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }}>

          <Text style={{ fontSize: 15, fontWeight: 500 }}>Switch Dashboard</Text>

          <Card style={{ width: width - 150, marginTop: 20, backgroundColor: "#21618C", padding: 0 }}>
            <Text
              onPress={() => {
                unstable_batchedUpdates(() => {
                  setShowHelpdeskDashboard(true)
                  setShowInteractionDashboard(false)
                  setShowOperationalDashboard(false)
                  setShowAppointmentDashboard(false)
                  setOpenDashboardPopUp(false)
                })
              }}
              style={{ color: "#FFF", textAlign: "center", padding: 15, fontWeight: "500" }}>Helpdesk Dashboard</Text>
          </Card>

          <Card style={{ width: width - 150, backgroundColor: "#21618C", padding: 0, marginTop: 10 }}>
            <Text
              onPress={() => {
                unstable_batchedUpdates(() => {
                  setShowInteractionDashboard(true)
                  setShowHelpdeskDashboard(false)
                  setShowOperationalDashboard(false)
                  setShowAppointmentDashboard(false)
                  setOpenDashboardPopUp(false)
                })
              }}
              style={{ color: "#FFF", textAlign: "center", padding: 15, fontWeight: "500" }}>Interaction Dashboard</Text>
          </Card>

          <Card style={{ width: width - 150, backgroundColor: "#21618C", padding: 0, marginTop: 10 }}>
            <Text
              onPress={() => {
                unstable_batchedUpdates(() => {
                  setShowHelpdeskDashboard(false)
                  setShowInteractionDashboard(false)
                  setShowOperationalDashboard(true)
                  setShowAppointmentDashboard(false)
                  setOpenDashboardPopUp(false)
                  // setAssignToMeData(props.data?.rows)
                  setShowAssignedToMe(true)
                  setSelectedTab0("ME")
                  setSelectedTab1("INTXN")
                  setSelectedTab2("ASGN_TO_ME")
                })
              }}
              style={{ color: "#FFF", textAlign: "center", padding: 15, fontWeight: "500" }}>Operational Dashboard</Text>
          </Card>

          <Card style={{ width: width - 150, backgroundColor: "#21618C", padding: 0, marginTop: 10 }}>
            <Text
              onPress={() => {
                unstable_batchedUpdates(() => {
                  setShowHelpdeskDashboard(false)
                  setShowOperationalDashboard(false)
                  setShowInteractionDashboard(false)
                  setShowAppointmentDashboard(true)
                  setOpenDashboardPopUp(false)
                })
              }}
              style={{ color: "#FFF", textAlign: "center", padding: 15, fontWeight: "500" }}>Appointment Dashboard</Text>
          </Card>

        </View>
      </View>
    )
  };

  const ShowHelpdeskDetailsDialog = () => {

    console.log("data inside dialog..", helpdeskDialogData)

    return (
      <View style={{
        borderRadius: 10, elevation: 10, marginBottom: 70,
        marginTop: 20, borderWidth: 0, alignSelf: "center",
        position: "absolute", top: 1, height: height - 250, width: width - 20,
        backgroundColor: "#FFF", opacity: .9, zIndex: 99999999999999
      }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>

          <Text style={{ fontStyle: "italic", textAlign: "center", padding: 15, fontWeight: "900" }}>{dialogHeading}</Text>

          <FlatList
            style={{ height: height - 360, backgroundColor: Colors.BCAE_OFF_WHITE }}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={helpdeskDialogData}
            renderItem={renderItem2}
            keyExtractor={item => item}
          />

          <Card style={{ margin: 10, backgroundColor: "#FFF", width: width - 200 }}
            onPress={() => {
              console.log("Done button click..")
              setHelpdeskDetDialogVisible(false)
            }}>
            <Text style={{ backgroundColor: "#FFF", textAlign: "center", padding: 10, fontWeight: "500" }}>{strings.close}</Text>
          </Card>

        </View>
      </View>
    )
  };

  const ShowInteractionDetailsDialog = () => {

    console.log("data inside dialog..", dialogData)

    return (
      <View style={{
        borderRadius: 10, elevation: 10, marginBottom: 70,
        marginTop: 20, borderWidth: 0, alignSelf: "center",
        position: "absolute", top: 1, height: height - 250, width: width - 20,
        backgroundColor: "#FFF", opacity: .9, zIndex: 99999999999999
      }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>

          <Text style={{ fontStyle: "italic", textAlign: "center", padding: 15, fontWeight: "900" }}>{dialogHeading}</Text>

          <FlatList
            style={{ height: height - 360, backgroundColor: Colors.BCAE_OFF_WHITE }}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={dialogData}
            renderItem={renderItem}
            keyExtractor={item => item}
          />

          <Card style={{ margin: 10, backgroundColor: "#FFF", width: width - 200 }}
            onPress={() => {
              console.log("Done button click..")
              setIntxnDetDialogVisible(false)
            }}>
            <Text style={{ backgroundColor: "#FFF", textAlign: "center", padding: 10, fontWeight: "500" }}>{strings.close}</Text>
          </Card>

        </View>
      </View>
    )
  };

  const ShowHelpdeskFiltersDialog = () => {

    var project = intDashRed?.helpdeskProjectWiseData?.data?.rows?.map(item => {
      var project = ""
      if ((!(item.project == null)) && (!(item.project == "")) && (!(item.project == undefined))) {
        project = item.project
      }
      return { description: project, code: item.projectCode }
    })
    let projectArr = project?.filter((ele, ind) => ind === project.findIndex(elem => elem.description === ele.description && elem.code === ele.code))
    console.log(projectArr)

    var arr = intDashRed?.helpdeskByStatusData?.data?.map(item => {
      return { description: item.oStatus, code: item.oStatusCode }
    })
    let statusArr = arr?.filter((ele, ind) => ind === arr.findIndex(elem => elem.description === ele.description && elem.code === ele.code))
    console.log(statusArr)


    var arr = intDashRed?.helpdeskBySeverityData?.data?.map(item => {
      return { description: item.oStatus, code: item.oSeverityCode }
    })
    let severityArr = arr?.filter((ele, ind) => ind === arr.findIndex(elem => elem.description === ele.description && elem.code === ele.code))
    console.log(severityArr)


    return (
      <View style={{
        borderRadius: 10, elevation: 10, marginBottom: 70,
        marginTop: 10, borderWidth: 0, alignSelf: "center",
        position: "absolute", top: 1, height: height - 250, width: width - 20,
        backgroundColor: "#FFF", opacity: .9, zIndex: 99999999999999
      }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>

          {/* <Dialog style={{ marginTop: -40, height: 550 }} visible={helpdeskFilterDialogVisible} >
            <Dialog.Content> */}

          <ScrollView>

            <View style={{ paddingVertical: 10 }}>
              <CustomInput
                value={moment(selFromDate).format(
                  "YYYY-MM-DD"
                )}
                caption={"From Date"}
                onFocus={() => setOpenFromDatePicker(true)}
                placeHolder={""}
                right={
                  <TextInput.Icon
                    onPress={() => setOpenFromDatePicker(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />

              <DatePicker
                modal
                mode="date"
                open={openFromDatePicker}
                onCancel={() => setOpenFromDatePicker(false)}
                date={selFromDate}
                onConfirm={(params) => {
                  unstable_batchedUpdates(() => {
                    setSelFromDate(params)
                    setOpenFromDatePicker(false);
                  })
                }}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomInput
                value={moment(selToDate).format(
                  "YYYY-MM-DD"
                )}
                caption={"To Date"}
                onFocus={() => setOpenToDatePicker(true)}
                placeHolder={""}
                right={
                  <TextInput.Icon
                    onPress={() => setOpenToDatePicker(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />

              <DatePicker
                modal
                mode="date"
                open={openToDatePicker}
                onCancel={() => setOpenToDatePicker(false)}
                date={selToDate}
                onConfirm={(params) => {
                  unstable_batchedUpdates(() => {
                    setSelToDate(params)
                    setOpenToDatePicker(false);
                  })
                }}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={helpdeskFilterReq?.project?.[0]?.label}
                data={projectArr}
                onChangeText={(text) => {
                  setHelpdeskFilterReq({
                    ...helpdeskFilterReq, "project": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={projCode}
                caption={"By Project"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={helpdeskFilterReq?.status?.[0]?.label}
                data={statusArr}
                onChangeText={(text) => {
                  setHelpdeskFilterReq({
                    ...helpdeskFilterReq, "status": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={statusCode}
                caption={"By Status"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={helpdeskFilterReq?.severity?.[0]?.label}
                data={severityArr}
                onChangeText={(text) => {
                  setHelpdeskFilterReq({
                    ...helpdeskFilterReq, "severity": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={channelCode}
                caption={"By Channel"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
              <CustomButton
                style={{ height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                label={"Cancel"} onPress={() => {
                  // if (!helpdeskFilterReq == {}) {
                  setHelpdeskFilterReq({})
                  unstable_batchedUpdates(() => {
                    setHelpdeskFilterDialogVisible(false)
                    setHelpdeskFilterOn(false)
                    // setIntxnFilterDialogVisible(false)
                    // setIntxnFilterOn(false)
                  })
                  // }
                }}
              />

              <CustomButton
                style={{ height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                label={"Filter"} onPress={() => {

                  var currDate = moment(new Date()).format("YYYY-MM-DD")
                  var from = moment(selFromDate).format("YYYY-MM-DD")
                  var fromRange = moment(selFromDate).format("YYYY-MM-DDTHH:MM:SSSZ")
                  var to = moment(selToDate).format("YYYY-MM-DD")
                  var toRange = moment(selToDate).format("YYYY-MM-DDTHH:MM:SSSZ")
                  var dateArr = [fromRange, toRange]

                  // if (!(currDate == from)) {
                  // setHelpdeskFilterReq({
                  //   ...helpdeskFilterReq, "dateRange": dateArr, fromDate: from, toDate: to
                  // })
                  // }

                  setHelpdeskFilterReq({
                    ...helpdeskFilterReq, type: "COUNT", "dateRange": dateArr, fromDate: from, toDate: to
                  })

                  console.log("helpdeskFilterReq..", helpdeskFilterReq)

                  // unstable_batchedUpdates(() => {
                  setHelpdeskFilterOn(true)
                  setHelpdeskFilterDialogVisible(false)
                  // setIntxnFilterDialogVisible(false)
                  // setIntxnFilterOn(false)
                  // })

                }}
              />

            </View>

          </ScrollView>

          {/* </Dialog.Content> */}
          {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}
          {/* </Dialog> */}

        </View>
      </View>
    )
  };

  const ShowIntxnFiltersDialog = () => {

    // var ageingArr = intDashRed?.interactionByAgeingData?.data?.rows?.map(item => {
    //   var project = ""
    //   if (!(item.oProject == null)) {
    //     project = item.oProject
    //   }
    //   return { description: project, code: item.oProjectCode }
    // })
    // console.log("ageingArr...", ageingArr)


    var ageingArr = [
      { description: "0 to 3 days", code: "0_3DAYS" },
      { description: "3 to 5 days", code: "3_5DAYS" },
      { description: ">5 days", code: "MORE_5DAYS" }
    ]

    var projectArr = intDashRed?.interactionByProjectWiseData?.data?.rows?.map(item => {
      var project = ""
      if (!(item.oProject == null)) {
        project = item.oProject
      }
      return { description: project, code: item.oProjectCode }
    })
    // var projectArr = [...new Set(_projectArr?.map(item => item.description))];
    console.log("projectArr...", projectArr)


    var statusArr = intDashRed?.liveInteractionsByStatusData?.data?.rows?.map(item => {
      return { description: item.currStatusDesc.description, code: item.currStatusDesc.code }
    })
    // var statusArr = [...new Set(_statusArr?.map(item => item.description))];
    console.log("statusArr...", statusArr)

    var channelArr = intDashRed?.channelWiseData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    // var channelArr = [...new Set(_channelArr?.map(item => item.description))];
    console.log("channelArr...", channelArr)

    var priorityArr = intDashRed?.interactionByPriorityData?.data?.rows?.map(item => {
      return { description: item.oPriorityDesc, code: item.oPriorityCode }
    })
    // var priorityArr = [...new Set(_priorityArr?.map(item => item.description))];
    console.log("priorityArr...", priorityArr)

    var userArr = intDashRed?.interactionByAgentWiseData?.data?.rows?.map(item => {
      return { description: item.oCurrUserDesc, code: item.oCurrUser }
    })
    // var userArr = [...new Set(_userArr?.map(item => item.description))];
    console.log("userArr...", userArr)

    var intCategoryArr = intDashRed?.interactionByCategoryData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    // var intCategoryArr = [...new Set(_intCategoryArr?.map(item => item.description))];
    console.log("intCategoryArr...", intCategoryArr)

    var intTypeArr = intDashRed?.interactionByTypeData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    // var intTypeArr = [...new Set(_intTypeArr?.map(item => item.description))];
    console.log("intTypeArr...", intTypeArr)

    var serviceCategoryArr = intDashRed?.interactionByServiceCategoryData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    // var serviceCategoryArr = [...new Set(_serviceCategoryArr?.map(item => item.description))];
    console.log("serviceCategoryArr...", serviceCategoryArr)

    var serviceTypeArr = intDashRed?.interactionByServiceTypeData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    // var serviceTypeArr = [...new Set(_serviceTypeArr?.map(item => item.description))];
    console.log("serviceTypeArr...", serviceTypeArr)


    console.log("intxnFilterReq...", intxnFilterReq)

    return (
      <View style={{
        borderRadius: 10, elevation: 10, marginBottom: 70,
        marginTop: 10, borderWidth: 0, alignSelf: "center",
        position: "absolute", top: 1, height: height - 250, width: width - 20,
        backgroundColor: "#FFF", opacity: .9, zIndex: 99999999999999
      }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>

          {/* <Dialog style={{ marginTop: -40, height: 550 }} visible={intxnFilterDialogVisible} >
            <Dialog.Content> */}

          <ScrollView>

            <View style={{ paddingVertical: 10 }}>
              <CustomInput
                value={moment(selFromDate).format(
                  "YYYY-MM-DD"
                )}
                caption={"From Date"}
                onFocus={() => setOpenFromDatePicker(true)}
                placeHolder={""}
                right={
                  <TextInput.Icon
                    onPress={() => setOpenFromDatePicker(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />

              <DatePicker
                modal
                mode="date"
                open={openFromDatePicker}
                onCancel={() => setOpenFromDatePicker(false)}
                date={selFromDate}
                onConfirm={(params) => {
                  unstable_batchedUpdates(() => {
                    setSelFromDate(params)
                    setOpenFromDatePicker(false);
                  })
                }}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomInput
                value={moment(selToDate).format(
                  "YYYY-MM-DD"
                )}
                caption={"To Date"}
                onFocus={() => setOpenToDatePicker(true)}
                placeHolder={""}
                right={
                  <TextInput.Icon
                    onPress={() => setOpenToDatePicker(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />

              <DatePicker
                modal
                mode="date"
                open={openToDatePicker}
                onCancel={() => setOpenToDatePicker(false)}
                date={selToDate}
                onConfirm={(params) => {
                  unstable_batchedUpdates(() => {
                    setSelToDate(params)
                    setOpenToDatePicker(false);
                  })
                }}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.project?.[0]?.label}
                data={projectArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "project": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={projCode}
                caption={"By Project"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.ageing?.[0]?.label}
                data={ageingArr}
                onChangeText={(text) => {
                  var fromDate = "", toDate = ""

                  if (text.code == "0_3DAYS") {
                    var toDate = new Date();
                    fromDate = new Date(new Date().setDate(toDate.getDate() - 3));
                  }

                  if (text.code == "3_5DAYS") {
                    var currDate = new Date();
                    toDate = new Date(new Date().setDate(currDate.getDate() - 3));
                    fromDate = new Date(new Date().setDate(currDate.getDate() - 5));
                  }

                  if (text.code == "MORE_5DAYS") {
                    var currDate = new Date();
                    toDate = new Date(new Date().setDate(currDate.getDate() - 5));
                    fromDate = new Date(new Date().setDate(currDate.getDate() - 30));
                  }

                  console.log("fromDate...", fromDate)
                  console.log("toDate...", toDate)

                  unstable_batchedUpdates(() => {
                    setSelFromDate(fromDate)
                    setSelToDate(toDate)
                    setIntxnFilterReq({
                      ...intxnFilterReq, "ageing": [{
                        label: text.description,
                        value: text.code
                      }]
                    })
                  })

                }}
                value={projCode}
                caption={"By Ageing"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.status?.[0]?.label}
                data={statusArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "status": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={statusCode}
                caption={"By Status"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.channel?.[0]?.label}
                data={channelArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "channel": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={channelCode}
                caption={"By Channel"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.priority?.[0]?.label}
                data={priorityArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "priority": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={priorityCode}
                caption={"By Priority"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.userId?.[0]?.label}
                data={userArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "userId": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={userCode}
                caption={"By User"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.intxnCat?.[0]?.label}
                data={intCategoryArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "intxnCat": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={intCatCode}
                caption={"By Interaction Category"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.intxnType?.[0]?.label}
                data={intTypeArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "intxnType": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={intTypeCode}
                caption={"By Interaction Type"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.serviceCat?.[0]?.label}
                data={serviceCategoryArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "serviceCat": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={serviceCatCode}
                caption={"By Service Category"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={intxnFilterReq?.serviceType?.[0]?.label}
                data={serviceTypeArr}
                onChangeText={(text) => {
                  setIntxnFilterReq({
                    ...intxnFilterReq, "serviceType": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={serviceTypeCode}
                caption={"By Service Type"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
              <CustomButton
                style={{ height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                label={"Cancel"} onPress={() => {
                  // if (!intxnFilterReq == {}) {
                  setIntxnFilterReq({})
                  unstable_batchedUpdates(() => {
                    setIntxnFilterDialogVisible(false)
                    setIntxnFilterOn(false)
                    // setHelpdeskFilterDialogVisible(false)
                    // setHelpdeskFilterOn(false)
                  })
                  // }
                }}
              />

              <CustomButton
                style={{ height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                label={"Filter"} onPress={() => {

                  console.log("selFromDate2...", selFromDate)
                  console.log("selToDate2...", selToDate)

                  var currDate = moment(new Date()).format("YYYY-MM-DD")
                  var from = moment(selFromDate).format("YYYY-MM-DD")
                  var fromRange = moment(selFromDate).format("YYYY-MM-DDTHH:MM:SSSZ")
                  var to = moment(selToDate).format("YYYY-MM-DD")
                  var toRange = moment(selToDate).format("YYYY-MM-DDTHH:MM:SSSZ")
                  var dateArr = [fromRange, toRange]

                  // if (!(currDate == from)) {
                  // setHelpdeskFilterReq({
                  //   ...helpdeskFilterReq, "dateRange": dateArr, fromDate: from, toDate: to
                  // })
                  // }




                  console.log("intxnFilterParams1..", intxnFilterReq)
                  // console.log("intxnFilterParams2..", JSON.stringify(filterParams))


                  unstable_batchedUpdates(() => {
                    setIntxnFilterReq({
                      ...helpdeskFilterReq, type: "COUNT", "dateRange": dateArr, fromDate: from, toDate: to
                    })
                    setIntxnFilterDialogVisible(false)
                    setIntxnFilterOn(true)
                    // setHelpdeskFilterDialogVisible(false)
                    // setHelpdeskFilterOn(false)
                  })

                }}
              />
            </View>

          </ScrollView>

          {/* </Dialog.Content> */}
          {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}
          {/* </Dialog> */}

        </View>
      </View>
    )
  };


  const ShowOperationalFiltersDialog = () => {

    var serviceCategoryArr = intDashRed?.interactionByServiceCategoryData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    console.log("serviceCategoryArr...", serviceCategoryArr)

    var serviceTypeArr = intDashRed?.interactionByServiceTypeData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    console.log("serviceTypeArr...", serviceTypeArr)

    return (
      <View style={{
        borderRadius: 10, elevation: 10, marginBottom: 70,
        marginTop: 10, borderWidth: 0, alignSelf: "center",
        position: "absolute", top: 1, height: height - 250, width: width - 20,
        backgroundColor: "#FFF", opacity: .9, zIndex: 99999999999999
      }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>

          <ScrollView>

            <View style={{ paddingVertical: 10 }}>
              <CustomInput
                value={moment(selFromDate).format(
                  "YYYY-MM-DD"
                )}
                caption={"From Date"}
                onFocus={() => setOpenFromDatePicker(true)}
                placeHolder={""}
                right={
                  <TextInput.Icon
                    onPress={() => setOpenFromDatePicker(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />

              <DatePicker
                modal
                mode="date"
                open={openFromDatePicker}
                onCancel={() => setOpenFromDatePicker(false)}
                date={selFromDate}
                onConfirm={(params) => {
                  unstable_batchedUpdates(() => {
                    setSelFromDate(params)
                    setOpenFromDatePicker(false);
                  })
                }}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomInput
                value={moment(selToDate).format(
                  "YYYY-MM-DD"
                )}
                caption={"To Date"}
                onFocus={() => setOpenToDatePicker(true)}
                placeHolder={""}
                right={
                  <TextInput.Icon
                    onPress={() => setOpenToDatePicker(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />

              <DatePicker
                modal
                mode="date"
                open={openToDatePicker}
                onCancel={() => setOpenToDatePicker(false)}
                date={selToDate}
                onConfirm={(params) => {
                  unstable_batchedUpdates(() => {
                    setSelToDate(params)
                    setOpenToDatePicker(false);
                  })
                }}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={operationalFilterReq?.serviceCat?.[0]?.label}
                data={serviceCategoryArr}
                onChangeText={(text) => {
                  setOperationalFilterReq({
                    ...operationalFilterReq, "serviceCat": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={serviceCatCode}
                caption={"By Service Category"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ paddingVertical: 10 }}>
              <CustomDropDownFullWidth
                selectedValue={operationalFilterReq?.serviceType?.[0]?.label}
                data={serviceTypeArr}
                onChangeText={(text) => {
                  setOperationalFilterReq({
                    ...operationalFilterReq, "serviceType": [{
                      label: text.description,
                      value: text.code
                    }]
                  })
                }}
                value={serviceTypeCode}
                caption={"By Service Type"}
                placeHolder={"Select"}
              />
            </View>

            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
              <CustomButton
                style={{ height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                label={"Cancel"} onPress={() => {
                  // if (!helpdeskFilterReq == {}) {
                  setOperationalFilterReq({})
                  unstable_batchedUpdates(() => {
                    setOperationalFilterDialogVisible(false)
                    setOperationalFilterOn(false)
                    // setIntxnFilterDialogVisible(false)
                    // setIntxnFilterOn(false)
                  })
                  // }
                }}
              />

              <CustomButton
                style={{ height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                label={"Filter"} onPress={() => {

                  var currDate = moment(new Date()).format("YYYY-MM-DD")
                  var from = moment(selFromDate).format("YYYY-MM-DD")
                  var fromRange = moment(selFromDate).format("YYYY-MM-DDTHH:MM:SSSZ")
                  var to = moment(selToDate).format("YYYY-MM-DD")
                  var toRange = moment(selToDate).format("YYYY-MM-DDTHH:MM:SSSZ")
                  var dateArr = [fromRange, toRange]

                  // if (!(currDate == from)) {
                  // setHelpdeskFilterReq({
                  //   ...helpdeskFilterReq, "dateRange": dateArr, fromDate: from, toDate: to
                  // })
                  // }

                  setOperationalFilterReq({
                    ...operationalFilterReq, type: "COUNT", "dateRange": dateArr, fromDate: from, toDate: to
                  })

                  console.log("operationalFilterReq..", operationalFilterReq)

                  // unstable_batchedUpdates(() => {
                  setOperationalFilterOn(true)
                  setOperationalFilterDialogVisible(false)
                  // setIntxnFilterDialogVisible(false)
                  // setIntxnFilterOn(false)
                  // })

                }}
              />

            </View>

          </ScrollView>

          {/* </Dialog.Content> */}
          {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}
          {/* </Dialog> */}

        </View>
      </View>
    )
  };

  // ---------------------------------------Dialogs end-----------------------------------------------------------------


  // ---------------------------------------Interaction methods start-----------------------------------------------------------------

  const RenderDepartmentWiseInteractionData = (props) => {

    // console.log("department wise data...", props?.data?.departmentInteractionsData)
    console.log("departmentVsRolesInteractionsData...", props?.data?.departmentVsRolesInteractionsData)

    var deptLabels = []
    var deptCounts = []
    props?.data?.departmentInteractionsData?.data?.rows?.map(item => {
      deptLabels.push("")
      deptCounts.push(item.oIntxnCount)
    })
    const colorsArr = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#F39C12', '#DC7633', '#5DADE2']

    var childRoleXAxisData = []
    var legend = []
    var dataParent = []

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Interaction by Department Wise Vs Role Wise</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={2} />

          <Text style={{ padding: 5, fontWeight: "900" }}>Department Wise</Text>
          <ClearSpace />

          <View style={{ backgroundColor: "#FFF", flexDirection: "column" }}>
            <View>
              <View style={{ backgroundColor: "#FFF", flexDirection: "row" }}>
                <ScrollView style={{ backgroundColor: '#FFF', padding: 10 }} horizontal={true} thick>
                  {props?.data?.departmentInteractionsData?.data?.rows?.map((item, idx) => {

                    return (
                      <View style={{
                        borderRadius: 10,
                        elevation: 10,
                        padding: 10,
                        backgroundColor: "#FFF",
                        width: 150,
                        alignSelf: "center",
                        marginTop: 10,
                        marginLeft: 10
                      }}>
                        <View style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "flex-start"
                        }}>
                          <View style={{
                            marginRight: 2,
                            width: 10, height: 10, borderRadius: 2,
                            backgroundColor: colorsArr[idx]
                          }} />
                          <Text style={{ marginLeft: 10, fontSize: 11 }}
                            onPress={async () => {
                              console.log("click...", item.oStatus)

                              var deptVsRolesParams = {
                                "departmentId": item.oStatusCode,
                                "category": "COUNT"
                              }
                              await dispatch(await getDepartmentVsRolesInteractions(deptVsRolesParams))
                              console.log("getDepartmentVsRolesInteractions result UI..", intDashRed.departmentVsRolesInteractionsData);

                              xAxisData = [... new Set(intDashRed?.departmentVsRolesInteractionsData?.data?.rows?.map(n => n.oCurrDeptDesc))]
                              legend = [... new Set(intDashRed?.departmentVsRolesInteractionsData?.data?.rows?.map(n => n.oCurrRoleDec))]
                              console.log("xAxisData....", xAxisData)
                              console.log("legend....", legend)

                              // let data = []
                              for (const x of Array.from(xAxisData)) {
                                let filteredData = []
                                for (const l of Array.from(legend)) {
                                  filteredData = intDashRed?.departmentVsRolesInteractionsData?.data?.rows?.filter(r => {
                                    if (r.oCurrRoleDec === l && r.oCurrDeptDesc === x) {
                                      console.log("r.oCurrRoleDec.oCurrDeptDesc....", r.oCurrRoleDec + " / " + r.oCurrDeptDesc)
                                      dataParent.push(Number(r.oIntxnCount))
                                    }
                                  })
                                }
                                // dataParent.push(data)
                              }

                              // console.log("calculated data....", data)
                              console.log("calculated dataParent....", dataParent)

                              unstable_batchedUpdates(() => {
                                setSelectedRole(item.oStatus)
                                setRoleLabel(legend)
                                setRoleData(dataParent)
                              })

                            }}>{item.oStatus}</Text>
                        </View>
                      </View>
                    )
                  })}
                </ScrollView>
              </View>

              <BarChart
                flatColor={true}
                withCustomBarColorFromData={true}
                data={{
                  labels: deptLabels,
                  datasets: [
                    {
                      data: deptCounts,
                      colors: [
                        () => "#58D68D",
                        () => "#C0392B",
                        () => "#E74C3C",
                        () => "#9B59B6"
                      ]
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 30}
                height={270}
                yAxisLabel={''}
                chartConfig={{
                  backgroundColor: '#FFF',
                  backgroundGradientFrom: '#FFF',
                  backgroundGradientTo: '#FFF',
                  decimalPlaces: 0,
                  color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                verticalLabelRotation={90}
              />
            </View>


          </View>




          <View style={{ marginTop: 0 }}>

            <Text style={{ padding: 5, fontWeight: "900" }}>Role Wise - {selectedRole}</Text>
            <ClearSpace />

            {console.log("roleLabel got..", roleLabel)}
            {console.log("roleData got..", roleData)}

            <BarChart
              flatColor={true}
              withCustomBarColorFromData={true}
              data={{
                labels: roleLabel,
                datasets: [
                  {
                    data: roleData,
                    colors: [
                      () => "pink",
                      () => "purple",
                      () => "gray",
                      () => "magenta",
                      () => "cyan",
                      () => "green",
                      () => "red",
                      () => "blue",
                      () => "yellow",
                      () => "orange"
                    ]
                  },
                ],
              }}
              width={Dimensions.get('window').width - 30}
              height={270}
              yAxisLabel={''}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />

          </View>

          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderOverviewData = (props) => {

    var arrTotal = []
    props?.data?.interactionsByStatusListData?.data?.rows?.map(item => {
      arrTotal.push(item)
    })

    var arrNew = []
    props?.data?.interactionsByStatusListData?.data?.rows?.map(item => {
      if (item.oStatusCode === "NEW") {
        arrNew.push(item)
      }
    })

    var arrClosed = []
    props?.data?.interactionsByStatusListData?.data?.rows?.map(item => {
      if (item.oStatusCode === "CLOSED") {
        arrClosed.push(item)
      }
    })

    var arrWip = []
    props?.data?.interactionsByStatusListData?.data?.rows?.map(item => {
      if (((item.oStatusCode === "NEW") || (item.oStatusCode === "CLOSED") || (item.oStatusCode === "CANCELLED"))) {

      }
      else {
        arrWip.push(item)
      }
    })

    var countTotal = 0
    props?.data?.statusWiseCountData?.data?.rows?.map(item => {
      countTotal = countTotal + item.oIntxnCount
    })

    var countNew = 0
    props?.data?.statusWiseCountData?.data?.rows?.map(item => {
      if (item.oStatusCode === "NEW") {
        countNew = countNew + item.oIntxnCount
        // countTotal = countTotal + item.oIntxnCount
      }
    })

    var countClosed = 0
    props?.data?.statusWiseCountData?.data?.rows?.map(item => {
      if (item.oStatusCode === "CLOSED") {
        countClosed = countClosed + item.oIntxnCount
        // countTotal = countTotal + item.oIntxnCount
      }
    })

    var countWip = 0
    props?.data?.statusWiseCountData?.data?.rows?.map(item => {
      if (!((item.oStatusCode === "NEW") || (item.oStatusCode === "CLOSED") || (item.oStatusCode === "CANCELLED"))) {

      }
      else {
        countWip = countWip + item.oIntxnCount
        // countTotal = countTotal + item.oIntxnCount
      }
    })




    console.log("priority data2...", props?.data?.interactionByPriorityData)

    var priorityWiseLabels = []
    var priorityWiseValues = []
    props?.data?.interactionByPriorityData?.data?.rows?.map(item => {
      priorityWiseLabels.push(item.oPriorityDesc)
      priorityWiseValues.push('' + item.oIntxnCount)
    })

    console.log("priorityWiseLabels data2...", priorityWiseLabels)
    console.log("priorityWiseValues data2...", priorityWiseValues)


    var xAxisLabels = []
    var xAxisData = []
    var data = []

    if (!((priorityStatusData.length == 0) || (Object.keys(priorityStatusData).length == 0))) {
      console.log("priorityStatusData......", priorityStatusData)
      if (priorityStatusData?.data?.rows?.length > 0) {
        const groupedData = groupBy(priorityStatusData?.data?.rows, "oTimeWise");
        xAxisLabels = Object.keys(groupedData);
        xAxisLabels.sort(function (a, b) {
          return new Date(`${a}`) - new Date(`${b}`);
        });
        console.log("xAxisLabels xxx==> ", xAxisLabels);


        for (let index = 0; index < xAxisLabels.length; index++) {
          const item = groupedData[xAxisLabels[index]];
          xAxisData.push({
            value: Number(item?.length ?? 0),
            meta: {
              createdAt: xAxisLabels[index],
              statusData: [Object.fromEntries(Object.entries(groupedData[xAxisLabels[index]].reduce((acc, { oStatusDesc }) => (acc[oStatusDesc] = (acc[oStatusDesc] || 0) + 1, acc), {})))]
            }
          })
        }

        xAxisData.map(item => {
          data.push(item.value)
        })
      }
      else {
        setPriorityStatusWiseData(intDashRed.interactionByPriorityStatusWiseData)
      }


      return (
        <>
          <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

            <Text style={{ padding: 5, fontWeight: "900" }}>Overview</Text>
            <ClearSpace />
            <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
            <ClearSpace size={4} />


            <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
              <Card
                onPress={() => {
                  dialogHeading = "Interaction By Status"
                  setDialogData(arrTotal)
                  setIntxnDetDialogVisible(true)
                }}
                style={{ width: 150, backgroundColor: "#21618C", padding: 10, elevation: 10, margin: 7 }}>

                <Text style={{ padding: 5, color: "#FFFFFF" }}>Total Interaction</Text>

                <Text
                  style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>
                  {countTotal}
                </Text>
              </Card>

              <Card
                onPress={() => {
                  dialogHeading = "Interaction By Status - New"
                  setDialogData(arrNew)
                  setIntxnDetDialogVisible(true)
                }}
                style={{ width: 150, backgroundColor: "#85C1E9", padding: 10, elevation: 10, margin: 7 }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Open Interaction</Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{countNew}</Text>
              </Card>
            </View>

            <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
              <Card
                onPress={() => {
                  dialogHeading = "Interaction By Status - WIP"
                  setDialogData(arrWip)
                  setIntxnDetDialogVisible(true)
                }}
                style={{ width: 150, backgroundColor: "#F7DC6F", padding: 10, elevation: 10, margin: 7 }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Work in progress</Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{countWip}</Text>
              </Card>

              <Card
                onPress={() => {
                  dialogHeading = "Interaction By Status - Closed"
                  setDialogData(arrClosed)
                  setIntxnDetDialogVisible(true)
                }}
                style={{ width: 150, backgroundColor: "#DC7633", padding: 10, elevation: 10, margin: 7 }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Closed Interaction</Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{countClosed}</Text>
              </Card>
            </View>

            {/* <ClearSpace size={4} /> */}
            {/* <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider> */}
            <ClearSpace size={4} />

            <Text style={{ padding: 5, color: "#000000" }}>Average Interaction</Text>

            <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>

              <Card
                onPress={async () => {
                  await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "YTD" } }))
                  console.log("getInteractionByPriorityStatusWise 1D UI..", intDashRed.interactionByPriorityStatusWiseData);
                  setPriorityStatusWiseData(intDashRed.interactionByPriorityStatusWiseData)
                }}
                style={{ width: 50, height: 30, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
                <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>1D</Text>
              </Card>

              <Card
                onPress={async () => {
                  await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "1W" } }))
                  console.log("getInteractionByPriorityStatusWise 1W UI..", intDashRed.interactionByPriorityStatusWiseData);
                  setPriorityStatusWiseData(intDashRed.interactionByPriorityStatusWiseData)
                }}
                style={{ width: 50, height: 30, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
                <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>1W</Text>
              </Card>

              <Card
                onPress={async () => {
                  await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "1M" } }))
                  console.log("getInteractionByPriorityStatusWise 1M UI..", intDashRed.interactionByPriorityStatusWiseData);
                  setPriorityStatusWiseData(intDashRed.interactionByPriorityStatusWiseData)
                }}
                style={{ width: 50, height: 30, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
                <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>1M</Text>
              </Card>

              <Card
                onPress={async () => {
                  await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "1Y" } }))
                  console.log("getInteractionByPriorityStatusWise 1Y UI..", intDashRed.interactionByPriorityStatusWiseData);
                  setPriorityStatusWiseData(intDashRed.interactionByPriorityStatusWiseData)
                }}
                style={{ width: 50, height: 30, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
                <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>1Y</Text>
              </Card>

              <Card
                onPress={async () => {
                  await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "YTD" } }))
                  console.log("getInteractionByPriorityStatusWise YTD UI..", intDashRed.interactionByPriorityStatusWiseData);
                  setPriorityStatusWiseData(intDashRed.interactionByPriorityStatusWiseData)
                }}
                style={{ width: 50, height: 30, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
                <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>YTD</Text>
              </Card>

              <Card
                onPress={async () => {
                  await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "ALL" } }))
                  console.log("getInteractionByPriorityStatusWise ALL UI..", intDashRed.interactionByPriorityStatusWiseData);
                  setPriorityStatusWiseData(intDashRed.interactionByPriorityStatusWiseData)
                }}
                style={{ width: 50, height: 30, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
                <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>ALL</Text>
              </Card>

            </View>

            {console.log("xAxisLabels5...", xAxisLabels)}
            {console.log("xAxisData5...", xAxisData)}

            {(data.length > 0) && (
              <LineChart
                data={{
                  labels: xAxisLabels,
                  datasets: [
                    {
                      data: data,
                    },
                  ],
                }}
                hidePointsAtIndex={Array.from({ length: xAxisLabels.length }, (v, k) => (k % 2 === 0) ? k : null)}
                width={Dimensions.get('window').width - 10} // from react-native
                height={350}
                yAxisLabel={''}
                chartConfig={{
                  backgroundColor: '#FFF',
                  backgroundGradientFrom: '#FFF',
                  backgroundGradientTo: '#FFF',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  marginTop: 10,
                  marginLeft: - 33,
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                verticalLabelRotation={90}
              />
            )}

            {/* <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={() => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    priority: [{ label: "", value: "PRTYHGH" }]
                  }
                };
                dispatch(getInteractionByPriorityHigh(params))
                console.log("getInteractionByPriorityHigh result UI..", intDashRed?.interactionByPriorityHighData);

                setVisible(true)
                setDialogData(intDashRed.interactionByPriorityHighData?.data?.rows)
                dialogHeading = "Interaction By Priority (High)"
              }}
              style={{ width: 80, height: 50, backgroundColor: "#85C1E9", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#FFFFFF" }}>High</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#FFFFFF" }}>{priorityWiseValues[0]}</Text>
            </Card>

            <Card
              onPress={() => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    priority: [{ label: "", value: "PRTYLOW" }]
                  }
                };
                dispatch(getInteractionByPriorityLow(params))
                console.log("getInteractionByPriorityLow result UI..", intDashRed?.interactionByPriorityLowData);

                setVisible(true)
                setDialogData(intDashRed.interactionByPriorityLowData?.data?.rows)
                dialogHeading = "Interaction By Priority (Low)"
              }}
              style={{ width: 80, height: 50, backgroundColor: "#85C1E9", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#FFFFFF" }}>Low</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#FFFFFF" }}>{priorityWiseValues[1]}</Text>
            </Card>

            <Card
              onPress={() => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    priority: [{ label: "", value: "PRTYMED" }]
                  }
                };
                dispatch(getInteractionByPriorityMedium(params))
                console.log("getInteractionByPriorityMedium result UI..", intDashRed?.interactionByPriorityMediumData);

                setVisible(true)
                setDialogData(intDashRed.interactionByPriorityMediumData?.data?.rows)
                dialogHeading = "Interaction By Priority (Medium)"
              }}
              style={{ width: 80, height: 50, backgroundColor: "#85C1E9", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#FFFFFF" }}>Medium</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#FFFFFF" }}>{priorityWiseValues[2]}</Text>
            </Card>
          </View> */}



            <ClearSpace size={4} />
          </Card>
        </>
      );
    }
  };

  const RenderInteractionByAgeingMonthsData = (props) => {

    console.log("ageing data...", props?.data?.interactionByAgeingData)
    console.log("followups data...", props?.data?.interactionByFollowupsData)

    var threeDaysAgeing = 0, fiveDaysAgeing = 0, moreThanFiveDaysAgeing = 0, totalCountAgeing = 0
    var threeDaysFollowUps = 0, fiveDaysFollowUps = 0, moreThanFiveDaysFollowUps = 0, totalCountFollowUps = 0

    props?.data?.interactionByAgeingData?.data?.rows?.map(item => {
      threeDaysAgeing = item.oIntxn3DayCnt,
        fiveDaysAgeing = item.oIntxn5DayCnt,
        moreThanFiveDaysAgeing = item.oIntxnMoreThan5DayCnt,
        totalCountAgeing = item.oIntxnTotalCnt
    })

    props?.data?.interactionByFollowupsData?.data?.rows?.map(item => {
      threeDaysFollowUps = item.oIntxn3DayCnt,
        fiveDaysFollowUps = item.oIntxn5DayCnt,
        moreThanFiveDaysFollowUps = item.oIntxnMoreThan5DayCnt,
        totalCountFollowUps = item.oIntxnTotalCnt
    })

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Interaction by Ageing Vs Follow up by Months</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "0_3DAYS"
                  }
                };

                setLoader(true)
                await dispatch(await getInteractionByAgeingThreeDays(params))
                console.log("getInteractionByAgeing 0_3DAYS result UI..", intDashRed?.interactionByAgeingThreeDaysData);

                dialogHeading = "Interaction By Ageing (0_3 days)"
                setDialogData(intDashRed.interactionByAgeingThreeDaysData?.data?.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>0 to 3</Text>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{threeDaysAgeing}</Text>
            </Card>

            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "3_5DAYS"
                  }
                };
                setLoader(true)
                await dispatch(await getInteractionByAgeingFiveDays(params))
                console.log("getInteractionByAgeing 3_5DAYS result UI..", intDashRed.interactionByAgeingFiveDaysData);

                dialogHeading = "Interaction By Status (3_5 days)"
                setDialogData(intDashRed.interactionByAgeingFiveDaysData?.data?.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>3 to 5</Text>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{fiveDaysAgeing}</Text>
            </Card>

            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "MORE_5DAYS"
                  }
                };
                setLoader(true)
                await dispatch(await getInteractionByAgeingMoreFiveDays(params))
                console.log("getInteractionByAgeing more 5DAYS result UI..", intDashRed.interactionByAgeingMoreFiveDaysData);

                dialogHeading = "Interaction By Status (>5 days)"
                setDialogData(intDashRed.interactionByAgeingMoreFiveDaysData?.data?.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}> {'>'} 5</Text>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{moreThanFiveDaysAgeing}</Text>
            </Card>
          </View>

          <ClearSpace size={2} />
          <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900" }}>By Ageing</Text>
          <ClearSpace size={2} />

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            data={{
              labels: [
                '0 to 3 days',
                '3 to 5 days',
                '> 5 days'
              ],
              datasets: [
                {
                  data: [threeDaysAgeing, fiveDaysAgeing, moreThanFiveDaysAgeing],
                  colors: [
                    () => "blue",
                    () => "red",
                    () => "green"
                  ]
                },
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={270}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={30}
          />


          <ClearSpace size={2} />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "0_3DAYS"
                  }
                };
                setLoader(true)
                await dispatch(await getInteractionByFollowupsThreeDays(params))
                console.log("getInteractionByFollowups 3 result UI..", intDashRed.interactionByFollowupsThreeDaysData);

                dialogHeading = "Interaction By Followups (0_3 days)"
                setDialogData(intDashRed.interactionByFollowupsThreeDaysData?.data?.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>0 to 3</Text>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{threeDaysFollowUps}</Text>
            </Card>

            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "3_5DAYS"
                  }
                };
                setLoader(true)
                await dispatch(await getInteractionByFollowupsFiveDays(params))
                console.log("getInteractionByFollowups 5 result UI..", intDashRed.interactionByFollowupsFiveDaysData);

                dialogHeading = "Interaction By Followups (3_5 days)"
                setDialogData(intDashRed.interactionByFollowupsFiveDaysData.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}>3 to 5</Text>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{fiveDaysFollowUps}</Text>
            </Card>

            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "MORE_5DAYS"
                  }
                };
                setLoader(true)
                await dispatch(await getInteractionByFollowupsMoreFiveDays(params))
                console.log("getInteractionByFollowups more 5 result UI..", intDashRed.interactionByFollowupsMoreFiveDaysData);

                dialogHeading = "Interaction By Followups (>5 days)"
                setDialogData(intDashRed.interactionByFollowupsMoreFiveDaysData.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "400", color: "#000000" }}> {'>'} 5</Text>
              <Text style={{ textAlign: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{moreThanFiveDaysFollowUps}</Text>
            </Card>
          </View>

          <ClearSpace size={2} />
          <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900" }}>Follow up by Months</Text>
          <ClearSpace size={2} />

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            data={{
              labels: [
                '0 to 3 days',
                '3 to 5 days',
                '> 5 days'
              ],
              datasets: [
                {
                  data: [threeDaysFollowUps, fiveDaysFollowUps, moreThanFiveDaysFollowUps],
                  colors: [
                    () => "brown",
                    () => "yellow",
                    () => "red"
                  ]
                },
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={270}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={30}
          />


          <ClearSpace size={2} />
        </Card>
      </>
    );

  };

  const RenderInteractionByPriorityData = (props) => {

    console.log("priority data...", props?.data?.interactionByPriorityData)

    var priorityWiseLabels = []
    var priorityWiseValues = []
    props?.data?.interactionByPriorityData?.data?.rows?.map(item => {
      priorityWiseLabels.push(item.oPriorityDesc)
      priorityWiseValues.push('' + item.oIntxnCount)
    })

    console.log("priorityWiseLabels data...", priorityWiseLabels)
    console.log("priorityWiseValues data...", priorityWiseValues)


    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Interaction by Priority</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />


          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    priority: [{ label: "", value: "PRTYHGH" }]
                  }
                };
                setLoader(true)
                await dispatch(await getInteractionByPriorityHigh(params))
                console.log("getInteractionByPriorityHigh result UI..", intDashRed?.interactionByPriorityHighData);

                dialogHeading = "Interaction By Priority (High)"
                setDialogData(intDashRed.interactionByPriorityHighData?.data?.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFFFFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>High</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{priorityWiseValues[0]}</Text>
            </Card>

            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    priority: [{ label: "", value: "PRTYLOW" }]
                  }
                };
                setLoader(true)
                awaitdispatch(await getInteractionByPriorityLow(params))
                console.log("getInteractionByPriorityLow result UI..", intDashRed?.interactionByPriorityLowData);

                dialogHeading = "Interaction By Priority (Low)"
                setDialogData(intDashRed.interactionByPriorityLowData?.data?.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFFFFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>Low</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{priorityWiseValues[1]}</Text>
            </Card>

            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    priority: [{ label: "", value: "PRTYMED" }]
                  }
                };
                setLoader(true)
                await dispatch(await getInteractionByPriorityMedium(params))
                console.log("getInteractionByPriorityMedium result UI..", intDashRed?.interactionByPriorityMediumData);

                dialogHeading = "Interaction By Priority (Medium)"
                setDialogData(intDashRed.interactionByPriorityMediumData?.data?.rows)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 80, height: 50, backgroundColor: "#FFFFFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>Medium</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "900", color: "#000000" }}>{priorityWiseValues[2]}</Text>
            </Card>
          </View>


          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            data={{
              labels: priorityWiseLabels,
              datasets: [
                {
                  data: priorityWiseValues,
                  colors: [
                    () => "brown",
                    () => "yellow",
                  ]
                },
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={240}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={30}
          />

          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderInteractionByLivePriorityData = (props) => {

    var dataSetArr = []
    var dateArray = []
    var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

    // --------------------------------------------x axis data-------------------------------------------------

    props?.data?.interactionByLivePriorityData?.data?.rows?.map(item => {
      dateArray.push(item.oCreatedAt)
    })

    dateArray = dateArray.filter((item,
      index) => dateArray.indexOf(item) === index);

    const sortedDateArray = dateArray.sort(function (dateArray, b) {
      return new Date(dateArray) - new Date(b)
    })
    console.log("sortedDateArray.....", sortedDateArray)

    var formattedDateArr = []
    sortedDateArray.forEach(item => {
      formattedDateArr.push(moment(item).format("hh:mm:ss"))
    })
    console.log("formattedDateArr.....", formattedDateArr)

    // --------------------------------------------x axis data-------------------------------------------------


    // --------------------------------------------y axis data-------------------------------------------------

    const projectCounts = {};
    props?.data?.interactionByLivePriorityData?.data?.rows?.forEach(item => {
      const description = item.oPriority;
      if (projectCounts[description]) {
        projectCounts[description]++;
      } else {
        projectCounts[description] = 1;
      }
    });

    const series = Object.keys(projectCounts).map(description => {
      return {
        name: description,
        type: 'line',
        stack: 'Total',
        data: [],
      };
    });

    let projectCount = 0;
    series.forEach(serie => {
      const description = serie.name;
      const data = props?.data?.interactionByLivePriorityData?.data?.rows.map(item => {
        const createdAt = moment(item.oCreatedAt).format('hh:mm:ss a');
        const descriptionItem = item.oPriority;
        if (descriptionItem === description) {
          projectCount++;
        } else {
          projectCount = 0;
        }
        return descriptionItem === description ? projectCount : 0;
      });
      serie.data = data;
    });
    console.log("series priority........", series)

    series.forEach((serie, idx) => {
      dataSetArr.push(
        {
          data: serie.data,
          strokeWidth: 2,
          color: (opacity = 1) => colors[idx]
        }
      )
    })

    // --------------------------------------------y axis data-------------------------------------------------

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Interaction by Priority</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View styles={{ flexDirection: "column" }}>
            {series.map((item, idx) => {
              return (
                <View style={{
                  flexDirection: "row",
                  width: 100,
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 10
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colors[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item.name}</Text>
                  </View>
                </View>
              )
            })}

            {dataSetArr.length > 0 && (
              <LineChart
                hidePointsAtIndex={Array.from({ length: formattedDateArr.length }, (v, k) => (k % 2 === 0) ? k : null)}
                data={{
                  labels: formattedDateArr,
                  datasets: dataSetArr,
                }}
                width={Dimensions.get('window').width - 16}
                height={250}
                chartConfig={{
                  backgroundColor: '#FFF',
                  backgroundGradientFrom: '#FFF',
                  backgroundGradientTo: '#FFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginLeft: -35,
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                verticalLabelRotation={30}
              />
            )}
          </View>
          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderProjectWiseInteraction = (props) => {

    var intProjectWiseMap = new Map("", "")
    props?.data?.interactionByProjectWiseData?.data?.rows?.map(item => {
      if (item.oProject == null) {
        intProjectWiseMap.set("Others", item.oIntxnCount)
      }
      else {
        intProjectWiseMap.set(item.oProject, item.oIntxnCount)
      }
    })

    const intProjectWiseArr = Array.from(intProjectWiseMap, ([name, value]) => ({ name, value }));

    console.log("intProjectWiseArr...", intProjectWiseArr)

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Project Wise Interaction</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View styles={{ flexDirection: "column" }}>
            {intProjectWiseArr.map((item, idx) => {

              var project = ""
              if ((item.name == undefined) || (item.name == null)) {
                project = "Others"
              }
              else {
                project = item.name
              }

              const count = item.value

              console.log("count...", count)
              console.log("project...", project)

              if (!(item.value == 0)) {

                return (
                  <View style={{ marginTop: 2, flexDirection: "column", alignSelf: "center", borderWidth: 0 }}>
                    <View style={{ flexDirection: "row", margin: 0 }}>
                      <View style={{ marginRight: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 230, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text style={{ fontWeight: "normal" }}>{project}</Text>
                      </View>

                      <View style={{ marginLeft: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 80, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text
                          onPress={async () => {


                            var projectCode = ""
                            props?.data?.interactionByProjectWiseData?.data?.rows?.map(projectItem => {
                              console.log("projectItem.....", projectItem.oProject + " / " + item.name)
                              if (projectItem?.oProject == item.name) {
                                projectCode = projectItem.oProjectCode
                              }
                            })

                            console.log("projectCode.....", projectCode)

                            let params = {
                              searchParams: {
                                project: [{ value: projectCode }]
                              }
                            };
                            setLoader(true)
                            await dispatch(await getInteractionProjectWiseList(params))
                            console.log("getInteractionProjectWiseList result UI..", intDashRed?.interactionByProjectWiseListData);

                            dialogHeading = "Project Wise Interaction"
                            setDialogData(intDashRed.interactionByProjectWiseListData?.data?.rows)
                            setLoader(false)
                            setIntxnDetDialogVisible(true)
                          }}
                          style={{ alignSelf: "center", fontWeight: "normal" }}>
                          {count}
                        </Text>
                      </View>
                    </View>
                  </View>
                );

              }
            })}
          </View>
          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderLiveProjectWiseInteraction = (props) => {

    var dataSetArr = []
    var dateArray = []
    var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

    // --------------------------------------------x axis data-------------------------------------------------

    props?.data?.liveProjectWiseData?.data?.rows?.map(item => {
      dateArray.push(item.createdAt)
    })

    dateArray = dateArray.filter((item,
      index) => dateArray.indexOf(item) === index);

    const sortedDateArray = dateArray.sort(function (dateArray, b) {
      return new Date(dateArray) - new Date(b)
    })
    console.log("sortedDateArray.....", sortedDateArray)

    var formattedDateArr = []
    sortedDateArray.forEach(item => {
      formattedDateArr.push(moment(item).format("hh:mm:ss"))
    })
    console.log("formattedDateArr.....", formattedDateArr)

    // --------------------------------------------x axis data-------------------------------------------------


    // --------------------------------------------y axis data-------------------------------------------------

    const projectCounts = {};
    props?.data?.liveProjectWiseData?.data?.rows?.forEach(item => {
      const description = item?.projectDesc?.description ?? 'unclassified';
      if (projectCounts[description]) {
        projectCounts[description]++;
      } else {
        projectCounts[description] = 1;
      }
    });

    const series = Object.keys(projectCounts).map(description => {
      return {
        name: description,
        type: 'line',
        stack: 'Total',
        data: [],
      };
    });

    let projectCount = 0;
    series.forEach(serie => {
      const description = serie.name;
      const data = props?.data?.liveProjectWiseData?.data?.rows.map(item => {
        const createdAt = moment(item.createdAt).format('hh:mm:ss a');
        const descriptionItem = item?.projectDesc?.description;
        if (descriptionItem === description) {
          projectCount++;
        } else {
          projectCount = 0;
        }
        return descriptionItem === description ? projectCount : 0;
      });
      serie.data = data;
    });
    console.log("series project wise........", series)

    series.forEach((serie, idx) => {
      dataSetArr.push(
        {
          data: serie.data,
          strokeWidth: 2,
          color: (opacity = 1) => colors[idx]
        }
      )
    })

    // --------------------------------------------y axis data-------------------------------------------------

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Project Wise Interaction</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View styles={{ flexDirection: "column" }}>
            {series.map((item, idx) => {
              return (
                <View style={{
                  flexDirection: "row",
                  width: 300,
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 10
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colors[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item.name}</Text>
                  </View>
                </View>
              )
            })}

            {dataSetArr.length > 0 && (
              <LineChart
                data={{
                  labels: formattedDateArr,
                  datasets: dataSetArr,
                }}
                hidePointsAtIndex={Array.from({ length: formattedDateArr.length }, (v, k) => (k % 2 === 0) ? k : null)}
                width={Dimensions.get('window').width - 16}
                height={250}
                chartConfig={{
                  backgroundColor: '#FFF',
                  backgroundGradientFrom: '#FFF',
                  backgroundGradientTo: '#FFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginLeft: -35,
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                verticalLabelRotation={30}
              />
            )}
          </View>
          <ClearSpace size={4} />
        </Card>
      </>
    );
  };


  const RenderAgentWiseInteraction = (props) => {

    var intAgentWiseMap = new Map("", "")
    props?.data?.interactionByAgentWiseData?.data?.rows?.map(item => {
      if (item.oCurrUserDesc == null) {
        intAgentWiseMap.set("Others", item.oIntxnCount)
      }
      else {
        intAgentWiseMap.set(item.oCurrUserDesc, item.oIntxnCount)
      }
    })

    const intAgentWiseArr = Array.from(intAgentWiseMap, ([name, value]) => ({ name, value }));

    console.log("intAgentWiseArr...", intAgentWiseArr)

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Agent Wise Interaction</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View styles={{ flexDirection: "column" }}>
            {intAgentWiseArr.map((item, idx) => {

              var project = ""
              if ((item.name == undefined) || (item.name == null)) {
                project = "Others"
              }
              else {
                project = item.name
              }

              const count = item.value

              console.log("count...", count)
              console.log("project...", project)

              if (!(item.value == 0)) {

                return (
                  <View style={{ marginTop: 2, flexDirection: "column", alignSelf: "center", borderWidth: 0 }}>
                    <View style={{ flexDirection: "row", margin: 0 }}>
                      <View style={{ marginRight: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 230, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text style={{ fontWeight: "normal" }}>{project}</Text>
                      </View>

                      <View style={{ marginLeft: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 80, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text
                          onPress={async () => {

                            var currUser = ""
                            props?.data?.interactionByAgentWiseData?.data?.rows?.map(projectItem => {
                              console.log("projectItem.....", projectItem.oCurrUserDesc + " / " + item.name)
                              if (projectItem?.oCurrUserDesc == item.name) {
                                currUser = projectItem.oCurrUser
                              }
                            })

                            console.log("currUser.....", currUser)

                            let params = {
                              searchParams: {
                                userId: currUser
                              }
                            };
                            setLoader(true)
                            await dispatch(await getInteractionAgentWiseList(params))
                            console.log("getInteractionAgentWiseList result UI..", intDashRed?.interactionByAgentWiseListData);

                            dialogHeading = "Agent Wise Interaction"
                            setDialogData(intDashRed.interactionByAgentWiseListData?.data?.rows)
                            setLoader(false)
                            setIntxnDetDialogVisible(true)
                          }}
                          style={{ alignSelf: "center", ontWeight: "normal" }}>{count}</Text>
                      </View>
                    </View>
                  </View>
                );

              }
            })}
          </View>
          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderLiveAgentWiseInteraction = (props) => {

    var dataSetArr = []
    var dateArray = []
    var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

    // --------------------------------------------x axis data-------------------------------------------------

    props?.data?.liveCustomerWiseData?.data?.rows?.map(item => {
      dateArray.push(item.oCreatedAt)
    })

    dateArray = dateArray.filter((item,
      index) => dateArray.indexOf(item) === index);

    const sortedDateArray = dateArray.sort(function (dateArray, b) {
      return new Date(dateArray) - new Date(b)
    })
    console.log("sortedDateArray.....", sortedDateArray)

    var formattedDateArr = []
    sortedDateArray.forEach(item => {
      formattedDateArr.push(moment(item).format("hh:mm:ss"))
    })
    console.log("formattedDateArr.....", formattedDateArr)

    // --------------------------------------------x axis data-------------------------------------------------


    // --------------------------------------------y axis data-------------------------------------------------

    const projectCounts = {};
    props?.data?.liveCustomerWiseData?.data?.rows?.forEach(item => {
      const description = item.oCustomerType;
      if (projectCounts[description]) {
        projectCounts[description]++;
      } else {
        projectCounts[description] = 1;
      }
    });

    const series = Object.keys(projectCounts).map(description => {
      return {
        name: description,
        type: 'line',
        stack: 'Total',
        data: [],
      };
    });

    let projectCount = 0;
    series.forEach(serie => {
      const description = serie.name;
      const data = props?.data?.liveCustomerWiseData?.data?.rows.map(item => {
        const createdAt = moment(item.oCreatedAt).format('hh:mm:ss a');
        const descriptionItem = item.oCustomerType;
        if (descriptionItem === description) {
          projectCount++;
        } else {
          projectCount = 0;
        }
        return descriptionItem === description ? projectCount : 0;
      });
      serie.data = data;
    });
    console.log("series agent wise........", series)

    series.forEach((serie, idx) => {
      dataSetArr.push(
        {
          data: serie.data,
          strokeWidth: 2,
          color: (opacity = 1) => colors[idx]
        }
      )
    })

    // --------------------------------------------y axis data-------------------------------------------------

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Customer Wise Interaction</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View styles={{ flexDirection: "column" }}>
            {series.map((item, idx) => {
              return (
                <View style={{
                  flexDirection: "row",
                  width: 100,
                  alignSelf: "center",
                  marginTop: 10,
                  marginBottom: 10
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colors[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item.name}</Text>
                  </View>
                </View>
              )
            })}

            {dataSetArr.length > 0 && (
              <LineChart
                hidePointsAtIndex={Array.from({ length: formattedDateArr.length }, (v, k) => (k % 2 === 0) ? k : null)}
                data={{
                  labels: formattedDateArr,
                  datasets: dataSetArr,
                }}
                width={Dimensions.get('window').width - 16}
                height={250}
                chartConfig={{
                  backgroundColor: '#FFF',
                  backgroundGradientFrom: '#FFF',
                  backgroundGradientTo: '#FFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  marginLeft: -35,
                  marginVertical: 8,
                  borderRadius: 16,
                }}
                verticalLabelRotation={30}
              />
            )}
          </View>
          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderCustomerWiseInteraction = (props) => {

    var customerWiseLabels = []
    var customerWiseValues = []
    props?.data?.customerWiseData?.data?.rows?.customerWiseData?.map(item => {
      customerWiseLabels.push(item.oCustomerType)
      customerWiseValues.push('' + item.oIntxnCount)
    })

    console.log("customerWiseLabels data...", customerWiseLabels)
    console.log("customerWiseValues data...", customerWiseValues)

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Team wise Interactions</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    categoryType: "Internal"
                  }
                };
                setLoader(true)
                await dispatch(await getCustomerWise(params))
                console.log("getCustomerInternal result UI..", intDashRed?.customerWiseData);

                dialogHeading = "Team wise Interaction (Internal)"
                setDialogData(intDashRed.customerWiseData?.data?.rows?.customerWiseData)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 130, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>Internal Customers</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>{customerWiseValues[0]}</Text>
            </Card>

            <Card
              onPress={async () => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    categoryType: "External"
                  }
                };
                setLoader(true)
                await dispatch(await getCustomerWise(params))
                console.log("getCustomerExternal result UI..", intDashRed?.customerWiseData);

                dialogHeading = "Team wise Interaction (External)"
                setDialogData(intDashRed.customerWiseData?.data?.rows?.customerWiseData)
                setLoader(false)
                setIntxnDetDialogVisible(true)
              }}
              style={{ width: 130, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>External Customers</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>{customerWiseValues[1]}</Text>
            </Card>
          </View>

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            data={{
              labels: customerWiseLabels,
              datasets: [
                {
                  data: customerWiseValues,
                  colors: [
                    () => "blue",
                    () => "red",
                  ]
                },
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={300}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={90}
          />

          <ClearSpace size={4} />
        </Card>
      </>
    );

  };




  const RenderInteractionByStatusTypeData = (props) => {

    console.log("status data...", props?.data?.liveInteractionsByStatusData)
    console.log("type data...", props?.data?.interactionByTypeData)
    const colorsArr = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#2980B9', '#3498DB', '#16A085',
      '#F4D03F', '#F39C12', '#DC7633', '#5DADE2']


    var statusWiseMap = new Map("", 0)
    props?.data?.liveInteractionsByStatusData?.data?.rows?.map(item => {
      if (statusWiseMap.has(item.currStatusDesc.description)) {
        statusWiseMap.set(item.currStatusDesc.description, statusWiseMap.get(item.currStatusDesc.description) + 1)
      }
      else {
        statusWiseMap.set(item.currStatusDesc.description, 1)
      }
    })

    var statusWiseData = []
    var series = []
    const statusWiseArr = Array.from(statusWiseMap, ([name, value]) => ({ name, value }));
    statusWiseArr?.forEach((item, idx) => {
      statusWiseData.push(
        {
          name: item.name,
          population: item.value,
          color: colorsArr[idx],
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        }
      )
      series.push(item.value)
    })


    var intTypeWiseMap = new Map("", "")
    props?.data?.interactionByTypeData?.data?.rows?.map(item => {
      intTypeWiseMap.set(item.oCategoryValue, item.oIntxnCnt)
    })

    var intTypeWiseData = []
    var series2 = []
    const intTypeWiseArr = Array.from(intTypeWiseMap, ([name, value]) => ({ name, value }));
    intTypeWiseArr?.forEach((item, idx) => {
      intTypeWiseData.push(
        {
          name: item.name,
          population: item.value,
          color: colorsArr[idx],
          legendFontColor: "#7F7F7F",
          legendFontSize: 12
        }
      )
      series2.push(item.value)
    })



    var colors1 = []
    series.forEach((item, idx) => {
      colors1.push(colorsArr[idx])
    })


    var colors2 = []
    series2.forEach((item, idx) => {
      colors2.push(colorsArr[idx])
    })

    console.log("intTypeWiseData....", intTypeWiseArr)

    const widthAndHeight = 200



    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Interaction by Status Vs Type</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900" }}>By Status</Text>

          <View styles={{ flexDirection: "column" }}>

            {statusWiseData.map((item, idx) => {
              return (
                <View style={{ marginTop: 2, flexDirection: "column", alignSelf: "center", borderWidth: 0 }}>
                  <View style={{ flexDirection: "row", margin: 0 }}>
                    <View style={{ marginRight: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 230, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                      <Text style={{ fontWeight: "normal" }}>{item.name}</Text>
                    </View>

                    <View style={{ marginLeft: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 80, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                      <Text
                        onPress={async () => {
                          var statusDialogData = []
                          console.log("status list...", intDashRed.interactionsByStatusLiveListData?.data)
                          intDashRed.interactionsByStatusLiveListData?.data?.rows?.map((item2, idx) => {
                            console.log("item2.oStatus...", item2.oStatus)
                            console.log("item.name...", item.name)
                            if (item2.oStatus == item.name) {
                              statusDialogData.push(item2)
                            }
                          })

                          console.log("statusDialogData...", statusDialogData)

                          dialogHeading = "Status Wise Interaction"
                          setDialogData(statusDialogData)
                          setIntxnDetDialogVisible(true)
                        }}
                        style={{ alignSelf: "center", ontWeight: "normal" }}>{item.population}</Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>

          {/* {statusWiseData?.map((item, idx) => {
            return (
              <View style={{
                width: 100,
                alignSelf: "flex-end",
                marginTop: 3,
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: item.color
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}
  
          {series.length > 0 && (
            <PieChart style={{ marginTop: 0 }} widthAndHeight={widthAndHeight} series={series} sliceColor={colors1} />
          )} */}

          {/* <PieChart
            data={statusWiseData}
            width={Dimensions.get('window').width - 30}
            height={200}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute //for the absolute number remove if you want percentage
          /> */}


          <ClearSpace size={10} />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={2} />

          <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900" }}>By Type</Text>

          <ClearSpace size={2} />

          {/* {intTypeWiseData?.map((item, idx) => {
            return (
              <View style={{
                width: 100,
                alignSelf: "flex-end",
                marginTop: 10,
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: item.color
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}
  
          {series2.length > 0 && (
            <PieChart style={{ marginTop: 0 }} widthAndHeight={widthAndHeight} series={series2} sliceColor={colors2} />
          )} */}

          {/* <PieChart
            data={intTypeWiseData}
            width={Dimensions.get('window').width - 30}
            height={200}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute //for the absolute number remove if you want percentage
          /> */}

          <View styles={{ flexDirection: "column" }}>

            {intTypeWiseData.map((item, idx) => {
              return (
                <View style={{ marginTop: 2, flexDirection: "column", alignSelf: "center", borderWidth: 0 }}>
                  <View style={{ flexDirection: "row", margin: 0 }}>
                    <View style={{ marginRight: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 230, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                      <Text style={{ fontWeight: "normal" }}>{item.name}</Text>
                    </View>

                    <View style={{ marginLeft: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 80, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                      <Text
                        onPress={async () => {
                          var typeDialogData = []
                          intDashRed.interactionByTypeListData?.data?.rows?.map((item2, idx) => {
                            console.log("item2.oStatus...", item2.oInteractionType)
                            console.log("item.name...", item.name)
                            if (item2.oInteractionType == item.name) {
                              typeDialogData.push(item2)
                            }
                          })

                          console.log("typeDialogData...", typeDialogData)

                          dialogHeading = "Type Wise Interaction"
                          setDialogData(typeDialogData)
                          setIntxnDetDialogVisible(true)
                        }}
                        style={{ alignSelf: "center", ontWeight: "normal" }}>{item.population}</Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>

          <ClearSpace size={10} />
        </Card>
      </>
    );

  };

  // ---------------------------------------Interaction methods end-----------------------------------------------------------------


  // ---------------------------------------Operational methods start-----------------------------------------------------------------

  const RenderOperationalAssignedToMeData = (props) => {

    console.log("RenderOperationalAssignedToMeData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {
      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.id}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCustomerName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnStatusDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.priority}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnSeverityDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnTypeDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.ouname}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnCategoryDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceType}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceTypeDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceCategory}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceCategoryDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.generated_at}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  let params0 = {
                    searchParams: {
                      interactionNumber: body.oNo,
                    }
                  }
                  console.log("interaction details params A..", params0)
                  await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  let params = {
                    interactionSearchParams: interactionReducer.interactionSearchData[0]
                  }
                  navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>

          </View>
        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 120, marginLeft: 15, marginRight: 15 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={props.data?.data?.rows}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </>
    );

  };

  // Convert H:M:S to seconds
  // Seconds are optional (i.e. n:n is treated as h:s)
  function hmsToSeconds(s) {
    var b = s.split(':');
    return b[0] * 3600 + b[1] * 60 + (+b[2] || 0);
  }

  // Convert seconds to hh:mm:ss
  // Allow for -ve time values
  function secondsToHMS(secs) {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    var sign = secs < 0 ? '-' : '';
    secs = Math.abs(secs);
    return sign + z(secs / 3600 | 0) + ':' + z((secs % 3600) / 60 | 0) + ':' + z(secs % 60);
  }


  const RenderOperationalAppointmentsData = (props) => {

    console.log("RenderOperationalAppointmentsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {

      var duration = secondsToHMS(hmsToSeconds(body.appointEndTime) - hmsToSeconds(body.appointStartTime))
      var a = duration.split(':'); // split it at the colons
      // Hours are worth 60 minutes.
      var minutes = (+a[0]) * 60 + (+a[1]);
      console.log("minutes..", minutes)

      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.id}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{"APT0000" + body.appointTxnId}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.tranCategoryType}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 300, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.meeting_point}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointModeValueDesc.description}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointModeDesc.description}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.assigned_to}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointAgentDesc.firstName + " " + body.appointAgentDesc.lastName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.date}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointDate}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.time}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointStartTime}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.duration}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{minutes} mins</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.generated_at}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  let params0 = {
                    searchParams: {
                      interactionNumber: body.oIntxnNo,
                    }
                  }
                  console.log("interaction details params A..", params0)
                  await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  let params = {
                    interactionSearchParams: interactionReducer.interactionSearchData[0]
                  }
                  navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>
          </View>

        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 120, marginLeft: 15, marginRight: 15 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={appointmentsData}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </>
    );
  };


  const RenderOperationalTeamAppointmentsData = (props) => {

    console.log("RenderOperationalTeamAppointmentsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {

      var duration = secondsToHMS(hmsToSeconds(body.appointEndTime) - hmsToSeconds(body.appointStartTime))
      var a = duration.split(':'); // split it at the colons
      // Hours are worth 60 minutes.
      var minutes = (+a[0]) * 60 + (+a[1]);
      console.log("minutes..", minutes)

      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.id}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{"APT0000" + body.appointTxnId}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.tranCategoryType}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 300, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.meeting_point}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointModeValueDesc.description}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointModeDesc.description}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.assigned_to}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointAgentDesc.firstName + " " + body.appointAgentDesc.lastName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.date}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointDate}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.time}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appointStartTime}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.duration}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{minutes} mins</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.generated_at}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  let params0 = {
                    searchParams: {
                      interactionNumber: body.oIntxnNo,
                    }
                  }
                  console.log("interaction details params A..", params0)
                  await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  let params = {
                    interactionSearchParams: interactionReducer.interactionSearchData[0]
                  }
                  navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>
          </View>

        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 120, marginLeft: 15, marginRight: 15 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={appointmentsData}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </>
    );
  };



  const RenderOperationalPooledInteractionsData = (props) => {

    console.log("RenderOperationalPooledInteractionsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {
      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.id}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCustomerName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnStatusDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnTypeDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.ouname}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnCategoryDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.assigned_to}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCurrUserDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceType}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceTypeDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceCategory}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceCategoryDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.generated_at}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  let params0 = {
                    searchParams: {
                      interactionNumber: body.oIntxnNo,
                    }
                  }
                  console.log("interaction details params A..", params0)
                  await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  let params = {
                    interactionSearchParams: interactionReducer.interactionSearchData[0]
                  }
                  navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>
          </View>


        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 80, marginLeft: 15, marginRight: 15 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={props?.data?.data?.rows}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </>
    );

  };


  const RenderOperationalTeamPooledInteractionsData = (props) => {

    console.log("RenderOperationalTeamPooledInteractionsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {
      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.id}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCustomerName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnStatusDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnTypeDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.ouname}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnCategoryDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.assigned_to}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCurrUserDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceType}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceTypeDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceCategory}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceCategoryDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.generated_at}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  let params0 = {
                    searchParams: {
                      interactionNumber: body.oIntxnNo,
                    }
                  }
                  console.log("interaction details params A..", params0)
                  await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  let params = {
                    interactionSearchParams: interactionReducer.interactionSearchData[0]
                  }
                  navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>
          </View>


        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 80, marginLeft: 15, marginRight: 15 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={props?.data?.data?.rows}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </>
    );

  };


  const RenderOperationalAssignedInteractionsData = (props) => {

    console.log("RenderOperationalAssignedInteractionsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {
      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.id}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCustomerName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnStatusDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnTypeDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.ouname}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnCategoryDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.assigned_to}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCurrUserDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceType}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceTypeDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceCategory}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceCategoryDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.generated_at}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  let params0 = {
                    searchParams: {
                      interactionNumber: body.oIntxnNo,
                    }
                  }
                  console.log("interaction details params A..", params0)
                  await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  let params = {
                    interactionSearchParams: interactionReducer.interactionSearchData[0]
                  }
                  navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>

          </View>


        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 80, marginLeft: 15, marginRight: 15 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={props?.data?.data?.rows}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </>
    );

  };


  const RenderOperationalTeamAssignedInteractionsData = (props) => {

    console.log("RenderOperationalTeamAssignedInteractionsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {
      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.id}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCustomerName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnStatusDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnTypeDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.ouname}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oIntxnCategoryDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.assigned_to}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oCurrUserDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceType}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceTypeDesc}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.serviceCategory}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.oServiceCategoryDesc}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.generated_at}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.oCreatedAt).format("DD MMM YYYY")}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  let params0 = {
                    searchParams: {
                      interactionNumber: body.oIntxnNo,
                    }
                  }
                  console.log("interaction details params A..", params0)
                  await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  let params = {
                    interactionSearchParams: interactionReducer.interactionSearchData[0]
                  }
                  navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>

          </View>


        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 80, marginLeft: 15, marginRight: 15 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            data={props?.data?.data?.rows}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
      </>
    );

  };


  const RenderOperationalInteractionCorner = (props) => {

    console.log("RenderOperationalInteractionCorner data...", props?.data)

    const [dropDownCode, setDropDownCode] = useState("");
    const [dropDowndesc, setDropDownDesc] = useState("");

    const intxnCatArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.intxnCategory == null)) {
        intxnCatArr.push(item?.intxnCategoryDesc)
      }
    }
    );
    const intxnCatDropDownData = []
    const intxnCatData = [...new Set(intxnCatArr)];
    const intxnCatCount = intxnCatData.map(element =>
      intxnCatArr.filter(el => el === element).length,
    );
    intxnCatData?.map(item => {
      intxnCatDropDownData.push({ code: item, description: item })
    });
    console.log("intxn cat data...", intxnCatData);
    console.log("intxn cat count...", intxnCatCount);


    const intxnTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.intxnType == null)) {
        intxnTypeArr.push(item?.intxnTypeDesc)
      }
    }
    );
    const intxnTypeDropDownData = []
    const intxnTypeData = [...new Set(intxnTypeArr)];
    const intxnTypeCount = intxnTypeData.map(element =>
      intxnTypeArr.filter(el => el === element).length,
    );
    intxnCatData?.map(item => {
      intxnTypeDropDownData.push({ code: item, description: item })
    });
    console.log("intxn type data...", intxnTypeData);
    console.log("intxn type count...", intxnTypeCount);


    const serviceCatArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.category == null)) {
        serviceCatArr.push(item?.categoryDesc)
      }
    }
    );
    const serviceCatDropDownData = []
    const serviceCatData = [...new Set(serviceCatArr)];
    const serviceCatCount = intxnTypeData.map(element =>
      serviceCatArr.filter(el => el === element).length,
    );
    serviceCatData?.map(item => {
      serviceCatDropDownData.push({ code: item, description: item })
    });
    console.log("service category data...", serviceCatData);
    console.log("service category count...", serviceCatCount);


    const serviceTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.serviceType == null)) {
        serviceTypeArr.push(item?.serviceTypeDesc)
      }
    }
    );
    const serviceTypeDropDownData = []
    const serviceTypeData = [...new Set(serviceTypeArr)];
    const serviceTypeCount = serviceTypeData.map(element =>
      serviceTypeArr.filter(el => el === element).length,
    );
    serviceTypeData?.map(item => {
      serviceTypeDropDownData.push({ code: item, description: item })
    });
    console.log("service type data...", serviceTypeData);
    console.log("service type count...", serviceTypeCount);


    const statusArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.currStatus == null)) {
        statusArr.push(item?.currStatusDesc)
      }
    }
    );
    const statusDropDownData = []
    const statusData = [...new Set(statusArr)];
    const statusCount = statusData.map(element =>
      statusArr.filter(el => el === element).length,
    );
    statusData?.map(item => {
      statusDropDownData.push({ code: item, description: item })
    });
    console.log("status data...", statusData);
    console.log("status count...", statusCount);


    const channelArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.channel == null)) {
        channelArr.push(item?.channelDesc)
      }
    }
    );
    const channelDropDownData = []
    const channelData = [...new Set(channelArr)];
    const channelCount = channelData.map(element =>
      channelArr.filter(el => el === element).length,
    );
    channelData?.map(item => {
      channelDropDownData.push({ code: item, description: item })
    });
    console.log("channel data...", channelData);
    console.log("channel count...", channelCount);


    const priorityArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.priority == null)) {
        priorityArr.push(item?.priorityDesc)
      }
    }
    );
    const priorityDropDownData = []
    const priorityData = [...new Set(priorityArr)];
    const priorityCount = priorityData.map(element =>
      priorityArr.filter(el => el === element).length,
    );
    priorityData?.map(item => {
      priorityDropDownData.push({ code: item, description: item })
    });
    console.log("priority data...", priorityData);
    console.log("priority count...", priorityCount);


    const statementArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.requestStatement == null)) {
        statementArr.push(item?.requestStatement)
      }
    }
    );
    const statementDropDownData = []
    const statementData = [...new Set(statementArr)];
    const statementCount = statementData.map(element =>
      statementArr.filter(el => el === element).length,
    );
    statementData?.map(item => {
      statementDropDownData.push({ code: item, description: item })
    });
    console.log("statement data...", statementData);
    console.log("statement count...", statementCount);

    const dropDownArr = [
      { code: "INTXN_CAT", description: "Interaction Category" },
      { code: "INTXN_TYPE", description: "Interaction Type" },
      { code: "SERVICE_CAT", description: "Service Category" },
      { code: "SERVICE_TYPE", description: "Service Type" },
      { code: "STATUS", description: "Status" },
      { code: "CHANNEL", description: "Channel" },
      { code: "PRIORITY", description: "Priority" },
      { code: "REQ_STMT", description: "Request Statement" }]

    var barLabels = []
    var barValues = []

    if (dropDownCode == "INTXN_CAT") {
      barLabels = intxnCatData
      barValues = intxnCatCount
    }

    if (dropDownCode == "INTXN_TYPE") {
      barLabels = intxnTypeData
      barValues = intxnTypeCount
    }

    if (dropDownCode == "SERVICE_CAT") {
      barLabels = serviceCatData
      barValues = serviceCatCount
    }

    if (dropDownCode == "SERVICE_TYPE") {
      barLabels = serviceTypeData
      barValues = serviceTypeCount
    }

    if (dropDownCode == "STATUS") {
      barLabels = statusData
      barValues = statusCount
    }

    if (dropDownCode == "CHANNEL") {
      barLabels = channelData
      barValues = channelCount
    }

    if (dropDownCode == "PRIORITY") {
      barLabels = priorityData
      barValues = priorityCount
    }

    if (dropDownCode == "REQ_STMT") {
      barLabels = statementData
      barValues = statementCount
    }

    console.log("barLabels...", barLabels);
    console.log("barValues...", barValues);

    const colorsArr = [
      () => "green",
      () => "red",
      () => "blue",
      () => "yellow",
      () => "orange",
      () => "pink",
      () => "purple",
      () => "gray",
      () => "magenta",
      () => "cyan"
    ]

    const colorsArr2 = [
      "green",
      "red",
      "blue",
      "yellow",
      "orange",
      "pink",
      "purple",
      "gray",
      "magenta",
      "cyan"
    ]

    return (
      <>
        <Card style={{
          backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10,
          marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 50
        }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Interactions Corner</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>

          <View style={{ marginTop: -20, paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={dropDowndesc}
              data={dropDownArr}
              onChangeText={(text) => {
                unstable_batchedUpdates(() => {
                  setDropDownCode(text.code)
                  setDropDownDesc(text.description)
                })
              }}
              value={dropDownCode}
              placeHolder={"Select Graph Data"}
            />
          </View>

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            yAxisInterval={10} // optional, defaults to 1
            data={{
              datasets: [
                {
                  data: barValues,
                  colors: colorsArr
                },
                {
                  data: [1] // min
                },
                {
                  data: [10] // max
                }
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={320}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={90}
          />

          <View style={{
            marginTop: -30,
            flex: 1,
            width: 350,
            flexDirection: "column",
          }}>

            {barLabels?.map((item, idx) => {
              return (
                <View style={{
                  marginTop: 0,
                  marginLeft: 20
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginTop: 5,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colorsArr2[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </View>

          <ClearSpace size={4} />
        </Card>
      </>
    );
  };


  const RenderOperationalInteractionCornerTeam = (props) => {

    console.log("RenderOperationalInteractionCornerTeam data...", props?.data)

    const [dropDownCode, setDropDownCode] = useState("");
    const [dropDowndesc, setDropDownDesc] = useState("");

    const intxnCatArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.intxnCategory == null)) {
        intxnCatArr.push(item?.intxnCategoryDesc)
      }
    }
    );
    const intxnCatDropDownData = []
    const intxnCatData = [...new Set(intxnCatArr)];
    const intxnCatCount = intxnCatData.map(element =>
      intxnCatArr.filter(el => el === element).length,
    );
    intxnCatData?.map(item => {
      intxnCatDropDownData.push({ code: item, description: item })
    });
    console.log("intxn cat data...", intxnCatData);
    console.log("intxn cat count...", intxnCatCount);


    const intxnTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.intxnType == null)) {
        intxnTypeArr.push(item?.intxnTypeDesc)
      }
    }
    );
    const intxnTypeDropDownData = []
    const intxnTypeData = [...new Set(intxnTypeArr)];
    const intxnTypeCount = intxnTypeData.map(element =>
      intxnTypeArr.filter(el => el === element).length,
    );
    intxnCatData?.map(item => {
      intxnTypeDropDownData.push({ code: item, description: item })
    });
    console.log("intxn type data...", intxnTypeData);
    console.log("intxn type count...", intxnTypeCount);


    const serviceCatArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.category == null)) {
        serviceCatArr.push(item?.categoryDesc)
      }
    }
    );
    const serviceCatDropDownData = []
    const serviceCatData = [...new Set(serviceCatArr)];
    const serviceCatCount = intxnTypeData.map(element =>
      serviceCatArr.filter(el => el === element).length,
    );
    serviceCatData?.map(item => {
      serviceCatDropDownData.push({ code: item, description: item })
    });
    console.log("service category data...", serviceCatData);
    console.log("service category count...", serviceCatCount);


    const serviceTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.serviceType == null)) {
        serviceTypeArr.push(item?.serviceTypeDesc)
      }
    }
    );
    const serviceTypeDropDownData = []
    const serviceTypeData = [...new Set(serviceTypeArr)];
    const serviceTypeCount = serviceTypeData.map(element =>
      serviceTypeArr.filter(el => el === element).length,
    );
    serviceTypeData?.map(item => {
      serviceTypeDropDownData.push({ code: item, description: item })
    });
    console.log("service type data...", serviceTypeData);
    console.log("service type count...", serviceTypeCount);


    const statusArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.currStatus == null)) {
        statusArr.push(item?.currStatusDesc)
      }
    }
    );
    const statusDropDownData = []
    const statusData = [...new Set(statusArr)];
    const statusCount = statusData.map(element =>
      statusArr.filter(el => el === element).length,
    );
    statusData?.map(item => {
      statusDropDownData.push({ code: item, description: item })
    });
    console.log("status data...", statusData);
    console.log("status count...", statusCount);


    const channelArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.channel == null)) {
        channelArr.push(item?.channelDesc)
      }
    }
    );
    const channelDropDownData = []
    const channelData = [...new Set(channelArr)];
    const channelCount = channelData.map(element =>
      channelArr.filter(el => el === element).length,
    );
    channelData?.map(item => {
      channelDropDownData.push({ code: item, description: item })
    });
    console.log("channel data...", channelData);
    console.log("channel count...", channelCount);


    const priorityArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.priority == null)) {
        priorityArr.push(item?.priorityDesc)
      }
    }
    );
    const priorityDropDownData = []
    const priorityData = [...new Set(priorityArr)];
    const priorityCount = priorityData.map(element =>
      priorityArr.filter(el => el === element).length,
    );
    priorityData?.map(item => {
      priorityDropDownData.push({ code: item, description: item })
    });
    console.log("priority data...", priorityData);
    console.log("priority count...", priorityCount);


    const statementArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.requestStatement == null)) {
        statementArr.push(item?.requestStatement)
      }
    }
    );
    const statementDropDownData = []
    const statementData = [...new Set(statementArr)];
    const statementCount = statementData.map(element =>
      statementArr.filter(el => el === element).length,
    );
    statementData?.map(item => {
      statementDropDownData.push({ code: item, description: item })
    });
    console.log("statement data...", statementData);
    console.log("statement count...", statementCount);

    const dropDownArr = [
      { code: "INTXN_CAT", description: "Interaction Category" },
      { code: "INTXN_TYPE", description: "Interaction Type" },
      { code: "SERVICE_CAT", description: "Service Category" },
      { code: "SERVICE_TYPE", description: "Service Type" },
      { code: "STATUS", description: "Status" },
      { code: "CHANNEL", description: "Channel" },
      { code: "PRIORITY", description: "Priority" },
      { code: "REQ_STMT", description: "Request Statement" }]

    var barLabels = []
    var barValues = []

    if (dropDownCode == "INTXN_CAT") {
      barLabels = intxnCatData
      barValues = intxnCatCount
    }

    if (dropDownCode == "INTXN_TYPE") {
      barLabels = intxnTypeData
      barValues = intxnTypeCount
    }

    if (dropDownCode == "SERVICE_CAT") {
      barLabels = serviceCatData
      barValues = serviceCatCount
    }

    if (dropDownCode == "SERVICE_TYPE") {
      barLabels = serviceTypeData
      barValues = serviceTypeCount
    }

    if (dropDownCode == "STATUS") {
      barLabels = statusData
      barValues = statusCount
    }

    if (dropDownCode == "CHANNEL") {
      barLabels = channelData
      barValues = channelCount
    }

    if (dropDownCode == "PRIORITY") {
      barLabels = priorityData
      barValues = priorityCount
    }

    if (dropDownCode == "REQ_STMT") {
      barLabels = statementData
      barValues = statementCount
    }

    console.log("barLabels...", barLabels);
    console.log("barValues...", barValues);

    const colorsArr = [
      () => "green",
      () => "red",
      () => "blue",
      () => "yellow",
      () => "orange",
      () => "pink",
      () => "purple",
      () => "gray",
      () => "magenta",
      () => "cyan"
    ]

    const colorsArr2 = [
      "green",
      "red",
      "blue",
      "yellow",
      "orange",
      "pink",
      "purple",
      "gray",
      "magenta",
      "cyan"
    ]

    return (
      <>
        <Card style={{
          backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10,
          marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 50
        }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Interactions Corner</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>

          <View style={{ marginTop: -20, paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={dropDowndesc}
              data={dropDownArr}
              onChangeText={(text) => {
                unstable_batchedUpdates(() => {
                  setDropDownCode(text.code)
                  setDropDownDesc(text.description)
                })
              }}
              value={dropDownCode}
              placeHolder={"Select Graph Data"}
            />
          </View>

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            yAxisInterval={10} // optional, defaults to 1
            data={{
              datasets: [
                {
                  data: barValues,
                  colors: colorsArr
                },
                {
                  data: [1] // min
                },
                {
                  data: [10] // max
                }
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={320}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={90}
          />

          <View style={{
            marginTop: -30,
            flex: 1,
            width: 350,
            flexDirection: "column",
          }}>

            {barLabels?.map((item, idx) => {
              return (
                <View style={{
                  marginTop: 0,
                  marginLeft: 20
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginTop: 5,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colorsArr2[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </View>

          <ClearSpace size={4} />
        </Card>
      </>
    );
  };



  const RenderOperationalAppointmentsCorner = (props) => {

    console.log("RenderOperationalAppointmentsCorner data...", props?.data)

    const [dropDownCode, setDropDownCode] = useState("");
    const [dropDowndesc, setDropDownDesc] = useState("");

    const appTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.oAppointTypeDesc == null)) {
        appTypeArr.push(item?.oAppointTypeDesc)
      }
    }
    );
    const appTypeData = [...new Set(appTypeArr)];
    const appTypeCount = appTypeData.map(element =>
      appTypeArr.filter(el => el === element).length,
    );
    console.log("appTypeData...", appTypeData);
    console.log("appTypeCount...", appTypeCount);

    const entityTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.oStatusDesc == null)) {
        entityTypeArr.push(item?.oStatusDesc)
      }
    }
    );
    const entityTypeData = [...new Set(entityTypeArr)];
    const entityTypeCount = entityTypeData.map(element =>
      entityTypeArr.filter(el => el === element).length,
    );
    console.log("entityTypeData...", entityTypeData);
    console.log("entityTypeCount...", entityTypeCount);

    const userGroupArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.oUserGroupDesc == null)) {
        userGroupArr.push(item?.oUserGroupDesc)
      }
    }
    );
    const userGroupData = [...new Set(userGroupArr)];
    const userGroupCount = userGroupData.map(element =>
      userGroupArr.filter(el => el === element).length,
    );
    console.log("userGroupData...", userGroupData);
    console.log("userGroupCount...", userGroupCount);

    const dropDownArr = [
      { code: "APP_TYPE", description: "Appointment Type" },
      { code: "ENTITY_TYPE", description: "Entity Type" },
      { code: "USER_GROUP", description: "User Group" }]

    var barLabels = []
    var barValues = []

    if (dropDownCode == "APP_TYPE") {
      barLabels = appTypeData
      barValues = appTypeCount
    }

    if (dropDownCode == "ENTITY_TYPE") {
      barLabels = entityTypeData
      barValues = entityTypeCount
    }

    if (dropDownCode == "USER_GROUP") {
      barLabels = userGroupData
      barValues = userGroupCount
    }

    console.log("barLabels...", barLabels);
    console.log("barValues...", barValues);

    const colorsArr = [
      () => "green",
      () => "red",
      () => "blue",
      () => "yellow",
      () => "orange",
      () => "pink",
      () => "purple",
      () => "gray",
      () => "cyan"
    ]

    const colorsArr2 = [
      "green",
      "red",
      "blue",
      "yellow",
      "orange",
      "pink",
      "purple",
      "gray",
      "cyan"
    ]

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Appointments Corner</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>

          <View style={{ marginTop: -20, paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={dropDowndesc}
              data={dropDownArr}
              onChangeText={(text) => {
                unstable_batchedUpdates(() => {
                  setDropDownCode(text.code)
                  setDropDownDesc(text.description)
                })
              }}
              value={dropDownCode}
              placeHolder={"Select Graph Data"}
            />
          </View>

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            yAxisInterval={10} // optional, defaults to 1
            data={{
              datasets: [
                {
                  data: barValues,
                  colors: colorsArr
                },
                {
                  data: [1] // min
                },
                {
                  data: [10] // max
                }
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={320}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={90}
          />

          <View style={{
            marginTop: -30,
            alignSelf: "center",
            flex: 1,
            width: 300,
            flexDirection: "column",
          }}>

            {barLabels?.map((item, idx) => {
              return (
                <View style={{
                  width: 100,
                  marginTop: 0,
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginTop: 5,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colorsArr2[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </View>

          <ClearSpace size={4} />
        </Card>
      </>
    );
  };


  const RenderOperationalAppointmentsCornerTeam = (props) => {

    console.log("RenderOperationalAppointmentsCornerTeam data...", props?.data)

    const [dropDownCode, setDropDownCode] = useState("");
    const [dropDowndesc, setDropDownDesc] = useState("");

    const appTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.oAppointTypeDesc == null)) {
        appTypeArr.push(item?.oAppointTypeDesc)
      }
    }
    );
    const appTypeData = [...new Set(appTypeArr)];
    const appTypeCount = appTypeData.map(element =>
      appTypeArr.filter(el => el === element).length,
    );
    console.log("appTypeData...", appTypeData);
    console.log("appTypeCount...", appTypeCount);

    const entityTypeArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.oStatusDesc == null)) {
        entityTypeArr.push(item?.oStatusDesc)
      }
    }
    );
    const entityTypeData = [...new Set(entityTypeArr)];
    const entityTypeCount = entityTypeData.map(element =>
      entityTypeArr.filter(el => el === element).length,
    );
    console.log("entityTypeData...", entityTypeData);
    console.log("entityTypeCount...", entityTypeCount);

    const userGroupArr = []
    props?.data?.data?.rows?.map(item => {
      if (!(item?.oUserGroupDesc == null)) {
        userGroupArr.push(item?.oUserGroupDesc)
      }
    }
    );
    const userGroupData = [...new Set(userGroupArr)];
    const userGroupCount = userGroupData.map(element =>
      userGroupArr.filter(el => el === element).length,
    );
    console.log("userGroupData...", userGroupData);
    console.log("userGroupCount...", userGroupCount);

    const dropDownArr = [
      { code: "APP_TYPE", description: "Appointment Type" },
      { code: "ENTITY_TYPE", description: "Entity Type" },
      { code: "USER_GROUP", description: "User Group" }]

    var barLabels = []
    var barValues = []

    if (dropDownCode == "APP_TYPE") {
      barLabels = appTypeData
      barValues = appTypeCount
    }

    if (dropDownCode == "ENTITY_TYPE") {
      barLabels = entityTypeData
      barValues = entityTypeCount
    }

    if (dropDownCode == "USER_GROUP") {
      barLabels = userGroupData
      barValues = userGroupCount
    }

    console.log("barLabels...", barLabels);
    console.log("barValues...", barValues);

    const colorsArr = [
      () => "green",
      () => "red",
      () => "blue",
      () => "yellow",
      () => "orange",
      () => "pink",
      () => "purple",
      () => "gray",
      () => "cyan"
    ]

    const colorsArr2 = [
      "green",
      "red",
      "blue",
      "yellow",
      "orange",
      "pink",
      "purple",
      "gray",
      "cyan"
    ]

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

          <Text style={{ padding: 5, fontWeight: "900" }}>Appointments Corner</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>

          <View style={{ marginTop: -20, paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={dropDowndesc}
              data={dropDownArr}
              onChangeText={(text) => {
                unstable_batchedUpdates(() => {
                  setDropDownCode(text.code)
                  setDropDownDesc(text.description)
                })
              }}
              value={dropDownCode}
              placeHolder={"Select Graph Data"}
            />
          </View>

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            yAxisInterval={10} // optional, defaults to 1
            data={{
              datasets: [
                {
                  data: barValues,
                  colors: colorsArr
                },
                {
                  data: [1] // min
                },
                {
                  data: [10] // max
                }
              ],
            }}
            width={Dimensions.get('window').width - 30}
            height={320}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={90}
          />

          <View style={{
            marginTop: -30,
            alignSelf: "center",
            flex: 1,
            width: 300,
            flexDirection: "column",
          }}>

            {barLabels?.map((item, idx) => {
              return (
                <View style={{
                  width: 100,
                  marginTop: 0,
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginTop: 5,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colorsArr2[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </View>

          <ClearSpace size={4} />
        </Card>
      </>
    );
  };


  const RenderOperationalTopFiveInteractions = (props) => {
    // console.log("RenderOperationalTopFiveInteractions data...", props?.data)
    const colorsArr = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]
    const dropDownArr = [
      { code: "INTXN_TYPE", description: "Interaction Type" },
      { code: "INTXN_CAT", description: "Interaction Category" }
    ]

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <Text style={{ padding: 5, fontWeight: "900" }}>Top 5 Interactions</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>

          <View style={{ marginTop: -20, paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={topFivePerfDesc}
              data={dropDownArr}
              onChangeText={async (text) => {
                unstable_batchedUpdates(() => {
                  setTopFivePerfCode(text.code)
                  setTopFivePerfDesc(text.description)
                })
              }}
              value={topFivePerfCode}
              placeHolder={"Select Graph Data"}
            />
          </View>

          {console.log("topFiveIntxnPerfData got...", topFiveIntxnPerfData)}

          < StackedBarChart
            data={topFiveIntxnPerfData}
            width={300}
            height={350}
            strokeWidth={16}
            radius={20}
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#218838"
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            hideLegend={false}
            verticalLabelRotation={90}
          />

          {/* <View style={{
            marginTop: -30,
            alignSelf: "center",
            flex: 1,
            width: 300,
            flexDirection: "column",
          }}>

            {barLabels?.map((item, idx) => {
              return (
                <View style={{
                  width: 100,
                  marginTop: 0,
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginTop: 5,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colorsArr2[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </View> */}

          <ClearSpace size={4} />
        </Card>
      </>
    );
  };


  const RenderOperationalTopPerformanceActivityTeam = (props) => {
    const colorsArr = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]
    const dropDownArr = [
      { code: "INTERACTION", description: "Interaction" },
      { code: "ORDER", description: "Order" }
    ]

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <Text style={{ padding: 5, fontWeight: "900" }}>Top Performance Activity</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>

          <View style={{ marginTop: -20, paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={topFivePerfActivityTeamDesc}
              data={dropDownArr}
              onChangeText={async (text) => {
                unstable_batchedUpdates(() => {
                  setTopFivePerfActivityTeamCode(text.code)
                  setTopFivePerfActivityTeamDesc(text.description)
                })
              }}
              value={topFivePerfActivityTeamCode}
              placeHolder={"Select Graph Data"}
            />
          </View>

          {console.log("topPerfActivityTeam got...", topPerfActivityTeam)}

          < StackedBarChart
            data={topPerfActivityTeam}
            width={300}
            height={350}
            strokeWidth={16}
            radius={20}
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#218838"
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            hideLegend={false}
            verticalLabelRotation={90}
          />

          {/* <View style={{
            marginTop: -30,
            alignSelf: "center",
            flex: 1,
            width: 300,
            flexDirection: "column",
          }}>

            {barLabels?.map((item, idx) => {
              return (
                <View style={{
                  width: 100,
                  marginTop: 0,
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginTop: 5,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colorsArr2[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </View> */}

          <ClearSpace size={4} />
        </Card>
      </>
    );
  };



  const RenderOperationalTopCategoryPerformanceTeam = (props) => {
    const colorsArr = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]
    const dropDownArr = [
      { code: "SOURCE", description: "Source" },
      { code: "SERVICE_TYPE", description: "Service Type" },
      { code: "CHANNEL", description: "Channel" }
    ]

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <Text style={{ padding: 5, fontWeight: "900" }}>Top Category Performance</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>

          <View style={{ marginTop: -20, paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={topCategoryPerformanceTeamDesc}
              data={dropDownArr}
              onChangeText={async (text) => {
                unstable_batchedUpdates(() => {
                  setTopCategoryPerformanceTeamCode(text.code)
                  setTopCategoryPerformanceTeamDesc(text.description)
                })
              }}
              value={topCategoryPerformanceTeamCode}
              placeHolder={"Select Graph Data"}
            />
          </View>

          {console.log("topCategoryPerformanceTeamLabels got...", topCategoryPerformanceTeamLabels)}
          {console.log("topCategoryPerformanceTeamData got...", topCategoryPerformanceTeamData)}

          {(!(topCategoryPerformanceTeamData.length == 0)) && (
            <BarChart
              flatColor={true}
              withCustomBarColorFromData={true}
              yAxisInterval={10} // optional, defaults to 1
              data={{
                labels: topCategoryPerformanceTeamLabels,
                datasets: [
                  {
                    data: topCategoryPerformanceTeamData,
                    colors: [
                      () => "green",
                      () => "red",
                      () => "blue",
                      () => "yellow",
                      () => "orange"
                    ]
                  },
                  {
                    data: [1] // min
                  },
                  {
                    data: [10] // max
                  }
                ],
              }}
              width={Dimensions.get('window').width - 70}
              height={350}
              yAxisLabel={''}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />
          )}

          {/* <View style={{
            marginTop: -30,
            alignSelf: "center",
            flex: 1,
            width: 300,
            flexDirection: "column",
          }}>

            {barLabels?.map((item, idx) => {
              return (
                <View style={{
                  width: 100,
                  marginTop: 0,
                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginTop: 5,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colorsArr2[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </View> */}

          <ClearSpace size={4} />
        </Card>
      </>
    );
  };


  const RenderOverallAppointmentsData = (props) => {

    console.log("RenderOverallAppointmentsData...", props?.data)

    const successCount = props?.data?.closedAppointmentsData?.data?.rows?.filter((item, index) =>
      item.status == "AS_COMP_SUCCESS").length

    const successProbSolvingCount = props?.data?.closedAppointmentsData?.data?.rows?.filter((item, index) =>
      (item.status == "AS_COMP_SUCCESS") && (item.tran_category_type == "INTERACTION")).length

    const successFulfillCount = props?.data?.closedAppointmentsData?.data?.rows?.filter((item, index) =>
      (item.status == "AS_COMP_SUCCESS") && (item.tran_category_type == "ORDER")).length

    const unSuccessCount = props?.data?.closedAppointmentsData?.data?.rows?.filter((item, index) =>
      item.status == "AS_COMP_UNSUCCESS").length

    const unSuccessProbSolvingCount = props?.data?.closedAppointmentsData?.data?.rows?.filter((item, index) =>
      (item.status == "AS_COMP_UNSUCCESS") && (item.tran_category_type == "INTERACTION")).length

    const unSuccessFulfillCount = props?.data?.closedAppointmentsData?.data?.rows?.filter((item, index) =>
      (item.status == "AS_COMP_UNSUCCESS") && (item.tran_category_type == "ORDER")).length

    console.log("successCount...", successCount)
    console.log("successProbSolvingCount...", successProbSolvingCount)
    console.log("successFulfillCount...", successFulfillCount)
    console.log("unSuccessCount...", unSuccessCount)
    console.log("unSuccessProbSolvingCount...", unSuccessProbSolvingCount)
    console.log("unSuccessFulfillCount...", unSuccessFulfillCount)

    return (
      <>
        <View style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 90,
          marginLeft: 10,
          marginRight: 10,
          padding: 10,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: "#FFF"
        }}>
          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#E59866", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Total Appointments</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}> {props?.data?.upcomingAppointmentsData?.data?.count + props?.data?.closedAppointmentsData?.data?.count} </Text>
            </Card>

            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#BB8FCE", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Upcoming Appointments</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}> {props?.data?.upcomingAppointmentsData?.data?.count} </Text>
            </Card>
          </View>

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#F1C40F", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Cancelled Appointments</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}> 0 </Text>
            </Card>

            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#CD6155", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Completed Appointments</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}> {props?.data?.closedAppointmentsData?.data?.count} </Text>
            </Card>
          </View>

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "column" }}>
            <Card
              onPress={() => {

              }}
              style={{ width: width - 40, backgroundColor: "#45B39D", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Successfull Appointments</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{successCount}</Text>

              <Text style={{ padding: 5, color: "#FFF" }}>----------------------------------------------------------------------</Text>

              <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Sales  - </Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>0</Text>
              </View>

              <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Fullfillment  - </Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{successFulfillCount}</Text>
              </View>

              <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Problem Solving  - </Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{successProbSolvingCount}</Text>
              </View>
            </Card>

            <Card
              onPress={() => {

              }}
              style={{ width: width - 40, backgroundColor: "#EC7063", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Un-Successfull Appointments</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{unSuccessCount}</Text>

              <Text style={{ padding: 5, color: "#FFF" }}>----------------------------------------------------------------------</Text>

              <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Sales  - </Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>0</Text>
              </View>

              <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Fullfillment  - </Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{unSuccessFulfillCount}</Text>
              </View>

              <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
                <Text style={{ padding: 5, color: "#FFFFFF" }}>Problem Solving  - </Text>
                <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{unSuccessProbSolvingCount}</Text>
              </View>
            </Card>
          </View>
        </View>
      </>
    );
  };

  const RenderCalendarEventsAppointmentsData = (props) => {

    console.log("calendar events data...", props.data)

    var selSlotIds = []

    const eventClicked = (event) => {
      //On Click of event showing alert from here
      var jsonObj = event
      var startStr = jsonObj.start
      var endStr = jsonObj.end
      alert(startStr + " - " + endStr);
      var alreadyExists = false
      selSlotIds.forEach((item, idx) => {
        if (jsonObj.extendedProps.slotId == item) {
          alreadyExists = true
        }
      })
      if (alreadyExists) {
        selSlotIds.pop(jsonObj.extendedProps.slotId)
      }
      else {
        selSlotIds.push(jsonObj.extendedProps.slotId)
      }
    };

    return (
      <>
        <View style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 90,
          marginLeft: 10,
          marginRight: 10,
          padding: 10,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: "#FFF"
        }}>
          <SafeAreaView style={styles.eventContainer}>
            <View style={styles.eventContainer}>
              <EventCalendar
                eventTapped={eventClicked}
                // Function on event press
                events={props?.data?.data}
                // Passing the Array of event
                width={width - 30}
                // Container width
                size={60}
                // number of date will render before and after initDate
                // (default is 30 will render 30 day before initDate
                // and 29 day after initDate)
                initDate={moment(new Date()).format("YYYY-MM-DD")}
                // Show initial date (default is today)
                scrollToFirst
              // Scroll to first event of the day (default true)
              />
            </View>
          </SafeAreaView>
        </View>
      </>
    );
  };


  const RenderUpcomingAppointmentsData = (props) => {

    console.log("RenderUpcomingAppointmentsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {



      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.customer_name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.first_name + " " + body.last_name}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.date}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.appoint_date).format("DD MMM YYYY")}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.time}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appoint_start_time} - {body.appoint_end_time}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.appoinment_type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appoint_mode_description}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.status_description}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.entity_type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.tran_category_type_description}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.ouname}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.category_details}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.type_details}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.entity_no}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.tran_category_no}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  var data = {}
                  props?.data?.data?.rows?.map((item, idx) => {
                    if (item.tran_category_no == body.tran_category_no) {
                      data = item
                    }
                  })

                  let params = { orderParams: data }
                  console.log("sending params..", params)
                  navigation.navigate(STACK_ORDER_DETAILS, {
                    orderParams: params
                  })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>
          </View>

        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 80, marginLeft: 15, marginRight: 15 }}>
          {props?.data?.data?.rows.length > 0 && (
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
              }}
              data={props?.data?.data?.rows}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          )}
        </View>
      </>
    );
  };



  const RenderClosedAppointmentsData = (props) => {

    console.log("RenderClosedAppointmentsData...", props.data)

    const renderItem = ({ item }) => (
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5
        }}

        onPress={() => {
          // let params = {
          //   interactionSearchParams: interactionReducer.interactionSearchData[0]
          // }

          // navigation.navigate(STACK_INTERACTION_DETAILS, {
          //   interactionSearchParams: params
          // })
        }
        }
      >
        <Item body={item} />
      </Pressable>
    );

    const Item = ({ body }) => {

      var duration = secondsToHMS(hmsToSeconds(body.appoint_end_time) - hmsToSeconds(body.appoint_start_time))
      var a = duration.split(':'); // split it at the colons
      // Hours are worth 60 minutes.
      var minutes = (+a[0]) * 60 + (+a[1]);
      console.log("minutes..", minutes)

      return (
        <View style={{
          flexDirection: "column",
          marginLeft: 30,
          padding: 0,
          backgroundColor: "#FFF"
        }}>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.customer_name}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.first_name + " " + body.last_name}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.status}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.status_description}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.date}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.appoint_date).format("DD MMM YYYY")}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.time}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.appoint_start_time} - {body.appoint_end_time}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.duration}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{minutes} mins</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.entity_type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.tran_category_type_description}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.ouname}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.category_details}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.type}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.type_details}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.entity_no}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{body.tran_category_no}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "normal" }}>{strings.completed_on}</Text>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{moment(body.updated_at).format("DD MMM YYYY")}</Text>
            </View>
          </View>

          {/* <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
              <Pressable
                style={{ marginTop: 5 }}
                onPress={async () => {
                  // let params0 = {
                  //   searchParams: {
                  //     interactionNumber: body.oIntxnNo,
                  //   }
                  // }
                  // console.log("interaction details params A..", params0)
                  // await dispatch(await getInteractionDetailsSearch(params0, navigation))
                  // console.log("interaction details result A..", interactionReducer.interactionSearchData[0])

                  // let params = {
                  //   interactionSearchParams: interactionReducer.interactionSearchData[0]
                  // }
                  // navigation.navigate(STACK_INTERACTION_DETAILS, {
                  //   interactionSearchParams: params
                  // })
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5
                  }}
                >
                  <Text
                    variant="bodySmall"
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#EFA848",
                    }}
                  >
                    View More
                  </Text>
                  <Image
                    source={require("../../Assets/icons/ic_right_arrow.png")}
                    style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
                  />
                </View>
              </Pressable>
            </View>
          </View> */}

        </View>
      );
    }

    return (
      <>
        <View style={{ flex: 1, marginTop: 80, marginLeft: 15, marginRight: 15 }}>
          {props?.data?.data?.rows?.length > 0 && (
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
              }}
              data={props?.data?.data?.rows}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          )}
        </View>
      </>
    );
  };


  const RenderOverallInfoAppointmentsData = (props) => {

    console.log("RenderOverallInfoAppointmentsData...", props?.data)

    return (
      <>
        <View style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 90,
          marginLeft: 10,
          marginRight: 10,
          padding: 10,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: "#FFF"
        }}>
          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#F5B041", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Scheduled VS Completed</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>30%</Text>
            </Card>

            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#1ABC9C", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Completed VS Successfull</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>60%</Text>
            </Card>
          </View>

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#2E86C1", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Completed VS UnSuccessfull</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>30%</Text>
            </Card>

            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#5D6D7E", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Scheduled VS Cancelled</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>50%</Text>
            </Card>
          </View>

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#CD6155", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Scheduled VS Upcoming</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>60%</Text>
            </Card>
          </View>

        </View>
      </>
    );
  };


  const RenderBasedOnAppType = (props) => {

    console.log("RenderBasedOnAppType...", props?.data?.typeBasedAppointmentData)
    var dataArr = [
      { code: "ALL", description: "All" },
      { code: "INTERACTION", description: "Interaction" },
      { code: "ORDER", description: "Order" }
    ]

    var custVisitCount = 0, scheduledCount = 0, successCount = 0
    props?.data?.typeBasedAppointmentData?.data?.map((item, idx) => {
      if (item.o_appoint_type == "CUST_VISIT") {
        custVisitCount = custVisitCount + Number(item.o_t_cnt)
      }

      if (item.o_status == "AS_COMP") {
        scheduledCount = scheduledCount + Number(item.o_t_cnt)
      }

      if (item.o_status == "AS_COMP_SUCCESS") {
        successCount = successCount + Number(item.o_t_cnt)
      }
    })

    return (
      <>
        <View style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 90,
          marginLeft: 10,
          marginRight: 10,
          padding: 10,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: "#FFF"
        }}>
          <View style={{ paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={selAppTypeDesc}
              data={dataArr}
              onChangeText={(text) => {
                unstable_batchedUpdates(() => {
                  setSelAppTypeCode(text.code)
                  setSelAppTypeDesc(text.description)
                })
              }}
              value={selAppTypeCode}
              caption={"Appointment Type"}
              placeHolder={"Select Appointment Type"}
            />
          </View>

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            {/* {props?.data?.typeBasedAppointmentData?.data?.map((item, idx) => {
              return ( */}
            <Card
              onPress={() => {

              }}
              style={{ width: (width / 2) - 30, backgroundColor: "#3498DB", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Customer Visit : {custVisitCount}</Text>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Scheduled : {scheduledCount}</Text>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Success : {successCount}</Text>
            </Card>
            {/* )
            })} */}
          </View>
        </View>
      </>
    );
  };


  // ---------------------------------------Helpdesk methods start-----------------------------------------------------------------

  const RenderHelpdeskSummaryData = (props) => {

    console.log("helpdeskSummaryData...", props.data)

    // if (!(props.data.helpdeskSummaryData == undefined)) {

    const serviceReqArr = [], clarificationArr = [], incidentArr = [], unclassifiedArr = []

    props.data?.data?.map(item => {
      if (item.oHelpdeskTypeCode === "SERVICEREQUEST") {
        serviceReqArr.push(item)
      }
      if (item.oHelpdeskTypeCode === "CLARIFICATION") {
        clarificationArr.push(item)
      }
      if (item.oHelpdeskTypeCode === "INCIDENT") {
        incidentArr.push(item)
      }
      if (item.oHelpdeskTypeCode === null) {
        unclassifiedArr.push(item)
      }
    })

    const summaryList = props.data.data

    const xAxisData = [...new Set(summaryList?.map(item => {
      if (item?.oPriority == null) { "" }
      else {
        item?.oPriority
      }
    }
    ))];
    const priorities = [...new Set(summaryList?.map(item => item?.oPriority))];
    const statuses = [...new Set(summaryList?.map(item => item?.oStatus))];

    const series = statuses?.map(status => {
      const respData = priorities?.map(priority => {
        const matchingItem = summaryList.find(item => item.oStatus === status && item.oPriority === priority);
        return matchingItem ? matchingItem.oCnt : 0;
      });
      return respData
    })

    console.log('xAxisData------>', xAxisData)
    console.log('statuses------>', statuses)
    console.log('series------>', series)

    const data = {
      labels: xAxisData,
      legend: statuses,
      data: series,
      barColors: ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]
    };

    if (get(data, 'data.length', 0) == 0) return null
    const legend = get(data, 'legend', []);

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk Summary</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View style={{ backgroundColor: "transparent", flexDirection: "row", alignContent: "center", alignSelf: "center" }}>
            <Card
              onPress={() => {
                console.log("clarification data....", intDashRed.helpdeskSummaryClarificationData?.data)
                dialogHeading = "Summary Wise Helpdesk Details"
                setHelpdeskDialogData(intDashRed.helpdeskSummaryClarificationData?.data)
                setHelpdeskDetDialogVisible(true)
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Clarification</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryClarificationData?.data?.length}</Text>
            </Card>

            <Card
              onPress={() => {
                dialogHeading = "Summary Wise Helpdesk Details"
                setHelpdeskDialogData(intDashRed.helpdeskSummaryIncidentData?.data)
                setHelpdeskDetDialogVisible(true)
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Incident</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryIncidentData?.data?.length}</Text>
            </Card>

            <Card
              onPress={() => {
                dialogHeading = "Summary Wise Helpdesk Details"
                setHelpdeskDialogData(intDashRed.helpdeskSummaryServiceRequestData?.data)
                setHelpdeskDetDialogVisible(true)
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Service Request</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryServiceRequestData?.data?.length}</Text>
            </Card>

            <Card
              onPress={() => {
                dialogHeading = "Summary Wise Helpdesk Details"
                setHelpdeskDialogData(intDashRed.helpdeskSummaryUnclassifiedData?.data)
                setHelpdeskDetDialogVisible(true)
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Unclassified</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryUnclassifiedData?.data?.length}</Text>
            </Card>
          </View>



          <ClearSpace size={4} />

          <StackedBarChart
            style={{}}
            data={data}
            width={width * .9}
            height={350}
            hideLegend={true}
            chartConfig={{
              //bar width
              barPercentage: 1.3,
              barRadius: 2,
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 0, // optional, defaults to 2dp
              //horizontal line indicator
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `black`,
              style: {
                borderRadius: 3
              },
              propsForDots: {
                // r: "61",
                // strokeWidth: "10",
                // stroke: "#ffa726"
              }
            }}
            verticalLabelRotation={90}
          />

          <View style={{ backgroundColor: "white", padding: 5, paddingTop: 15, alignSelf: 'center' }}>
            <View style={{
              width: 200,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignSelf: "flex-start"
            }}>
              {legend.length && legend.map((it, idx) => {
                return (
                  <View key={it} style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginLeft: idx == 0 ? 10 : 10,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: get(data, `barColors[${idx}]`)
                    }} />
                    <Text style={{ fontSize: 11 }}>{it}</Text>
                  </View>
                )
              })}
            </View>
          </View>

          <ClearSpace />
        </Card>
      </>
    );
    // }
  };

  const RenderSupportTicketPendingData = (props) => {

    if (!(props.data.supportTtkPendingCountsData == undefined)) {

      const widthAndHeight = 200
      var series = []

      const countData = props?.data?.supportTtkPendingCountsData
      const valData = props?.data?.supportTtkPendingData?.rows

      console.log("countData...", countData)
      console.log("valData...", valData)

      const coloursArr = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#2980B9', '#3498DB', '#16A085',
        '#F4D03F', '#F39C12', '#DC7633', '#5DADE2']


      var data = []
      Object.keys(countData).forEach((item, idx) => {
        console.log("keys...", item)
        var project = ""
        if (item == "null") {
          project = "Unclassified"
        }
        else {
          project = item
        }

        data.push(
          {
            name: project,
            population: countData[item],
            color: coloursArr[idx],
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
          }
        )

        series.push(countData[item])
      })

      const colorsArr = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#2980B9', '#3498DB', '#16A085',
        '#F4D03F', '#F39C12', '#DC7633', '#5DADE2']
      var colours = []
      series.forEach((item, idx) => {
        colours.push(colorsArr[idx])
      })

      console.log("data arr...", data)

      return (
        <>
          <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
            <ClearSpace />
            <Text style={{ padding: 5, fontWeight: "900" }}>Support Ticket Pending With</Text>
            <ClearSpace />
            <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
            <ClearSpace size={4} />

            <View style={{ limitbackgroundColor: "transparent", flexDirection: "row", alignContent: "center", alignSelf: "center" }}>
              <ScrollView horizontal={true} thick>
                {data.map((item, idx) => {
                  console.log("data item...", item)
                  return (
                    <>
                      <Card
                        onPress={() => {
                          var dataArr = []
                          valData.forEach((item1, idx) => {
                            console.log("item1...", item1)
                            if (item1.project == item.name) {
                              dataArr.push(item1)
                            }
                          })
                          console.log("dataArr...", dataArr)
                          dialogHeading = "Project Wise Open Helpdesk Details"
                          setHelpdeskDialogData(dataArr)
                          setHelpdeskDetDialogVisible(true)
                        }}
                        style={{ alignContent: "center", height: 60, width: 80, backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
                        <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontSize: 10 }}>{item.name === null ? "Unclassified" : item.name}</Text>
                        <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{item.population}</Text>
                      </Card>
                    </>
                  )
                })}


              </ScrollView>
            </View>

            <ClearSpace size={8} />

            <View style={{ alignItems: "center", alignContent: "center", marginTop: 5, flexDirection: "row" }}>

              {series.length > 0 && (
                <PieChart style={{ marginTop: 0 }} widthAndHeight={widthAndHeight} series={series} sliceColor={colours} />
              )}

              <View style={{ marginLeft: 10, marginTop: 0, flexDirection: "column" }}>
                {data?.map((item, idx) => {
                  return (
                    <View style={{
                      width: 100,
                      alignSelf: "flex-end",
                      marginTop: 0,
                    }}>
                      <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                      }}>
                        <View style={{
                          marginRight: 2,
                          width: 10, height: 10, borderRadius: 2,
                          backgroundColor: item.color
                        }} />
                        <Text style={{ fontSize: 11 }}>{item.name}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>

            <ClearSpace size={4} />
          </Card>
        </>
      );
    }
  };

  const RenderMonthlyDailyTrends = (props) => {

    var dateArray = [], wipCountArray = [], closedCountArray = [], valuesArr = [];

    // var date = new Date();
    // var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // console.log("firstDay...", startDate)
    // console.log("lastDay...", endDate)

    // if (startDate && endDate) {
    //   const start = new Date("2023-09-01");
    //   const end = new Date("2023-09-05");
    //   const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    //   const dates = [];
    //   for (let i = 0; i <= days; i++) {
    //     const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);

    //     const day = currentDate.getDate().toString().padStart(2, '0');
    //     const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    //     const year = currentDate.getFullYear().toString();
    //     `${day}/${month}/${year}`;

    //     dates.push(`${day}/${month}/${year}`);
    //   }
    //   // setDateArray(dates);
    //   console.log("dates...", dates)
    //   // dateArray = dates
    // }

    var colors = ["#58D68D", "#3498DB", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]


    props?.data?.data?.forEach(item => {
      console.log("oCnt...", item.oCnt)

      dateArray.push(item.oDayMonth)

      if (item.oStatus == "WIP") {
        wipCountArray.push("" + item.oCnt)
      }

      if (item.oStatus == "CLOSED") {
        closedCountArray.push("" + item.oCnt)
      }

    })


    var labelsArr = []
    props?.data?.data?.map((item, idx) => {
      labelsArr.push(item.oStatus)
    })
    labelsArr = [...new Set(labelsArr)];


    // valuesArr = [
    //   {
    //     data: wipCountArray,
    //     strokeWidth: 2,
    //     color: (opacity = 1) => "#F4D03F"
    //   },
    //   {
    //     data: closedCountArray,
    //     strokeWidth: 2,
    //     color: (opacity = 1) => "#A569BD"
    //   }
    // ]

    console.log("valuesArr.....", valuesArr)

    dateArray = dateArray.filter((item,
      index) => dateArray.indexOf(item) === index);

    const sortedDateArray = dateArray.sort(function (dateArray, b) {
      return new Date(dateArray) - new Date(b)
    })

    var dataSetArr = []
    console.log("dateArray.....", sortedDateArray)
    console.log("wipCountArray.....", wipCountArray)
    console.log("closedCountArray.....", closedCountArray)

    if ((dateArray.length > 0) && (wipCountArray.length > 0) && (closedCountArray.length > 0)) {

      return (
        <>
          <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
            <ClearSpace />
            <Text style={{ padding: 5, fontWeight: "900" }}>This Month Daily Trends</Text>
            <ClearSpace />
            <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
            <ClearSpace size={4} />


            <View style={{
              flexDirection: "row",
              width: 100,
              alignSelf: "center",
              marginTop: 10,
            }}>

              {labelsArr.map((item, idx) => {
                if (item == "WIP") {
                  dataSetArr.push(
                    {
                      data: wipCountArray,
                      strokeWidth: 2,
                      color: (opacity = 1) => colors[idx]
                    }
                  )
                }

                if (item == "CLOSED") {
                  dataSetArr.push(
                    {
                      data: closedCountArray,
                      strokeWidth: 2,
                      color: (opacity = 1) => colors[idx]
                    }
                  )
                }



                return (

                  <View style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}>
                    <View style={{
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: colors[idx]
                    }} />
                    <Text style={{ fontSize: 11 }}>{item}</Text>
                  </View>
                )
              })}

            </View>

            <LineChart
              data={{
                labels: dateArray,
                datasets: dataSetArr,
              }}
              width={Dimensions.get('window').width - 25}
              height={230}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginLeft: -5,
                marginVertical: 8,
                borderRadius: 16,
              }}
              hidePointsAtIndex={Array.from({ length: dateArray.length }, (v, k) => (k % 2 === 0) ? k : null)}
              verticalLabelRotation={30}
            />


            <ClearSpace size={4} />
          </Card>
        </>
      );
    }

  };

  const RenderHelpdeskByStatus = (props) => {


    console.log("status props...", props.data)

    var wipCount = 0, closedCount = 0, assignedCount = 0, newCount = 0, holdCount = 0, escalatedCount = 0

    props?.data?.data?.forEach(item => {
      console.log("oStatus...", item.oStatus)

      if (item.oStatus == "New") {
        newCount = item.oCnt
      }

      if (item.oStatus == "Hold") {
        holdCount = item.oCnt
      }

      if (item.oStatus == "Assigned") {
        assignedCount = item.oCnt
      }

      if (item.oStatus == "Work In Progress") {
        wipCount = item.oCnt
      }

      if (item.oStatus == "Closed") {
        closedCount = item.oCnt
      }

      if (item.oStatus == "Escalated") {
        escalatedCount = item.oCnt
      }

    })

    var barColors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]
    var currentColor = ""
    var sectionsArr = []
    const data = []

    const widthAndHeight = 200
    const series = []
    const sliceColor = []



    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk By Status</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          {/* <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.title}>Basic</Text>
              <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
              <Text style={styles.title}>Doughnut</Text>

            </View>
          </ScrollView> */}


          <View style={{ limitbackgroundColor: "transparent", flexDirection: "row", alignContent: "center", alignSelf: "center" }}>
            <ScrollView horizontal={true}>
              {props?.data?.data?.map((item, idx) => {
                console.log("oStatus2...", item.oStatus)
                return (
                  <>
                    <Card
                      onPress={async () => {
                        var params = ""
                        if (item.oStatus == "Assigned") {
                          params = {
                            status: "HS_ASSGN",
                            type: "LIST"
                          };
                        }
                        if (item.oStatus == "Closed") {
                          params = {
                            status: "HS_CLS",
                            type: "LIST"
                          };
                        }
                        if (item.oStatus == "Escalated") {
                          params = {
                            status: "HS_ESCALATED",
                            type: "LIST"
                          };
                        }
                        if (item.oStatus == "Hold") {
                          params = {
                            status: "HS_HOLD",
                            type: "LIST"
                          };
                        }
                        if (item.oStatus == "New") {
                          params = {
                            status: "HS_NEW",
                            type: "LIST"
                          };
                        }
                        if (item.oStatus == "Work In Progress") {
                          params = {
                            status: "HS_WIP",
                            type: "LIST"
                          };
                        }
                        setLoader(true)
                        var status = await dispatch(await getHelpdeskByStatusList(params))
                        console.log("getHelpdeskByStatusList status UI..", status);
                        console.log("getHelpdeskByStatusList result UI..", intDashRed?.helpdeskByStatusListData);
                        dialogHeading = "Status Wise Helpdesk Details"
                        setHelpdeskDialogData(intDashRed?.helpdeskByStatusListData.data)
                        setLoader(false)
                        setHelpdeskDetDialogVisible(true)
                      }}
                      style={{ alignContent: "center", height: 60, width: 80, backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
                      <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontSize: 10 }}>{item.oStatus}</Text>
                      <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{item.oCnt}</Text>
                    </Card>
                  </>
                )
              })}
            </ScrollView>
          </View>

          <ClearSpace size={4} />

          {props?.data?.data?.map((item, idx) => {

            if (item.oStatus == "Assigned") {
              currentColor = barColors[2]
              sectionsArr.push(
                {
                  percentage: assignedCount,
                  color: barColors[2],
                }
              )
              series.push(assignedCount)
              sliceColor.push(barColors[2])
              data.push({ value: assignedCount })
            }
            if (item.oStatus == "Closed") {
              currentColor = barColors[4]
              sectionsArr.push(
                {
                  percentage: closedCount,
                  color: barColors[4],
                }
              )
              series.push(closedCount)
              sliceColor.push(barColors[4])
              data.push({ value: closedCount })
            }
            if (item.oStatus == "Escalated") {
              currentColor = barColors[5]
              sectionsArr.push(
                {
                  percentage: escalatedCount,
                  color: barColors[5],
                }
              )
              series.push(escalatedCount)
              sliceColor.push(barColors[5])
              data.push({ value: escalatedCount })
            }
            if (item.oStatus == "Hold") {
              currentColor = barColors[1]
              sectionsArr.push(
                {
                  percentage: holdCount,
                  color: barColors[1],
                }
              )
              series.push(holdCount)
              sliceColor.push(barColors[1])
              data.push({ value: holdCount })
            }
            if (item.oStatus == "New") {
              currentColor = barColors[0]
              sectionsArr.push(
                {
                  percentage: newCount,
                  color: barColors[0],
                }
              )
              series.push(newCount)
              sliceColor.push(barColors[0])
              data.push({ value: newCount })
            }
            if (item.oStatus == "Work In Progress") {
              currentColor = barColors[3]
              sectionsArr.push(
                {
                  percentage: wipCount,
                  color: barColors[3],
                }
              )
              series.push(wipCount)
              sliceColor.push(barColors[3])
              data.push({ value: wipCount })
            }

          })}

          <View style={{ marginLeft: 20, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              {series.length > 0 && (
                <PieChart
                  style={{ marginTop: 0 }}
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  coverRadius={0.5}
                  coverFill={'#FFF'}
                />
              )}
            </View>

            <View style={{
              alignSelf: "center",
              alignItems: "center",
              flex: 1,
              width: 200,
              flexDirection: "column",
            }}>

              {props?.data?.data?.map((item, idx) => {
                if (item.oStatus == "Assigned") {
                  currentColor = barColors[2]
                }
                if (item.oStatus == "Closed") {
                  currentColor = barColors[4]
                }
                if (item.oStatus == "Escalated") {
                  currentColor = barColors[5]
                }
                if (item.oStatus == "Hold") {
                  currentColor = barColors[1]
                }
                if (item.oStatus == "New") {
                  currentColor = barColors[0]
                }
                if (item.oStatus == "Work In Progress") {
                  currentColor = barColors[3]
                }

                return (
                  <View style={{
                    width: 100,
                    alignSelf: "flex-end",
                    marginTop: 10,
                  }}>
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start"
                    }}>
                      <View style={{
                        marginRight: 2,
                        width: 10, height: 10, borderRadius: 2,
                        backgroundColor: currentColor
                      }} />
                      <Text style={{ fontSize: 11 }}>{item.oStatus}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>


          <ClearSpace size={5} />

        </Card>
      </>
    );

  };

  const RenderHelpdeskByAgeing = (props) => {

    console.log("Ageing props...", props.data)

    var greaterThanTenDays = [], zeroToThreeDays = [], fourToSevenDays = [], eightToTenDays = []

    props?.data?.data?.forEach(item => {
      console.log("statusdesc...", item.statusdesc)

      if (item.agingCategory == "> 10 days") {
        greaterThanTenDays.push(item)
      }

      if (item.agingCategory == "0 - 3 days") {
        zeroToThreeDays.push(item)
      }

      if (item.agingCategory == "4 - 7 days") {
        fourToSevenDays.push(item)
      }

      if (item.agingCategory == "8 - 10 days") {
        eightToTenDays.push(item)
      }
    })

    const ageCategory = [...new Set(props?.data?.data?.map(item => item.agingCategory))];

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk By Ageing</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View style={{ alignSelf: "center", limitbackgroundColor: "transparent", flexDirection: "row", alignContent: "center", alignSelf: "center" }}>
            <ScrollView
              style={{ alignSelf: "center" }}
              horizontal={true}
            >
              {ageCategory.map((item, idx) => {
                console.log("data item...", item)
                var count = 0

                {
                  (item == "> 10 days") && (
                    count = greaterThanTenDays.length
                  )
                }

                {
                  (item == "0 - 3 days") && (
                    count = zeroToThreeDays.length
                  )
                }

                {
                  (item == "4 - 7 days") && (
                    count = fourToSevenDays.length
                  )
                }

                {
                  (item == "8 - 10 days") && (
                    count = eightToTenDays.length
                  )
                }



                return (
                  <>
                    <Card
                      onPress={() => {
                        // let params = {
                        //   helpdeskType: "CLARIFICATION",
                        //   type: "LIST"
                        // };
                        // dispatch(getHelpdeskSummaryClarification(params))
                        // console.log("getHelpdeskSummaryClarification result UI..", intDashRed?.helpdeskSummaryClarificationData);

                        var dataArr = []
                        props.data?.data.forEach((ageingItem, idx) => {
                          console.log("ageing item...", ageingItem)
                          if (ageingItem.agingCategory == item) {
                            dataArr.push(ageingItem)
                          }
                        })
                        console.log("dataArr ageing result UI..", dataArr)
                        dialogHeading = "Open Helpdesk by Ageing"
                        setHelpdeskDialogData(dataArr)
                        setHelpdeskDetDialogVisible(true)
                      }}
                      style={{ alignContent: "center", height: 60, width: 80, backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
                      <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontSize: 10 }}>{item}</Text>
                      <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{count}</Text>
                    </Card>
                  </>
                )
              })}
            </ScrollView>
          </View>

          <BarChart
            flatColor={true}
            withCustomBarColorFromData={true}
            yAxisInterval={10} // optional, defaults to 1
            data={{
              labels: ageCategory,
              datasets: [
                {
                  data: [greaterThanTenDays.length, zeroToThreeDays.length, fourToSevenDays.length, eightToTenDays.length],
                  colors: [
                    () => "green",
                    () => "red",
                    () => "blue",
                    () => "yellow",
                    () => "orange"
                  ]
                },
                {
                  data: [1] // min
                },
                {
                  data: [10] // max
                }
              ],
            }}
            width={Dimensions.get('window').width - 70}
            height={350}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={30}
          />

          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderHelpdeskBySeverity = (props) => {

    console.log("severity props...", props.data)
    var severity = []

    var criticalCount = 0, majorCount = 0, minorCount = 0, unclassifiedCount = 0

    props?.data?.data?.forEach(item => {
      console.log("oStatus...", item.oStatus)
      severity = [...new Set(props?.data?.data?.map(item => item.oStatus))];


      if (item.oStatus == "Critical") {
        criticalCount = criticalCount + item.oCnt
      }

      else if (item.oStatus == "Major") {
        majorCount = majorCount + item.oCnt
      }

      else if (item.oStatus == "Minor") {
        minorCount = minorCount + item.oCnt
      }

      else {
        unclassifiedCount = unclassifiedCount + item.oCnt
      }

    })

    console.log("criticalCount..", criticalCount)
    console.log("majorCount..", majorCount)
    console.log("minorCount..", minorCount)
    console.log("unclassifiedCount..", unclassifiedCount)

    var widthAndHeight = 200
    var series = []
    var sum = criticalCount + majorCount + minorCount + unclassifiedCount
    var colorsArr = []
    if (sum > 0) {
      series.push(criticalCount, majorCount, minorCount, unclassifiedCount)
      colorsArr = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#2980B9', '#3498DB', '#16A085',
        '#F4D03F', '#F39C12', '#DC7633', '#5DADE2']
      var colors = []
      series.forEach((item, idx) => {
        colors.push(colorsArr[idx])
      })
    }

    var currentColor = ""

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk By Severity</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View style={{ limitbackgroundColor: "transparent", flexDirection: "row", alignContent: "center", alignSelf: "center" }}>
            <ScrollView horizontal={true}>
              {severity?.map((item, idx) => {
                console.log("oStatus2...", item)
                return (
                  <>
                    <Card
                      onPress={async () => {
                        if (sum > 0) {
                          var params = ""
                          if (item == "Critical") {
                            params = {
                              i_severity_str: "INS_CRITICAL",
                              type: "LIST"
                            };
                          }
                          else if (item == "Major") {
                            params = {
                              i_severity_str: "INS_MAJOR",
                              type: "LIST"
                            };
                          }
                          else if (item == "Minor") {
                            params = {
                              i_severity_str: "INS_MINOR",
                              type: "LIST"
                            };
                          }
                          else {
                            params = {
                              i_severity_str: null,
                              type: "LIST"
                            };
                          }
                          setLoader(true)
                          var status = await dispatch(await getHelpdeskBySeverityList(params))
                          console.log("getHelpdeskBySeverityList status UI..", status);
                          console.log("getHelpdeskBySeverityList result UI..", intDashRed?.helpdeskBySeverityListData);
                          dialogHeading = "Severity Wise Helpdesk Details"
                          setHelpdeskDialogData(intDashRed?.helpdeskBySeverityListData.data)
                          setLoader(false)
                          setHelpdeskDetDialogVisible(true)
                        }
                      }}
                      style={{ alignContent: "center", height: 60, width: 80, backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
                      <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontSize: 10 }}>{item}</Text>
                      <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{series[idx]}</Text>
                    </Card>
                  </>
                )
              })}
            </ScrollView>
          </View>

          <ClearSpace size={4} />

          <View style={{ marginLeft: 20, flexDirection: "row" }}>
            <View style={{ flex: 1, marginLeft: 30, width: 175, alignItems: 'center' }}>
              {series.length > 0 && (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={colors}
                  coverRadius={0.5}
                  coverFill={'#FFF'}
                />
              )}
            </View>

            <View style={{
              alignSelf: "center",
              flex: 1,
              width: 200,
              flexDirection: "column",
            }}>

              {severity?.map((item, idx) => {
                currentColor = colorsArr[idx]
                return (
                  <View style={{
                    width: 100,
                    alignSelf: "flex-end",
                    marginTop: 10,
                  }}>
                    <View style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start"
                    }}>
                      <View style={{
                        marginTop: 4,
                        marginRight: 2,
                        width: 10, height: 10, borderRadius: 2,
                        backgroundColor: currentColor
                      }} />
                      <Text style={{ fontSize: 11 }}>{item}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          <ClearSpace size={4} />
        </Card>
      </>
    );

  };



  const RenderHourlyTicketsData = (props) => {

    var colors = ["#58D68D", "#3498DB", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

    var dataArr = []
    props.data.hourlyTicketsData?.forEach(item => {
      dataArr.push(item.oTicketCnt)
    })

    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Today Tickets (Hourly)</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          {dataArr.length > 0 && (
            <LineChart
              data={{
                datasets: dataArr,
              }}
              width={Dimensions.get('window').width - 25}
              height={230}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginLeft: -5,
                marginVertical: 8,
                borderRadius: 16,
              }}
              hidePointsAtIndex={Array.from({ length: dateArray.length }, (v, k) => (k % 2 === 0) ? k : null)}
              verticalLabelRotation={30}
            />
          )}

          <ClearSpace size={4} />
        </Card>
      </>
    );
  }




  const RenderProjectWiseOpenHelpdesk = (props) => {

    console.log("project wise data...", props.data)
    var projDescArr = []
    var projectCount = new Map([["", 0]]);

    props?.data?.data?.rows?.map(item => {
      if (!(item.statusDesc.description == "Closed")) {

        var exists = false

        projDescArr.forEach(item2 => {
          if (item2 === item?.projectDesc?.description) {
            exists = true
          }
        })


        if (!exists) {
          projDescArr.push(item?.projectDesc?.description)
          projectCount.set(item?.projectDesc?.description, 1)
        }
        else {
          const count = projectCount.get(item.projectDesc?.description) + 1
          projectCount.set(item?.projectDesc?.description, count)
        }

      }
    })

    console.log("projectCount...", projectCount)

    var array = Array.from(projectCount, ([name, value]) => ({ name, value }));

    console.log("array....", array);


    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Project Wise Open Helpdesk</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View styles={{ flexDirection: "column" }}>
            {array.map(item => {
              var project = ""
              if ((item.name == undefined) || (item.name == null)) {
                project = "Others"
              }
              else {
                project = item.name
              }

              const count = item.value

              console.log("count...", count)
              console.log("project...", project)

              if (!(item.value == 0)) {

                return (
                  <View style={{ marginTop: 2, flexDirection: "column", alignSelf: "center", borderWidth: 0 }}>
                    <View style={{ flexDirection: "row", margin: 0 }}>
                      <View style={{ marginRight: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 230, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text style={{ fontWeight: "normal" }}>{project}</Text>
                      </View>

                      <View style={{ marginLeft: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 80, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text
                          onPress={() => {
                            // setProject(project)
                            var dataArr = []
                            props?.data?.data?.rows?.map(projectItem => {
                              if (projectItem?.projectDesc?.description == item.name) {
                                dataArr.push(projectItem)
                              }
                            })

                            dialogHeading = "Project Wise Open Helpdesk Details"
                            setHelpdeskDialogData(dataArr)
                            setHelpdeskDetDialogVisible(true)
                          }}
                          style={{ alignSelf: "center", fontWeight: "normal" }}>{count}</Text>
                      </View>
                    </View>
                  </View>
                );

              }
            })}
          </View>
          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderAgentWiseHelpdesk = (props) => {

    console.log("project wise data...", props.data)
    var projDescArr = []
    var projectCount = new Map([["", 0]]);

    props?.data?.data?.rows?.map(item => {
      // if (!(item.assignedAgentDetails.userId == "Closed")) {

      var exists = false

      projDescArr.forEach(item2 => {
        if (item2 === item.assignedAgentDetails.firstName + " " + item.assignedAgentDetails.lastName) {
          exists = true
        }
      })


      if (!exists) {
        projDescArr.push(item.assignedAgentDetails.firstName + " " + item.assignedAgentDetails.lastName)
        projectCount.set(item.assignedAgentDetails.firstName + " " + item.assignedAgentDetails.lastName, 1)
      }
      else {
        const count = projectCount.get(item.assignedAgentDetails.firstName + " " + item.assignedAgentDetails.lastName) + 1
        projectCount.set(item.assignedAgentDetails.firstName + " " + item.assignedAgentDetails.lastName, count)
      }

      // }
    })

    console.log("projectCount...", projectCount)

    var array = Array.from(projectCount, ([name, value]) => ({ name, value }));

    console.log("array2....", array);


    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Agent Wise Open Helpdesk</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View styles={{ flexDirection: "column" }}>
            {array.map(item => {

              const project = item.name
              const count = item.value

              console.log("count...", count)
              console.log("project...", project)

              if (!(item.value == 0)) {

                return (
                  <View style={{ marginTop: 2, flexDirection: "column", alignSelf: "center", borderWidth: 0 }}>
                    <View style={{ flexDirection: "row", margin: 0 }}>
                      <View style={{ marginRight: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 230, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text style={{ fontWeight: "normal" }}>{project}</Text>
                      </View>

                      <View style={{ marginLeft: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 80, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                        <Text
                          onPress={() => {
                            // setProject(project)
                            var dataArr = []
                            props?.data?.data?.rows?.map(agentItem => {

                              if (agentItem.assignedAgentDetails.firstName + " " + agentItem.assignedAgentDetails.lastName == item.name) {
                                dataArr.push(agentItem)
                              }
                            })

                            dialogHeading = "Agent wise Open Helpdesk"
                            setHelpdeskDialogData(dataArr)
                            setHelpdeskDetDialogVisible(true)
                          }}
                          style={{ alignSelf: "center", ontWeight: "normal" }}>{count}</Text>
                      </View>
                    </View>
                  </View>
                );

              }
            })}
          </View>
          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

  const RenderHelpdeskBySeverity2 = (props) => {

    var oCountArr = [], oStatusArr = []

    props?.data?.data?.forEach(item => {
      console.log("oCnt...", item.oCnt)
      console.log("oStatus...", item.oStatus)
      oCountArr.push(item.oCnt)
      oStatusArr.push(item.oStatus)
    })

    var valuesArr = [
      {
        data: oCountArr,
        strokeWidth: 2,
        color: (opacity = 1) => "#F4D03F"
      }
    ]

    const data = {
      labels: oStatusArr,
      data: oCountArr
    };

    if ((oStatusArr.length > 0) && (oCountArr.length > 0)) {


      return (
        <>
          <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
            <ClearSpace />
            <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk By Severity</Text>
            <ClearSpace />
            <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
            <ClearSpace size={4} />

            <View>

              <ProgressChart
                data={data}
                width={width - 15}
                height={220}
                chartConfig={{
                  //backgroundColor: '#478438',
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  //decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(76, 90, 129, ${opacity})`,
                }}
                style={{
                  borderRadius: 15,
                }}

              // hideLegend={false}
              />
            </View>

            {/* <LineChart
              data={{
                labels: oStatusArr,
                datasets: [{
                  data: oCountArr,
                  strokeWidth: 2,
                  color: (opacity = 1) => "#F4D03F"
                }]
              }}
              width={Dimensions.get('window').width - 30}
              height={220}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            /> */}
            <ClearSpace size={4} />
          </Card>
        </>
      );
    }
  };

  // ---------------------------------------Helpdesk methods end-----------------------------------------------------------------

  var fromDate = "", toDate = ""
  var currDate = new Date();

  var meTextWeight = 200
  var meTxtColor = "#000000"
  var meBgColor = "#EAEDED"
  if (selectedTab0 == "ME") {
    meTextWeight = 800
    meTxtColor = "#FFFFFF"
    meBgColor = "#21618C"
  } else {
    meTextWeight = 200
    meTxtColor = "#000000"
    meBgColor = "#EAEDED"
  }

  var myTeamTextWeight = 200
  var myTeamTxtColor = "#000000"
  var myTeamBgColor = "#EAEDED"
  if (selectedTab0 == "MY_TEAM") {
    myTeamTextWeight = 800
    myTeamTxtColor = "#FFFFFF"
    myTeamBgColor = "#21618C"
  } else {
    myTeamTextWeight = 200
    myTeamTxtColor = "#000000"
    myTeamBgColor = "#EAEDED"
  }

  var intTextWeight = 200
  var intTxtColor = "#000000"
  var intBgColor = "#EAEDED"
  if (selectedTab1 == "INTXN") {
    intTextWeight = 800
    intTxtColor = "#FFFFFF"
    intBgColor = "#21618C"
  } else {
    intTextWeight = 200
    intTxtColor = "#000000"
    intBgColor = "#EAEDED"
  }

  var infTextWeight = 200
  var infTxtColor = "#000000"
  var infBgColor = "#EAEDED"
  if (selectedTab1 == "INFO") {
    infTextWeight = 800
    infTxtColor = "#FFFFFF"
    infBgColor = "#21618C"
  } else {
    infTextWeight = 200
    infTxtColor = "#000000"
    infBgColor = "#EAEDED"
  }

  var atmTextWeight = 200
  var atmTxtColor = "#000000"
  var atmBgColor = "#EAEDED"
  if (selectedTab2 == "ASGN_TO_ME") {
    atmTextWeight = 800
    atmTxtColor = "#FFFFFF"
    atmBgColor = "#21618C"
  } else {
    atmTextWeight = 200
    atmTxtColor = "#000000"
    atmBgColor = "#EAEDED"
  }

  var uaTextWeight = 200
  var uaTxtColor = "#000000"
  var uaBgColor = "#EAEDED"
  if (selectedTab2 == "UPC_APP") {
    uaTextWeight = 800
    uaTxtColor = "#FFFFFF"
    uaBgColor = "#21618C"
  } else {
    uaTextWeight = 200
    uaTxtColor = "#000000"
    uaBgColor = "#EAEDED"
  }

  var piTextWeight = 200
  var piTxtColor = "#000000"
  var piBgColor = "#EAEDED"
  if (selectedTab2 == "POOL_INTXN") {
    piTextWeight = 800
    piTxtColor = "#FFFFFF"
    piBgColor = "#21618C"
  } else {
    piTextWeight = 200
    piTxtColor = "#000000"
    piBgColor = "#EAEDED"
  }

  var aiTextWeight = 200
  var aiTxtColor = "#000000"
  var aiBgColor = "#EAEDED"
  if (selectedTab2 == "ASGN_INTXN") {
    aiTextWeight = 800
    aiTxtColor = "#FFFFFF"
    aiBgColor = "#21618C"
  } else {
    aiTextWeight = 200
    aiTxtColor = "#000000"
    aiBgColor = "#EAEDED"
  }

  var tiTextWeight = 200
  var tiTxtColor = "#000000"
  var tiBgColor = "#EAEDED"
  if (selectedTab3 == "TOT_INTXN") {
    tiTextWeight = 800
    tiTxtColor = "#FFFFFF"
    tiBgColor = "#21618C"
  } else {
    tiTextWeight = 200
    tiTxtColor = "#000000"
    tiBgColor = "#EAEDED"
  }

  var zeroThreeTextWeight = 200
  var zeroThreeTxtColor = "#000000"
  var zeroThreeBgColor = "#EAEDED"
  if (selectedTab3 == "0_3_D") {
    zeroThreeTextWeight = 800
    zeroThreeTxtColor = "#FFFFFF"
    zeroThreeBgColor = "#21618C"
  } else {
    zeroThreeTextWeight = 200
    zeroThreeTxtColor = "#000000"
    zeroThreeBgColor = "#EAEDED"
  }

  var threeFiveTextWeight = 200
  var threeFiveTxtColor = "#000000"
  var threeFiveBgColor = "#EAEDED"
  if (selectedTab3 == "3_5_D") {
    threeFiveTextWeight = 800
    threeFiveTxtColor = "#FFFFFF"
    threeFiveBgColor = "#21618C"
  } else {
    threeFiveTextWeight = 200
    threeFiveTxtColor = "#000000"
    threeFiveBgColor = "#EAEDED"
  }

  var moreFiveTextWeight = 200
  var moreFiveTxtColor = "#000000"
  var moreFiveBgColor = "#EAEDED"
  if (selectedTab3 == "MORE_5_D") {
    moreFiveTextWeight = 800
    moreFiveTxtColor = "#FFFFFF"
    moreFiveBgColor = "#21618C"
  } else {
    moreFiveTextWeight = 200
    moreFiveTxtColor = "#000000"
    moreFiveBgColor = "#EAEDED"
  }

  var acTextWeight = 200
  var acTxtColor = "#000000"
  var acBgColor = "#EAEDED"
  if (selectedTab4 == "AUD_CNF") {
    acTextWeight = 800
    acTxtColor = "#FFFFFF"
    acBgColor = "#21618C"
  } else {
    acTextWeight = 200
    acTxtColor = "#000000"
    acBgColor = "#EAEDED"
  }

  var vcTextWeight = 200
  var vcTxtColor = "#000000"
  var vcBgColor = "#EAEDED"
  if (selectedTab4 == "VID_CNF") {
    vcTextWeight = 800
    vcTxtColor = "#FFFFFF"
    vcBgColor = "#21618C"
  } else {
    vcTextWeight = 200
    vcTxtColor = "#000000"
    vcBgColor = "#EAEDED"
  }

  var cvTextWeight = 200
  var cvTxtColor = "#000000"
  var cvBgColor = "#EAEDED"
  if (selectedTab4 == "CUST_VISIT") {
    cvTextWeight = 800
    cvTxtColor = "#FFFFFF"
    cvBgColor = "#21618C"
  } else {
    cvTextWeight = 200
    cvTxtColor = "#000000"
    cvBgColor = "#EAEDED"
  }

  var bvTextWeight = 200
  var bvTxtColor = "#000000"
  var bvBgColor = "#EAEDED"
  if (selectedTab4 == "BUS_VISIT") {
    bvTextWeight = 800
    bvTxtColor = "#FFFFFF"
    bvBgColor = "#21618C"
  } else {
    bvTextWeight = 200
    bvTxtColor = "#000000"
    bvBgColor = "#EAEDED"
  }


  // Appointment dashboard tabs
  var intAppTextWeight = 200
  var intAppTxtColor = "#000000"
  var intAppBgColor = "#EAEDED"
  if (selectedAppTab1 == "INTXN") {
    intAppTextWeight = 800
    intAppTxtColor = "#FFFFFF"
    intAppBgColor = "#21618C"
  } else {
    intAppTextWeight = 200
    intAppTxtColor = "#000000"
    intAppBgColor = "#EAEDED"
  }

  var infAppTextWeight = 200
  var infAppTxtColor = "#000000"
  var infAppBgColor = "#EAEDED"
  if (selectedAppTab1 == "INFO") {
    infAppTextWeight = 800
    infAppTxtColor = "#FFFFFF"
    infAppBgColor = "#21618C"
  } else {
    infAppTextWeight = 200
    infAppTxtColor = "#000000"
    infAppBgColor = "#EAEDED"
  }

  var appOverviewTextWeight = 200
  var appOverviewTxtColor = "#000000"
  var appOverviewBgColor = "#EAEDED"
  if (showOverallAppointments) {
    appOverviewTextWeight = 800
    appOverviewTxtColor = "#FFFFFF"
    appOverviewBgColor = "#21618C"
  } else {
    appOverviewTextWeight = 200
    appOverviewTxtColor = "#000000"
    appOverviewBgColor = "#EAEDED"
  }

  var appCalendarTextWeight = 200
  var appCalendarTxtColor = "#000000"
  var appCalendarBgColor = "#EAEDED"
  if (showCalendarAppointments) {
    appCalendarTextWeight = 800
    appCalendarTxtColor = "#FFFFFF"
    appCalendarBgColor = "#21618C"
  } else {
    appCalendarTextWeight = 200
    appCalendarTxtColor = "#000000"
    appCalendarBgColor = "#EAEDED"
  }

  var appUpcomingTextWeight = 200
  var appUpcomingTxtColor = "#000000"
  var appUpcomingBgColor = "#EAEDED"
  if (showUpcomingAppointments) {
    appUpcomingTextWeight = 800
    appUpcomingTxtColor = "#FFFFFF"
    appUpcomingBgColor = "#21618C"
  } else {
    appUpcomingTextWeight = 200
    appUpcomingTxtColor = "#000000"
    appUpcomingBgColor = "#EAEDED"
  }

  var appClosedTextWeight = 200
  var appClosedTxtColor = "#000000"
  var appClosedBgColor = "#EAEDED"
  if (showClosedAppointments) {
    appClosedTextWeight = 800
    appClosedTxtColor = "#FFFFFF"
    appClosedBgColor = "#21618C"
  } else {
    appClosedTextWeight = 200
    appClosedTxtColor = "#000000"
    appClosedBgColor = "#EAEDED"
  }

  var infoOverallTextWeight = 200
  var infoOverallTxtColor = "#000000"
  var infoOverallBgColor = "#EAEDED"
  if (showOverallInfoApp) {
    infoOverallTextWeight = 800
    infoOverallTxtColor = "#FFFFFF"
    infoOverallBgColor = "#21618C"
  } else {
    infoOverallTextWeight = 200
    infoOverallTxtColor = "#000000"
    infoOverallBgColor = "#EAEDED"
  }

  var infoBasedAppTypeTextWeight = 200
  var infoBasedAppTypeTxtColor = "#000000"
  var infoBasedAppTypeBgColor = "#EAEDED"
  if (showBasedAppType) {
    infoBasedAppTypeTextWeight = 800
    infoBasedAppTypeTxtColor = "#FFFFFF"
    infoBasedAppTypeBgColor = "#21618C"
  } else {
    infoBasedAppTypeTextWeight = 200
    infoBasedAppTypeTxtColor = "#000000"
    infoBasedAppTypeBgColor = "#EAEDED"
  }

  var infoBasedLocHistoryTextWeight = 200
  var infoBasedLocHistoryTxtColor = "#000000"
  var infoBasedLocHistoryBgColor = "#EAEDED"
  if (showBasedLocHistory) {
    infoBasedLocHistoryTextWeight = 800
    infoBasedLocHistoryTxtColor = "#FFFFFF"
    infoBasedLocHistoryBgColor = "#21618C"
  } else {
    infoBasedLocHistoryTextWeight = 200
    infoBasedLocHistoryTxtColor = "#000000"
    infoBasedLocHistoryBgColor = "#EAEDED"
  }

  return (
    <View style={styles.container}>

      {loader && <LoadingAnimation />}
      {openDashboardPopUp && (<ShowDashboardDialog />)}
      {helpdeskDetDialogVisible && (<ShowHelpdeskDetailsDialog />)}
      {intxnDetDialogVisible && (<ShowInteractionDetailsDialog />)}
      {helpdeskFilterDialogVisible && (<ShowHelpdeskFiltersDialog />)}
      {intxnFilterDialogVisible && (<ShowIntxnFiltersDialog />)}
      {operationalFilterDialogVisible && (<ShowOperationalFiltersDialog />)}

      {!showOperationalDashboard && !showAppointmentDashboard && (
        <Pressable
          onPress={() => {
            if (showHelpdeskDashboard) {
              setHelpdeskLiveStream(!helpdeskLiveStream)
            }

            if (showInteractionDashboard) {
              setInteractionLiveStream(!interactionLiveStream)
            }
          }}
          style={{
            position: "absolute",
            marginRight: 5,
            marginBottom: 120,
            bottom: height * 0.1,
            right: 20,
            flex: 1,
            elevation: 999,
            zIndex: 99999999,
            backgroundColor: "#9C8FC4",
            height: 50, //any of height
            width: 50, //any of width
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderRadius: 22   // it will be height/2
          }}
        >
          <Icon
            name="dip-switch"
            size={35}
            color={"#FFF"}
          />
        </Pressable>
      )}

      <Pressable
        onPress={() => {
          if (showHelpdeskDashboard) {
            if (helpdeskFilterDialogVisible) {
              setHelpdeskFilterDialogVisible(false)
            } else {
              setHelpdeskFilterDialogVisible(true)
            }
          }

          if (showInteractionDashboard) {
            if (intxnFilterDialogVisible) {
              setIntxnFilterDialogVisible(false)
            } else {
              setIntxnFilterDialogVisible(true)
            }
          }

          if (showOperationalDashboard) {
            if (operationalFilterDialogVisible) {
              setOperationalFilterDialogVisible(false)
            } else {
              setOperationalFilterDialogVisible(true)
            }
          }

        }}
        style={{
          position: "absolute",
          marginRight: 5,
          marginBottom: 60,
          bottom: height * 0.1,
          right: 20,
          flex: 1,
          elevation: 999,
          zIndex: 99999999,
          backgroundColor: "#9C8FC4",
          height: 50, //any of height
          width: 50, //any of width
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderRadius: 22   // it will be height/2
        }}
      >
        <Icon
          name="filter"
          size={35}
          color={"#FFF"}
        />
      </Pressable>

      <Pressable
        onPress={() => {
          if (openDashboardPopUp) {
            setOpenDashboardPopUp(false)
          } else {
            setOpenDashboardPopUp(true)
          }
        }}
        style={{
          position: "absolute",
          marginRight: 5,
          marginBottom: 0,
          bottom: height * 0.1,
          right: 20,
          flex: 1,
          elevation: 999,
          zIndex: 99999999,
          backgroundColor: "#9C8FC4",
          height: 50, //any of height
          width: 50, //any of width
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderRadius: 22   // it will be height/2
        }}
      >
        <Icon
          name="home-switch"
          size={35}
          color={"#FFF"}
        />
      </Pressable>

      {showOperationalDashboard && (
        <>
          <View style={{
            flex: 1, paddingTop: 0, paddingBottom: 0, margin: 3,
            borderRadius: 0, elevation: 10,
            borderWidth: 0, alignSelf: "center",
            position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
            zIndex: 99999999999999, flexDirection: "row"
          }}>
            <ScrollView style={{ backgroundColor: color.BCAE_OFF_WHITE }} horizontal={true}>
              <View style={{ alignSelf: "center", width: width - 0, flexDirection: "row" }}>
                <View style={{ width: (width / 4) - 5, backgroundColor: meBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 0, marginRight: 0, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: meTxtColor, alignSelf: "center", fontWeight: meTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      unstable_batchedUpdates(() => {
                        setShowAssignedToMe(true)
                        setShowAppointments(false)
                        setShowPooledInteractions(false)
                        setShowAssignedInteractions(false)
                        setSelectedTab2("ASGN_TO_ME")
                        setSelectedTab0("ME")
                      })
                    }}>Me</Text>
                </View>

                <View style={{ width: (width / 4) - 5, backgroundColor: myTeamBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: myTeamTxtColor, alignSelf: "center", fontWeight: myTeamTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      unstable_batchedUpdates(() => {
                        setShowAssignedToMe(false)
                        setShowAppointments(true)
                        setShowPooledInteractions(false)
                        setShowAssignedInteractions(false)
                        setSelectedTab2("UPC_APP")
                        setSelectedTab0("MY_TEAM")
                      })
                    }}>My Team</Text>
                </View>

                <View style={{ width: (width / 4) - 5, backgroundColor: intBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: intTxtColor, alignSelf: "center", fontWeight: intTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      setSelectedTab1("INTXN")
                    }}>Interactive</Text>
                </View>

                <View style={{ width: (width / 3) - 20, backgroundColor: infBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: infTxtColor, alignSelf: "center", fontWeight: infTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      unstable_batchedUpdates(() => {
                        setShowAssignedToMe(false)
                        setShowAppointments(false)
                        setShowPooledInteractions(false)
                        setShowAssignedInteractions(false)
                        setSelectedTab1("INFO")
                      })
                    }}>Informative</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}

      {showOperationalDashboard && (
        selectedTab1 == "INTXN" && (
          <>
            <View style={{
              flex: 1, paddingTop: 0, paddingBottom: 0,
              borderRadius: 0, elevation: 10, marginRight: 3, marginLeft: 3,
              marginTop: 43, borderWidth: 0, alignSelf: "center",
              position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
              opacity: 1, zIndex: 99999999999999, flexDirection: "row"
            }}>
              {/* <View style={{ top: 1, zIndex: 99999999999999, position: "absolute", backgroundColor: "#FFF", marginTop: 5, marginBottom: 5, flexDirection: "row" }}> */}
              <ScrollView style={{ backgroundColor: color.BCAE_OFF_WHITE }} horizontal={true}>
                {selectedTab0 == "ME" && (
                  <View style={{ backgroundColor: atmBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 0, marginRight: 0, marginTop: 2, marginBottom: 2 }}>
                    <Text style={{ color: atmTxtColor, alignSelf: "center", fontWeight: atmTextWeight, fontSize: 12 }}
                      onPress={async () => {
                        let assignedToMeParams = {
                          "userId": await getUserId(),
                          "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
                          "entityType": "all",
                          "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
                          "limit": 500,
                          "page": 0
                        }
                        await dispatch(await getOperationalAssignedToMe(assignedToMeParams))
                        console.log("getOperationalAssignedToMe result UI..", intDashRed?.operationalAssignedToMeData);

                        unstable_batchedUpdates(() => {
                          setShowAssignedToMe(true)
                          setShowAppointments(false)
                          setShowPooledInteractions(false)
                          setShowAssignedInteractions(false)
                          // setAssignToMeData(intDashRed?.operationalAssignedToMeData?.data?.rows)
                          setSelectedTab2("ASGN_TO_ME")
                        })
                      }}>Assigned To Me</Text>
                  </View>
                )}

                <View style={{ backgroundColor: uaBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: uaTxtColor, alignSelf: "center", fontWeight: uaTextWeight, fontSize: 12 }}
                    onPress={() => {
                      unstable_batchedUpdates(() => {
                        setShowAssignedToMe(false)
                        setShowAppointments(true)
                        setShowPooledInteractions(false)
                        setShowAssignedInteractions(false)
                        setAppointmentsData(intDashRed?.operationalAppointmentOverviewData?.data)
                        setSelectedTab2("UPC_APP")
                      })
                    }}>Upcoming Appointments</Text>
                </View>

                <View style={{ backgroundColor: piBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: piTxtColor, alignSelf: "center", fontWeight: piTextWeight, fontSize: 12 }}
                    onPress={() => {
                      unstable_batchedUpdates(() => {
                        setShowAssignedToMe(false)
                        setShowAppointments(false)
                        setShowPooledInteractions(true)
                        setShowAssignedInteractions(false)
                        setSelectedTab2("POOL_INTXN")
                      })
                    }}>Pooled Interactions</Text>
                </View>

                <View style={{ backgroundColor: aiBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: aiTxtColor, alignSelf: "center", fontWeight: aiTextWeight, fontSize: 12 }}
                    onPress={() => {
                      unstable_batchedUpdates(() => {
                        setShowAssignedToMe(false)
                        setShowAppointments(false)
                        setShowPooledInteractions(false)
                        setShowAssignedInteractions(true)
                        setSelectedTab2("ASGN_INTXN")
                      })
                    }}>Assigned Interactions</Text>
                </View>

              </ScrollView>
            </View>
          </>
        ))}


      {showOperationalDashboard &&
        selectedTab1 == "INTXN" &&
        selectedTab2 == "ASGN_TO_ME" &&
        showAssignedToMe && (
          <>
            <View style={{
              flex: 1, paddingTop: 0, paddingBottom: 0, marginTop: 83,
              borderRadius: 0, elevation: 10, marginRight: 3, marginLeft: 3,
              borderWidth: 0, alignSelf: "center",
              position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
              opacity: 1, zIndex: 99999999999999, flexDirection: "row"
            }}>
              {/* <View style={{ top: 1, zIndex: 99999999999999, position: "absolute", backgroundColor: "#FFF", marginTop: 5, marginBottom: 5, flexDirection: "row" }}> */}
              <ScrollView style={{ backgroundColor: color.BCAE_OFF_WHITE }} horizontal={true}>

                <View style={{ backgroundColor: tiBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 0, marginRight: 0, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: tiTxtColor, alignSelf: "center", fontWeight: tiTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      let assignedToMeParams = {
                        "userId": await getUserId(),
                        "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
                        "entityType": "all",
                        "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
                        "limit": 500,
                        "page": 0
                      }
                      await dispatch(await getOperationalAssignedToMe(assignedToMeParams))
                      console.log("getOperationalAssignedToMe result UI A..", intDashRed?.operationalAssignedToMeData);
                      setAssignToMeData(intDashRed?.operationalAssignedToMeData?.data?.rows)
                      setSelectedTab3("TOT_INTXN")
                    }}>Total Interaction</Text>
                </View>

                <View style={{ backgroundColor: zeroThreeBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: zeroThreeTxtColor, alignSelf: "center", fontWeight: zeroThreeTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      var toDate = new Date();
                      fromDate = new Date(new Date().setDate(toDate.getDate() - 3));
                      console.log("fromDate...", fromDate)
                      console.log("toDate...", toDate)
                      let assignedToMeParams = {
                        "userId": await getUserId(),
                        "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
                        "entityType": "all",
                        "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
                        "limit": 500,
                        "page": 0,
                        fromDate: moment(fromDate).format("YYYY-MM-DD"),
                        toDate: moment(toDate).format("YYYY-MM-DD")
                      }
                      await dispatch(await getOperationalAssignedToMe(assignedToMeParams))
                      console.log("getOperationalAssignedToMe result UI B..", intDashRed?.operationalAssignedToMeData);
                      // setAssignToMeData(intDashRed?.operationalAssignedToMeData?.data?.rows)
                      setSelectedTab3("0_3_D")
                    }}>0 to 3 Days</Text>
                </View>

                <View style={{ backgroundColor: threeFiveBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: threeFiveTxtColor, alignSelf: "center", fontWeight: threeFiveTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      toDate = new Date(new Date().setDate(currDate.getDate() - 3));
                      fromDate = new Date(new Date().setDate(currDate.getDate() - 5));
                      console.log("fromDate...", fromDate)
                      console.log("toDate...", toDate)
                      let assignedToMeParams = {
                        "userId": await getUserId(),
                        "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
                        "entityType": "all",
                        "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
                        "limit": 500,
                        "page": 0,
                        fromDate: moment(fromDate).format("YYYY-MM-DD"),
                        toDate: moment(toDate).format("YYYY-MM-DD")
                      }
                      await dispatch(await getOperationalAssignedToMe(assignedToMeParams))
                      console.log("getOperationalAssignedToMe result UI C..", intDashRed?.operationalAssignedToMeData);
                      // setAssignToMeData(intDashRed?.operationalAssignedToMeData?.data?.rows)
                      setSelectedTab3("3_5_D")
                    }}>3 to 5 Days</Text>
                </View>

                <View style={{ backgroundColor: moreFiveBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: moreFiveTxtColor, alignSelf: "center", fontWeight: moreFiveTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      toDate = new Date(new Date().setDate(currDate.getDate() - 5));
                      fromDate = new Date(new Date().setDate(currDate.getDate() - 30));
                      console.log("fromDate...", fromDate)
                      console.log("toDate...", toDate)
                      let assignedToMeParams = {
                        "userId": await getUserId(),
                        "roleId": await getDataFromDB(storageKeys.CURRENT_ROLE_ID),
                        "entityType": "all",
                        "departmentId": await getDataFromDB(storageKeys.CURRENT_DEPT_ID),
                        "limit": 500,
                        "page": 0,
                        toDate: moment(toDate).format("YYYY-MM-DD")
                      }
                      await dispatch(await getOperationalAssignedToMe(assignedToMeParams))
                      console.log("getOperationalAssignedToMe result UI D..", intDashRed?.operationalAssignedToMeData);
                      // setAssignToMeData(intDashRed?.operationalAssignedToMeData?.data?.rows)
                      setSelectedTab3("MORE_5_D")
                    }}>More than 5 Days</Text>
                </View>

              </ScrollView>
            </View>
          </>
        )}

      {showOperationalDashboard &&
        selectedTab1 == "INTXN" &&
        selectedTab2 == "UPC_APP" &&
        showAppointments && (
          <>
            <View style={{
              flex: 1, paddingTop: 0, paddingBottom: 0, marginTop: 80,
              borderRadius: 0, elevation: 10,
              borderWidth: 0, alignSelf: "center",
              position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
              opacity: 1, zIndex: 99999999999999, flexDirection: "row"
            }}>
              {/* <View style={{ top: 1, zIndex: 99999999999999, position: "absolute", backgroundColor: "#FFF", marginTop: 5, marginBottom: 5, flexDirection: "row" }}> */}
              <ScrollView style={{ backgroundColor: color.BCAE_OFF_WHITE }} horizontal={true}>

                <View style={{ backgroundColor: acBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 0, marginRight: 0, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: acTxtColor, alignSelf: "center", fontWeight: acTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      var appointmentDataArr = []
                      intDashRed?.operationalAppointmentOverviewData?.data.map((item, idx) => {
                        if (item.appointModeDesc.code == "AUDIO_CONF") {
                          appointmentDataArr.push(item)
                        }
                      })
                      console.log("aud conf...", appointmentDataArr)
                      setAppointmentsData(appointmentDataArr)
                      setSelectedTab4("AUD_CNF")
                    }}>Audio Conference</Text>
                </View>

                <View style={{ backgroundColor: vcBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: vcTxtColor, alignSelf: "center", fontWeight: vcTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      var appointmentDataArr = []
                      intDashRed?.operationalAppointmentOverviewData?.data.map((item, idx) => {
                        if (item.appointModeDesc.code == "VIDEO_CONF") {
                          appointmentDataArr.push(item)
                        }
                      })
                      console.log("video conf...", appointmentDataArr)
                      setAppointmentsData(appointmentDataArr)
                      setSelectedTab4("VID_CNF")
                    }}>Video Conference</Text>
                </View>

                <View style={{ backgroundColor: cvBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: cvTxtColor, alignSelf: "center", fontWeight: cvTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      var appointmentDataArr = []
                      intDashRed?.operationalAppointmentOverviewData?.data.map((item, idx) => {
                        if (item.appointModeDesc.code == "CUST_VISIT") {
                          appointmentDataArr.push(item)
                        }
                      })
                      console.log("cust visit...", appointmentDataArr)
                      setAppointmentsData(appointmentDataArr)
                      setSelectedTab4("CUST_VISIT")
                    }}>Customer Visit</Text>
                </View>

                <View style={{ backgroundColor: bvBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }}>
                  <Text style={{ color: bvTxtColor, alignSelf: "center", fontWeight: bvTextWeight, fontSize: 12 }}
                    onPress={async () => {
                      var appointmentDataArr = []
                      intDashRed?.operationalAppointmentOverviewData?.data.map((item, idx) => {
                        if (item.appointModeDesc.code == "BUS_VISIT") {
                          appointmentDataArr.push(item)
                        }
                      })
                      console.log("business visit...", appointmentDataArr)
                      setAppointmentsData(appointmentDataArr)
                      setSelectedTab4("BUS_VISIT")
                    }}>Business Visit</Text>
                </View>

              </ScrollView>
            </View>
          </>
        )}

      {showAppointmentDashboard && (
        <View style={{
          flex: 1, paddingTop: 0, paddingBottom: 0, marginTop: 2,
          borderRadius: 0, elevation: 10,
          borderWidth: 0, alignSelf: "center",
          position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
          zIndex: 99999999999999, flexDirection: "row"
        }}>
          {showAppointmentDashboard && (
            <>
              <View style={{
                flex: 1, paddingTop: 0, paddingBottom: 0, marginTop: 0,
                borderRadius: 0, elevation: 10,
                borderWidth: 0, alignSelf: "center",
                position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
                zIndex: 99999999999999, flexDirection: "row"
              }}>
                <ScrollView style={{ backgroundColor: color.BCAE_OFF_WHITE }} horizontal={true}>

                  <View style={{ width: (width / 2) - 5, backgroundColor: intAppBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                    <Text style={{ color: intAppTxtColor, alignSelf: "center", fontWeight: intAppTextWeight, fontSize: 12 }}
                      onPress={async () => {
                        unstable_batchedUpdates(() => {
                          setSelectedAppTab1("INTXN")
                          setShowIntxnAppTab(true)
                          setShowInfoAppTab(false)
                        })
                      }}>Interactive View</Text>
                  </View>

                  <View style={{ width: (width / 2) - 5, backgroundColor: infAppBgColor, borderRadius: 10, elevation: 10, padding: 10, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                    <Text style={{ color: infAppTxtColor, alignSelf: "center", fontWeight: infAppTextWeight, fontSize: 12 }}
                      onPress={async () => {
                        unstable_batchedUpdates(() => {
                          setSelectedAppTab1("INFO")
                          setShowIntxnAppTab(false)
                          setShowInfoAppTab(true)
                        })
                      }}>Informative View</Text>
                  </View>

                </ScrollView>
              </View>
            </>
          )}

          {showAppointmentDashboard && selectedAppTab1 == "INTXN" &&
            showIntxnAppTab && (
              <>
                <View style={{
                  flex: 1, paddingTop: 0, paddingBottom: 0, marginTop: 45,
                  borderRadius: 0, elevation: 10,
                  borderWidth: 0, alignSelf: "center",
                  position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
                  opacity: 1, zIndex: 99999999999999, flexDirection: "row"
                }}>
                  <ScrollView style={{ backgroundColor: color.BCAE_OFF_WHITE }} horizontal={true}>

                    <View style={{ width: width / 4, backgroundColor: appOverviewBgColor, borderRadius: 10, elevation: 10, padding: 0, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                      <Text style={{ marginTop: 10, color: appOverviewTxtColor, alignSelf: "center", fontWeight: appOverviewTextWeight, fontSize: 12 }}
                        onPress={async () => {
                          unstable_batchedUpdates(() => {
                            setShowOverallAppointments(true)
                            setShowUpcomingAppointments(false)
                            setShowClosedAppointments(false)
                            setShowCalendarAppointments(false)
                          })
                        }}>Overview</Text>
                    </View>

                    <View style={{ width: width / 4, backgroundColor: appCalendarBgColor, borderRadius: 10, elevation: 10, padding: 0, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                      <Text style={{ marginTop: 10, color: appCalendarTxtColor, alignSelf: "center", fontWeight: appCalendarTextWeight, fontSize: 12 }}
                        onPress={async () => {
                          unstable_batchedUpdates(() => {
                            setShowOverallAppointments(false)
                            setShowUpcomingAppointments(false)
                            setShowClosedAppointments(false)
                            setShowCalendarAppointments(true)
                          })
                        }}>Calendar</Text>
                    </View>

                    <View style={{ width: width / 4, backgroundColor: appUpcomingBgColor, borderRadius: 10, elevation: 10, padding: 0, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                      <Text style={{ marginTop: 10, color: appUpcomingTxtColor, alignSelf: "center", fontWeight: appUpcomingTextWeight, fontSize: 12 }}
                        onPress={async () => {
                          unstable_batchedUpdates(() => {
                            setShowOverallAppointments(false)
                            setShowUpcomingAppointments(true)
                            setShowClosedAppointments(false)
                            setShowCalendarAppointments(false)
                          })
                        }}>Upcoming</Text>
                    </View>

                    <View style={{ width: width / 4, backgroundColor: appClosedBgColor, borderRadius: 10, elevation: 10, padding: 0, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                      <Text style={{ marginTop: 10, color: appClosedTxtColor, alignSelf: "center", fontWeight: appClosedTextWeight, fontSize: 12 }}
                        onPress={async () => {
                          unstable_batchedUpdates(() => {
                            setShowOverallAppointments(false)
                            setShowClosedAppointments(true)
                            setShowUpcomingAppointments(false)
                            setShowCalendarAppointments(false)
                          })
                        }}>Closed</Text>
                    </View>

                  </ScrollView>
                </View>
              </>
            )}

          {showAppointmentDashboard && selectedAppTab1 == "INFO" &&
            showInfoAppTab && (
              <>
                <View style={{
                  flex: 1, paddingTop: 0, paddingBottom: 0, marginTop: 45,
                  borderRadius: 0, elevation: 10,
                  borderWidth: 0, alignSelf: "center",
                  position: "absolute", top: 1, height: 40, width: width - 0, backgroundColor: color.BCAE_OFF_WHITE,
                  opacity: 1, zIndex: 99999999999999, flexDirection: "row"
                }}>
                  <ScrollView style={{ backgroundColor: color.BCAE_OFF_WHITE }} horizontal={true}>

                    <View style={{ width: width / 3, backgroundColor: infoOverallBgColor, borderRadius: 10, elevation: 10, padding: 0, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                      <Text style={{ marginTop: 10, color: infoOverallTxtColor, alignSelf: "center", fontWeight: infoOverallTextWeight, fontSize: 12 }}
                        onPress={async () => {
                          unstable_batchedUpdates(() => {
                            setShowOverallInfoApp(true)
                            setShowBasedAppType(false)
                            setShowBasedLocHistory(false)
                          })
                        }}>Overview</Text>
                    </View>

                    <View style={{ width: width / 3, backgroundColor: infoBasedAppTypeBgColor, borderRadius: 10, elevation: 10, padding: 0, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                      <Text style={{ marginTop: 10, color: infoBasedAppTypeTxtColor, alignSelf: "center", fontWeight: infoBasedAppTypeTextWeight, fontSize: 12 }}
                        onPress={async () => {
                          unstable_batchedUpdates(() => {
                            setShowOverallInfoApp(false)
                            setShowBasedAppType(true)
                            setShowBasedLocHistory(false)
                          })
                        }}>Type Based</Text>
                    </View>

                    <View style={{ width: width / 3, backgroundColor: infoBasedLocHistoryBgColor, borderRadius: 10, elevation: 10, padding: 0, marginLeft: 2, marginRight: 2, marginTop: 0, marginBottom: 2 }}>
                      <Text style={{ marginTop: 10, color: infoBasedLocHistoryTxtColor, alignSelf: "center", fontWeight: infoBasedLocHistoryTextWeight, fontSize: 12 }}
                        onPress={async () => {
                          unstable_batchedUpdates(() => {
                            setShowOverallInfoApp(false)
                            setShowBasedAppType(false)
                            setShowBasedLocHistory(true)
                          })
                        }}>Location History</Text>
                    </View>

                  </ScrollView>
                </View>
              </>
            )}

        </View>
      )}
      {/* {(!openDashboardPopUp && !helpdeskFilterDialogVisible && !intxnFilterDialogVisible && !helpdeskDetDialogVisible && !intxnDetDialogVisible) && ( */}
      <ScrollView style={{ backgroundColor: Colors.BCAE_OFF_WHITE }}>
        <>
          {showInteractionDashboard && (
            (interactionLiveStream) && (
              <>
                <RenderOverviewLiveData data={intDashRed} />
                {/* <RenderStatusLiveData data={intDashRed} /> */}
                <RenderInteractionByLivePriorityData data={intDashRed} />
                <RenderLiveProjectWiseInteraction data={intDashRed} />
                <RenderLiveAgentWiseInteraction data={intDashRed} />
              </>
            )
          )}

          {showInteractionDashboard && (
            (!interactionLiveStream) && (
              <>
                {/* <RenderLocationWiseData /> */}
                <RenderOverviewData data={intDashRed} />
                <RenderInteractionByAgeingMonthsData data={intDashRed} />
                <RenderMttrResWaitTimeData data={intDashRed} />
                <RenderInteractionByStatusTypeData data={intDashRed} />
                <RenderInteractionByPriorityData data={intDashRed} />
                <RenderTopFiveInteractionCategoryData data={intDashRed} />
                <RenderTopFiveInteractionTypeData data={intDashRed} />
                <RenderTopFiveServiceCategoryData data={intDashRed} />
                <RenderTopFiveServiceTypeData data={intDashRed} />
                <RenderProjectWiseInteraction data={intDashRed} />
                <RenderAgentWiseInteraction data={intDashRed} />
                <RenderCustomerWiseInteraction data={intDashRed} />
                <RenderNpsCsatChampData data={intDashRed} />
                <RenderTopFiveInteractionStatement data={intDashRed} />
                <RenderTopFiveInteractionChannelData data={intDashRed} />
                <RenderDepartmentWiseInteractionData data={intDashRed} />
              </>
            )
          )}

          {showHelpdeskDashboard && (
            (!helpdeskLiveStream) && (
              <>
                <RenderHelpdeskSummaryData data={intDashRed?.helpdeskSummaryData} />
                <RenderMonthlyDailyTrends data={intDashRed?.supportMonthlyTrendData} />
                <RenderSupportTicketPendingData data={intDashRed} />
                <RenderHelpdeskByAgeing data={intDashRed?.helpdeskByAgeingData} />
                <RenderProjectWiseOpenHelpdesk data={intDashRed.helpdeskProjectWiseData} />
                <RenderHelpdeskByStatus data={intDashRed?.helpdeskByStatusData} />
                <RenderHelpdeskBySeverity data={intDashRed?.helpdeskBySeverityData} />
                <RenderHourlyTicketsData data={intDashRed?.hourlyTicketsData} />
                <RenderAgentWiseHelpdesk data={intDashRed?.helpdeskAgentWiseData} />
              </>
            )
          )}

          {showHelpdeskDashboard && (
            (helpdeskLiveStream) && (
              <>
                <RenderHelpdeskProjectWiseDataLive data={intDashRed} />
                <RenderHelpdeskByStatusDataLive data={intDashRed} />
                <RenderHelpdeskByTypeDataLive data={intDashRed} />
                <RenderHelpdeskBySeverityDataLive data={intDashRed} />
              </>
            )
          )}

          {/* <RenderHelpdeskBySeverity2 data={intDashRed?.helpdeskBySeverityData} /> */}

          {console.log("a.....", selectedTab0)}
          {console.log("b.....", selectedTab1)}
          {console.log("c.....", showAssignedToMe)}

          {showOperationalDashboard && selectedTab1 == "INTXN" &&
            selectedTab0 == "ME" && (
              <>
                {showAssignedToMe && (<RenderOperationalAssignedToMeData data={intDashRed?.operationalAssignedToMeData} />)}
                {showAppointments && (<RenderOperationalAppointmentsData data={intDashRed?.operationalAppointmentOverviewData} />)}
                {showPooledInteractions && (<RenderOperationalPooledInteractionsData data={intDashRed?.operationalPooledInteractionsData} />)}
                {showAssignedInteractions && (<RenderOperationalAssignedInteractionsData data={intDashRed?.operationalAssignedInteractionsData} />)}
              </>
            )
          }

          {showOperationalDashboard && selectedTab1 == "INTXN" &&
            selectedTab0 == "MY_TEAM" && (
              <>
                {showAppointments && (<RenderOperationalTeamAppointmentsData data={intDashRed?.operationalTeamAppointmentOverviewData} />)}
                {showPooledInteractions && (<RenderOperationalTeamPooledInteractionsData data={intDashRed?.operationalTeamPooledInteractionsData} />)}
                {showAssignedInteractions && (<RenderOperationalTeamAssignedInteractionsData data={intDashRed?.operationalTeamAssignedInteractionsData} />)}
              </>
            )
          }

          {showOperationalDashboard && selectedTab1 == "INFO" &&
            selectedTab0 == "ME" && (
              <>
                <RenderOperationalInteractionCorner data={intDashRed?.operationalInteractionHistoryGraphData} />
                <RenderOperationalAppointmentsCorner data={intDashRed?.operationalAssignedAppointmentsGraphData} />
                <RenderOperationalTopFiveInteractions data={intDashRed?.operationalIntxnPerformanceGraphData} />
              </>
            )}


          {showOperationalDashboard && selectedTab1 == "INFO" &&
            selectedTab0 == "MY_TEAM" && (
              <>
                <RenderOperationalInteractionCornerTeam data={intDashRed?.operationalInteractionHistoryGraphTeamData} />
                <RenderOperationalAppointmentsCornerTeam data={intDashRed?.operationalTeamAssignedAppointmentsGraphData} />
                <RenderOperationalTopPerformanceActivityTeam data={intDashRed?.operationalTopFivePerformanceData} />
                <RenderOperationalTopCategoryPerformanceTeam data={intDashRed?.operationalTeamCategoryPerformanceData} />
              </>
            )}


          {showAppointmentDashboard && (
            selectedAppTab1 == "INTXN" && (
              <>
                {showOverallAppointments && (<RenderOverallAppointmentsData data={intDashRed} />)}
                {showCalendarAppointments && (<RenderCalendarEventsAppointmentsData data={intDashRed?.appointmentsEventsData} />)}
                {showUpcomingAppointments && (<RenderUpcomingAppointmentsData data={intDashRed?.upcomingAppointmentsData} />)}
                {showClosedAppointments && (<RenderClosedAppointmentsData data={intDashRed?.closedAppointmentsData} />)}
              </>
            )
          )}

          {showAppointmentDashboard && (
            selectedAppTab1 == "INFO" && (
              <>
                {showOverallInfoApp && (<RenderOverallInfoAppointmentsData data={intDashRed} />)}
                {showBasedAppType && (<RenderBasedOnAppType data={intDashRed} />)}
                {/* {showUpcomingAppointments && (<RenderUpcomingAppointmentsData data={intDashRed?.upcomingAppointmentsData} />)} */}
              </>
            )
          )}

          <ClearSpace size={18} />
        </>
      </ScrollView>
      {/* )} */}

    </View >
  );
  // }, [])
};


const RenderFilterData = (props) => {

  const [entFromDate, setFromDate] = useState("");
  const [entToDate, setToDate] = useState("");

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 10, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Filter</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
          <CustomInput
            value={entFromDate}
            caption={"From Date"}
            placeHolder={"Enter From Date"}
            onChangeText={(text) => setFromDate(text)}
          />


          <CustomInput
            value={entToDate}
            caption={"To Date"}
            placeHolder={"Enter To Date"}
            onChangeText={(text) => setToDate(text)}
          />

          <CustomButton label={"Submit"} onPress={() => {
            params = {
              fromDate: entFromDate,
              toDate: entToDate,
              // project,
              type: "COUNT",
              // priority,
              // currUser,
              // status
            }

            // dispatch(getHelpdeskSummary(params))
            // console.log("getHelpdeskSummary result UI2..", appoinmentListRed?.helpdeskSummaryData);

          }

          } />


        </View>

        <ClearSpace />
      </Card>
    </>
  );
};



const RenderMttrResWaitTimeData = (props) => {

  var resolutionTime, mttrTime, waitingTime
  var resolutionCount, mttrCount, waitingCount

  props?.data?.resMttrWaitingData?.data?.rows?.avgResolutionTimeData?.map(item => {
    resolutionTime = item.oAvgResolutionTimeInterval
    resolutionCount = item.oCnt
  })

  props?.data?.resMttrWaitingData?.data?.rows?.mttrData?.map(item => {
    mttrTime = item.oMttr
    mttrCount = item.oCnt
  })

  props?.data?.resMttrWaitingData?.data?.rows?.avgWaitingData?.map(item => {
    waitingTime = item.oAvgChatQueueWaitTimeInterval
    waitingCount = item.oCnt
  })

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
          {/* <Image
            style={{
              height: 25,
              width: 25,
              tintColor: "white",
              transform: [{ rotate: "90deg" }],
            }}
            source={require("../../../Assets/icons/picker_camera.png")} /> */}
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>Avg. Resolution Time</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontWeight: "900" }}>{resolutionTime}</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>per last month</Text>
        </View>

        <ClearSpace size={4} />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        {/* <View style={{ backgroundColor: "transparent", flexDirection: "column" }}> */}
        {/* <Image
            style={{
              height: 25,
              width: 25,
              tintColor: "white",
              transform: [{ rotate: "90deg" }],
            }}
            source={require("../../../Assets/icons/picker_camera.png")} /> */}
        {/* <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>Avg. MTTR</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontWeight: "900" }}>{mttrTime}</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>{mttrCount}</Text>
        </View>

        <ClearSpace size={4} />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} /> */}

        <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
          {/* <Image
            style={{
              height: 25,
              width: 25,
              tintColor: "white",
              transform: [{ rotate: "90deg" }],
            }}
            source={require("../../../Assets/icons/picker_camera.png")} /> */}
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>Avg. Wait Time</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontWeight: "900" }}>{waitingTime}</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>per last month</Text>
        </View>

        <ClearSpace size={4} />
      </Card>
    </>
  );

};


const RenderNpsCsatChampData = (props) => {

  var npsTime, npsCount
  var champTime, champCount

  props?.data?.npsCsatChampData?.data?.rows?.champResponseData?.map(item => {
    champTime = item.oAutomationPercentage
    champCount = item.oDifference
  })

  props?.data?.npsCsatChampData?.data?.rows?.npsResponseData?.map(item => {
    console.log("oNps....", item.oNps)
    console.log("oPercentage....", item.oPercentage)

    npsTime = item.oNps
    npsCount = item.oPercentage
  })


  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>Net Promoter Score - NPS</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontWeight: "900" }}>{npsTime} %</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>per last month</Text>
        </View>

        <ClearSpace size={4} />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        {/* <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>CSAT</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontWeight: "900" }}>90%</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>23</Text>
        </View>

        <ClearSpace size={4} />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} /> */}

        <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>Automation Score By Champ</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontWeight: "900" }}>{champTime} %</Text>
          <Text style={{ alignSelf: "center", padding: 5, color: "#000000" }}>per last month</Text>
        </View>

        <ClearSpace size={4} />
      </Card>
    </>
  );

};








const RenderHelpdeskProjectWiseDataLive = (props) => {

  var dataSetArr = []
  var dateArray = []
  var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

  console.log("status data new...", props?.data?.helpdeskProjectWiseDataLive?.data)

  // --------------------------------------------x axis data-------------------------------------------------

  props?.data?.helpdeskProjectWiseDataLive?.data?.rows?.map(item => {
    dateArray.push(item.createdAt)
  })

  dateArray = dateArray.filter((item,
    index) => dateArray.indexOf(item) === index);

  const sortedDateArray = dateArray.sort(function (dateArray, b) {
    return new Date(dateArray) - new Date(b)
  })
  console.log("sortedDateArray.....", sortedDateArray)

  var formattedDateArr = []
  sortedDateArray.forEach(item => {
    formattedDateArr.push(moment(item).format("hh:mm:ss"))
  })
  console.log("formattedDateArr.....", formattedDateArr)

  // --------------------------------------------x axis data-------------------------------------------------


  // --------------------------------------------y axis data-------------------------------------------------

  const projectCounts = {};
  props?.data?.helpdeskProjectWiseDataLive?.data?.rows?.forEach(item => {
    const description = item.projectDesc?.description;
    if (projectCounts[description]) {
      projectCounts[description]++;
    } else {
      projectCounts[description] = 1;
    }
  });

  const series = Object.keys(projectCounts).map(description => {
    return {
      name: description,
      type: 'line',
      stack: 'Total',
      data: [],
    };
  });

  let projectCount = 0;
  series.forEach(serie => {
    const description = serie.name;
    const data = props?.data?.helpdeskProjectWiseDataLive?.data?.rows.map(item => {
      const createdAt = moment(item.createdAt).format('hh:mm:ss a');
      const descriptionItem = item.projectDesc?.description;
      if (descriptionItem === description) {
        projectCount++;
      } else {
        projectCount = 0;
      }
      return descriptionItem === description ? projectCount : 0;
    });
    serie.data = data;
  });
  console.log("series proj status wise........", series)

  series.forEach((serie, idx) => {
    dataSetArr.push(
      {
        data: serie.data,
        strokeWidth: 2,
        color: (opacity = 1) => colors[idx]
      }
    )
  })

  // --------------------------------------------y axis data-------------------------------------------------

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk by Projects</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <View styles={{ flexDirection: "column" }}>
          {series.map((item, idx) => {
            return (
              <View style={{
                flexDirection: "row",
                width: 300,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: colors[idx]
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}

          {dataSetArr.length > 0 && (
            <LineChart
              data={{
                labels: formattedDateArr,
                datasets: dataSetArr,
              }}
              width={Dimensions.get('window').width - 16}
              height={250}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginLeft: -35,
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />
          )}
        </View>
        <ClearSpace size={4} />
      </Card>
    </>
  );
};


const RenderHelpdeskByStatusDataLive = (props) => {

  var dataSetArr = []
  var dateArray = []
  var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

  console.log("status data new5...", props?.data?.helpdeskByStatusListDataLive?.data)

  // --------------------------------------------x axis data-------------------------------------------------

  props?.data?.helpdeskByStatusListDataLive?.data?.map(item => {
    dateArray.push(item.oCreatedAt)
  })

  dateArray = dateArray.filter((item,
    index) => dateArray.indexOf(item) === index);

  const sortedDateArray = dateArray.sort(function (dateArray, b) {
    return new Date(dateArray) - new Date(b)
  })
  console.log("sortedDateArray.....", sortedDateArray)

  var formattedDateArr = []
  sortedDateArray.forEach(item => {
    formattedDateArr.push(moment(item).format("hh:mm:ss"))
  })
  console.log("formattedDateArr.....", formattedDateArr)

  // --------------------------------------------x axis data-------------------------------------------------


  // --------------------------------------------y axis data-------------------------------------------------

  const projectCounts = {};
  props?.data?.helpdeskByStatusListDataLive?.data?.forEach(item => {
    const description = item.oStatus;
    if (projectCounts[description]) {
      projectCounts[description]++;
    } else {
      projectCounts[description] = 1;
    }
  });

  console.log("projectCounts1....", projectCounts)

  const series = Object.keys(projectCounts).map(description => {
    return {
      name: description,
      type: 'line',
      stack: 'Total',
      data: [],
    };
  });

  let projectCount = 0;
  series.forEach(serie => {
    const description = serie.name;
    const data = props?.data?.helpdeskByStatusListDataLive?.data?.map(item => {
      const createdAt = moment(item.oCreatedAt).format('hh:mm:ss a');
      const descriptionItem = item.oStatus;
      if (descriptionItem === description) {
        projectCount++;
      } else {
        projectCount = 0;
      }
      return descriptionItem === description ? projectCount : 0;
    });
    serie.data = data;
  });
  console.log("series helpdesk status wise........", series)

  series.forEach((serie, idx) => {
    dataSetArr.push(
      {
        data: serie.data,
        strokeWidth: 2,
        color: (opacity = 1) => colors[idx]
      }
    )
  })

  // --------------------------------------------y axis data-------------------------------------------------

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk by Status</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <View styles={{ flexDirection: "column" }}>
          {series.map((item, idx) => {
            return (
              <View style={{
                flexDirection: "row",
                width: 100,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: colors[idx]
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}

          {dataSetArr.length > 0 && (
            <LineChart
              data={{
                labels: formattedDateArr,
                datasets: dataSetArr,
              }}
              width={Dimensions.get('window').width - 16}
              height={250}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginLeft: -35,
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />
          )}
        </View>
        <ClearSpace size={4} />
      </Card>
    </>
  );
};


const RenderHelpdeskByTypeDataLive = (props) => {

  var dataSetArr = []
  var dateArray = []
  var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

  console.log("status data new...", props?.data?.helpdeskByTypeDataLive?.data)

  // --------------------------------------------x axis data-------------------------------------------------

  props?.data?.helpdeskByTypeDataLive?.data?.rows?.map(item => {
    dateArray.push(item.createdAt)
  })

  dateArray = dateArray.filter((item,
    index) => dateArray.indexOf(item) === index);

  const sortedDateArray = dateArray.sort(function (dateArray, b) {
    return new Date(dateArray) - new Date(b)
  })
  console.log("sortedDateArray.....", sortedDateArray)

  var formattedDateArr = []
  sortedDateArray.forEach(item => {
    formattedDateArr.push(moment(item).format("hh:mm:ss"))
  })
  console.log("formattedDateArr.....", formattedDateArr)

  // --------------------------------------------x axis data-------------------------------------------------


  // --------------------------------------------y axis data-------------------------------------------------

  const projectCounts = {};
  props?.data?.helpdeskByTypeDataLive?.data?.rows?.forEach(item => {
    const description = item.projectDesc?.description;
    if (projectCounts[description]) {
      projectCounts[description]++;
    } else {
      projectCounts[description] = 1;
    }
  });

  const series = Object.keys(projectCounts).map(description => {
    return {
      name: description,
      type: 'line',
      stack: 'Total',
      data: [],
    };
  });

  let projectCount = 0;
  series.forEach(serie => {
    const description = serie.name;
    const data = props?.data?.helpdeskByTypeDataLive?.data?.rows.map(item => {
      const createdAt = moment(item.createdAt).format('hh:mm:ss a');
      const descriptionItem = item.projectDesc?.description;
      if (descriptionItem === description) {
        projectCount++;
      } else {
        projectCount = 0;
      }
      return descriptionItem === description ? projectCount : 0;
    });
    serie.data = data;
  });
  console.log("series proj status wise........", series)

  series.forEach((serie, idx) => {
    dataSetArr.push(
      {
        data: serie.data,
        strokeWidth: 2,
        color: (opacity = 1) => colors[idx]
      }
    )
  })

  // --------------------------------------------y axis data-------------------------------------------------

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk by Projects</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <View styles={{ flexDirection: "column" }}>
          {series.map((item, idx) => {
            return (
              <View style={{
                flexDirection: "row",
                width: 300,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: colors[idx]
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}

          {dataSetArr.length > 0 && (
            <LineChart
              data={{
                labels: formattedDateArr,
                datasets: dataSetArr,
              }}
              width={Dimensions.get('window').width - 16}
              height={250}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginLeft: -35,
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />
          )}
        </View>
        <ClearSpace size={4} />
      </Card>
    </>
  );
};



const RenderHelpdeskBySeverityDataLive = (props) => {

  var dataSetArr = []
  var dateArray = []
  var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

  console.log("status data new...", props?.data?.helpdeskBySeverityDataLive?.data)

  // --------------------------------------------x axis data-------------------------------------------------

  props?.data?.helpdeskBySeverityDataLive?.data?.rows?.map(item => {
    dateArray.push(item.createdAt)
  })

  dateArray = dateArray.filter((item,
    index) => dateArray.indexOf(item) === index);

  const sortedDateArray = dateArray.sort(function (dateArray, b) {
    return new Date(dateArray) - new Date(b)
  })
  console.log("sortedDateArray.....", sortedDateArray)

  var formattedDateArr = []
  sortedDateArray.forEach(item => {
    formattedDateArr.push(moment(item).format("hh:mm:ss"))
  })
  console.log("formattedDateArr.....", formattedDateArr)

  // --------------------------------------------x axis data-------------------------------------------------


  // --------------------------------------------y axis data-------------------------------------------------

  const projectCounts = {};
  props?.data?.helpdeskBySeverityDataLive?.data?.rows?.forEach(item => {
    const description = item.projectDesc?.description;
    if (projectCounts[description]) {
      projectCounts[description]++;
    } else {
      projectCounts[description] = 1;
    }
  });

  const series = Object.keys(projectCounts).map(description => {
    return {
      name: description,
      type: 'line',
      stack: 'Total',
      data: [],
    };
  });

  let projectCount = 0;
  series.forEach(serie => {
    const description = serie.name;
    const data = props?.data?.helpdeskBySeverityDataLive?.data?.rows.map(item => {
      const createdAt = moment(item.createdAt).format('hh:mm:ss a');
      const descriptionItem = item.projectDesc?.description;
      if (descriptionItem === description) {
        projectCount++;
      } else {
        projectCount = 0;
      }
      return descriptionItem === description ? projectCount : 0;
    });
    serie.data = data;
  });
  console.log("series proj status wise........", series)

  series.forEach((serie, idx) => {
    dataSetArr.push(
      {
        data: serie.data,
        strokeWidth: 2,
        color: (opacity = 1) => colors[idx]
      }
    )
  })

  // --------------------------------------------y axis data-------------------------------------------------

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk by Severity</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <View styles={{ flexDirection: "column" }}>
          {series.map((item, idx) => {
            return (
              <View style={{
                flexDirection: "row",
                width: 300,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: colors[idx]
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}

          {dataSetArr.length > 0 && (
            <LineChart
              data={{
                labels: formattedDateArr,
                datasets: dataSetArr,
              }}
              width={Dimensions.get('window').width - 16}
              height={250}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginLeft: -35,
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />
          )}
        </View>
        <ClearSpace size={4} />
      </Card>
    </>
  );
};


const RenderOverviewLiveData = (props) => {

  var dataSetArr = []
  var dateArray = []
  var colors = ["#3498DB", "#58D68D", "#F5B041", "#E74C3C", "#8E44AD", "#34495E", "#16A085"]

  console.log("status data new...", props?.data?.interactionsByStatusListDataTwo?.data)

  // --------------------------------------------x axis data-------------------------------------------------

  props?.data?.interactionsByStatusListDataTwo?.data?.rows?.map(item => {
    dateArray.push(item.createdAt)
  })

  dateArray = dateArray.filter((item,
    index) => dateArray.indexOf(item) === index);

  const sortedDateArray = dateArray.sort(function (dateArray, b) {
    return new Date(dateArray) - new Date(b)
  })
  console.log("sortedDateArray.....", sortedDateArray)

  var formattedDateArr = []
  sortedDateArray.forEach(item => {
    formattedDateArr.push(moment(item).format("hh:mm:ss"))
  })
  console.log("formattedDateArr.....", formattedDateArr)

  // --------------------------------------------x axis data-------------------------------------------------


  // --------------------------------------------y axis data-------------------------------------------------

  const projectCounts = {};
  props?.data?.interactionsByStatusListDataTwo?.data?.rows?.forEach(item => {
    const description = item.currStatusDesc?.description;
    if (projectCounts[description]) {
      projectCounts[description]++;
    } else {
      projectCounts[description] = 1;
    }
  });

  const series = Object.keys(projectCounts).map(description => {
    return {
      name: description,
      type: 'line',
      stack: 'Total',
      data: [],
    };
  });

  let projectCount = 0;
  series.forEach(serie => {
    const description = serie.name;
    const data = props?.data?.interactionsByStatusListDataTwo?.data?.rows.map(item => {
      const createdAt = moment(item.createdAt).format('hh:mm:ss a');
      const descriptionItem = item.currStatusDesc?.description;
      if (descriptionItem === description) {
        projectCount++;
      } else {
        projectCount = 0;
      }
      return descriptionItem === description ? projectCount : 0;
    });
    serie.data = data;
  });
  console.log("series proj status wise........", series)

  series.forEach((serie, idx) => {
    dataSetArr.push(
      {
        data: serie.data,
        strokeWidth: 2,
        color: (opacity = 1) => colors[idx]
      }
    )
  })

  // --------------------------------------------y axis data-------------------------------------------------

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Overview</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <View styles={{ flexDirection: "column" }}>
          {series.map((item, idx) => {
            return (
              <View style={{
                flexDirection: "row",
                width: 100,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: colors[idx]
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}

          {dataSetArr.length > 0 && (
            <LineChart
              hidePointsAtIndex={Array.from({ length: formattedDateArr.length }, (v, k) => (k % 2 === 0) ? k : null)}
              data={{
                labels: formattedDateArr,
                datasets: dataSetArr,
              }}
              width={Dimensions.get('window').width - 16}
              height={250}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginLeft: -35,
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />
          )}
        </View>
        <ClearSpace size={4} />
      </Card>
    </>
  );
};



const RenderStatusLiveData = (props) => {

  var dataSetArr = []
  var dateArray = []
  var colors = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#2980B9', '#3498DB', '#16A085',
    '#F4D03F', '#F39C12', '#DC7633', '#5DADE2']

  console.log("status data new2...", props?.data?.interactionsByStatusLiveListData?.data)

  // --------------------------------------------x axis data-------------------------------------------------

  props?.data?.interactionsByStatusLiveListData?.data?.rows?.map(item => {
    dateArray.push(item.oCreatedAt)
  })

  dateArray = dateArray.filter((item,
    index) => dateArray.indexOf(item) === index);

  const sortedDateArray = dateArray.sort(function (dateArray, b) {
    return new Date(dateArray) - new Date(b)
  })
  console.log("sortedDateArray.....", sortedDateArray)

  var formattedDateArr = []
  sortedDateArray.forEach(item => {
    formattedDateArr.push(moment(item).format("hh:mm:ss"))
  })
  console.log("formattedDateArr.....", formattedDateArr)

  // --------------------------------------------x axis data-------------------------------------------------


  // --------------------------------------------y axis data-------------------------------------------------

  const projectCounts = {};
  props?.data?.interactionsByStatusLiveListData?.data?.rows?.forEach(item => {
    const description = item.oStatus;
    if (projectCounts[description]) {
      projectCounts[description]++;
    } else {
      projectCounts[description] = 1;
    }
  });

  const series = Object.keys(projectCounts).map(description => {
    return {
      name: description,
      type: 'line',
      stack: 'Total',
      data: [],
    };
  });

  let projectCount = 0;
  series.forEach(serie => {
    const description = serie.name;
    const data = props?.data?.interactionsByStatusLiveListData?.data?.rows.map(item => {
      const createdAt = moment(item.oCreatedAt).format('hh:mm:ss a');
      const descriptionItem = item.oStatus;
      if (descriptionItem === description) {
        projectCount++;
      } else {
        projectCount = 0;
      }
      return descriptionItem === description ? projectCount : 0;
    });
    serie.data = data;
  });
  console.log("series proj status wise2........", series)

  series.forEach((serie, idx) => {
    dataSetArr.push(
      {
        data: serie.data,
        strokeWidth: 2,
        color: (opacity = 1) => colors[idx]
      }
    )
  })

  // --------------------------------------------y axis data-------------------------------------------------

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Interaction by Status</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <View styles={{ flexDirection: "column" }}>
          {series.map((item, idx) => {
            return (
              <View style={{
                flexDirection: "row",
                width: 100,
                alignSelf: "center",
                marginTop: 10,
                marginBottom: 10
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}>
                  <View style={{
                    marginRight: 2,
                    width: 10, height: 10, borderRadius: 2,
                    backgroundColor: colors[idx]
                  }} />
                  <Text style={{ fontSize: 11 }}>{item.name}</Text>
                </View>
              </View>
            )
          })}

          <LineChart
            hidePointsAtIndex={Array.from({ length: formattedDateArr.length }, (v, k) => (k % 100 === 0) ? k : null)}
            data={{
              labels: formattedDateArr,
              datasets: dataSetArr,
            }}
            width={Dimensions.get('window').width - 16}
            height={250}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginLeft: -35,
              marginVertical: 8,
              borderRadius: 16,
            }}
            verticalLabelRotation={30}
          />
        </View>
        <ClearSpace size={4} />
      </Card>
    </>
  );
};


const RenderTopFiveInteractionCategoryData = (props) => {

  console.log("interaction category data...", props?.data?.interactionByCategoryData)

  var intCatWiseLabels = []
  var intCatWiseValues = []
  props?.data?.interactionByCategoryData?.data?.rows?.map(item => {
    intCatWiseLabels.push(item.oCategoryValue)
    intCatWiseValues.push('' + item.oIntxnCnt)
  })

  console.log("intCategoryWiseLabels data...", intCatWiseLabels)
  console.log("intCategoryWiseValues data...", intCatWiseValues)

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <Text style={{ padding: 5, fontWeight: "900" }}>Top 5 Interaction By Category</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <BarChart
          flatColor={true}
          withCustomBarColorFromData={true}
          yAxisInterval={10} // optional, defaults to 1
          data={{
            labels: intCatWiseLabels,
            datasets: [
              {
                data: intCatWiseValues,
                colors: [
                  () => "green",
                  () => "red",
                  () => "blue",
                  () => "yellow",
                  () => "orange"
                ]
              },
              {
                data: [1] // min
              },
              {
                data: [10] // max
              }
            ],
          }}
          width={Dimensions.get('window').width - 30}
          height={550}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={90}
        />

        <ClearSpace size={4} />
      </Card>
    </>
  );

};



const RenderTopFiveInteractionTypeData = (props) => {

  console.log("interaction type data...", props?.data?.interactionByTypeData)

  var intTypeWiseLabels = []
  var intTypeWiseValues = []
  props?.data?.interactionByTypeData?.data?.rows?.map(item => {
    intTypeWiseLabels.push(item.oCategoryValue)
    intTypeWiseValues.push('' + item.oIntxnCnt)
  })

  console.log("intTypeWiseLabels data...", intTypeWiseLabels)
  console.log("intTypeWiseValues data...", intTypeWiseValues)

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <Text style={{ padding: 5, fontWeight: "900" }}>Top 5 Interaction By Type</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <BarChart
          flatColor={true}
          withCustomBarColorFromData={true}
          data={{
            labels: intTypeWiseLabels,
            datasets: [
              {
                data: intTypeWiseValues,
                colors: [
                  () => "blue",
                  () => "red",
                  () => "green"
                ]
              },
            ],
          }}
          width={Dimensions.get('window').width - 30}
          height={400}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={90}
        />

        <ClearSpace size={4} />
      </Card>
    </>
  );

};



const RenderTopFiveServiceCategoryData = (props) => {

  console.log("service category data...", props?.data?.interactionByServiceCategoryData)

  var serviceCategoryWiseLabels = []
  var serviceCategoryWiseValues = []
  props?.data?.interactionByServiceCategoryData?.data?.rows?.map(item => {
    serviceCategoryWiseLabels.push(item.oCategoryValue)
    serviceCategoryWiseValues.push('' + item.oIntxnCnt)
  })

  console.log("serviceCategoryWiseLabels data...", serviceCategoryWiseLabels)
  console.log("serviceCategoryWiseValues data...", serviceCategoryWiseValues)

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <Text style={{ padding: 5, fontWeight: "900" }}>Top 5 Service Category</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <BarChart
          flatColor={true}
          withCustomBarColorFromData={true}
          data={{
            labels: serviceCategoryWiseLabels,
            datasets: [
              {
                data: serviceCategoryWiseValues,
                colors: [
                  () => "blue",
                  () => "red",
                  () => "green"
                ]
              },
            ],
          }}
          width={Dimensions.get('window').width - 30}
          height={500}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={90}
        />

        <ClearSpace size={4} />
      </Card>
    </>
  );

};



const RenderTopFiveServiceTypeData = (props) => {

  console.log("service type data...", props?.data?.interactionByServiceTypeData)

  var serviceTypeWiseLabels = []
  var serviceTypeWiseValues = []
  props?.data?.interactionByServiceTypeData?.data?.rows?.map(item => {
    serviceTypeWiseLabels.push(item.oCategoryValue)
    serviceTypeWiseValues.push('' + item.oIntxnCnt)
  })

  console.log("serviceTypeWiseLabels data...", serviceTypeWiseLabels)
  console.log("serviceTypeWiseValues data...", serviceTypeWiseValues)

  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <Text style={{ padding: 5, fontWeight: "900" }}>Top 5 Service Type</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <BarChart
          flatColor={true}
          withCustomBarColorFromData={true}
          data={{
            labels: serviceTypeWiseLabels,
            datasets: [
              {
                data: serviceTypeWiseValues,
                colors: [
                  () => "blue",
                  () => "red",
                  () => "green"
                ]
              },
            ],
          }}
          width={Dimensions.get('window').width - 30}
          height={650}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={90}
        />

        <ClearSpace size={4} />
      </Card>
    </>
  );

};











const RenderInteractionByRolesData = (props) => {


  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <Text style={{ padding: 5, fontWeight: "900" }}>Interaction by Roles</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <BarChart
          flatColor={true}
          withCustomBarColorFromData={true}
          data={{
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
            ],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                colors: [
                  () => "blue",
                  () => "red",
                  () => "green"
                ]
              },
            ],
          }}
          width={Dimensions.get('window').width - 30}
          height={650}
          yAxisLabel={''}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={90}
        />

        <ClearSpace size={4} />
      </Card>
    </>
  );

};








const RenderTopFiveInteractionStatement = (props) => {

  var intStatementWiseMap = new Map("", "")

  var series = []
  props?.data?.statementWiseData?.data?.rows?.map(item => {
    intStatementWiseMap.set(item.oCategoryValue, item.oIntxnCnt)
    series.push(item.oIntxnCnt)
  })

  const colorsArr = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#2980B9', '#3498DB', '#16A085',
    '#F4D03F', '#F39C12', '#DC7633', '#5DADE2']
  var colors = []
  series.forEach((item, idx) => {
    colors.push(colorsArr[idx])
  })

  const intStatementWiseArr = Array.from(intStatementWiseMap, ([name, value]) => ({ name, value }));

  console.log("intStatementWiseArr...", intStatementWiseArr)

  var widthAndHeight = 200


  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Top 5 Interaction By Statement</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />



        {series.length > 0 && (
          <PieChart
            style={{ marginTop: 0, alignSelf: "center" }}
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={colors}
            coverRadius={0.5}
            coverFill={'#FFF'}
          />
        )}


        {props?.data?.statementWiseData?.data?.rows?.map((item, idx) => {
          return (
            <View style={{
              width: 300,
              alignSelf: "flex-start",
              marginTop: 20,
              marginLeft: 10
            }}>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}>
                <View style={{
                  marginRight: 2,
                  width: 10, height: 10, borderRadius: 2,
                  backgroundColor: colors[idx]
                }} />
                <Text style={{ marginLeft: 10, fontSize: 11 }}>{item.oCategoryValue + " - " + item.oIntxnCnt}</Text>
              </View>
            </View>
          )
        })}


        {/* <View styles={{ flexDirection: "column" }}>
          {intStatementWiseArr.map(item => {
            const project = item.name
            const count = item.value

            console.log("count...", count)
            console.log("project...", project)

            if (!(item.value == 0)) {
              return (
                <View style={{ marginTop: 2, flexDirection: "column", alignSelf: "center", borderWidth: 0 }}>
                   <View style={{ flexDirection: "row", margin: 0 }}>
                     <View style={{ marginRight: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 230, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                       <Text style={{ fontWeight: "normal" }}>{project}</Text>
                     </View>

                     <View style={{ marginLeft: 1, backgroundColor: color.BCAE_OFF_WHITE, padding: 10, flexDirection: "column", width: 80, marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                       <Text style={{ alignSelf: "center", ontWeight: "normal" }}>{count}</Text>
                     </View>
                   </View>
                </View>
              );
            }
          })}
        </View> */}




        <ClearSpace size={4} />
      </Card>
    </>
  );

};



// const footerModal = () => {


//   return (
//     <>
//       <FooterModel
//         open={showBottomModal}
//         setOpen={setShowBottomModal}
//         title={"Assign To Self"}
//       >
//         <ScrollView contentContainerStyle={{ flex: 1 }} nestedScrollEnabled={true}>




//         </ScrollView>
//       </FooterModel>
//     </>
//   );

// };



const RenderTopFiveInteractionChannelData = (props) => {

  console.log("channel wise data...", props?.data?.channelWiseData)

  // var channelWiseMap = new Map("", "", "")
  // props?.data?.channelWiseData?.data?.rows?.map(item => {
  //   channelWiseMap.set(item.oMonthYear, item.oCategoryValue, item.oIntxnCnt)
  // })

  // const channelWiseArr = Array.from(channelWiseMap, ([month, channel, count]) => ({ month, channel, count }));
  // console.log("channelWiseArr...", channelWiseArr)

  const xAxisData = [...new Set(props?.data?.channelWiseData?.data?.rows?.map(item => item.oMonthYear))];
  const category = [...new Set(props?.data?.channelWiseData?.data?.rows?.map(item => item.oCategoryValue))];
  const series = xAxisData?.map(xAxisData => {
    const respData = category?.map(category => {
      const matchingItem = props?.data?.channelWiseData?.data?.rows?.find(item => item.oCategoryValue === category && item.oMonthYear === xAxisData);
      return matchingItem ? Number(matchingItem.oIntxnCnt) : 0;
    });
    return respData
  })


  console.log("xAxisData...", xAxisData)
  console.log("statuses...", category)
  console.log("series...", series)

  const data = {
    labels: xAxisData,
    legend: category,
    data: series,
    barColors: ["#3498DB", "#58D68D", "#F5B041"]
  };


  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>

        <Text style={{ padding: 5, fontWeight: "900" }}>Top 5 Interaction by Channel</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />


        < StackedBarChart
          data={data}
          width={300}
          height={350}
          strokeWidth={16}
          radius={20}
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#218838"
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          hideLegend={false}
          verticalLabelRotation={90}
        />


        <ClearSpace size={4} />
      </Card>
    </>
  );

};







// const RenderLocationWiseData = (props) => {

//   const dataSource = {
//     chart: {
//       caption: "Skill Analysis of Harry",
//       subcaption: "Scale: 1 (low) to 5 (high)",
//       theme: "candy",
//       showlegend: "0",
//       showdivlinevalues: "0",
//       showlimits: "0",
//       showvalues: "1",
//       plotfillalpha: "40",
//       plottooltext: "Harry's <b>$label</b> skill is rated as <b>$value</b>"
//     },
//     categories: [
//       {
//         category: [
//           {
//             label: "Communication"
//           },
//           {
//             label: "Punctuality"
//           },
//           {
//             label: "Problem Solving"
//           },
//           {
//             label: "Meeting Deadlines"
//           },
//           {
//             label: "Team Player"
//           },
//           {
//             label: "Technical Knowledge"
//           }
//         ]
//       }
//     ],
//     dataset: [
//       {
//         seriesname: "User Ratings",
//         data: [
//           {
//             value: "3"
//           },
//           {
//             value: "3"
//           },
//           {
//             value: "4"
//           },
//           {
//             value: "3"
//           },
//           {
//             value: "2"
//           },
//           {
//             value: "4"
//           }
//         ]
//       }
//     ]
//   }


//   return (
//     <View style={styles.locChartContainer}>
//       <Text style={styles.heading}>
//         FusionCharts Integration with React Native
//       </Text>
//       <View style={styles.chartContainer}>
//         <FusionCharts
//           type={this.state.type}
//           width={this.state.width}
//           height={this.state.height}
//           dataFormat={this.state.dataFormat}
//           dataSource={this.state.dataSource}
//           // libraryPath={this.libraryPath} // set the libraryPath property
//           libraryPath={{ uri: 'file:///android_asset/fusioncharts.html' }}
//         />
//       </View>
//     </View>
//   );
// }

// const renderItem = ({ item }) => (
//   <Pressable
//     style={{
//       borderRadius: 6,
//       borderWidth: 0,
//       borderColor: "#AEB3BE",
//       padding: 0,
//       marginTop: 15,
//       marginLeft: 15,
//       marginRight: 15,
//       justifyContent: "center",
//       alignItems: "center",
//     }}

//     onPress={() => { }}
//   >
//     <Item body={item} />
//   </Pressable>
// );


// return (
//   <View style={{ flex: 1, marginTop: 50, marginLeft: 15, marginRight: 15 }}>
//     <FlatList
//       contentContainerStyle={{
//         flexGrow: 1,
//       }}
//       data={interactionReducer.interactionSearchData}
//       renderItem={renderItem}
//       keyExtractor={item => item}
//     />
//   </View>
// );



// const Item = ({ body }) => {
//   return (

//     <View style={{
//       flexDirection: "column",
//       margin: 5,
//       padding: 10,
//       backgroundColor: "#FFF",
//       borderRadius: 10,
//       elevation: 5,
//     }}>

//       <View style={{ flexDirection: "coloumn", margin: 5 }}>
//         <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
//           <Text style={{ fontWeight: "normal" }}>Interaction id value</Text>
//           <Text style={{ fontWeight: "bold" }}>Customer name</Text>
//           <Text style={{ fontWeight: "normal" }}>Interaction id value</Text>
//           <Text style={{ fontWeight: "bold" }}>Created by label</Text>
//           <Text style={{ fontWeight: "normal" }}>Created by value</Text>
//         </View>
//       </View>

//     </View>

//   );
// }


const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

const navBar = StyleSheet.create({
  navRightCon: {
    flexDirection: "row",
    marginRight: 15
  },
  divider: {
    width: 10,
    height: 1,
  },
  roundIcon: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    borderWidth: 0.5,
    borderColor: "#fff",
  },
  roundIconColored: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 26,
    borderWidth: 0.5,
    borderColor: "#fff",
    marginRight: 12,
  },
});


const styles = StyleSheet.create({
  locChartContainer: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  chartContainer: {
    height: 200
  },

  container: {
    flex: 1,
    backgroundColor: Colors.BCAE_OFF_WHITE,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  signature: {
    width: 400,
    height: 300,
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },

  // container: {
  //   flex: 1,
  // },
  bottomView: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: -20, //Here is the trick
  },
  disabledText: {
    color: "grey",
  },
  defaultText: {
    color: "#000000",
  },
  customDay: {
    textAlign: "center",
  },
  floatingImg: {
    width: "10%",
    position: "absolute",
    right: 0,
    marginRight: 10,
  },


  guageChartcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
  screen: {
    marginTop: 30,
  },
  row: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  rowText: {
    fontSize: 18,
  },
  roundshape: {
    backgroundColor: 'lightgreen',
    height: 44, //any of height
    width: 44, //any of width
    justifyContent: "center",
    borderRadius: 22   // it will be height/2
  }
});
