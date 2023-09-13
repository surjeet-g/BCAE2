import get from "lodash.get";
import React, { createRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Divider, Text } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import SignatureCapture from "react-native-signature-capture";
import { Rows, Table, TableWrapper } from 'react-native-table-component';
import { ClearSpace } from '../../../../Components/ClearSpace';
import { CustomButton } from "../../../../Components/CustomButton";
import { CustomInput } from "../../../../Components/CustomInput";
import { color } from "../../../../Utilities/Constants/Constant";
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

    const [signature, setSignature] = useState("");

    // const [isSelected, setSelection] = useState(false);
    // const [selIndex, setSelIndex] = useState();

    // const [inputText, setInputText] = useState({});
    // const [inputTextId, setInputTextId] = new Map([[key=0, value=""]]);

    var inputText = new Map([[key = "", value = ""]]);

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


        console.log('element..', element)
        console.log('attribute..', attribute)
        console.log('flowId..', flowId)
        console.log('conversationID..', conversationID)
        console.log('requestId..', requestId)
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


            case "COLLECT_INPUT":

                const flowId = get(resolutionDetails, 'flwId', '')
                const conversationID = get(resolutionDetails, 'conversationUid', '')

                // _signaturePadError = (error) => {
                //     console.error(error);
                // };

                // _signaturePadChange = ({ base64DataUrl }) => {
                //     console.log("Got new signature: " + base64DataUrl);
                // };

                const sign = createRef();

                const saveSign = () => {
                    sign.current.saveImage();
                };

                const resetSign = () => {
                    sign.current.resetImage();
                };

                const _onSaveEvent = (result) => {
                    //result.encoded - for the base64 encoded png
                    //result.pathName - for the file path name
                    alert('Signature Captured Successfully');
                    console.log("sign captured...", result.encoded);
                    setSignature(result.encoded)
                };

                const _onDragEvent = () => {
                    // This callback will be called when the user enters signature
                    console.log('dragged');
                };


                return (
                    <>
                        <View style={styles.column_space_arround_evenly}>

                            {resolutionDetails.metaAttributes?.map(item => {

                                return (
                                    <View>
                                        {
                                            item.fieldSet?.map(fieldSetItem => {

                                                if (fieldSetItem.fieldType == "textarea") {
                                                    return (
                                                        <View>
                                                            <CustomInput
                                                                style={{
                                                                    backgroundColor: "transparent"
                                                                }}
                                                                onChangeText={(text) => { inputText.set(fieldSetItem.id, text) }}
                                                                value={inputText.get(fieldSetItem.id)}
                                                                multiline={true}
                                                                inputType={fieldSetItem.inputType}
                                                                caption={fieldSetItem.title}
                                                                placeHolder={fieldSetItem.placeHolder}
                                                            />
                                                            <ClearSpace size={2}></ClearSpace>
                                                        </View>

                                                    )
                                                }


                                                if (fieldSetItem.fieldType == "sigature") {
                                                    return (
                                                        <SafeAreaView style={styles.signContainer}>
                                                            <View style={styles.signContainer}>
                                                                <Text style={styles.titleStyle}>
                                                                    Signature:
                                                                </Text>
                                                                <SignatureCapture
                                                                    style={styles.signature}
                                                                    ref={sign}
                                                                    onSaveEvent={_onSaveEvent}
                                                                    onDragEvent={_onDragEvent}
                                                                    showNativeButtons={false}
                                                                    showTitleLabel={false}
                                                                    viewMode={'portrait'}
                                                                />

                                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                                    <TouchableHighlight
                                                                        style={styles.buttonStyle}
                                                                        onPress={() => {
                                                                            saveSign();
                                                                        }}>
                                                                        <Text>Save</Text>
                                                                    </TouchableHighlight>

                                                                    <TouchableHighlight
                                                                        style={styles.buttonStyle}
                                                                        onPress={() => {
                                                                            resetSign();
                                                                        }}>
                                                                        <Text>Reset</Text>
                                                                    </TouchableHighlight>
                                                                </View>

                                                            </View>
                                                        </SafeAreaView>
                                                    )
                                                }


                                                if (fieldSetItem.fieldType == "button") {
                                                    return (
                                                        <View style={{ flex: 1 }}>
                                                            <ClearSpace size={2}></ClearSpace>
                                                            <CustomButton
                                                                label={fieldSetItem.placeHolder}
                                                                onPress={async () => {
                                                                    let params = {
                                                                        flowId: flowId,
                                                                        conversationUid: conversationID,
                                                                        "data": {
                                                                            "source": "knowledgeBase",
                                                                            "inputType": "FORMDATA",
                                                                            "inputValue": {
                                                                                "d01": inputText.get("01"),
                                                                                "d02": inputText.get("02"),
                                                                                "d11": inputText.get("11"),
                                                                                "d12": inputText.get("12"),
                                                                                "d21": inputText.get("21"),
                                                                                "d22": inputText.get("22"),
                                                                                "d31": inputText.get("31"),
                                                                                "d32": inputText.get("32"),
                                                                                "d41": inputText.get("41"),
                                                                                "d42": inputText.get("42"),
                                                                                "d51": inputText.get("51"),
                                                                                "d52": inputText.get("52"),
                                                                                "comments": inputText.get("comments"),
                                                                                "signature": signature
                                                                            },
                                                                            resolutionData: resolutionDetails
                                                                        }
                                                                    };

                                                                    console.log("submit params...", params);

                                                                    popupAction(params)

                                                                }}
                                                            />
                                                            <ClearSpace size={2}></ClearSpace>
                                                        </View>
                                                    )
                                                }


                                                return (

                                                    <View>

                                                        {
                                                            fieldSetItem.columns?.map(item => {

                                                                return (
                                                                    <View>

                                                                        {
                                                                            item.column_headers?.map((columnItem, idx1) => {

                                                                                const id = columnItem.id;
                                                                                const sortOrder = columnItem.sortOrder;
                                                                                const required = columnItem.required;
                                                                                const titleVal = columnItem.title;
                                                                                const fieldType = columnItem.fieldType;
                                                                                const inputTypeVal = columnItem.inputType;
                                                                                const placeHolderVal = columnItem.placeHolder;

                                                                                return (
                                                                                    <View>

                                                                                        {
                                                                                            fieldSetItem.headers?.map((rowItem, idx2) => {

                                                                                                if (idx2 != 0) {

                                                                                                    if (fieldType == "textbox") {

                                                                                                        // console.log("title..", title + "( " + rowItem.title + " )" + idx1 + "," + idx2);

                                                                                                        return (

                                                                                                            <View style={{ marginTop: 10, marginBottom: 10 }}>

                                                                                                                {/* <Text style={styles.label}>{idx1 + "," + idx2}</Text> */}

                                                                                                                <CustomInput
                                                                                                                    style={{
                                                                                                                        backgroundColor: "transparent"
                                                                                                                    }}
                                                                                                                    onChangeText={(text) => {
                                                                                                                        inputText.set(idx1 + "" + idx2, text)
                                                                                                                        // setInputText([idx1 + "" + idx2]: text)
                                                                                                                        // setInputTextId(idx1 + "" + idx2)
                                                                                                                        // setInputTextId(idx1 + "" + idx2)
                                                                                                                    }}
                                                                                                                    value={inputText.get(idx1 + "" + idx2)}



                                                                                                                    inputType={inputTypeVal}
                                                                                                                    caption={titleVal + " ( " + rowItem.title + " )"}
                                                                                                                    placeHolder={placeHolderVal}
                                                                                                                />


                                                                                                            </View>

                                                                                                        )

                                                                                                    }
                                                                                                }

                                                                                            })
                                                                                        }

                                                                                    </View>)

                                                                            })
                                                                        }

                                                                    </View>)
                                                            })
                                                        }












                                                    </View>)
                                            })
                                        }
                                    </View>
                                )
                            })}

                        </View>
                        <ClearSpace size={2} />

                        {/* <View style={{ flex: 1 }}>
                            <CustomButton label={"Submit"} />
                        </View>
                        <ClearSpace size={2} /> */}

                    </>
                )

            // case "COLLECT_INPUT":
            //     return (
            //         <>
            //             <View style={{ flex: 1 }}>
            //                 <SignaturePad
            //                     onError={this._signaturePadError}
            //                     onChange={this._signaturePadChange}
            //                     style={{ flex: 1, backgroundColor: 'white' }} />
            //             </View>
            //             <ClearSpace size={2} />
            //         </>
            //     )

            default:
                return (
                    <>
                        {/* <View style={{ flex: 1 }}>
                            <SignaturePad
                                onError={this._signaturePadError}
                                onChange={this._signaturePadChange}
                                style={{ flex: 1, backgroundColor: 'white' }} />
                        </View>
                        <ClearSpace size={2} /> */}
                    </>
                )

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
                                console.log('HandleResolution:COLLECTINPUT', message)
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
    signContainer: {
        flex: 1, padding: 8, backgroundColor: color.BCAE_OFF_WHITE,
    },
    titleStyle: {
        margin: 10,
    },
    signature: {
        width: 285,
        height: 140,
        flex: 1,
        borderColor: '#00000',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 50,
        backgroundColor: '#eeeeee',
        margin: 10,
    },
    newContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },

    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },

    checkbox: {
        alignSelf: 'center',
    },

    label: {
        margin: 8,
    },

    column_space_arround_evenly: {
        marginTop: 4,
        flexDirection: "column",
    },



    bottomContainer: {
        paddingHorizontal: 10,
        flexDirection: "row"
    },
    container: {
        flex: 1, padding: 16, paddingTop: 10, backgroundColor: "white",

    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 40 },
    text: { textAlign: 'center' }
})