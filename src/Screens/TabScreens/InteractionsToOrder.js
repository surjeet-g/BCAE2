import { useFocusEffect } from "@react-navigation/native";
import get from "lodash.get";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard, Pressable,
  ScrollView,
  StyleSheet, Switch, TextInput,
  View,
  unstable_batchedUpdates
} from "react-native";
import { Chip, List, Text, useTheme } from "react-native-paper";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { CheckGroupbox } from "../../Components/CheckGroupbox";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { FooterModel } from "../../Components/FooterModel";
import { ImagePicker } from "../../Components/ImagePicker";
import { InteractionFailed } from "../../Components/InteractionFailed";
import { InteractionSuccess, styles as modalStyle } from "../../Components/InteractionSuccess";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { RenderUserSelectResult } from '../../Components/UserSearch';
import { STACK_INTERACTION_DETAILS } from "../../Navigation/MyStack";
import {
  setInteractionFormField,
  setInteractionReset
} from "../../Redux/InteractionAction";
import {
  addInteractionAction,
  fetchInteractionAction,
  getAppoinmentsData,
  getHalls,
  updateInteractionAction
} from "../../Redux/InteractionDispatcher";
import { resetKnowSearch } from "../../Redux/KnowledgeSearchAction";
import { getKnowledgeSearchData } from "../../Redux/KnowledgeSearchDispatcher.js";
import { setProfileReset, setServiceData, setUserSearch } from "../../Redux/ProfileAction";
import { fetchMyProfileData, fetchSavedProfileDataByUser, seachCustomers } from "../../Redux/ProfileDispatcher";
import {
  MASTER_DATA_CONSTANT,
  getMasterData
} from "../../Redux/masterDataDispatcher";
import { clearAttachmentData } from "../../Storage/DB.js";
import { getDataFromDB } from "../../Storage/token";
import { endPoints } from '../../Utilities/API/ApiConstants';
import {
  DEFAULT_PROFILE_IMAGE,
  INPUT_TYPE,
  color,
  fontSizes,
  spacing,
  storageKeys
} from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { commonStyle } from "../../Utilities/Style/commonStyle";
import { navBar } from "../../Utilities/Style/navBar";
import { USERTYPE, getCustomerID, getCustomerUUID } from "../../Utilities/UserManagement/userInfo";
import theme from "../../Utilities/themeConfig";
import { APICall } from "../CreateCustomer/util";
import { showErrorMessage } from "../Register/components/RegisterPersonal";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";
import { CustomInput } from "./../../Components/CustomInput";
import AppointmentPop from "./Component/Interaction/AppoinmentPop";
import { HandleResolution } from "./Component/Interaction/Resolution";
var { height, width } = Dimensions.get("screen");

