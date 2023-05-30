import moment from "moment";
import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import { getCustomerAccountData } from "../../Redux/CustomerAccountDispatcher";
import { getInteractionListData } from "../../Redux/InteractionListDispatcher";
import { getOrderListData } from "../../Redux/OrderListDispatcher";
import { DATE_FORMAT } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { commonStyle } from '../../Utilities/Style/commonStyle';
import { getCustomerUUID } from "../../Utilities/UserManagement/userInfo";

var { height, width } = Dimensions.get("screen");



export const UserHomeScreen = ({ navigation }) => {
  const { colors, fonts, roundness } = useTheme();
  let customerAccount = useSelector((state) => state.customerAccount);
  let interactionList = useSelector((state) => state.interactionList);
  let orderList = useSelector((state) => state.orderList);

  const dispatch = useDispatch([
    getCustomerAccountData,
    getInteractionListData,
    getOrderListData,
  ]);

  useEffect(() => {
    async function fetchAccountAPI() {
      const customerUUDI = await getCustomerUUID();
      dispatch(getCustomerAccountData(navigation, customerUUDI));
      dispatch(getInteractionListData(navigation, 1));
      dispatch(getOrderListData(navigation, 1));
    }
    fetchAccountAPI();
  }, []);

  const onHandleAppointment = () => {
    navigation.navigate("Appointment");
  };
  const FlatListItemTop = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          width: width * 0.4,
          height: 140,
          margin: 5,
          padding: 15,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          {/* Title & Image View */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: colors.secondary,
              }}
            >
              {item.title || "No Name"}
            </Text>


          </View>
          <ClearSpace />
          {/*required Text to sho like amount */}
          {index === 0 && (
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 13,

                color: colors.yellow,
              }}
            >
              {strings.retails_outlet}

            </Text>
          )}
          {index === 1 && (
            <Image
              source={require("../../Assets/icons/graph_stat_red.png")}
              style={{ width: '90%', height: '40%' }}
            />
          )}
          {index === 2 && (
            <Image
              source={require("../../Assets/icons/graph_line.png")}
              style={{ width: '90%', height: '40%' }}
            />
          )}


          {/* View More view */}
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => setShowIndex(index)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: 'center',
                  justifyContent: "space-around",
                }}
                onPress={() => setShowIndex(index)}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#EFA848",
                  }}
                >
                  {strings.view_more}
                </Text>
                <Image
                  source={require("../../Assets/icons/right_arrow.png")}
                  style={{ marginLeft: 20, tintColor: "#EFA848" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const FlatListItemSale = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          width: width * 0.40,
          height: 140,
          margin: 5,
          padding: 15,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          {/* Title & Image View */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: colors.secondary,
              }}
            >
              {item.title || "No Name"}
            </Text>


          </View>
          <ClearSpace />
          {/*required Text to sho like amount */}

          {index === 0 && (
            <Image
              source={require("../../Assets/icons/graph_mountain.png")}
              style={{ width: '95%', height: '70%' }}
            />
          )}
          {index === 1 && (
            <Image
              source={require("../../Assets/icons/graph_statics.png")}
              style={{ width: '90%', }}
            />
          )}
          {index === 2 && (
            <Image
              source={require("../../Assets/icons/graph_statics.png")}
              style={{ width: '90%', }}
            />
          )}



        </View>
      </View>
    );
  };


  const FlatListItemBottom = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          width: 140,
          height: 140,
          margin: 5,
          padding: 15,
          backgroundColor:
            index === 0 ? "#5E5676" : index === 1 ? "#EFA848" : "#CA404A",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          {/* Title & Image View */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: 700,
                fontSize: 16,
                color:
                  index === 0 ? "#ffffff" : index === 1 ? "#775324" : "#ffffff",
              }}
            >
              {item.title || "No Name"}
            </Text>

            {/* <Image
              source={require("../../Assets/icons/frequent_interaction.png")}
              style={{ width: 50, height: 50 }}
            /> */}
          </View>
          {/*required Text to sho like amount */}
          {index === 0 && (
            <View>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {/* Id: {orderList?.orderListData[0]?.intxnId || "NA"} */}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {/* Date :
                {moment(orderList?.orderListData[0]?.createdAt).format(
                  DATE_FORMAT
                )} */}
              </Text>
            </View>
          )}
          {index === 1 && (
            <View>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                Id: {interactionList?.interactionListData[0]?.intxnId || "NA"}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {strings.date} :
                {moment(
                  interactionList?.interactionListData[0]?.createdAt
                ).format(DATE_FORMAT)}
              </Text>
            </View>
          )}
          {index === 2 && (
            <View>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {"Appt. ID : 1234"}
              </Text>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color:
                    index === 0
                      ? "#ffffff"
                      : index === 1
                        ? "#775324"
                        : "#ffffff",
                }}
              >
                {strings.date}:{"10 Jan 2023"}
              </Text>
            </View>
          )}
          {/* View More view */}
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => onHandleAppointment()}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color:
                      index === 0
                        ? "#ffffff"
                        : index === 1
                          ? "#775324"
                          : "#ffffff",
                  }}
                >
                  {strings.view_more}
                </Text>
                <Image
                  source={require("../../Assets/icons/right_arrow.png")}
                  style={{
                    marginLeft: 20,
                    tintColor:
                      index === 0
                        ? "#ffffff"
                        : index === 1
                          ? "#775324"
                          : "#ffffff",
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
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
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text
            style={{
              color: "#2B2B2B",
              fontSize: 16,
              fontWeight: "600",
              padding: 5,
              marginLeft: 10,
            }}
          >
            {strings.details}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              initialNumToRender={2}
              data={[
                { title: strings.topsale },
                { title: strings.tgtvs },
                { title: strings.mom_growth },
              ]}
              renderItem={({ item, index }) => (
                <FlatListItemTop item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
          <ClearSpace />
          <View style={{ ...commonStyle.row_space_arround_between_center, paddingHorizontal: '2%', }}>
            <Text
              style={{
                color: "#2B2B2B",
                fontSize: 16,
                fontWeight: "600",
                padding: 5,
                marginLeft: 10,
              }}
            >
              {strings.total_sale}
            </Text>
            <Pressable ><Text >{strings.view_all}</Text></Pressable>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              initialNumToRender={2}
              data={[
                { title: strings.location },
                { title: strings.saleagent },
                { title: strings.top_per },
              ]}
              renderItem={({ item, index }) => (
                <FlatListItemSale item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View style={{ margin: 10 }}>

          </View>
          <Text
            style={{
              color: "#2B2B2B",
              fontSize: 16,
              fontWeight: "600",
              padding: 5,
              marginLeft: 10,
            }}
          >
            {strings.task}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              initialNumToRender={2}
              data={[
                { title: strings.order },
                { title: strings.interaction },
                { title: strings.appointment },
              ]}
              renderItem={({ item, index }) => (
                <FlatListItemBottom item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
        <ClearSpace size={20} />
      </ScrollView >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
