import React from "react";
import { View } from "react-native";
import { CustomButton } from "../../../../Components/CustomButton";

export const ProductListing = ({ navigation, route }) => {
    const resolution = {
        flowId: "flowId",
        conversationUid: "dfsdfdf",
        data: {
            source: "knowledgeBase",
        },
        requestId: "31",
        customerUuid: "1232131"
    }
    const productList = {
        "actionType": "SENDMESSAGE",
        "description": "PRODUCT PURCHASE",
        "type": "object",
        "message": [
            {
                "status": "AC",
                "isTaxable": null,
                "productId": "20",
                "productNo": "PROD-30",
                "chargeType": "CC_NRC",
                "expiryDate": null,
                "productName": "Text Package",
                "productType": "PT_PREPAID",
                "productUuid": "6ac-3837-43fb-9a1f-5220c5445b020",
                "serviceType": "ST_PREPAID",
                "productImage": "data:image/jpeg;base64,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",
                "productFamily": "PF_TELE",
                "activationDate": null,
                "warrantyPeriod": null,
                "productCategory": "PC_ADDON",
                "productLocation": null,
                "multipleSelection": null,
                "taxablePercentage": null,
                "productChargesList": [
                    {
                        "status": "AC",
                        "endDate": null,
                        "remarks": null,
                        "chargeId": 25,
                        "prorated": "N",
                        "frequency": null,
                        "productId": 20,
                        "startDate": "2023-03-08",
                        "productUuid": "6ac-3837-43fb-9a1f-5220c5445b020",
                        "chargeAmount": "25.0000",
                        "advanceCharge": null,
                        "chargeDetails": {
                            "glcode": "GL00025",
                            "status": "AC",
                            "endDate": null,
                            "chargeId": 25,
                            "currency": "CUR-USD",
                            "chargeCat": "CC_NRC",
                            "startDate": "2023-02-20",
                            "chargeName": "SMS charges",
                            "serviceType": "ST_PREPAID"
                        },
                        "chargeUpfront": null,
                        "changesApplied": "N ",
                        "billingEffective": null,
                        "productChargeMapId": 18
                    }
                ],
                "productSubCategory": "PSC_RES",
                "productTypeDescription": {
                    "code": "PT_PREPAID",
                    "description": "Prepaid"
                },
                "serviceTypeDescription": {
                    "code": "ST_PREPAID",
                    "description": "Prepaid"
                }
            },
            {
                "status": "AC",
                "isTaxable": null,
                "productId": "14",
                "productNo": "PROD-17",
                "chargeType": "CC_NRC",
                "expiryDate": null,
                "productName": "Top-Up $10",
                "productType": "PT_PREPAID",
                "productUuid": "6ac-3837-43fb-9a1f-5220c5445b08",
                "serviceType": "ST_PREPAID",
                "productImage": "data:image/jpeg;base64,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",
                "productFamily": "PF_TELE",
                "activationDate": null,
                "warrantyPeriod": null,
                "productCategory": "PC_ADDON",
                "productLocation": null,
                "multipleSelection": null,
                "taxablePercentage": null,
                "productChargesList": [
                    {
                        "status": "AC",
                        "endDate": null,
                        "remarks": null,
                        "chargeId": 21,
                        "prorated": "N",
                        "frequency": null,
                        "productId": 14,
                        "startDate": "2023-03-08",
                        "productUuid": "6ac-3837-43fb-9a1f-5220c5445b08",
                        "chargeAmount": "75.0000",
                        "advanceCharge": null,
                        "chargeDetails": {
                            "glcode": "GL00021",
                            "status": "AC",
                            "endDate": null,
                            "chargeId": 21,
                            "currency": "CUR-USD",
                            "chargeCat": "CC_NRC",
                            "startDate": "2023-02-20",
                            "chargeName": "Topup Charges",
                            "serviceType": "ST_PREPAID"
                        },
                        "chargeUpfront": null,
                        "changesApplied": "N ",
                        "billingEffective": null,
                        "productChargeMapId": 19
                    }
                ],
                "productSubCategory": "PSC_RES",
                "productTypeDescription": {
                    "code": "PT_PREPAID",
                    "description": "Prepaid"
                },
                "serviceTypeDescription": {
                    "code": "ST_PREPAID",
                    "description": "Prepaid"
                }
            },
            {
                "status": "AC",
                "isTaxable": null,
                "productId": "33",
                "productNo": "PROD-43",
                "chargeType": "CC_NRC",
                "expiryDate": null,
                "productName": "AC - Installation Accessory Kit",
                "productType": "PT_PREPAID",
                "productUuid": "6ac-3837-43fb-9a1f-5220c5445b025",
                "serviceType": "ST_INSTALLATION",
                "productImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq902sR1A5YlyodSEm5F-u-RwIpxUYDDghBDwulIH1zg&usqp=CAU&ec=48665698",
                "productFamily": "PF_UTILITY",
                "activationDate": null,
                "warrantyPeriod": null,
                "productCategory": "PC_ADDON",
                "productLocation": null,
                "multipleSelection": null,
                "taxablePercentage": null,
                "productChargesList": [
                    {
                        "status": "AC",
                        "endDate": null,
                        "remarks": null,
                        "chargeId": 23,
                        "prorated": "N",
                        "frequency": null,
                        "productId": 33,
                        "startDate": "2023-03-08",
                        "productUuid": "6ac-3837-43fb-9a1f-5220c5445b025",
                        "chargeAmount": "10.0000",
                        "advanceCharge": null,
                        "chargeDetails": {
                            "glcode": "GL00023",
                            "status": "AC",
                            "endDate": null,
                            "chargeId": 23,
                            "currency": "CUR-USD",
                            "chargeCat": "CC_NRC",
                            "startDate": "2023-02-20",
                            "chargeName": "Accessory kits",
                            "serviceType": "ST_PREPAID"
                        },
                        "chargeUpfront": null,
                        "changesApplied": "N ",
                        "billingEffective": null,
                        "productChargeMapId": 23
                    }
                ],
                "productSubCategory": "PSC_RES",
                "productTypeDescription": {
                    "code": "PT_PREPAID",
                    "description": "Prepaid"
                },
                "serviceTypeDescription": {
                    "code": "ST_INSTALLATION",
                    "description": "Installation"
                }
            }
        ]
    }
    return (
        <View>
            <CustomButton

                label="Close"
                onPress={() => {
                    alert("sdfsd")
                }}
            />
        </View>
    )
}   