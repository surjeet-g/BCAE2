import { Colors } from "chart.js";
import get from "lodash.get";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  unstable_batchedUpdates
} from "react-native";
import CustomSwitch from "react-native-custom-switch-new";
import DatePicker from "react-native-date-picker";
import { Divider, TextInput, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import { CustomButton } from "../../Components/CustomButton";
import { ImagePicker } from "../../Components/ImagePicker";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { getOrderListData } from '../../Redux/OrderListDispatcher';
import {
  MASTER_DATA_CONSTANT,
  getMasterData
} from "../../Redux/masterDataDispatcher";
import { clearAttachmentData } from "../../Storage/DB";
import { getDataFromDB } from "../../Storage/token";
import { storageKeys } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { navBar } from "../../Utilities/Style/navBar";
import AttachmentItem from "./../../Components/AttachmentItem";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";
import { CustomInput } from "./../../Components/CustomInput";
import { FooterModel } from "./../../Components/FooterModel";
import {
  assignInteractionToSelf,
  cancelInteraction,
  createFollowupForInteractionID,
  downloadattachment,
  fetchCancelReasons,
  fetchSource,
  fetchStatus,
  fetchUsersByRole,
  getAttachmentList,
  getFollowupForInteractionID,
  getInteractionDetailsForID,
  getInteractionDetailsSearch,
  getWorkFlowForInteractionID,
  updateInteraction
} from "./../../Redux/InteractionDispatcher";
import {
  USERTYPE,
  getUserId,
  getUserType
} from "./../../Utilities/UserManagement/userInfo";

var { height, width } = Dimensions.get("screen");

const InteractionDetails = (props) => {

  var showSelfAssign = false
  var showReassign = false
  var showReassignToSelf = false
  var showFollowUp = true
  var showEdit = false
  var showCancel = false
  const { route, navigation } = props;
  let { interactionSearchParams } = route.params
  const [actionCompleted, setActionCompleted] = useState(false);
  var [showBottomModal, setShowBottomModal] = useState(false);
  var [interactionID, setInteractionDetails] = useState({});
  var [_deptData, setDeptData] = useState([]);
  var [_roleData, setRoleData] = useState([]);
  var [responseFlag, setResponseFlag] = useState(false);
  const [loader, setLoader] = useState(true);
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [fileAttachments, setFileAttachments] = useState([]);

  const [openTechCompDatePicker, setOpenTechCompDatePicker] = useState(false);
  const [openDepCompDatePicker, setOpenDepCompDatePicker] = useState(false);
  const [openBiCompDatePicker, setOpenBiCompDatePicker] = useState(false);
  const [openQaCompDatePicker, setOpenQaCompDatePicker] = useState(false);
  const [downtimeRequired, setDowntimeRequired] = useState(false);
  const [selTechCompDate, setSelTechCompDate] = useState(new Date());
  const [selDepCompDate, setSelDepCompDate] = useState(new Date());
  const [selBiCompDate, setSelBiCompDate] = useState(new Date());
  const [selQaCompDate, setSelQaCompDate] = useState(new Date());

  const [openDatePicker, setOpenDatePicker] = useState(false);

  console.log("props received...", props)
  interactionID = interactionSearchParams
  console.log("interactionID...", interactionID)

  useEffect(() => {
    async function refresh() {
      setLoader(true)
      let params = {
        searchParams: {
          interactionNumber: interactionID?.interactionSearchParams?.intxnNo,
        }
      }
      await dispatch(await getInteractionDetailsSearch(params, navigation))
      setInteractionDetails(interactionReducer?.interactionSearchData?.[0])

      await dispatch(await getFollowupForInteractionID(interactionReducer?.interactionSearchData?.[0]?.intxnNo));
      console.log("InteractionFollowupData..", interactionReducer?.interactionFollowupData)

      await dispatch(await getWorkFlowForInteractionID(interactionReducer?.interactionSearchData?.[0]?.intxnNo));
      console.log("InteractionWorkFlowData..", InteractionWorkFlowData)
      setLoader(false)
    }
    refresh()
  }, [responseFlag]);

  const { colors } = useTheme();
  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [modalIndex, setModalIndex] = useState(1);
  const [userType, setUserType] = useState("");
  const [formPriority, setFormPriority] = useState({});
  const [formSource, setSource] = useState({});

  const [sourceCode, setSourceCode] = useState("");
  const [sourceValue, setSourceValue] = useState("");

  const [formRemarks, setFormRemarks] = useState("");
  const [followupLoader, setFollowupLoader] = useState(false)
  const [usersByRollList, setusersByRollList] = useState([])
  const [usersDesc, setUsersDesc] = useState("")
  const [usersCode, setUsersCode] = useState("")
  const [cancelReasonDesc, setCancelReasonDesc] = useState("")
  const [cancelReasonCode, setCancelReasonCode] = useState("")
  const [selRoleDesc, setRoleDesc] = useState("")
  const [selRoleCode, setRoleCode] = useState("")
  const [roleCodeAction, setRoleCodeAction] = useState(false)
  const [selDeptDesc, setDeptDesc] = useState("")
  const [selDeptCode, setDeptCode] = useState("")
  const [selStatusDesc, setStatusDesc] = useState("")
  const [selStatusCode, setStatusCode] = useState("")
  const [enteredRemarks, setRemarks] = useState("")
  const [currUserId, setCurrUserId] = useState("");
  const [currRoleId, setCurrRoleId] = useState("");
  const [currDeptId, setCurrDeptId] = useState("");
  const [intUserId, setIntUserId] = useState("");
  const [intRoleId, setIntRoleId] = useState("");
  const [intDeptId, setIntDeptId] = useState("");
  const [intStatus, setIntStatus] = useState("");

  const resetFollup = () => {
    setSource("")
    setSourceCode("")
    setSourceValue("")
    setFormRemarks("")
    setFormPriority("")
  }

  const dispatch = useDispatch([
    getInteractionDetailsForID,
    getWorkFlowForInteractionID,
    getFollowupForInteractionID,
    getMasterData,
    createFollowupForInteractionID,
    assignInteractionToSelf,
    getOrderListData,
    fetchUsersByRole,
    fetchStatus,
    fetchCancelReasons,
    cancelInteraction,
    getAttachmentList,
    fetchSource
  ]);

  let masterReducer = useSelector((state) => state.masterdata);
  let interactionReducer = useSelector((state) => state.interaction);
  let orderReducer = useSelector((state) => state.orderList);

  const {
    InteractionDetailsData,
    InteractionWorkFlowData,
    interactionFollowupData,
    interactionUsersByRoleData,
    statusData,
    interactionCancelReasonsData
    // rolesData
  } = interactionReducer;


  // useEffect(() => {
  //   async function getData() {
  //     setLoader(true)
  //     await dispatch(await getAttachmentList(interactionReducer?.interactionSearchData?.[0]?.intxnUuid))
  //     console.log("getAttachmentList got..", interactionReducer.intxnAttachmentData);
  //     setLoader(false)
  //   }
  //   getData()
  // }, []);


  // Calling API to get interaction details & workflow/followup data
  useEffect(() => {
    async function getData() {
      setLoader(true)
      setCurrUserId(await getUserId())
      setCurrRoleId(await getDataFromDB(storageKeys.CURRENT_ROLE_ID))
      setCurrDeptId(await getDataFromDB(storageKeys.CURRENT_DEPT_ID))

      console.log("expected useEffect...")
      console.log("curr role id dep id user id..." + await getUserId() + " , " + await getDataFromDB(storageKeys.CURRENT_ROLE_ID) + " , " + await getDataFromDB(storageKeys.CURRENT_DEPT_ID))

      let params = {
        searchParams: {
          interactionNumber: interactionID?.interactionSearchParams?.intxnNo,
        }
      }
      await dispatch(await getInteractionDetailsSearch(params, navigation))
      setInteractionDetails(interactionReducer?.interactionSearchData?.[0])

      // await dispatch(await getAttachmentList(interactionReducer?.interactionSearchData?.[0]?.intxnUuid))
      // console.log("getAttachmentList got..", interactionReducer.intxnAttachmentData);

      await dispatch(await getFollowupForInteractionID(interactionReducer?.interactionSearchData?.[0]?.intxnNo));
      console.log("InteractionFollowupData..", interactionReducer?.interactionFollowupData)

      await dispatch(await getWorkFlowForInteractionID(interactionReducer?.interactionSearchData?.[0]?.intxnNo));
      console.log("InteractionWorkFlowData..", InteractionWorkFlowData)

      await dispatch(await getInteractionDetailsForID(interactionID?.interactionSearchData?.[0]?.intxnId, navigation));
      console.log("InteractionDetailsData..", interactionReducer?.interactionSearchData?.[0])

      //fetch order list or enble button
      // dispatch(getOrderListData(navigation, 1, 0));
      // console.log("interactionL firt", interactionReducer?.interactionSearchData?.[0].intxnId)

      const { PRIORITY, SOURCE } = MASTER_DATA_CONSTANT;
      dispatch(getMasterData(`${PRIORITY},${SOURCE}`));

      await dispatch(await fetchUsersByRole(interactionReducer?.interactionSearchData?.[0]?.currentRole?.description?.roleId, interactionID?.interactionSearchParams?.currentDepartment?.description?.unitId, navigation))
      console.log("interactionUsersByRoleData got..", interactionReducer.interactionUsersByRoleData);

      await dispatch(await fetchStatus(interactionID.interactionSearchParams.intxnUuid, "INTERACTION"))

      await dispatch(await fetchSource())
      console.log("fetch source got..", interactionReducer?.sourceData);


      await dispatch(await fetchCancelReasons())
      console.log("interactionCancelReasonsData got..", interactionReducer.interactionCancelReasonsData);

      // if (interactionReducer.interactionUsersByRoleData.data.length > 0) {
      //   const parsedata = interactionReducer.interactionUsersByRoleData.data.map(item => {
      //     return { description: item.firstName, code: item.userId }
      //   });
      //   setusersByRollList(parsedata)
      // }
      // console.log("usersByRollList got..", usersByRollList);
      // dispatch(assignInteractionToSelf(interactionID.interactionSearchParams.intxnNo, "SELF"))

      let userType = getUserType();
      setUserType(userType);

      // await dispatch(await getAttachmentList(interactionReducer?.interactionSearchData?.[0]?.intxnUuid))
      // console.log("getAttachmentList got..", interactionReducer.intxnAttachmentData);

      setLoader(false)
    }
    getData()
  }, []);



  console.log('>>order details', orderReducer)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            <View style={navBar.navRightCon}>
              <Pressable onPress={() => {
                unstable_batchedUpdates(async () => {
                  await clearAttachmentData()
                  setFileAttachments([]);
                  setShowPopupMenu(!showPopupMenu)
                })
              }}>


                <Image
                  style={{ margin: 10 }}
                  source={require("../../Assets/icons/ic_more_vertical.png")}
                />

              </Pressable>
            </View>
          </View>
        );
      },
    });
  }, [showPopupMenu]);

  const handleMutiContactPer = (data) => {
    const len = get(data, 'length', 0)
    if (len == 0) return ""
    let final = []
    data.map(item => {
      final.push(`${item?.description}`)
      return;
    })
    return final.join(`,\n`)
  }


  const [isNoSelected, setisNoSelected] = React.useState(true);

  const onToggleSwitch = () => {
    if (isNoSelected) {
      setDowntimeRequired(false)
    } else {
      setDowntimeRequired(true)
    }
    setisNoSelected(!isNoSelected);
  };


  const AttachmentFlatListItem = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          margin: 5,
          padding: 20,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          {/* Title & Image View */}
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              variant="bodyMedium"
              numberOfLines={1}
              style={{
                fontWeight: 700,
                fontSize: 16,
                width: 100,
                color: colors.secondary,
                flex: 2,
                marginRight: 5,
              }}
            >
              {item.fileName}
            </Text>
          </View>
          {/* View More view */}
          <Pressable
            onPress={async () => {
              await dispatch(await downloadattachment(item.attachmentUuid))
              console.log("download attachment got..", interactionReducer?.intxnDownloadAttachmentData);
              if (interactionReducer.intxnDownloadAttachmentData == {}) {
                console.log("image not downloaded yet...")
              }
              else {
                if (interactionReducer?.intxnDownloadAttachmentData?.provider == "DATABASE") {
                  WriteBase64ToFile(interactionReducer?.intxnDownloadAttachmentData?.url)
                }
                else {
                  checkPermission(item?.fileName)
                }
              }
            }}
          >

            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#EFA848",
                }}
              >
                Download
              </Text>
            </View>

          </Pressable>
        </View>
      </View>
    );
  };


  const HorizontalFlatListItem = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          alignContent: "center",
          flexDirection: "row",
          flex: 1,
          margin: 5,
          padding: 20,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          {/* Title & Image View */}
          <View>
            <Text
              variant="bodyMedium"
              numberOfLines={2}
              style={{
                fontWeight: 500,
                fontSize: 16,
                width: 300,
                color: colors.secondary,
                flex: 2,
                marginRight: 5,
              }}
            >
              {item.title || "No Name"}
            </Text>


          </View>
          {/* View More view */}
          <Pressable
            onPress={() => {

              // let params = {
              //   interactionWorkflowParams: InteractionWorkFlowData
              // }

              // navigation.navigate("WorkflowHistory", {
              //   interactionWorkflowParams: params
              // })

              // if (index == 0) {
              // navigation.navigate("AppointmentDetails");
              // } else if (index == 1) {
              navigation.navigate("WorkflowHistory");
              // }
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
                  fontSize: 14,
                  color: "#EFA848",
                }}
              >
                View
              </Text>
              <Image
                source={require("../../Assets/icons/ic_right_arrow.png")}
                style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
              />
            </View>
          </Pressable>
        </View>

        <View style={{ marginLeft: 140, flexDirection: "column", flex: 1 }}>
          <Image
            source={require("../../Assets/icons/frequent_interaction.png")}
            style={{ width: 50, height: 50, flex: 1 }}
          />
        </View>

      </View>
    );
  };


  const HorizontalFlatListItem2 = (props) => {
    const { item, index } = props;
    return (
      <View
        style={{
          alignContent: "center",
          flexDirection: "row",
          flex: 1,
          margin: 5,
          padding: 20,
          backgroundColor: "#FFF",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "column", flex: 1 }}>
          {/* Title & Image View */}
          <View>
            <Text
              variant="bodyMedium"
              numberOfLines={2}
              style={{
                fontWeight: 500,
                fontSize: 16,
                width: 300,
                color: colors.secondary,
                flex: 2,
                marginRight: 5,
              }}
            >
              {item.title || "No Name"}
            </Text>


          </View>
          {/* View More view */}
          <Pressable
            onPress={() => {
              let params = {
                interactionForm: interactionID?.interactionSearchParams?.formDetails
              }
              console.log("params sending...", params)
              navigation.navigate("InteractionForms", {
                interactionForm: params
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
                  fontSize: 14,
                  color: "#EFA848",
                }}
              >
                View
              </Text>
              <Image
                source={require("../../Assets/icons/ic_right_arrow.png")}
                style={{ marginTop: 2, marginLeft: 10, tintColor: "#EFA848" }}
              />
            </View>
          </Pressable>
        </View>

        <View style={{ marginLeft: 140, flexDirection: "column", flex: 1 }}>
          <Image
            source={require("../../Assets/icons/frequent_interaction.png")}
            style={{ width: 50, height: 50, flex: 1 }}
          />
        </View>

      </View>
    );
  };

  const DetailInfoItem = (props) => {
    const {
      title = "",
      value = "",
      flex = 1,
      onPress = () => console.log(`Clicked ${title}`),
    } = props;

    return (
      <Pressable
        style={{
          flex: flex,
          flexDirection: "column",
        }}
        onPress={onPress}
      >
        <View
          style={{
            flex: flex,
            flexDirection: "column",
          }}
        >
          <Text
            variant="bodySmall"
            style={{
              fontWeight: 400,
              fontSize: 14,
              color: "#686B6C",
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            variant="bodySmall"
            style={{
              fontWeight: 500,
              fontSize: 14,
              color: "#202223",
              marginTop: 5,
            }}
            numberOfLines={2}
          >
            {value}
          </Text>
        </View>
      </Pressable>
    );
  };

  const DetailInfoAttachmentItem = (props) => {
    const {
      title = "",
      attachmentData = [],
      flex = 1,
      onPress = () => console.log(`Clicked ${title}`),
    } = props;

    return (
      <View
        style={{
          flex: flex,
          flexDirection: "column",
        }}
      >
        <Text
          variant="bodySmall"
          style={{
            fontWeight: 400,
            fontSize: 14,
            color: "#686B6C",
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={attachmentData}
          key={(item, index) => index}
          renderItem={({ item, index }) => (
            <AttachmentItem index={index} item={item} />
          )}
        />
      </View>
    );
  };


  const DetailsInfoUIFull = () => {
    console.log("data", interactionReducer?.interactionSearchData?.[0])

    var firstName = "", lastName = "", contactType = "", remarks = "", techCompDate = "", deployDate = "",
      biCompDate = "", qaCompDate = "", downtimeRequired = "", channel = "", edoc = ""

    if (interactionReducer?.interactionSearchData?.[0]?.currentUser?.description?.firstName !== undefined) {
      firstName = interactionReducer?.interactionSearchData?.[0]?.currentUser?.description?.firstName
    }
    if (interactionReducer?.interactionSearchData?.[0]?.currentUser?.description?.lastName !== undefined) {
      lastName = interactionReducer?.interactionSearchData?.[0]?.currentUser?.description?.lastName
    }


    interactionReducer?.interactionSearchData?.[0]?.contactPreference?.map((item, idx) => {
      if (contactType === "") {
        contactType = item?.description
      }
      else {
        contactType = contactType + " , " + item?.description
      }
    })

    if (interactionReducer?.interactionSearchData?.[0]?.intxnDescription === undefined) {

    }
    else {
      remarks = interactionReducer?.interactionSearchData?.[0]?.intxnDescription
    }

    if (interactionReducer?.interactionSearchData?.[0]?.techCompletionDate !== null) {
      techCompDate = interactionReducer?.interactionSearchData?.[0]?.techCompletionDate
    }

    if (interactionReducer?.interactionSearchData?.[0]?.deployementDate !== null) {
      deployDate = interactionReducer?.interactionSearchData?.[0]?.deployementDate
    }

    if (interactionReducer?.interactionSearchData?.[0]?.biCompletionDate !== null) {
      biCompDate = interactionReducer?.interactionSearchData?.[0]?.biCompletionDate
    }

    if (interactionReducer?.interactionSearchData?.[0]?.qaCompletionDate !== null) {
      qaCompDate = interactionReducer?.interactionSearchData?.[0]?.qaCompletionDate
    }

    if (interactionReducer?.interactionSearchData?.[0]?.isDownTimeRequired !== null) {
      if (interactionReducer?.interactionSearchData?.[0]?.isDownTimeRequired) {
        downtimeRequired = "Yes"
      }
      else {
        downtimeRequired = "No"
      }
    }

    if (interactionReducer?.interactionSearchData?.[0]?.intxnChannel?.description !== null) {
      channel = interactionReducer?.interactionSearchData?.[0]?.intxnChannel?.description
    }

    if ((interactionReducer?.interactionSearchData?.[0]?.edoc === undefined)
      || (interactionReducer?.interactionSearchData?.[0]?.edoc == null)) {

    }
    else {
      edoc = moment(interactionReducer?.interactionSearchData?.[0]?.edoc).format("DD MMM YYYY")
    }




    return (
      <View
        style={{
          margin: 5,
          backgroundColor: "#fff",
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Text
          style={{
            backgroundColor: "rgba(63, 185, 77, 0.23)",
            color: "#3FB94D",
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            position: "absolute",
            top: 0,
            right: 30,
            fontSize: 14,
            fontWeight: 600,
          }}
          numberOfLines={1}
        >
          Interaction No.: {interactionReducer?.interactionSearchData?.[0]?.intxnNo}
        </Text>

        <View
          style={{
            padding: 10
          }}
        >
          {/* Row 1 */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {/* Statement View */}
            <DetailInfoItem
              title={"Statement"}
              value={interactionReducer?.interactionSearchData?.[0]?.requestStatement}
              flex={1}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <DetailInfoItem title={"Current User"}
              value={firstName
                + " " + lastName}
              flex={4} />

            <DetailInfoItem title={"Channel"}
              value={channel}
              flex={4} />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <DetailInfoItem title={"Current Department"}
              value={interactionReducer?.interactionSearchData?.[0]?.currentDepartment?.description?.unitDesc}
              flex={1} />

            <DetailInfoItem
              title={"Current Role"}
              value={interactionReducer?.interactionSearchData?.[0]?.currentRole?.description?.roleDesc}
              flex={1}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <DetailInfoItem
              title={"Category"}
              value={interactionReducer?.interactionSearchData?.[0]?.intxnCategory?.description}
              flex={1}
            />

            <DetailInfoItem
              title={"Type"}
              value={interactionReducer?.interactionSearchData?.[0]?.intxnType?.description}
              flex={1}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <DetailInfoItem
              title={"Service Category"}
              value={interactionReducer?.interactionSearchData?.[0]?.serviceCategory?.description}
              flex={1}
            />

            <DetailInfoItem
              title={"Service type"}
              value={interactionReducer?.interactionSearchData?.[0]?.serviceType?.description}
              flex={1}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <DetailInfoItem
              title={"Status"}
              value={interactionReducer?.interactionSearchData?.[0]?.intxnStatus?.description}
              flex={1}
            />

            <DetailInfoItem
              title={"Priority"}
              value={interactionReducer?.interactionSearchData?.[0]?.intxnPriority?.description}
              flex={1}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* <DetailInfoItem
              title={"Created Date"}
              value={moment(interactionReducer?.interactionSearchData?.[0]?.createdAt).format(
                "DD MMM YYYY"
              )}
              flex={1}
            /> */}
            <DetailInfoItem
              title={"Exp. Completion Date"}
              value={edoc}
              flex={1}
            />

            <DetailInfoItem
              title={"Follow Up"}
              value={interactionReducer?.interactionFollowupData?.length}
              flex={1}
              onPress={() => {
                // if (InteractionFollowupData.length > 0)
                navigation.navigate("Followup");
              }}
            />
          </View>

          {(techCompDate !== "") && (deployDate !== "") && (
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <DetailInfoItem
                title={"Tech Completion Date"}
                value={techCompDate}
                flex={1}
              />

              <DetailInfoItem
                title={"Deployment Date"}
                value={deployDate}
                flex={1}
              />
            </View>
          )}

          {(biCompDate !== "") && (qaCompDate !== "") && (
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <DetailInfoItem
                title={"BI Completion Date"}
                value={biCompDate}
                flex={1}
              />

              <DetailInfoItem
                title={"QA Completion Date"}
                value={qaCompDate}
                flex={1}
              />
            </View>
          )}

          {(downtimeRequired !== "") && (
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {downtimeRequired !== "" && (
                <DetailInfoItem title={"Downtime Required"}
                  value={downtimeRequired}
                  flex={1} />)}
            </View>
          )}

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {contactType !== "" && (
              <DetailInfoItem title={"Contact Preference"}
                value={contactType}
                flex={1} />)}
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {remarks !== "" && (
              <DetailInfoItem title={"Remarks"}
                value={remarks}
                flex={1} />
            )}
          </View>



          {interactionReducer?.interactionSearchData?.[0]?.attachments?.length > 0 && (
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {/* Attachments View */}
              <DetailInfoAttachmentItem
                title={"Attachments"}
                attachmentData={[]}
              />
            </View>
          )}

        </View>
      </View>
    );
  };


  const PopUpMenuItem = (props) => {
    const { title, modalIndex } = props;
    return (
      <Pressable
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 10,
          padding: 15,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => {
          unstable_batchedUpdates(() => {
            setShowPopupMenu(!showPopupMenu);
            setShowBottomModal(true);
            setModalIndex(modalIndex);
          })
        }}
      >
        <Text
          style={{
            marginRight: 10,
            color: "#605879",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <Image
          style={{ tintColor: "#605879" }}
          source={require("../../Assets/icons/ic_right_arrow.png")}
        />
      </Pressable>
    );
  };

  const PopUpMenuDivider = () => {
    return (
      <Divider
        style={{
          borderWidth: 1,
          borderColor: "#848A93",
          borderStyle: "dashed",
          marginVertical: 10,
        }}
      />
    );
  };



  const showHideMenu = () => {

    setIntUserId(interactionReducer?.interactionSearchData[0]?.currentUser?.code)
    setIntRoleId(interactionReducer?.interactionSearchData[0]?.currentRole?.description?.roleId)
    setIntDeptId(interactionReducer?.interactionSearchData[0]?.currentDepartment?.description?.unitId)
    setIntStatus(interactionReducer?.interactionSearchData[0]?.intxnStatus?.code)

    console.log("currRoleId..", currRoleId)
    console.log("intRoleId..", intRoleId)
    console.log("currDeptId..", currDeptId)
    console.log("intDeptId..", intDeptId)
    console.log("currUserId..", currUserId)
    console.log("intUserId..", intUserId)

    if ((currRoleId == intRoleId) && (currDeptId == intDeptId) && (!(currUserId == intUserId))
      && (!(intStatus == "CLOSED")) && (!(intStatus == "CANCELLED"))) {
      console.log("1..........")
      showSelfAssign = true
    }

    if ((currRoleId == intRoleId) && (currDeptId == intDeptId) && (!(intUserId == ""))
      && (currUserId == intUserId) && (!(intStatus == "CLOSED"))
      && (!(intStatus == "CANCELLED"))) {
      console.log("2..........")
      showReassign = true
      showSelfAssign = false
      // showFollowUp = false
    }


    if ((currRoleId == intRoleId) && (currDeptId == intDeptId) && (!(intUserId == null))
      && (!(intUserId == "")) && (!(currUserId == intUserId))
      && (!(intStatus == "CLOSED")) && (!(intStatus == "CANCELLED"))) {
      console.log("3..........")
      showReassignToSelf = true
    }

    if (((currRoleId == intRoleId)) && ((currDeptId == intDeptId)) && ((!(intUserId == "")) && (!(intUserId == null)))
      && (!(currUserId == intUserId)) && (!(intStatus == "CLOSED")) && (!(intStatus == "CANCELLED"))) {
      console.log("4..........")
      // showFollowUp = true
      showSelfAssign = false
      showReassign = false
    }



    if ((!(currRoleId == intRoleId)) && ((!(intUserId == "")) && (!(intUserId == null)) && (currUserId == intUserId))) {
      console.log("5..........")
      showSelfAssign = false
      // showFollowUp = true
      showReassign = false
    }

    if (((currRoleId == intRoleId)) && ((currDeptId == intDeptId)) && ((currUserId == intUserId)) && (!(intStatus == "CLOSED")) && (!(intStatus == "CANCELLED"))) {
      showFollowUp = false
    }


    if (!(intStatus == "CANCELLED") && ((intStatus == "NEW"))) {
      console.log("6..........")
      showCancel = true
    }

    if (((currRoleId == intRoleId)) && ((currDeptId == intDeptId)) && (currUserId == intUserId)) {
      console.log("7..........")
      showEdit = true
    }

  }

  const PopUpMenu = (props) => {

    showHideMenu()

    console.log("showFollowUp..", showFollowUp)
    console.log("showSelfAssign..", showSelfAssign)
    console.log("showReassign..", showReassign)
    console.log("showReassignToSelf..", showReassignToSelf)
    console.log("showEdit..", showEdit)

    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 15,
          elevation: 10,
          zIndex: 99999999,
          margin: 20,
          alignSelf: "flex-end",
          position: "absolute",
          top: 40,
          right: 10,
        }}
      >

        {userType === USERTYPE.CUSTOMER ? (

          <View>
            {/* Follow up */}
            <PopUpMenuItem title={"Add followup"} modalIndex={1} />
          </View>

        ) : (

          <View>

            {/* Follow up */}
            {showFollowUp && (
              <PopUpMenuItem title={"Add followup"} modalIndex={1} />)}
            {showFollowUp && (
              <PopUpMenuDivider />)}

            {/* Assign to self */}
            {showSelfAssign && (
              <PopUpMenuItem title={"Assign to self"} modalIndex={2} />)}
            {showSelfAssign && (
              <PopUpMenuDivider />)}

            {/* Re-assign */}
            {showReassign && (
              <PopUpMenuItem title={"Re-Assign"} modalIndex={3} />)}
            {showReassign && (
              <PopUpMenuDivider />)}

            {/* Re-assign to self*/}
            {showReassignToSelf && (
              <PopUpMenuItem title={"Re-Assign To Self"} modalIndex={4} />)}
            {showReassignToSelf && (
              <PopUpMenuDivider />)}

            {/* Edit */}
            {showEdit && (
              <PopUpMenuItem title={"Edit"} modalIndex={5} />)}
            {showEdit && (
              <PopUpMenuDivider />)}

            {/* Cancel */}
            {showCancel && (
              <PopUpMenuItem title={"Cancel"} modalIndex={6} />)}

          </View>

        )}
      </View>
    );
  };


  const AddFollowUpModal = () => {
    const priorityList = get(masterReducer, "masterdataData.PRIORITY", []);
    const sourceList = get(masterReducer, "masterdataData.SOURCE", []);

    var sourceData = interactionReducer?.sourceData?.TICKET_SOURCE?.map(item => {
      return { description: item.value, code: item.code }
    })

    return (
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Add Follow up"}
        subtitle={`You have ${interactionReducer?.interactionFollowupData?.length} follow up`}
      >
        <KeyboardAvoidingView>
          <View style={{ paddingHorizontal: 10 }}>

            {priorityList.length > 0 && (
              <CustomDropDownFullWidth
                selectedValue={get(formPriority, "description", "")}
                data={priorityList}
                onChangeText={(text) => {
                  setFormPriority(text);
                }}
                value={get(formPriority, "code", "")}
                caption={strings.priority}
                placeHolder={"Select " + strings.priority}
              />
            )}


            {sourceList.length > 0 && (
              <CustomDropDownFullWidth
                selectedValue={get(formSource, "description", "")}
                data={sourceData}
                onChangeText={(text) => {
                  setSource(text)
                }}
                value={get(formSource, "code", "")}
                caption={strings.source}
                placeHolder={"Select " + strings.user}
              />
            )}

            <CustomInput
              value={formRemarks}
              caption={strings.remarks}
              placeHolder={strings.remarks}
              onChangeText={(text) => setFormRemarks(text)}
            />

            {/* Bottom Button View */}
            <View
              style={{
                flexDirection: "row",
                bottom: 0,
                marginTop: 20,
                backgroundColor: "white",
              }}
            >
              <View style={{ flex: 1 }}>
                <CustomButton
                  label={strings.cancel}
                  onPress={() => setShowBottomModal(false)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomButton
                  isDisabled={
                    (formRemarks === "" || get(formSource, 'code', '') === "" || get(formPriority, 'code', '') === "")
                  }
                  loading={followupLoader}
                  label={strings.submit}
                  onPress={async () => {
                    setFollowupLoader(true)
                    const intId = interactionID?.interactionSearchParams?.intxnNo
                    console.log("intId..", intId);
                    dispatch(
                      createFollowupForInteractionID(
                        interactionID?.interactionSearchParams?.intxnNo,
                        { formPriority, formSource, formRemarks },
                        navigation,
                        setShowBottomModal = { setShowBottomModal },
                        setResponseFlag = { setResponseFlag },
                        responseFlag
                      )
                    );

                    // refreshMenus()
                    setFollowupLoader(false)
                    resetFollup()
                    // setShowBottomModal(false)
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </FooterModel>
    );
  };

  const editModal = () => {
    var _statusData = []
    var statusArray = []
    console.log("statusData...", statusData)

    statusData?.map((node) => {
      node?.status?.map((st) => {
        statusArray.push(st)
      })
    })
    _statusData = [...new Map(statusArray.map(item => [item["code"], item])).values()]

    // interactionReducer?.statusData?.map(item => {
    //   item.status?.map(item2 => {
    //     _statusData.push({ description: item2?.description, code: item2?.code })
    //   })
    // })

    return (
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Edit Interaction"}
      >
        <View style={{ paddingHorizontal: 10 }}>

          <View style={{ paddingVertical: 10 }}>

            {_statusData.length > 0 && (
              <CustomDropDownFullWidth
                selectedValue={selStatusDesc}
                data={_statusData}
                onChangeText={(text) => {
                  var deptArr = []
                  var roleArr = []
                  var tempDeptArr = []
                  var tempRoleArr = []


                  // let entity = []
                  // interactionReducer?.statusData?.map((unit) => {
                  //   // console.log("status content...", unit)
                  //   for (const property in unit.status) {
                  //     // console.log("code content...", unit.status[property].code)
                  //     // console.log("text content...", text)
                  //     if (unit.status[property].code === text.code) {
                  //       entity.push(unit)
                  //       break
                  //     }
                  //   }
                  // })

                  // console.log("entity content...", entity)


                  interactionReducer?.statusData?.map(item => {
                    item?.status?.map(item2 => {
                      if (text.code == item2?.code) {
                        item?.entity?.map(item3 => {
                          tempDeptArr.push({ description: item3?.unitDesc, code: item3?.unitId })
                          deptArr = tempDeptArr.filter((ele, ind) => ind === tempDeptArr.findIndex(elem => elem.jobid === ele.jobid && elem.id === ele.id))
                        })

                        item?.roles?.map(item4 => {
                          tempRoleArr.push({ description: item4.roleDesc, code: item4.roleId })
                          roleArr = tempRoleArr.filter((ele, ind) => ind === tempRoleArr.findIndex(elem => elem.jobid === ele.jobid && elem.id === ele.id))
                        })
                      }
                    })
                  })


                  // statusData.map(item => {
                  //   if (text.code == item.status[0].code) {
                  //     deptArr.push({ description: item.entity[0].unitDesc, code: item.entity[0].unitId })
                  //     roleArr.push({ description: item.roles[0].roleDesc, code: item.roles[0].roleId })
                  //   }
                  // })

                  unstable_batchedUpdates(() => {
                    setDeptData(deptArr)
                    setRoleData(roleArr)
                    setStatusDesc(text?.description),
                      setStatusCode(text?.code)
                  })
                }}
                value={selStatusCode}
                caption={strings.status}
                placeHolder={"Select " + strings.status}
              />
            )}
          </View>

          <View style={{ paddingVertical: 10 }}>
            {_deptData.length > 0 && (
              <CustomDropDownFullWidth
                selectedValue={selDeptDesc}
                data={_deptData}
                onChangeText={(text) => {
                  unstable_batchedUpdates(() => {
                    setDeptDesc(text?.description),
                      setDeptCode(text?.code)
                  })
                }}
                value={selDeptCode}
                caption={strings.selectDepId}
                placeHolder={"Select " + strings.selectDepId}
              />
            )}
          </View>

          <View style={{ paddingVertical: 10 }}>
            {_roleData.length > 0 && (
              <CustomDropDownFullWidth
                selectedValue={selRoleDesc}
                data={_roleData}
                onChangeText={async (text) => {
                  unstable_batchedUpdates(() => {
                    setRoleDesc(text?.description),
                      setRoleCode(text?.code)
                    // setRoleCodeAction(!roleCodeAction)
                  })
                  await dispatch(
                    await fetchUsersByRole(text.code, selDeptCode, navigation)
                  )
                  console.log("interactionUsersByRoleData2 got..", interactionReducer.interactionUsersByRoleData);
                }}
                value={selRoleCode}
                caption={strings.role}
                placeHolder={"Select " + strings.role}
              />
            )}
          </View>

          <View style={{ paddingVertical: 10 }}>
            {interactionReducer?.interactionUsersByRoleData?.length > 0 && (
              <CustomDropDownFullWidth
                selectedValue={usersDesc}
                data={interactionReducer?.interactionUsersByRoleData}
                onChangeText={(text) => {
                  unstable_batchedUpdates(() => {
                    setUsersDesc(text?.description),
                      setUsersCode(text?.code)
                  })
                }}
                value={usersCode}
                caption={strings.user}
                placeHolder={"Select " + strings.user}
              />
            )}
          </View>

          <View style={{ paddingVertical: 2, marginTop: 20 }}>
            <CustomInput
              value={moment(selTechCompDate).format(
                "YYYY-MM-DD"
              )}
              caption={"Date of Tech Completion"}
              onFocus={() => setOpenTechCompDatePicker(true)}
              placeHolder={""}
              right={
                <TextInput.Icon
                  onPress={() => setOpenTechCompDatePicker(true)}
                  style={{ width: 23, height: 23 }}
                  theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                  icon={"calendar"}
                />
              }
            />
            <DatePicker
              modal
              mode="date"
              open={openTechCompDatePicker}
              onCancel={() => setOpenTechCompDatePicker(false)}
              date={selTechCompDate}
              onConfirm={(params) => {
                unstable_batchedUpdates(() => {
                  setSelTechCompDate(params)
                  setOpenTechCompDatePicker(false);
                })
              }}
            />
          </View>

          <View style={{ paddingVertical: 2, marginTop: 20 }}>
            <CustomInput
              value={moment(selDepCompDate).format(
                "YYYY-MM-DD"
              )}
              caption={"Date of Deployment"}
              onFocus={() => setOpenDepCompDatePicker(true)}
              placeHolder={""}
              right={
                <TextInput.Icon
                  onPress={() => setOpenDepCompDatePicker(true)}
                  style={{ width: 23, height: 23 }}
                  theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                  icon={"calendar"}
                />
              }
            />
            <DatePicker
              modal
              mode="date"
              open={openDepCompDatePicker}
              onCancel={() => setOpenDepCompDatePicker(false)}
              date={selDepCompDate}
              onConfirm={(params) => {
                unstable_batchedUpdates(() => {
                  setSelDepCompDate(params)
                  setOpenDepCompDatePicker(false);
                })
              }}
            />
          </View>

          <View style={{ paddingVertical: 2, marginTop: 20 }}>
            <CustomInput
              value={moment(selBiCompDate).format(
                "YYYY-MM-DD"
              )}
              caption={"BI Completion Date"}
              onFocus={() => setOpenBiCompDatePicker(true)}
              placeHolder={""}
              right={
                <TextInput.Icon
                  onPress={() => setOpenBiCompDatePicker(true)}
                  style={{ width: 23, height: 23 }}
                  theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                  icon={"calendar"}
                />
              }
            />
            <DatePicker
              modal
              mode="date"
              open={openBiCompDatePicker}
              onCancel={() => setOpenBiCompDatePicker(false)}
              date={selBiCompDate}
              onConfirm={(params) => {
                unstable_batchedUpdates(() => {
                  setSelBiCompDate(params)
                  setOpenBiCompDatePicker(false);
                })
              }}
            />
          </View>

          <View style={{ paddingVertical: 2, marginTop: 20 }}>
            <CustomInput
              value={moment(selQaCompDate).format(
                "YYYY-MM-DD"
              )}
              caption={"QA Completion Date"}
              onFocus={() => setOpenQaCompDatePicker(true)}
              placeHolder={""}
              right={
                <TextInput.Icon
                  onPress={() => setOpenQaCompDatePicker(true)}
                  style={{ width: 23, height: 23 }}
                  theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                  icon={"calendar"}
                />
              }
            />
            <DatePicker
              modal
              mode="date"
              open={openQaCompDatePicker}
              onCancel={() => setOpenQaCompDatePicker(false)}
              date={selQaCompDate}
              onConfirm={(params) => {
                unstable_batchedUpdates(() => {
                  setSelQaCompDate(params)
                  setOpenQaCompDatePicker(false);
                })
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 20
            }}
          >
            <Text style={{ alignSelf: "center", color: "#000", marginRight: 10, marginLeft: 10 }}>
              Downtime Required
            </Text>

            <CustomSwitch
              buttonWidth={20}
              buttonPadding={10}
              switchWidth={120}
              startOnLeft={isNoSelected}
              onSwitch={onToggleSwitch}
              onSwitchReverse={onToggleSwitch}
              buttonColor={"#4a5996"}
              switchBackgroundColor={"#EBEDEF"}
              switchLeftText={"No"}
              switchLeftTextStyle={{
                color: "#4a5996",
                fontSize: 14,
                fontWeight: 600,
              }}
              switchRightText={"Yes"}
              switchRightTextStyle={{
                color: "#4a5996",
                fontSize: 14,
                fontWeight: 600,
              }}
            />
          </View>

          {/* <View style={{ paddingVertical: 2, marginTop: 10 }}>
              <CustomInput
                value={moment(selDate).format(
                  "YYYY-MM-DD"
                )}
                caption={"Downtime Required"}
                onFocus={() => setDowntimeRequired(true)}
                placeHolder={""}
                right={
                  <TextInput.Icon
                    onPress={() => setDowntimeRequired(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: Colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />
              <DatePicker
                modal
                mode="date"
                open={openDatePicker}
                onCancel={() => setDowntimeRequired(false)}
                date={selDate}
                onConfirm={(params) => {
                  unstable_batchedUpdates(() => {
                    setSelDate(params)
                    setDowntimeRequired(false);
                  })
                }}
              />
            </View> */}

          <CustomInput
            style={{ marginTop: 30 }}
            value={enteredRemarks}
            caption={strings.remarks}
            placeHolder={strings.remarks}
            onChangeText={(text) => {
              setRemarks(text)
            }
            }
          />

          <ImagePicker
            attachmentModalVisible={attachmentModalVisible}
            setAttachmentModalVisible={setAttachmentModalVisible}
            fileAttachments={fileAttachments}
            setFileAttachments={setFileAttachments}
          />

          {/* Bottom Button View */}
          <View
            style={{
              flexDirection: "row",
              bottom: 0,
              marginTop: 20,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomButton
                label={strings.cancel}
                onPress={() => setShowBottomModal(false)}
              />
            </View>

            <View style={{ flex: 1 }}>
              <CustomButton label={strings.submit} onPress={async () => {
                if (enteredRemarks === "") {
                  // showErrorMessage(strings.pls_enter_remarks)
                  Toast.show({
                    type: "bctError",
                    text1: strings.pls_enter_remarks,
                  });
                }
                else {
                  var attachments = await getDataFromDB("ATTACHMENTS")
                  var _attachments = []
                  if (attachments.includes("~")) {
                    _attachments = attachments.split("~")
                  }
                  else {
                    _attachments.push(attachments)
                  }

                  console.log("edit retrive attachments1.." + attachments)
                  console.log("edit retrive attachments2.." + _attachments)

                  dispatch(
                    updateInteraction(
                      interactionID?.interactionSearchParams?.intxnNo,
                      usersCode,
                      selDeptCode,
                      selRoleCode,
                      selStatusCode,
                      enteredRemarks,
                      setShowBottomModal = { setShowBottomModal },
                      setResponseFlag = { setResponseFlag },
                      responseFlag,
                      moment(selTechCompDate).format("YYYY-MM-DD"),
                      moment(selDepCompDate).format("YYYY-MM-DD"),
                      moment(selBiCompDate).format("YYYY-MM-DD"),
                      moment(selQaCompDate).format("YYYY-MM-DD"),
                      downtimeRequired,
                      _attachments
                    )
                  )
                }
              }} />
            </View>

          </View>
        </View>
      </FooterModel>
    );
  };


  const assignToSelfModal = () => {
    return (
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Assign To Self"}
      >
        <View style={{ paddingHorizontal: 10 }}>

          <Text
            variant="labelMedium"
            style={{ color: "#000000", margin: 10, alignSelf: "baseline", fontSize: 15 }}
          >
            Are sure you want to assign yourself to the interaction ?
          </Text>

          {/* Bottom Button View */}
          <View
            style={{
              flexDirection: "row",
              bottom: 0,
              marginTop: 20,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomButton
                label={strings.cancel}
                onPress={() => setShowBottomModal(false)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton label={strings.submit} onPress={() => {
                // await submit();
                dispatch(assignInteractionToSelf(
                  interactionReducer?.interactionSearchData?.[0]?.intxnNo,
                  "",
                  "SELF",
                  setShowBottomModal = { setShowBottomModal },
                  setResponseFlag = { setResponseFlag },
                  responseFlag
                ))

                // setShowBottomModal(false)

              }} />
            </View>
          </View>
        </View>
      </FooterModel>
    );
  };

  const ReAssignModal = () => {
    return (
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Re-assign"}
      >
        <View style={{ paddingHorizontal: 10 }}>

          <View style={{ paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={usersDesc}
              data={interactionReducer?.interactionUsersByRoleData}
              onChangeText={(text) => {
                setUsersDesc(text?.description),
                  setUsersCode(text?.code)
              }}
              value={usersCode}
              caption={strings.user}
              placeHolder={"Select " + strings.user}
            />

            {/* {interactionType.error && showErrorMessage(interactionType.error)} */}
          </View>


          {/* Bottom Button View */}
          <View
            style={{
              flexDirection: "row",
              bottom: 0,
              marginTop: 20,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomButton
                label={strings.cancel}
                onPress={() => setShowBottomModal(false)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton label={strings.submit} onPress={() => {
                dispatch(assignInteractionToSelf(
                  interactionReducer?.interactionSearchData?.[0]?.intxnNo,
                  "" + usersCode,
                  "REASSIGN",
                  setShowBottomModal = { setShowBottomModal },
                  setResponseFlag = { setResponseFlag },
                  responseFlag
                ))
                // refreshMenus()
                // setShowBottomModal(false)
              }} />
            </View>
          </View>
        </View>
      </FooterModel>
    );
  };


  const ReAssignToSelfModal = () => {
    return (
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Re-assign To Self"}
      >
        <View style={{ paddingHorizontal: 10 }}>

          <Text
            variant="labelMedium"
            style={{ color: "#000000", margin: 10, alignSelf: "baseline", fontSize: 15 }}
          >
            Are You Sure Want To Re Assign To Self ?
          </Text>

          {/* Bottom Button View */}
          <View
            style={{
              flexDirection: "row",
              bottom: 0,
              marginTop: 20,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomButton
                label={strings.cancel}
                onPress={() => setShowBottomModal(false)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton label={strings.submit} onPress={() => {
                dispatch(assignInteractionToSelf(
                  interactionID?.interactionSearchParams?.intxnNo,
                  "" + "",
                  "REASSIGN_TO_SELF",
                  setShowBottomModal = { setShowBottomModal },
                  setResponseFlag = { setResponseFlag },
                  responseFlag
                ))
                // refreshMenus()
                // setShowBottomModal(false)
              }} />
            </View>
          </View>
        </View>
      </FooterModel>
    );
  };


  const cancelModal = () => {
    return (
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Cancel Interaction"}
      >
        <View style={{ paddingHorizontal: 10 }}>

          <View style={{ paddingVertical: 10 }}>
            <CustomDropDownFullWidth
              selectedValue={cancelReasonDesc}
              data={
                interactionReducer.interactionCancelReasonsData.data.INTXN_STATUS_REASON.map(item => {
                  return { description: item?.description, code: item?.code }
                })
              }
              onChangeText={(text) => {
                setCancelReasonDesc(text?.description),
                  setCancelReasonCode(text?.code)
              }}
              value={cancelReasonCode}
              caption={strings.cancel_reason}
              placeHolder={"Select " + strings.cancel_reason}
            />

            {/* {interactionType.error && showErrorMessage(interactionType.error)} */}
          </View>


          {/* Bottom Button View */}
          <View
            style={{
              flexDirection: "row",
              bottom: 0,
              marginTop: 20,
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1 }}>
              <CustomButton
                label={strings.cancel}
                onPress={() => setShowBottomModal(false)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomButton label={strings.submit} onPress={() => {
                // dispatch(assignInteractionToSelf(interactionID.interactionSearchParams.intxnNo, "" + "", "REASSIGN_TO_SELF"))
                // dispatch(cancelInteraction(cancelReasonCode))
                dispatch(
                  cancelInteraction(
                    cancelReasonCode,
                    interactionID?.interactionSearchParams?.intxnNo,
                    setShowBottomModal = { setShowBottomModal },
                    setResponseFlag = { setResponseFlag },
                    responseFlag)
                )
                // refreshMenus()
                // setShowBottomModal(false)
              }} />
            </View>
          </View>
        </View>
      </FooterModel>
    );
  };




  const priorityList = get(masterReducer, "masterdataData.PRIORITY", []);
  const sourceList = get(masterReducer, "masterdataData.SOURCE", []);
  const orderLen = get(orderReducer, 'orderListData.length', 0)



  const checkPermission = async (fileName) => {
    console.log("inside checkPermission...")

    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      console.log("inside android...")
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile(fileName);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };


  const downloadFile = (fileName) => {

    console.log("inside downloadFile...")

    console.log("download attachment got2..", interactionReducer.intxnDownloadAttachmentData);

    if (interactionReducer?.intxnDownloadAttachmentData?.url !== undefined) {
      // Get today's date to add the time suffix in filename
      let date = new Date();

      console.log("url fetched...", interactionReducer?.intxnDownloadAttachmentData?.url)

      // File URL which we want to download
      let FILE_URL = interactionReducer?.intxnDownloadAttachmentData?.url;

      console.log("FILE_URL...", FILE_URL)

      // Function to get extention of the file url
      // let file_ext = getFileExtention(fileName);

      let file_ext = fileName.split(".");
      file_ext = '.' + file_ext[1];

      // config: To get response by passing the downloading related options
      // fs: Root directory path to download
      const { config, fs } = RNFetchBlob;
      let RootDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path:
            RootDir +
            '/dtworks/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext,
          description: 'downloading file...',
          notification: true,
          // useDownloadManager works with Android only
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
          // Alert after successful downloading
          console.log('res -> ', JSON.stringify(res));
          alert('File Downloaded Successfully.');
        });
    }
  };


  function WriteBase64ToFile(Base64) {
    let date = new Date();
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir
    let path = RootDir + '/dtworks/file_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ".png"
    // let path = dirs.DCIMDir + "PATH/TO/FILE.png"
    RNFetchBlob.fs.writeFile(path, Base64, 'base64')
      .then((result) => {
        // console.log("File has been saved to:" + result)
        alert("File Downloaded Successfully.");
      })
      .catch(error => console.log(err))
  }

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };



  return (
    <View style={styles.container}>

      {loader && <LoadingAnimation />}

      {showPopupMenu && <PopUpMenu />}

      <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
        {/* Interaction Details View Full Container */}
        <DetailsInfoUIFull />

        {(interactionID?.interactionSearchParams?.formDetails !== null) && (interactionID?.interactionSearchParams?.formDetails !== undefined) && (
          <View style={{ flexDirection: "column", marginTop: 15 }}>
            <FlatList
              initialNumToRender={1}
              showsHorizontalScrollIndicator={false}
              data={[
                { title: `Requirement Details` },
              ]}
              renderItem={({ item, index }) => (
                <HorizontalFlatListItem2 item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}

        {/* Flatlist Horizontal view */}
        <View style={{ flexDirection: "column", marginTop: 15 }}>
          <FlatList
            initialNumToRender={1}
            showsHorizontalScrollIndicator={false}
            data={[
              // { title: `Appointment${"\n"}Details` },
              { title: `Workflow History` },
            ]}
            renderItem={({ item, index }) => (
              <HorizontalFlatListItem item={item} index={index} />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>

        {orderLen != 0 &&
          <View style={{ flex: 1 }}>
            <CustomButton
              label={"View order"}
              onPress={() => navigation.navigate("ViewOrder")}
            />
          </View>
        }

        {(interactionReducer?.intxnAttachmentData !== undefined) && (interactionReducer?.intxnAttachmentData?.length > 0) && (
          <Text
            variant="bodyMedium"
            numberOfLines={1}
            style={{
              fontWeight: 700,
              fontSize: 16,
              width: 100,
              color: colors.secondary,
              flex: 2,
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            Attachments
          </Text>
        )}

        {(interactionReducer?.intxnAttachmentData !== undefined) && (interactionReducer?.intxnAttachmentData?.length > 0) && (
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <FlatList
              initialNumToRender={1}
              showsHorizontalScrollIndicator={false}
              data={interactionReducer.intxnAttachmentData}
              renderItem={({ item, index }) => (
                <AttachmentFlatListItem item={item} index={index} />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}

      </ScrollView>

      {showBottomModal && modalIndex === 1 && AddFollowUpModal()}

      {showBottomModal && modalIndex === 2 && assignToSelfModal()}

      {showBottomModal && modalIndex === 3 && ReAssignModal()}

      {showBottomModal && modalIndex === 4 && ReAssignToSelfModal()}

      {showBottomModal && modalIndex === 5 && editModal()}

      {showBottomModal && modalIndex === 6 && cancelModal()}

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: 50,
  },
  scrollviewContainer: {
    margin: 15,
    backgroundColor: "#F0F0F0",
  },
});
export default InteractionDetails;
