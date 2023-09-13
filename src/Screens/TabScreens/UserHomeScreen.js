import get from "lodash.get";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView, StyleSheet,
  View
} from "react-native";
import { PieChart, StackedBarChart } from "react-native-chart-kit";
import { Card, Divider, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import { getHelpdeskAgentWise, getHelpdeskByAgeing, getHelpdeskBySeverity, getHelpdeskByStatus, getHelpdeskProjectWise, getHelpdeskSummary, getMonthlyTrend, getSupportTtkPending } from "../../Redux/AppointmentDashboardDispatcher";
import { getCustomerAccountData } from "../../Redux/CustomerAccountDispatcher";
import { getInteractionListData } from "../../Redux/InteractionListDispatcher";
import { getOrderListData } from "../../Redux/OrderListDispatcher";


var { height, width } = Dimensions.get("screen");


export const UserHomeScreen = (props) => {

  const { navigation } = props

  const appoinmentListRed = useSelector((state) => state.dashboardAppointments);

  const dispatch = useDispatch([
    getCustomerAccountData,
    getInteractionListData,
    getOrderListData,
    getHelpdeskSummary,
    getSupportTtkPending,
    getMonthlyTrend,
    getHelpdeskByStatus,
    getHelpdeskByAgeing,
    getHelpdeskBySeverity,
    getHelpdeskProjectWise,
    getHelpdeskAgentWise
  ]);

  console.log("UserHomeScreen UI..");

  useEffect(async () => {

    // ---------------------------------request params----------------------------------------------------------------
    let params = {
      // fromDate: startDate,
      // toDate: endDate,
      // project,
      type: "COUNT",
      // priority,
      // currUser,
      // status
    };
    // ----------------------------------------------------------------------------------------------------------------


    dispatch(getHelpdeskSummary(params))
    // await delay(4000);
    console.log("getHelpdeskSummary result UI2..", appoinmentListRed?.helpdeskSummaryData);

    dispatch(getSupportTtkPending(params))
    // await delay(4000);
    console.log("getSupportTtkPending result UI2..", appoinmentListRed?.supportTtkPendingData);

    dispatch(getMonthlyTrend())
    console.log("getMonthlyTrend result UI2..", appoinmentListRed.supportMonthlyTrendData);

    dispatch(getHelpdeskByStatus(params))
    console.log("getHelpdeskByStatus result UI2..", appoinmentListRed.helpdeskByStatusData);

    dispatch(getHelpdeskByAgeing(params))
    console.log("getHelpdeskByAgeing result UI2..", appoinmentListRed.helpdeskByAgeingData);

    dispatch(getHelpdeskBySeverity(params))
    console.log("getHelpdeskBySeverity result UI2..", appoinmentListRed.helpdeskBySeverityData);

    dispatch(getHelpdeskProjectWise(params))
    console.log("getHelpdeskProjectWise result UI2..", appoinmentListRed.helpdeskProjectWiseData);

    dispatch(getHelpdeskAgentWise(params))
    console.log("getHelpdeskAgentWise result UI2..", appoinmentListRed.helpdeskAgentWiseData);

  }, [props]);


  return (
    <View style={styles.container}>

      <Pressable
        style={{
          position: "absolute",
          bottom: height * 0.15,
          right: 20,
          flex: 1,
          elevation: 999,
          zIndex: 99999999,
          height: 50,
          width: 50,
        }}
      >
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          source={require("../../Assets/icons/floating_whatsapp.png")}
        />
      </Pressable>

      <ScrollView>
        <RenderHelpdeskSummaryData data={appoinmentListRed.helpdeskSummaryData} />
        <RenderSupportTicketPendingData data={appoinmentListRed.supportTtkPendingData} />
        <RenderMonthlyDailyTrends data={appoinmentListRed.supportMonthlyTrendData} />
        <ClearSpace size={18} />
      </ScrollView>

    </View >
  );
};




const RenderHelpdeskSummaryData = (props) => {

  const serviceReqArr = [], clarificationArr = [], incidentArr = []

  props.data?.data?.map(item => {
    if (item.oHelpdeskTypeCode == "SERVICEREQUEST") {
      serviceReqArr.push(item)
    }
    if (item.oHelpdeskTypeCode == "CLARIFICATION") {
      clarificationArr.push(item)
    }
    if (item.oHelpdeskTypeCode == "INCIDENT") {
      incidentArr.push(item)
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
    barColors: ["#3498DB", "#58D68D", "#F5B041"]
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
          <Card style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5 }}>
            <Text style={{ padding: 5, color: "#000000" }}>Clarification</Text>
            <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{clarificationArr?.length}</Text>
          </Card>

          <Card style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
            <Text style={{ padding: 5, color: "#000000" }}>Incident</Text>
            <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{incidentArr?.length}</Text>
          </Card>

          <Card style={{ backgroundColor: "white", flexDirection: "column", elevation: 10, padding: 5, margin: 5, alignSelf: "center" }}>
            <Text style={{ padding: 5, color: "#000000" }}>Service Request</Text>
            <Text style={{ padding: 5, fontWeight: "900", color: "#000000", alignSelf: "center" }}>{serviceReqArr?.length}</Text>
          </Card>
        </View>

        <View style={{ backgroundColor: "white", padding: 5, paddingTop: 15, alignSelf: 'center' }}>
          <View style={{
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
                  <Text style={{ fontSize: 12 }}>{it}</Text>
                </View>
              )
            })}
          </View>

          <StackedBarChart
            style={{}}
            data={data}
            width={width * .9}
            height={220}
            hideLegend={true}
            chartConfig={{
              //bar width
              barPercentage: 1.3,
              barRadius: 2,
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 1, // optional, defaults to 2dp
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
          />
        </View>

        <ClearSpace />
      </Card>
    </>
  );

};


const RenderSupportTicketPendingData = (props) => {

  const data = []

  if (!(props.data.COMQUEST == undefined)) {
    data.push(
      {
        name: "COMQUEST",
        population: props.data.COMQUEST,
        color: "#58D68D",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      }
    )
  }

  if (!(props.data.DTWORKS == undefined)) {
    data.push(
      {
        name: "DTWORKS",
        population: props.data.DTWORKS,
        color: "#5DADE2",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      }
    )
  }

  if (!(props.data.MEEZA == undefined)) {
    data.push(
      {
        name: "MEEZA",
        population: props.data.MEEZA,
        color: "#F7DC6F",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      }
    )
  }

  if (!(props.data.TD123 == undefined)) {
    data.push(
      {
        name: "TD123",
        population: props.data.TD123,
        color: "#BB8FCE",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      }
    )
  }


  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>Support Ticket Pending With</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        <PieChart
          data={data}
          width={width * 1}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "white",
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 9, // optional, default 3
            barPercentage: 1,
            style: {
              // width: 200
            },
            useShadowColorFromDataset: false // optional
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
        />

        <ClearSpace size={4} />
      </Card>
    </>
  );

};


