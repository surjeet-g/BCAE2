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
import { Card, Dialog, Divider, PaperProvider, Portal, Text, TextInput } from "react-native-paper";
import PieChart from "react-native-pie-chart";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { CustomDropDownFullWidth } from "../../Components/CustomDropDownFullWidth";
import { CustomInput } from "../../Components/CustomInput";
import {
  getChannelWise,
  getCustomerWise,
  getDepartmentInteractions,
  getDepartmentVsRolesInteractions,
  getHelpdeskAgentWise,
  getHelpdeskByAgeing,
  getHelpdeskBySeverity,
  getHelpdeskBySeverityLive,
  getHelpdeskByStatus,
  getHelpdeskByStatusList,
  getHelpdeskByStatusListLive,
  getHelpdeskByTypeLive,
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
  getResMttrWaiting,
  getStatementWise,
  getStatusWiseCount,
  getSupportTtkPending
} from "../../Redux/AppointmentDashboardDispatcher";
import { strings } from "../../Utilities/Language";



var { height, width } = Dimensions.get("screen");
var dispatch = {}
var intDashRed
var filterParams = {}
var dialogHeading


export const UserHomeScreen = (props) => {

  console.log("UserHomeScreen rendering..");

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

  const [showHelpdeskDashboard, setShowHelpdeskDashboard] = useState(true);
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

  const [openFromDatePicker, setOpenFromDatePicker] = useState(false);
  const [openToDatePicker, setOpenToDatePicker] = useState(false);
  const [selFromDate, setSelFromDate] = useState(new Date());
  const [selToDate, setSelToDate] = useState(new Date());

  const [helpdeskLiveStream, setHelpdeskLiveStream] = useState(false);
  const [interactionLiveStream, setInteractionLiveStream] = useState(false);

  const [priorityStatusData, setPriorityStatusWiseData] = useState([]);

  intDashRed = useSelector((state) => state.dashboardAppointments);


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


    // ---------------------------------------------Helpdesk methods-------------------------------------------------------------

    getHelpdeskSummary,
    getHelpdeskSummaryClarification,
    getSupportTtkPending,
    getMonthlyTrend,
    getHelpdeskByStatus,
    getHelpdeskByAgeing,
    getHelpdeskBySeverity,
    getHelpdeskProjectWise,
    getHelpdeskAgentWise,
    getHelpdeskByStatusListLive,
    getHelpdeskProjectWiseLive

    // ---------------------------------------------Helpdesk methods-------------------------------------------------------------

  ]);



  useEffect(async () => {
    console.log("helpdeskFilterOn rendering..", helpdeskFilterOn);

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

      // ---------------------------------------------Interaction live requests end-------------------------------------------------------------



      dispatch(getStatusWiseCount({ searchParams: {} }))
      console.log("getStatusWiseCount result UI..", intDashRed.statusWiseCountData);

      dispatch(getStatementWise({ category: "STATEMENT" }))
      console.log("getStatementWise result UI..", intDashRed.statementWiseData);

      dispatch(getChannelWise(params))
      console.log("getChannelWise result UI..", intDashRed.channelWiseData);


      dispatch(getCustomerWise(
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

      dispatch(getDepartmentVsRolesInteractions(params))
      console.log("getDepartmentVsRolesInteractions result UI..", intDashRed.departmentVsRolesInteractionsData);

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

      dispatch(getInteractionByServiceCategory(params))
      console.log("getInteractionByServiceCategory result UI..", intDashRed.interactionByServiceCategoryData);

      dispatch(getInteractionByServiceType(params))
      console.log("getInteractionByServiceType result UI..", intDashRed.interactionByServiceTypeData);

      dispatch(getInteractionProjectWise(params))
      console.log("getInteractionProjectWise count result UI..", intDashRed.interactionByProjectWiseData);

      dispatch(getInteractionAgentWise(params))
      console.log("getInteractionAgentWise result UI..", intDashRed.interactionByAgentWiseData);
    }

    await dispatch(await getInteractionByPriorityStatusWise({ searchParams: { category: "ALL" } }))
    console.log("getInteractionByPriorityStatusWise ALL UI..", intDashRed.interactionByPriorityStatusWiseData);


    // ---------------------------------------------Interaction requests end-------------------------------------------------------------



    // ---------------------------------------------Helpdesk requests start-------------------------------------------------------------


    if (showHelpdeskDashboard) {

      // ---------------------------------------------Helpdesk live requests start-------------------------------------------------------------

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

      // ---------------------------------------------Helpdesk live requests end-------------------------------------------------------------


      dispatch(getHelpdeskSummary(params))
      console.log("getHelpdeskSummary result UI2..", intDashRed?.helpdeskSummaryData);

      dispatch(getSupportTtkPending(params))
      console.log("getSupportTtkPending count result UI3..", intDashRed?.supportTtkPendingCountsData);
      console.log("getSupportTtkPending result UI4..", intDashRed?.supportTtkPendingData);

      dispatch(getMonthlyTrend())
      console.log("getMonthlyTrend result UI2..", intDashRed.supportMonthlyTrendData);

      dispatch(getHelpdeskByStatus(params))
      console.log("getHelpdeskByStatus result UI2..", intDashRed.helpdeskByStatusData);

      dispatch(getHelpdeskByAgeing(params))
      console.log("getHelpdeskByAgeing result UI2..", intDashRed.helpdeskByAgeingData);

      dispatch(getHelpdeskBySeverity(params))
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
      dispatch(getHelpdeskSummaryUnclassified(params4))
      console.log("getHelpdeskSummaryUnclassified result UI..", intDashRed?.helpdeskSummaryUnclassifiedData);
    }

    // ---------------------------------------------Helpdesk Requests end-------------------------------------------------------------


  }, [showHelpdeskDashboard, showInteractionDashboard, helpdeskFilterOn, intxnFilterOn]);


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
        width: 400,
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
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.interaction_number}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oIntxnNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.intractionCategory}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oInteractionCategory}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.intractionType}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oInteractionType}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.serviceCategory}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oServiceCategory}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.serviceType}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oServiceType}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.priority}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oPriority}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.project}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oProject}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.status}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oStatus}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.channel}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oChannel}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.created_by}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{body.oCreatedUser}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 200, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>{strings.created_date}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{moment(body.oCreatedAt).format("DD MMM YYYY HH:MM:SS")}</Text>
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
        width: 400,
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
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Helpdesk No.</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{helpdeskNo}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Email</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{mailId}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Username</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{userName}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Source</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{helpdeskSource}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Severity</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{priority}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Project</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{project}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Helpdesk Subject</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{helpdeskSubject}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Current User</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{currUser}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ flexDirection: "column", width: 130, marginLeft: 70 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Status</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{status}</Text>
            </View>

            <View style={{ flexDirection: "column", width: 130, marginHorizontal: 0 }}>
              <Text style={{ fontWeight: "normal", fontSize: 11 }}>Actioned Date</Text>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{moment(createdAt).format("DD MMM YYYY HH:MM:SS")}</Text>
            </View>
          </View>

        </View>
      </Card>
    );
  }


  // ---------------------------------------Dialogs start-----------------------------------------------------------------

  const ShowDashboardDialog = () => {

    return (
      <PaperProvider>
        <View>
          <Portal>
            <Dialog style={{ marginTop: -40 }} visible={openDashboardPopUp} >

              <Dialog.Title style={{ textAlign: "center", fontSize: 15 }}>Choose Dashboard</Dialog.Title>

              <Dialog.Content>
                <Card style={{ backgroundColor: "#FFF", padding: 10 }}>
                  <Text
                    onPress={() => {
                      setShowHelpdeskDashboard(true)
                      setShowInteractionDashboard(false)
                      setOpenDashboardPopUp(false)
                    }}
                    style={{ textAlign: "center", padding: 5, fontWeight: "900" }}>Helpdesk Dashboard</Text>
                </Card>

                <Card style={{ backgroundColor: "#FFF", padding: 10, marginTop: 10 }}>
                  <Text
                    onPress={() => {
                      setShowInteractionDashboard(true)
                      setShowHelpdeskDashboard(false)
                      setOpenDashboardPopUp(false)
                    }}
                    style={{ textAlign: "center", padding: 5, fontWeight: "900" }}>Interaction Dashboard</Text>
                </Card>
              </Dialog.Content>

              {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}

            </Dialog>
          </Portal>
        </View>
      </PaperProvider>
    )
  };

  const ShowHelpdeskDetailsDialog = () => {

    console.log("data inside dialog..", helpdeskDialogData)

    return (
      <PaperProvider>
        <View>
          <Portal>
            <Dialog style={{ marginTop: -40 }} visible={helpdeskDetDialogVisible} >

              {/* <Dialog.Title style={{ textAlign: "center", fontSize: 15 }}>{dialogHeading}</Dialog.Title> */}

              <Dialog.Content>
                <Text style={{ textAlign: "center", padding: 5, fontWeight: "900" }}>{dialogHeading}</Text>

                <FlatList
                  style={{ height: 400, backgroundColor: Colors.BCAE_OFF_WHITE }}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  data={helpdeskDialogData}
                  renderItem={renderItem2}
                  keyExtractor={item => item}
                />

                <CustomButton
                  style={{ width: 80, height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                  label={"Ok"} onPress={() => {
                    console.log("Done button click..")
                    setHelpdeskDetDialogVisible(false)
                  }}
                />
              </Dialog.Content>

              {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}

            </Dialog>
          </Portal>
        </View>
      </PaperProvider>
    )
  };

  const ShowInteractionDetailsDialog = () => {

    console.log("data inside dialog..", dialogData)

    return (
      <PaperProvider>
        <View>
          <Portal>
            <Dialog style={{ marginTop: -40 }} visible={intxnDetDialogVisible} >

              {/* <Dialog.Title style={{ textAlign: "center", fontSize: 15 }}>{dialogHeading}</Dialog.Title> */}

              <Dialog.Content>
                <Text style={{ textAlign: "center", padding: 5, fontWeight: "900" }}>{dialogHeading}</Text>

                <FlatList
                  style={{ height: 400, backgroundColor: Colors.BCAE_OFF_WHITE }}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  data={dialogData}
                  renderItem={renderItem}
                  keyExtractor={item => item}
                />

                <CustomButton
                  style={{ width: 80, height: 200, backgroundColor: Colors.BCAE_OFF_WHITE }}
                  label={"Ok"} onPress={() => {
                    console.log("Done button click..")
                    setIntxnDetDialogVisible(false)
                  }}
                />
              </Dialog.Content>

              {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}

            </Dialog>
          </Portal>
        </View>
      </PaperProvider>
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
    let projectArr = project.filter((ele, ind) => ind === project.findIndex(elem => elem.description === ele.description && elem.code === ele.code))
    console.log(projectArr)

    var arr = intDashRed?.helpdeskByStatusData?.data?.map(item => {
      return { description: item.oStatus, code: item.oStatusCode }
    })
    let statusArr = arr.filter((ele, ind) => ind === arr.findIndex(elem => elem.description === ele.description && elem.code === ele.code))
    console.log(statusArr)


    var arr = intDashRed?.helpdeskBySeverityData?.data?.map(item => {
      return { description: item.oStatus, code: item.oSeverityCode }
    })
    let severityArr = arr.filter((ele, ind) => ind === arr.findIndex(elem => elem.description === ele.description && elem.code === ele.code))
    console.log(severityArr)


    return (
      <PaperProvider>
        <View>
          <Portal>
            <Dialog style={{ marginTop: -40, height: 550 }} visible={helpdeskFilterDialogVisible} >

              <Dialog.Content>
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

                  <View style={{ flexDirection: "row", marginTop: 20 }}>
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
              </Dialog.Content>

              {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}

            </Dialog>
          </Portal>
        </View>
      </PaperProvider>
    )
  };

  const ShowIntxnFiltersDialog = () => {

    var projectArr = intDashRed?.interactionByProjectWiseData?.data?.rows?.map(item => {
      var project = ""
      if (!(item.oProject == null)) {
        project = item.oProject
      }
      return { description: project, code: item.oProjectCode }
    })
    console.log("projectArr...", projectArr)

    var statusArr = intDashRed?.liveInteractionsByStatusData?.data?.rows?.map(item => {
      return { description: item.currStatusDesc.description, code: item.currStatusDesc.code }
    })
    console.log("statusArr...", statusArr)

    var channelArr = intDashRed?.channelWiseData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    console.log("channelArr...", channelArr)

    var priorityArr = intDashRed?.interactionByPriorityData?.data?.rows?.map(item => {
      return { description: item.oPriorityDesc, code: item.oPriorityCode }
    })
    console.log("priorityArr...", priorityArr)

    var userArr = intDashRed?.interactionByAgentWiseData?.data?.rows?.map(item => {
      return { description: item.oCurrUserDesc, code: item.oCurrUser }
    })
    console.log("userArr...", userArr)

    var intCategoryArr = intDashRed?.interactionByCategoryData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    console.log("intCategoryArr...", intCategoryArr)

    var intTypeArr = intDashRed?.interactionByTypeData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    console.log("intTypeArr...", intTypeArr)

    var serviceCategoryArr = intDashRed?.interactionByServiceCategoryData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    console.log("serviceCategoryArr...", serviceCategoryArr)

    var serviceTypeArr = intDashRed?.interactionByServiceTypeData?.data?.rows?.map(item => {
      return { description: item.oCategoryValue, code: item.oCategoryCode }
    })
    console.log("serviceTypeArr...", serviceTypeArr)


    console.log("intxnFilterReq...", intxnFilterReq)

    return (
      <PaperProvider>
        <View>
          <Portal>
            <Dialog style={{ marginTop: -40, height: 550 }} visible={intxnFilterDialogVisible} >

              <Dialog.Content>
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

                  <View style={{ flexDirection: "row", marginTop: 20 }}>
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


                        console.log("intxnFilterParams1..", intxnFilterReq)
                        // console.log("intxnFilterParams2..", JSON.stringify(filterParams))


                        unstable_batchedUpdates(() => {
                          setIntxnFilterDialogVisible(false)
                          setIntxnFilterOn(true)
                          // setHelpdeskFilterDialogVisible(false)
                          // setHelpdeskFilterOn(false)
                        })

                      }}
                    />
                  </View>

                </ScrollView>
              </Dialog.Content>

              {/* <Dialog.Actions>
                <Button onPress={() => {
                  console.log("Done button click..")
                  setVisible(false)
                }}>Back</Button>
              </Dialog.Actions> */}

            </Dialog>
          </Portal>
        </View>
      </PaperProvider>
    )
  };

  // ---------------------------------------Dialogs end-----------------------------------------------------------------


  // ---------------------------------------Interaction methods start-----------------------------------------------------------------

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
                setIntxnDetDialogVisible(true)
                setDialogData(arrTotal)
                dialogHeading = "Interaction By Status"
              }}
              style={{ width: 150, backgroundColor: "#2471A3", padding: 10, elevation: 10, margin: 7 }}>

              <Text style={{ padding: 5, color: "#FFFFFF" }}>Total Interaction</Text>

              <Text
                style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>
                {countTotal}
              </Text>
            </Card>

            <Card
              onPress={() => {
                setIntxnDetDialogVisible(true)
                setDialogData(arrNew)
                dialogHeading = "Interaction By Status - New"
              }}
              style={{ width: 150, backgroundColor: "#85C1E9", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Open Interaction</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{countNew}</Text>
            </Card>
          </View>

          <View style={{ alignSelf: "center", backgroundColor: "transparent", flexDirection: "row" }}>
            <Card
              onPress={() => {
                setIntxnDetDialogVisible(true)
                setDialogData(arrWip)
                dialogHeading = "Interaction By Status - WIP"
              }}
              style={{ width: 150, backgroundColor: "#F7DC6F", padding: 10, elevation: 10, margin: 7 }}>
              <Text style={{ padding: 5, color: "#FFFFFF" }}>Work in progress</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#FFFFFF" }}>{countWip}</Text>
            </Card>

            <Card
              onPress={() => {
                setIntxnDetDialogVisible(true)
                setDialogData(arrClosed)
                dialogHeading = "Interaction By Status - Closed"
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
                await dispatch(await getInteractionByAgeingThreeDays(params))
                console.log("getInteractionByAgeing 0_3DAYS result UI..", intDashRed?.interactionByAgeingThreeDaysData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByAgeingThreeDaysData?.data?.rows)
                dialogHeading = "Interaction By Ageing (0_3 days)"
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
                await dispatch(await getInteractionByAgeingFiveDays(params))
                console.log("getInteractionByAgeing 3_5DAYS result UI..", intDashRed.interactionByAgeingFiveDaysData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByAgeingFiveDaysData?.data?.rows)
                dialogHeading = "Interaction By Status (3_5 days)"
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
                await dispatch(await getInteractionByAgeingMoreFiveDays(params))
                console.log("getInteractionByAgeing more 5DAYS result UI..", intDashRed.interactionByAgeingMoreFiveDaysData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByAgeingMoreFiveDaysData?.data?.rows)
                dialogHeading = "Interaction By Status (>5 days)"
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
                await dispatch(await getInteractionByFollowupsThreeDays(params))
                console.log("getInteractionByFollowups 3 result UI..", intDashRed.interactionByFollowupsThreeDaysData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByFollowupsThreeDaysData?.data?.rows)
                dialogHeading = "Interaction By Followups (0_3 days)"
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
                await dispatch(await getInteractionByFollowupsFiveDays(params))
                console.log("getInteractionByFollowups 5 result UI..", intDashRed.interactionByFollowupsFiveDaysData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByFollowupsFiveDaysData.rows)
                dialogHeading = "Interaction By Followups (3_5 days)"
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
                await dispatch(await getInteractionByFollowupsMoreFiveDays(params))
                console.log("getInteractionByFollowups more 5 result UI..", intDashRed.interactionByFollowupsMoreFiveDaysData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByFollowupsMoreFiveDaysData.rows)
                dialogHeading = "Interaction By Followups (>5 days)"
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
                await dispatch(await getInteractionByPriorityHigh(params))
                console.log("getInteractionByPriorityHigh result UI..", intDashRed?.interactionByPriorityHighData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByPriorityHighData?.data?.rows)
                dialogHeading = "Interaction By Priority (High)"
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
                awaitdispatch(await getInteractionByPriorityLow(params))
                console.log("getInteractionByPriorityLow result UI..", intDashRed?.interactionByPriorityLowData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByPriorityLowData?.data?.rows)
                dialogHeading = "Interaction By Priority (Low)"
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
                await dispatch(await getInteractionByPriorityMedium(params))
                console.log("getInteractionByPriorityMedium result UI..", intDashRed?.interactionByPriorityMediumData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.interactionByPriorityMediumData?.data?.rows)
                dialogHeading = "Interaction By Priority (Medium)"
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

                            await dispatch(await getInteractionProjectWiseList(params))
                            console.log("getInteractionProjectWiseList result UI..", intDashRed?.interactionByProjectWiseListData);

                            setIntxnDetDialogVisible(true)
                            setDialogData(intDashRed.interactionByProjectWiseListData?.data?.rows)
                            // setDialogData(dataArr)
                            dialogHeading = "Project Wise Interaction"

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

                            await dispatch(await getInteractionAgentWiseList(params))
                            console.log("getInteractionAgentWiseList result UI..", intDashRed?.interactionByAgentWiseListData);

                            setIntxnDetDialogVisible(true)
                            setDialogData(intDashRed.interactionByAgentWiseListData?.data?.rows)
                            dialogHeading = "Agent Wise Interaction"

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
              onPress={() => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    categoryType: "Internal"
                  }
                };
                dispatch(getCustomerWise(params))
                console.log("getCustomerInternal result UI..", intDashRed?.customerWiseData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.customerWiseData?.data?.rows?.customerWiseData)
                dialogHeading = "Team wise Interaction (Internal)"
              }}
              style={{ width: 130, height: 50, backgroundColor: "#FFF", padding: 0, elevation: 10, margin: 3 }}>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>Internal Customers</Text>
              <Text style={{ textAlign: "center", alignContent: "center", padding: 2, fontWeight: "400", color: "#000000" }}>{customerWiseValues[0]}</Text>
            </Card>

            <Card
              onPress={() => {
                let params = {
                  searchParams: {
                    category: "LIST",
                    categoryType: "External"
                  }
                };
                dispatch(getCustomerWise(params))
                console.log("getCustomerExternal result UI..", intDashRed?.customerWiseData);

                setIntxnDetDialogVisible(true)
                setDialogData(intDashRed.customerWiseData?.data?.rows?.customerWiseData)
                dialogHeading = "Team wise Interaction (External)"
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

  // ---------------------------------------Interaction methods end-----------------------------------------------------------------



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

    const xAxisData = [...new Set(summaryList?.map(item => item.oPriority))];
    const priorities = [...new Set(summaryList?.map(item => item.oPriority))];
    const statuses = [...new Set(summaryList?.map(item => item.oStatus))];

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
                setHelpdeskDetDialogVisible(true)
                setHelpdeskDialogData(intDashRed.helpdeskSummaryClarificationData?.data)
                dialogHeading = "Summary Wise Helpdesk Details"
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Clarification</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryClarificationData?.data?.length}</Text>
            </Card>

            <Card
              onPress={() => {


                setHelpdeskDetDialogVisible(true)
                setHelpdeskDialogData(intDashRed.helpdeskSummaryIncidentData?.data)
                dialogHeading = "Summary Wise Helpdesk Details"
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Incident</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryIncidentData?.data?.length}</Text>
            </Card>

            <Card
              onPress={() => {


                setHelpdeskDetDialogVisible(true)
                setHelpdeskDialogData(intDashRed.helpdeskSummaryServiceRequestData?.data)
                dialogHeading = "Summary Wise Helpdesk Details"
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Service Request</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryServiceRequestData?.data?.length}</Text>
            </Card>

            <Card
              onPress={() => {


                setHelpdeskDetDialogVisible(true)
                setHelpdeskDialogData(intDashRed.helpdeskSummaryUnclassifiedData?.data)
                dialogHeading = "Summary Wise Helpdesk Details"
              }}
              style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
              <Text style={{ padding: 5, color: "#000000", fontSize: 10 }}>Unclassified</Text>
              <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{"" + intDashRed.helpdeskSummaryUnclassifiedData?.data?.length}</Text>
            </Card>
          </View>

          <View style={{ backgroundColor: "white", padding: 5, paddingTop: 15, alignSelf: 'center' }}>
            <View style={{
              width: 200,
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center"
            }}>
              {legend.length && legend.map((it, idx) => {
                return (
                  <View key={it} style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <View style={{
                      marginLeft: idx == 0 ? 10 : 10,
                      marginRight: 2,
                      width: 10, height: 10, borderRadius: 2,
                      backgroundColor: get(data, `barColors[${idx}]`)
                    }} />
                    <Text style={{ fontSize: 8 }}>{it}</Text>
                  </View>
                )
              })}
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
                          setHelpdeskDetDialogVisible(true)
                          setHelpdeskDialogData(dataArr)
                          dialogHeading = "Project Wise Open Helpdesk Details"
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

            {data?.map((item, idx) => {
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

            {series.length > 0 && (
              <PieChart style={{ marginTop: 0 }} widthAndHeight={widthAndHeight} series={series} sliceColor={colours} />
            )}

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
              width={Dimensions.get('window').width - 16}
              height={220}
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


                        var status = await dispatch(await getHelpdeskByStatusList(params))
                        console.log("getHelpdeskByStatusList status UI..", status);
                        console.log("getHelpdeskByStatusList result UI..", intDashRed?.helpdeskByStatusListData);
                        setHelpdeskDetDialogVisible(true)
                        setHelpdeskDialogData(intDashRed?.helpdeskByStatusListData.data)
                        dialogHeading = "Status Wise Helpdesk Details"
                      }}
                      style={{ alignContent: "center", height: 70, width: 80, backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
                      <Text style={{ alignSelf: "center", padding: 5, color: "#000000", fontSize: 10 }}>{item.oStatus}</Text>
                      <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{item.oCnt}</Text>
                    </Card>
                  </>
                )
              })}
            </ScrollView>
          </View>

          <ClearSpace size={9} />

          <View style={{
            alignSelf: "flex-end",
            width: 200,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}>

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


          <ClearSpace size={2} />

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

          <ClearSpace size={4} />
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

                        setHelpdeskDetDialogVisible(true)
                        setHelpdeskDialogData(dataArr)
                        dialogHeading = "Open Helpdesk by Ageing"
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

    var criticalCount = 0, majorCount = 0, minorCount = 0

    props?.data?.data?.forEach(item => {
      console.log("oStatus...", item.oStatus)

      if (item.oStatus == "Critical") {
        criticalCount = item.oCnt
      }

      if (item.oStatus == "Major") {
        majorCount = item.oCnt
      }

      if (item.oStatus == "Minor") {
        minorCount = item.oCnt
      }

    })


    return (
      <>
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
          <ClearSpace />
          <Text style={{ padding: 5, fontWeight: "900" }}>Helpdesk By Status</Text>
          <ClearSpace />
          <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
          <ClearSpace size={4} />

          <View style={{ width: 175, alignItems: 'center' }}>
            {/* <BarPolarStackChart></BarPolarStackChart> */}
            {/* <Pie
              radius={80}
              innerRadius={50}
              sections={[
                {
                  percentage: criticalCount,
                  color: '#C70039',
                },
                {
                  percentage: majorCount,
                  color: '#44CD40',
                },
                {
                  percentage: minorCount,
                  color: '#404FCD',
                },
              ]}
              strokeCap={'butt'}
            /> */}
          </View>

          <ClearSpace size={4} />
        </Card>
      </>
    );

  };

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
                            setHelpdeskDetDialogVisible(true)
                            // setProject(project)
                            var dataArr = []
                            props?.data?.data?.rows?.map(projectItem => {
                              if (projectItem?.projectDesc?.description == item.name) {
                                dataArr.push(projectItem)
                              }
                            })


                            setHelpdeskDialogData(dataArr)
                            dialogHeading = "Project Wise Open Helpdesk Details"
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
                            setHelpdeskDetDialogVisible(true)
                            // setProject(project)
                            var dataArr = []
                            props?.data?.data?.rows?.map(agentItem => {

                              if (agentItem.assignedAgentDetails.firstName + " " + agentItem.assignedAgentDetails.lastName == item.name) {
                                dataArr.push(agentItem)
                              }
                            })


                            setHelpdeskDialogData(dataArr)
                            dialogHeading = "Agent wise Open Helpdesk"
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


  // useMemo(() => {
  return (
    <View style={styles.container}>
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
          bottom: height * 0.25,
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

        }}
        style={{
          position: "absolute",
          marginRight: 5,
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
        {/* <Image
          resizeMode="contain"
          resizeMethod="resize"
          source={require("../../Assets/icons/filter_new.png")}
        /> */}
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
          name="home-switch"
          size={35}
          color={"#FFF"}
        />
        {/* <Image
          resizeMode="contain"
          resizeMethod="resize"
          source={require("../../Assets/icons/filter_new.png")}
        /> */}
      </Pressable>


      {openDashboardPopUp && (<ShowDashboardDialog />)}

      {helpdeskDetDialogVisible && (<ShowHelpdeskDetailsDialog />)}
      {intxnDetDialogVisible && (<ShowInteractionDetailsDialog />)}

      {helpdeskFilterDialogVisible && (<ShowHelpdeskFiltersDialog />)}
      {intxnFilterDialogVisible && (<ShowIntxnFiltersDialog />)}

      {console.log("showHelpdeskDashboard..", showHelpdeskDashboard)}
      {console.log("showInteractionDashboard..", showInteractionDashboard)}
      {console.log("helpdeskLiveStream..", helpdeskLiveStream)}
      {console.log("interactionLiveStream..", interactionLiveStream)}



      {(!openDashboardPopUp && !helpdeskFilterDialogVisible && !intxnFilterDialogVisible && !helpdeskDetDialogVisible && !intxnDetDialogVisible) && (
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

            {/* <RenderHelpdeskBySeverity data={appoinmentListRed?.helpdeskBySeverityData} /> */}
            {/* <RenderHelpdeskBySeverity2 data={intDashRed?.helpdeskBySeverityData} /> */}

            <ClearSpace size={18} />
          </>
        </ScrollView>
      )}

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





const RenderInteractionByStatusTypeData = (props) => {

  console.log("status data...", props?.data?.liveInteractionsByStatusData)
  console.log("type data...", props?.data?.interactionByTypeData)
  const colorsArr = ['#58D68D', '#C0392B', '#E74C3C', '#9B59B6', '#2980B9', '#3498DB', '#16A085',
    '#F4D03F', '#F39C12', '#DC7633', '#5DADE2']


  var statusWiseMap = new Map("", 0)
  props?.data?.liveInteractionsByStatusData?.data?.rows?.map(item => {
    if (statusWiseMap.has(item.intxnStatus)) {
      statusWiseMap.set(item.intxnStatus, statusWiseMap.get(item.intxnStatus) + 1)
    }
    else {
      statusWiseMap.set(item.intxnStatus, 1)
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
        <ClearSpace size={2} />

        <Text style={{ alignSelf: "center", padding: 5, fontWeight: "900" }}>By Status</Text>

        {statusWiseData?.map((item, idx) => {
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
        )}

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

        <ClearSpace size={10} />

        {intTypeWiseData?.map((item, idx) => {
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
        )}

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

        <ClearSpace size={2} />
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


const styles = StyleSheet.create({
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
