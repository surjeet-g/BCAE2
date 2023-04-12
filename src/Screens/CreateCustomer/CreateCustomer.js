import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
  Pressable,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { CustomButton } from "./../../Components/CustomButton";
import { strings } from "./../../Utilities/Language/index";
import UploadDocument from "./UploadDocument";
import CustomTitleText from "./../../Components/CustomTitleText";
import CustomerAgreement from "./CustomerAgreement";
import Product from "./Product";
import ServiceCategory from "./ServiceCategory";
import SelectedProduct from "./SelectedProduct";
import BillDetails from "./BillDetails";
import { CustomInput } from "./../../Components/CustomInput";
import { CustomInputWithCC } from "./../../Components/CustomInputWithCC";
import { CountryPicker } from "react-native-country-codes-picker";
import { CustomDropDownFullWidth } from "./../../Components/CustomDropDownFullWidth";
import {
  excludedCountriesList,
  getPhoneNumberLength,
} from "./../../Utilities/utils";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, Checkbox } from "react-native-paper";
import { FooterModel } from "./../../Components/FooterModel";
import CustomerType from "./CustomerType";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceProducts } from "./CreateCustomerDispatcher";
import { removeCategoryProducts } from "./CreateCustomerAction";

const CreateCustomer = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch([fetchServiceProducts, removeCategoryProducts]);
  const [formData, setFormData] = useState({ getQuote: false });
  const [currentStep, setCurrentStep] = useState(0);
  const [stepIndicator, setStepIndicator] = useState(0);
  const [showCustomerTypeModal, setShowCustomerTypeModal] = useState(false);
  const [showAccountCreationModal, setShowAccountCreationModal] =
    useState(false);
  const [showSameAccountDetailsModal, setShowSameAccountDetailsModal] =
    useState(false);
  const [createAccount, setCreateAccount] = useState(true);
  const [isSameAddressChecked, setIsSameAddressChecked] = useState(true);
  const [useSameCustomerDetails, setUseSameCustomerDetails] = useState(false);
  const [numberError, setNumberError] = useState("");
  const [countryCode, setCountryCode] = useState("+673");
  const [numberMaxLength, setNumberMaxLength] = useState(7);
  const [countryPickModel, setCountryPickModel] = useState(false);

  let createCustomerReducerData = useSelector(
    (state) => state.createCustomerReducerData
  );

  console.log("$$$-formData", JSON.stringify(formData));

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

  const customerDetails = { details: {}, address: {} };
  const accountTypeCode = formData?.accountDetails?.details?.accountType?.code;
  // Step = 1
  const renderCustomerDetailsUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Information"} />
        <View style={styles.backgroundView}>
          <CustomInput
            value={formData?.customerDetails?.details?.title}
            caption={strings.title}
            placeHolder={strings.title}
            onChangeText={(text) => (customerDetails.details.title = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.details?.firstName}
            caption={strings.firstname}
            placeHolder={strings.firstname}
            onChangeText={(text) => (customerDetails.details.firstName = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.details?.lastName}
            caption={strings.lastname}
            placeHolder={strings.lastname}
            onChangeText={(text) => (customerDetails.details.lastName = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.details?.birthDate}
            caption={strings.dob}
            placeHolder={strings.dob}
            onChangeText={(text) => (customerDetails.details.birthDate = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.details?.gender}
            caption={strings.gender}
            placeHolder={strings.gender}
            onChangeText={(text) => (customerDetails.details.gender = text)}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (customerDetails.details.idType = text)}
            value={""}
            caption={strings.id_type}
            placeHolder={"Select " + strings.id_type}
          />
          <CustomInput
            value={formData?.customerDetails?.details?.idValue}
            caption={strings.id_number}
            placeHolder={strings.id_number}
            onChangeText={(text) => (customerDetails.details.idValue = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.details?.idPlace}
            caption={strings.place_of_issue}
            placeHolder={strings.place_of_issue}
            onChangeText={(text) => (customerDetails.details.idPlace = text)}
          />
          {(accountTypeCode === "BUS" || accountTypeCode === "GOVN") && (
            <CustomInput
              value={formData?.customerDetails?.details?.registeredNo}
              caption={strings.registereredNo}
              placeHolder={strings.registereredNo}
              onChangeText={(text) =>
                (customerDetails.details.registeredNo = text)
              }
            />
          )}
          {(accountTypeCode === "BUS" || accountTypeCode === "GOVN") && (
            <CustomInput
              value={formData?.customerDetails?.details?.registeredDate}
              caption={strings.registereredDate}
              placeHolder={strings.registereredDate}
              onChangeText={(text) =>
                (customerDetails.details.registeredDate = text)
              }
            />
          )}
        </View>
      </View>
    );
  };

  const handleCustomerDetails = (data) => {
    console.log("$$$-handleCustomerDetails-data", data);
    let { customerDetails } = formData;
    customerDetails = { ...customerDetails, ...data };
    console.log("$$$-handleCustomerDetails-customerDetails", customerDetails);

    setFormData({ ...formData, customerDetails });
  };

  // Step = 2
  const renderCustomerAddressFormUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Details"} />
        <View style={styles.backgroundView}>
          <CustomInput
            value={formData?.customerDetails?.address?.emailId}
            caption={strings.email}
            placeHolder={strings.email}
            onChangeText={(text) => (customerDetails.address.emailId = text)}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.contact_type}
            placeHolder={"Select " + strings.contact_type}
          />
          <CountryPicker
            show={countryPickModel}
            excludedCountries={excludedCountriesList()}
            pickerButtonOnPress={(item) => {
              customerDetails.address.mobilePrefix = item.dial_code;
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
              customerDetails.address.mobileNo = text;
              setNumberError("");
            }}
            value={formData?.customerDetails?.address?.mobileNo}
            placeHolder={strings.mobile_no}
            keyboardType="numeric"
            maxLength={numberMaxLength}
          />
        </View>
        <CustomTitleText title={"Billing address"} />
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
            margin: 10,
          }}
        >
          <CustomInput
            value={formData?.customerDetails?.address?.address1}
            caption={"Flat/House/Unit No/ Block"}
            placeHolder={"Flat/House/Unit No/ Block"}
            onChangeText={(text) => (customerDetails.address.address1 = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.address?.address2}
            caption={"Building Name/Others"}
            placeHolder={"Building Name/Others"}
            onChangeText={(text) => (customerDetails.address.address2 = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.address?.address3}
            caption={"Street/Area"}
            placeHolder={"Street/Area"}
            onChangeText={(text) => (customerDetails.address.address3 = text)}
          />
          <CustomInput
            value={formData?.customerDetails?.address?.city}
            caption={"City/Town"}
            placeHolder={"City/Town"}
            onChangeText={(text) => (customerDetails.address.city = text)}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (customerDetails.address.district = text)}
            value={formData?.customerDetails?.address?.district}
            caption={"District/Province"}
            placeHolder={"Select " + "District/Province"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (customerDetails.address.state = text)}
            value={formData?.customerDetails?.address?.state}
            caption={"State/Region"}
            placeHolder={"Select " + "State/Region"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (customerDetails.address.postcode = text)}
            value={formData?.customerDetails?.address?.postcode}
            caption={"Post/Zip Code"}
            placeHolder={"Select " + "Post/Zip Code"}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => (customerDetails.address.country = text)}
            value={formData?.customerDetails?.address?.country}
            caption={strings.country}
            placeHolder={"Select " + strings.country}
          />
        </View>
      </View>
    );
  };

  const serviceDetails = { details: [], address: {} };
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
            status={isSameAddressChecked ? "checked" : "unchecked"}
            onPress={() => {
              setIsSameAddressChecked(!isSameAddressChecked);
            }}
          />
          <CustomTitleText
            title={"Service address same as customer address"}
            textStyle={{ marginTop: 0 }}
          />
        </View>
        <CustomTitleText title={"Service Address"} />
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
            margin: 10,
          }}
        >
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

  const accountDetails = { details: {}, address: {} };
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
            status={isSameAddressChecked ? "checked" : "unchecked"}
            onPress={() => {
              setIsSameAddressChecked(!isSameAddressChecked);
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
            value={""}
            caption={strings.firstname}
            placeHolder={strings.firstname}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.lastname}
            placeHolder={strings.lastname}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.dob}
            placeHolder={strings.dob}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.gender}
            placeHolder={strings.gender}
            onChangeText={(text) => text}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.id_type}
            placeHolder={"Select " + strings.id_type}
          />
          <CustomInput
            value={""}
            caption={strings.id_number}
            placeHolder={strings.id_number}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.place_of_issue}
            placeHolder={strings.place_of_issue}
            onChangeText={(text) => text}
          />
          {(accountTypeCode === "BUS" || accountTypeCode === "GOVN") && (
            <CustomInput
              value={""}
              caption={strings.registereredNo}
              placeHolder={strings.registereredNo}
              onChangeText={(text) => text}
            />
          )}
          {(accountTypeCode === "BUS" || accountTypeCode === "GOVN") && (
            <CustomInput
              value={""}
              caption={strings.registereredDate}
              placeHolder={strings.registereredDate}
              onChangeText={(text) => text}
            />
          )}

          <CountryPicker
            show={countryPickModel}
            excludedCountries={excludedCountriesList()}
            pickerButtonOnPress={(item) => {
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
            onChangeText={(text) => handleNumberChange(text)}
            value={""}
            placeHolder={strings.mobile_no}
            keyboardType="numeric"
            maxLength={numberMaxLength}
          />
          <CustomInput
            value={""}
            caption={strings.email}
            placeHolder={strings.email}
            onChangeText={(text) => text}
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
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.account_category}
            placeHolder={"Select " + strings.account_category}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.account_level}
            placeHolder={"Select " + strings.account_level}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.bill_lang}
            placeHolder={"Select " + strings.bill_lang}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.account_type}
            placeHolder={"Select " + strings.account_type}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.notification_pref}
            placeHolder={"Select " + strings.notification_pref}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
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
            status={isSameAddressChecked ? "checked" : "unchecked"}
            onPress={() => {
              setIsSameAddressChecked(!isSameAddressChecked);
            }}
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
        <CustomerAgreement />
      </View>
    );
  };

  // Step = 10
  const renderPreviewUI = () => {
    return (
      <View>
        <CustomTitleText title={"Show Preview"} />
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
      case 1:
        handleCustomerDetails({ details: customerDetails.details });
        setCurrentStep(currentStep + 1);
        break;
      case 2:
        handleCustomerDetails({ address: customerDetails.address });
        setCurrentStep(currentStep + 1);
        break;
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

  const handleNumberChange = (textStr) => {
    setNumberError("");
  };

  const handleAccountTypeSelection = (item) => {
    const details = { ...accountDetails?.details };
    details.accountType = item;
    setFormData({
      ...formData,
      accountDetails: { ...accountDetails, details },
    });
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

  return (
    <View style={styles.container}>
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
              data={createCustomerReducerData.customerTypes}
              numColumns={4}
              renderItem={({ item, index }) => (
                <CustomerType
                  name={item.name}
                  icon={item.icon}
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
});

export default CreateCustomer;