const RenderMonthlyDailyTrends = (props) => {

  var dateArray = [], wipCountArray = [], closedCountArray = [], valuesArr = [];

  var date = new Date();
  var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  console.log("firstDay...", startDate)
  console.log("lastDay...", endDate)

  if (startDate && endDate) {
    const start = new Date("2023-09-01");
    const end = new Date("2023-09-05");
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const dates = [];
    for (let i = 0; i <= days; i++) {
      const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);

      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear().toString();
      `${day}/${month}/${year}`;

      dates.push(`${day}/${month}/${year}`);
    }
    // setDateArray(dates);
    console.log("dates...", dates)
    // dateArray = dates
  }

  props?.data?.data?.forEach(item => {
    console.log("oCnt...", item.oCnt)

    dateArray.push(item.oDayMonth)

    if (item.oStatusDesc == "Work In Progress") {
      wipCountArray.push(item.oCnt)
    }

    if (item.oStatusDesc == "Closed") {
      closedCountArray.push(item.oCnt)
    }

  })

  valuesArr = [
    {
      data: wipCountArray,
      strokeWidth: 2,
      color: (opacity = 1) => "#F4D03F"
    },
    {
      data: closedCountArray,
      strokeWidth: 2,
      color: (opacity = 1) => "#A569BD"
    }
  ]


  return (
    <>
      <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15, elevation: 10, margin: 10 }}>
        <ClearSpace />
        <Text style={{ padding: 5, fontWeight: "900" }}>This Month Daily Trends</Text>
        <ClearSpace />
        <Divider style={{ borderWidth: 1, borderColor: "#8E8F95", borderStyle: "dashed" }}></Divider>
        <ClearSpace size={4} />

        {/* <GaugeChart id="gauge-chart1" /> */}



        {/* <GaugeChart
          id="gauge-chart3"
          nrOfLevels={30}
          colors={["#FF5F6D", "#FFC371"]}
          arcWidth={0.3}
          percent={0.37}
        /> */}

        {/* <LineChart
          data={{
            labels: dateArray,
            datasets: valuesArr,
          }}
          width={Dimensions.get('window').width - 30}
          height={220}
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
        /> */}
        <ClearSpace size={4} />
      </Card>
    </>
  );

};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
});
