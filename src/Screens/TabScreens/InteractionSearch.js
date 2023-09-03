import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../Components/CustomButton";
import { CustomDropDownFullWidth } from "../../Components/CustomDropDownFullWidth";
import { CustomInput } from "../../Components/CustomInput";
import { STACK_INTERACTION_SEARCH_RESULT } from "../../Navigation/MyStack";
import { setInteractionFormField, setInteractionReset } from "../../Redux/InteractionAction";
import { addInteractionAction, fetchInteractionAction, getAppoinmentsData, updateInteractionAction } from "../../Redux/InteractionDispatcher";
import { resetKnowSearch } from "../../Redux/KnowledgeSearchAction";
import { MASTER_DATA_CONSTANT, getMasterData } from "../../Redux/masterDataDispatcher";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { navBar } from "../../Utilities/Style/navBar";
import { getCustomerUUID } from "../../Utilities/UserManagement/userInfo";
var { height, width } = Dimensions.get("screen");

/**
* Search for interaction in this screen
* @namespace InteractionSearch
*/
const InteractionSearch = ({ navigation }) => {

    const [interactionList, setInteractionList] = useState([])
    const [priorityList, setPriorityList] = useState([])
    const [problemList, setProblemList] = useState([])
    const [serviceTypelist, setServiceTypelist] = useState([])
    const [serviceCategoryList, setServiceCategoryList] = useState([])
    const [interactionCategoryList, setInteractionCategoryList] = useState([])
    const [contactTypeList, setContactTypeList] = useState([])
    const [locationList, setLocationList] = useState([])
    const [appointList, setAppoimentList] = useState([])
    const [showPopupMenu, setShowPopupMenu] = useState(false);

    const [mobileNoMaxLength, setMobileNoMaxLength] = useState(10);
    const [mobileNo, setMobileNo] = useState("");

    const [interactionNoMaxLength, setInteractionNoMaxLength] = useState(11);
    const [interactionNo, setInteractionNo] = useState("");

    const [customerNameMaxLength, setCustomerNameMaxLength] = useState(20);
    const [customerName, setCustomerName] = useState("");

    let interactionRedux = useSelector((state) => state.interaction);
    const { interactionType } = interactionRedux.formData;

    let masterReducer = useSelector((state) => state.masterdata);

    const [selInteractionTypeDesc, setSelInteractionTypeDesc] = useState("");
    const [selInteractionTypeVal, setSelInteractionTypeVal] = useState("");


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View>
                        <View style={navBar.navRightCon}>
                            <Pressable onPress={() => setShowPopupMenu(!showPopupMenu)}>
                                {/* <Image
                                    style={{ margin: 10 }}
                                    source={require("../../Assets/icons/ic_more_vertical.png")}
                                /> */}
                            </Pressable>
                        </View>
                    </View>
                );
            },
        });
    }, [showPopupMenu]);


    useEffect(async () => {
        const { INTXN_TYPE } = MASTER_DATA_CONSTANT;
        dispatch(getMasterData(`${INTXN_TYPE}`));
    }, [])

    const onInteractionNoChange = (textStr) => {
        setInteractionNo(textStr);
        //   setNumberError("");
    };

    const onMobileNoChange = (textStr) => {
        setMobileNo(textStr);
        //   setNumberError("");
    };

    const onCustomerNameChange = (textStr) => {
        setCustomerName(textStr);
        //   setNumberError("");
    };

    const resetSearchInteractionForm = () => {
        // const data = { code: "", description: "" }
        // setDropDownFormField("interactionType", data);

    }

    const setDropDownFormField = (field, { code, description }) => {
        dispatch(
            setInteractionFormField({
                field,
                value: { code: code, description: description },
                clearError: true,
            })
        );
    };

    const setFormField = (field, value) => {
        dispatch(
            setInteractionFormField({
                field,
                value,
                clearError: false,
            })
        );
    };

    const dispatch = useDispatch([
        getMasterData,
        setInteractionReset,
        setInteractionFormField,
        fetchInteractionAction,
        updateInteractionAction,
        addInteractionAction,
        resetKnowSearch,
        getAppoinmentsData
    ]);

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} nestedScrollEnabled={true}>

            {/* Field View */}
            <View style={{ marginHorizontal: 20, marginTop: 60 }}>

                <View style={{ paddingVertical: 10 }}>
                    <CustomInput
                        value={interactionNo}
                        keyboardType="text"
                        maxLength={interactionNoMaxLength}
                        caption={strings.interaction_number}
                        placeHolder={strings.enter_interaction_number}
                        onChangeText={(text) => {
                            // text = text.replace(/[^0-9]/g, '')
                            onInteractionNoChange(text)
                            // dispatchInteraction(
                            //   setInteractionFormField({
                            //     field: "remarks",
                            //     value: text,
                            //     clearError: true,
                            //   })
                            // );
                        }}
                    />
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <CustomInput
                        value={customerName}
                        keyboardType="text"
                        maxLength={customerNameMaxLength}
                        caption={strings.customer_name}
                        placeHolder={strings.enter_customer_name}
                        onChangeText={(text) => {
                            text = text.replace(/[^A-Za-z]/g, '')
                            // text = text.replace(/^[A-Za-z]+$/, '')
                            onCustomerNameChange(text)
                            // dispatch(
                            //   setInteractionFormField({
                            //     field: "remarks",
                            //     value: text,
                            //     clearError: true,
                            //   })
                            // );

                        }}
                    />
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <CustomDropDownFullWidth
                        selectedValue={selInteractionTypeDesc}
                        data={masterReducer.masterdataData.INTXN_TYPE}
                        onChangeText={(text) => {
                            setSelInteractionTypeDesc(text.description)
                            setSelInteractionTypeVal(text.code)
                            // dispatch(
                            //     setInteractionFormField({
                            //         field: "interactionType",
                            //         value: text,
                            //         clearError: true,
                            //     })
                            // );
                        }}
                        value={selInteractionTypeVal}
                        caption={strings.intractionType}
                        placeHolder={strings.sel_interaction_type}
                    />

                    {interactionType.error && showErrorMessage(interactionType.error)}
                </View>

                <View style={{ paddingVertical: 10 }}>
                    <CustomInput
                        value={mobileNo}
                        keyboardType="numeric"
                        maxLength={mobileNoMaxLength}
                        caption={strings.primary_contact_number}
                        placeHolder={strings.enter_primary_contact_number}
                        onChangeText={(text) => {
                            text = text.replace(/[^0-9]/g, '')
                            onMobileNoChange(text)
                            // dispatch(
                            //   setInteractionFormField({
                            //     field: "remarks",
                            //     value: text,
                            //     clearError: true,
                            //   })
                            // );
                        }}
                    />
                </View>


                {/* Bottom Button View */}
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "transparent",
                        marginHorizontal: 15,
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >

                    <View style={{ flex: 1 }}>
                        <CustomButton
                            label={strings.clear}
                            onPress={() => {
                                setInteractionNo("")
                                setCustomerName("")
                                setMobileNo("")
                                setSelInteractionTypeDesc("")
                                setSelInteractionTypeDesc("")
                            }}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <CustomButton
                            isDisabled={false}
                            // loading={loaderAdd}
                            label={strings.search}
                            onPress={async () => {
                                if ((interactionNo == "") && (customerName == "") && (selInteractionTypeVal == "") && (mobileNo == "")) {
                                    Toast.show({
                                        type: "bctError",
                                        text1: strings.int_search_err_msg,
                                    });
                                }
                                else {
                                    const customerUUDI = await getCustomerUUID();

                                    let params = {
                                        searchParams: {
                                            interactionNumber: interactionNo,
                                            interactionType: selInteractionTypeVal,
                                            customerName: customerName,
                                            contactNumber: parseInt(mobileNo),
                                            customerUuid: customerUUDI
                                        }
                                    }

                                    navigation.navigate(STACK_INTERACTION_SEARCH_RESULT, {
                                        interactionSearchParams: params
                                    })
                                }
                            }}
                        />
                    </View>

                </View>

            </View>

        </ScrollView>
    );
};


const styles = StyleSheet.create({
    logo: {
        height: "100%",
    },
    container: {
        flex: 1,
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "white",
        borderRightColor: color.BCAE_PRIMARY,
        borderRightWidth: 400,
        borderTopWidth: 200,
        borderTopColor: "white",
    },
    highlightText: {
        color: "#202223",
        textAlign: "left",
        fontSize: fontSizes.FONT_19 * 2,
        fontWeight: "600",
        lineHeight: spacing.HEIGHT_27 * 2,
    },
});
export default InteractionSearch;
