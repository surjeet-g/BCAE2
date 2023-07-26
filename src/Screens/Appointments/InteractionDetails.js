import get from "lodash.get";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";
import {
  getMasterData,
  MASTER_DATA_CONSTANT
} from "../../Redux/masterDataDispatcher";
import { getOrderListData } from '../../Redux/OrderListDispatcher';
import { strings } from "../../Utilities/Language";
import { navBar } from "../../Utilities/Style/navBar";
import AttachmentItem from "./../../Components/AttachmentItem";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";
import { CustomInput } from "./../../Components/CustomInput";
import { FooterModel } from "./../../Components/FooterModel";
import {
  createFollowupForInteractionID,
  getFollowupForInteractionID,
  getInteractionDetailsForID,
  getWorkFlowForInteractionID
} from "./../../Redux/InteractionDispatcher";
import {
  getUserType,
  USERTYPE
} from "./../../Utilities/UserManagement/userInfo";
const InteractionDetails = (props) => {
  const { route, navigation } = props;
  let { interactionID } = route.params
  interactionID = parseInt(interactionID)
  // let interactionID = parseInt(167)
  const { colors } = useTheme();
  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(1);
  const [userType, setUserType] = useState("");
  const [formPriority, setFormPriority] = useState({});
  const [formSource, setSource] = useState({});
  const [formRemarks, setFormRemarks] = useState("");

  const [followupLoader, setFollowupLoader] = useState(false)

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
    getOrderListData
  ]);

  let masterReducer = useSelector((state) => state.masterdata);
  let interactionReducer = useSelector((state) => state.interaction);
  let orderReducer = useSelector((state) => state.orderList);

  const {
    InteractionDetailsData,
    InteractionWorkFlowData,
    InteractionFollowupData,
  } = interactionReducer;

  console.log("interaction", InteractionDetailsData)
  // Calling API to get interaction details & workflow/followup data
  useEffect(async () => {
    //fetch order list or enble button
    // dispatch(getOrderListData(navigation, 1, 0));
    console.log("interactionL firt", interactionID)
    dispatch(getInteractionDetailsForID(interactionID, navigation));

    dispatch(getWorkFlowForInteractionID(interactionID));

    dispatch(getFollowupForInteractionID(interactionID));

    const { PRIORITY, SOURCE } = MASTER_DATA_CONSTANT;

    dispatch(getMasterData(`${PRIORITY},${SOURCE}`));

    let userType = await getUserType();
    setUserType(userType);
  }, [interactionID]);

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
  const HorizontalFlatListItem = (props) => {
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
              numberOfLines={2}
              style={{
                fontWeight: 700,
                fontSize: 16,
                width: 100,
                color: colors.secondary,
                flex: 2,
                marginRight: 5,
              }}
            >
              {item.title || "No Name"}
            </Text>

            <Image
              source={require("../../Assets/icons/frequent_interaction.png")}
              style={{ width: 50, height: 50, flex: 1 }}
            />
          </View>
          {/* View More view */}
          <Pressable
            onPress={() => {
              if (index == 0) {
                navigation.navigate("AppointmentDetails");
              } else if (index == 1) {
                navigation.navigate("WorkflowHistory");
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                justifyContent: "space-between",
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
                View More
              </Text>
              <Image
                source={require("../../Assets/icons/ic_right_arrow.png")}
                style={{ marginLeft: 10, tintColor: "#EFA848" }}
              />
            </View>
          </Pressable>
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
              fontWeight: 600,
              fontSize: 16,
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
                "DD MMMM YYYY, hh:mm A"
              )}
              flex={2}
            />

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
              value={InteractionFollowupData.length}
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
          setShowPopupMenu(!showPopupMenu);
          setShowBottomModal(true);
          setModalIndex(modalIndex);
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

  const PopUpMenu = (props) => {
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
            {/* <PopUpMenuDivider /> */}
            {/* Assign to self */}
            <PopUpMenuItem title={"Assign to self"} modalIndex={2} />
            <PopUpMenuDivider />
            {/* Re-assign */}
            <PopUpMenuItem title={"Re-Assign"} modalIndex={3} />
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
        subtitle={`You have ${InteractionFollowupData.length} follow up`}
      >
        <KeyboardAvoidingView>
          <View style={{ paddingHorizontal: 10 }}>
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
                    await dispatch(
                      createFollowupForInteractionID(
                        interactionID.toString(),
                        { formPriority, formSource, formRemarks },
                        navigation
                      )
                    );
                    setFollowupLoader(false)
                    resetFollup()
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </FooterModel>
    );
  };

  const AssignToSelfModal = () => {
    return (
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Assign to self"}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.current_dept_role}
            placeHolder={"Select " + strings.current_dept_role}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.user}
            placeHolder={"Select " + strings.user}
          />
          <CustomInput
            value={""}
            caption={strings.remarks}
            placeHolder={strings.remarks}
            onChangeText={(text) => console.log(text)}
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
              <CustomButton label={strings.submit} onPress={() => { }} />
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
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.current_dept_role}
            placeHolder={"Select " + strings.current_dept_role}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.user}
            placeHolder={"Select " + strings.user}
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
              <CustomButton label={strings.submit} onPress={() => { }} />
            </View>
          </View>
        </View>
      </FooterModel>
    );
  };
  const priorityList = get(masterReducer, "masterdataData.PRIORITY", []);
  const sourceList = get(masterReducer, "masterdataData.SOURCE", []);
  const orderLen = get(orderReducer, 'orderListData.length', 0)
  return (
    <View style={styles.container}>
      {showPopupMenu && <PopUpMenu />}

      <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
        {/* Interaction Details View Full Container */}
        <DetailsInfoUIFull />
        {/* Flatlist Horizontal view */}
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <FlatList
            horizontal
            initialNumToRender={2}
            showsHorizontalScrollIndicator={false}
            data={[
              { title: `Appointment${"\n"}Details` },
              { title: `Workflow${"\n"}History` },
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
      </ScrollView>

      {showBottomModal && modalIndex === 1 && AddFollowUpModal()}
      {showBottomModal && modalIndex === 2 && AssignToSelfModal()}
      {showBottomModal && modalIndex === 3 && ReAssignModal()}
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
