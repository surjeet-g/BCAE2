import get from "lodash.get";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Divider, Text } from 'react-native-paper';
import { Rows, Table, TableWrapper } from 'react-native-table-component';
import { ClearSpace } from '../../../../Components/ClearSpace';
import { CustomInput } from "../../../../Components/CustomInput";
import { strings } from '../../../../Utilities/Language/index';
import { commonStyle } from '../../../../Utilities/Style/commonStyle';
import { SmallButton } from './SmallButton';


export const HandleResolution = ({
    suggestionList = [],
    resolutionDetails = [],
    popupAction = () => { },
    customerUuid = "",
    navigation
}) => {
    const [remarks, setRemarks] = useState("")
    console.log('HandleResolution : customerUuid', customerUuid)
    const RenderSend = ({ title = "", type = "", description = "" }) => {
        console.log('enter rendersend', type, description)
        if (type == "string") {
            return (
                <View style={{}}>
                    <Text>{title}</Text>
                    <ClearSpace size={2} />
                </View>
            )
            //todo navigate to product listing page
        } else if (type == "object" && description == "PRODUCT PURCHASE") {
            console.log('RenderSend:',)
            return (<Text>TOdo</Text>)
        }
        else if (type == "object" && description == "ORDER_DETAILS") {
            console.log('RenderSend:ORDER_DETAILS title', title)
            const orderDetail = [
                ['Order No', get(title, 'orderNo', '')],
                ['Bill Amount', get(title, 'billAmount', '')],
                ['Customer Name', `${get(title, 'customerDetails.firstName', '')} ${get(title, 'customerDetails.lastName', '')}`],
                ['Customer Contact No', get(title, 'customerDetails.customerContact[0].contactNo', '')]
            ]
            const productDetails = get(title, 'childOrder[0].orderProductDtls', [])



            return (
                <View style={styles.container}>

                    <ClearSpace size={2} />
                    <Text variant="bodyMedium">Order Details</Text>
                    <ClearSpace size={2} />
                    <Table borderStyle={{ borderWidth: 1 }}>
                        {/* <Row data={['', 'Head1', 'Head2', 'Head3']} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text} /> */}

                        <TableWrapper style={styles.wrapper}>
                            {/* <Col data={['Order No', 'Bill Amount', 'Customer Name', 'Customer Contact No']}
                                style={styles.title} heightArr={[40, 40]}
                                textStyle={styles.text} /> */}
                            <Rows data={orderDetail}
                                flexArr={[2, 2, 1]} style={styles.row} textStyle={styles.text} />

                        </TableWrapper>
                    </Table>
                    <ClearSpace size={2} />
                    {productDetails.length != 0 && productDetails.map(productDetail => {

                        const productFormated = [
                            ['Product Name', get(productDetail, 'productDetails.productName', '')],
                            ['Product Amount', get(productDetail, 'billAmount', '')],
                            ['Product No', get(productDetail, 'productDetails.productNo', '')],
                            ['Product Type', get(productDetail, 'productDetails.productType', '')],
                            ['Product Charge Type', get(productDetail, 'productDetails.chargeTypeDesc.description', '')],
                            ['Service Type', get(productDetail, get(productDetail, 'productDetails.serviceTypeDesc.description', ''), '')],
                            ['Product Category Type', get(productDetail, 'productDetails.productCategoryDesc.description', '')],
                        ]
                        return (
                            <>
                                <Table borderStyle={{ borderWidth: 1 }}>
                                    {/* <Row data={['', 'Head1', 'Head2', 'Head3']} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text} /> */}

                                    <TableWrapper style={styles.wrapper}>
                                        {/* <Col data={['Order No', 'Bill Amount', 'Customer Name', 'Customer Contact No']}
                                style={styles.title} heightArr={[40, 40]}
                                textStyle={styles.text} /> */}
                                        <Rows data={productFormated}
                                            flexArr={[2, 2, 1]} style={styles.row} textStyle={styles.text} />

                                    </TableWrapper>
                                </Table>
                                <ClearSpace />
                            </>
                        )
                    })


                    }
                </View>
            )
        }
        else {
            return null
        }
    }
    const RenderCollectInput = ({ message }) => {
        const element = get(message, 'element', '');
        const attribute = get(message, 'attributes', []);
        const flowId = get(resolutionDetails, 'flwId', '')
        const conversationID = get(resolutionDetails, 'conversationUid', '')
        const requestId = get(resolutionDetails, 'requestId', '')
        console.log('>>resolutionDetails', resolutionDetails)

        switch (element) {
            case "YES_NO_BUTTON":
                if (attribute.length == 0) {
                    console.log('yes no button attribute data is empty',)
                    return null
                }

                return (
                    <>
                        <View style={commonStyle.row_space_arround_evenly}>
                            {attribute.map((item, idx) => {
                                const buttonName = get(item, 'value', '')
                                const popupTitle = get(item, 'popup', '')
                                const buttonType = get(item, 'name', '')
                                return (
                                    <SmallButton
                                        label={buttonName}
                                        color={buttonType == "NO" ? "red" : "#9C8FC4"}
                                        onPress={() => {
                                            Alert.alert(
                                                strings.attention,
                                                popupTitle,
                                                [
                                                    {
                                                        text: strings.cancel,
                                                    },
                                                    {
                                                        text: strings.ok,
                                                        onPress: () => {

                                                            const params = {
                                                                flowId: flowId,
                                                                conversationUid: conversationID,
                                                                data: {
                                                                    source: "knowledgeBase",
                                                                    inputType: "MESSAGE",
                                                                    inputValue: buttonType
                                                                },
                                                                requestId: requestId,
                                                                customerUuid: customerUuid

                                                            }

                                                            popupAction(params)



                                                        },
                                                    },
                                                ]
                                            );
                                        }} />
                                )
                            })}

                        </View>
                        <ClearSpace size={2} />
                    </>
                )
            case "COLLECT_REMARKS":
                return (
                    <>
                        <CustomInput
                            multiline={true}
                            onChangeText={(text) => setRemarks(text)}
                            value={remarks}
                            caption={strings.remarks}
                            placeHolder={strings.remarks}

                        />
                        <ClearSpace size={4} />
                        <SmallButton label={"Submit"} onPress={() => {
                            const params = {
                                flowId: flowId,
                                conversationUid: conversationID,
                                data: {
                                    source: "knowledgeBase",
                                    inputType: "MESSAGE",
                                    inputValue: remarks
                                },
                                requestId: requestId,
                                customerUuid: customerUuid

                            }

                            popupAction(params)
                        }} />
                    </>
                )
            default:
                return (<Text>sdfsdf</Text>)
                return null

        }

    }
    const flowId = get(resolutionDetails, 'flwId', '')
    const conversationID = get(resolutionDetails, 'conversationUid', '')
    const requestId = get(resolutionDetails, 'requestId', '')
    return (
        <View style={styles.bottomContainer}>
            <ClearSpace size={4} />

            <View
                style={{
                    padding: 8,
                    paddingLeft: 10,
                    flex: 1,
                    // flexDirection: "row",
                    // justifyContent: "center",
                    // alignItems: "center",

                    borderRadius: 10,

                }}
            >
                {suggestionList.length != 0 &&
                    suggestionList.map((item, idx) => {
                        const actionType = get(item, 'actionType', '');
                        const description = get(item, 'description', '');
                        const message = get(item, 'message', '');
                        const type = get(item, 'type', '');
                        if (type == "" || actionType == "") {
                            console.log('type or action type is empty',)
                            return null
                        }
                        if (actionType == "SENDMESSAGE" && type == "object" && description == "PRODUCT PURCHASE") {
                            alert("//todo navigate to product page with convertionID")
                            navigation.navigate('ProductListing', {
                                productList: message,
                                resolution: {
                                    flowId: flowId,
                                    conversationUid: conversationID,
                                    data: {
                                        source: "knowledgeBase",
                                    },
                                    requestId: requestId,
                                    customerUuid: customerUuid

                                }
                            })
                            //todo navigate to product list pagewith resolution data with product item resolutionDetails
                        }

                        switch (actionType) {
                            case "SENDMESSAGE":
                                console.log('HandleResolution:SENDMESSAGE',)
                                return <RenderSend title={message} type={type} description={description} />

                            case "COLLECTINPUT":
                                console.log('HandleResolution:COLLECTINPUT',)
                                return <RenderCollectInput message={message} />


                            case "WORKFLOWEND":
                                console.log('HandleResolution:WORKFLOWEND',)

                                return <Divider bold={true} />


                            default:
                                console.log('HandleResolution:WORKFLOWEND',)

                                break;
                        }

                    })}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        paddingHorizontal: 10,
        flexDirection: "row"
    },
    container: {
        flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff',

    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 40 },
    text: { textAlign: 'center' }
})