export const typeOfAccrodin = {
  category: { value: "category", title: "Top 10 Category" },
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

/**
 * Customer/User can able to create their interactions and also provides smart assistance.
 * user can able to search statement 
 * @namespace Interaction  
 */
const InteractionsToOrder = ({ route, navigation }) => {

  console.log("rendering InteractionsToOrder..")
  var role = ""

  const [formDataArray, setFormDataArray] = useState({});
  const handleNextForm = (formData) => { setFormDataArray(prevArray => ({ ...prevArray, ...formData })) };
  const [obj, setObj] = useState({})
  const handleSetObj = useCallback((newObj) => {
    setObj(newObj);
  }, [setObj]);
  const [appoinmentFormData, setAppoinmentFormData] = useState()
  //to do empty
  // const [createInteractionType, setCreateInteractionType] = useState("")
  const [createInteractionType, setCreateInteractionType] = useState(INTELIGENCE_STATUS.RESOVLED)
  // const [activeChatBotSec, setactiveChatBot] = useState("");
  const [activeChatBotSec, setactiveChatBot] = useState(typeOfAccrodin.resolved.title);
  const [activeService, setService] = useState("");
  const [isEnabledsmartAssist, setSmartAssistance] = useState(true)
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
  const [openBottomModal, setOpenBottomModal] = useState(true);
  const [openBottomModalChatBoard, setOpenBottomModalChatBot] = useState(false);
  const [knowledgeSearchText, setKnowledgeSearchText] = useState("");
  //attachment
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
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
  const [appoimentPopUp, setAppoinmentPopup] = useState(false)
  const [requestStatementHistory, setRequestStatementHistory] = useState([]);
  const [isSolutionFound, setSolutionFound] = useState(false);
  const [activeState, setActiveState] = useState({})
  const { params = {} } = route
  const { userTypeParams = USERTYPE.CUSTOMER } = params
  const [userType, setUserType] = useState(userTypeParams);
  let interactionRedux = useSelector((state) => state.interaction);
  let knowledgeSearchStore = useSelector((state) => state.knowledgeSearch);



  // const [userSeachEnable, setUserSeachEnable] = useState(userType == USERTYPE.USER);
  // For telecom
  const [userSeachEnable, setUserSeachEnable] = useState(false);



  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Do Whatever you want to do on back button click
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton

        if (openBottomModal) {
          unstable_batchedUpdates(() => {
            setOpenBottomModal(false);
            setKnowledgeSearchText("");
            dispatchInteraction(setInteractionReset());
          })
          console.log("inside if..")
          return true;
        }
        else {
          console.log("inside else..")
          return false;
        }

        // setOpenBottomModal(!openBottomModal)

      };

      BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress
        );
    }, [])
  );



  /**
  * Reset state values. This will hanlde reset the state values 
  * @memberOf Interaction
  */
  const resetStateData = (exclude = "") => {
    if (exclude != "setInteractionResponse") {
      setInteractionResponse({});
    }
    setAppoinmentFormData({})
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

  const [temp, setTemp] = useState();
  const handleInputChangeNew = (text, fieldSetItem, formMetaAttributes) => {
    setTemp(prevValues => ({
      ...prevValues,
      [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
      [fieldSetItem?.id]: text
    }));
  }

  const handleInputChange = (text, fieldSetItem, formMetaAttributes) => {
    console.log('text---->', text)
    // setObj(obj => ({
    //   ...obj,
    //   [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
    //   [fieldSetItem?.id]: text
    // }));
  };


  const headerRightForNav = () => {
    return (
      <View style={navBar.navRightCon}>
        {!isEnabledsmartAssist && (
          <Pressable
            onPress={async () => {
              console.log("knowledgeSearchText...", knowledgeSearchText)
              await clearAttachmentData()
              if (knowledgeSearchText == "") {
                resetCreateInterationForm()
              }
              setOpenBottomModal(true)
            }}
            style={{ ...navBar.roundIcon, backgroundColor: color.WHITE }}
          >
            <Icon name="plus" size={28} color={"#4a5996"} />
          </Pressable>
        )}
      </View>
    );
  };


  // useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: headerRightForNav,
  });
  // }, []);

  /**
  * Reset Reducer data this function handles exception error of old data
  * @memberOf Interaction
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
    getAppoinmentsData,
    getHalls
  ]);





  useEffect(() => {
    async function getData() {
      role = "" + await getDataFromDB(storageKeys.CURRENT_ROLE_ID)
      console.log("current role id..", role)


      console.log(obj, "getting halls3..");
      await dispatchInteraction(await getHalls())
      console.log("meeting halls data2...", interactionReducer.meetingHallsData)

      // const userId = await getUserId();
      // console.log("current userId..", userId)

      // if (role == "24") {

      //   const status = await props.profileDispatch(
      //     fetchSavedProfileDataByUser(
      //       userId
      //     )
      //   );

      // For telecom
      setUserSeachEnable(false)
      setSearchOpen(false)
      // }
    }
    getData()
  }, []);

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
  // useEffect(() => {
  // if (profileReducer.IsSearchEmpty) {
  // setTimeout(() => {
  //todo
  // navigation.navigate(STACK_CREATE_CUSTOMER)
  // }, 3000)
  // }
  // }, [profileReducer.IsSearchEmpty])



  // useEffect(async () => {
  //   const flowId = get(get(interactionReducer, "InteractionData", []), 'flwId', '')
  //   const conversationID = get(get(interactionReducer, "InteractionData", []), 'conversationUid', '')
  //   const requestId = get(get(interactionReducer, "InteractionData", []), 'requestId', '')

  //   const { response, actionType } = await dispatchInteraction(
  //     fetchInteractionAction(typeOfAccrodin.knowlegde.value, {
  //       {
  //         flowId: flowId, 
  //         conversationUid: conversationID,
  //         requestId: requestId,

  //       }


  //       moduleName: "KnowledgeBaseMobileApp",
  //       customerId: "" + get(profileReducer, `${activeData}.customerId`, '')
  //     })
  //   );

  //   // console.log("intreaction data response    ", response)
  //   // setLoader(false)

  //   // const status = await handleInteligenceResponse(response, item, actionType)
  //   // console.log('response', status)

  //   console.log("call resolution use case called...")

  // }, [callResolution]);


  useEffect(() => {
    /**
    * Fetch API Data : Fetch master data and profile  for interaction screen
    * @memberOf Interaction
  
    */
    async function fetchData() {
      const {
        SERVICE_TYPE,
        INTXN_TYPE,
        PRIORITY,
        CONTACT_TYPE,
        INTXN_STATEMENT,
        CONTACT_PREFERENCE,
        INTXN_CAUSE,
        PROBLEM_CAUSE,
        PROD_SUB_TYPE,
        INTXN_CATEGORY,
        LOCATION,
        TICKET_CHANNEL,
        APPOINT_TYPE
      } = MASTER_DATA_CONSTANT;
      //set service
      //to get data from api

      //  await dispatchInteraction(fetchInteractionAction(true));
      profileDispatch(fetchMyProfileData(navigation));
      setLoader(false);
      // master only invoke load
      masterDispatch(
        getMasterData(
          `${INTXN_TYPE},${SERVICE_TYPE},${INTXN_CAUSE},${CONTACT_TYPE},${PRIORITY},${PROD_SUB_TYPE},${INTXN_CATEGORY},${APPOINT_TYPE},${TICKET_CHANNEL},${LOCATION},${CONTACT_PREFERENCE}`
        )
      );



    }

    fetchData();
  }, []);

  const [serviceList, setServiceList] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      const customerUUID = await getCustomerUUID()
      const res = await APICall(`${endPoints.SERVICE_LIST}`, 'POST', { customerUuid: customerUUID.toString() });
      custServiceList = get(res, 'response.data', [])
      if (custServiceList.length > 0) {
        const parsedata = custServiceList.map(item => {
          return { description: item.serviceName, code: item.serviceNo }
        });
        dispatch(setServiceData(parsedata));
        // parsedCustServiceList = parsedata
        // setService({
        //   productNo: get(serviceList, '[0].productDetails[0].productNo', ""),
        //   code: parsedata[0].code,
        //   description: parsedata[0].description,
        // });
      }
    }

    const isConsumer = userType == USERTYPE.CUSTOMER;
    if (isConsumer) {
      fetchMyAPI();
    }

  }, []);

  const [interactionList, setInteractionList] = useState([])
  const [priorityList, setPriorityList] = useState([])
  const [problemList, setProblemList] = useState([])

  const [serviceTypelist, setServiceTypelist] = useState([])
  const [serviceCategoryList, setServiceCategoryList] = useState([])
  const [interactionCategoryList, setInteractionCategoryList] = useState([])
  const [contactTypeList, setContactTypeList] = useState([])
  const [locationList, setLocationList] = useState([])
  const [appointList, setAppoimentList] = useState([])
  const [SearchModelisOpen, setSearchOpen] = useState(true)

  useEffect(() => {
    console.log("master data", masterReducer)
    setInteractionList(get(masterReducer, "masterdataData.INTXN_TYPE", []))
    setPriorityList(get(masterReducer, "masterdataData.PRIORITY", []))
    setProblemList(get(masterReducer, "masterdataData.INTXN_CAUSE", []))
    setServiceTypelist(get(masterReducer, "masterdataData.SERVICE_TYPE", []));
    setServiceCategoryList(get(masterReducer, "masterdataData.PROD_SUB_TYPE", []))
    setInteractionCategoryList(get(
      masterReducer,
      "masterdataData.INTXN_CATEGORY",
      []
    ))
    setAppoimentList(get(masterReducer, "masterdataData.APPOINT_TYPE", []))
    setLocationList(get(masterReducer, "masterdataData.LOCATION", []))
    setContactTypeList(get(masterReducer, "masterdataData.CONTACT_PREFERENCE", []))
  }, [masterReducer])

  const resetCreateInterationForm = () => {
    const data = { code: "", description: "" }
    setDropDownFormField("interactionType", data);
    setDropDownFormField("interactionCategory", data);
    setDropDownFormField("serviceCategory", data);
    setDropDownFormField("serviceType", data);
    setDropDownFormField("priorityCode", data);
    setFileAttachments([]);
    setFormField("remarks", "");
  }

  useLayoutEffect(() => {
    resetCreateInterationForm()
  }, [])


  let customerPic =
    get(profileReducer, "savedProfileData.customerPhoto", null) ??
    DEFAULT_PROFILE_IMAGE;

  if (customerPic == "") customerPic = DEFAULT_PROFILE_IMAGE

  console.log("customer picture 1", customerPic, profileReducer)
  const addresss = get(profileReducer, "savedProfileData.customerAddress", []);

  const resetStateAfterSearchClicked = () => {
    //search result panal

    setKnowledgeSearchText("");
    setautoSuggestionList(false);
    //search box end
  };

  /**
   * Statement search and listout statements
   * @memberOf Interaction
   * @param  {string} text search string
   * @returns {JSX} Return JSX of
   */

  const onChangeKnowledgeSearchText = async (text) => {

    setKnowledgeSearchText(text);

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
  * Handle the knowledge search API response
  * @memberOf Interaction
  * @param  {Object} apiRespData Knowledge serach API response data
  * @param  {string} actionType what kind of response is received from API
  * @returns {JSX} Return JSX of
  */
  const handleInteligenceResponse = async (apiRespData, item = {}, actionType = "auto_resolution") => {
    try {
      const debugg = true
      if (debugg) console.log('handleInteligenceResponse: parms resp', apiRespData, "item", item)
      const isCreateInteraction = false
      if (debugg) console.log('handleInteligenceResponse :isCreateInteraction api response', isCreateInteraction)
      if (debugg) console.log('handleInteligenceResponse : actionType', actionType)

      if (actionType == "noservive") {
        Toast.show({
          type: "bctError",
          text1: "No Resolution Found",
        });
        return;
      }

      //interaction creation part  
      if (actionType == "auto_resolution") {
        await setBottombartitle(typeOfAccrodin.resolved.title);
        await setCreateInteractionType(INTELIGENCE_STATUS.RESOVLED)
        setactiveChatBot(typeOfAccrodin.resolved)
        setOpenBottomModalChatBot(true)
        return null
      }

      //product selection creation part  
      // if (actionType == "choose_item") {
      //   await setBottombartitle(typeOfAccrodin.resolved.title);
      //   await setCreateInteractionType(INTELIGENCE_STATUS.RESOVLED)
      //   setactiveChatBot(typeOfAccrodin.resolved)
      //   setOpenBottomModalChatBot(true)
      //   return null
      // }

      if (isCreateInteraction) {
        //todo popup
        if (debugg) console.log('handleInteligenceResponse : crate interaction if condition')

        const status = presetInteractionFormData(item)
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

        const resolutionList = get(apiRespData, 'resolutionAction.data', [])
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

  const searchWordCustomiz = (text) => {
    try {
      if (text.length == 0) return text
      if (knowledgeSearchText == "") return text
      const searchIndx = text.toLocaleLowerCase().search(knowledgeSearchText.toLocaleLowerCase())
      console.log("search index", searchIndx)
      if (searchIndx == -1) return text
      let finalData = []
      const len = knowledgeSearchText.length
      const sliceText = text.slice(searchIndx, searchIndx + len)
      const arrayRange = Array.from({ length: len }, (x, i) => i + searchIndx);
      console.log("arr", arrayRange)
      const largeIdx = Math.max.apply(0, arrayRange)
      console.log("larget", largeIdx)

      const word = text.split("")
      word.map((item, idx) => {
        if (arrayRange.includes(idx)) {
          if (idx == largeIdx) {
            finalData.push(<Text style={{ color: 'red' }}>{sliceText}</Text>)
          }
        }
        else {
          finalData.push(item)

        }
      })
      console.log("data", finalData)
      return finalData
    } catch (error) {
      console.log("erre", error)
      return text
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
        <View style={{ flex: 1 }}>
          <FlatList
            scrollEnabled={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            // contentContainerStyle={{ height: 500 }}
            data={result}
            renderItem={({ item }) => {
              return (
                <List.Item
                  title={() => {
                    return (<Text>{searchWordCustomiz(item?.requestStatement)}</Text>)
                  }}
                  titleStyle={{
                    fontSize: 10,
                    padding: 0,
                    margin: 0,
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    // height: 40,
                    borderBottomColor: colors.gray,
                    borderBottomWidth: 0.5,
                    paddingHorizontal: 4,
                    // borderRadius: 3,
                  }}
                  onPress={async () => {

                    setFormDataArray({})

                    setsearchStandaloneModel(true)
                    setKnowledgeSearchText(false);

                    //open form model
                    setautoSuggestionList(false);
                    Keyboard?.dismiss();
                    setKnowledgeSearchText(item?.requestStatement);
                    setActiveState({
                      requestId: item.requestId,
                      requestStatement: item.requestStatement
                    })

                    //check if smart assistance not enable then going this normal way
                    if (!isEnabledsmartAssist) {
                      presetInteractionFormData(item)
                      setBottombartitle("Create Interaction")
                      setautoSuggestionList(false);
                      setOpenBottomModal(true)
                      return;
                    }

                    console.log("intreaction data", item)
                    presetInteractionFormData(item)

                    console.log("1............")

                    //auto and clear search text
                    setautoSuggestionList(false);
                    console.log("2............")
                    const activeData = get(profileReducer, 'userSelectedProfileDetails.customerUuid', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";
                    console.log("3............")
                    //store selected result in cache
                    await setBottombartitle(typeOfAccrodin?.knowlegde?.title);
                    console.log("4............")
                    setLoader(true)

                    console.log("5A............", await getDataFromDB(storageKeys.CUSTOMER_ID))
                    console.log("5B............", await getDataFromDB(storageKeys.CUSTOMER_UUID))

                    console.log("cust id rec....", "" + await getCustomerID())
                    console.log("active data...", get(profileReducer, `${activeData}.customerUuid`, ''))

                    const { response, actionType } = await dispatchInteraction(

                      fetchInteractionAction(typeOfAccrodin.knowlegde.value, {
                        customerUuid: await getDataFromDB(storageKeys.CUSTOMER_UUID),
                        requestId: parseInt(item.requestId),
                        moduleName: "KnowledgeBaseMobileApp",
                        customerId: await getDataFromDB(storageKeys.CUSTOMER_ID)
                      })
                    );
                    console.log("intreaction data response    ", response)
                    setLoader(false)

                    const status = await handleInteligenceResponse(response, item, actionType)
                    console.log('response', status)



                  }}
                />
              );
            }
            }
          />
        </View>
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
  /**
  * Pre set the form's data before open the create interaction popup
  * @memberOf Interaction
  * @param  {Object} item form data 
  */
  const presetInteractionFormData = (item) => {
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


      if (debuggg) console.log('serviveCatType', serviceCategoryList, serviveCatType)
      const prirtyCode = get(
        priorityList?.filter(
          (it) => it.code == item.priorityCode
        ),
        "[0]",
        { code: "", description: "" }
      );

      if (debuggg) console.log('prirtyCode', prirtyCode)
      //to do from api response
      //make array
      const contactPerferance = get(item, "contactPreference", [])

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

      // setFormField("contactPerference", contactPerferance);

      setDropDownFormField("interactionCategory", interCat);

      setDropDownFormField("interactionType", interType);

      setDropDownFormField("serviceCategory", serviveCatType);

      setDropDownFormField("serviceType", serviveType);
      //problem cause
      //setDropDownFormField("problemCause", problemCause)


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
  /**
  * Handle the dropdown of (Top 10 Category,Recently inteaction)
  * @memberOf Interaction
  */
  const renderAccordin = useMemo(() => {
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

    // var custId = ""
    // load()
    // load()

    // async function load() {
    //   var custId = "" + await getDataFromDB(storageKeys.CUSTOMER_ID)
    //   console.log("custId rec3..", custId)
    //   return custId
    // }

    console.log("profile", profileReducer)
    const activeData = get(profileReducer, 'userSelectedProfileDetails.firstName', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";
    console.log("profile active ", activeData)

    const addr = get(profileReducer, `${activeData}.customerAddress`, []);
    const mobilePath = userType == USERTYPE.CUSTOMER ? "customerContact[0].mobileNo" : "contactNo"
    const emailPath = userType == USERTYPE.CUSTOMER ? "customerContact[0].emailId" : "email"

    // const mobilePath = "customerContact[0].mobileNo"
    // const emailPath = "customerContact[0].emailId"

    const customerCategoryPath = userType == USERTYPE.CUSTOMER ? "customerCatDesc.description" : "customerCatDesc.description"
    const customerStatusPath = userType == USERTYPE.CUSTOMER ? "statusDesc.description" : "statusDesc.description"
    const customerCategory = get(profileReducer, `${activeData}.${customerCategoryPath}`, "")
    const customerStatus = get(profileReducer, `${activeData}.${customerStatusPath}`, "")




    // console.log("cutomer cat", customerCategory, customerStatus, custId)

    const serviceData = get(profileReducer, "serviceData", [])
    console.log("serviceData..", serviceData)




    return (

      <ImageBackground
        source={require("../../Assets/icons/login_card_background.png")}
        // resizeMode="contain"
        style={{
          // margin: 5,
          zIndex: 999,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 30,
          backgroundColor: "#ffff",
          borderRadius: 16,
          elevation: 1,
          borderColor:
            userType == USERTYPE.CUSTOMER ? "#0CD222" : colors.userTypeColor,
          borderWidth: 3,
        }}
      >
        {console.log("inside render profile..", userType)}
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
                  {customerStatus}
                </Text>
              </ImageBackground>
            </View>
            {customerCategory != "" &&
              <View>
                <ImageBackground
                  source={require("../../Assets/icons/business_background.png")}
                  resizeMode="cover"
                  style={{ width: "100%" }}
                >
                  <Text
                    style={{
                      color: "#cf4751",
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingLeft: 18,
                      paddingRight: 18,
                    }}
                  >
                    {customerCategory}
                  </Text>
                </ImageBackground>
              </View>
            }

          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View>
              <Image
                source={{
                  uri: customerPic,
                }}
                // imageStyle={{ borderRadius: 60 }}
                style={{ height: 60, width: 60 }}
              />
            </View>
            <View style={{ flexDirection: "column", marginLeft: 20 }}>
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


              {/* <Text
                variant="bodySmall"
                style={{
                  fontWeight: "400",
                  color: colors.textColor,
                }}
              >
                Customer Id : {load()}
              </Text> */}

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
            </View>
          </View>
        </View>
        {/* <View style={{ marginTop: 10, backgroundColor: colors.textColor }}>
          <Image source={require("../../Assets/icons/line.png")} />
        </View> */}



        {console.log("sel cust uuid..", get(profileReducer, 'savedProfileData', ''))}


        {/* <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12, }}> */}

        {/* <View style={{ flexDirection: "row", alignItems: "center", minWidth: 140 }}>
            <Image
              source={require("../../Assets/icons/interaction_contact.png")}
              style={{ width: 45, height: 45 }} />

            <Text
              variant="bodySmall"
              style={{
                fontWeight: "400",
                color: colors.textColor,

              }}>
              {

                get(
                  profileReducer,
                  `${activeData}.${mobilePath}`,
                  ""
                )}

            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <Image
              source={require("../../Assets/icons/interaction_loc.png")}
              style={{ width: 45, height: 45 }} />

            <Text
              numberOfLines={4}
              variant="bodySmall"
              alig
              style={{
                fontWeight: "400",
                width: width * .4,
                flexWrap: "wrap",
                wordWrap: "break-word",
                color: colors.textColor,
              }}
            >
              {handleMultipleContact(addr)}
            </Text>
          </View>
        </View> */}




        {serviceData.length > 0 &&
          <Pressable
            onPress={() => {
              if (serviceData.length > 0) {
                setProfileSeriveModal(!modelProfileServiceModel);
              }
            }}
            style={{
              zIndex: 9,
              flexDirection: "row",
              width: "100%",
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
            {serviceData.length > 0 && (
              <Icon
                name={!modelProfileServiceModel ? "chevron-down" : "chevron-up"}
                size={20}
                color={colors.textColor}
              />
            )}
          </Pressable>
        }

        {
          modelProfileServiceModel && (
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
              <View style={styles.serviceContainer}>
                {serviceData.map((ite) => {
                  return (
                    <List.Item
                      key={ite.code}
                      title={ite.description}
                      titleStyle={{
                        fontSize: 13,
                        padding: 8,
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
          )
        }
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
    if (createInteractionType != INTELIGENCE_STATUS.PRODUCT_WITH_MULTIPLE_ITEM) {
      console.log('HandleMultipleCaseInChatBoard :suggestion list', suggestionList)
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
                    // await setBottombartitle(typeOfAccrodin.knowlegde.title);
                    setOpenBottomModalChatBot(false);
                    setLoader(true)
                    const activeData = get(profileReducer, 'userSelectedProfileDetails.customerUuid', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";

                    console.log("ddfdf", {
                      customerUuid: get(profileReducer, `${activeData}.customerUuid`, ''),
                      requestId: ite
                    })
                    const { response, actionType } = await dispatchInteraction(
                      fetchInteractionAction(typeOfAccrodin.knowlegde.value, {
                        customerUuid: get(profileReducer, `${activeData}.customerUuid`, ''),
                        requestId: parseInt(ite.requestId),
                        moduleName: "KnowledgeBaseMobileApp",
                        customerId: "" + await getCustomerID()

                      })
                    );
                    setLoader(false)
                    const status = await handleInteligenceResponse(response, ite, actionType)
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
    else {
      return (
        <View style={styles.bottomContainer}>
          <ClearSpace size={2} />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {get(suggestionList, 'resolutionAction.data.length', 0) > 0 ? (
              get(suggestionList, 'resolutionAction.data').map((ite) => (
                // eslint-disable-next-line react/jsx-key
                <Chip
                  mode="outlined"
                  onPress={async () => {
                    setLoader(true)

                    const activeData = get(profileReducer, 'userSelectedProfileDetails.customerUuid', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";
                    const { response, actionType } = await dispatchInteraction(
                      fetchInteractionAction(typeOfAccrodin.knowlegde.value, {
                        customerUuid: get(profileReducer, `${activeData}.customerUuid`, ''),
                        requestId: parseInt(get(ite, "requestId", ""))
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
  }
  /**
   * render bottom chat
   *
   */
  const RenderBottomChatBoard = () => {
    const suggestionList = get(interactionReducer, "knowledgeHistory", []);

    console.log('RenderBottomChatBoard,', createInteractionType, activeChatBotSec)
    //todo

    if (activeChatBotSec == "") {
      console.log("setactiveChatBot not set for title for chat bot");
      return null;
    }

    if (createInteractionType == INTELIGENCE_STATUS.RESOVLED) {

      console.log('a1.........')
      const activeData = get(profileReducer, 'userSelectedProfileDetails.customerUuid', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";
      console.log('a2.........')
      // console.log('resolution RenderBottomChatBoard resolved', suggestionList)



      // useEffect(() => {
      //   console.log(obj, "from interaction to order");
      // }, [obj]);

      return (
        <HandleResolution
          formDataArray={formDataArray}
          setFormDataArray={setFormDataArray}
          handleNextForm={handleNextForm}
          // obj={obj}
          setObj={handleSetObj}
          data={{
            obj
          }}
          // handler={{
          //   setObj
          // }}
          // inputText={inputText}
          handleInputChange={handleInputChange}
          customerUuid={get(profileReducer, `${activeData}.customerUuid`, '')}
          popupAction={async (params) => {
            setLoader(true)
            console.log("hitting popupAction", params)
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

    console.log('a3.........' + interactionList)
    console.log('a5.........' + suggestionList)

    return (
      <HandleMultipleCaseInChatBoard
        suggestionList={interactionList}
        resolutionHistory={suggestionList}
      />
    );
  };
  if (openBottomModal) {
    console.log('a4.........')
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
      if (item.type == INPUT_TYPE.ARRAY && item.required) {
        if (item.value?.length != 0) {
          const data = item.value.filter(item => item.active == true)
          console.log(":123data", data, data.length)
          if (data?.length == 0) isButtonEnable = false;

        }
        else {
          isButtonEnable == false
        }
      }


    });
  }


  const isModelOpen =
    openBottomModal || openBottomModalChatBoard || userSeachEnable;


  return (
    <>
      {(enableSuccessScreen == interactionResponseScreen.FAILED) &&

        <View style={{ ...commonStyle.center, flex: 1, position: "relative", backgroundColor: "red", top: '50%', marginBottom: 1000 }}>
          <InteractionFailed
            okHandler={() => {
              //Failed action
              resetReducerNdState();
            }}
          />
        </View>
      }

      {(enableSuccessScreen == interactionResponseScreen.SUCCESS) &&

        <View style={{ ...commonStyle.center, flex: 1, position: "relative", backgroundColor: "red", top: '50%', marginBottom: 1000 }}>
          <InteractionSuccess
            intxId={intereactionAddResponse?.intxnNo}
            cancelButtonRequired={true}
            okHandler={async () => {
              await resetStateData("setInteractionResponse");
              console.log("hiting", intereactionAddResponse)

              // navigation.navigate(STACK_INTERACTION_DETAILS, {
              //   interactionID: intereactionAddResponse,
              // });

              let params = {
                interactionSearchParams: intereactionAddResponse
              }
              navigation.navigate(STACK_INTERACTION_DETAILS, {
                interactionSearchParams: params
              })
            }}
            cancelHandler={async () => {
              await resetStateData("setInteractionResponse");
              setEnableSuccessScreen(interactionResponseScreen.NONE)
            }}
          />
        </View>

      }
      {/* {(enableSuccessScreen == interactionResponseScreen.EMPTY_CUSTOMER) &&
        <View style={{ ...commonStyle.center, flex: 1, margin: 10 }}>
          <InteractionSuccess
            intxId={intereactionAddResponse?.intxnNo}
            cancelButtonRequired={true}
            okHandler={async () => {
              await resetStateData("setInteractionResponse");
              navigation.navigate(STACK_CREATE_CUSTOMER, {
                interactionID: intereactionAddResponse?.intxnNo,
              });
            }}
            cancelHandler={() => { }}
          />
        </View>
      } */}

      {
        profileReducer.IsSearchEmpty &&
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

      {

        // For telecom
        // ((userType == USERTYPE.USER) &&
        // useMemo(() => {
        //   return userNavigationIcon({
        //     navigation,
        //     setOpenBottomModal: setOpenBottomModal,
        //     setSearchOpen: setSearchOpen,
        //     setEnableSuccessScreens: () => {
        //       //to do when user search is empty
        //       {/* setEnableSuccessScreen(interactionResponseScreen.EMPTY_CUSTOMER) */ }
        //     },
        //     setLoader,
        //     profileDispatch,
        //     headerRightForNav,
        //     headerTitle: "Interaction",
        //     profileSearchData: get(profileReducer, "profileSearchData", [])
        //   });
        // }, [setSearchOpen, setOpenBottomModal, userSeachEnable, headerRightForNav, setLoader, navigation, profileDispatch, setEnableSuccessScreen, userType]
        //   // )
        // )
      }

      {
        ((userType == USERTYPE.USER) &&
          useMemo(() => {
            return (
              <RenderUserSelectResult
                profileSearchData={get(profileReducer, "profileSearchData", [])}
                setLoader={setLoader}
                setUserSeachEnable={setUserSeachEnable}
                SearchModelisOpen={SearchModelisOpen}
                setSearchOpen={setSearchOpen}
                profileDispatch={profileDispatch}
                headerRightForNav={headerRightForNav}
                headerTitle={"Interaction"}
                navigation={navigation}
              />
            );
          }, [
            userType,
            profileReducer,
            setLoader,
            setUserType,
            profileDispatch,
            navigation,
            userSeachEnable,
            headerRightForNav,
          ]))
      }

      {appoimentPopUp && <AppointmentPop
        appointList={appointList}
        formData={appoinmentFormData}
        locationList={locationList}
        setAppoinmentPopup={setAppoinmentPopup}
      />}

      {
        loader && (
          <LoadingAnimation title="while we are creating Interaction." />
        )
      }

      {
        interactionReducer.initInteraction && (
          <LoadingAnimation title="fetch data" />
        )
      }

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {console.log("isModelOpen...", isModelOpen)}
        {console.log("userSeachEnable...", userSeachEnable)}




        <View
          style={{
            ...styles.container,
            backgroundColor: isModelOpen ? "gray" : "#F0F0F0",
            opacity: isModelOpen ? userSeachEnable ? 0 : 0.3 : 1,
          }}
        >
          {console.log("opacity...", isModelOpen ? userSeachEnable ? 0 : 0.3 : 1)}

          {/* profile card */}
          {renderProfileTab}

          <ClearSpace size={2} />

          <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
            <Text variant="bodyMedium">
              Smart Assistance
            </Text>
            <Switch

              onValueChange={(status) => {
                setSmartAssistance(status)

                setKnowledgeSearchText(false);
                setsearchStandaloneModel(true);
                //open form model
                setautoSuggestionList(false);
                Keyboard?.dismiss();
                resetCreateInterationForm()
              }}
              value={isEnabledsmartAssist}
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
                  //Keyboard?.dismiss();
                  // resetCreateInterationForm()
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
              {renderAccordin}
            </>
          )}
          <RenderSearchResult />

          {/* search box end */}
          {/*knowledge search*/}
        </View>
      </ScrollView>
      <FooterModel
        open={openBottomModalChatBoard}
        setOpen={setOpenBottomModalChatBot}
        title={`${bottomBarTitle} ${isSolutionFound ? "- Solution Found" : ""}`}
      >
        <RenderBottomChatBoard />
      </FooterModel>

      <FooterModel
        open={openBottomModal}
        setOpen={setOpenBottomModal}
        title={bottomBarTitle}
        disableCloseBut={true}>
        <ScrollView contentContainerStyle={{ flex: 1 }} nestedScrollEnabled={true}>


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
                {/* problem cause */}
                {/* <CustomDropDownFullWidth
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
                  /> */}
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

                {contactTypeList.length != 0 && (
                  <View style={{ marginTop: 10 }}>
                    <CheckGroupbox
                      data={contactTypeList.map((ite) => {
                        return {
                          code: ite.code,
                          description: ite.description,
                          active: false,
                        }
                      })
                      }
                      values={get(contactPerference, "value", "")}
                      setValues={(data) => {
                        setFormField("contactPerference", data);

                      }}
                      label="Contact Preference"
                    />
                  </View>
                )}

              </>
            }
            <CustomInput
              style={{ marginTop: 30 }}
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
                  unstable_batchedUpdates(() => {
                    setOpenBottomModal(false);
                    setKnowledgeSearchText("");
                    dispatchInteraction(setInteractionReset());
                  })
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <CustomButton
                isDisabled={!isButtonEnable}
                // isDisabled={false}
                loading={loaderAdd}
                label={strings.submit}
                onPress={async () => {

                  const input = interactionRedux.formData;

                  const logg = true
                  if (logg) console.log('create complienta :entered', interactionRedux)
                  const activeData = get(profileReducer, 'userSelectedProfileDetails.firstName', '') == '' ? "savedProfileData" : "userSelectedProfileDetails";
                  // const customerID = get(profileReducer, `${activeData}.customerId`, "");
                  const customerID = await getDataFromDB(storageKeys.CUSTOMER_ID);
                  if (customerID == "") console.log("cusomter id is empty");


                  if (logg) console.log('create complienta :customer id', customerID)
                  if (logg) console.log('create complienta :input', input)
                  const profileInfo = get(profileReducer, `${activeData}.customerAddress[0]`, "");
                  console.log("profile info", profileInfo)


                  var attachments = await getDataFromDB("ATTACHMENTS")
                  var _attachments = attachments.split("~")

                  console.log("retrive attachments1.." + attachments)
                  console.log("retrive attachments2.." + _attachments)


                  var params = {}

                  if (appoimentPopUp) {
                    params = {
                      customerId: customerID,

                      // statement: input.statement.value,
                      // statementId: input.statementId.value,
                      //problem cause
                      // problemCause: input.problemCause.value?.code,
                      interactionCategory:
                        input.interactionCategory.value?.code,
                      serviceCategory: input.serviceCategory.value?.code,
                      interactionType: input.interactionType.value?.code,
                      serviceType: input.serviceType.value?.code,
                      channel: "MOBILEAPP",
                      priorityCode: input.priorityCode.value?.code,
                      contactPreference: input.contactPerference.value.filter(it => it.active == true).map(item => item.code),
                      remarks: input.remarks.value,
                      statement: get(activeState, 'requestStatement', ''),
                      statementId: get(activeState, 'requestId', ''),
                      appointAddress: {
                        address1: profileInfo.address1,
                        address2: profileInfo.address2,
                        address3: profileInfo.address3,
                        city: profileInfo.city,
                        state: profileInfo.state,
                        district: profileInfo.district,
                        postcode: profileInfo.postcode,
                        country: profileInfo.country,
                      }
                    };
                  }
                  else {
                    params = {
                      customerId: customerID,
                      attachments: _attachments,
                      // statement: input.statement.value,
                      // statementId: input.statementId.value,
                      //problem cause
                      // problemCause: input.problemCause.value?.code,
                      interactionCategory:
                        input.interactionCategory.value?.code,
                      serviceCategory: input.serviceCategory.value?.code,
                      interactionType: input.interactionType.value?.code,
                      serviceType: input.serviceType.value?.code,
                      channel: "MOBILEAPP",
                      priorityCode: input.priorityCode.value?.code,
                      contactPreference: input.contactPerference.value.filter(it => it.active == true).map(item => item.code),
                      remarks: input.remarks.value,
                      statement: get(activeState, 'requestStatement', ''),
                      statementId: get(activeState, 'requestId', ''),
                      // appointAddress: {
                      //   address1: profileInfo.address1,
                      //   address2: profileInfo.address2,
                      //   address3: profileInfo.address3,
                      //   city: profileInfo.city,
                      //   state: profileInfo.state,
                      //   district: profileInfo.district,
                      //   postcode: profileInfo.postcode,
                      //   country: profileInfo.country,
                      // }
                    };
                  }



                  console.log("final params", params)

                  const templeAPIPayload = {
                    mapCategory: "TMC_INTERACTION",
                    serviceCategory: input.serviceCategory.value?.code,
                    serviceType: input.serviceType.value?.code,
                    customerCategory: "REG",
                    tranType: input.interactionType.value?.code, //interaction type
                    tranCategory: input.interactionCategory.value?.code, //inteaction cateogy
                    tranPriority: input.priorityCode.value?.code,
                    // "mapCategory": "TMC_INTERACTION",
                    // "serviceCategory": "PST_LOANS",
                    // "serviceType": "ST_BANK",
                    // "customerCategory": "REG",
                    // "tranType": "REQUEST",
                    // "tranCategory": "ACCOUNT_RELATED",
                    // "tranPriority": "PRTYHGH"
                  }
                  console.log("appointment templte", templeAPIPayload)
                  // console.log("payload", templeAPIPayload)
                  const appoinTemplete = await dispatchInteraction(getAppoinmentsData(templeAPIPayload));
                  console.log("templete view response ", appoinTemplete)
                  if (appoinTemplete != false) {
                    //for reference
                    setAppoinmentFormData({ ...params, templateId: appoinTemplete, productNo: activeService.productNo })
                    setAppoinmentPopup(true)
                    return;
                  }

                  if (logg) console.log('create complienta :create obj', params)


                  const { status, response } = await dispatchInteraction(
                    addInteractionAction(params, fileAttachments)
                  );
                  if (logg) console.log('create complienta :create obj', params)
                  console.log("interaction type response ", response);

                  if (status) {
                    setInteractionResponse(response);
                    setOpenBottomModal(false)
                    setEnableSuccessScreen(interactionResponseScreen.SUCCESS);
                    dispatchInteraction(setInteractionReset());

                  } else {

                    // setEnableSuccessScreen(interactionResponseScreen.FAILED);
                  }
                }}
              />
            </View>
          </View>

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
  serviceContainer: {
    zIndex: 99999999,
    position: "absolute",
    backgroundColor: "#fff",
    elevation: 1,
    width: 360,
    borderRadius: 3,
    // minHeight: 100,
    bottom: -60,
    left: 10,
    right: 0,
  },
});

export default InteractionsToOrder;