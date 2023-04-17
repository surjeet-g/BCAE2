import get from 'lodash.get';
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList, Image, Pressable,
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
import LoadingAnimation from "../../Components/LoadingAnimation";
import {
  getMasterData,
  MASTER_DATA_CONSTANT
} from "../../Redux/masterDataDispatcher";
import { fetchRegisterFormData } from "../../Redux/RegisterDispatcher";
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
import { removeCategoryProducts } from "./CreateCustomerAction";
import { fetchServiceProducts } from "./CreateCustomerDispatcher";
import CustomerAgreement from "./CustomerAgreement";
import CustomerType from "./CustomerType";
import Product from "./Product";
import SelectedProduct from "./SelectedProduct";
import ServiceCategory from "./ServiceCategory";
import UploadDocument from "./UploadDocument";
import { getCityByDistrict, getPostCodeByCity, getUniqueDistricts, getUniqueState } from './utilities';

const CreateCustomer = ({ navigation }) => {
  const { colors } = useTheme();

  const dispatch = useDispatch([
    fetchServiceProducts,
    removeCategoryProducts,
    getMasterData,
    fetchRegisterFormData,
  ]);
  const [formData, setFormData] = useState({
    getQuote: false,
    customerDetails: {
      address1: "",
      address2: "",
      address3: "",
      city: "",
      district: "",
      state: "",
      postCode: "",
      email: "",
      contactType: "",
      mobile: "",
    },
    accountDetails: {},
    serviceDetails: { details: [], address: {} },
  });
  const [loader, setLoader] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState("district");
  const [addressTakenType, setAddressTakenType] = useState("Manual")

  const [currentStep, setCurrentStep] = useState(1);
  const [stepIndicator, setStepIndicator] = useState(0);
  const [showCustomerTypeModal, setShowCustomerTypeModal] = useState(false);
  const [showAccountCreationModal, setShowAccountCreationModal] =
    useState(false);
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
  const [signature, setSignature] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  let createCustomerReducerData = useSelector(
    (state) => state.createCustomerReducerData
  );
  let masterReducer = useSelector((state) => state.masterdata);
  const savedLocation = useSelector((state) => state.savedLocations);

  const customerDetails = {};
  const serviceDetails = { details: [], address: {} };
  const accountTypeCode = formData?.accountDetails?.accountType?.code;

  console.log("formData", JSON.stringify(formData));

  // Used to fetch master data
  useEffect(() => {
    const {
      CUSTOMER_ID_TYPE,
      CUSTOMER_CATEGORY,
      CONTACT_PREFERENCE,
      CONTACT_TYPE,
      GENDER,
      NOTIFICATION_TYPE,
      BILL_LANGUAGE,
      CURRENCY,
      ACCOUNT_CATEGORY,
      ACCOUNT_LEVEL,
      ACCOUNT_TYPE,
      ACCOUNT_CLASS,
      COUNTRY,
    } = MASTER_DATA_CONSTANT;

    dispatch(
      getMasterData(
        `${COUNTRY},${CUSTOMER_ID_TYPE},${CUSTOMER_CATEGORY},${CONTACT_PREFERENCE},${GENDER},${NOTIFICATION_TYPE},${BILL_LANGUAGE},${CURRENCY},${ACCOUNT_CATEGORY},${ACCOUNT_LEVEL},${ACCOUNT_TYPE},${ACCOUNT_CLASS}`
      )
    );
  }, []);
  const ID_TYPE_LIST = masterReducer?.masterdataData?.CUSTOMER_ID_TYPE;
  const CUSTOMER_CATEGORY_LIST =
    masterReducer?.masterdataData?.CUSTOMER_CATEGORY;
  const GENDER_LIST = masterReducer?.masterdataData?.GENDER;
  const CONTACT_TYPE_LIST = masterReducer?.masterdataData?.CONTACT_TYPE;
  const ACCOUNT_CATEGORY_LIST = masterReducer?.masterdataData?.ACCOUNT_CATEGORY;
  const ACCOUNT_TYPE_LIST = masterReducer?.masterdataData?.ACCOUNT_TYPE;
  const ACCOUNT_LEVEL_LIST = masterReducer?.masterdataData?.ACCOUNT_LEVEL;
  const NOTIFICATION_TYPE_LIST =
    masterReducer?.masterdataData?.NOTIFICATION_TYPE;
  const BILL_LANGUAGE_LIST = masterReducer?.masterdataData?.BILL_LANGUAGE;
  const CURRENCY_LIST = masterReducer?.masterdataData?.CURRENCY;

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

  // Step = 0
  const renderUploadDocsUI = () => {
    return (
      <View>
        <CustomTitleText title={"Upload your documents"} />
        <UploadDocument />
      </View>
    );
  };

  const handleCustomerDetails = (key, value) => {
    let { customerDetails } = formData;
    customerDetails[key] = value;
    setFormData({ ...formData, customerDetails });
  };

  // Step = 1

  const renderCustomerDetailsUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Information"} />
        <View style={styles.backgroundView}>
          <CustomInput
            value={formData?.customerDetails?.title}
            caption={strings.title}
            placeHolder={strings.title}
            onChangeText={(text) => handleCustomerDetails("title", text)}
          />
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
            open={openDatePicker}
            onCancel={() => setOpenDatePicker(false)}
            date={formData?.customerDetails?.birthDate || new Date()}
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleCustomerDetails("birthDate", params);
              setOpenDatePicker(false);
            }}
          />
          <CustomInput
            value={moment(formData?.customerDetails?.birthDate).format(
              "YYYY-MM-DD"
            )}
            caption={strings.dob}
            onFocus={() => setOpenDatePicker(true)}
            placeHolder={strings.dob}
            right={
              <TextInput.Icon
                onPress={() => setOpenDatePicker(true)}
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
            data={ID_TYPE_LIST}
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
          <CustomInput
            value={formData?.customerDetails?.idPlace}
            caption={strings.place_of_issue}
            placeHolder={strings.place_of_issue}
            onChangeText={(text) => handleCustomerDetails("idPlace", text)}
          />
          {(accountTypeCode === "BUS" || accountTypeCode === "GOV") && (
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
            open={openDatePicker}
            onCancel={() => setOpenDatePicker(false)}
            date={formData?.customerDetails?.registeredDate || new Date()}
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleCustomerDetails("registeredDate", params);
              setOpenDatePicker(false);
            }}
          />
          {(accountTypeCode === "BUS" || accountTypeCode === "GOV") && (
            <CustomInput
              value={moment(formData?.customerDetails?.registeredDate).format(
                "YYYY-MM-DD"
              )}
              caption={strings.registereredDate}
              onFocus={() => setOpenDatePicker(true)}
              placeHolder={strings.registereredDate}
              right={
                <TextInput.Icon
                  onPress={() => setOpenDatePicker(true)}
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

  const locationIconClick = () => {
    navigation.navigate("SavedLocation", {
      onPlaceChosen_2,
      fromPage: "CreateCustomer_2",
    });
  };

  const onPlaceChosen_2 = (params) => {
    // here is your callback function
    console.log("onPlaceChosen_2", JSON.stringify(params));
    // {
    // "address1":"hno1,b1","address2":"Uttara kannada,Karnataka","address3":"India,581351",

    const addressSplit = params.address1.split(",");
    const address2Split = params.address2.split(",");
    handleCustomerDetails("address1", get(addressSplit, '[0]', ''));
    handleCustomerDetails("address2", get(addressSplit, '[1]', ''));
    handleCustomerDetails("address3", get(address2Split, '[1]', ''));

    handleCustomerDetails("country", params.country);
    handleCustomerDetails("district", params.district);
    handleCustomerDetails("postCode", params.postcode);
    handleCustomerDetails("state", params.state);
    handleCustomerDetails("city", params.city);
    setAddressTakenType("AUTO")
  };

  // Step = 2
  const renderCustomerAddressFormUI = () => {
    const getCountryList = () => {
      const countryGetList = get(masterReducer, "masterdataData.COUNTRY", []);
      if (countryGetList.length == 0) return []
      return countryGetList.map(item => (
        { code: item?.code, description: item.description }
      ))
    }
    const isAutoAddress = (addressTakenType == "AUTO")
    return (
      <View>
        <CustomTitleText title={"Customer Details"} />
        <View style={styles.backgroundView}>
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
            isDisable={isAutoAddress}
            selectedValue={get(formData, 'customerDetails.country', '')}

            setValue={() => { }}
            data={
              getCountryList() ?? []
            }
            onChangeText={(text) => {
              console.log(">>", text);
              // onCountyClick(text)
              handleCustomerDetails("country", text?.code)
              handleCustomerDetails("state", "")
              handleCustomerDetails("district", "")
              handleCustomerDetails("city", "")
              handleCustomerDetails("postCode", "")

              if (addressTakenType != "AUTO") {
                setLoader(true)
                dispatch(fetchRegisterFormData({
                  type: "COUNTRY",
                  search: text?.code
                }, () => setLoader(false)));
              }

            }}
            value={get(formData, 'customerDetails.country', '')}

            isDisableDropDown={activeDropDown != "country"}
            placeHolder={strings.country + "*"}
            caption={strings.country + "*"}
          />

          <CustomInput
            disabled={isAutoAddress}
            value={get(formData, 'customerDetails.address1', '')}
            caption={"Flat/House/Unit No/ Block"}
            placeHolder={"Flat/House/Unit No/ Block"}
            onChangeText={(text) => {
              handleCustomerDetails("address1", text)
            }}
          />
          <CustomInput
            disabled={isAutoAddress}
            value={get(formData, 'customerDetails.address2', '')}
            caption={"Building Name/Others"}
            placeHolder={"Building Name/Others"}
            onChangeText={(text) => handleCustomerDetails("address2", text)}
          />
          <CustomInput
            disabled={isAutoAddress}
            value={get(formData, 'customerDetails.address3', '')}
            caption={"Street/Area"}
            placeHolder={"Street/Area"}
            onChangeText={(text) => handleCustomerDetails("address3", text)}

          />

          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("state")}
            isDisableDropDown={activeDropDown != "state"}
            editable={!isAutoAddress}
            selectedValue={get(formData, 'customerDetails.state', '')}
            setValue={() => { }}
            data={getUniqueState(savedLocation.addressLoopupData) ?? []}
            onChangeText={(text) => {

              handleCustomerDetails("state", text?.id)
              handleCustomerDetails("district", "")
              handleCustomerDetails("city", "")
              handleCustomerDetails("postCode", "")
            }}
            value={get(formData, "customerDetails.state", "")}
            caption={"State/Region"}
            placeHolder={"Select " + "State/Region"}
          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("district")}
            isDisableDropDown={activeDropDown != "district"}
            editable={!isAutoAddress}
            selectedValue={get(formData, 'customerDetails.district', '')}
            setValue={() => { }}
            data={getUniqueDistricts(savedLocation.addressLoopupData, get(formData, 'customerDetails.state', '')) ?? []}
            onChangeText={(text) => {
              handleCustomerDetails("district", text?.id)
              handleCustomerDetails("city", "")
              handleCustomerDetails("postCode", "")
            }}
            value={get(formData, 'customerDetails.district', '')}
            caption={"District/Province"}
            placeHolder={"Select " + "District/Province"}

          />
          <CustomDropDownFullWidth
            setDropDownEnable={() => setActiveDropDown("city")}
            isDisableDropDown={activeDropDown != "city"}
            editable={!isAutoAddress}
            selectedValue={get(formData, 'customerDetails.city', '')}
            setValue={() => { }}
            data={getCityByDistrict(savedLocation.addressLoopupData, get(formData, 'customerDetails.district', '')) ?? []}
            onChangeText={(text) => {
              handleCustomerDetails("city", text?.id)
              handleCustomerDetails("postCode", "")
            }}
            value={get(formData, 'customerDetails.city', '')}
            caption={"City/Town"}
            placeHolder={"City/Town"}

          />

          <CustomDropDownFullWidth
            editable={!isAutoAddress}
            setDropDownEnable={() => setActiveDropDown("postCode")}
            isDisableDropDown={activeDropDown != "postCode"}
            selectedValue={get(formData, 'customerDetails.postCode', '')}
            setValue={() => { }}
            data={getPostCodeByCity(savedLocation.addressLoopupData, get(formData, 'customerDetails.city', '')) ?? []}
            onChangeText={(text) => {
              handleCustomerDetails("postCode", text?.id)
            }}
            value={get(formData, 'customerDetails.postCode', '')}
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
              onSelect={() => {
                dispatch(fetchServiceProducts(item.code, navigation));
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
    return (
      <View>
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
            onValueChange={() =>
              setFormData({ ...formData, getQuote: !formData?.getQuote })
            }
            value={formData?.getQuote}
          />
        </View>
        <CustomTitleText title={"Selected Product"} />
        <SwipeListView
          showsVerticalScrollIndicator={false}
          disableRightSwipe={true}
          data={products.filter((product) => product.quantity > 0)}
          renderItem={({ item, index }) => <SelectedProduct item={item} />}
          keyExtractor={(item, index) => index}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-100}
          stopRightSwipe={-100}
          onRowDidOpen={onRowDidOpen}
        />
        <CustomTitleText title={"Bill Details"} />
        <BillDetails
          details={{
            gTotal: calculateGTotal(),
            total: calculateGTotal() + 50 - 100,
            gst: 50.0,
            discount: 100.0,
          }}
        />
      </View>
    );
  };

  // Step = 5
  const renderServiceAddressUI = () => {
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
            onPress={() =>
              setIsSameServiceAddressChecked(!isSameServiceAddressChecked)
            }
          />
          <CustomTitleText
            title={"Service address same as customer address"}
            textStyle={{ marginTop: 0 }}
          />
        </View>
        <CustomTitleText title={"Service Address"} />
        <View style={styles.backgroundView}>
          <CustomInput
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.address1
                : formData?.serviceDetails?.address?.address1
            }
            caption={"Flat/House/Unit No/ Block"}
            placeHolder={"Flat/House/Unit No/ Block"}
            onChangeText={(text) => (serviceDetails.address.address1 = text)}
          />
          <CustomInput
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.address2
                : formData?.serviceDetails?.address?.address2
            }
            caption={"Building Name/Others"}
            placeHolder={"Building Name/Others"}
            onChangeText={(text) => (serviceDetails.address.address2 = text)}
          />
          <CustomInput
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.address3
                : formData?.serviceDetails?.address?.address3
            }
            caption={"Street/Area"}
            placeHolder={"Street/Area"}
            onChangeText={(text) => (serviceDetails.address.address3 = text)}
          />
          <CustomInput
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.city
                : formData?.serviceDetails?.address?.city
            }
            caption={"City/Town"}
            placeHolder={"City/Town"}
            onChangeText={(text) => (serviceDetails.address.city = text)}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (serviceDetails.address.district = text)}
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.district
                : formData?.serviceDetails?.address?.district
            }
            caption={"District/Province"}
            placeHolder={"Select " + "District/Province"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (serviceDetails.address.state = text)}
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.state
                : formData?.serviceDetails?.address?.state
            }
            caption={"State/Region"}
            placeHolder={"Select " + "State/Region"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (serviceDetails.address.postcode = text)}
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.postcode
                : formData?.serviceDetails?.address?.postcode
            }
            caption={"Post/Zip Code"}
            placeHolder={"Select " + "Post/Zip Code"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (serviceDetails.address.country = text)}
            value={
              isSameServiceAddressChecked
                ? formData?.customerDetails?.country
                : formData?.serviceDetails?.address?.country
            }
            caption={strings.country}
            placeHolder={"Select " + strings.country}
          />
        </View>
      </View>
    );
  };

  const handleAccountDetails = (key, value) => {
    let { accountDetails } = formData;
    accountDetails[key] = value;
    setFormData({ ...formData, accountDetails });
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
            onPress={() =>
              setIsSameCustomerDetailsChecked(!isSameCustomerDetailsChecked)
            }
          />
          <CustomTitleText
            title={"Use same customer details"}
            textStyle={{ marginTop: 0 }}
          />
        </View>
        <CustomTitleText title={"Account Creation"} />
        <View style={styles.backgroundView}>
          <CustomInput
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.title
                : formData?.accountDetails?.title
            }
            caption={strings.title}
            placeHolder={strings.title}
            onChangeText={(text) => handleAccountDetails("title", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.firstName
                : formData?.accountDetails?.firstName
            }
            caption={strings.firstname}
            placeHolder={strings.firstname}
            onChangeText={(text) => handleAccountDetails("firstName", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.lastName
                : formData?.accountDetails?.lastName
            }
            caption={strings.lastname}
            placeHolder={strings.lastname}
            onChangeText={(text) => handleAccountDetails("lastName", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <DatePicker
            modal
            mode="date"
            validRange={{ endDate: new Date() }}
            open={openDatePicker}
            onCancel={() => setOpenDatePicker(false)}
            date={
              (isSameCustomerDetailsChecked
                ? formData?.customerDetails?.birthDate
                : formData?.accountDetails?.birthDate) || new Date()
            }
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleAccountDetails("birthDate", params);
              setOpenDatePicker(false);
            }}
          />
          <CustomInput
            value={
              isSameCustomerDetailsChecked
                ? moment(formData?.customerDetails?.birthDate).format(
                  "YYYY-MM-DD"
                )
                : moment(formData?.accountDetails?.birthDate).format(
                  "YYYY-MM-DD"
                )
            }
            caption={strings.dob}
            onFocus={() => setOpenDatePicker(true)}
            placeHolder={strings.dob}
            right={
              <TextInput.Icon
                onPress={() =>
                  isSameCustomerDetailsChecked ? {} : setOpenDatePicker(true)
                }
                style={{ width: 23, height: 23 }}
                theme={{ colors: { onSurfaceVariant: colors.gray } }}
                icon={"calendar"}
              />
            }
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomDropDownFullWidth
            selectedValue={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.gender?.description
                : formData?.accountDetails?.gender?.description
            }
            data={GENDER_LIST}
            onChangeText={(item) => handleAccountDetails("gender", item)}
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.gender?.code
                : formData?.accountDetails?.gender?.code
            }
            caption={strings.gender}
            placeHolder={"Select " + strings.gender}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomDropDownFullWidth
            selectedValue={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.idType?.description
                : formData?.accountDetails?.idType?.description
            }
            data={ID_TYPE_LIST}
            onChangeText={(item) => handleAccountDetails("idType", item)}
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.idType?.code
                : formData?.accountDetails?.idType?.code
            }
            caption={strings.id_type}
            placeHolder={"Select " + strings.id_type}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.idValue
                : formData?.accountDetails?.idValue
            }
            caption={strings.id_number}
            placeHolder={strings.id_number}
            onChangeText={(text) => handleAccountDetails("idValue", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.idPlace
                : formData?.accountDetails?.idPlace
            }
            caption={strings.place_of_issue}
            placeHolder={strings.place_of_issue}
            onChangeText={(text) => handleAccountDetails("idPlace", text)}
            disabled={isSameCustomerDetailsChecked}
          />
          {(accountTypeCode === "BUS" || accountTypeCode === "GOV") && (
            <CustomInput
              value={
                isSameCustomerDetailsChecked
                  ? formData?.customerDetails?.registeredNo
                  : formData?.accountDetails?.registeredNo
              }
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
            open={openDatePicker}
            onCancel={() => setOpenDatePicker(false)}
            date={
              (isSameCustomerDetailsChecked
                ? formData?.customerDetails?.registeredDate
                : formData?.accountDetails?.registeredDate) || new Date()
            }
            maximumDate={new Date()}
            onConfirm={(params) => {
              console.log("data", params);
              handleAccountDetails("registeredDate", params);
              setOpenDatePicker(false);
            }}
          />
          {(accountTypeCode === "BUS" || accountTypeCode === "GOV") && (
            <CustomInput
              value={
                isSameCustomerDetailsChecked
                  ? moment(formData?.customerDetails?.registeredDate).format(
                    "YYYY-MM-DD"
                  )
                  : moment(formData?.accountDetails?.registeredDate).format(
                    "YYYY-MM-DD"
                  )
              }
              caption={strings.dob}
              onFocus={() => setOpenDatePicker(true)}
              placeHolder={strings.dob}
              right={
                <TextInput.Icon
                  onPress={() =>
                    isSameCustomerDetailsChecked ? {} : setOpenDatePicker(true)
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
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.mobileNo
                : formData?.accountDetails?.mobileNo
            }
            placeHolder={strings.mobile_no}
            keyboardType="numeric"
            maxLength={numberMaxLength}
            disabled={isSameCustomerDetailsChecked}
          />
          <CustomInput
            value={
              isSameCustomerDetailsChecked
                ? formData?.customerDetails?.emailId
                : formData?.accountDetails?.emailId
            }
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
            onPress={() =>
              setIsSameAccountAddressChecked(!isSameAccountAddressChecked)
            }
          />
          <CustomTitleText
            title={"Account address same as customer address"}
            textStyle={{ marginTop: 0 }}
          />
        </View>
        <CustomTitleText title={"Account Address"} />

        <View style={styles.backgroundView}>
          <CustomInput
            value={""}
            caption={"Flat/House/Unit No/ Block"}
            placeHolder={"Flat/House/Unit No/ Block"}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={"Building Name/Others"}
            placeHolder={"Building Name/Others"}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={"Street/Area"}
            placeHolder={"Street/Area"}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={"City/Town"}
            placeHolder={"City/Town"}
            onChangeText={(text) => text}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={"District/Province"}
            placeHolder={"Select " + "District/Province"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={"State/Region"}
            placeHolder={"Select " + "State/Region"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={"Post/Zip Code"}
            placeHolder={"Select " + "Post/Zip Code"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.country}
            placeHolder={"Select " + strings.country}
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
        <CustomerAgreement signature={signature} setSignature={setSignature} />
      </View>
    );
  };

  // Step = 10
  const renderPreviewUI = () => {
    return (
      <View>
        <CustomTitleText title={"Show Preview"} />
        {/* Show Preview View */}
        {signature !== null && (
          <Image
            resizeMode={"cover"}
            style={styles.previewImgStyle}
            source={{ uri: signature }}
          />
        )}
      </View>
    );
  };

  const calculateGTotal = () => {
    let gTotal = 0;
    products.forEach((product) => {
      if (product.quantity > 0)
        gTotal = gTotal + product.quantity * product.price;
    });
    return gTotal;
  };

  const handlePrevious = () => {
    if (currentStep === 10 && formData?.getQuote) {
      setCurrentStep(4);
    } else if (currentStep === 9 && !createAccount) {
      setCurrentStep(5);
    } else if (currentStep === 7 && useSameCustomerDetails) {
      setCurrentStep(5);
    } else setCurrentStep(currentStep - 1);
  };

  const handleContinue = () => {
    switch (currentStep) {
      case 3:
        {
          let item = products.find((product) => product.quantity > 0);
          if (item === undefined)
            alert("Select atleast one service to continue!!!");
          else {
            const selectedProducts = products.filter(
              (product) => product.quantity > 0
            );
            serviceDetails.details = selectedProducts;
            setFormData({ ...formData, serviceDetails });
            setCurrentStep(currentStep + 1);
          }
        }
        break;
      case 4:
        {
          formData?.getQuote
            ? setCurrentStep(10)
            : setCurrentStep(currentStep + 1);
        }
        break;
      case 5:
        setShowAccountCreationModal(true);
        break;
      case 9:
        setFormData({ ...formData, signature });
        setCurrentStep(currentStep + 1);
        break;
      default:
        setCurrentStep(currentStep + 1);
        break;
    }
  };

  const handleSubmit = () => {
    alert("Submit with create customer API");
  };

  const handleAccountCreationNo = () => {
    setShowAccountCreationModal(false);
    setCreateAccount(false);
    setCurrentStep(9);
  };

  const handleAccountCreationYes = () => {
    setShowAccountCreationModal(false);
    setCreateAccount(true);
    setTimeout(() => setShowSameAccountDetailsModal(true), 100);
  };

  const handleSameAccountDetailsNo = () => {
    setShowSameAccountDetailsModal(false);
    setUseSameCustomerDetails(false);
    setCurrentStep(currentStep + 1);
  };

  const handleSameAccountDetailsYes = () => {
    setShowSameAccountDetailsModal(false);
    setUseSameCustomerDetails(true);
    setCurrentStep(7);
  };

  const handleAccountTypeSelection = (item) => {
    handleAccountDetails("accountType", item);
    setShowCustomerTypeModal(false);
    setCurrentStep(currentStep + 1);
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

  // render the buttons in the bottom based on the currentStep
  const renderBottomButtonsUI = () => {
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
    if (currentStep === 9) {
      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.previous} onPress={handlePrevious} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              label={strings.proceed_to_preview}
              onPress={handleContinue}
            />
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

  return (
    <View style={styles.container}>
      {loader && <LoadingAnimation title="while we are fetching country" />}
      {renderStepsIndicatorView()}
      <ScrollView nestedScrollEnabled={true}>
        {currentStep == 0 && renderUploadDocsUI()}
        {currentStep == 1 && renderCustomerDetailsUI()}
        {currentStep == 2 && renderCustomerAddressFormUI()}
        {currentStep == 3 && renderServicesUI()}
        {currentStep == 4 && renderSelectedServicesUI()}
        {currentStep == 5 && renderServiceAddressUI()}
        {currentStep == 6 && renderCreateAccount_DetailsUI()}
        {currentStep == 7 && renderCreateAccount_PreferencesUI()}
        {currentStep == 8 && renderCreateAccount_AddressUI()}
        {currentStep == 9 && renderAgreementUI()}
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
        visible={showAccountCreationModal}
        dismissable={false}
        contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
      >
        <FooterModel
          open={showAccountCreationModal}
          setOpen={setShowAccountCreationModal}
          title={"Do you want to create an account?"}
        >
          <View style={styles.modalContainer}>
            <Pressable onPress={handleAccountCreationYes}>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 20,
                  fontWeight: 600,
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
                  fontWeight: 600,
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
                  fontWeight: 600,
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
                  fontWeight: 600,
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
    margin: 20,
    backgroundColor: "red",
  },
});

export default CreateCustomer;
