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
import React, { useState } from "react";
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

const CreateCustomer = () => {
  const { colors } = useTheme();

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

  const renderStepThreeUIBillDetails = () => {
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

  const renderStepsView = () => {
    return (
      <View style={styles.stepsView}>
        <View style={styles.stepsSubView}>
          <View style={styles.stepsCountView}>
            <Text
              style={
                currentStep > 1
                  ? styles.stepsCountTxtCurrent
                  : styles.stepsCountTxt
              }
            >
              1
            </Text>
          </View>
          {currentStep <= 1 && (
            <Image
              style={{ flex: 1 }}
              source={require("../../Assets/icons/line_normal.png")}
            />
          )}
          {currentStep > 1 && (
            <Image
              style={{ flex: 1 }}
              source={require("../../Assets/icons/line_selected.png")}
            />
          )}
          <View style={styles.stepsCountView}>
            <Text
              style={
                currentStep > 2
                  ? styles.stepsCountTxtCurrent
                  : styles.stepsCountTxt
              }
            >
              2
            </Text>
          </View>

          {currentStep <= 2 && (
            <Image
              style={{ flex: 1 }}
              source={require("../../Assets/icons/line_normal.png")}
            />
          )}
          {currentStep > 2 && (
            <Image
              style={{ flex: 1 }}
              source={require("../../Assets/icons/line_selected.png")}
            />
          )}

          <View style={styles.stepsCountView}>
            <Text
              style={
                currentStep > 3
                  ? styles.stepsCountTxtCurrent
                  : styles.stepsCountTxt
              }
            >
              3
            </Text>
          </View>

          {currentStep < 3.5 && (
            <Image
              style={{ flex: 1 }}
              source={require("../../Assets/icons/line_normal.png")}
            />
          )}
          {currentStep === 3.5 && (
            <Image
              style={{ flex: 1 }}
              source={require("../../Assets/icons/line_half_selected.png")}
            />
          )}
          {currentStep >= 4 && (
            <Image
              style={{ flex: 1 }}
              source={require("../../Assets/icons/line_selected.png")}
            />
          )}

          <View style={styles.stepsCountView}>
            <Text
              style={
                currentStep === 4
                  ? styles.stepsCountTxtCurrent
                  : styles.stepsCountTxt
              }
            >
              4
            </Text>
          </View>
        </View>
        <View style={styles.stepsSubView}>
          <Text
            style={currentStep === 1 ? styles.stepsTxtCurrent : styles.stepsTxt}
          >
            Customer
          </Text>
          <Text
            style={currentStep === 2 ? styles.stepsTxtCurrent : styles.stepsTxt}
          >
            Account
          </Text>
          <Text
            style={
              currentStep === 3 || currentStep === 3.5
                ? styles.stepsTxtCurrent
                : styles.stepsTxt
            }
          >
            Services
          </Text>
          <Text
            style={currentStep === 4 ? styles.stepsTxtCurrent : styles.stepsTxt}
          >
            Agreement
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderStepsView()}
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
    paddingVertical: 10,
  },
  stepsSubView: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
  },
  stepsTxt: {
    flex: 1,
    textAlign: "center",
    fontWeight: 400,
    fontSize: 14,
    color: "#8FA1C4",
  },
  stepsTxtCurrent: {
    flex: 1,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 14,
    color: "#fff",
  },
  stepsCountView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepsCountTxt: {
    padding: 4,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#8FA1C4",
    fontWeight: 400,
    fontSize: 14,
    color: "#fff",
  },
  stepsCountTxtCurrent: {
    padding: 4,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    fontWeight: 700,
    fontSize: 14,
    color: "#4C5A81",
  },

  bottomButtonView: {
    flexDirection: "row",
    bottom: 0,
    backgroundColor: "white",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
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
});

export default CreateCustomer;
