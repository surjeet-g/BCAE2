import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import React, { useState, useLayoutEffect } from "react";
import { CustomButton } from "./../../Components/CustomButton";
import { strings } from "./../../Utilities/Language/index";
import UploadDocument from "./UploadDocument";
import CustomTitleText from "./../../Components/CustomTitleText";
import CustomerAgreement from "./CustomerAgreement";
import Product from "./Product";
import ServiceCategory from "./ServiceCategory";
import ServiceType from "./ServiceType";
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
import { useTheme } from "react-native-paper";

const CreateCustomer = (props) => {
  const { colors } = useTheme();
  const { navigation } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [needQuoteOnly, setNeedQuoteOnly] = useState(false);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [countryCode, setCountryCode] = useState("+673");
  const [numberMaxLength, setNumberMaxLength] = useState(7);
  const [countryPickModel, setCountryPickModel] = useState(false);

  useLayoutEffect(() => {
    let title = "";
    switch (currentStep) {
      case 0:
        title = "Create Customer";
        break;
      case 1:
        title = "Account";
        break;
      case 2:
        title = "Services";
        break;
      case 2.5:
        title = "Services";
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
  }, [currentStep]);

  const renderUploadDocsUI = () => {
    return (
      <View>
        <CustomTitleText title={"Upload your documents"} />
        <UploadDocument />
        <CustomTitleText title={"Customer Details"} />
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
            caption={strings.customer_name}
            placeHolder={strings.customer_name}
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
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.country}
            placeHolder={"Select " + strings.country}
          />
          <CustomDropDownFullWidth
            selectedValue={""}
            setValue={""}
            data={[]}
            onChangeText={(text) => console.log(text)}
            value={""}
            caption={strings.country_code}
            placeHolder={"Select " + strings.country_code}
          />
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
            value={number}
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

  const renderCustomerFormUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Details"} />
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
            caption={strings.title}
            placeHolder={strings.title}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.surname}
            placeHolder={strings.surname}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.forename}
            placeHolder={strings.forename}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.email}
            placeHolder={strings.email}
            onChangeText={(text) => text}
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
            value={number}
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

  const renderServicesUI = () => {
    return (
      <View>
        <CustomTitleText title={"Select Category"} />
        <FlatList
          style={{ backgroundColor: "#fff", margin: 10, borderRadius: 10 }}
          numColumns={4}
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item, index }) => (
            <ServiceCategory name={`Category ${index + 1}`} />
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
        <CustomTitleText title={"Accessories"} />
        <FlatList
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item, index }) => (
            <Product
              item={{
                name: `Product ${index + 1}`,
                type: "NA",
                price: (index + 1) * 200,
                quantity: Math.floor(Math.random() * index),
              }}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  const renderSelectedServicesUI = () => {
    return (
      <View>
        <CustomTitleText title={"Selected Product"} />
        <SwipeListView
          showsVerticalScrollIndicator={false}
          disableRightSwipe={true}
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item, index }) => (
            <SelectedProduct
              item={{
                name: `Product ${index + 1}`,
                type: "NA",
                price: 100,
                quantity: 2,
              }}
            />
          )}
          keyExtractor={(item, index) => index}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-100}
          stopRightSwipe={-100}
          onRowDidOpen={onRowDidOpen}
        />
        <CustomTitleText title={"Bill Details"} />
        <BillDetails
          details={{
            gTotal: 1250.0,
            total: 1250.0,
            gst: 50.0,
            discount: 100.0,
          }}
        />

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
            onValueChange={() => setNeedQuoteOnly(!needQuoteOnly)}
            value={needQuoteOnly}
          />
        </View>
      </View>
    );
  };

  const renderAgreementUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Agreement"} />
        <CustomerAgreement />
      </View>
    );
  };

  const renderPreviewUI = () => {
    return (
      <View>
        <Text>Show Preview here</Text>
      </View>
    );
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      if (currentStep === 3 || currentStep === 2.5)
        setCurrentStep(currentStep - 0.5);
      else setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (currentStep < 4) {
      if (currentStep === 2 || currentStep === 2.5)
        setCurrentStep(currentStep + 0.5);
      else setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    alert("Submit with create customer API");
  };

  const handleNumberChange = (textStr) => {
    setNumber(textStr);
    setNumberError("");
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Pressable
        style={[styles.backRightBtn]}
        onPress={() => {
          alert("Index: ", data.index);
          console.log("$$$-data", data);
          console.log("$$$-data", JSON.stringify(data));
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
          currentPosition={currentStep}
          stepCount={5}
          labels={["Customer", "Account", "Services", "Agreement", "Preview"]}
        />
      </View>
    );
  };

  const renderBottomButtonsUI = () => {
    if (currentStep === 0) {
      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.skip_proceed} onPress={handleSave} />
          </View>
        </View>
      );
    }
    if (currentStep === 3) {
      return (
        <View style={styles.bottomButtonView}>
          <View style={{ flex: 1 }}>
            <CustomButton label={strings.previous} onPress={handlePrevious} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              label={strings.proceed_to_preview}
              onPress={handleSave}
            />
          </View>
        </View>
      );
    }
    if (currentStep === 4) {
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
    // For currentStep = 1 & 2 & 2.5
    return (
      <View style={styles.bottomButtonView}>
        <View style={{ flex: 1 }}>
          <CustomButton label={strings.previous} onPress={handlePrevious} />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton label={strings.save_continue} onPress={handleSave} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderStepsIndicatorView()}
      <ScrollView nestedScrollEnabled={true}>
        {currentStep == 0 && renderUploadDocsUI()}
        {currentStep == 1 && renderCustomerFormUI()}
        {currentStep == 2 && renderServicesUI()}
        {currentStep == 2.5 && renderSelectedServicesUI()}
        {currentStep == 3 && renderAgreementUI()}
        {currentStep == 4 && renderPreviewUI()}
      </ScrollView>
      {/* Bottom Button View */}
      {renderBottomButtonsUI()}
    </View>
  );
};

const styles = StyleSheet.create({
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
