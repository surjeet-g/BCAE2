import _ from 'lodash';
import get from "lodash.get";
import React, { createRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Checkbox, DataTable, Divider, RadioButton, Text } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import SignatureCapture from "react-native-signature-capture";
import { Rows, Table, TableWrapper } from 'react-native-table-component';
import { ClearSpace } from '../../../../Components/ClearSpace';
import { CustomButton } from "../../../../Components/CustomButton";
import { CustomDropDownFullWidth } from "../../../../Components/CustomDropDownFullWidth";
import { CustomInput } from "../../../../Components/CustomInput";
import { color } from "../../../../Utilities/Constants/Constant";
import { strings } from '../../../../Utilities/Language/index';
import { commonStyle } from '../../../../Utilities/Style/commonStyle';
import { SmallButton } from './SmallButton';


export const HandleResolution = ({
    formDataArray,
    setFormDataArray,
    handleNextForm,
    data,
    // handler,
    // obj,
    // inputText,
    handleInputChange = { handleInputChange },
    // setObj = { setObj },
    setObj,
    suggestionList = [],
    resolutionDetails = [],
    popupAction = () => { },
    customerUuid = "",
    navigation
}) => {

    const [gridInputText, setGridInputText] = useState(new Map());

    console.log("formDataArray..", formDataArray)
    // console.log("handler..", handler)

    const obj = data.obj
    // const setObj = handler.setObj




    // console.log("rendered freshly..", obj)


    const [valuesObj, setValuesObj] = useState({});
    const [temp, setTemp] = useState();
    const [prevInputVal, setPrevInputVal] = useState({});
    const [signature, setSignature] = useState("");

    // const [isSelected, setSelection] = useState(false);
    // const [selIndex, setSelIndex] = useState();

    // const [inputText, setInputText] = useState({});
    // const [inputTextId, setInputTextId] = new Map([[key=0, value=""]]);

    var isFormDisabled = false





    var checkedItem = new Map([["", false]]);
    // var radioCheckedItem = new Map([["", ""]]);
    var checkedItemArr = [];
    // var radioCheckedItemArr = [];







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
        const formMetaAttributes = get(message, 'formMetaAttributes', []);
        const attribute = get(message, 'attributes', []);
        const flowId = get(resolutionDetails, 'flwId', '')
        const conversationID = get(resolutionDetails, 'conversationUid', '')
        const requestId = get(resolutionDetails, 'requestId', '')

        // console.log('message..', message)
        // console.log('element..', element)
        // console.log('formMetaAttributes..', formMetaAttributes)
        // console.log('attribute..', attribute)
        // console.log('flowId..', flowId)
        // console.log('conversationID..', conversationID)
        // console.log('requestId..', requestId)
        // console.log('>>resolutionDetails', resolutionDetails)

        const [formDataState, setFormDataState] = useState({});
        const [values, setValues] = useState([]);

        const handleButtonSubmit = () => {
            console.log("values..", values)
            console.log("formDataState submit..", formDataState)

            if (!(formDataState == {})) {
                handleNextForm(formDataState);
                setFormDataState({});
            }
            // setValues([])
        };


        const initialFormState = {};
        formMetaAttributes?.map(item => {
            item.fieldSet.forEach(field => {
                if (field.fieldType === 'textField') {
                    initialFormState[field.id] = '';
                }
            });
        })



        const handleInputChange = (id, value) => {

            setFormDataState(prevData => ({
                ...prevData,
                ...formDataState,
                [id + "_formAttributes"]: formMetaAttributes,
                [id]: value
            }));

        };


        const customElementsRenderer = (count, rowsIndex, formDetails, rest) => {
            const elements = [];

            for (let i = 1; i <= count; i++) {
                elements.push(
                    <View key={i} style={{ flex: 1, padding: 5, width: 100 }}>
                        <CustomInput
                            // style={isFormDisabled ? styles.disabledInput : styles.input}
                            style={{ width: 100 }}
                            value={formDetails?.['d' + rowsIndex + i]}
                            required={rest?.required || false}
                            editable={!isFormDisabled}
                            onChangeText={(text) => handleInputChange('d' + rowsIndex + i, text)}
                        />
                    </View>
                );
            }

            return elements;
        };


        const customerRowsRenderer = (header, rowsIndex, formDetails, rest) => {
            let elements = [];



            elements = header.map((h, index) => {
                // let id = h?.id + rowsIndex + index
                return (
                    <DataTable.Cell>
                        {/* <View key={index} style={styles.cell}> */}
                        <CustomInput
                            value={gridInputText.get(h?.id)}
                            required={rest?.required || false}
                            editable={!isFormDisabled}
                            onChangeText={(text) => {
                                console.log("text entered..", text)
                                gridInputText.set(h?.id, text)
                                handleRowsOnChange(text, h.id, rowsIndex)
                            }}
                        />
                        {/* </View> */}
                    </DataTable.Cell>
                );
            });


            return elements;
        };

        const handleRowsOnChange = (value, id, index) => {
            values[index][id] = value

            // handleInputChange(id, values, "GRID")

        }

        const handleAddRows = (header) => {
            const headerAttributes = header?.map((r) => r?.id)
            const rowAttributes = headerAttributes?.reduce((obj, key) => {
                obj[key] = "";
                return obj;
            }, {});
            setValues([...values, { ...rowAttributes }])
        }



        const [isSelected, setSelection] = useState(false);

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



                                                            // getPreviousParams()



                                                            let params = {
                                                                flowId: flowId,
                                                                conversationUid: conversationID,
                                                                data: {
                                                                    source: "knowledgeBase",
                                                                    inputType: "MESSAGE",
                                                                    inputValue: { ...formDataArray, description: buttonType },
                                                                    // inputValue: { buttonType },
                                                                    resolutionData: resolutionDetails
                                                                },
                                                                requestId: requestId,
                                                                customerUuid: customerUuid

                                                            }

                                                            // handleInputChange(0, buttonType, "YES_NO")
                                                            // handleButtonSubmit()

                                                            console.log("yes no params...", params)

                                                            setFormDataArray({ ...formDataArray, description: buttonType })


                                                            popupAction(params)


                                                            // setObj(obj => ({

                                                            //     ...obj,
                                                            //     description: buttonType

                                                            // }));

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
                console.log("inside collect input...");


                // const flowId = get(resolutionDetails, 'flwId', '')
                // const conversationID = get(resolutionDetails, 'conversationUid', '')

                console.log("flowId inside collect input...", flowId);
                console.log("conversationID inside collect input...", conversationID);



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




                console.log("formMetaAttributes collect input...", resolutionDetails.formMetaAttributes);


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
                                                                onChangeText={(text) => {
                                                                    inputText.set(fieldSetItem.id, text)


                                                                    setObj(obj => ({

                                                                        ...obj,
                                                                        [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                                                                        [fieldSetItem?.id]: text

                                                                    }));

                                                                }}
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



                                                                                                                        setObj(obj => ({

                                                                                                                            ...obj,
                                                                                                                            [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                                                                                                                            [fieldSetItem?.id]: text

                                                                                                                        }));
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
                const [checked, setChecked] = useState(false);
                const [radioChecked, setRadioChecked] = useState(false);
                const [dropDownDesc, setDropDownDesc] = useState("");
                const [dropDownCode, setDropDownCode] = useState("");

                const handleOnChangeButtom = async () => {
                    // obj = {}
                    // getPreviousParams()
                    // await delay(10000);
                    // const params = await getDataFromDB("PREVIOUS_PARAMS")
                    // console.log("got from db..", params.data.inputValue)
                    // obj = params.data.inputValue
                    // // setPrevInputVal(params.data.inputValue)
                    // console.log("obj3...", obj)
                    // console.log("retrieved obj..", obj)

                    // formMetaAttributes?.forEach((item) => {
                    //     item?.fieldSet?.forEach((item1) => {
                    //         if (!(item1.fieldType == "button")) {
                    //             if ((item1.fieldType == "project") || (item1.fieldType == "radio") || (item1.fieldType == "checkbox")) {
                    //                 setObj(obj => ({

                    //                     ...obj,
                    //                     [item1.id + "_formAttributes"]: formMetaAttributes,
                    //                     [item1.id]: checkedItemArr

                    //                 }));
                    //                 // setObj({ ...obj, [item1.id + "_formAttributes"]: formMetaAttributes, [item1.id]: checkedItemArr })
                    //             }


                    //             else {
                    //                 setObj(obj => ({

                    //                     ...obj,
                    //                     [item1.id + "_formAttributes"]: formMetaAttributes,
                    //                     [item1.id]: inputText.get(item1.id)

                    //                 }));
                    //                 // setObj({ ...obj, [item1.id + "_formAttributes"]: formMetaAttributes, [item1.id]: inputText.get(item1.id) })
                    //             }
                    //         }
                    //     })
                    // })
                    // console.log('obj...', obj)
                }

                const [inputValue, setInputValue] = useState('');
                const [inputText, setInputText] = useState(new Map());
                // let inputText = new Map([["", ""]]);

                const handleTextChange = _.debounce((text, fieldSetItem, formMetaAttributes) => {
                    // Your logic here
                    // inputText.set(fieldSetItem.id, text)

                    console.log("inputText val..", inputText)

                    setInputText
                        (
                            prevInputText => {
                                console.log("prevInputText..", prevInputText)
                                const newInputText = new Map(prevInputText);
                                newInputText.set(fieldSetItem.id, text);
                                return newInputText;
                            });

                    // setObj({
                    //     ...obj,
                    //     [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                    //     [fieldSetItem?.id]: text
                    // });

                    setObj(prevState => ({ ...prevState, [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes, [fieldSetItem?.id]: text }));

                }, 300);


                console.log("formMetaAttributes...", formMetaAttributes)


                return (
                    <>
                        <View style={styles.column_space_arround_evenly}>
                            {formMetaAttributes?.map(item => {
                                return (
                                    <View>
                                        {item.fieldSet?.map((fieldSetItem, fieldSetIndex) => {

                                            // var currentId = ""
                                            // if(fieldSetIndex == 0) {
                                            //     currentId = fieldSetItem.id
                                            // }





                                            if (((fieldSetItem.fieldType == "checkbox")) && (fieldSetItem.taskContextPrefix == true)) {
                                                return (
                                                    <View>

                                                        {!(element == "") && (element?.map((elementItem, elementIdx) => {
                                                            return (
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Checkbox
                                                                        status={checkedItem.get("" + elementIdx) ? "checked" : "unchecked"}
                                                                        onPress={() => {

                                                                            setChecked(checked ? false : true)
                                                                            checkedItem.set("" + elementIdx, !checkedItem.get("" + elementIdx))
                                                                            if (checkedItem.get("" + elementIdx)) {
                                                                                checkedItemArr.push(elementItem)


                                                                            }
                                                                            else {
                                                                                checkedItemArr.pop(elementItem)
                                                                            }


                                                                            // setObj(obj => ({

                                                                            //     ...obj,
                                                                            //     [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                                                                            //     [fieldSetItem?.id]: checkedItemArr

                                                                            // }));


                                                                            handleInputChange(fieldSetItem.id, checkedItemArr)



                                                                        }}
                                                                        style={styles.checkbox}
                                                                    />

                                                                    {fieldSetItem.fieldType == "checkbox" && (
                                                                        <Text style={{ alignSelf: "center" }}>{elementItem.value}</Text>)}

                                                                    {fieldSetItem.fieldType == "selectbox" && (
                                                                        <Text style={{ alignSelf: "center" }}>{elementItem.description}</Text>)}
                                                                </View>
                                                            )
                                                        }))
                                                        }

                                                    </View>
                                                )
                                            }





                                            if ((fieldSetItem.fieldType == "selectbox") && (fieldSetItem.taskContextPrefix == true)) {

                                                var arr = []
                                                if (!(element == "")) {
                                                    arr = element?.map(item => {
                                                        return { description: item.description, code: item.code }
                                                    })
                                                }

                                                return (
                                                    <View>

                                                        <View style={{ flexDirection: "column" }}>

                                                            <Text>{fieldSetItem.title}</Text>

                                                            <CustomDropDownFullWidth
                                                                selectedValue={dropDownDesc}
                                                                data={arr}
                                                                onChangeText={(text) => {
                                                                    setDropDownDesc(text.description)
                                                                    setDropDownCode(text.code)
                                                                    inputText.set("remarks", dropDownCode)

                                                                    handleInputChange(fieldSetItem.id, dropDownCode)


                                                                    // setObj(obj => ({

                                                                    //     ...obj,
                                                                    //     [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                                                                    //     [fieldSetItem?.id]: dropDownCode

                                                                    // }));
                                                                }}
                                                                value={dropDownCode}
                                                                caption={arr.description}
                                                                placeHolder={arr.description}
                                                            />

                                                        </View>

                                                    </View>
                                                )
                                            }




                                            if ((fieldSetItem.fieldType == "radio") && (fieldSetItem.taskContextPrefix == true)) {
                                                return (
                                                    <View>

                                                        {!(element == "") && (element?.map((elementItem, elementIdx) => {
                                                            // checkedItem.set('' + elementIdx, false)

                                                            console.log("elementItem...", checkedItem.get("" + elementIdx))

                                                            return (
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <RadioButton
                                                                        status={checkedItem.get("" + elementIdx) ? "checked" : "unchecked"}
                                                                        onPress={() => {
                                                                            setRadioChecked(radioChecked ? false : true)


                                                                            console.log("sel radio value..", checkedItem.get("" + elementIdx))
                                                                            checkedItem.set("" + elementIdx, !checkedItem.get("" + elementIdx))
                                                                            console.log("changed value..", checkedItem.get("" + elementIdx))

                                                                            if (checkedItem.get("" + elementIdx)) {
                                                                                checkedItemArr.push(elementItem)
                                                                            }
                                                                            else {
                                                                                checkedItemArr.pop(elementItem)
                                                                            }



                                                                            // setObj(obj => ({

                                                                            //     ...obj,
                                                                            //     [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                                                                            //     [fieldSetItem?.id]: checkedItemArr

                                                                            // }));



                                                                            handleInputChange(fieldSetItem.id, checkedItemArr)
                                                                        }}
                                                                    />

                                                                    <Text style={{ alignSelf: "center" }}>{elementItem.value}</Text>
                                                                </View>
                                                            )
                                                        }))
                                                        }

                                                    </View>
                                                )
                                            }




                                            if (fieldSetItem.fieldType == "textField") {
                                                return (
                                                    // <Textfield data={{ fieldSetItem, formMetaAttributes, inputText, obj, temp }} handlers={{ handleInputChange, setTemp }} />

                                                    <View>
                                                        {/* <CustomInput
                                                            id={fieldSetItem.id}
                                                            style={{
                                                                backgroundColor: "transparent"
                                                            }}
                                                            // onChangeText={handleTextChange}
                                                            onChangeText={(text) => {
                                                                setInputValue(text);
                                                                handleTextChange(text, fieldSetItem, formMetaAttributes);

                                                                // setObj({
                                                                //     ...obj,
                                                                //     [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                                                                //     [fieldSetItem?.id]: text
                                                                // });

                                                            }}
                                                            // value={fieldSetItem.id ? obj[fieldSetItem.id] : ""}
                                                            value={inputText.get(fieldSetItem.id)}
                                                            inputType={fieldSetItem.inputType}
                                                            caption={fieldSetItem.title}
                                                            placeHolder={fieldSetItem.placeHolder}
                                                        /> */}


                                                        <CustomInput
                                                            id={fieldSetItem.id}
                                                            style={{
                                                                backgroundColor: "transparent"
                                                            }}
                                                            // onChangeText={handleTextChange}
                                                            onChangeText={(e) =>
                                                                handleInputChange(fieldSetItem.id, e)
                                                            }
                                                            // value={fieldSetItem.id ? obj[fieldSetItem.id] : ""}
                                                            value={formDataState[fieldSetItem.id]}
                                                            inputType={fieldSetItem.inputType}
                                                            caption={fieldSetItem.title}
                                                            placeHolder={fieldSetItem.placeHolder}
                                                        />


                                                        {/* <input

                                                            type={fieldSetItem.inputType}

                                                            value={formDataState[fieldSetItem.id]}

                                                            placeholder={fieldSetItem.placeHolder}

                                                            onChange={(e) => handleInputChange(fieldSetItem.id, e.target.value)}

                                                        /> */}

                                                        {/* {console.log("inputText.get(fieldSetItem.id)", obj[fieldSetItem.id])} */}
                                                        {/* {console.log("inputText..", inputText)} */}
                                                        <ClearSpace size={2}></ClearSpace>
                                                    </View >

                                                )
                                            }





                                            if (fieldSetItem.fieldType == "textarea") {
                                                return (
                                                    <View>
                                                        <CustomInput
                                                            style={{
                                                                backgroundColor: "transparent"
                                                            }}
                                                            onChangeText={(text) => {
                                                                // inputText.set(fieldSetItem.id, text)

                                                                // setObj(obj => ({

                                                                //     ...obj,
                                                                //     [fieldSetItem?.id + "_formAttributes"]: formMetaAttributes,
                                                                //     [fieldSetItem?.id]: text

                                                                // }));

                                                                handleInputChange(fieldSetItem.id, text)

                                                            }}
                                                            value={formDataState[fieldSetItem.id]}
                                                            multiline={true}
                                                            inputType={fieldSetItem.inputType}
                                                            caption={fieldSetItem.title}
                                                            placeHolder={fieldSetItem.placeHolder}
                                                        />
                                                        <ClearSpace size={2}></ClearSpace>
                                                    </View>

                                                )
                                            }




                                            if (fieldSetItem.fieldType == "button") {


                                                return (
                                                    <View style={{ flex: 1 }}>
                                                        <ClearSpace size={2}></ClearSpace>
                                                        <CustomButton
                                                            label={fieldSetItem.placeHolder}
                                                            onPress={async () => {
                                                                console.log("formDataState onpress..", formDataState)
                                                                handleButtonSubmit()

                                                                // handleOnChangeButtom()

                                                                // async () => {

                                                                // getPreviousParams()

                                                                // console.log("fieldSet?..", formMetaAttributes)

                                                                // formMetaAttributes?.forEach(async (item1, idx) => {
                                                                //     item1?.fieldSet?.forEach(async (item2, idx) => {
                                                                //         // if ((item2.fieldType == "button")) {                                           

                                                                //         // setCurrInputVal([...currInputVal, {
                                                                //         //     [item2.id + "_formAttributes"]: formMetaAttributes,
                                                                //         //     [item2.id]: checkedItemArr
                                                                //         // }])

                                                                //         console.log('------x-------->', {
                                                                //             [item2.id + "_formAttributes"]: formMetaAttributes,
                                                                //             [item2.id]: checkedItemArr
                                                                //         })
                                                                //         // }
                                                                //     })
                                                                // })


                                                                // const unique = new Set(formDataArray);

                                                                // const uniqueData = [...unique];


                                                                // const jsonStr = JSON.stringify(formDataArray, null, '\t').slice(1, -1)
                                                                console.log("jsonStr1--->", formDataArray, formDataState)

                                                                // var newString = jsonStr.indexOf('[') == 0 ? jsonStr.substring(1) : jsonStr;
                                                                // newString = jsonStr.indexOf(']') == jsonStr.length - 1 ? jsonStr.substring(jsonStr.length - 1) : jsonStr;
                                                                // console.log("jsonStr2--->", newString)


                                                                // console.log("jsonStr3--->", JSON.parse(newString))


                                                                // formDataArray.forEach((item, index) => {  
                                                                //     modifiedData[`formData${index}`] = { ...item };     
                                                                // });

                                                                // console.log("jsonStr2--->", formDataArray.forEach((item, index) => {
                                                                //     modifiedData[`formData${index}`] = { ...item };
                                                                // }))

                                                                var valObj = {}
                                                                if (values.length > 0) {
                                                                    valObj = { ["GRID"]: values }
                                                                    values = []
                                                                }




                                                                let params = {
                                                                    flowId: flowId,
                                                                    conversationUid: conversationID,
                                                                    "data": {
                                                                        "source": "knowledgeBase",
                                                                        "inputType": "FORMDATA",
                                                                        // "inputValue": formDataArray.map(m => ({ ...m })),

                                                                        // json = JSON.parse(twice_json)               // => '{"orderId":"123"}'
                                                                        // obj = JSON.parse(json)  



                                                                        "inputValue": { ...formDataArray, ...formDataState, ...valObj },


                                                                        // "project_formAttributes": formMetaAttributes,
                                                                        // "project": checkedItemArr,

                                                                        // "radio_formAttributes": formMetaAttributes,
                                                                        // "radio": checkedItemArr,

                                                                        // "Department_formAttributes": formMetaAttributes,
                                                                        // "Department": inputText.get("Department"),

                                                                        // "role_formAttributes": formMetaAttributes,
                                                                        // "role": inputText.get("role"),

                                                                        // "remarks": inputText.get("remarks")

                                                                        // },
                                                                        "resolutionData": resolutionDetails
                                                                    }
                                                                };



                                                                console.log("save data..", params)

                                                                // await saveDataToDB("PREVIOUS_PARAMS", params);

                                                                console.log("submit params...", JSON.stringify(params));

                                                                popupAction(params)

                                                            }
                                                            }
                                                        />
                                                        <ClearSpace size={2}></ClearSpace>
                                                    </View>
                                                )

                                            }


                                            console.log("fieldSetItem grid..", fieldSetItem)

                                            if (fieldSetItem?.fieldType === 'grid') {

                                                console.log("inside grid..")

                                                return (
                                                    <>
                                                        <DataTable style={styles.containers}>
                                                            <DataTable.Header style={styles.tableHeader}>
                                                                {fieldSetItem?.headers.map((header, headerIndex) => (
                                                                    <DataTable.Title>{header.title}</DataTable.Title>
                                                                ))}

                                                            </DataTable.Header>

                                                            {values?.length > 0 &&

                                                                values?.map((rows, rowsIndex) => (
                                                                    <DataTable.Row key={rowsIndex} id={'r' + rowsIndex}>

                                                                        {customerRowsRenderer(fieldSetItem?.headers || [], rowsIndex, rows, { required: true })}

                                                                    </DataTable.Row>
                                                                ))}


                                                        </DataTable>

                                                        {fieldSetItem.rows?.length > 0 && (


                                                            <CustomButton
                                                                label="Add Row"

                                                                onPress={() => {

                                                                    handleAddRows(fieldSetItem?.headers);

                                                                }}


                                                            />



                                                        )}

                                                        <ScrollView>

                                                            <View style={styles.table}>



                                                                {/* {fieldSetItem.columns?.[0]?.column_headers?.map((rows, rowsIndex) => (

                                                                    <View key={rowsIndex} style={styles.row} id={'r' + rowsIndex}>

                                                                        <View key={rowsIndex} style={styles.cell}>

                                                                            <TextInput

                                                                                style={styles.input}

                                                                                value={rows?.title + (rows?.required && '*')}

                                                                                editable={false}

                                                                            />

                                                                        </View>

                                                                        {customElementsRenderer(fieldSetItem?.headers?.length - 1 || 0, rowsIndex, formDataState, { required: rows?.required })}

                                                                    </View>

                                                                ))} */}





                                                            </View>

                                                        </ScrollView>
                                                    </>
                                                );

                                            }





                                        })





                                        }
                                    </View>
                                )
                            })}
                        </View>
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
    containers: {
        padding: 5,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    // table: {
    //     borderWidth: 1,
    //     borderColor: '#000',
    //     margin: 10,
    // },
    // row: {
    //     flexDirection: 'row'
    //     // borderBottomWidth: 1,
    //     // borderBottomColor: '#000',
    // },
    cell: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 5,
    },
    button: {
        marginTop: 10,
    },
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