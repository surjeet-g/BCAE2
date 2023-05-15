import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";

import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet, Switch, TextInput,
  View
} from "react-native";
import { Chip, List, Text, useTheme } from "react-native-paper";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";
import { styles as modalStyle } from "../../Components/InteractionSuccess";
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

import { userNavigationIcon } from '../../Components/UserSearch';
import {
  setInteractionFormField,
  setInteractionReset
} from "../../Redux/InteractionAction";
import {
  addInteractionAction,
  fetchInteractionAction,
  updateInteractionAction
} from "../../Redux/InteractionDispatcher";

import get from "lodash.get";
import { ClearSpace } from "../../Components/ClearSpace";
import { FooterModel } from "../../Components/FooterModel";
import { ImagePicker } from "../../Components/ImagePicker";
import { InteractionFailed } from "../../Components/InteractionFailed";
import { InteractionSuccess } from "../../Components/InteractionSuccess";
import LoadingAnimation from "../../Components/LoadingAnimation";

import { RenderUserSelectResult } from "../../Components/UserSearch";
import { STACK_CREATE_CUSTOMER, STACK_INTERACTION_DETAILS } from "../../Navigation/MyStack";
import { resetKnowSearch } from "../../Redux/KnowledgeSearchAction";
import {
  getMasterData,
  MASTER_DATA_CONSTANT
} from "../../Redux/masterDataDispatcher";
import { setProfileReset, setUserSearch } from "../../Redux/ProfileAction";
import { fetchMyProfileData, fetchSavedProfileDataByUser, seachCustomers } from "../../Redux/ProfileDispatcher";
import { commonStyle } from "../../Utilities/Style/commonStyle";
import { navBar } from "../../Utilities/Style/navBar";
import theme from "../../Utilities/themeConfig";
import {
  getCustomerID, getUserType, USERTYPE
} from "../../Utilities/UserManagement/userInfo";
import { handleMultipleContact } from "../../Utilities/utils";
import { showErrorMessage } from "../Register/components/RegisterPersonal";

import { HandleResolution } from "./Component/Interaction/Resolution";

