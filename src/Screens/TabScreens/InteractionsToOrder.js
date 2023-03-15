import React, { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { List } from "react-native-paper";

import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";

import {
  color,
  DEFAULT_PROFILE_IMAGE,
  fontSizes,
  INPUT_TYPE,
  spacing
} from "../../Utilities/Constants/Constant";

import { strings } from "../../Utilities/Language";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";
import { CustomInput } from "./../../Components/CustomInput";
var { height, width } = Dimensions.get("screen");

import { getKnowledgeSearchData } from "../../Redux/KnowledgeSearchDispatcher.js";

import {
  addInteractionAction,
  fetchInteractionAction,
  updateInteractionAction
} from "../../Redux/InteractionDispatcher";

import {
  setInteractionFormField,
  setInteractionReset
} from "../../Redux/InteractionAction";

import get from "lodash.get";
import { ClearSpace } from "../../Components/ClearSpace";
import { FooterModel } from "../../Components/FooterModel";
import { ImagePicker } from "../../Components/ImagePicker";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { resetKnowSearch } from '../../Redux/KnowledgeSearchAction';
import {
  getMasterData,
  MASTER_DATA_CONSTANT
} from "../../Redux/masterDataDispatcher";
import { fetchSavedProfileData } from "../../Redux/ProfileDispatcher";
import { getCustomerID } from "../../Utilities/UserManagement/userInfo";
import { handleMultipleContact } from "../../Utilities/utils";
import { showErrorMessage } from "../Register/components/RegisterPersonal";

const InteractionsToOrder = ({ route, navigation }) => {



  //need enable screej loader
  const [loader, setLoader] = useState(true);
  //attachment
  const [fileAttachments, setFileAttachments] = useState([]);

  const [resultLoader, setresultLoader] = useState(false);
  //to store active interaction object
  const [activeInteraction, setActiveInteraction] = useState(false);
  //auto suggestion drop box vi
  const [showList, setShowList] = useState(true);
  //for disble more section while search input box vissible
  const [bottomModelVisible, setBottomModel] = useState(true);
  const { colors, fonts, roundness } = useTheme();
  //bottom model enble or not
  const [open, setOpen] = useState(false);

  const [knowledgeSearchText, setKnowledgeSearchText] = useState("");
  //attachment
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);



  let interactionRedux = useSelector((state) => state.interaction);
  let knowledgeSearchStore = useSelector((state) => state.knowledgeSearch);

  const resetStateData = () => {
    setFileAttachments([])
    setShowList(true)
    setBottomModel(true)
    setKnowledgeSearchText("")
    setOpen(false)

  }
  const masterDispatch = useDispatch([getMasterData]);
  const profileDispatch = useDispatch([fetchSavedProfileData]);
  const dispatchInteraction = useDispatch([
    setInteractionReset,
    fetchInteractionAction,
    updateInteractionAction,
    addInteractionAction,
    resetKnowSearch
  ]);
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      resetStateData()
      dispatchInteraction(resetKnowSearch())
    });
    return willFocusSubscription;
  }, []);
  const knowledgeSearchDispatch = useDispatch([getKnowledgeSearchData]);
  useEffect(() => {
    async function fetchMyAPI() {
      const {
        SERVICE_TYPE,
        INTXN_TYPE,
        PRIORITY,
        CONTACT_TYPE,
        INTXN_STATEMENT,
        PROBLEM_CODE,
        SERVICE_CATEGORY,
        INTXN_CATEGORY,
      } = MASTER_DATA_CONSTANT;

      await dispatchInteraction(fetchInteractionAction(true));
      await profileDispatch(fetchSavedProfileData(navigation));
      setLoader(false);
      //master only invoke load
      masterDispatch(
        getMasterData(
          `${INTXN_TYPE},${SERVICE_TYPE},${PROBLEM_CODE},${CONTACT_TYPE},${PRIORITY},${SERVICE_CATEGORY},${INTXN_CATEGORY}`
        )
      );
    }
    fetchMyAPI();
  }, []);
  const { profileReducer, masterReducer, interactionReducer } = useSelector(
    (state) => {
      return {
        profileReducer: state.profile,
        masterReducer: state.masterdata,
        interactionReducer: state.interaction,
      };
    }
  );
  const interactionList = get(masterReducer, "masterdataData.INTXN_TYPE", []);
  const priorityList = get(masterReducer, "masterdataData.PRIORITY", []);
  const problemList = get(masterReducer, "masterdataData.PROBLEM_CODE", []);
  const serviceTypelist = get(masterReducer, "masterdataData.SERVICE_TYPE", []);
  const serviceCategoryList = get(masterReducer, "masterdataData.SERVICE_CATEGORY", []);
  const interactionCategoryList = get(masterReducer, "masterdataData.INTXN_CATEGORY", []);
  const contactTypeList = get(
    masterReducer,
    "masterdataData.CONTACT_TYPE",
    []
  );


  let mostfrequentlylist = get(
    interactionReducer,
    "InteractionData.mostfrequently",
    []
  );

  //to do check response
  let frequertlyquestionList = get(
    interactionReducer,
    "InteractionData.frequerntlyAsked",
    []
  );



  const customerPic =
    get(profileReducer, "savedProfileData.customerPhoto", null) ??
    DEFAULT_PROFILE_IMAGE;
  const addresss = get(profileReducer, "savedProfileData.customerAddress", []);



  const onChangeKnowledgeSearchText = async (text) => {
    setKnowledgeSearchText(text);

    if (text.length > 0) {
      // setresultLoader(true)
      await knowledgeSearchDispatch(
        getKnowledgeSearchData(text)
      );
      //enable list show
      setShowList(true)
      // setresultLoader(false)
    }
  };

  const RenderSearchResult = () => {
    if (!showList) return null;
    const result = get(knowledgeSearchStore, "knowledgeSearchData", []);

    if (result.length == 0) {
      return (
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            backgroundColor: "#fff",
            height: 50,
            borderRadius: 5,
            padding: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.input}>{strings.no_solution}</Text>
          <Image source={require("../../Assets/icons/no_data.png")} />
        </View>
      );
    } else {
      return (
        <FlatList
          contentContainerStyle={{ height: 500 }}
          data={result}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={item?.requestStatement}
                titleStyle={{
                  fontSize: 10,
                  padding: 0,
                  margin: 0,
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  height: 40,
                  borderRadius: 3,
                }}
                onPress={() => {
                  //store selected result in cache

                  //pre populating result
                  dispatchInteraction(
                    setInteractionFormField({
                      field: "statement",
                      value: item.requestStatement,
                      clearError: true,
                    })
                  );

                  dispatchInteraction(
                    setInteractionFormField({
                      field: "statementId",
                      value: item.requestId,
                      clearError: true,
                    })
                  );

                  const interCat = get(interactionCategoryList?.filter((it) => it.code == item.intxnCategory), '[0]', { code: "", description: "" })
                  const interType = get(interactionList?.filter((it) => it.code == item.intxnType), '[0]', { code: "", description: "" })
                  const serviveType = get(serviceTypelist?.filter((it) => it.code == item.serviceType), '[0]', { code: "", description: "" })
                  const serviveCatType = get(serviceCategoryList?.filter((it) => it.code == item.serviceCategory), '[0]', { code: "", description: "" })
                  //to do from api response 
                  const contactPerFromProfile = get(profileReducer, "savedProfileData.contactPreferences", [{ code: "", description: "" }])
                  //make array 
                  const contactPerferance = get(contactTypeList?.filter((it) => it.code == contactPerFromProfile), '[0]', { code: "", description: "" })



                  setDropDownFormField("contactPerference", contactPerferance)
                  //set contact perferance


                  setDropDownFormField("interactionCategory", interCat)

                  setDropDownFormField("interactionType", interType)

                  setDropDownFormField("serviceCategory", serviveCatType)


                  setDropDownFormField("serviceType", serviveType)


                  //hide search result panal
                  setActiveInteraction(item);
                  //open form model
                  setOpen(true);
                  //disable other windo
                  setBottomModel(true);
                  //make empt search box
                  setKnowledgeSearchText("");
                  setShowList(false);
                }}
              />
            );
          }}
        />
      );
    }


  }

  const setDropDownFormField = (field, { code, description }) => {
    dispatchInteraction(
      setInteractionFormField({
        field,
        value: { code: code, description: description },
        clearError: true,
      })
    )
  }

  const interactionDataToCreateInt = (item) => {

    try {

      const interCat = get(interactionCategoryList?.filter((it) => it.code == item.intxnCategory?.code), '[0]', { code: "", description: "" })
      const interType = get(interactionList?.filter((it) => it.code == item.intxnType?.code), '[0]', { code: "", description: "" })
      const serviveType = get(serviceTypelist?.filter((it) => it.code == item.serviceType?.code), '[0]', { code: "", description: "" })
      const serviveCatType = get(serviceCategoryList?.filter((it) => it.code == item.serviceCategory?.code), '[0]', { code: "", description: "" })
      const prirtyCode = get(serviceCategoryList?.filter((it) => it.code == item.serviceCategory?.code), '[0]', { code: "", description: "" })
      //to do from api response 
      //make array 
      const contactPerferance = get(contactTypeList?.filter((it) => it.code == get(item, 'contactPreference[0].code')), '[0]', { code: "", description: "" })



      setDropDownFormField("priorityCode", prirtyCode)

      setDropDownFormField("contactPerference", contactPerferance)

      setDropDownFormField("interactionCategory", interCat)

      setDropDownFormField("interactionType", interType)

      setDropDownFormField("serviceCategory", serviveCatType)

      setDropDownFormField("serviceType", serviveType)



    } catch (error) {
      console.log('error in interactionTocreate', error)
    }

  }

  const renderMostFrequent = useMemo(() => {

    mostfrequentlylist = mostfrequentlylist.filter(
      (item) => item.requestStatement != null
    );


    return (
      <View
        style={{
          flex: 0.5,
          margin: 5,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 16,
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
          {mostfrequentlylist.length == 0 ? (
            <Text
              variant="labelSmall"
              style={{
                // fontSizes: 12,
                // marginTop: 15,
                fontWeight: "400",
                color: "#848A93",
              }}
            >
              No found
            </Text>
          ) : (
            mostfrequentlylist.map((item) => {
              return (
                <Pressable
                  onPress={() => {
                    interactionDataToCreateInt(item)
                  }}
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.dot} />
                  <Text
                    variant="labelSmall"
                    style={{
                      // fontSizes: 12,
                      // marginTop: 15,
                      fontWeight: "400",
                      color: "#848A93",
                    }}
                  >
                    {item.requestStatement}
                  </Text>
                </Pressable>
              );
            })
          )}
        </View>
      </View>
    );
  }, [mostfrequentlylist, masterReducer]);

  const renderFrequently = useMemo(() => {

    frequertlyquestionList = frequertlyquestionList.filter(
      (item) => item.requestStatement != null
    );


    return (
      <View
        style={{
          flex: 0.5,
          margin: 5,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 16,
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
          {frequertlyquestionList.length == 0 ? (
            <Text
              variant="labelSmall"
              style={{
                // fontSizes: 12,
                // marginTop: 15,
                fontWeight: "400",
                color: "#848A93",
              }}
            >
              No found
            </Text> :

            frequertlyquestionList.map((item) => {
              return (
                <Pressable
                  onPress={(item) => {
                    interactionDataToCreateInt(item)
                  }}
                  style={{
                    // marginTop: 15,
                    fontWeight: "400",
                    color: "#848A93",
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
                </Pressable>
              );
            })
          }
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
          borderRadius: 16,
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
                {get(profileReducer, "savedProfileData.customerNo", "")}
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

  const {
    statement,
    interactionType,
    channel,
    problemCause,
    priorityCode,
    contactPerference,
    remarks,
    attachment,
    serviceType,
    interactionCategory,
    serviceCategory,
  } = interactionRedux.formData;

  const { loaderAdd } = interactionRedux;

  let isButtonEnable = true;

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

  //button disable or not

  Object.keys(interactionRedux.formData).map((it) => {
    const item = interactionRedux.formData[it];

    if (item.required) {
      //dropdown
      if (item.type == INPUT_TYPE.DROPDOWN) {
        if (item.value.code == "") {
          isButtonEnable = false;
        }
      }
      if (item.type == INPUT_TYPE.INPUTBOX) {
        if (item.value == "") {
          isButtonEnable = false;
        }
      }
    }
  });
  return (
    <>
      <View style={styles.container}>
        {/* profile card */}
        {bottomModelVisible && renderProfileTab}

        {bottomModelVisible && (
          <View style={{ flexDirection: "row" }}>
            {renderMostFrequent}
            {renderFrequently}
          </View>
        )}

        {activeInteraction !== false && (
          <View
            style={{
              padding: 8,
              paddingLeft: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00A985",
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{ textAlign: "center" }}
            >{`${strings.soultion_found} \n ${activeInteraction.requestStatement}`}</Text>
          </View>
        )}

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            onFocus={() => setBottomModel(false)}
            value={knowledgeSearchText}
            placeholder="Search..."
            onChangeText={onChangeKnowledgeSearchText}
            underlineColorAndroid="transparent"
          />
          {knowledgeSearchText && (
            <Pressable
              onPress={() => {
                setKnowledgeSearchText(false);
                setBottomModel(true);
                //open form model
                setShowList(false);
                Keyboard.dismiss();
              }}
            >
              <Icon
                style={styles.searchIcon}
                name="close"
                size={30}
                color={"#C7CAD1"}
              />
            </Pressable>
          )}
        </View>

        <RenderSearchResult />

        {/* search box end */}
        {/*knowledge search*/}
      </View>
      {bottomModelVisible && (
        <FooterModel open={open} setOpen={setOpen}>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <KeyboardAvoidingView
              // keyboardVerticalOffset={50}
              behavior={Platform.OS === "ios" ? "padding" : "padding"}
              style={{ flex: 1 }}
            >
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

                {interactionType.error &&
                  showErrorMessage(interactionType.error)}

                <CustomDropDownFullWidth
                  selectedValue={get(serviceType, "value.description", "")}
                  data={serviceTypelist}
                  onChangeText={(text) => {
                    dispatchInteraction(
                      setInteractionFormField({
                        field: "serviceType",
                        value: text,
                        clearError: true,
                      })
                    );
                  }}
                  value={get(serviceType, "value.code", "")}
                  caption={strings.serviceType}
                  placeHolder={"Select " + strings.serviceType}
                />
                {serviceTypelist.error &&
                  showErrorMessage(serviceTypelist.error)}

                <CustomDropDownFullWidth
                  selectedValue={get(
                    interactionCategory,
                    "value.description",
                    ""
                  )}
                  data={interactionCategoryList}
                  onChangeText={(text) => {
                    dispatchInteraction(
                      setInteractionFormField({
                        field: "interactionCategory",
                        value: text,
                        clearError: true,
                      })
                    );
                  }}
                  value={get(interactionCategory, "value.code", "")}
                  caption={strings.serviceType}
                  placeHolder={"Select interaction category"}
                />

                {interactionCategory.error &&
                  showErrorMessage(interactionCategory.error)}

                <CustomDropDownFullWidth
                  selectedValue={get(serviceCategory, "value.description", "")}
                  data={serviceCategoryList}
                  onChangeText={(text) => {
                    dispatchInteraction(
                      setInteractionFormField({
                        field: "serviceCategory",
                        value: text,
                        clearError: true,
                      })
                    );
                  }}
                  value={get(serviceCategory, "value.code", "")}
                  caption={"Serive Category"}
                  placeHolder={"Select Serive Category"}
                />
                {serviceCategory.error &&
                  showErrorMessage(serviceCategory.error)}

                <CustomDropDownFullWidth
                  selectedValue={get(problemCause, "value.description", "")}
                  data={problemList}
                  onChangeText={(text) => {
                    dispatchInteraction(
                      setInteractionFormField({
                        field: "problemCause",
                        value: text,
                        clearError: true,
                      })
                    );
                  }}
                  value={get(problemCause, "value.code", "")}
                  caption={strings.problem_stat_cause}
                  placeHolder={"Select " + strings.problem_stat_cause}
                />
                {problemCause.error && showErrorMessage(problemCause.error)}

                <CustomDropDownFullWidth
                  selectedValue={get(priorityCode, "value.description", "")}
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
                  value={get(priorityCode, "value.code", "")}
                  caption={strings.priority_type}
                  placeHolder={"Select " + strings.priority_type}
                />

                <CustomDropDownFullWidth
                  selectedValue={get(
                    contactPerference,
                    "value.description",
                    ""
                  )}
                  data={contactTypeList}
                  onChangeText={(text) => {
                    dispatchInteraction(
                      setInteractionFormField({
                        field: "contactPerference",
                        value: text,
                        clearError: true,
                      })
                    );
                  }}
                  value={get(contactPerference, "value.code", "")}
                  caption={strings.contact_type}
                  placeHolder={"Select " + strings.contact_type}
                />
                {contactPerference.error &&
                  showErrorMessage(contactPerference.error)}
                {/* <KeyboardAwareView animated={false}> */}

                <CustomInput
                  value={get(remarks, "value", "")}
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
                <ImagePicker
                  attachmentModalVisible={attachmentModalVisible}
                  setAttachmentModalVisible={setAttachmentModalVisible}
                  fileAttachments={fileAttachments}
                  setFileAttachments={setFileAttachments}
                />
                {/* </KeyboardAwareView> */}
                {/* <CustomInput
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
          /> */}
              </View>
              {/* {attachment.error && showErrorMessage(attachment.error)} */}
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
                  <CustomButton
                    label={strings.cancel}
                    onPress={() => {
                      setOpen(false);
                      dispatchInteraction(setInteractionReset());
                    }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <CustomButton
                    isDisabled={!isButtonEnable}
                    loading={loaderAdd}
                    label={strings.submit}
                    onPress={async () => {
                      const input = interactionRedux.formData;
                      const customerID = await getCustomerID();
                      const params = {
                        customerId: customerID,
                        statement: input.statement.value,
                        statementId: input.statementId.value,
                        problemCause: input.problemCause.value?.code,
                        interactionCategory:
                          input.interactionCategory.value?.code,
                        serviceCategory: input.serviceCategory.value?.code,
                        interactionType: input.interactionType.value?.code,
                        serviceType: input.serviceType.value?.code,
                        channel: input.channel.value,
                        priorityCode: input.priorityCode.value?.code,
                        contactPreference: [
                          input.contactPerference.value?.code,
                        ],
                        remarks: input.remarks.value,
                      };

                      const { status, response } = await dispatchInteraction(
                        addInteractionAction(params, fileAttachments)
                      );
                      console.log("respin", status, response);

                      if (status) {
                        dispatchInteraction(setInteractionReset())
                        resetStateData()
                        //reset state values
                        Alert.alert(strings.attention, response.message, [
                          {
                            text: strings.inquiryInfo,
                            onPress: () => {
                              //reset attachment
                              // navigation.navigate("InquiryNotification", {
                              //   ouId: organizationItem.unitId,
                              //   serviceType: inquiryServiceName,
                              //   problemCode: inquiryProblemCode,
                              //   deptId: inquiryDeptId,
                              // });
                            },
                          },
                          {
                            text: strings.close,
                            onPress: () => {
                              navigation.navigate("Home", {});
                            },
                            style: "cancel",
                          },
                        ]);
                      }
                      else {

                      }
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </FooterModel>
      )}
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
    backgroundColor: "#F5AD47",
    width: 6,
    height: 6,
    borderRadius: 6,
    marginRight: 5,
  },
  fullspace: {
    flex: 1,
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
  dropDownCard: {
    // shadowColor: '#171717',
    maxHeight: spacing.HEIGHT_50 * 5,
    paddingTop: 10,

    width: "100%",
    marginVertical: spacing.WIDTH_10,
    elevation: 3,
  },
});

export default InteractionsToOrder;
