import get from "lodash.get";
import moment from "moment";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { TextInput, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { CustomDropDownFullWidth } from "../../Components/CustomDropDownFullWidth";
import { CustomInput } from "../../Components/CustomInput";
import { FooterModel } from "../../Components/FooterModel";
import { endPoints } from "../../Utilities/API/ApiConstants";
import { strings } from "../../Utilities/Language";
import { getCustomerID } from "../../Utilities/UserManagement/userInfo";
import { APICall } from "./util";

// Usage
/* <SelectedProduct item={{ id: 1,name: "", type: "", price: 0, quantity: 0 }} />; */
export const RenderAppoinmentModel = ({
  appointment = [],
  enableLoader,
  setShowBottomModal,
  activeProduct = [],
  showBottomModal
}) => {
  const { colors } = useTheme();

  const [selectedAppoinment, setSelectedAppointment] = useState({ code: "", description: "" })
  const [slots, setSlote] = useState([])
  const [openYearPicker, setDatePickerYear] = useState(false);
  const [openRegDatePicker, setOpenRegDatePicker] = useState(false);
  const [year, setYear] = useState(new Date())
  activeProduct = {
    "productBenefit": null,
    "contractList": null,
    "productId": "257",
    "productNo": "PROD-266",
    "status": "AC",
    "productName": "Fibre 100mpbs_PP ",
    "productFamily": "PF_TELE",
    "productCategory": "PC_PLAN",
    "productSubCategory": "PSC_RES",
    "productType": "PT_POSTPAID",
    "productSubType": "PST_MOBILE",
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
    "isAppointRequired": "N",
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
    "productSubTypeDesc": {
      "code": "PST_MOBILE",
      "description": "Mobile"
    },
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
    "updatedByUser": null
  }

  return (
    <View style={{
      position: "absolute",
      bottom: 0,
      elevation: 10,
      zIndex: 999999999
    }}>
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Create Appoinment"}
        subtitle={``}
      >
        <KeyboardAvoidingView>
          <View style={{ paddingHorizontal: 10 }}>
            <DatePicker
              modal
              mode="date"
              validRange={{ endDate: new Date() }}
              open={openYearPicker}
              onCancel={() => setDatePickerYear(false)}
              date={year || new Date()}
              maximumDate={new Date()}
              onConfirm={(params) => {
                console.log("data", params);
                setYear(params);
                setDatePickerYear(false);
              }}
            />
            <CustomInput
              value={moment(year).format(
                "YYYY-MM-DD"
              )}
              caption={"Select Date"}
              onFocus={() => setDatePickerYear(true)}
              placeHolder={"Select Date"}
              right={
                <TextInput.Icon
                  onPress={() => setDatePickerYear(true)}
                  style={{ width: 23, height: 23 }}
                  theme={{ colors: { onSurfaceVariant: colors.gray } }}
                  icon={"calendar"}
                />
              }
            />
            <CustomDropDownFullWidth
              selectedValue={selectedAppoinment?.description}
              data={appointment}
              onChangeText={async (text) => {
                console.log("appinment", text)
                setSelectedAppointment(text)
                enableLoader(true)
                // if (["BUS_VISIT", "CUST_VISIT"].includes(text.code)) return;

                console.log("product", activeProduct)
                //get templete info 
                const { response, status } = await APICall(endPoints.APPOINTEMENT_TEMPLATE, "POST", {
                  "mapCategory": "ORDER",
                  "serviceCategory": get(activeProduct, 'productSubType', ''),
                  "serviceType": get(activeProduct, 'serviceType', ''),
                  "customerCategory": "REG",
                  "tranType": "OT_SU",
                  "tranCategory": "OC_N",
                  "tranPriority": "PRTYHGH"
                })

                // if(status)  {
                //   console.log("",)
                // }
                const templeteId = get(response, 'data.mappedTemplate.templateId', '')
                const mockParams = {
                  "mapCategory": "ORDER",
                  "serviceCategory": "PST_MOBILE",
                  "serviceType": "ST_FLEXI",
                  "customerCategory": "REG",
                  "tranType": "OT_SU",
                  "tranCategory": "OC_N",
                  "tranPriority": "PRTYHGH",
                  "appointmentType": "AUDIO_CONF",
                  "templateId": 124,
                  "address": {
                    "email": "kane222@gmail.com",
                    "contactNbr": "8218888888",
                    "address1": ", ",
                    "address2": ",",
                    "address3": "Shaniwar Peth",
                    "district": "Pune",
                    "state": "Maharashtra",
                    "city": "Pune City West",
                    "country": "India",
                    "postcode": "411002",
                    "countryCode": "91",
                    "latitude": "18.521428",
                    "longitude": "73.8544541",
                    "contactNo": "CONT00000361",
                    "addressNo": "ADD00000654"
                  }

                }

                const paramsAvailable = {
                  "mapCategory": "ORDER",
                  "serviceCategory": "PST_MOBILE",
                  "serviceType": "ST_FLEXI",
                  "customerCategory": "REG",
                  "tranType": "OT_SU",
                  "tranCategory": "OC_N",
                  "tranPriority": "PRTYHGH",
                  "appointmentType": text?.code,
                  "templateId": templeteId,
                  "appointmentDate": "2023-07-27", //to do year
                  //   "appointmentDate": moment(year).format("YYYY-MM-DD")
                  "location": "BCT_CHENNAI"
                }
                const availableAPI = await APICall(endPoints.INTERACTION_AVALABLE_APPOINMENT, "POST", mockParams, "Techincal Error..Please try again")
                enableLoader(false)

                let availableEvents = get(availableAPI, 'response.data.currentAppointments', false)


                if (!availableEvents || availableEvents.length == 0) return false

                setSlote(availableEvents.map((item, idx) => {
                  return {
                    id: idx,
                    title: item.slotName,
                    status: false,
                    appointDtlId: item.appointDtlId,
                    appointUserId: item.appointUserId
                  }
                }))

                return false

              }}
              value={selectedAppoinment?.code}
              caption={"Appoinment Type"}
              placeHolder={"Appoinment Type"}
            />
            <View style={{
              flexDirection: "row",
              flex: 1,
              marginTop: 10,
              flexWrap: "wrap",

            }}>
              <ClearSpace size={2} />
              {slots.map((slot) => {
                return (
                  <Pressable onPress={async () => {
                    const temp = slots
                    console.log("slote", slot)
                    const customerID = await getCustomerID()
                    const params = {
                      "appointDtlId": get(slot, 'appointDtlId', ''),
                      "appointAgentId": get(slot, 'appointUserId', ''),
                      "customerId": customerID.toString(),
                      "productNo": get(activeProduct, 'productNo', ''),
                      "operation": "CREATE"
                    }
                    console.log("params", params, activeProduct)
                    temp[slot.id].status = !slot.status
                    console.log("temp ", temp, "current slot ", slot.status)

                    setSlote(temp)
                    enableLoader(true)
                    const { status, response } = await APICall(endPoints.APPOINTMENT_CREATE, "POST", params, "Techincal Error..Please try again")
                    if (status) {
                      Toast.show({
                        type: "bctSuccess",
                        text1: "Appointment created successfully",
                      });
                    }
                    enableLoader(false)
                    setShowBottomModal(false)

                  }}
                    style={{
                      borderColor: "red",
                      borderWidth: slot.status ? 5 : 0,
                      borderStyle: "solid",
                      backgroundColor: !slot.status ? "green" : "red",
                      borderRadius: 5,
                      padding: 4,
                      elevation: 1,
                      marginRight: 5, marginBottom: 5
                    }}
                  >
                    <Text style={{ color: "white" }}>{slot.title}</Text>
                  </Pressable>

                )

              })
              }


            </View>
            {/* Bottom Button View */}
            {/* <View
              style={{
                flexDirection: "row",
                bottom: 0,
                marginTop: 20,
                backgroundColor: "white",
              }}
            >
              <View style={{ flex: 1 }}>
                <CustomButton
                  label={strings.submit}
                // onPress={() => setShowBottomModal(false)}
                />
              </View>

            </View> */}
          </View>
        </KeyboardAvoidingView>
      </FooterModel>
    </View>
  )
}
export const RenderSelectStore = ({
  stores = [],
  enableLoader,
  setShowBottomModal,
  activeProduct = [],
  showBottomModal,
  handleContinue
}) => {
  const { colors } = useTheme();

  const [selectedStore, setSelectedStore] = useState({ code: "", description: "" })

  return (
    <View style={{
      position: "absolute",
      bottom: 0,
      elevation: 10,
      zIndex: 999999999
    }}>
      <FooterModel
        open={showBottomModal}
        setOpen={setShowBottomModal}
        title={"Select Store"}
        subtitle={``}
      >
        <KeyboardAvoidingView>
          <View style={{ paddingHorizontal: 10 }}>

            <CustomDropDownFullWidth
              selectedValue={selectedStore?.description}
              data={stores}
              onChangeText={async (text) => {
                setSelectedStore(text)
              }}
              value={selectedStore?.code}
              caption={"Select store location"}
              placeHolder={"Select store location"}
            />
            <View style={{
              flexDirection: "row",
              flex: 1,
              marginTop: 10,
              flexWrap: "wrap",

            }}>
              <ClearSpace size={2} />



            </View>
            {/* Bottom Button View */}
            <View
              style={{
                flexDirection: "row",
                bottom: 0,
                marginTop: 20,
                backgroundColor: "white",
              }}
            >
              <View style={{ flex: 1 }}>
                <CustomButton
                  label={strings.submit}
                  onPress={() => {
                    setShowBottomModal(false)
                    handleContinue()
                  }}
                />
              </View>

            </View>
          </View>
        </KeyboardAvoidingView>
      </FooterModel>
    </View>
  )
}

const SelectedProduct = (props) => {

  const { item, setShowBottomModal, setAcitveProduct } = props;
  return (
    <>
      <View style={styles.container}>
        {/* Image View */}
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            source={require("../../Assets/icons/ic_word.png")}
          />
        </View>
        {/* Product */}
        <View style={styles.productView}>
          <Text numberOfLines={2} style={styles.productNameTxt}>
            {item.productName}
          </Text>
          <Text
            numberOfLines={1}
            style={styles.productTypeTxt}
          >{`${item.productTypeDescription?.description}`}</Text>
          <Text style={styles.priceTxt}>{`$ ${item.price}`}</Text>
        </View>
        {/* Quantity */}
        <View style={styles.quantityView}>
          {/* <Pressable
          style={styles.quantityIcon}
          onPress={() => alert("- Clicked")}
        >
          <Icon name={"minus"} size={20} color={"#4C5A81"} />
        </Pressable> */}
          <Pressable onPress={() => {
            setShowBottomModal(true);
            setAcitveProduct(item)
          }}>
            <Icon name="calendar-plus" size={30} color='#0e76bd' />


          </Pressable>

          <Text style={styles.quantityTxt}>Q:{item.quantity}</Text>
          {/* <Pressable
          style={styles.quantityIcon}
          onPress={() => alert("+ Clicked")}
        >
          <Icon name={"plus"} size={20} color={"#4C5A81"} />
        </Pressable> */}
        </View>


      </View>
    </>
  );
};

export default SelectedProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
  },
  imgView: { backgroundColor: "#F0F0F0", borderRadius: 10, padding: 10 },
  img: { height: 40, width: 40 },
  productView: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  productNameTxt: {
    color: "#202223",
    fontWeight: "600",
    fontSize: 16,
  },
  productTypeTxt: {
    color: "#686B6C",
    fontWeight: "400",
    fontSize: 12,
  },
  priceTxt: { color: "#EFA848", fontWeight: "700", fontSize: 18 },
  quantityView: { flexDirection: "row", alignItems: "center" },
  quantityIcon: { backgroundColor: "#E4EDFF", borderRadius: 5, padding: 3 },
  quantityTxt: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 14,
    marginHorizontal: 10,
  },
});
