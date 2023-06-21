import get from "lodash.get";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import DatePicker from "react-native-date-picker";
import { Checkbox, Modal, TextInput, useTheme } from "react-native-paper";
import StepIndicator from "react-native-step-indicator";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import LoadingAnimation from "../../Components/LoadingAnimation";
import {
  getMasterData,
  MASTER_DATA_CONSTANT
} from "../../Redux/masterDataDispatcher";
import { fetchRegisterFormData } from "../../Redux/RegisterDispatcher";
import { endPoints } from "../../Utilities/API/ApiConstants";
import { CustomButton } from "./../../Components/CustomButton";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";
import { CustomInput } from "./../../Components/CustomInput";
import { CustomInputWithCC } from "./../../Components/CustomInputWithCC";
import CustomTitleText from "./../../Components/CustomTitleText";
import { FooterModel } from "./../../Components/FooterModel";
import { strings } from "./../../Utilities/Language/index";
import {
  excludedCountriesList,
  getPhoneNumberLength
} from "./../../Utilities/utils";
import BillDetails from "./BillDetails";
import {
  removeCategoryProducts,
  setCurrentStepInStore,
  setShowAccountCreationModal,
  setSignatureInFormData
} from "./CreateCustomerAction";
import {
  createCustomer, createCustomerService, createOrderForCustomer, fetchServiceProducts, updateAccountData, updateCustomerData, updateCustomerServiceData,
  updateCustomerStatus
} from "./CreateCustomerDispatcher";
import CustomerAgreement from "./CustomerAgreement";
import CustomerType from "./CustomerType";
import { FaceDetection } from "./FaceDetection";
import { Facerecogne } from "./FaceRegconize";
import Product from "./Product";
import SelectedProduct, { RenderAppoinmentModel, RenderSelectStore } from "./SelectedProduct";
import ServiceCategory from "./ServiceCategory";
import { FACE_RECOG_GET_START, FACE_RECOG_IM_READY, FACE_RECOG_TAKE_SELFI, FACE_RECOG_UPLOAD_DOCUS, FACE_RECOG_UPLOAD_DOCUS_LOADER, FACE_RECOG_UPLOAD_DOCUS_SUCCESS, FACE_RECOG_UPLOAD_SELFI, FACE_RECOG_UPLOAD_SELFI_SUCCESS, handleBackNavHandle, STEP_AGREE, STEP_CUSTOMER_ADDRESS, STEP_CUSTOMER_FORM, STEP_SERVICE_2_SHOW_SELECTED, STEP_SERVICE_LIST } from "./Steps";
import UploadDocument from "./UploadDocument";
import { APICallForMuti } from "./util";

