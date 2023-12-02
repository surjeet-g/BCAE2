import _ from 'lodash';
import get from "lodash.get";
import moment from 'moment';
import React, { createRef, useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import EventCalendar from 'react-native-events-calendar';
import { TouchableHighlight } from "react-native-gesture-handler";
import { Card, Checkbox, DataTable, Divider, RadioButton, Text } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import SignatureCapture from "react-native-signature-capture";
import { Rows, Table, TableWrapper } from 'react-native-table-component';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { ClearSpace } from '../../../../Components/ClearSpace';
import { CustomButton } from "../../../../Components/CustomButton";
import { CustomDropDownFullWidth } from "../../../../Components/CustomDropDownFullWidth";
import { CustomInput } from "../../../../Components/CustomInput";
import { CustomInputSmall } from '../../../../Components/CustomInputSmall';
import { getHallEvents } from '../../../../Redux/InteractionDispatcher';
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
    console.log('az.........')
    var idList = []
    var currentId = ""

    console.log('ax.........')

    var gridInputText = new Map([["", ""]]);

    console.log('ac.........')

    const { width, height } = Dimensions.get("window");

    const { interactionReducer } = useSelector(
        (state) => {
            return {
                interactionReducer: state.interaction
            };
        }
    );

    console.log('av.........')


    const dispatchInteraction = useDispatch([
        getHallEvents
    ]);

    // const [hallsEnable, setHallsEnable] = useState(false);

    // useEffect(async () => {
    //     interactionReducer.meetingHallsData?.map((elementItem, elementIdx) => {
    //         if (checkedItem.get("" + elementIdx)) {
    //             dispatchInteraction(getHallEvents(elementItem.code))
    //             console.log("meeting hall events data...", interactionReducer.meetingHallEventsData)
    //         }
    //     })
    // }, []);




    // const [gridInputText, setGridInputText] = useState(new Map());



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
            console.log("html text....", title)

            // Replacing all html tags to new line
            const regex = /(<([^>]+)>)/gi;
            var htmlContent = title.replace(regex, '\n')


            // var htmlContent = title.split('<br/>')[0]
            // title.split('<br/>')[1]

            // var htmlContent = title.replace(/[<>]/g, '')
            // .replace('br', '\n')



            // .replace('r', '')

            // const source = {
            //     html: title
            // };


            return (
                <View style={{ flex: 1, flexDirection: 'column' }}>


                    {/* <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}

                    {/* <WebView
                        source={{ html: '<html><body><p>This is a static HTML source!</p></body></html>' }}
                    /> */}


                    {/* <RenderHtml
                        contentWidth={width}
                        source={source}
                    /> */}

                    {/* <HTMLView
                        value={title}
                        stylesheet={styles.htmlContent}
                    /> */}

                    {/* <WebView
                        source={{ html: title }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={true}
                        scrollEnabled={true}
                        automaticallyAdjustContentInsets={false}
                        startInLoadingState={true}
                        originWhitelist={['*']}
                        androidLayerType={'hardware'}
                    /> */}

                    <Text>{htmlContent}</Text>
                    <ClearSpace size={2} />
                </View>
            )
        }

        else if (type == "object" && description == "PRODUCT PURCHASE") {
            console.log('RenderSend:')
            return (
                <Text>TOdo</Text>
            )
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

        else if (type == "object" && description == "LIST") {
            console.log("holiday calendar...")
            const headersData = ["Date", "Day", "Holiday"]
            return (
                <>
                    <DataTable style={styles.containers}>

                        {/* <DataTable.Header style={styles.tableHeader}>
                            {headersData?.map((header, headerIndex) => (
                                <DataTable.Title>
                                    <View style={{ marginLeft: -5, padding: 5, flexDirection: "column", marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                                        <Text style={{ fontWeight: 500, width: 75, marginLeft: 0 }}>{header}</Text>
                                    </View>
                                </DataTable.Title>
                            ))}
                        </DataTable.Header> */}

                        {title?.length > 0 && (
                            title?.map((rows, rowsIndex) => (
                                <DataTable.Row key={rowsIndex} id={'r' + rowsIndex}>
                                    <View style={{ backgroundColor: color.BCAE_OFF_WHITE, padding: 5, flexDirection: "column", marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                                        <Text style={{ fontWeight: 500, width: 75, marginLeft: 0 }}>{headersData[0]}</Text>
                                        <Text style={{ width: 75, marginLeft: 0 }}>{rows.holidayDate}</Text>
                                    </View>
                                    <View style={{ backgroundColor: color.BCAE_OFF_WHITE, padding: 5, flexDirection: "column", marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                                        <Text style={{ fontWeight: 500, width: 75, marginLeft: 0 }}>{headersData[1]}</Text>
                                        <Text style={{ width: 90, marginLeft: 0 }}>{rows.holidayDayNameDesc.description}</Text>
                                    </View>
                                    <View style={{ backgroundColor: color.BCAE_OFF_WHITE, padding: 5, flexDirection: "column", marginHorizontal: 0, borderWidth: 1, borderColor: color.DISABLED_GREY }}>
                                        <Text style={{ fontWeight: 500, width: 75, marginLeft: 0 }}>{headersData[2]}</Text>
                                        <Text style={{ width: 110, marginLeft: 0 }}>{rows.holidayDescription}</Text>
                                    </View>
                                </DataTable.Row>
                            )))}

                    </DataTable>
                </>
            )
        }

        else {
            return null
        }
    }

    const RenderCollectInput = ({ description, message }) => {
        const element = get(message, 'element', '');
        const formMetaAttributes = get(message, 'formMetaAttributes', []);
        const attribute = get(message, 'attributes', []);
        const flowId = get(resolutionDetails, 'flwId', '')
        const conversationID = get(resolutionDetails, 'conversationUid', '')
        const requestId = get(resolutionDetails, 'requestId', '')

        console.log('message..', message)
        console.log('element..', element)
        console.log('formMetaAttributes..', formMetaAttributes)
        console.log('attribute..', attribute)
        console.log('flowId..', flowId)
        console.log('conversationID..', conversationID)
        console.log('requestId..', requestId)
        console.log('>>resolutionDetails', resolutionDetails)

        const [formDataState, setFormDataState] = useState({});
        var [values, setValues] = useState([]);

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

                console.log("id......", h?.id)
                console.log("title......", h?.title)
                console.log("grid input text render......", gridInputText.get(h?.id))

                return (
                    <DataTable.Cell>
                        <View key={index} style={styles.cell}>

                            <Text style={{ marginTop: -10, color: "#000000", textAlign: 'left', padding: 0, fontWeight: "300" }}>{h.title}</Text>

                            <CustomInputSmall
                                value={gridInputText.get(h?.id)}
                                required={rest?.required || false}
                                editable={!isFormDisabled}
                                onChangeText={(text) => {
                                    console.log("text entered..", text)
                                    gridInputText.set(h?.id, text)
                                    handleRowsOnChange(text, h.id, rowsIndex)
                                }}
                            />
                        </View>
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

        const handleRemoveRow = (index) => {
            console.log("values2....", values)

            setValues(prevValues => (
                // Filter out the item with the matching index
                prevValues.filter((values, i) => i !== index)
            ));



            // values = values.splice(index, 1);
            // console.log("values3....", values)
            // const updatedValues = values;
            // var updatedValues = [...values];
            // console.log("before updatedValues....", updatedValues)
            // updatedValues = updatedValues.splice(index, 1);
            // console.log("after updatedValues....", updatedValues)
            // setValues(updatedValues);
        };

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
                                                                    // inputValue: buttonType,
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
                const sign = createRef();

                const saveSign = () => {
                    sign.current.saveImage();
                };

                const resetSign = () => {
                    sign.current.resetImage();
                };

                const _onSaveEvent = (result) => {
                    alert('Signature Captured Successfully..');
                    handleInputChange(currentId, result.encoded)
                    // setSignature(result.encoded)

                };

                const _onDragEvent = () => {
                    // This callback will be called when the user enters signature
                    console.log('dragged');
                };

                console.log("formMetaAttributes collect input...", resolutionDetails.formMetaAttributes);
                idList = []

                return (
                    <>
                        <View style={styles.column_space_arround_evenly}>
                            {resolutionDetails.metaAttributes?.map(item => {
                                return (
                                    <View>
                                        {
                                            item.fieldSet?.map(fieldSetItem => {
                                                console.log("id list..." + fieldSetItem.id)

                                                if ((!(fieldSetItem.id === undefined)) && (!(fieldSetItem.fieldType == "button"))) {
                                                    idList.push(fieldSetItem.id)
                                                }

                                                if (fieldSetItem.fieldType == "textarea") {
                                                    return (
                                                        <View style={{ marginTop: 30 }}>
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

                                                if (fieldSetItem.fieldType == "sigature") {
                                                    currentId = fieldSetItem.id
                                                    return (
                                                        <SafeAreaView style={{ marginTop: 10, flex: 1, padding: 8, backgroundColor: color.BCAE_OFF_WHITE }}>
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
                                                                    var proceed = true
                                                                    idList?.every((item, idx) => {
                                                                        console.log("id check...", item + " / " + formDataState[item])
                                                                        if ((formDataState[item] === "") || (formDataState[item] === undefined)) {
                                                                            Toast.show({
                                                                                type: "bctError",
                                                                                text1: strings.please_enter + " " + item,
                                                                            });
                                                                            proceed = false
                                                                            return false
                                                                        }
                                                                        return true
                                                                    })

                                                                    console.log("formDataArray--->", formDataArray)
                                                                    console.log("formDataState--->", formDataState)

                                                                    if (Object.keys(formDataArray).length === 0 && Object.keys(formDataState).length === 0) {
                                                                        Toast.show({
                                                                            type: "bctError",
                                                                            text1: strings.pls_fill_the_form,
                                                                        });
                                                                    }

                                                                    else if (proceed) {
                                                                        console.log("formDataState onpress..", formDataState)
                                                                        handleButtonSubmit()
                                                                        console.log("jsonStr1--->", formDataArray, formDataState)

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
                                                                                "inputValue": { ...formDataArray, ...formDataState, ...valObj },
                                                                                "resolutionData": resolutionDetails,
                                                                            }
                                                                        };

                                                                        console.log("save data..", params)
                                                                        console.log("submit params...", JSON.stringify(params));
                                                                        popupAction(params)
                                                                    }
                                                                }

                                                                }
                                                            />
                                                            <ClearSpace size={2}></ClearSpace>
                                                        </View>
                                                    )
                                                }

                                                if (fieldSetItem?.fieldType === 'grid') {
                                                    console.log("inside grid..")

                                                    useEffect(() => {
                                                        async function getEvents() {
                                                            handleAddRows(fieldSetItem?.headers);
                                                        }
                                                        getEvents()
                                                    }, []);

                                                    gridInputText = new Map([["", ""]]);

                                                    console.log("values4....", values)

                                                    return (
                                                        <>
                                                            <DataTable style={{ padding: 0 }}>
                                                                {/* <DataTable.Header style={styles.tableHeader}>
                                                                    {fieldSetItem?.headers.map((header, headerIndex) => (
                                                                        <DataTable.Title>{header.title}</DataTable.Title>
                                                                    ))}
                                                                </DataTable.Header> */}


                                                                {values?.length > 0 &&
                                                                    values?.map((rows, rowsIndex) => (
                                                                        <DataTable.Row style={{ marginTop: -5 }} key={rowsIndex} id={'r' + rowsIndex}>
                                                                            {customerRowsRenderer(fieldSetItem?.headers || [], rowsIndex, rows, { required: true })}

                                                                            {/* <Pressable
                                                                                onPress={() => handleRemoveRow(rowsIndex)}
                                                                                style={{
                                                                                    marginRight: 10,
                                                                                    alignSelf: 'flex-end',
                                                                                    marginTop: 0,
                                                                                    marginBottom: 10,
                                                                                    backgroundColor: "#4a5996",
                                                                                    width: 50
                                                                                }}
                                                                            >
                                                                                <Icon name="close" size={19} color={Colors.BLACK} />
                                                                            </Pressable> */}

                                                                            {/* <Card style={{ marginRight: 10, alignSelf: 'flex-end', marginTop: 0, marginBottom: 10, backgroundColor: "#4a5996", width: 100 }}
                                                                                onPress={() => {
                                                                                    console.log("delete click rowsIndex.....", rowsIndex)
                                                                                    handleRemoveRow(rowsIndex)
                                                                                }}>
                                                                                <Text style={{ color: "#FFF", textAlign: "center", padding: 10, fontWeight: "500" }}>Delete</Text>
                                                                            </Card> */}
                                                                        </DataTable.Row>
                                                                    ))}
                                                            </DataTable>

                                                            {fieldSetItem.rows?.length > 0 && (
                                                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                                    <Card style={{ marginTop: 10, marginBottom: 10, backgroundColor: "#4a5996", width: 100 }}
                                                                        onPress={() => {
                                                                            handleAddRows(fieldSetItem?.headers);
                                                                        }}>
                                                                        <Text style={{ color: "#FFF", textAlign: "center", padding: 10, fontWeight: "500" }}>Add</Text>
                                                                    </Card>




                                                                    {/* <CustomButton
                                                                        label="Add Row"
                                                                        onPress={() => {
                                                                            handleAddRows(fieldSetItem?.headers);
                                                                        }}
                                                                    /> */}
                                                                </View>
                                                            )}

                                                        </>
                                                    );
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
                                                                                                        return (
                                                                                                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                                                                                                                <CustomInput
                                                                                                                    style={{
                                                                                                                        backgroundColor: "transparent"
                                                                                                                    }}
                                                                                                                    onChangeText={(text) => {
                                                                                                                        inputText.set(idx1 + "" + idx2, text)

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

            default:
                console.log("inside default..........")
                const [radioChecked, setRadioChecked] = useState(false);

                if (description == "MEETING_HALL_CALENDAR") {
                    var selSlotIds = []

                    console.log("inside meeting calendar...", interactionReducer.meetingHallsData)
                    // setHallsEnable(!hallsEnable)



                    //get the size of device
                    let { width } = Dimensions.get('window');




                    // const [events, setEvents] = useState(interactionReducer.meetingHallEventsData)
                    // {
                    //     start: '2020-01-01 00:00:00',
                    //     end: '2020-01-01 02:00:00',
                    //     title: 'New Year Party',
                    //     summary: 'xyz Location',
                    // },
                    // {
                    //     start: '2020-01-01 01:00:00',
                    //     end: '2020-01-01 02:00:00',
                    //     title: 'New Year Wishes',
                    //     summary: 'Call to every one',
                    // },
                    // {
                    //     start: '2020-01-02 00:30:00',
                    //     end: '2020-01-02 01:30:00',
                    //     title: 'Parag Birthday Party',
                    //     summary: 'Call him',
                    // },
                    // {
                    //     start: '2020-01-03 01:30:00',
                    //     end: '2020-01-03 02:20:00',
                    //     title: 'My Birthday Party',
                    //     summary: 'Lets Enjoy',
                    // },
                    // {
                    //     start: '2020-02-04 04:10:00',
                    //     end: '2020-02-04 04:40:00',
                    //     title: 'Engg Expo 2020',
                    //     summary: 'Expoo Vanue not confirm',
                    // },
                    // ]);

                    // console.log("inside meeting events...", events)

                    const eventClicked = (event) => {
                        //On Click of event showing alert from here
                        var jsonObj = event
                        var startStr = jsonObj.start
                        var endStr = jsonObj.end
                        alert(startStr + " - " + endStr);
                        var alreadyExists = false
                        selSlotIds.forEach((item, idx) => {
                            if (jsonObj.extendedProps.slotId == item) {
                                alreadyExists = true
                            }
                        })
                        if (alreadyExists) {
                            selSlotIds.pop(jsonObj.extendedProps.slotId)
                        }
                        else {
                            selSlotIds.push(jsonObj.extendedProps.slotId)
                        }
                    };


                    useEffect(() => {
                        async function getEvents() {
                            interactionReducer.meetingHallsData?.map((elementItem, elementIdx) => {
                                if (checkedItem.get("" + elementIdx)) {
                                    dispatchInteraction(getHallEvents(elementItem.code))
                                    console.log("meeting hall events data...", interactionReducer.meetingHallEventsData)
                                }
                            })
                        }
                        getEvents()
                    }, [radioChecked]);

                    return (
                        <View>
                            <View>
                                {interactionReducer.meetingHallsData.map((elementItem, elementIdx) => {

                                    var check = checkedItem.get("" + elementIdx)
                                    console.log("checked item...", elementItem.description + " / " + checkedItem.get("" + elementIdx))
                                    console.log("compare..", interactionReducer?.meetingHallEventsData?.requestObject?.data?.workType + " / " + elementItem.code)
                                    if (interactionReducer?.meetingHallEventsData?.requestObject?.data?.workType == elementItem.code) {
                                        check = true
                                    }
                                    else {
                                        // Toast.show({
                                        //     type: "bctError",
                                        //     text1: "No slots event found",
                                        // });
                                    }


                                    return (
                                        <View style={{ flexDirection: "row" }}>
                                            <RadioButton
                                                status={check ? "checked" : "unchecked"}
                                                onPress={() => {
                                                    console.log("a...........")
                                                    checkedItem = new Map([["", false]]);
                                                    console.log("b...........")
                                                    checkedItem.set("" + elementIdx, !checkedItem.get("" + elementIdx))
                                                    console.log("c...........")
                                                    // console.log("changed meeting value..", checkedItem.get("" + elementIdx))
                                                    // setEvents(interactionReducer.meetingHallEventsData)
                                                    setRadioChecked(!radioChecked)
                                                    console.log("d...........")
                                                    // setEvents(interactionReducer.meetingHallEventsData)
                                                    // checkedItemArr = []
                                                    // if (checkedItem.get("" + elementIdx)) {
                                                    //     checkedItemArr.push(elementItem.code)
                                                    // }
                                                    // else {
                                                    //     checkedItemArr.pop(elementItem.code)
                                                    // }

                                                    // handleInputChange(fieldSetItem.id, checkedItemArr)
                                                }}
                                            />

                                            <Text style={{ alignSelf: "center" }}>{elementItem?.description}</Text>
                                        </View>
                                    )

                                })
                                }
                            </View>

                            <SafeAreaView style={styles.eventContainer}>
                                <View style={styles.eventContainer}>
                                    <EventCalendar
                                        eventTapped={eventClicked}
                                        // Function on event press
                                        events={interactionReducer?.meetingHallEventsData?.data?.data}
                                        // Passing the Array of event
                                        width={width - 30}
                                        // Container width
                                        size={60}
                                        // number of date will render before and after initDate
                                        // (default is 30 will render 30 day before initDate
                                        // and 29 day after initDate)
                                        initDate={moment(new Date()).format("YYYY-MM-DD")}
                                        // Show initial date (default is today)
                                        scrollToFirst
                                    // Scroll to first event of the day (default true)
                                    />
                                </View>
                            </SafeAreaView>

                            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                <CustomButton
                                    label="Cancel"
                                    onPress={async () => {
                                        let params = {
                                            flowId: flowId,
                                            conversationUid: conversationID,
                                            data: {
                                                source: "knowledgeBase",
                                                bookingStatus: "CANCEL",
                                                inputType: "MESSAGE",
                                                inputValue: { ...formDataArray, description: "CANCEL" },
                                                selectedSlotIds: selSlotIds,
                                                resolutionData: resolutionDetails
                                            }
                                        }
                                        popupAction(params)
                                    }} />
                                <CustomButton
                                    label="Proceed"
                                    onPress={async () => {
                                        if (selSlotIds?.length > 0) {
                                            let params = {
                                                flowId: flowId,
                                                conversationUid: conversationID,
                                                data: {
                                                    source: "knowledgeBase",
                                                    bookingStatus: "PROCEED",
                                                    inputType: "MESSAGE",
                                                    inputValue: { ...formDataArray, description: "PROCEED" },
                                                    selectedSlotIds: selSlotIds,
                                                    resolutionData: resolutionDetails
                                                }
                                            }
                                            popupAction(params)
                                        }
                                        else {
                                            console.log("selSlotIds == 0")
                                            Toast.show({
                                                type: "bctError",
                                                text1: "Please Select a Slot to Proceed Further",
                                            });
                                        }
                                    }} />
                            </View>
                        </View>
                    );
                }
                else {
                    const [checked, setChecked] = useState(false);
                    const [radioChecked, setRadioChecked] = useState(false);
                    const [dropDownDesc, setDropDownDesc] = useState("");
                    const [dropDownCode, setDropDownCode] = useState("");
                    const [inputValue, setInputValue] = useState('');
                    const [inputText, setInputText] = useState(new Map());

                    const handleTextChange = _.debounce((text, fieldSetItem, formMetaAttributes) => {
                        console.log("inputText val..", inputText)
                        setInputText
                            (
                                prevInputText => {
                                    console.log("prevInputText..", prevInputText)
                                    const newInputText = new Map(prevInputText);
                                    newInputText.set(fieldSetItem.id, text);
                                    return newInputText;
                                });
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
                                                                        inputText.set("remarks", text.code)

                                                                        handleInputChange(fieldSetItem.id, text.code)


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

                                                                                checkedItem = new Map([["", false]]);
                                                                                console.log("sel radio value..", checkedItem.get("" + elementIdx))
                                                                                checkedItem.set("" + elementIdx, !checkedItem.get("" + elementIdx))
                                                                                console.log("changed value..", checkedItem.get("" + elementIdx))

                                                                                checkedItemArr = []
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
                                                                    if (formDataArray == {} || formDataState == {}) {
                                                                        Toast.show({
                                                                            type: "bctError",
                                                                            text1: strings.pls_fill_the_form,
                                                                        });
                                                                    }
                                                                    else {
                                                                        console.log("formDataState onpress..", formDataState)
                                                                        handleButtonSubmit()
                                                                        console.log("jsonStr1--->", formDataArray, formDataState)

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
                                                                                "inputValue": { ...formDataArray, ...formDataState, ...valObj },
                                                                                "resolutionData": resolutionDetails
                                                                            }
                                                                        };

                                                                        console.log("save data..", params)
                                                                        console.log("submit params...", JSON.stringify(params));
                                                                        popupAction(params)
                                                                    }
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
                                                    useEffect(() => {
                                                        async function getEvents() {
                                                            handleAddRows(fieldSetItem?.headers);
                                                        }
                                                        getEvents()
                                                    }, []);

                                                    gridInputText = new Map([["", ""]]);

                                                    return (
                                                        <>
                                                            <DataTable style={styles.containers}>
                                                                {/* <DataTable.Header style={styles.tableHeader}>
                                                                    {fieldSetItem?.headers.map((header, headerIndex) => (
                                                                        <DataTable.Title>{header.title}</DataTable.Title>
                                                                    ))}

                                                                </DataTable.Header> */}

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
                                return <RenderCollectInput description={description} message={message} />


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
        flex: 1, padding: 8, backgroundColor: color.BCAE_OFF_WHITE, alignSelf: 'center'
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
    eventContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 40 },
    text: { textAlign: 'center' },

    htmlContent: {
        fontWeight: '300',
        color: '#FF3366', // make links coloured pink
    },
})