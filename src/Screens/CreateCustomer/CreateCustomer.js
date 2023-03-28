import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
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

const CreateCustomer = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
        <CustomTitleText title={"Account Creation"} />
        <CustomTitleText title={"Customer Details"} />
        <CustomTitleText title={"Billing address"} />
      </View>
    );
  };

  const renderStepThreeUI = () => {
    return (
      <View>
        <CustomTitleText title={"Select Category"} />
        <FlatList
          style={{ backgroundColor: "#fff", margin: 10, borderRadius: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ item, index }) => (
            <ServiceCategory name={`Category ${index + 1}`} />
          )}
          keyExtractor={(item, index) => index}
        />
        <CustomTitleText title={"Select Service Type"} />
        <FlatList
          style={{ backgroundColor: "#fff", margin: 10, borderRadius: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
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
