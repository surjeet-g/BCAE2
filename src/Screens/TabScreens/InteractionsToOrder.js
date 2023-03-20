import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";

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
  TextInput,
  View
} from "react-native";
import { Chip, List, Searchbar, Text, useTheme } from "react-native-paper";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";

import {
  color,
  DEFAULT_PROFILE_IMAGE,
  fontSizes,
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
import { InteractionFailed } from "../../Components/InteractionFailed";
import { InteractionSuccess } from "../../Components/InteractionSuccess";
import LoadingAnimation from "../../Components/LoadingAnimation";

import { STACK_INTERACTION_DETAILS } from "../../Navigation/MyStack";
import { resetKnowSearch } from "../../Redux/KnowledgeSearchAction";
import {
  getMasterData,
  MASTER_DATA_CONSTANT
} from "../../Redux/masterDataDispatcher";
import { setSearchProfileReset, setUserSearch } from "../../Redux/ProfileAction";
import { fetchSavedProfileData, fetchSavedProfileDataByUser, seachCustomers } from "../../Redux/ProfileDispatcher";
import { commonStyle } from "../../Utilities/Style/commonStyle";
import { navBar } from "../../Utilities/Style/navBar";
import theme from "../../Utilities/themeConfig";
import {
  getCustomerID,
  getUserType,
  USERTYPE
} from "../../Utilities/UserManagement/userInfo";
import { handleMultipleContact } from "../../Utilities/utils";
import { showErrorMessage } from "../Register/components/RegisterPersonal";
export const typeOfAccrodin = {
  category: { value: "category", title: "Top 10 Catgory" },
  frequently: { value: "frequently", title: "Most frequently interaction" },
  rencently: { value: "rencently", title: "Recently inteaction" },
  searchbox: { value: "searchbox", title: "Seach input" },
};

const InteractionsToOrder = ({ route, navigation }) => {
  const [activeService, setService] = useState("")
  const [activeChatBotSec, setactiveChatBot] = useState("");
  //need enable screen loader
  const [loader, setLoader] = useState(true);
  //attachment
  const [fileAttachments, setFileAttachments] = useState([]);

  const [resultLoader, setresultLoader] = useState(false);
  //to store active interaction object
  const [activeInteraction, setActiveInteraction] = useState("");
  //auto suggestion drop box vi
  const [autosuggestionlist, setautoSuggestionList] = useState(true);
  //for disble more section while search input box vissible
  const [searchStandAloneModal, setsearchStandaloneModel] = useState(true);
  const { colors, fonts, roundness } = useTheme();
  //bottom model enble or not
  const [openBottomModal, setOpenBottomModal] = useState(false);
  const [openBottomModalChatBoard, setOpenBottomModalChatBot] = useState(false);

  const [knowledgeSearchText, setKnowledgeSearchText] = useState("");
  //attachment
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [userSeachEnable, setUserSeachEnable] = useState(false)
  const [bottomBarTitle, setBottombartitle] = useState("");

  const interactionResponseScreen = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    NONE: "NONE",
  };
  const [enableSuccessScreen, setEnableSuccessScreen] = useState(
    interactionResponseScreen.NONE
  );
  const [modelProfileServiceModel, setProfileSeriveModal] = useState(false);
  const [intereactionAddResponse, setInteractionResponse] = useState({});

  const [requestStatementHistory, setRequestStatementHistory] = useState([]);
  const [isSolutionFound, setSolutionFound] = useState(false);
  const [userType, setUserType] = useState("");
  let interactionRedux = useSelector((state) => state.interaction);
  let knowledgeSearchStore = useSelector((state) => state.knowledgeSearch);

  /**
   * Reset State data
   *
   * @param {string} exclude To avoid current state data
   */
  const resetStateData = (exclude = "") => {
    if (exclude != "setInteractionResponse") {
      setInteractionResponse({});
    }
    // setUserType("");
    setService("")
    setSolutionFound(false);
    setRequestStatementHistory([]);
    setProfileSeriveModal(false);
    setEnableSuccessScreen(interactionResponseScreen.NONE);
    setFileAttachments([]);
    setautoSuggestionList(true);
    setsearchStandaloneModel(true);
    setKnowledgeSearchText("");
    setOpenBottomModal(false);
    setBottombartitle("");
  };
  const headerRightForNav = () => {

    return (
      <View style={navBar.navRightCon}>
        <Pressable
          onPress={() => setOpenBottomModal(true)}
          style={{ ...navBar.roundIcon, backgroundColor: "#D9D9D9" }}
        >
          <Icon name="plus" size={19} color={colors.inverseSecondary} />
        </Pressable>
      </View>
    );


  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRightForNav
    });
  }, []);


  /**
   * Reset All params
   *
   * @param {string} params The number to raise.
   */
  const resetReducerNdState = (params = "") => {
    resetStateData(params);
    dispatchInteraction(setInteractionReset());
    dispatchInteraction(resetKnowSearch());
  };

  const masterDispatch = useDispatch([getMasterData]);
  const profileDispatch = useDispatch([fetchSavedProfileData, seachCustomers, setUserSearch]);
  const dispatchInteraction = useDispatch([
    setInteractionReset,
    fetchInteractionAction,
    updateInteractionAction,
    addInteractionAction,
    resetKnowSearch,
  ]);
  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      resetReducerNdState();
    });
    return willFocusSubscription;
  }, []);
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

      // await dispatchInteraction(fetchInteractionAction(true));
      await profileDispatch(fetchSavedProfileData(navigation));
      setLoader(false);
      // master only invoke load
      masterDispatch(
        getMasterData(
          `${INTXN_TYPE},${SERVICE_TYPE},${PROBLEM_CODE},${CONTACT_TYPE},${PRIORITY},${SERVICE_CATEGORY},${INTXN_CATEGORY}`
        )
      );
      const userType = await getUserType()
      console.log('>>rrr', userType)
      setUserType(userType);
      // if (userType == USERTYPE.CUSTOMER) {

    }

    fetchMyAPI();
  }, []);


  const interactionList = get(masterReducer, "masterdataData.INTXN_TYPE", []);
  const priorityList = get(masterReducer, "masterdataData.PRIORITY", []);
  const problemList = get(masterReducer, "masterdataData.PROBLEM_CODE", []);
  const serviceTypelist = get(masterReducer, "masterdataData.SERVICE_TYPE", []);
  const serviceCategoryList = get(
    masterReducer,
    "masterdataData.SERVICE_CATEGORY",
    []
  );
  const interactionCategoryList = get(
    masterReducer,
    "masterdataData.INTXN_CATEGORY",
    []
  );
  const contactTypeList = get(masterReducer, "masterdataData.CONTACT_TYPE", []);

  const customerPic =
    get(profileReducer, "savedProfileData.customerPhoto", null) ??
    DEFAULT_PROFILE_IMAGE;
  const addresss = get(profileReducer, "savedProfileData.customerAddress", []);

  const resetStateAfterSearchClicked = () => {
    //search result panal

    setKnowledgeSearchText("");
    setautoSuggestionList(false);
    //search box end
  };

  const onChangeKnowledgeSearchText = async (text) => {

    setKnowledgeSearchText(text);
    if (activeService == "") {
      Toast.show({
        type: "bctError",
        text1: "Please select service",
      });
      return null
    }
    if (text.length > 0) {
      // setresultLoader(true)
      await knowledgeSearchDispatch(getKnowledgeSearchData(text, activeService));
      //enable list show
      setautoSuggestionList(true);
      // setresultLoader(false)
    }
  };

  const RenderSearchResult = () => {
    if (!autosuggestionlist) return null;
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
                  borderBottomColor: colors.gray,
                  borderBottomWidth: 0.5,
                  paddingHorizontal: 4,
                  // borderRadius: 3,
                }}
                onPress={async () => {
                  //store selected result in cache
                  await setBottombartitle(typeOfAccrodin.searchbox.title);
                  await dispatchInteraction(
                    fetchInteractionAction(typeOfAccrodin.searchbox.value, {
                      requestId: item.requestId,
                    })
                  );
                  setActiveInteraction(item);
                  //open form model
                  setOpenBottomModalChatBot(true);
                  //disable other windo
                  setsearchStandaloneModel(true);
                  //make empt search box
                  setKnowledgeSearchText("");
                  setautoSuggestionList(false);
                  //todo
                  return null;
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

                  const interCat = get(
                    interactionCategoryList?.filter(
                      (it) => it.code == item.intxnCategory
                    ),
                    "[0]",
                    { code: "", description: "" }
                  );
                  const interType = get(
                    interactionList?.filter((it) => it.code == item.intxnType),
                    "[0]",
                    { code: "", description: "" }
                  );
                  const serviveType = get(
                    serviceTypelist?.filter(
                      (it) => it.code == item.serviceType
                    ),
                    "[0]",
                    { code: "", description: "" }
                  );
                  const serviveCatType = get(
                    serviceCategoryList?.filter(
                      (it) => it.code == item.serviceCategory
                    ),
                    "[0]",
                    { code: "", description: "" }
                  );
                  //to do from api response
                  const contactPerFromProfile = get(
                    profileReducer,
                    "savedProfileData.contactPreferences",
                    [{ code: "", description: "" }]
                  );
                  //make array
                  const contactPerferance = get(
                    contactTypeList?.filter(
                      (it) => it.code == contactPerFromProfile
                    ),
                    "[0]",
                    { code: "", description: "" }
                  );

                  setDropDownFormField("contactPerference", contactPerferance);
                  //set contact perferance

                  setDropDownFormField("interactionCategory", interCat);

                  setDropDownFormField("interactionType", interType);

                  setDropDownFormField("serviceCategory", serviveCatType);

                  setDropDownFormField("serviceType", serviveType);

                  //set selected data into state value
                  setActiveInteraction(item);
                  //open form model
                  setOpenBottomModalChatBot(true);
                  //disable other windo
                  setsearchStandaloneModel(true);
                  //make empt search box
                  setKnowledgeSearchText("");
                  setautoSuggestionList(false);
                }}
              />
            );
          }}
        />
      );
    }
  };

  const setDropDownFormField = (field, { code, description }) => {
    dispatchInteraction(
      setInteractionFormField({
        field,
        value: { code: code, description: description },
        clearError: true,
      })
    );
  };

  const interactionDataToCreateInt = (item) => {
    try {
      const interCat = get(
        interactionCategoryList?.filter(
          (it) => it.code == item.intxnCategory?.code
        ),
        "[0]",
        { code: "", description: "" }
      );
      const interType = get(
        interactionList?.filter((it) => it.code == item.intxnType?.code),
        "[0]",
        { code: "", description: "" }
      );
      const serviveType = get(
        serviceTypelist?.filter((it) => it.code == item.serviceType?.code),
        "[0]",
        { code: "", description: "" }
      );
      const serviveCatType = get(
        serviceCategoryList?.filter(
          (it) => it.code == item.serviceCategory?.code
        ),
        "[0]",
        { code: "", description: "" }
      );
      const prirtyCode = get(
        serviceCategoryList?.filter(
          (it) => it.code == item.serviceCategory?.code
        ),
        "[0]",
        { code: "", description: "" }
      );
      //to do from api response
      //make array
      const contactPerferance = get(
        contactTypeList?.filter(
          (it) => it.code == get(item, "contactPreference[0].code")
        ),
        "[0]",
        { code: "", description: "" }
      );

      setDropDownFormField("priorityCode", prirtyCode);

      setDropDownFormField("contactPerference", contactPerferance);

      setDropDownFormField("interactionCategory", interCat);

      setDropDownFormField("interactionType", interType);

      setDropDownFormField("serviceCategory", serviveCatType);

      setDropDownFormField("serviceType", serviveType);
    } catch (error) {
      console.log("error in interactionTocreate", error);
    }
  };
  const handleAccodin = async ({ value, title }) => {
    await setactiveChatBot(value);
    await setBottombartitle(title);
    await dispatchInteraction(fetchInteractionAction(value));
    setOpenBottomModalChatBot(true);
  };

  const renderAccordion = useMemo(() => {
    return (
      <View style={styles.accodinContainer}>
        <Pressable
          style={styles.accodinItem}
          onPress={() => {
            handleAccodin(typeOfAccrodin.category);
          }}
        >
          <Image
            source={require("../../Assets/icons/interaction_category.gif")}
            style={styles.gif}
          />
          <Text style={styles.accordinTxt}>Top 10 Category</Text>
          <Icon name="chevron-down" size={30} color={colors.accodinItem} />
        </Pressable>

        <Pressable
          style={styles.accodinItem}
          onPress={() => handleAccodin(typeOfAccrodin.frequently)}
        >
          <Image
            source={require("../../Assets/icons/interaction_fewq.gif")}
            style={styles.gif}
          />
          <Text style={styles.accordinTxt}>Most frequent Interaction</Text>
          <Icon name="chevron-down" size={30} color={colors.accodinItem} />
        </Pressable>
        <Pressable
          style={styles.accodinItem}
          onPress={() => handleAccodin(typeOfAccrodin.rencently)}
        >
          <Image
            source={require("../../Assets/icons/interaction_most_feq.gif")}
            style={styles.gif}
          />
          <Text style={styles.accordinTxt}>Recently Interaction</Text>
          <Icon name="chevron-down" size={30} color={colors.accodinItem} />
        </Pressable>
      </View>
    );
  }, []);

  const renderProfileTab = useMemo(() => {
    const serviceList = ["SC_BANK", "SC_INSURANCE"]
    return (
      <ImageBackground
        source={require("../../Assets/icons/login_card_background.png")}
        // resizeMode="contain"
        style={{
          // margin: 5,
          zIndex: 999,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          backgroundColor: "#ffff",
          borderRadius: 16,
          elevation: 1,
          borderColor:
            userType == USERTYPE.CUSTOMER ? "#0CD222" : colors.userTypeColor,
          borderWidth: 3,
        }}
      >
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
                  color: colors.textColor,
                }}
              >
                {get(profileReducer, "savedProfileData.firstName", "")}{" "}
                {get(profileReducer, "savedProfileData.lastName", "")}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: "400",
                  color: colors.textColor,
                }}
              >
                {get(profileReducer, "savedProfileData.customerNo", "")}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: "400",
                  color: colors.textColor,
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
            source={require("../../Assets/icons/interaction_contact.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            variant="bodySmall"
            style={{
              fontWeight: "400",
              color: colors.textColor,
            }}
          >
            {get(
              profileReducer,
              "savedProfileData.customerContact[0].mobileNo",
              ""
            )}
          </Text>
          <Image
            source={require("../../Assets/icons/interaction_loc.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            numberOfLines={3}
            variant="bodySmall"
            style={{
              fontWeight: "400",
              width: "60%",

              color: colors.textColor,
            }}
          >
            {handleMultipleContact(addresss)}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            if (serviceList.length > 0) {
              setProfileSeriveModal(!modelProfileServiceModel);
            }

          }}
          style={{ zIndex: 9, flexDirection: "row", width: '50%', alignItems: "center", marginTop: 5 }}
        >
          <Image
            source={require("../../Assets/icons/interaction_service.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text
            variant="bodyMedium"
            style={{
              fontWeight: "400",
              color: colors.textColor,
              marginRight: 5,
            }}
          >
            Services  {activeService}
          </Text>
          {serviceList.length > 0 &&
            <Icon
              name={!modelProfileServiceModel ? "chevron-down" : "chevron-up"}
              size={20}
              color={colors.textColor}
            />
          }
        </Pressable>

        {modelProfileServiceModel && (
          <View style={styles.modelContainerProfile}>
            {serviceList.map(ite => {
              return (
                <List.Item
                  key={ite}
                  title={ite}
                  titleStyle={{
                    fontSize: 10,
                    padding: 0,
                    margin: 0,
                  }}
                  onPress={() => {
                    setService(ite)
                    setProfileSeriveModal(false)
                  }}
                  style={{ borderWidthColor: "gray", borderBottomWidth: 0.2 }}
                />
              )
            })

            }

          </View>
        )}
      </ImageBackground>
    );
  }, [
    addresss,
    customerPic,
    profileReducer,
    modelProfileServiceModel,
    userType,
    setService,
    activeService
  ]);

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

  /**
   * render bottom chat
   *
   */
  const RenderBottomChatBoard = () => {
    const suggestionList = get(interactionReducer, "InteractionData", []);

    if (activeChatBotSec == "") {
      console.log("not active any section");
      return null;
    }
    if (isSolutionFound) {
      return (
        <View style={styles.bottomContainer}>
          <ClearSpace size={4} />
          <View
            style={{
              padding: 8,
              paddingLeft: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <Text
              variant="bodyLarge"
              style={{ textAlign: "center", color: "#3FB94D" }}
            >
              {`${strings.soultion_found}`}
            </Text>
          </View>
          <ClearSpace size={2} />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {requestStatementHistory.length &&
              requestStatementHistory.map((item, idx) => (
                <View
                  key={item}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Chip
                    mode="outlined"
                    onPress={() => {
                      alert("sdfsf");
                    }}
                    textStyle={{
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                    style={{
                      backgroundColor: "#d9e7ff",
                      borderRadius: 15,
                      padding: 0,
                      marginRight: 5,
                      borderColor: "transparent",
                      marginBottom: 5,
                    }}
                  >
                    {item}{" "}
                  </Chip>
                  {requestStatementHistory.length != idx + 1 && (
                    <Icon
                      name="arrow-right"
                      size={20}
                      color={"#4C5A81"}
                      style={{ marginRight: 5 }}
                    />
                  )}
                </View>
              ))}
          </View>
          <ClearSpace size={3} />
        </View>
      );
    }
    return (
      <View style={styles.bottomContainer}>
        <ClearSpace size={2} />
        <Text variant="labelMedium">Next Action - Resoltion</Text>
        <ClearSpace size={2} />

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {suggestionList.length > 0 ? (
            suggestionList.map((ite) => (
              <Chip
                mode="outlined"
                onPress={() => {
                  Alert.alert(
                    strings.attention,
                    "Are you sure want to create interaction",
                    [
                      {
                        text: "Ok",
                        onPress: () => {
                          setLoader(true);
                          let tempHistory = requestStatementHistory;
                          tempHistory.push();
                          setRequestStatementHistory(tempHistory);
                          setLoader(false);
                        },
                      },
                      {
                        text: strings.close,
                        onPress: () => { },
                        style: "cancel",
                      },
                    ]
                  );
                }}
                textStyle={{
                  fontSize: 14,
                  fontWeight: "400",
                }}
                style={{
                  backgroundColor: "#edf1f7",
                  borderRadius: 15,
                  marginRight: 5,
                  marginBottom: 5,
                  borderColor: "transparent",
                }}
              >
                {ite?.requestStatement}{" "}
              </Chip>
            ))
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center" }} variant="labelMedium">
                No data available!
              </Text>
            </View>
          )}
        </View>

        <ClearSpace size={3} />

        <Text variant="labelMedium" style={{ textAlign: "center" }}>
          Couldn't Find a resolution?
          <Text onPress={() => { }} style={{ color: "red" }}>
            {" "}
            Create Interaction
          </Text>{" "}
        </Text>
      </View>
    );
  };
  Object.keys(interactionRedux.formData).map((it) => {
    const item = interactionRedux.formData[it];

    if (activeChatBotSec == "") {
      console.log("not active any section");
      return null;
    }
  });

  const isModelOpen = openBottomModal || openBottomModalChatBoard || userSeachEnable;

  if (enableSuccessScreen == interactionResponseScreen.SUCCESS) {
    return (<View style={{ ...commonStyle.center, flex: 1, margin: 10 }}>
      <InteractionSuccess intxId={intereactionAddResponse?.intxnNo}
        cancelButtonRequired={true}
        okHandler={async () => {
          await resetStateData("setInteractionResponse")
          navigation.navigate(STACK_INTERACTION_DETAILS, {
            interactionID: intereactionAddResponse?.intxnNo
          })
        }}
        cancelHandler={() => {

        }}
      /></View>)
  }
  if (enableSuccessScreen == interactionResponseScreen.FAILED) {
    return (
      <View style={{ ...commonStyle.center, flex: 1, margin: 10 }}>
        <InteractionFailed
          okHandler={() => {
            //Failed action
            resetReducerNdState();
          }}
        />
      </View>
    );
  }
  /**
  * Reset All params
  *
  *  @param {obj} navigation The obj to raise..
  *  @param {func} setUserSeachEnable for handle main screen blue effect
  * @param {boolean} loader reference for loader
  */
  const EnableSearchForUser = ({ navigation, setUserSeachEnable, loader = false, setLoader = () => { }, headerRightForNav = null, headerTitleForNav = "" }) => {
    const profileDispatch = useDispatch([seachCustomers, setUserSearch, setSearchProfileReset, fetchSavedProfileDataByUser]);
    const profileReducer = useSelector(
      (state) => state.profile
    );


    return navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            <Pressable
              onPress={() => {
                enableSearchBar(navigation, setUserSeachEnable,
                  profileReducer,
                  profileDispatch, loader, setLoader,
                  headerRightForNav, headerTitleForNav)
              }}
            >
              <Image source={require('../../Assets/icons/search_user.png')} style={{ width: 60, height: 60 }} />
            </Pressable>
          </View>
        );
      },
    });
    return null
  }

  /**
  * Change Header middle section
  * @param {obj} navigation The null to raise.
  */

  const renderResult = (navigation, setUserSeachEnable,
    profile, dispatch1, loader, setLoader,
    headerRightForNav, headerTitleForNav) => {
    const profileSearchResult = get(profile, 'profileSearchData', [])
    console.log('task - profil inside result ', profileSearchResult, profile)
    return (<UserSearchList
      headerTitleForNav={headerTitleForNav}
      profileSearchResult={profileSearchResult}
      dispatch1={dispatch1}
      navigation={navigation}
      setLoader={setLoader}
      headerRightForNav={headerRightForNav}
      setUserSeachEnable={setUserSeachEnable}
    />)
  }

  const enableSearchBar = async (navigation, setUserSeachEnable,
    profile, dispatch1, loader, setLoader,
    headerRightForNav, headerTitleForNav) => {



    // const [search, setSearch] = useState("")


    console.log('task - profile view', profile)


    // const renderResult = useMemo(() => {
    //     const profileSearchResult = get(profile, 'profileSearchData', [])
    //     console.log('task - profil inside result ', profileSearchResult, profile)
    //     return (<UserSearchList
    //         headerTitleForNav={headerTitleForNav}
    //         profileSearchResult={profileSearchResult}
    //         dispatch1={dispatch1}
    //         navigation={navigation}
    //         setLoader={setLoader}
    //         headerRightForNav={headerRightForNav}
    //         setUserSeachEnable={setUserSeachEnable}
    //     />)
    // }, [headerTitleForNav, profileSearchResult, navigation, setLoader, headerRightForNav, setUserSeachEnable])




  }

  const UserSearchList = ({
    setLoader, headerTitleForNav, setUserSeachEnable,
    profileSearchResult, dispatch1, navigation, headerRightForNav }) => {

    return (
      <View style={{
        top: 60,
        position: "absolute",
        width: width * 0.9
      }}>
        {profileSearchResult.length == 0 ?
          <Text></Text> :
          <FlatList
            contentContainerStyle={{
              height: 500
            }}
            data={profileSearchResult}
            renderItem={({ item }) => {
              return (
                <List.Item
                  title={`${item.firstName} ${item.lastName}`}
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

                    borderBottomWidth: 0.5,
                    paddingHorizontal: 4,
                    // borderRadius: 3,
                  }}
                  onPress={async () => {
                    console.log('>>nav', navigation)
                    // setLoader(true)
                    const status = await dispatch1(fetchSavedProfileDataByUser("ce2b267e-4fb3-4c6d-b3b1-9ea52280ab9d"))
                    // if (status) {
                    navigation.setOptions({
                      headerRight: headerRightForNav,
                      headerTitle: "sdfsdf"
                    })

                    // }
                    // setLoader(false)
                    // setUserSeachEnable(false)
                  }}
                />
              )

            }}
          />
        }
      </View>
    )
  }
  const headerSet = () => {
    if (1) {
      navigation.setOptions({
        headerRight: () => {
          return (
            <Icon
              onPress={() => {
                dispatch1(setSearchProfileReset())
              }} name='close-circle' size={25} color={"#000"} />
          )
        },
        headerTitle: () => {
          return (
            <>
              <Searchbar
                style={{ width: width * 0.7 }}
                placeholder="Search customer"
                onChangeText={async (text) => {
                  console.log('task - profile text search', text)
                  setLoader(true)
                  await dispatch1(setUserSearch(text))
                  await dispatch1(seachCustomers())
                  setLoader(false)
                }}

                value={get(profileReducer, 'userSearchString', "")}
              />
              {/* {renderResult(navigation, setUserSeachEnable,
                profile, dispatch1, loader, setLoader,
                headerRightForNav, headerTitleForNav)} */}

            </>
          )
        }
      })
      return null
      return (
        <EnableSearchForUser
          headerRightForNav={headerRightForNav}
          headerTitleForNav={"Interaction"}
          loader={loader}
          setLoader={setLoader}
          navigation={navigation}
          setUserSeachEnable={setUserSeachEnable}
        />
      )
    }
    else {
      return null
    }
  }


  return (
    <>

      {/* {headerSet()} */}
      {loader && (
        <LoadingAnimation title="while we are creating Interaction." />
      )}
      {interactionReducer.initInteraction && (
        <LoadingAnimation title="fetch data" />
      )}
      <View
        style={{
          ...styles.container,
          backgroundColor: isModelOpen ? "gray" : "#d0d0d0",
          opacity: isModelOpen ? 0.3 : 1,
        }}


      >
        {/* profile card */}
        {renderProfileTab}

        <ClearSpace size={2} />
        <Text variant="bodyMedium">Type your statement here</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            onFocus={() => setsearchStandaloneModel(false)}
            value={knowledgeSearchText}
            placeholder="ex. Biiling problem"
            onChangeText={onChangeKnowledgeSearchText}
            underlineColorAndroid="transparent"
          />
          {knowledgeSearchText && (
            <Pressable
              onPress={() => {
                setKnowledgeSearchText(false);
                setsearchStandaloneModel(true);
                //open form model
                setautoSuggestionList(false);
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
        {searchStandAloneModal && (
          <>
            <ClearSpace size={5} />
            <Text variant="bodyMedium">More for you</Text>
            <ClearSpace size={2} />
            {renderAccordion}
          </>
        )}
        <RenderSearchResult />

        {/* search box end */}
        {/*knowledge search*/}
      </View>
      <FooterModel
        open={openBottomModalChatBoard}
        setOpen={setOpenBottomModalChatBot}
        title={`${bottomBarTitle} ${isSolutionFound ? "- Solution Found" : ""}`}
      >
        <RenderBottomChatBoard />
      </FooterModel>

      <FooterModel open={openBottomModal} setOpen={setOpenBottomModal}>
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

              {interactionType.error && showErrorMessage(interactionType.error)}

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
              {serviceTypelist.error && showErrorMessage(serviceTypelist.error)}

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
              {serviceCategory.error && showErrorMessage(serviceCategory.error)}

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
                selectedValue={get(contactPerference, "value.description", "")}
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
                    setOpenBottomModal(false);
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
                      // statement: input.statement.value,
                      // statementId: input.statementId.value,
                      problemCause: input.problemCause.value?.code,
                      interactionCategory:
                        input.interactionCategory.value?.code,
                      serviceCategory: input.serviceCategory.value?.code,
                      interactionType: input.interactionType.value?.code,
                      serviceType: input.serviceType.value?.code,
                      channel: input.channel.value,
                      priorityCode: input.priorityCode.value?.code,
                      contactPreference: [input.contactPerference.value?.code],
                      remarks: input.remarks.value,
                    };
                    console.log('>>', params,)
                    const { status, response } = await dispatchInteraction(
                      addInteractionAction(params, fileAttachments)
                    );


                    if (status) {
                      console.log('interaction type response ', response)
                      setInteractionResponse(response)
                      dispatchInteraction(setInteractionReset())
                      setEnableSuccessScreen(interactionResponseScreen.SUCCESS)

                    }
                    else {
                      setEnableSuccessScreen(interactionResponseScreen.FAILED)

                    }
                  }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
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
    marginTop: 10,
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
  accodinContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 5,
    alignItems: "center",
    elevation: 1,
  },
  accodinItem: {
    flexDirection: "row",
    marginHorizontal: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 0.5,
  },
  accordinTxt: {
    flex: 0.8,
    fontWeight: "500",
  },
  accordinImg: {
    flex: 0.1,
  },
  accordinIcon: {
    flex: 0.1,
  },
  bottomContainer: {
    paddingHorizontal: 10,
  },
  gif: {
    width: 30,
    height: 30,
    flex: 0.1,
    marginRight: 8,
  },
  modelContainerProfile: {
    zIndex: 99999999,
    position: "absolute",
    backgroundColor: "#fff",
    elevation: 1,
    width: 200,
    borderRadius: 3,
    // minHeight: 100,
    bottom: -60,
    left: 40,
  },
});

export default InteractionsToOrder;
