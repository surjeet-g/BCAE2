import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Switch,
} from "react-native";
import React, { Component, useState } from "react";
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

const CreateCustomer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [needQuoteOnly, setNeedQuoteOnly] = useState(false);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [countryCode, setCountryCode] = useState("+673");
  const [numberMaxLength, setNumberMaxLength] = useState(7);
  const [countryPickModel, setCountryPickModel] = useState(false);

  const renderStepOneUI = () => {
    return (
      <View>
        <CustomTitleText title={"Upload your documents"} />
        <UploadDocument />
      </View>
    );
  };

  const renderStepTwoUI = () => {
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
            caption={strings.customer_name}
            placeHolder={strings.customer_name}
            onChangeText={(text) => text}
          />
          <CustomInput
            value={""}
            caption={strings.email}
            placeHolder={strings.email}
            onChangeText={(text) => text}
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
            caption={strings.contact_type}
            placeHolder={"Select " + strings.contact_type}
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

  const renderStepThreeUI = () => {
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
        <CustomTitleText title={"Select Service Type"} />
        <FlatList
          style={{ backgroundColor: "#fff", margin: 10, borderRadius: 10 }}
          numColumns={3}
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item, index }) => (
            <ServiceType name={`Service Type ${index + 1}`} />
          )}
          keyExtractor={(item, index) => index}
        />
        <CustomTitleText title={"Accessories"} />
        <FlatList
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item, index }) => (
            <Product
              item={{
                name: `Product ${index + 1}`,
                type: "NA",
                price: (index + 1) * 200,
                quantity: 0,
              }}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  const renderStepThreeUIBillDetails = () => {
    return (
      <View>
        <CustomTitleText title={"Selected Product"} />
        <FlatList
          //   style={{ backgroundColor: "#fff", margin: 10, borderRadius: 10 }}
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

  const renderStepFourUI = () => {
    return (
      <View>
        <CustomTitleText title={"Customer Agreement"} />
        <CustomerAgreement />
      </View>
    );
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      if (currentStep === 4 || currentStep === 3.5)
        setCurrentStep(currentStep - 0.5);
      else setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (currentStep < 4) {
      if (currentStep === 3 || currentStep === 3.5)
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

  return (
    <View style={styles.container}>
      <View style={styles.stepsView}></View>
      <ScrollView nestedScrollEnabled={true}>
        {currentStep == 1 && renderStepOneUI()}
        {currentStep == 2 && renderStepTwoUI()}
        {currentStep == 3 && renderStepThreeUI()}
        {currentStep == 3.5 && renderStepThreeUIBillDetails()}
        {currentStep == 4 && renderStepFourUI()}
      </ScrollView>
      {/* Bottom Button View */}
      <View style={styles.bottomButtonView}>
        <View style={{ flex: 1 }}>
          <CustomButton label={strings.previous} onPress={handlePrevious} />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            label={currentStep === 4 ? strings.submit : strings.save}
            onPress={currentStep === 4 ? handleSubmit : handleSave}
          />
        </View>
      </View>
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
    height: 100,
  },
  bottomButtonView: {
    flexDirection: "row",
    bottom: 0,
    backgroundColor: "white",
  },
});

export default CreateCustomer;
