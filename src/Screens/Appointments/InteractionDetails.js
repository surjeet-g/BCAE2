import get from "lodash.get";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
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
import { Divider, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import { CustomButton } from "../../Components/CustomButton";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { getOrderListData } from '../../Redux/OrderListDispatcher';
import {
  MASTER_DATA_CONSTANT,
  getMasterData
} from "../../Redux/masterDataDispatcher";
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

  console.log("props received...", props)
  interactionID = interactionSearchParams

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

      await dispatch(await getFollowupForInteractionID(interactionReducer?.interactionSearchData?.[0].intxnNo));
      console.log("InteractionFollowupData..", interactionReducer?.interactionFollowupData)

      await dispatch(await getWorkFlowForInteractionID(interactionReducer?.interactionSearchData?.[0].intxnNo));
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
    getAttachmentList
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


  // Calling API to get interaction details & workflow/followup data
  useEffect(() => {
    async function getData() {
      setLoader(true)
      setCurrUserId(await getUserId())
      setCurrRoleId(await getDataFromDB(storageKeys.CURRENT_ROLE_ID))
      setCurrDeptId(await getDataFromDB(storageKeys.CURRENT_DEPT_ID))

      let params = {
        searchParams: {
          interactionNumber: interactionID?.interactionSearchParams?.intxnNo,
        }
      }
      await dispatch(await getInteractionDetailsSearch(params, navigation))
      setInteractionDetails(interactionReducer?.interactionSearchData?.[0])

      await dispatch(await getFollowupForInteractionID(interactionReducer?.interactionSearchData?.[0].intxnNo));
      console.log("InteractionFollowupData..", interactionReducer?.interactionFollowupData)

      await dispatch(await getWorkFlowForInteractionID(interactionReducer?.interactionSearchData?.[0].intxnNo));
      console.log("InteractionWorkFlowData..", InteractionWorkFlowData)

      await dispatch(await getInteractionDetailsForID(interactionReducer?.interactionSearchData?.[0].intxnId, navigation));
      console.log("InteractionDetailsData..", InteractionDetailsData)

      //fetch order list or enble button
      // dispatch(getOrderListData(navigation, 1, 0));
      // console.log("interactionL firt", interactionReducer?.interactionSearchData?.[0].intxnId)

      const { PRIORITY, SOURCE } = MASTER_DATA_CONSTANT;
      dispatch(getMasterData(`${PRIORITY},${SOURCE}`));

      await dispatch(await fetchUsersByRole(interactionReducer?.interactionSearchData?.[0].currentRole.description.roleId, interactionID.interactionSearchParams.currentDepartment.description.unitId, navigation))
      console.log("interactionUsersByRoleData got..", interactionReducer.interactionUsersByRoleData);

      await dispatch(await fetchStatus(interactionID.interactionSearchParams.intxnUuid, "INTERACTION"))

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

      await dispatch(await getAttachmentList(interactionReducer?.interactionSearchData?.[0].intxnUuid))
      console.log("getAttachmentList got..", interactionReducer.intxnAttachmentData);
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
              <Pressable onPress={() => setShowPopupMenu(!showPopupMenu)}>
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
      final.push(`${item.description}`)
      return;
    })
    return final.join(`,\n`)
  }

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
              console.log("download attachment got..", interactionReducer.intxnDownloadAttachmentData);
              if (interactionReducer.intxnDownloadAttachmentData == {}) {
                console.log("image not downloaded yet...")
              }
              else {
                checkPermission(item.fileName)
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
    console.log("data", InteractionDetailsData)
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
          Interaction ID: {InteractionDetailsData?.intxnNo}
        </Text>

        <View
          style={{
            padding: 20,
          }}
        >
          {/* Row 1 */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {/* Statement View */}
            <DetailInfoItem
              title={"Statement"}
              value={InteractionDetailsData?.requestStatement}
              flex={1}
            />
          </View>

          {/* Row 2*/}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* Date & Time View */}
            <DetailInfoItem
              title={"Created Date & time"}
              value={moment(InteractionDetailsData?.createdAt).format(
                "DD MMM YYYY, hh:mm A"
              )}
              flex={2}
            />
          </View>

          {/* Row 2*/}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* Service Type View */}
            <DetailInfoItem
              title={"Service type"}
              value={InteractionDetailsData?.serviceType?.description}
              flex={1}
            />
          </View>

          {/* Row 3*/}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* Interaction Type View */}
            <DetailInfoItem
              title={"Interaction Type"}
              value={InteractionDetailsData?.intxnType?.description}
              flex={2}
            />

            {/* Priority View */}
            <DetailInfoItem
              title={"Priority"}
              value={InteractionDetailsData?.intxnPriority?.description}
              flex={1}
            />
          </View>

          {/* Row 4*/}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* Problem Statement View */}
            <DetailInfoItem
              title={"Service Category"}
              value={InteractionDetailsData?.serviceCategory?.description}
              flex={2}
            />

            {/* Status View */}
            <DetailInfoItem
              title={"Status"}
              value={InteractionDetailsData?.intxnStatus?.description}
              flex={1}
            />
          </View>

          {/* Row 5*/}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* Contact type View */}
            <DetailInfoItem title={"Contact Type"} value={handleMutiContactPer(InteractionDetailsData?.contactPreference)} flex={2} />

            {/*Follow up View */}
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

          {/* Row 6*/}
          {InteractionDetailsData?.attachments?.length > 0 && (
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

    setIntUserId(interactionReducer.interactionSearchData[0].currentUser.code)
    setIntRoleId(interactionReducer.interactionSearchData[0].currentRole.description.roleId)
    setIntDeptId(interactionReducer.interactionSearchData[0].currentDepartment.description.unitId)
    setIntStatus(interactionReducer.interactionSearchData[0].intxnStatus.code)

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
                data={sourceList}
                onChangeText={(text) => {
                  setSource(text);
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
                    const intId = interactionID.interactionSearchParams.intxnNo
                    console.log("intId..", intId);
                    dispatch(
                      createFollowupForInteractionID(
                        interactionID.interactionSearchParams.intxnNo,
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
    console.log("statusData...", statusData)
    interactionReducer?.statusData?.map(item => {
      item.status?.map(item2 => {
        _statusData.push({ description: item2?.description, code: item2?.code })
      })
    })

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

                  interactionReducer?.statusData?.map(item => {
                    item?.status?.map(item2 => {
                      if (text.code == item2?.code) {
                        item?.entity?.map(item3 => {
                          deptArr.push({ description: item3?.unitDesc, code: item3?.unitId })
                        })

                        item?.roles?.map(item4 => {
                          roleArr.push({ description: item4.roleDesc, code: item4.roleId })
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
                    setStatusDesc(text.description),
                      setStatusCode(text.code)
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
                    setDeptDesc(text.description),
                      setDeptCode(text.code)
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
                onChangeText={(text) => {
                  unstable_batchedUpdates(() => {
                    setRoleDesc(text.description),
                      setRoleCode(text.code)
                    // setRoleCodeAction(!roleCodeAction)
                  })
                  dispatch(
                    fetchUsersByRole(text.code, selDeptCode, navigation)
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
                    setUsersDesc(text.description),
                      setUsersCode(text.code)
                  })
                }}
                value={usersCode}
                caption={strings.user}
                placeHolder={"Select " + strings.user}
              />
            )}
          </View>

          <CustomInput
            value={enteredRemarks}
            caption={strings.remarks}
            placeHolder={strings.remarks}
            onChangeText={(text) => {
              setRemarks(text)
            }
            }
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
              <CustomButton label={strings.submit} onPress={() => {
                dispatch(
                  updateInteraction(
                    interactionID.interactionSearchParams.intxnNo,
                    usersCode,
                    selDeptCode,
                    selRoleCode,
                    selStatusCode,
                    enteredRemarks,
                    setShowBottomModal = { setShowBottomModal },
                    setResponseFlag = { setResponseFlag },
                    responseFlag
                  )
                )
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
            style={{ margin: 10, alignSelf: "baseline", fontSize: 15 }}
          >
            Are You Sure Want To Assign To Self ?
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
                setUsersDesc(text.description),
                  setUsersCode(text.code)
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
            style={{ margin: 10, alignSelf: "baseline", fontSize: 15 }}
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
                  interactionID.interactionSearchParams.intxnNo,
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
                  return { description: item.description, code: item.code }
                })
              }
              onChangeText={(text) => {
                setCancelReasonDesc(text.description),
                  setCancelReasonCode(text.code)
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
                    interactionID.interactionSearchParams.intxnNo,
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

    // Get today's date to add the time suffix in filename
    let date = new Date();

    // File URL which we want to download
    let FILE_URL = interactionReducer.intxnDownloadAttachmentData.url;

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
  };


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
        {/* Flatlist Horizontal view */}
        <View style={{ flexDirection: "row", marginTop: 15 }}>
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
        {interactionReducer.intxnAttachmentData.length > 0 && (
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