import {
  getCityByDistrict,
  getPostCodeByCity,
  getUniqueDistricts,
  getUniqueState
} from "./utilities";
//enble logs
import { commonStyle } from '../../Utilities/Style/commonStyle';
const logg = true
const CreateCustomer = ({ navigation }) => {
  const { colors } = useTheme();

  const dispatch = useDispatch([
    fetchServiceProducts,
    removeCategoryProducts,
    getMasterData,
    fetchRegisterFormData,
    createCustomer,
    updateCustomerData,
    createCustomerService,
    updateCustomerServiceData,
    setCurrentStepInStore,
    setSignatureInFormData,
    updateCustomerStatus,
    updateAccountData,
    createOrderForCustomer,
  ]);

  const [formData, setFormData] = useState({
    getQuote: false,
    showAccountCreationModal: false,
    customerDetails: {},
    accountDetails: {},
    serviceDetails: { details: [] },
  });
  const initalImgObj = {
    face: {},
    idCard: {},
    fullId: {}
  }
  const [activeProduct, setAcitveProduct] = useState({})
  const [loaderLbl, setLoaderLbl] = useState("while we are fetching country")
  const [userIDImg, setUserIDImg] = useState(initalImgObj)
  const [loader, setLoader] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState("district");
  const [addressTakenType, setAddressTakenType] = useState("Manual");

  const [stepIndicator, setStepIndicator] = useState(0);
  const [showCustomerTypeModal, setShowCustomerTypeModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showSameAccountDetailsModal, setShowSameAccountDetailsModal] =
    useState(false);
  const [createAccount, setCreateAccount] = useState(true);
  const [isSameServiceAddressChecked, setIsSameServiceAddressChecked] =
    useState(false);
  const [isSameCustomerDetailsChecked, setIsSameCustomerDetailsChecked] =
    useState(false);
  const [isSameAccountAddressChecked, setIsSameAccountAddressChecked] =
    useState(false);
  const [useSameCustomerDetails, setUseSameCustomerDetails] = useState(false);
  const [numberError, setNumberError] = useState("");
  const [countryCode, setCountryCode] = useState("+673");
  const [numberMaxLength, setNumberMaxLength] = useState(7);
  const [countryPickModel, setCountryPickModel] = useState(false);
  const [openBirthDatePicker, setOpenBirthDatePicker] = useState(false);
  const [openRegDatePicker, setOpenRegDatePicker] = useState(false);

  let createCustomerReducerData = useSelector(
    (state) => state.createCustomerReducerData
  );
  let masterReducer = useSelector((state) => state.masterdata);
  const savedLocation = useSelector((state) => state.savedLocations);

  const customerCategoryCode = formData?.customerDetails?.categoryType?.code;
  const { currentStep } = createCustomerReducerData.formData;
  const [showFaceDection, setShowCam] = useState(false)
  const [showBottomModal, setShowBottomModal] = useState(true);
  const [showWorkFromPopUP, setWorkFromPopUp] = useState(false)

  useEffect(() => {
    setFormData(createCustomerReducerData.formData);
  }, [createCustomerReducerData.formData]);


  // Used to fetch master data
  useEffect(() => {
    const {
      CUSTOMER_ID_TYPE,
      CUSTOMER_CATEGORY,
      CONTACT_PREFERENCE,
      CONTACT_TYPE,
      GENDER,
      PRIORITY,
      NOTIFICATION_TYPE,
      BILL_LANGUAGE,
      CURRENCY,
      ACCOUNT_CATEGORY,
      ACCOUNT_LEVEL,
      ACCOUNT_TYPE,
      COUNTRY,
      PRODUCT_TYPE,
      APPOINT_TYPE,
      LOCATION
    } = MASTER_DATA_CONSTANT;

    dispatch(
      getMasterData(
        `${LOCATION},${COUNTRY},${CUSTOMER_ID_TYPE},${CUSTOMER_CATEGORY},${CONTACT_PREFERENCE},${CONTACT_TYPE},${GENDER},,${PRIORITY},${NOTIFICATION_TYPE},${BILL_LANGUAGE},${CURRENCY},${ACCOUNT_CATEGORY},${ACCOUNT_LEVEL},${ACCOUNT_TYPE},${PRODUCT_TYPE},${APPOINT_TYPE}`
      )
    );
  }, []);
  const CUSTOMER_ID_TYPE_LIST = masterReducer?.masterdataData?.CUSTOMER_ID_TYPE;
  const CUSTOMER_CATEGORY_LIST =
    masterReducer?.masterdataData?.CUSTOMER_CATEGORY;
  const GENDER_LIST = masterReducer?.masterdataData?.GENDER;
  const PRIORITY_LIST = masterReducer?.masterdataData?.PRIORITY;
  const CONTACT_TYPE_LIST = masterReducer?.masterdataData?.CONTACT_TYPE;
  const ACCOUNT_CATEGORY_LIST = masterReducer?.masterdataData?.ACCOUNT_CATEGORY;
  const ACCOUNT_TYPE_LIST = masterReducer?.masterdataData?.ACCOUNT_TYPE;
  const ACCOUNT_LEVEL_LIST = masterReducer?.masterdataData?.ACCOUNT_LEVEL;
  const NOTIFICATION_TYPE_LIST =
    masterReducer?.masterdataData?.NOTIFICATION_TYPE;
  const BILL_LANGUAGE_LIST = masterReducer?.masterdataData?.BILL_LANGUAGE;
  const CURRENCY_LIST = masterReducer?.masterdataData?.CURRENCY;
  const PRODUCT_TYPE_LIST = masterReducer?.masterdataData?.PRODUCT_TYPE;

  // Used for step 3 & 4 to display list of available & selected products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(createCustomerReducerData.products);
  }, [createCustomerReducerData.products]);

  // For handling the header title based on stepIndicator
  useLayoutEffect(() => {
    let title = "";
    switch (stepIndicator) {
      case 0:
        title = "Create Customer";
        break;
      case 1:
        title = "Services";
        break;
      case 2:
        title = "Create Account";
        break;
      case 3:
        title = "Agreement";
        break;
      case 4:
        title = "Preview";
        break;
      default:
        title = "Create Customer";
    }

    navigation.setOptions({
      headerTitle: title,
    });
  }, [stepIndicator]);

  // For handling the step indicator in header based on currentStep
  useEffect(() => {
    switch (currentStep) {
      case 0:
      case 1:
      case 2:
        setStepIndicator(0);
        break;
      case 3:
      case 4:
      case 5:
        setStepIndicator(1);
        break;
      case 6:
      case 7:
      case 8:
        setStepIndicator(2);
        break;
      case 9:
        setStepIndicator(3);
        break;
      case 10:
        setStepIndicator(4);
        break;
      default:
        setStepIndicator(0);
        break;
    }
  }, [currentStep]);

  const enableLoader = (status, lbl = "Please Wait..Fetching data") => {
    setLoaderLbl(lbl)
    setLoader(status)

  }
  const onPlaceChosen_2 = (params) => {
    // here is your callback function
    console.log("onPlaceChosen_2", JSON.stringify(params));
    // {
    // "address1":"hno1,b1","address2":"Uttara kannada,Karnataka","address3":"India,581351",

    const addressSplit = params.address1.split(",");
    const address2Split = params.address2.split(",");
    if (currentStep === 2) {
      handleCustomerDetails("address1", get(addressSplit, "[0]", ""));
      handleCustomerDetails("address2", get(addressSplit, "[1]", ""));
      handleCustomerDetails("address3", get(address2Split, "[1]", ""));
      handleCustomerDetails("country", params.country);
      handleCustomerDetails("district", params.district);
      handleCustomerDetails("postCode", params.postcode);
      handleCustomerDetails("state", params.state);
      handleCustomerDetails("city", params.city);
    } else if (currentStep === 5) {
      handleServiceDetails("address1", get(addressSplit, "[0]", ""));
      handleServiceDetails("address2", get(addressSplit, "[1]", ""));
      handleServiceDetails("address3", get(address2Split, "[1]", ""));
      handleServiceDetails("country", params.country);
      handleServiceDetails("district", params.district);
      handleServiceDetails("postCode", params.postcode);
      handleServiceDetails("state", params.state);
      handleServiceDetails("city", params.city);
    } else if (currentStep === 8) {
      handleAccountDetails("address1", get(addressSplit, "[0]", ""));
      handleAccountDetails("address2", get(addressSplit, "[1]", ""));
      handleAccountDetails("address3", get(address2Split, "[1]", ""));
      handleAccountDetails("country", params.country);
      handleAccountDetails("district", params.district);
      handleAccountDetails("postCode", params.postcode);
      handleAccountDetails("state", params.state);
      handleAccountDetails("city", params.city);
    }
    setAddressTakenType("AUTO");
  };

  const locationIconClick = () => {
    navigation.navigate("SavedLocation", {
      onPlaceChosen_2,
      fromPage: "CreateCustomer_2",
    });
  };
  const handleTitleFace = () => {
    switch (currentStep) {
      case FACE_RECOG_UPLOAD_DOCUS_SUCCESS:
        return "Verification"

      default:
        return "Face recognization"

    }
  }
  // Step = -1
  console.log("id card object", userIDImg)
  const renderfaceRegconize = () => {
    return (
      <View>
        <CustomTitleText title={handleTitleFace()} />
        <ClearSpace size={1} />
        <Facerecogne step={currentStep} faces={userIDImg} />
      </View>
    );
  };

  // Step = 0
  const renderUploadDocsUI = () => {
    return (
      <View>
        <CustomTitleText title={"Face recognization"} />
        <UploadDocument />
      </View>
    );
  };
  // Step = 1
  const renderCustomerDetailsUI = () => {
    return (
      <View>
        <CustomTitleText title={"Document details"} />
        <View style={styles.backgroundView}>
          <View style={commonStyle.center}>
            {get(userIDImg, 'face.uri', '') != "" &&
              <Image source={{ uri: get(userIDImg, 'face.uri', '') }} style={{
                width: 80,
                height: 80,
                borderRadius: 80
              }} />
            }
          </View>
          {/* <CustomInput
            value={formData?.customerDetails?.title}
            caption={strings.title}
            placeHolder={strings.title}
            onChangeText={(text) => handleCustomerDetails("title", text)}
          /> */}
          <CustomInput
            value={formData?.customerDetails?.firstName}
            caption={strings.firstname}
            placeHolder={strings.firstname}
            onChangeText={(text) => handleCustomerDetails("firstName", text)}
          />
          <CustomInput
            value={formData?.customerDetails?.lastName}
            caption={strings.lastname}
            placeHolder={strings.lastname}
            onChangeText={(text) => handleCustomerDetails("lastName", text)}
          />
          <DatePicker
            modal
            mode="date"
            validRange={{ endDate: new Date() }}
            open={openBirthDatePicker}
            onCancel={() => setOpenBirthDatePicker(false)}
            date={formData?.customerDetails?.birthDate || new Date()}
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleCustomerDetails("birthDate", params);
              setOpenBirthDatePicker(false);
            }}
          />
          <CustomInput
            value={moment(formData?.customerDetails?.birthDate).format(
              "YYYY-MM-DD"
            )}
            caption={strings.dob}
            onFocus={() => setOpenBirthDatePicker(true)}
            placeHolder={strings.dob}
            right={
              <TextInput.Icon
                onPress={() => setOpenBirthDatePicker(true)}
                style={{ width: 23, height: 23 }}
                theme={{ colors: { onSurfaceVariant: colors.gray } }}
                icon={"calendar"}
              />
            }
          />

          <CustomDropDownFullWidth
            selectedValue={formData?.customerDetails?.gender?.description}
            data={GENDER_LIST}
            onChangeText={(item) => handleCustomerDetails("gender", item)}
            value={formData?.customerDetails?.gender?.code}
            caption={strings.gender}
            placeHolder={"Select " + strings.gender}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.customerDetails?.idType?.description}
            data={CUSTOMER_ID_TYPE_LIST}
            onChangeText={(item) => handleCustomerDetails("idType", item)}
            value={formData?.customerDetails?.idType?.code}
            caption={strings.id_type}
            placeHolder={"Select " + strings.id_type}
          />
          <CustomInput
            value={formData?.customerDetails?.idValue}
            caption={strings.id_number}
            placeHolder={strings.id_number}
            onChangeText={(text) => handleCustomerDetails("idValue", text)}
          />
          {/* <CustomInput
            value={formData?.customerDetails?.idPlace}
            caption={strings.place_of_issue}
            placeHolder={strings.place_of_issue}
            onChangeText={(text) => handleCustomerDetails("idPlace", text)}
          /> */}
          {(customerCategoryCode === "BUS" ||
            customerCategoryCode === "GOV") && (
              <CustomInput
                value={formData?.customerDetails?.registeredNo}
                caption={strings.registereredNo}
                placeHolder={strings.registereredNo}
                onChangeText={(text) =>
                  handleCustomerDetails("registeredNo", text)
                }
              />
            )}
          <DatePicker
            modal
            mode="date"
            validRange={{ endDate: new Date() }}
            open={openRegDatePicker}
            onCancel={() => setOpenRegDatePicker(false)}
            date={formData?.customerDetails?.registeredDate || new Date()}
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleCustomerDetails("registeredDate", params);
              setOpenRegDatePicker(false);
            }}
          />
          {(customerCategoryCode === "BUS" ||
            customerCategoryCode === "GOV") && (
              <CustomInput
                value={moment(formData?.customerDetails?.registeredDate).format(
                  "YYYY-MM-DD"
                )}
                caption={strings.registereredDate}
                onFocus={() => setOpenRegDatePicker(true)}
                placeHolder={strings.registereredDate}
                right={
                  <TextInput.Icon
                    onPress={() => setOpenRegDatePicker(true)}
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: colors.gray } }}
                    icon={"calendar"}
                  />
                }
              />
            )}
        </View>
      </View>
    );
  };



  // Step = 2
  const renderCustomerAddressUI = () => {
    const getCountryList = () => {
      const countryGetList = get(masterReducer, "masterdataData.COUNTRY", []);
      if (countryGetList.length == 0) return [];
      return countryGetList.map((item) => ({
        code: item?.code,
        description: item.description,
      }));
    };
    const isAutoAddress = addressTakenType == "AUTO";
    return (
      <View>
        <CustomTitleText title={"Document details"} />
        <View style={styles.backgroundView}>
          <View style={commonStyle.center}>
            {get(userIDImg, 'face.uri', '') != "" &&
              <Image source={{ uri: get(userIDImg, 'face.uri', '') }} style={{
                width: 80,
                height: 80,
                borderRadius: 80
              }} />
            }
          </View>
          <CustomInput
            value={formData?.customerDetails?.emailId}
            caption={strings.email}
            placeHolder={strings.email}
            onChangeText={(text) => handleCustomerDetails("emailId", text)}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.customerDetails?.contactType?.description}
            data={CONTACT_TYPE_LIST}
            onChangeText={(item) => handleCustomerDetails("contactType", item)}
            value={formData?.customerDetails?.contactType?.code}
            caption={strings.contact_type}
            placeHolder={"Select " + strings.contact_type}
          />
          <CountryPicker
            show={countryPickModel}
            excludedCountries={excludedCountriesList()}
            pickerButtonOnPress={(item) => {
              handleCustomerDetails("mobilePrefix", item.dial_code);
              setCountryCode(item.dial_code);
              setCountryPickModel(false);
              setNumberMaxLength(getPhoneNumberLength(item.code));
            }}
            onBackdropPress={() => setCountryPickModel(false)}
            style={{
              modal: {
                height: "65%",
              },
            }}
          />
          <CustomInputWithCC
            onPressOnCountyCode={() => setCountryPickModel(true)}
            countryCode={countryCode}
            caption={strings.mobile_no}
            onChangeText={(text) => {
              handleCustomerDetails("mobileNo", text);
              setNumberError("");
            }}
            value={formData?.customerDetails?.mobileNo}
            placeHolder={strings.mobile_no}
            keyboardType="numeric"
            maxLength={numberMaxLength}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <CustomTitleText title={"Billing address"} />
          <Icon
            onPress={() => locationIconClick()}
            name="map"
            size={25}
            color={"#F5AD47"}
          />
        </View>
        <View style={styles.backgroundView}>
          <CustomDropDownFullWidth
            searchEnable={true}
            setDropDownEnable={() => setActiveDropDown("country")}
            disabled={isAutoAddress}
            selectedValue={get(formData, "customerDetails.country", "")}
            setValue={() => { }}
            data={getCountryList() ?? []}
            onChangeText={(text) => {
              console.log(">>", text);
              // onCountyClick(text)
              handleCustomerDetails("country", text?.code);
              handleCustomerDetails("state", "");
              handleCustomerDetails("district", "");
              handleCustomerDetails("city", "");
              handleCustomerDetails("postCode", "");

              if (addressTakenType != "AUTO") {
                setLoader(true);
                dispatch(
                  fetchRegisterFormData(
                    {
                      type: "COUNTRY",
                      search: text?.code,
                    },
                    () => setLoader(false)
                  )
                );
              }
            }}
            value={get(formData, "customerDetails.country", "")}
            isDisableDropDown={activeDropDown != "country"}
            placeHolder={strings.country + "*"}
            caption={strings.country + "*"}
          />

          <CustomInput
            disabled={isAutoAddress}
            value={get(formData, "customerDetails.address1", "")}
            caption={"Flat/House/Unit No/ Block"}
            placeHolder={"Flat/House/Unit No/ Block"}
            onChangeText={(text) => {
              handleCustomerDetails("address1", text);
            }}
          />
          <CustomInput
            disabled={isAutoAddress}
            value={get(formData, "customerDetails.address2", "")}
            caption={"Building Name/Others"}
            placeHolder={"Building Name/Others"}
            onChangeText={(text) => handleCustomerDetails("address2", text)}
          />
          <CustomInput
            disabled={isAutoAddress}
            value={get(formData, "customerDetails.address3", "")}
            caption={"Street/Area"}
            placeHolder={"Street/Area"}
            onChangeText={(text) => handleCustomerDetails("address3", text)}
          />

          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("state")}
            isDisableDropDown={activeDropDown != "state"}
            disabled={isAutoAddress}
            selectedValue={get(formData, "customerDetails.state", "")}
            setValue={() => { }}
            data={getUniqueState(savedLocation.addressLoopupData) ?? []}
            onChangeText={(text) => {
              handleCustomerDetails("state", text?.id);
              handleCustomerDetails("district", "");
              handleCustomerDetails("city", "");
              handleCustomerDetails("postCode", "");
            }}
            value={get(formData, "customerDetails.state", "")}
            caption={"State/Region"}
            placeHolder={"Select " + "State/Region"}
          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("district")}
            isDisableDropDown={activeDropDown != "district"}
            disabled={isAutoAddress}
            selectedValue={get(formData, "customerDetails.district", "")}
            setValue={() => { }}
            data={
              getUniqueDistricts(
                savedLocation.addressLoopupData,
                get(formData, "customerDetails.state", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleCustomerDetails("district", text?.id);
              handleCustomerDetails("city", "");
              handleCustomerDetails("postCode", "");
            }}
            value={get(formData, "customerDetails.district", "")}
            caption={"District/Province"}
            placeHolder={"Select " + "District/Province"}
          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("city")}
            isDisableDropDown={activeDropDown != "city"}
            disabled={isAutoAddress}
            selectedValue={get(formData, "customerDetails.city", "")}
            setValue={() => { }}
            data={
              getCityByDistrict(
                savedLocation.addressLoopupData,
                get(formData, "customerDetails.district", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleCustomerDetails("city", text?.id);
              handleCustomerDetails("postCode", "");
            }}
            value={get(formData, "customerDetails.city", "")}
            caption={"City/Town"}
            placeHolder={"City/Town"}
          />

          <CustomDropDownFullWidth
            disabled={isAutoAddress}
            setDropDownEnable={() => setActiveDropDown("postCode")}
            isDisableDropDown={activeDropDown != "postCode"}
            selectedValue={get(formData, "customerDetails.postCode", "")}
            setValue={() => { }}
            data={
              getPostCodeByCity(
                savedLocation.addressLoopupData,
                get(formData, "customerDetails.city", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleCustomerDetails("postCode", text?.id);
            }}
            value={get(formData, "customerDetails.postCode", "")}
            caption={"Post/Zip Code"}
            placeHolder={"Select " + "Post/Zip Code"}
          />
        </View>
      </View>
    );
  };

  // Step = 3
  const renderServicesUI = () => {

    return (
      <View>
        <CustomTitleText title={"Select Category"} />
        <FlatList
          style={{ backgroundColor: "#fff", margin: 10, borderRadius: 10 }}
          numColumns={4}
          data={createCustomerReducerData.serviceCategories}
          renderItem={({ item, index }) => (
            <ServiceCategory
              item={item}
              onSelect={async () => {
                enableLoader(true, "Please wait...Fetching data")
                dispatch(fetchServiceProducts(item.code, navigation));
                enableLoader(false, "Please wait...Fetching data")

              }}
              onDeSelect={() => {
                dispatch(removeCategoryProducts(item.code));
              }}
            />
          )}
          keyExtractor={(item, index) => index}
        />
        {/* <CustomTitleText title={"Select Service Type"} />
        <FlatList
          style={{ backgroundColor: "#fff", margin: 10, borderRadius: 10 }}
          numColumns={3}
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item, index }) => (
            <ServiceType name={`Service Type ${index + 1}`} />
          )}
          keyExtractor={(item, index) => index}
        /> */}
        {products.length > 0 && (
          <View>
            <CustomTitleText title={"Available Products"} />
            <FlatList
              data={products}
              renderItem={({ item, index }) => (
                <Product
                  item={item}
                  products={products}
                  setProducts={setProducts}
                />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        )}
      </View>
    );
  };

  // Step = 4
  const renderSelectedServicesUI = () => {
    const productss =
      [
        {
          "productBenefit": null,
          "contractList": null,
          "productId": "257",
          "productNo": "PROD-266",
          "status": "AC",
          "productName": "Fibre 100mpbs_PP - 6eee325fff44",
          "productFamily": "PF_TELE",
          "productCategory": "PC_PLAN",
          "productSubCategory": "PSC_RES",
          "productType": "PT_POSTPAID",
          "productSubType": null,
          "serviceType": "ST_CREDITCARD",
          "productImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qc6WxJ3SBNtzZ_q62bdzXPd6mWVYR-1SmQN4Ab88Bw&usqp=CAU&ec=48600112",
          "multipleSelection": null,
          "activationDate": "2023-05-23",
          "expiryDate": null,
          "chargeType": null,
          "isTaxable": null,
          "taxablePercentage": null,
          "warrantyPeriod": null,
          "productLocation": null,
          "productUuid": "718e028a-0c46-4745-b9c0-3dfbd0e8d431",
          "isAppointRequired": "Y",
          "uomCategory": "UOM_SRVC",
          "productClass": "PCS_PLAT",
          "serviceClass": "SC_ALL",
          "contractFlag": "N",
          "serviceTypeDescription": {
            "code": "ST_CREDITCARD",
            "description": "Credit Card"
          },
          "productTypeDescription": {
            "code": "PT_POSTPAID",
            "description": "Postpaid"
          },
          "productSubTypeDesc": null,
          "productCategoryDesc": {
            "code": "PC_PLAN",
            "description": "Plan"
          },
          "productSubCategoryDesc": {
            "code": "PSC_RES",
            "description": "Residential"
          },
          "productChargesList": [
            {
              "productChargeMapId": 306,
              "productId": 257,
              "chargeId": 58,
              "chargeAmount": "100.0000",
              "frequency": null,
              "billingEffective": null,
              "advanceCharge": null,
              "chargeUpfront": null,
              "status": "AC",
              "startDate": "2023-05-23",
              "endDate": null,
              "changesApplied": "N",
              "remarks": null,
              "prorated": null,
              "productUuid": "718e028a-0c46-4745-b9c0-3dfbd0e8d431",
              "chargeDetails": {
                "chargeId": 58,
                "chargeName": "Postpaid Charge",
                "status": "AC",
                "chargeCat": "CC_NRC",
                "serviceType": "ST_POSTPAID",
                "currency": "CUR-USD",
                "startDate": "2023-01-01",
                "endDate": "2029-01-01",
                "glcode": "GLDUMMY2",
                "chargeCatDesc": {
                  "code": "CC_NRC",
                  "description": "Nonrecurring charge"
                },
                "currencyDesc": {
                  "code": "CUR-USD",
                  "description": "USD"
                }
              }
            },
            {
              "productChargeMapId": 305,
              "productId": 257,
              "chargeId": 59,
              "chargeAmount": "50.0000",
              "frequency": null,
              "billingEffective": null,
              "advanceCharge": null,
              "chargeUpfront": null,
              "status": "AC",
              "startDate": "2023-05-23",
              "endDate": null,
              "changesApplied": "N",
              "remarks": null,
              "prorated": null,
              "productUuid": "718e028a-0c46-4745-b9c0-3dfbd0e8d431",
              "chargeDetails": {
                "chargeId": 59,
                "chargeName": "Postpaid Charge",
                "status": "AC",
                "chargeCat": "CC_RC",
                "serviceType": "ST_POSTPAID",
                "currency": "CUR-USD",
                "startDate": "2023-01-01",
                "endDate": "2029-01-01",
                "glcode": "GLDUMMY3",
                "chargeCatDesc": {
                  "code": "CC_RC",
                  "description": "Recurring charge"
                },
                "currencyDesc": {
                  "code": "CUR-USD",
                  "description": "USD"
                }
              }
            }
          ],
          "createdByUser": {
            "userFamily": [
              "UAM_WEB",
              "UAM_MOBILE"
            ],
            "mappingPayload": {
              "userDeptRoleMapping": [
                {
                  "roleId": [
                    1,
                    2,
                    3
                  ],
                  "unitId": "DEPT.OU.ORG"
                }
              ]
            },
            "userId": 1,
            "contactNo": "9092068640",
            "email": "productadmin@bcae.com",
            "userType": "UT_BUSINESS",
            "userGroup": "UG_ADMIN",
            "userSource": null,
            "customerId": null,
            "customerUuid": null,
            "photo": null,
            "title": "ms",
            "firstName": "Product",
            "lastName": "admin",
            "gender": "F",
            "dob": "1999-09-28",
            "officeNo": null,
            "extn": "91",
            "loginid": "ADMIN",
            "notificationType": null,
            "biAccess": "Y",
            "waAccess": "N",
            "loginPassword": "3c834dad181356e3b6d8e4f3c4065c08$a1abf932e2bc8642f2fda17a46760f6e3cc7325d2bfd18671e6ed9842b59c1a4",
            "loginAttempts": 0,
            "status": "AC",
            "inviteToken": null,
            "loc": "BCT_CHENNAI",
            "country": "India",
            "icNumber": null,
            "profilePicture": "data:image/jpeg;base64,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",
            "oneTimePassword": null,
            "createdBy": 1,
            "createdAt": "2023-01-30T14:04:06.338Z",
            "updatedBy": 1,
            "updatedAt": "2023-06-06T03:17:36.083Z",
            "activationDate": "2023-04-03T16:00:00.000Z",
            "expiryDate": "2023-12-29T16:00:00.000Z",
            "biAccessKey": null,
            "multipleSession": "N"
          },
          "updatedByUser": null,
          "price": 150,
          "quantity": 1
        }
      ]
    return (
      <View>
        {0 == 1 &&
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <CustomTitleText title={"Need Quote Only"} />
            <Switch
              trackColor={{
                false: "#9A9A9A",
                true: "#F5AD47",
              }}
              thumbColor={"#fff"}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setFormData({ ...formData, getQuote: !formData?.getQuote });
              }}
              value={formData?.getQuote}
            />
          </View>
        }
        <CustomTitleText title={"Selected Product"} />
        <SwipeListView
          showsVerticalScrollIndicator={false}
          disableRightSwipe={true}
          data={productss.filter((product) => product.quantity > 0)}
          renderItem={({ item, index }) => <SelectedProduct item={item}
            setShowBottomModal={setShowBottomModal}
            setAcitveProduct={setAcitveProduct}
          />}
          keyExtractor={(item, index) => index}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-100}
          stopRightSwipe={-100}
          onRowDidOpen={onRowDidOpen}
        />
        <CustomTitleText title={"Bill Details"} />
        <BillDetails
          details={{
            gTotal: calculateTotalBillAmount(),
            total: calculateTotalBillAmount(),
            gst: 0.0,
            discount: 0.0,
          }}
        />
      </View>
    );
  };

  // Step = 5
  const renderServiceAddressUI = () => {
    const getCountryList = () => {
      const countryGetList = get(masterReducer, "masterdataData.COUNTRY", []);
      if (countryGetList.length == 0) return [];
      return countryGetList.map((item) => ({
        code: item?.code,
        description: item.description,
      }));
    };
    const isAutoAddress = addressTakenType == "AUTO";
    return (
      <View>
        {/* Service address checkbox */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Checkbox
            status={isSameServiceAddressChecked ? "checked" : "unchecked"}
            onPress={() => {
              if (isSameServiceAddressChecked) {
                handleServiceDetails("address1", "");
                handleServiceDetails("address2", "");
                handleServiceDetails("address3", "");
                handleServiceDetails("country", "");
                handleServiceDetails("district", "");
                handleServiceDetails("postCode", "");
                handleServiceDetails("state", "");
                handleServiceDetails("city", "");
              } else {
                handleServiceDetails(
                  "address1",
                  get(formData, "customerDetails.address1", "")
                );
                handleServiceDetails(
                  "address2",
                  get(formData, "customerDetails.address2", "")
                );
                handleServiceDetails(
                  "address3",
                  get(formData, "customerDetails.address3", "")
                );
                handleServiceDetails(
                  "country",
                  get(formData, "customerDetails.country", "")
                );
                handleServiceDetails(
                  "district",
                  get(formData, "customerDetails.district", "")
                );
                handleServiceDetails(
                  "postCode",
                  get(formData, "customerDetails.postCode", "")
                );
                handleServiceDetails(
                  "state",
                  get(formData, "customerDetails.state", "")
                );
                handleServiceDetails(
                  "city",
                  get(formData, "customerDetails.city", "")
                );
              }
              setIsSameServiceAddressChecked(!isSameServiceAddressChecked);
            }}
          />
          <CustomTitleText
            title={"Service address same as customer address"}
            textStyle={{ marginTop: 0 }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <CustomTitleText title={"Service address"} />
          {!isSameServiceAddressChecked && (
            <Icon
              onPress={() => locationIconClick()}
              name="map"
              size={25}
              color={"#F5AD47"}
            />
          )}
        </View>
        <View style={styles.backgroundView}>
          <CustomDropDownFullWidth
            searchEnable={true}
            setDropDownEnable={() => setActiveDropDown("country")}
            disabled={isSameServiceAddressChecked || isAutoAddress}
            selectedValue={get(formData, "serviceDetails.country", "")}
            setValue={() => { }}
            data={getCountryList() ?? []}
            onChangeText={(text) => {
              console.log(">>", text);
              // onCountyClick(text)
              handleServiceDetails("country", text?.code);
              handleServiceDetails("state", "");
              handleServiceDetails("district", "");
              handleServiceDetails("city", "");
              handleServiceDetails("postCode", "");

              if (addressTakenType != "AUTO") {
                setLoader(true);
                dispatch(
                  fetchRegisterFormData(
                    {
                      type: "COUNTRY",
                      search: text?.code,
                    },
                    () => setLoader(false)
                  )
                );
              }
            }}
            value={get(formData, "serviceDetails.country", "")}
            isDisableDropDown={activeDropDown != "country"}
            placeHolder={strings.country + "*"}
            caption={strings.country + "*"}
          />

          <CustomInput
            disabled={isSameServiceAddressChecked || isAutoAddress}
            value={get(formData, "serviceDetails.address1", "")}
            caption={"Flat/House/Unit No/ Block"}
            placeHolder={"Flat/House/Unit No/ Block"}
            onChangeText={(text) => {
              handleServiceDetails("address1", text);
            }}
          />
          <CustomInput
            disabled={isSameServiceAddressChecked || isAutoAddress}
            value={get(formData, "serviceDetails.address2", "")}
            caption={"Building Name/Others"}
            placeHolder={"Building Name/Others"}
            onChangeText={(text) => handleServiceDetails("address2", text)}
          />
          <CustomInput
            disabled={isSameServiceAddressChecked || isAutoAddress}
            value={get(formData, "serviceDetails.address3", "")}
            caption={"Street/Area"}
            placeHolder={"Street/Area"}
            onChangeText={(text) => handleServiceDetails("address3", text)}
          />

          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("state")}
            isDisableDropDown={activeDropDown != "state"}
            disabled={isSameServiceAddressChecked || isAutoAddress}
            selectedValue={get(formData, "serviceDetails.state", "")}
            setValue={() => { }}
            data={getUniqueState(savedLocation.addressLoopupData) ?? []}
            onChangeText={(text) => {
              handleServiceDetails("state", text?.id);
              handleServiceDetails("district", "");
              handleServiceDetails("city", "");
              handleServiceDetails("postCode", "");
            }}
            value={get(formData, "serviceDetails.state", "")}
            caption={"State/Region"}
            placeHolder={"Select " + "State/Region"}
          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("district")}
            isDisableDropDown={activeDropDown != "district"}
            disabled={isSameServiceAddressChecked || isAutoAddress}
            selectedValue={get(formData, "serviceDetails.district", "")}
            setValue={() => { }}
            data={
              getUniqueDistricts(
                savedLocation.addressLoopupData,
                get(formData, "serviceDetails.state", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleServiceDetails("district", text?.id);
              handleServiceDetails("city", "");
              handleServiceDetails("postCode", "");
            }}
            value={get(formData, "serviceDetails.district", "")}
            caption={"District/Province"}
            placeHolder={"Select " + "District/Province"}
          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("city")}
            isDisableDropDown={activeDropDown != "city"}
            disabled={isSameServiceAddressChecked || isAutoAddress}
            selectedValue={get(formData, "serviceDetails.city", "")}
            setValue={() => { }}
            data={
              getCityByDistrict(
                savedLocation.addressLoopupData,
                get(formData, "serviceDetails.district", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleServiceDetails("city", text?.id);
              handleServiceDetails("postCode", "");
            }}
            value={get(formData, "serviceDetails.city", "")}
            caption={"City/Town"}
            placeHolder={"City/Town"}
          />

          <CustomDropDownFullWidth
            disabled={isSameServiceAddressChecked || isAutoAddress}
            setDropDownEnable={() => setActiveDropDown("postCode")}
            isDisableDropDown={activeDropDown != "postCode"}
            selectedValue={get(formData, "serviceDetails.postCode", "")}
            setValue={() => { }}
            data={
              getPostCodeByCity(
                savedLocation.addressLoopupData,
                get(formData, "serviceDetails.city", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleServiceDetails("postCode", text?.id);
            }}
            value={get(formData, "serviceDetails.postCode", "")}
            caption={"Post/Zip Code"}
            placeHolder={"Select " + "Post/Zip Code"}
          />
        </View>
      </View>
    );
  };

  // Step = 6
  const renderCreateAccount_DetailsUI = () => {
    return (
      <View>
        {/* Customer details checkbox */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Checkbox
            status={isSameCustomerDetailsChecked ? "checked" : "unchecked"}
            onPress={() => {
              if (isSameCustomerDetailsChecked) {
                handleAccountDetails("title", "");
                handleAccountDetails("firstName", "");
                handleAccountDetails("lastName", "");
                handleAccountDetails("birthDate", new Date());
                handleAccountDetails("gender", "");
                handleAccountDetails("idType", "");
                handleAccountDetails("idValue", "");
                handleAccountDetails("idPlace", "");
                handleAccountDetails("mobileNo", "");
                handleAccountDetails("mobilePrefix", "");
                handleAccountDetails("emailId", "");
                handleAccountDetails("registeredDate", new Date());
                handleAccountDetails("registeredNo", "");
              } else {
                handleAccountDetails(
                  "title",
                  get(formData, "customerDetails.title", "")
                );
                handleAccountDetails(
                  "firstName",
                  get(formData, "customerDetails.firstName", "")
                );
                handleAccountDetails(
                  "lastName",
                  get(formData, "customerDetails.lastName", "")
                );
                handleAccountDetails(
                  "birthDate",
                  get(formData, "customerDetails.birthDate", "")
                );
                handleAccountDetails(
                  "gender",
                  get(formData, "customerDetails.gender", "")
                );
                handleAccountDetails(
                  "idType",
                  get(formData, "customerDetails.idType", "")
                );
                handleAccountDetails(
                  "idValue",
                  get(formData, "customerDetails.idValue", "")
                );
                handleAccountDetails(
                  "idPlace",
                  get(formData, "customerDetails.idPlace", "")
                );
                handleAccountDetails(
                  "mobileNo",
                  get(formData, "customerDetails.mobileNo", "")
                );
                handleAccountDetails(
                  "mobilePrefix",
                  get(formData, "customerDetails.mobilePrefix", "")
                );
                handleAccountDetails(
                  "emailId",
                  get(formData, "customerDetails.emailId", "")
                );
                handleAccountDetails(
                  "registeredDate",
                  get(formData, "customerDetails.registeredDate", "")
                );
                handleAccountDetails(
                  "registeredNo",
                  get(formData, "customerDetails.registeredNo", "")
                );
              }
              setIsSameCustomerDetailsChecked(!isSameCustomerDetailsChecked);
            }}
          />
          <CustomTitleText
            title={"Use same customer details"}
            textStyle={{ marginTop: 0 }}
          />
        </View>
        <CustomTitleText title={"Account Creation"} />
        <View style={styles.backgroundView}>
          <CustomInput
            value={formData?.accountDetails?.title}
            caption={strings.title}
            placeHolder={strings.title}
            onChangeText={(text) => handleAccountDetails("title", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={formData?.accountDetails?.firstName}
            caption={strings.firstname}
            placeHolder={strings.firstname}
            onChangeText={(text) => handleAccountDetails("firstName", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={formData?.accountDetails?.lastName}
            caption={strings.lastname}
            placeHolder={strings.lastname}
            onChangeText={(text) => handleAccountDetails("lastName", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <DatePicker
            modal
            mode="date"
            validRange={{ endDate: new Date() }}
            open={openBirthDatePicker}
            onCancel={() => setOpenBirthDatePicker(false)}
            date={formData?.accountDetails?.birthDate || new Date()}
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleAccountDetails("birthDate", params);
              setOpenBirthDatePicker(false);
            }}
          />
          <CustomInput
            value={moment(formData?.accountDetails?.birthDate).format(
              "YYYY-MM-DD"
            )}
            caption={strings.dob}
            onFocus={() => setOpenBirthDatePicker(true)}
            placeHolder={strings.dob}
            right={
              <TextInput.Icon
                onPress={() =>
                  isSameCustomerDetailsChecked
                    ? {}
                    : setOpenBirthDatePicker(true)
                }
                style={{ width: 23, height: 23 }}
                theme={{ colors: { onSurfaceVariant: colors.gray } }}
                icon={"calendar"}
              />
            }
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.accountDetails?.gender?.description}
            data={GENDER_LIST}
            onChangeText={(item) => handleAccountDetails("gender", item)}
            value={formData?.accountDetails?.gender?.code}
            caption={strings.gender}
            placeHolder={"Select " + strings.gender}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.accountDetails?.idType?.description}
            data={CUSTOMER_ID_TYPE_LIST}
            onChangeText={(item) => handleAccountDetails("idType", item)}
            value={formData?.accountDetails?.idType?.code}
            caption={strings.id_type}
            placeHolder={"Select " + strings.id_type}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={formData?.accountDetails?.idValue}
            caption={strings.id_number}
            placeHolder={strings.id_number}
            onChangeText={(text) => handleAccountDetails("idValue", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={formData?.accountDetails?.idPlace}
            caption={strings.place_of_issue}
            placeHolder={strings.place_of_issue}
            onChangeText={(text) => handleAccountDetails("idPlace", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          {(customerCategoryCode === "BUS" ||
            customerCategoryCode === "GOV") && (
              <CustomInput
                value={formData?.accountDetails?.registeredNo}
                caption={strings.registereredNo}
                placeHolder={strings.registereredNo}
                onChangeText={(text) =>
                  handleAccountDetails("registeredNo", text)
                }
                disabled={isSameCustomerDetailsChecked}
              />
            )}
          <DatePicker
            modal
            mode="date"
            validRange={{ endDate: new Date() }}
            open={openRegDatePicker}
            onCancel={() => setOpenRegDatePicker(false)}
            date={formData?.accountDetails?.registeredDate || new Date()}
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleAccountDetails("registeredDate", params);
              setOpenRegDatePicker(false);
            }}
          />
          {(customerCategoryCode === "BUS" ||
            customerCategoryCode === "GOV") && (
              <CustomInput
                value={moment(formData?.accountDetails?.registeredDate).format(
                  "YYYY-MM-DD"
                )}
                caption={strings.dob}
                onFocus={() => setOpenRegDatePicker(true)}
                placeHolder={strings.dob}
                right={
                  <TextInput.Icon
                    onPress={() =>
                      isSameCustomerDetailsChecked
                        ? {}
                        : setOpenRegDatePicker(true)
                    }
                    style={{ width: 23, height: 23 }}
                    theme={{ colors: { onSurfaceVariant: colors.gray } }}
                    icon={"calendar"}
                  />
                }
                disabled={isSameCustomerDetailsChecked}
              />
            )}

          <CountryPicker
            show={countryPickModel}
            excludedCountries={excludedCountriesList()}
            pickerButtonOnPress={(item) => {
              handleAccountDetails("mobilePrefix", item.dial_code);
              setCountryCode(item.dial_code);
              setCountryPickModel(false);
              setNumberMaxLength(getPhoneNumberLength(item.code));
            }}
            onBackdropPress={() => setCountryPickModel(false)}
            style={{
              modal: {
                height: "65%",
              },
            }}
          />
          <CustomInputWithCC
            onPressOnCountyCode={() => setCountryPickModel(true)}
            countryCode={countryCode}
            caption={strings.mobile_no}
            onChangeText={(text) => {
              handleAccountDetails("mobileNo", text);
              setNumberError("");
            }}
            value={formData?.accountDetails?.mobileNo}
            placeHolder={strings.mobile_no}
            keyboardType="numeric"
            maxLength={numberMaxLength}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={formData?.accountDetails?.emailId}
            caption={strings.email}
            placeHolder={strings.email}
            onChangeText={(text) => handleAccountDetails("emailId", text)}
            disabled={isSameCustomerDetailsChecked}
          />
        </View>
      </View>
    );
  };

  // Step = 7
  const renderCreateAccount_PreferencesUI = () => {
    return (
      <View>
        <CustomTitleText title={"Account Creation"} />
        <View style={styles.backgroundView}>
          <CustomDropDownFullWidth
            selectedValue={
              formData?.accountDetails?.accountCategory?.description
            }
            data={ACCOUNT_CATEGORY_LIST}
            onChangeText={(item) =>
              handleAccountDetails("accountCategory", item)
            }
            value={formData?.accountDetails?.accountCategory?.code}
            caption={strings.account_category}
            placeHolder={"Select " + strings.account_category}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.accountDetails?.accountLevel?.description}
            data={ACCOUNT_LEVEL_LIST}
            onChangeText={(item) => handleAccountDetails("accountLevel", item)}
            value={formData?.accountDetails?.accountLevel?.code}
            caption={strings.account_level}
            placeHolder={"Select " + strings.account_level}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.accountDetails?.billLang?.description}
            data={BILL_LANGUAGE_LIST}
            onChangeText={(item) => handleAccountDetails("billLang", item)}
            value={formData?.accountDetails?.billLang?.code}
            caption={strings.bill_lang}
            placeHolder={"Select " + strings.bill_lang}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.accountDetails?.accountType?.description}
            data={ACCOUNT_TYPE_LIST}
            onChangeText={(item) => handleAccountDetails("accountType", item)}
            value={formData?.accountDetails?.accountType?.code}
            caption={strings.account_type}
            placeHolder={"Select " + strings.account_type}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.accountDetails?.notifPref?.description}
            data={NOTIFICATION_TYPE_LIST}
            onChangeText={(item) => handleAccountDetails("notifPref", item)}
            value={formData?.accountDetails?.notifPref?.code}
            caption={strings.notification_pref}
            placeHolder={"Select " + strings.notification_pref}
          />
          <CustomDropDownFullWidth
            selectedValue={formData?.accountDetails?.currency?.description}
            data={CURRENCY_LIST}
            onChangeText={(item) => handleAccountDetails("currency", item)}
            value={formData?.accountDetails?.currency?.code}
            caption={strings.currency}
            placeHolder={"Select " + strings.currency}
          />
        </View>
      </View>
    );
  };

  // Step = 8
  const renderCreateAccount_AddressUI = () => {
    const getCountryList = () => {
      const countryGetList = get(masterReducer, "masterdataData.COUNTRY", []);
      if (countryGetList.length == 0) return [];
      return countryGetList.map((item) => ({
        code: item?.code,
        description: item.description,
      }));
    };
    const isAutoAddress = addressTakenType == "AUTO";
    return (
      <View>
        {/* Account address checkbox */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Checkbox
            status={isSameAccountAddressChecked ? "checked" : "unchecked"}
            onPress={() => {
              if (isSameAccountAddressChecked) {
                handleAccountDetails("address1", "");
                handleAccountDetails("address2", "");
                handleAccountDetails("address3", "");
                handleAccountDetails("country", "");
                handleAccountDetails("district", "");
                handleAccountDetails("postCode", "");
                handleAccountDetails("state", "");
                handleAccountDetails("city", "");
              } else {
                handleAccountDetails(
                  "address1",
                  get(formData, "customerDetails.address1", "")
                );
                handleAccountDetails(
                  "address2",
                  get(formData, "customerDetails.address2", "")
                );
                handleAccountDetails(
                  "address3",
                  get(formData, "customerDetails.address3", "")
                );
                handleAccountDetails(
                  "country",
                  get(formData, "customerDetails.country", "")
                );
                handleAccountDetails(
                  "district",
                  get(formData, "customerDetails.district", "")
                );
                handleAccountDetails(
                  "postCode",
                  get(formData, "customerDetails.postCode", "")
                );
                handleAccountDetails(
                  "state",
                  get(formData, "customerDetails.state", "")
                );
                handleAccountDetails(
                  "city",
                  get(formData, "customerDetails.city", "")
                );
              }
              setIsSameAccountAddressChecked(!isSameAccountAddressChecked);
            }}
          />
          <CustomTitleText
            title={"Account address same as customer address"}
            textStyle={{ marginTop: 0 }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <CustomTitleText title={"Account address"} />
          {!isSameAccountAddressChecked && (
            <Icon
              onPress={() => locationIconClick()}
              name="map"
              size={25}
              color={"#F5AD47"}
            />
          )}
        </View>

        <View style={styles.backgroundView}>
          <CustomDropDownFullWidth
            searchEnable={true}
            setDropDownEnable={() => setActiveDropDown("country")}
            disabled={isSameAccountAddressChecked || isAutoAddress}
            selectedValue={get(formData, "accountDetails.country", "")}
            setValue={() => { }}
            data={getCountryList() ?? []}
            onChangeText={(text) => {
              console.log(">>", text);
              // onCountyClick(text)
              handleAccountDetails("country", text?.code);
              handleAccountDetails("state", "");
              handleAccountDetails("district", "");
              handleAccountDetails("city", "");
              handleAccountDetails("postCode", "");

              if (addressTakenType != "AUTO") {
                setLoader(true);
                dispatch(
                  fetchRegisterFormData(
                    {
                      type: "COUNTRY",
                      search: text?.code,
                    },
                    () => setLoader(false)
                  )
                );
              }
            }}
            value={get(formData, "accountDetails.country", "")}
            isDisableDropDown={activeDropDown != "country"}
            placeHolder={strings.country + "*"}
            caption={strings.country + "*"}
          />

          <CustomInput
            disabled={isSameAccountAddressChecked || isAutoAddress}
            value={get(formData, "accountDetails.address1", "")}
            caption={"Flat/House/Unit No/ Block"}
            placeHolder={"Flat/House/Unit No/ Block"}
            onChangeText={(text) => {
              handleAccountDetails("address1", text);
            }}
          />
          <CustomInput
            disabled={isSameAccountAddressChecked || isAutoAddress}
            value={get(formData, "accountDetails.address2", "")}
            caption={"Building Name/Others"}
            placeHolder={"Building Name/Others"}
            onChangeText={(text) => handleAccountDetails("address2", text)}
          />
          <CustomInput
            disabled={isSameAccountAddressChecked || isAutoAddress}
            value={get(formData, "accountDetails.address3", "")}
            caption={"Street/Area"}
            placeHolder={"Street/Area"}
            onChangeText={(text) => handleAccountDetails("address3", text)}
          />

          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("state")}
            isDisableDropDown={activeDropDown != "state"}
            disabled={isSameAccountAddressChecked || isAutoAddress}
            selectedValue={get(formData, "accountDetails.state", "")}
            setValue={() => { }}
            data={getUniqueState(savedLocation.addressLoopupData) ?? []}
            onChangeText={(text) => {
              handleAccountDetails("state", text?.id);
              handleAccountDetails("district", "");
              handleAccountDetails("city", "");
              handleAccountDetails("postCode", "");
            }}
            value={get(formData, "accountDetails.state", "")}
            caption={"State/Region"}
            placeHolder={"Select " + "State/Region"}
          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("district")}
            isDisableDropDown={activeDropDown != "district"}
            disabled={isSameAccountAddressChecked || isAutoAddress}
            selectedValue={get(formData, "accountDetails.district", "")}
            setValue={() => { }}
            data={
              getUniqueDistricts(
                savedLocation.addressLoopupData,
                get(formData, "accountDetails.state", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleAccountDetails("district", text?.id);
              handleAccountDetails("city", "");
              handleAccountDetails("postCode", "");
            }}
            value={get(formData, "accountDetails.district", "")}
            caption={"District/Province"}
            placeHolder={"Select " + "District/Province"}
          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("city")}
            isDisableDropDown={activeDropDown != "city"}
            disabled={isSameAccountAddressChecked || isAutoAddress}
            selectedValue={get(formData, "accountDetails.city", "")}
            setValue={() => { }}
            data={
              getCityByDistrict(
                savedLocation.addressLoopupData,
                get(formData, "accountDetails.district", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleAccountDetails("city", text?.id);
              handleAccountDetails("postCode", "");
            }}
            value={get(formData, "accountDetails.city", "")}
            caption={"City/Town"}
            placeHolder={"City/Town"}
          />

          <CustomDropDownFullWidth
            disabled={isSameAccountAddressChecked || isAutoAddress}
            setDropDownEnable={() => setActiveDropDown("postCode")}
            isDisableDropDown={activeDropDown != "postCode"}
            selectedValue={get(formData, "accountDetails.postCode", "")}
            setValue={() => { }}
            data={
              getPostCodeByCity(
                savedLocation.addressLoopupData,
                get(formData, "accountDetails.city", "")
              ) ?? []
            }
            onChangeText={(text) => {
              handleAccountDetails("postCode", text?.id);
            }}
            value={get(formData, "accountDetails.postCode", "")}
            caption={"Post/Zip Code"}
            placeHolder={"Select " + "Post/Zip Code"}
          />
        </View>
      </View>
    );
  };

  // Step = 9
  const renderAgreementUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Agreement"} />
        <CustomerAgreement
          signature={formData?.signature || null}
          setSignature={dispatchSetSignatureInFormData}
        />
      </View>
    );
  };

  // Step = 10
  const renderPreviewUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Application form"} />
        <CustomTitleText
          title={`${formData?.customerDetails?.categoryType?.description} Customer Details`}
        />
        <View style={styles.backgroundView}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {/* <PreviewInfoItem
              title={`Title`}
              value={formData?.customerDetails?.title || "NA"}
            /> */}
            <PreviewInfoItem
              title={`First Name`}
              value={formData?.customerDetails?.firstName || "NA"}
            />
            <PreviewInfoItem
              title={`Last Name`}
              value={formData?.customerDetails?.lastName || "NA"}
            />
            <PreviewInfoItem
              title={`Gender`}
              value={formData?.customerDetails?.gender?.description || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`DOB`}
              value={
                moment(formData?.customerDetails?.birthDate).format(
                  "YYYY-MM-DD"
                ) || "NA"
              }
            />
            <PreviewInfoItem
              title={`ID Type`}
              value={formData?.customerDetails?.idType?.description || "NA"}
            />
            <PreviewInfoItem
              title={`ID Number`}
              value={formData?.customerDetails?.idValue || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* <PreviewInfoItem
              title={`ID Place`}
              value={formData?.customerDetails?.idPlace || "NA"}
            /> */}
            <PreviewInfoItem
              title={`Registration Date`}
              value={
                moment(formData?.customerDetails?.registeredDate).format(
                  "YYYY-MM-DD"
                ) || "NA"
              }
            />
            <PreviewInfoItem
              title={`Registration Number`}
              value={formData?.customerDetails?.registeredNo || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Email`}
              value={formData?.customerDetails?.emailId || "NA"}
            />
            <PreviewInfoItem
              title={`Contact`}
              value={
                formData?.customerDetails?.mobilePrefix +
                "-" +
                formData?.customerDetails?.mobileNo || "NA"
              }
            />
          </View>
        </View>
        <CustomTitleText title={"Customer Address"} />
        <View style={styles.backgroundView}>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Address Line 1`}
              value={formData?.customerDetails?.address1 || "NA"}
            />
            <PreviewInfoItem
              title={`Address Line 2`}
              value={formData?.customerDetails?.address2 || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Address Line 3`}
              value={formData?.customerDetails?.address3 || "NA"}
            />
            <PreviewInfoItem
              title={`City`}
              value={formData?.customerDetails?.city || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`District`}
              value={formData?.customerDetails?.district || "NA"}
            />
            <PreviewInfoItem
              title={`State`}
              value={formData?.customerDetails?.state || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Country`}
              value={formData?.customerDetails?.country || "NA"}
            />
            <PreviewInfoItem
              title={`PostCode`}
              value={formData?.customerDetails?.postCode || "NA"}
            />
          </View>
        </View>
        <CustomTitleText title={"Product Details"} />
        {formData?.serviceDetails?.details.map((item, index) => (
          <SelectedProduct key={index} item={item} />
        ))}
        <CustomTitleText title={"Service Address"} />
        <View style={styles.backgroundView}>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Address Line 1`}
              value={formData?.serviceDetails?.address1 || "NA"}
            />
            <PreviewInfoItem
              title={`Address Line 2`}
              value={formData?.serviceDetails?.address2 || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Address Line 3`}
              value={formData?.serviceDetails?.address3 || "NA"}
            />
            <PreviewInfoItem
              title={`City`}
              value={formData?.serviceDetails?.city || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`District`}
              value={formData?.serviceDetails?.district || "NA"}
            />
            <PreviewInfoItem
              title={`State`}
              value={formData?.serviceDetails?.state || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Country`}
              value={formData?.serviceDetails?.country || "NA"}
            />
            <PreviewInfoItem
              title={`PostCode`}
              value={formData?.serviceDetails?.postCode || "NA"}
            />
          </View>
        </View>
        <CustomTitleText title={"Account Details"} />
        <View style={styles.backgroundView}>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* <PreviewInfoItem
            title={`Title`}
            value={formData?.accountDetails?.title || "NA"}
          /> */}
            <PreviewInfoItem
              title={`First Name`}
              value={formData?.accountDetails?.firstName || "NA"}
            />
            <PreviewInfoItem
              title={`Last Name`}
              value={formData?.accountDetails?.lastName || "NA"}
            />
            <PreviewInfoItem
              title={`Gender`}
              value={formData?.accountDetails?.gender?.description || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`DOB`}
              value={
                moment(formData?.accountDetails?.birthDate).format(
                  "YYYY-MM-DD"
                ) || "NA"
              }
            />
            <PreviewInfoItem
              title={`ID Type`}
              value={formData?.accountDetails?.idType?.description || "NA"}
            />
            <PreviewInfoItem
              title={`ID Number`}
              value={formData?.accountDetails?.idValue || "NA"}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Account Category`}
              value={
                formData?.accountDetails?.accountCategory?.description || "NA"
              }
            />
            <PreviewInfoItem
              title={`Account Level`}
              value={
                formData?.accountDetails?.accountLevel?.description || "NA"
              }
            />
            <PreviewInfoItem
              title={`Account Type`}
              value={formData?.accountDetails?.accountType?.description || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Bill Language`}
              value={formData?.accountDetails?.billLang?.decription || "NA"}
            />
            <PreviewInfoItem
              title={`Notification Preference`}
              value={formData?.accountDetails?.notifPref?.description || "NA"}
            />
            <PreviewInfoItem
              title={`Currency`}
              value={formData?.accountDetails?.currency?.description || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {/* <PreviewInfoItem
            title={`ID Place`}
            value={formData?.accountDetails?.idPlace || "NA"}
          /> */}
            <PreviewInfoItem
              title={`Registration Date`}
              value={
                moment(formData?.accountDetails?.registeredDate).format(
                  "YYYY-MM-DD"
                ) || "NA"
              }
            />
            <PreviewInfoItem
              title={`Registration Number`}
              value={formData?.accountDetails?.registeredNo || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Email`}
              value={formData?.accountDetails?.emailId || "NA"}
            />
            <PreviewInfoItem
              title={`Contact`}
              value={
                formData?.accountDetails?.mobilePrefix +
                "-" +
                formData?.accountDetails?.mobileNo || "NA"
              }
            />
          </View>
        </View>
        <CustomTitleText title={"Account Address"} />
        <View style={styles.backgroundView}>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Address Line 1`}
              value={formData?.accountDetails?.address1 || "NA"}
            />
            <PreviewInfoItem
              title={`Address Line 2`}
              value={formData?.accountDetails?.address2 || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Address Line 3`}
              value={formData?.accountDetails?.address3 || "NA"}
            />
            <PreviewInfoItem
              title={`City`}
              value={formData?.accountDetails?.city || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`District`}
              value={formData?.accountDetails?.district || "NA"}
            />
            <PreviewInfoItem
              title={`State`}
              value={formData?.accountDetails?.state || "NA"}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <PreviewInfoItem
              title={`Country`}
              value={formData?.accountDetails?.country || "NA"}
            />
            <PreviewInfoItem
              title={`PostCode`}
              value={formData?.accountDetails?.postCode || "NA"}
            />
          </View>
        </View>
        {formData?.signature !== null && formData?.signature !== undefined && (
          <View>
            <CustomTitleText title={"Customer Agreement"} />
            <View style={styles.backgroundView}>
              <Image
                resizeMode={"cover"}
                style={styles.previewImgStyle}
                source={{ uri: formData?.signature }}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  const calculateTotalBillAmount = () => {
    let gTotal = 0;
    products.forEach((product) => {
      if (product.quantity > 0)
        gTotal = gTotal + product.quantity * product.price;
    });
    return gTotal;
  };

  const handleCustomerDetails = (key, value) => {
    let { customerDetails } = formData;
    customerDetails[key] = value;
    setFormData({ ...formData, customerDetails });
  };

  const handleAccountDetails = (key, value) => {
    let { accountDetails } = formData;
    accountDetails[key] = value;
    setFormData({ ...formData, accountDetails });
  };

  const handleServiceDetails = (key, value) => {
    let { serviceDetails } = formData;
    serviceDetails[key] = value;
    setFormData({ ...formData, serviceDetails });
  };

  const handlePrevious = () => {
    if (currentStep === STEP_CUSTOMER_FORM) {
      return null
    }
    if (currentStep === 10 && formData?.getQuote) {
      dispatch(setCurrentStepInStore(4));
      // } else if (currentStep === STEP_AGREE && !createAccount) {
    } else if (currentStep === STEP_AGREE) {
      dispatch(setCurrentStepInStore(handleBackNavHandle(STEP_AGREE)));
    } else if (currentStep === 7 && useSameCustomerDetails) {
      dispatch(setCurrentStepInStore(5));
    } else dispatch(setCurrentStepInStore(currentStep - 1));
  };

  const handleContinue = () => {

    switch (currentStep) {
      case STEP_CUSTOMER_FORM: // Customer Details
        dispatch(createCustomer(formData, navigation));
        break;
      case STEP_CUSTOMER_ADDRESS: // Customer Address
        dispatch(updateCustomerData(formData, navigation));
        break;
      case STEP_SERVICE_LIST: // Available Products
        let item = products.find((product) => product.quantity > 0);
        if (logg) console.log("Available Product", item, products)
        if (item === undefined)
          alert("Select atleast one service to continue!!!");
        else {
          const selectedProducts = products.filter(
            (product) => product.quantity > 0
          );

          handleServiceDetails("details", selectedProducts);
          dispatch(setCurrentStepInStore(currentStep + 1));
        }

        break;
      case 4: // Selected Products screen & Need quote only
        dispatch(createCustomerService(formData, navigation, currentStep));
        break;
      case 5: // Service Address UI Step
        dispatch(updateCustomerServiceData(formData, currentStep, navigation));
        break;
      case 6: // Account Details
        dispatch(updateAccountData(formData, currentStep, navigation));
        break;
      case 7: // Account Preferences
        dispatch(updateAccountData(formData, currentStep, navigation));
        break;
      case FACE_RECOG_TAKE_SELFI:
        setShowCam(true)
        break;
      case FACE_RECOG_UPLOAD_DOCUS:
        setShowCam(true)
        break;

      case 8: // Account Address
        isSameAccountAddressChecked
          ? dispatch(
            updateCustomerServiceData(formData, currentStep, navigation)
          )
          : dispatch(updateAccountData(formData, currentStep, navigation));
        break;
      case 9: // Create Agreement & Signature
        dispatch(setSignatureInFormData(formData?.signature));
        dispatch(setCurrentStepInStore(currentStep + 1));
        break;
      default:
        dispatch(setCurrentStepInStore(currentStep + 1));
        break;
    }
  };

  const handleSubmit = () => {
    if (currentStep === 10 && formData?.getQuote) {
      dispatch(updateCustomerStatus(formData, navigation));
    } else {
      setShowCreateOrderModal(true);
    }
  };

  const handleAccountCreationNo = () => {
    dispatch(setShowAccountCreationModal(false));
    setCreateAccount(false);
    dispatch(setCurrentStepInStore(9));
  };

  const handleAccountCreationYes = () => {
    dispatch(setShowAccountCreationModal(false));
    setCreateAccount(true);
    setTimeout(() => setShowSameAccountDetailsModal(true), 100);
  };

  const handleCreateOrderYes = () => {
    setShowCreateOrderModal(false);
    dispatch(createOrderForCustomer(formData, navigation));
    dispatch(updateCustomerStatus(formData, navigation));
  };

  const handleSameAccountDetailsNo = () => {
    handleAccountDetails("title", "");
    handleAccountDetails("firstName", "");
    handleAccountDetails("lastName", "");
    handleAccountDetails("birthDate", new Date());
    handleAccountDetails("gender", "");
    handleAccountDetails("idType", "");
    handleAccountDetails("idValue", "");
    handleAccountDetails("idPlace", "");
    handleAccountDetails("mobileNo", "");
    handleAccountDetails("mobilePrefix", "");
    handleAccountDetails("emailId", "");
    handleAccountDetails("registeredDate", new Date());
    handleAccountDetails("registeredNo", "");
    setShowSameAccountDetailsModal(false);
    setUseSameCustomerDetails(false);
    dispatch(setCurrentStepInStore(currentStep + 1));
  };

  const handleSameAccountDetailsYes = () => {
    handleAccountDetails("title", get(formData, "customerDetails.title", ""));
    handleAccountDetails(
      "firstName",
      get(formData, "customerDetails.firstName", "")
    );
    handleAccountDetails(
      "lastName",
      get(formData, "customerDetails.lastName", "")
    );
    handleAccountDetails(
      "birthDate",
      get(formData, "customerDetails.birthDate", "")
    );
    handleAccountDetails("gender", get(formData, "customerDetails.gender", ""));
    handleAccountDetails("idType", get(formData, "customerDetails.idType", ""));
    handleAccountDetails(
      "idValue",
      get(formData, "customerDetails.idValue", "")
    );
    handleAccountDetails(
      "idPlace",
      get(formData, "customerDetails.idPlace", "")
    );
    handleAccountDetails(
      "mobileNo",
      get(formData, "customerDetails.mobileNo", "")
    );
    handleAccountDetails(
      "mobilePrefix",
      get(formData, "customerDetails.mobilePrefix", "")
    );
    handleAccountDetails(
      "emailId",
      get(formData, "customerDetails.emailId", "")
    );
    handleAccountDetails(
      "registeredDate",
      get(formData, "customerDetails.registeredDate", "")
    );
    handleAccountDetails(
      "registeredNo",
      get(formData, "customerDetails.registeredNo", "")
    );
    setShowSameAccountDetailsModal(false);
    setUseSameCustomerDetails(true);
    dispatch(setCurrentStepInStore(7));
  };

  const handleAccountTypeSelection = (item) => {
    handleCustomerDetails("categoryType", item);
    setShowCustomerTypeModal(false);
    dispatch(setCurrentStepInStore(currentStep + 1));
  };

  // For selected product swipe
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  // Delete feature on swiping the selected product
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Pressable
        style={[styles.backRightBtn]}
        onPress={() => {
          alert("Index: ", data.index);
        }}
      >
        <Icon name="delete" size={19} color={"#D13D3D"} />
        <Text style={{ color: "#D13D3D" }}>Delete</Text>
      </Pressable>
    </View>
  );

  const renderStepsIndicatorView = () => {
    return (
      <View style={styles.stepsView}>
        <StepIndicator
          customStyles={styles.firstIndicatorStyles}
          currentPosition={stepIndicator}
          stepCount={5}
          labels={["Customer", "Services", "Account", "Agreement", "Preview"]}
        />
      </View>
    );
  };
  const faceRecTitle = () => {
    switch (currentStep) {
      case FACE_RECOG_GET_START:
        return "Get started"
        break;
      case FACE_RECOG_IM_READY:
        return "I'm ready"
        break;
      case FACE_RECOG_TAKE_SELFI:
        return "Take selfie"
        break;
      case FACE_RECOG_UPLOAD_DOCUS:
        return "Upload document"
      case FACE_RECOG_UPLOAD_DOCUS_SUCCESS:
        return "Continue"
      default:
        break;
    }
    return ""
  }
  // render the buttons in the bottom based on the currentStep
  const renderBottomButtonsUI = () => {
    //no footer on success screens
    if (currentStep == FACE_RECOG_UPLOAD_SELFI_SUCCESS || currentStep == FACE_RECOG_UPLOAD_DOCUS_LOADER ||
      currentStep == FACE_RECOG_UPLOAD_DOCUS_SUCCESS)
      return null

    if (currentStep == STEP_SERVICE_2_SHOW_SELECTED) {
      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.previous} onPress={handlePrevious} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              label={"Pay"}
              onPress={() => {
                setWorkFromPopUp(true)
              }}
            />
          </View>
        </View>
      );
    }
    //face regnozise
    if (currentStep === FACE_RECOG_GET_START || currentStep === FACE_RECOG_IM_READY || currentStep === FACE_RECOG_TAKE_SELFI || currentStep == FACE_RECOG_UPLOAD_DOCUS || currentStep == FACE_RECOG_UPLOAD_DOCUS_SUCCESS) {
      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>
            <CustomButton
              label={faceRecTitle()}
              onPress={() => {
                handleContinue()
                // dispatch(setCurrentStepInStore(currentStep + 1))
              }}
            />
          </View>
        </View>
      );
    }
    if (currentStep === FACE_RECOG_UPLOAD_SELFI) {
      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>
            <CustomButton label={"Retake"} onPress={handlePrevious} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton label={"Continue"} onPress={() => {
              dispatch(setCurrentStepInStore(currentStep + 1))
            }} />
          </View>
        </View>
      );
    }

    if (currentStep === 0) {
      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>
            <CustomButton

              label={strings.skip_proceed}
              onPress={() => setShowCustomerTypeModal(true)}
            />
          </View>
        </View>
      );
    }
    if (currentStep === STEP_AGREE) {
      return (
        <View style={styles.bottomButtonView}>

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <CustomButton label={strings.previous} onPress={handlePrevious} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.submit} onPress={handleSubmit} />
          </View>
        </View>
      );
    }
    if (currentStep === 10) {
      return (
        <View style={styles.bottomButtonView}>

          <View style={{ flex: 1 }}>
            <CustomButton label={strings.previous} onPress={handlePrevious} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.submit} onPress={handleSubmit} />
          </View>

        </View>
      );
    }
    if (currentStep === STEP_CUSTOMER_FORM) {


      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>

            <CustomButton label={"Scan Again"}
              isDisabled={true}
              onPress={handlePrevious} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton label={"Continue"} onPress={handleContinue}
              isDisabled={!checkFormValidation()}
            />
          </View>
        </View>
      );
    }
    // For all other currentStep
    return (
      <View style={styles.bottomButtonView}>
        <View style={{ flex: 1 }}>
          <CustomButton label={strings.previous} onPress={handlePrevious} />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            label={strings.save_continue}
            onPress={handleContinue}
          />
        </View>
      </View>
    );
  };
  const checkFormValidation = () => {
    switch (currentStep) {
      case STEP_CUSTOMER_FORM:
        const custDetails = get(formData, 'customerDetails', false)
        if (!custDetails) return false
        const fname = get(formData, 'customerDetails.firstName', "")
        const lname = get(formData, 'customerDetails.lastName', "")
        const idVal = get(formData, 'customerDetails.idValue', "")
        if (fname == "" || lname == "" || idVal == "") return false
        return true

      default:
        return "othere"
    }

  }
  const handleCustomerTypeIcon = (item) => {
    let icon = "";
    if (item.code === "BUS")
      icon = require("../../Assets/icons/ic_business.png");
    else if (item.code === "GOV")
      icon = require("../../Assets/icons/ic_government.png");
    else if (item.code === "REG")
      icon = require("../../Assets/icons/ic_regular.png");
    return icon;
  };

  const dispatchSetShowAccountCreationModal = (data) => {
    dispatch(setShowAccountCreationModal(data));
  };

  const dispatchSetSignatureInFormData = (data) => {
    dispatch(setSignatureInFormData(data));
  };

  const PreviewInfoItem = (props) => {
    const { title, value } = props;
    return (
      <View style={styles.previewInfoItemView}>
        <Text variant="bodySmall" style={styles.previewInfoItemTitleTxt}>
          {title}
        </Text>
        <Text variant="bodySmall" style={styles.previewInfoItemValueTxt}>
          {value}
        </Text>
      </View>
    );
  };
  //main
  if (logg) console.log("Full State value", formData)

  return (
    <>
      {
        RenderAppoinmentModel({
          appointment: get(masterReducer, "masterdataData.APPOINT_TYPE", []),
          enableLoader: enableLoader,
          setShowBottomModal: (status) => {
            setShowBottomModal(status)
          },
          showBottomModal: showBottomModal,
          activeProduct: activeProduct

        })
      }
      {
        RenderSelectStore({
          stores: get(masterReducer, "masterdataData.LOCATION", []),
          enableLoader: enableLoader,
          setShowBottomModal: (status) => {
            setWorkFromPopUp(status)
          },
          showBottomModal: showWorkFromPopUP,
          handleContinue: () => {
            dispatch(setCurrentStepInStore(STEP_AGREE));

          }

        })
      }

      {showFaceDection && <FaceDetection

        seURI={(async (data) => {
          setShowCam(false)

          if (currentStep == FACE_RECOG_TAKE_SELFI) {
            setUserIDImg({ ...userIDImg, face: data })
            await dispatch(setCurrentStepInStore(FACE_RECOG_UPLOAD_SELFI_SUCCESS));
            setTimeout(() => {
              dispatch(setCurrentStepInStore(FACE_RECOG_UPLOAD_DOCUS));

            }, 1000)
          }
          else {
            setUserIDImg({ ...userIDImg, idCard: data.idFace })

            const formDataState = new FormData();
            formDataState.append('source', userIDImg.face);
            formDataState.append('target', data.idFace);

            dispatch(setCurrentStepInStore(FACE_RECOG_UPLOAD_DOCUS_LOADER));
            // console.log("formData", formDataState)
            const resImgCheck = await APICallForMuti(endPoints.FACE_MATCH_API, formDataState, "Face not verifed")
            if (resImgCheck.status) {
              dispatch(setCurrentStepInStore(FACE_RECOG_UPLOAD_DOCUS_SUCCESS));
              //api call if success data parse and give me
              const formDataState = new FormData();
              formDataState.append('file', data.fullId);
              const docuScanStatus = await APICallForMuti(endPoints.DOCU_SCAN, formDataState)
              //scaned docs
              if (docuScanStatus.status) {
                const docData = docuScanStatus.response
                handleCustomerDetails("firstName", get(docData, 'data.data.firstName', ''))
                handleCustomerDetails("lastName", get(docData, 'data.data.lastName', ''))
                handleCustomerDetails("idType", get(docData, 'data.data.idValue', ''))
                dispatch(setCurrentStepInStore(STEP_CUSTOMER_FORM));
              }
              else {
                dispatch(setCurrentStepInStore(STEP_CUSTOMER_FORM));

              }
            }
            else {
              dispatch(setCurrentStepInStore(FACE_RECOG_TAKE_SELFI));

            }
          }
        })
        }
        isIdcard={currentStep == FACE_RECOG_UPLOAD_DOCUS}
      />}
      <View style={styles.container}>

        {loader && <LoadingAnimation title={loaderLbl} />}
        {/* {renderStepsIndicatorView()} */}
        <ScrollView nestedScrollEnabled={true}>

          {currentStep == FACE_RECOG_GET_START && renderfaceRegconize()}
          {currentStep == FACE_RECOG_IM_READY && renderfaceRegconize()}
          {currentStep == FACE_RECOG_TAKE_SELFI && renderfaceRegconize()}
          {currentStep == FACE_RECOG_UPLOAD_SELFI && renderfaceRegconize()}
          {currentStep == FACE_RECOG_UPLOAD_SELFI_SUCCESS && renderfaceRegconize()}
          {currentStep == FACE_RECOG_UPLOAD_DOCUS && renderfaceRegconize()}
          {currentStep == FACE_RECOG_UPLOAD_DOCUS_LOADER && renderfaceRegconize()}
          {currentStep == FACE_RECOG_UPLOAD_DOCUS_SUCCESS && renderfaceRegconize()}
          {currentStep == 0 && renderUploadDocsUI()}
          {currentStep == STEP_CUSTOMER_FORM && renderCustomerDetailsUI()}
          {currentStep == STEP_CUSTOMER_ADDRESS && renderCustomerAddressUI()}
          {currentStep == STEP_SERVICE_LIST && renderServicesUI()}
          {currentStep == STEP_SERVICE_2_SHOW_SELECTED && renderSelectedServicesUI()}
          {currentStep == 5 && renderServiceAddressUI()}
          {currentStep == 6 && renderCreateAccount_DetailsUI()}
          {currentStep == 7 && renderCreateAccount_PreferencesUI()}
          {currentStep == 8 && renderCreateAccount_AddressUI()}
          {currentStep == STEP_AGREE && renderAgreementUI()}
          {currentStep == 10 && renderPreviewUI()}
        </ScrollView>
        {/* Bottom Button View */}
        {renderBottomButtonsUI()}
        {/* Choose customer type modal */}
        <Modal
          visible={showCustomerTypeModal}
          dismissable={false}
          contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
        >
          <FooterModel
            open={showCustomerTypeModal}
            setOpen={setShowCustomerTypeModal}
            title={"Choose purpose of customer creation"}
          >
            <View style={styles.modalContainer}>
              <FlatList
                data={CUSTOMER_CATEGORY_LIST}
                numColumns={4}
                renderItem={({ item, index }) => (
                  <CustomerType
                    name={item.description}
                    icon={handleCustomerTypeIcon(item)}
                    onPress={() => handleAccountTypeSelection(item)}
                  />
                )}
                keyExtractor={(item, index) => index}
              />
            </View>
          </FooterModel>
        </Modal>
        {/* Account Creation Modal */}
        <Modal
          visible={formData?.showAccountCreationModal}
          dismissable={false}
          contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
        >
          <FooterModel
            open={formData?.showAccountCreationModal}
            setOpen={dispatchSetShowAccountCreationModal}
            title={"Do you want to create an account?"}
          >
            <View style={styles.modalContainer}>
              <Pressable onPress={handleAccountCreationYes}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "#4C5A81",
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  Yes
                </Text>
              </Pressable>
              <Pressable onPress={handleAccountCreationNo}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "red",
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </FooterModel>
        </Modal>
        {/* Use customer details same as Account details Modal */}
        <Modal
          visible={showSameAccountDetailsModal}
          dismissable={false}
          contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
        >
          <FooterModel
            open={showSameAccountDetailsModal}
            setOpen={setShowSameAccountDetailsModal}
            title={"Do you want to use account details same as customer details?"}
          >
            <View style={styles.modalContainer}>
              <Pressable onPress={handleSameAccountDetailsYes}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "#4C5A81",
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  Yes
                </Text>
              </Pressable>
              <Pressable onPress={handleSameAccountDetailsNo}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "red",
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </FooterModel>
        </Modal>
        {/* Create Order Modal */}
        <Modal
          visible={showCreateOrderModal}
          dismissable={false}
          contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
        >
          <FooterModel
            open={showCreateOrderModal}
            setOpen={setShowCreateOrderModal}
            title={"Are you sure, you want to generate the order?"}
          >
            <View style={styles.modalContainer}>
              <Pressable onPress={handleCreateOrderYes}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "#4C5A81",
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  Yes
                </Text>
              </Pressable>
              <Pressable onPress={() => setShowCreateOrderModal(false)}>
                <Text
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 20,
                    fontWeight: "600",
                    backgroundColor: "red",
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  No
                </Text>
              </Pressable>
            </View>
          </FooterModel>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    margin: 10,
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: 50,
  },
  stepsView: {
    backgroundColor: "#4C5A81",
    paddingVertical: 10,
  },
  bottomButtonView: {
    flexDirection: "row",
    bottom: 0,
    backgroundColor: "white",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 100,
    height: 80,
    backgroundColor: "#FEE5E4",
    right: 0,
    margin: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  firstIndicatorStyles: {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: "#4C5A81",
    separatorFinishedColor: "#fff",
    separatorUnFinishedColor: "#8FA1C4",

    stepIndicatorFinishedColor: "#fff",
    stepIndicatorUnFinishedColor: "#8FA1C4",
    stepIndicatorCurrentColor: "#ffffff",

    stepIndicatorLabelFontSize: 14,
    currentStepIndicatorLabelFontSize: 18,

    stepIndicatorLabelCurrentColor: "#000000",
    stepIndicatorLabelFinishedColor: "#4C5A81",
    stepIndicatorLabelUnFinishedColor: "#fff",

    labelColor: "#8FA1C4",
    labelSize: 14,
    currentStepLabelColor: "#fff",
  },
  previewImgStyle: {
    alignSelf: "center",
    width: "80%",
    height: 180,
  },
  previewInfoItemView: {
    flex: 1,
    flexDirection: "column",
  },
  previewInfoItemTitleTxt: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000000",
  },
  previewInfoItemValueTxt: {
    fontWeight: "400",
    fontSize: 12,
    color: "#000000",
    marginTop: 5,
  },
});

export default CreateCustomer;
