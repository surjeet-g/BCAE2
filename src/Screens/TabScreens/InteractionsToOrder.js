import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";
import {
  color,
  DEFAULT_PROFILE_IMAGE,
  fontSizes,
  spacing,
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";
import { CustomInput } from "./../../Components/CustomInput";
var { height, width } = Dimensions.get("screen");

import { getKnowledgeSearchData } from "../../Redux/KnowledgeSearchDispatcher.js";

import {
  addInteractionAction,
  fetchInteractionAction,
  updateInteractionAction,
} from "../../Redux/InteractionDispatcher";

import { TouchableOpacity } from "react-native-gesture-handler";
import {
  setInteractionFormField,
  setInteractionReset,
} from "../../Redux/InteractionAction";

import get from "lodash.get";
import { ClearSpace } from "../../Components/ClearSpace";
import { FooterModel } from "../../Components/FooterModel";
import LoadingAnimation from "../../Components/LoadingAnimation";
import {
  getMasterData,
  MASTER_DATA_CONSTANT,
} from "../../Redux/masterDataDispatcher";
import { fetchSavedProfileData } from "../../Redux/ProfileDispatcher";
import { handleMultipleContact } from "../../Utilities/utils";
import { showErrorMessage } from "../Register/components/RegisterPersonal";

const InteractionsToOrder = ({ route, navigation }) => {
  const [loader, setLoader] = useState(true);
  const { colors, fonts, roundness } = useTheme();
  const [open, setOpen] = useState(false);
  const [knowledgeSearchText, setKnowledgeSearchText] = useState("");
  // const interactionsModalSnapPoints = useMemo(() => ["13%", "90%"], []);
  const interactionsModalSnapPoints = useMemo(() => ["100%", "100%"], []);
  let interactionRedux = useSelector((state) => state.interaction);
  let knowledgeSearchStore = useSelector((state) => state.knowledgeSearch);

  // ref
  const interactionsModalRef = useRef(BottomSheet);
  // variables

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    setIsEnableInteractions(index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    console.log(">>handleSnapPress", index);
    interactionsModalRef.current?.snapToIndex(index);
  }, []);
  const handleExpandPress = useCallback(() => {
    interactionsModalRef.current?.expand();
  }, []);
  const handleCollapsePress = useCallback(() => {
    interactionsModalRef.current?.collapse();
  }, []);
  const handleClosePress = useCallback(() => {
    interactionsModalRef.current?.close();
  }, []);

  const [isEnableInteractions, setIsEnableInteractions] = useState(false);

  const masterDispatch = useDispatch([getMasterData]);
  const profileDispatch = useDispatch([fetchSavedProfileData]);
  const dispatchInteraction = useDispatch([
    setInteractionReset,
    fetchInteractionAction,
    updateInteractionAction,
    addInteractionAction,
  ]);
  const knowledgeSearchDispatch = useDispatch([getKnowledgeSearchData]);

  const { profileReducer, masterReducer, interactionReducer } = useSelector(
    (state) => {
      return {
        profileReducer: state.profile,
        masterReducer: state.masterdata,
        interactionReducer: state.interaction,
      };
    }
  );

  let mostfrequentlylist = get(
    interactionReducer,
    "InteractionData.mostfrequently.rows",
    []
  );

  //to do check response
  const frequertlyquestionList = get(
    interactionReducer,
    "InteractionData.frequerntlyAsked",
    []
  );

  useEffect(() => {
    async function fetchMyAPI() {
      const { SERVICE_TYPE, INTXN_TYPE, PRIORITY, CONTACT_TYPE, PROBLEM_CODE } =
        MASTER_DATA_CONSTANT;
      MASTER_DATA_CONSTANT.SERVICE_TYPE;
      await dispatchInteraction(fetchInteractionAction(true));
      await profileDispatch(fetchSavedProfileData(navigation));
      setLoader(false);
      //master only invoke load
      masterDispatch(
        getMasterData(
          `${INTXN_TYPE},${SERVICE_TYPE},${PROBLEM_CODE},${CONTACT_TYPE},${PRIORITY}`
        )
      );
    }
    fetchMyAPI();
  }, []);

  const customerPic =
    get(profileReducer, "savedProfileData.customerPhoto", null) ??
    DEFAULT_PROFILE_IMAGE;
  const addresss = get(profileReducer, "savedProfileData.customerAddress", []);

  const onToggleInteractionSwitch = () => {
    if (isEnableInteractions) {
      handleSnapPress(0);
    } else {
      handleSnapPress(1);
    }
    setIsEnableInteractions(!isEnableInteractions);
  };

  const onCancelPressed = () => {
    alert("Cancel Clicked");
  };

  const onSubmitPressed = () => {
    alert("Submit Clicked");
  };
  const onChangeKnowledgeSearchText = (text) => {
    setKnowledgeSearchText(text);
  };
  const onClickKnowledgeSearch = () => {
    knowledgeSearchDispatch(
      getKnowledgeSearchData(knowledgeSearchText, navigation)
    );
  };

  const renderMostFrequent = useMemo(() => {
    if (mostfrequentlylist.length == 0) return null;
    mostfrequentlylist = mostfrequentlylist.filter(
      (item) => item.requestStatement != null
    );
    if (mostfrequentlylist.length == 0) return null;
    return (
      <View
        style={{
          flex: 0.5,
          margin: 5,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 20,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: "700",
                color: colors.secondary,
              }}
            >
              Most{"\n"}frequent{"\n"}Interactions
            </Text>

            <Image
              source={require("../../Assets/icons/frequent_interaction.png")}
              style={{ width: 50, height: 50, marginLeft: 10 }}
            />
          </View>
          <ClearSpace size={2} />
          {mostfrequentlylist.map((item) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={styles.dot} />
                <Text
                  variant="bodySmall"
                  style={{
                    // marginTop: 15,
                    fontWeight: "400",
                    color: "#848A93",
                  }}
                >
                  {item.requestStatement}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }, [mostfrequentlylist]);

  const renderFrequently = useMemo(() => {
    return (
      <View
        style={{
          flex: 0.5,
          margin: 5,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 20,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: "700",
                color: colors.secondary,
              }}
            >
              {`Last used \nInteractions \nfor this \ncustomer`}
            </Text>

            <Image
              source={require("../../Assets/icons/last_interaction.png")}
              style={{ width: 50, height: 50, marginLeft: 10 }}
            />
          </View>
          <ClearSpace size={2} />
          {mostfrequentlylist.map((item) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={styles.dot} />
                <Text
                  variant="bodySmall"
                  style={{
                    // marginTop: 15,
                    fontWeight: "400",
                    color: "#848A93",
                  }}
                >
                  {item.requestStatement}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }, [frequertlyquestionList]);

  const renderProfileTab = useMemo(() => {
    return (
      <View
        style={{
          margin: 5,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          backgroundColor: "#F26E77",
          borderRadius: 20,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            const {
              SERVICE_TYPE,
              INTXN_TYPE,
              PRIORITY,
              CONTACT_TYPE,
              PROBLEM_CODE,
            } = MASTER_DATA_CONSTANT;
            profileDispatch(fetchSavedProfileData(navigation));
            masterDispatch(
              getMasterData(
                `${PROBLEM_CODE},${INTXN_TYPE},${SERVICE_TYPE},${PROBLEM_CODE},${CONTACT_TYPE},${PRIORITY}`
              )
            );
          }}
        ></TouchableOpacity>

        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row-reverse" }}>
            <View>
              <ImageBackground
                source={require("../../Assets/icons/active_background.png")}
                resizeMode="cover"
                style={{ width: "100%" }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                >
                  Active
                </Text>
              </ImageBackground>
            </View>
            <View>
              <ImageBackground
                source={require("../../Assets/icons/business_background.png")}
                resizeMode="cover"
                style={{ width: "100%" }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingLeft: 18,
                    paddingRight: 18,
                  }}
                >
                  Business
                </Text>
              </ImageBackground>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View>
              <Image
                source={{
                  uri: "data:image/jpeg;base64," + customerPic,
                }}
                // imageStyle={{ borderRadius: 60 }}
                style={{ height: 60, width: 60 }}
              />
            </View>
            <View style={{ flexDirection: "column", marginLeft: 10 }}>
              <Text
                variant="bodyMedium"
                style={{
                  fontWeight: "700",
                  color: colors.inverseSecondary,
                }}
              >
                {get(profileReducer, "savedProfileData.firstName", "")}{" "}
                {get(profileReducer, "savedProfileData.lastName", "")}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: "400",
                  color: colors.inverseSecondary,
                }}
              >
                {get(profileReducer, "savedProfileData.customerId", "")}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: "400",
                  color: colors.inverseSecondary,
                }}
              >
                {get(
                  profileReducer,
                  "savedProfileData.customerContact[0].emailId",
                  ""
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Image source={require("../../Assets/icons/line.png")} />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <Image
            source={require("../../Assets/icons/in_call.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            variant="bodySmall"
            style={{
              fontWeight: "400",
              color: colors.inverseSecondary,
            }}
          >
            {get(
              profileReducer,
              "savedProfileData.customerContact[0].mobileNo",
              ""
            )}
          </Text>
          <Image
            source={require("../../Assets/icons/in_location.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            numberOfLines={3}
            variant="bodySmall"
            style={{
              fontWeight: "400",
              width: "60%",

              color: colors.inverseSecondary,
            }}
          >
            {handleMultipleContact(addresss)}
          </Text>
        </View>
      </View>
    );
  }, [addresss, customerPic, profileReducer]);

  const InteractionsModalView = () => {
    const contactTypeList = get(
      masterReducer,
      "masterdataData.CONTACT_TYPE",
      []
    );
    const interactionList = get(masterReducer, "masterdataData.INTXN_TYPE", []);
    const priorityList = get(masterReducer, "masterdataData.PRIORITY", []);
    const problemList = get(masterReducer, "masterdataData.PROBLEM_CODE", []);
    const serviceType = get(masterReducer, "masterdataData.SERVICE_TYPE", []);
    const {
      customerId,
      statement,
      interactionType,
      channel,
      problemCode,
      priorityCode,
      contactPerference,
      remarks,
      attachment,
    } = interactionRedux.formData;

    return (
      <View style={{ flex: 1 }}>
        {/* Field View */}
        <View style={{ marginHorizontal: 10 }}>
          <CustomDropDownFullWidth
            selectedValue={get(interactionType, "value.description", "")}
            data={interactionList}
            onChangeText={(text) => {
              dispatchInteraction(
                setInteractionFormField({
                  field: "interactionType",
                  value: text,
                  clearError: true,
                })
              );
            }}
            value={get(interactionType, "value.code", "")}
            caption={strings.intractionType}
            placeHolder={"Select " + strings.intractionType}
          />

          {interactionType.error && showErrorMessage(interactionType.error)}
          <CustomDropDownFullWidth
            selectedValue={get(interactionType, "value.description", "")}
            data={serviceType}
            onChangeText={(text) => {
              dispatchInteraction(
                setInteractionFormField({
                  field: "problemCode",
                  value: text,
                  clearError: true,
                })
              );
            }}
            value={get(interactionType, "value.code", "")}
            caption={strings.serviceType}
            placeHolder={"Select " + strings.serviceType}
          />
          <CustomDropDownFullWidth
            selectedValue={get(problemCode, "value.description", "")}
            data={problemCode}
            onChangeText={(text) => {
              dispatchInteraction(
                setInteractionFormField({
                  field: "problemCode",
                  value: text,
                  clearError: true,
                })
              );
            }}
            value={get(problemCode, "value.code", "")}
            caption={strings.problem_stat_cause}
            placeHolder={"Select " + strings.problem_stat_cause}
          />
          {problemCode.error && showErrorMessage(problemCode.error)}

          <CustomDropDownFullWidth
            selectedValue={get(problemCode, "value.code", "")}
            setValue={""}
            data={priorityList}
            onChangeText={(text) => {
              dispatchInteraction(
                setInteractionFormField({
                  field: "priorityCode",
                  value: text,
                  clearError: true,
                })
              );
            }}
            value={get(problemCode, "value.code", "")}
            caption={strings.priority_type}
            placeHolder={"Select " + strings.priority_type}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => {
              dispatchInteraction(
                setInteractionFormField({
                  field: "contactPerference",
                  value: text,
                  clearError: true,
                })
              );
            }}
            value={contactPerference.value}
            caption={strings.contact_type}
            placeHolder={"Select " + strings.contact_type}
          />
          {contactPerference.error && showErrorMessage(contactPerference.error)}
          <CustomInput
            value={remarks.value}
            caption={strings.remarks}
            placeHolder={strings.remarks}
            onChangeText={(text) => {
              dispatchInteraction(
                setInteractionFormField({
                  field: "remarks",
                  value: text,
                  clearError: true,
                })
              );
            }}
            right={
              <TextInput.Icon
                onPress={() => {
                  dispatchInteraction(
                    setInteractionFormField({
                      field: "remarks",
                      value: "",
                      clearError: false,
                    })
                  );
                }}
                style={{ width: 23, height: 23 }}
                icon={require("../../Assets/icons/ic_close.png")}
              />
            }
          />
          {remarks.error && showErrorMessage(remarks.error)}
          <CustomInput
            value={attachment.value}
            caption={strings.attachment}
            placeHolder={strings.attachment}
            onChangeText={(text) => {
              dispatchInteraction(
                setInteractionFormField({
                  field: "attachment",
                  value: text,
                  clearError: true,
                })
              );
            }}
          />
        </View>
        {attachment.error && showErrorMessage(attachment.error)}
        {/* Bottom Button View */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            marginHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.cancel} onPress={onCancelPressed} />
          </View>

          <View style={{ flex: 1 }}>
            <CustomButton
              label={strings.submit}
              onPress={async () => {
                await dispatchInteraction(
                  addInteractionAction(interactionRedux.formData)
                );
              }}
              loading={interactionRedux.loaderAdd}
            />
          </View>
        </View>
      </View>
    );
  };

  //handling loader
  if (loader)
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 200,
        }}
      >
        <LoadingAnimation></LoadingAnimation>
        <Text style={styles.emptyList}>{strings.please_wait}</Text>
      </View>
    );

  return (
    <>
      <View style={styles.container}>
        {/* profile card */}

        {renderProfileTab}

        {/* profile card end */}
        {/* most frequent ask two boxess */}
        <View style={{ flexDirection: "row" }}>
          {renderMostFrequent}
          {renderFrequently}
        </View>
        {/* most frequ asked end */}
        {/* search box start */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            value={knowledgeSearchText}
            placeholder="Search..."
            onChangeText={onChangeKnowledgeSearchText}
            underlineColorAndroid="transparent"
          />
          <Pressable
            onPress={() => {
              onClickKnowledgeSearch();
            }}
          >
            <Icon
              style={styles.searchIcon}
              name="magnify"
              size={30}
              color={knowledgeSearchText ? "#000000" : "#C7CAD1"}
            />
          </Pressable>
        </View>
        {/* search box end */}
        {/*knowledge search*/}

        {knowledgeSearchStore?.initKnowledgeSearchData && (
          <ActivityIndicator
            color={"#00ff00"}
            animating={true}
            size={50}
            backgroundColor={"#d0d0d0"}
            style={{
              marginTop: 50,
              backgroundColor: "#d0d0d0",
              alignSelf: "center",
              height: 50,
              width: "100%",
            }}
          />
        )}
        {knowledgeSearchStore?.knowledgeSearchData?.length === 0 && (
          <View
            style={{
              padding: 5,
              paddingLeft: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text style={styles.input}>{strings.no_solution}</Text>
            <Image source={require("../../Assets/icons/no_data.png")} />
          </View>
        )}
        {knowledgeSearchStore?.knowledgeSearchData?.length > 0 && (
          <View
            style={{
              padding: 5,
              paddingLeft: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00A985",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ padding: 12 }}>{strings.soultion_found}</Text>
          </View>
        )}
      </View>

      <FooterModel open={open} setOpen={setOpen}>
        <InteractionsModalView />
      </FooterModel>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#d0d0d0",
    marginTop: 60,
  },
  dot: {
    backgroundColor: "yellow",
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  fullspace: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 10,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "white",
    borderRightColor: color.BCAE_PRIMARY,
    borderRightWidth: 400,
    borderTopWidth: 200,
    borderTopColor: "white",
  },

  highlightText: {
    color: "#202223",
    textAlign: "left",
    fontSize: fontSizes.FONT_19 * 2,
    fontWeight: "600",
    lineHeight: spacing.HEIGHT_27 * 2,
  },
  searchSection: {
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
});
export default InteractionsToOrder;