export const typeOfAccrodin = {
  category: { value: "category", title: "Top 10 Catgory" },
  frequently: { value: "frequently", title: "Most frequently interaction" },
  rencently: { value: "rencently", title: "Recently inteaction" },
  searchbox: { value: "searchbox", title: "Seach input" },
  productChoose: { value: "productChoose", title: "Select Product" },
  knowlegde: { value: "knowlegde", title: "Select Service" },
  resolved: { value: "Resolved", title: "Resolution Corner" },
  workflow: { value: "workflow", title: "workflow Corner" },
};
const INTELIGENCE_STATUS = {
  CREATE_INTERACTION: "CREATE_INTERACTION",
  CREATE_INTERACTION_AUTO: "CREATE_INTERACTION_AUTO",
  PRODUCT_WITH_MULTIPLE_ITEM: "PRODUCT_WITH_MULTIPLE_ITEM",
  PRODUCT_WITH_SINGLE_ITEM: "PRODUCT_WITH_SINGLE_ITEM",
  RESOVLED: "RESOLVED"
}
const InteractionsToOrder = ({ route, navigation }) => {
  //to do empty
  // const [createInteractionType, setCreateInteractionType] = useState("")
  const [createInteractionType, setCreateInteractionType] = useState(INTELIGENCE_STATUS.RESOVLED)
  // const [activeChatBotSec, setactiveChatBot] = useState("");
  const [activeChatBotSec, setactiveChatBot] = useState(typeOfAccrodin.resolved.title);
  const [activeService, setService] = useState("");

  //need enable screen loader
  const [loader, setLoader] = useState(true);
  //attachment
  const [fileAttachments, setFileAttachments] = useState([]);

  const [resultLoader, setresultLoader] = useState(false);
  //to store active interaction object
  const [activeInteraction, setActiveInteraction] = useState("");
  //auto suggestion drop box vi
  const [autosuggestionlist, setautoSuggestionList] = useState(false);
  //for disble more section while search input box vissible
  const [searchStandAloneModal, setsearchStandaloneModel] = useState(false);
  const { colors, fonts, roundness } = useTheme();
  //bottom model enble or not
  const [openBottomModal, setOpenBottomModal] = useState(false);
  const [openBottomModalChatBoard, setOpenBottomModalChatBot] = useState(false);

  const [knowledgeSearchText, setKnowledgeSearchText] = useState("");
  //attachment
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [userSeachEnable, setUserSeachEnable] = useState(false);
  const [bottomBarTitle, setBottombartitle] = useState("");

  const interactionResponseScreen = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    EMPTY_CUSTOMER: "EMPTY_CUSTOMER",
    NONE: "NONE",
  };
  const [enableSuccessScreen, setEnableSuccessScreen] = useState(
    interactionResponseScreen.NONE
  );
  const [modelProfileServiceModel, setProfileSeriveModal] = useState(false);
  const [intereactionAddResponse, setInteractionResponse] = useState({});

  const [requestStatementHistory, setRequestStatementHistory] = useState([]);
  const [isSolutionFound, setSolutionFound] = useState(false);
  const [del, setDel] = useState([]);
  const [userType, setUserType] = useState(USERTYPE.USER);

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
    // setService("")
    setCreateInteractionType("")
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
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerRightForNav,
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
  const profileDispatch = useDispatch([
    fetchMyProfileData,
    seachCustomers,
    setUserSearch,
    fetchSavedProfileDataByUser,
    setProfileReset,
  ]);

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
  //handle customer empty case
  useEffect(() => {
    if (profileReducer.IsSearchEmpty) {
      setTimeout(() => {
        navigation.navigate(STACK_CREATE_CUSTOMER)
      }, 5000)
    }
  }, [profileReducer.IsSearchEmpty])

  useEffect(() => {
    getUserType(setUserType);
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      setService({
        code: "SC_INSURANCE",
        description: "Insurance",
      });
    }

    fetchMyAPI();

  }, []);


  useEffect(() => {
    async function fetchMyAPI() {
      const {
        SERVICE_TYPE,
        INTXN_TYPE,
        PRIORITY,
        CONTACT_TYPE,
        INTXN_STATEMENT,
        INTXN_CAUSE,
        PROBLEM_CAUSE,
        PRODUCT_FAMILY,
        INTXN_CATEGORY,
      } = MASTER_DATA_CONSTANT;
      //set service
      //to get data from api

      //  await dispatchInteraction(fetchInteractionAction(true));
      profileDispatch(fetchMyProfileData(navigation));
      setLoader(false);
      // master only invoke load
      masterDispatch(
        getMasterData(
          `${INTXN_TYPE},${SERVICE_TYPE},${INTXN_CAUSE},${CONTACT_TYPE},${PRIORITY},${PRODUCT_FAMILY},${INTXN_CATEGORY}`
        )
      );


    }

    fetchMyAPI();
  }, []);
  console.log("",)
  const [interactionList, setInteractionList] = useState([])
  const [priorityList, setPriorityList] = useState([])
  const [problemList, setProblemList] = useState([])

  const [serviceTypelist, setServiceTypelist] = useState([])
  const [serviceCategoryList, setServiceCategoryList] = useState([])
  const [interactionCategoryList, setInteractionCategoryList] = useState([])
  const [contactTypeList, setContactTypeList] = useState([])


  useEffect(() => {
    console.log("master data", masterReducer)
    setInteractionList(get(masterReducer, "masterdataData.INTXN_TYPE", []))
    setPriorityList(get(masterReducer, "masterdataData.PRIORITY", []))
    setProblemList(get(masterReducer, "masterdataData.INTXN_CAUSE", []))
    setServiceTypelist(get(masterReducer, "masterdataData.SERVICE_TYPE", []));
    setInteractionCategoryList(get(masterReducer, "masterdataData.PRODUCT_FAMILY", []))
    setInteractionCategoryList(get(
      masterReducer,
      "masterdataData.INTXN_CATEGORY",
      []
    ))
    setContactTypeList(get(masterReducer, "masterdataData.CONTACT_TYPE", []))
  }, [masterReducer])




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
      return null;
    }
    if (text.length > 0) {
      // setresultLoader(true)
      await knowledgeSearchDispatch(
        getKnowledgeSearchData(text, activeService?.code)
      );
      //enable list show
      setautoSuggestionList(true);
      // setresultLoader(false)
    }
  };


  /**
  * handleInteligenceResponse 
  *
  * @param {number} params The number to raise.
  * @param {number} actionType actionType enum "auto_resolution","choose_item" choose_item: having multple items,auto_resolution : already resovled
  * @param {Object} item whilte onclick the data .
  * @return {number} x raised to the n-th power.
  */
  const handleInteligenceResponse = async (resp, item = {}, actionType = "auto_resolution") => {
    try {
      const debugg = true
      if (debugg) console.log('handleInteligenceResponse: parms resp', resp, "item", item)
      const isCreateInteraction = get(resp, 'outcome.interactionCreation', false)
      if (debugg) console.log('handleInteligenceResponse :isCreateInteraction api response', isCreateInteraction)
      if (debugg) console.log('handleInteligenceResponse : actionType', actionType)

      //interaction creation part  
      if (actionType == "auto_resolution") {
        await setBottombartitle(typeOfAccrodin.resolved.title);
        await setCreateInteractionType(INTELIGENCE_STATUS.RESOVLED)
        setactiveChatBot(typeOfAccrodin.resolved)
        setOpenBottomModalChatBot(true)
        return null
      }
      if (isCreateInteraction) {
        //todo popup
        if (debugg) console.log('handleInteligenceResponse : crate interaction if condition')

        const status = interactionDataToCreateInt(item)
        if (debugg) console.log('handleInteligenceResponse : interactionDataToCreateInt func response', status)

        if (status) {
          //set title for bottom sheet
          await setBottombartitle("Create Interaction")
          //set active bototm sheet section
          await setCreateInteractionType(INTELIGENCE_STATUS.CREATE_INTERACTION_AUTO)
          //open bottom sheet section
          await setOpenBottomModal(true)
          console.log('success',)
          return true
        }
        else {
          console.log('failed',)
        }
        return 1
      }
      else {
        if (debugg) console.log('handleInteligenceResponse : not create interaction else condition')

        const resolutionList = get(resp, 'resolutionAction.data', [])
        const solutionCount = resolutionList.length
        if (solutionCount == 0) {

          Toast.show({
            type: "bctError",
            text1: "//TODO chck message No Resolution",
          });
          setOpenBottomModalChatBot(false)

        }
        if (solutionCount == 1) {
          if (debugg) console.log('handleInteligenceResponse : one  solution')

          //directly navigate to corresponding order or product with payload [0]
        }
        else {
          if (debugg) console.log('handleInteligenceResponse : multiple solution  solution')
          await setCreateInteractionType(INTELIGENCE_STATUS.PRODUCT_WITH_MULTIPLE_ITEM)
          setactiveChatBot(typeOfAccrodin.productChoose)
          await setBottombartitle(typeOfAccrodin.productChoose.title);
          setOpenBottomModalChatBot(true)
          //to do bottom list item 
        }
        return true

      }
    } catch (error) {
      console.log('error on handleInteligenceResponse', error)
      return false
    }
  }
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
                  const activeData = get(profileReducer, 'userSelectedProfileDetails.customerUuid', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";
                  console.log('active customuui', activeData, get(profileReducer, `${activeData}.customerUuid`, ''))
                  //store selected result in cache
                  await setBottombartitle(typeOfAccrodin.knowlegde.title);
                  setLoader(true)
                  console.log('one',)
                  const { response, actionType } = await dispatchInteraction(
                    fetchInteractionAction(typeOfAccrodin.knowlegde.value, {
                      customerUuid: get(profileReducer, `${activeData}.customerUuid`, ''),
                      requestId: item.requestId,
                    })
                  );
                  setLoader(false)
                  console.log('two', response, actionType)




                  const status = await handleInteligenceResponse(response, item, actionType)
                  console.log('response', status)
                  return null

                  setActiveInteraction(item);
                  //open form model
                  setOpenBottomModalChatBot(true);
                  //disable other windo
                  setsearchStandaloneModel(true);
                  //make empt search box
                  setKnowledgeSearchText("");
                  setautoSuggestionList(false);
                  //todo

                  //pre populating result
                  // dispatchInteraction(
                  //   setInteractionFormField({
                  //     field: "statement",
                  //     value: item.requestStatement,
                  //     clearError: true,
                  //   })
                  // );

                  // dispatchInteraction(
                  //   setInteractionFormField({
                  //     field: "statementId",
                  //     value: item.requestId,
                  //     clearError: true,
                  //   })
                  // );



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
          }
          }
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

  const setFormField = (field, value) => {
    dispatchInteraction(
      setInteractionFormField({
        field,
        value,
        clearError: false,
      })
    );
  };

  const interactionDataToCreateInt = (item) => {
    try {
      const debuggg = true;
      if (debuggg) console.log('parmas interactionDataToCreateInt', item)

      const interCat = get(
        interactionCategoryList?.filter(
          (it) => it.code == item.intxnCategory
        ),
        "[0]",
        { code: "", description: "" }
      );
      if (debuggg) console.log('category', interCat)

      const interType = get(
        interactionList?.filter((it) => it.code == item.intxnType),
        "[0]",
        { code: "", description: "" }
      );
      if (debuggg) console.log('interType', interType)
      const serviveType = get(
        serviceTypelist?.filter((it) => it.code == item.serviceType),
        "[0]",
        { code: "", description: "" }
      );
      if (debuggg) console.log('serviveType', serviveType)
      const serviveCatType = get(
        serviceCategoryList?.filter(
          (it) => it.code == item.serviceCategory
        ),
        "[0]",
        { code: "", description: "" }
      );
      if (debuggg) console.log('serviveCatType', serviveCatType)
      const prirtyCode = get(
        serviceCategoryList?.filter(
          (it) => it.code == item.serviceCategory
        ),
        "[0]",
        { code: "", description: "" }
      );
      if (debuggg) console.log('prirtyCode', prirtyCode)
      //to do from api response
      //make array
      const contactPerferance = get(
        contactTypeList?.filter(
          (it) => it.code == get(item, "contactPreference[0].code")
        ),
        "[0]",
        { code: "", description: "" }
      );

      const problemCause = get(
        problemList?.filter(
          (it) => it.code == item.intxnCause
        ),
        "[0]",
        { code: "", description: "" }
      );

      if (debuggg) console.log('prirtyList', problemList, "api response", item.intxnCause)

      console.log('master data parse from ', "interationcar", interCat, "interType",
        interType, "serviveType", serviveType, "serviveCatType", serviveCatType,
        "prirtyCode", prirtyCode, "contactPerferance", contactPerferance, "problemCause", problemCause)

      setDropDownFormField("priorityCode", prirtyCode);

      setDropDownFormField("contactPerference", contactPerferance);

      setDropDownFormField("interactionCategory", interCat);

      setDropDownFormField("interactionType", interType);

      setDropDownFormField("serviceCategory", serviveCatType);

      setDropDownFormField("serviceType", serviveType);

      setDropDownFormField("problemCause", problemCause)


      if (!get(item, 'requestId', false) != false) {
        setFormField("statement", item.requestId);
      }
      if (get(item, 'statementId', false) != false) {
        setFormField("statementId", item.requestStatement);
      }

      return true
    } catch (error) {

      console.log("error in interactionTocreate", error);
      return false

    }
  };
  const handleAccodin = async ({ value, title }) => {
    await setactiveChatBot(value);
    await setBottombartitle(title);
    await setCreateInteractionType("")
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
  const serviceList = [
    {
      code: "SC_BANK",
      description: "Banking",
    },
    {
      code: "SC_INSURANCE",
      description: "Insurance",
    },

  ];
  const renderProfileTab = useMemo(() => {



    const activeData = get(profileReducer, 'userSelectedProfileDetails.firstName', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";

    const addr = get(profileReducer, `${activeData}.customerAddress`, []);
    const mobilePath = userType == USERTYPE.CUSTOMER ? "mobileNo" : "contactNo"
    const emailPath = userType == USERTYPE.CUSTOMER ? "customerContact[0].emailId" : "email"


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
                {get(profileReducer, `${activeData}.firstName`, "")}{" "}
                {get(profileReducer, `${activeData}.lastName`, "")}
              </Text>
              <Text
                variant="bodySmall"
                style={{
                  fontWeight: "400",
                  color: colors.textColor,
                }}
              >
                {get(profileReducer, `${activeData}.customerNo`, "")}
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
                  `${activeData}.${emailPath}`,
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
              `${activeData}.${mobilePath}`,
              ""
            )}
          </Text>
          {userType == USERTYPE.CUSTOMER &&
            <Image
              source={require("../../Assets/icons/interaction_loc.png")}
              style={{ width: 45, height: 45 }}
            />

          }
          <Text
            numberOfLines={3}
            variant="bodySmall"
            style={{
              fontWeight: "400",
              width: "60%",

              color: colors.textColor,
            }}
          >
            {handleMultipleContact(addr)}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            if (serviceList.length > 0) {
              setProfileSeriveModal(!modelProfileServiceModel);
            }
          }}
          style={{
            zIndex: 9,
            flexDirection: "row",
            width: "50%",
            alignItems: "center",
            marginTop: 5,
          }}
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
            Services : {activeService?.description}
          </Text>
          {serviceList.length > 0 && (
            <Icon
              name={!modelProfileServiceModel ? "chevron-down" : "chevron-up"}
              size={20}
              color={colors.textColor}
            />
          )}
        </Pressable>

        {modelProfileServiceModel && (
          <>
            <Pressable
              onPress={() => {
                setProfileSeriveModal(false)
              }}
              style={{
                backgroundColor: "transparent",
                position: "absolute",
                width: width,
                height: height,

              }}>

            </Pressable>
            <View style={styles.modelContainerProfile}>
              {serviceList.map((ite) => {
                return (
                  <List.Item
                    key={ite.code}
                    title={ite.description}
                    titleStyle={{
                      fontSize: 10,
                      padding: 0,
                      margin: 0,
                    }}

                    onPress={() => {
                      setService(ite);
                      setProfileSeriveModal(false);
                    }}
                    style={{ borderWidthColor: "gray", borderBottomWidth: 0.2 }}
                  />
                );
              })}
            </View>
          </>
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
    activeService,
  ]);
  // console.log('new profile ', profileReducer.userSelectedProfileDetails)
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
  const HandleMultipleCaseInChatBoard = ({ suggestionList, resolutionHistory = [] }) => {
    //product list
    console.log('HandleMultipleCaseInChatBoard suggestion list ', suggestionList)
    console.log('HandleMultipleCaseInChatBoard :createInteractionType', createInteractionType)
    if (createInteractionType == INTELIGENCE_STATUS.PRODUCT_WITH_MULTIPLE_ITEM) {
      console.log('HandleMultipleCaseInChatBoard :suggestion list', suggestionList)
      return (
        <View style={styles.bottomContainer}>
          <ClearSpace size={2} />



          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {get(resolutionHistory, 'length', 0) > 0 ? (
              resolutionHistory.map((ite) => (
                // eslint-disable-next-line react/jsx-key
                <Chip
                  mode="outlined"
                  onPress={async () => {
                    const { response, actionType } = await dispatchInteraction(
                      fetchInteractionAction(typeOfAccrodin.knowlegde.value, {
                        serviceUuid: ite.serviceUuid,
                        accountUuid: ite.accountUuid,
                        actionCount: 1,
                        requestId: get(interactionReducer, "InteractionData.requestId", "")

                      })
                    );
                    console.log('view->HandleMultipleCaseInChatBoard->api response ', response, actionType)
                    // const status = await handleInteligenceResponse(mockresponse, item)
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
                  {ite.serviceName}
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

          {/* <Text variant="labelMedium" style={{ textAlign: "center" }}>
            Couldn't Find a resolution?
            <Text onPress={() => { }} style={{ color: "red" }}>
              {" "}
              Create Interaction
            </Text>{" "}
          </Text> */}
        </View>
      )
    }
    else {
      return (
        <View style={styles.bottomContainer}>
          <ClearSpace size={2} />



          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {get(suggestionList, 'length', 0) > 0 ? (
              suggestionList.map((ite) => (
                // eslint-disable-next-line react/jsx-key
                <Chip
                  mode="outlined"
                  onPress={async () => {
                    setLoader(true)

                    const activeData = get(profileReducer, 'userSelectedProfileDetails.customerUuid', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";
                    const { response, actionType } = await dispatchInteraction(
                      fetchInteractionAction(typeOfAccrodin.knowlegde.value, {
                        customerUuid: get(profileReducer, `${activeData}.customerUuid`, ''),
                        requestId: get(ite, "requestId", "")
                      })
                    );
                    setLoader(false)
                    const status = await handleInteligenceResponse(response, ite, actionType)

                    console.log('response', status)
                    return null
                    console.log('view->HandleMultipleCaseInChatBoard->api response ', response, actionType)
                    // const status = await handleInteligenceResponse(mockresponse, item)
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
                  {ite.requestStatement}
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

          {/* <Text variant="labelMedium" style={{ textAlign: "center" }}>
            Couldn't Find a resolution?
            <Text onPress={() => { }} style={{ color: "red" }}>
              {" "}
              Create Interaction
            </Text>{" "}
          </Text> */}
        </View>
      )
    }
  }
  /**
   * render bottom chat
   *
   */
  const RenderBottomChatBoard = () => {
    const suggestionList = get(interactionReducer, "knowledgeHistoryss", [
      {
        "actionType": "COLLECTINPUT",
        "description": "COLLECT_REMARKS",
        "type": "object",
        "message": {
          "element": "COLLECT_REMARKS",
          "attributes": []
        }
      }
    ]);

    console.log('RenderBottomChatBoard,', createInteractionType, activeChatBotSec)
    //todo

    if (activeChatBotSec == "") {
      console.log("setactiveChatBot not set for title for chat bot");
      return null;
    }
    //todo 
    // if (createInteractionType == INTELIGENCE_STATUS.RESOVLED) {
    if (true) {
      // if (true) {
      const activeData = get(profileReducer, 'userSelectedProfileDetails.customerUuid', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";

      // console.log('resolution RenderBottomChatBoard resolved', suggestionList)
      return (
        <HandleResolution
          customerUuid={get(profileReducer, `${activeData}.customerUuid`, '')}
          popupAction={async (params) => {
            setLoader(true)
            console.log("htting popupAction", params)
            await dispatchInteraction(
              fetchInteractionAction(typeOfAccrodin.workflow.value, params, true)
            );
            setLoader(false);
          }}
          suggestionList={suggestionList}
          resolutionDetails={get(interactionReducer, "InteractionData", [])}
          navigation={navigation}
        />
      );

    }
    const interactionList = get(interactionReducer, 'InteractionData', [])

    return (
      <HandleMultipleCaseInChatBoard
        suggestionList={interactionList}
        resolutionHistory={suggestionList}
      />
    );
  };

  Object.keys(interactionRedux.formData).map((it) => {
    const item = interactionRedux.formData[it];
    if (item.type == INPUT_TYPE.INPUTBOX && item.required) {
      if (item.value == "") {
        isButtonEnable = false
      }
    }
    if (item.type == INPUT_TYPE.DROPDOWN && item.required) {
      if (item.value.code == "") {
        isButtonEnable == false
      }
    }


  });

  const isModelOpen =
    openBottomModal || openBottomModalChatBoard || userSeachEnable;

  if (enableSuccessScreen == interactionResponseScreen.SUCCESS) {
    return (
      <View style={{ ...commonStyle.center, flex: 1, margin: 10 }}>
        <InteractionSuccess
          intxId={intereactionAddResponse?.intxnNo}
          cancelButtonRequired={true}
          okHandler={async () => {
            await resetStateData("setInteractionResponse");
            navigation.navigate(STACK_INTERACTION_DETAILS, {
              interactionID: intereactionAddResponse?.intxnNo,
            });
          }}
          cancelHandler={() => { }}
        />
      </View>
    );
  }


  if (enableSuccessScreen == interactionResponseScreen.EMPTY_CUSTOMER) {
    return (
      <View style={{ ...commonStyle.center, flex: 1, margin: 10 }}>
        <InteractionSuccess
          intxId={intereactionAddResponse?.intxnNo}
          cancelButtonRequired={true}
          okHandler={async () => {
            await resetStateData("setInteractionResponse");
            navigation.navigate(STACK_INTERACTION_DETAILS, {
              interactionID: intereactionAddResponse?.intxnNo,
            });
          }}
          cancelHandler={() => { }}
        />
      </View>
    );
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
  console.log('profile result', profileReducer)
  return (
    <>
      {profileReducer.IsSearchEmpty &&
        <View style={{
          ...modalStyle.successContainer,
          height,
          top: 30,
          width,
          zIndex: 99999,
          position: "absolute"
        }}>
          <Image
            source={require("../../Assets/icons/no_customer.gif")}
            style={modalStyle.gif}
          />
          <Text style={modalStyle.interactionText}>
            Provided details doesn’t match any customer kindly go ahead and search
          </Text>





        </View>
      }
      {userType == USERTYPE.USER &&
        useMemo(() => {
          return userNavigationIcon({
            navigation,
            setEnableSuccessScreens: () => {
              setEnableSuccessScreen(interactionResponseScreen.EMPTY_CUSTOMER)
            },
            setLoader,
            profileDispatch,
            headerRightForNav,
            headerTitle: "headerTitle",
            profileSearchData: get(profileReducer, "profileSearchData", [])
          });
        }, [headerRightForNav, setLoader, navigation, profileDispatch, setEnableSuccessScreen])

      }
      {userType == USERTYPE.USER &&
        useMemo(() => {
          return (
            <RenderUserSelectResult
              profileSearchData={get(profileReducer, "profileSearchData", [])}
              setLoader={setLoader}
              profileDispatch={profileDispatch}
              headerRightForNav={headerRightForNav}
              headerTitle={"Interaction"}
              navigation={navigation}
            />
          );
        }, [
          profileReducer,
          setLoader,
          setUserType,
          profileDispatch,
          navigation,
          headerRightForNav,
        ])
      }

      {loader && (
        <LoadingAnimation title="while we are creating Interaction." />
      )}
      {interactionReducer.initInteraction && (
        <LoadingAnimation title="fetch data" />
      )}
      <View
        style={{
          ...styles.container,
          backgroundColor: isModelOpen ? "gray" : "#F0F0F0",
          opacity: isModelOpen ? 0.3 : 1,
        }}
      >

        {/* profile card */}
        {renderProfileTab}

        <ClearSpace size={2} />
        <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
          <Text variant="bodyMedium">
            Smart Assistance
          </Text>
          <Switch
            // trackColor={{ false: '#767577', true: '#81b0ff' }}
            // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={(status) => {
              if (status) setOpenBottomModal(true)
            }}
          // value={isEnabled}
          />
        </View>



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


      <FooterModel open={openBottomModal} setOpen={setOpenBottomModal}
        title={bottomBarTitle}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <KeyboardAvoidingView
            // keyboardVerticalOffset={50}
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            style={{ flex: 1 }}
          >
            {/* Field View */}
            <View style={{ marginHorizontal: 10 }}>
              {(createInteractionType !== INTELIGENCE_STATUS.CREATE_INTERACTION_AUTO) &&
                <>
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
                    caption={"Interaction Category"}
                    placeHolder={"Select interaction category"}
                  />

                  {interactionCategory.error &&
                    showErrorMessage(interactionCategory.error)}

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
                    selectedValue={get(serviceCategory, "value.description", "")}
                    data={serviceList}
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
                </>
              }
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
              {(createInteractionType !== INTELIGENCE_STATUS.CREATE_INTERACTION_AUTO) &&

                <ImagePicker
                  attachmentModalVisible={attachmentModalVisible}
                  setAttachmentModalVisible={setAttachmentModalVisible}
                  fileAttachments={fileAttachments}
                  setFileAttachments={setFileAttachments}
                />
              }
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
                    const logg = true
                    if (logg) console.log('create complienta :entered', interactionRedux)

                    const input = interactionRedux.formData;
                    const customerID = await getCustomerID();
                    if (logg) console.log('create complienta :customer id', customerID)
                    if (logg) console.log('create complienta :input', input)

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
                    if (logg) console.log('create complienta :create obj', params)


                    const { status, response } = await dispatchInteraction(
                      addInteractionAction(params, fileAttachments)
                    );
                    if (logg) console.log('create complienta :create obj', params)

                    if (status) {
                      console.log("interaction type response ", response);
                      setInteractionResponse(response);
                      setEnableSuccessScreen(interactionResponseScreen.SUCCESS);
                      dispatchInteraction(setInteractionReset());

                    } else {
                      setEnableSuccessScreen(interactionResponseScreen.FAILED);
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
    backgroundColor: "#F0F0F0",
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