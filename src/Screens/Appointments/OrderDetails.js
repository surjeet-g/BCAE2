import { Colors } from "chart.js";
import React, { useLayoutEffect, useState } from "react";
import {
    Dimensions,
    ScrollView, StyleSheet, Text, View, unstable_batchedUpdates
} from "react-native";
import { CustomDropDownFullWidth } from "../../Components/CustomDropDownFullWidth";
import { strings } from "../../Utilities/Language";

var { height, width } = Dimensions.get("screen");


const OrderDetails = (props) => {
    const { route, navigation } = props;
    let { orderParams } = route.params
    console.log("orderParams...", orderParams)

    const [statusCode, setStatusCode] = useState("");
    const [statusDesc, setStatusDesc] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View>
                        {/* <View style={navBar.navRightCon}>
                            <Pressable onPress={() => setShowPopupMenu(!showPopupMenu)}>
                                <Image
                                    style={{ margin: 10 }}
                                    source={require("../../Assets/icons/ic_more_vertical.png")}
                                />
                            </Pressable>
                        </View> */}
                    </View>
                );
            },
        });
    }, []);

    var statusData = []
    statusData.push({ code: "ASG", description: "Assigned" })
    statusData.push({ code: "CAN", description: "Cancelled" })
    statusData.push({ code: "COMP_SUCC", description: "Completed Successfully" })
    statusData.push({ code: "COMP_UNSUCC", description: "Completed UnSuccessfully" })
    statusData.push({ code: "RESCH", description: "Rescheduled" })

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollviewContainer} nestedScrollEnabled={true}>
                <View style={{
                    margin: 5,
                    padding: 20,
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    elevation: 5,
                }}>
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                }}
                            >
                                {strings.customer_ID}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5
                                }}
                            > {orderParams.orderParams.customer_no}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                    marginTop: 15
                                }}
                            >
                                {strings.customer_name}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                }}
                            >{orderParams.orderParams.first_name} {orderParams.orderParams.last_name}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                    marginTop: 15
                                }}
                            >
                                {strings.order_no}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                }}
                            >{orderParams.orderParams.tran_category_no}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                    marginTop: 15
                                }}
                            >
                                {strings.order_category}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                }}
                            >{orderParams.orderParams.category_details}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                    marginTop: 15
                                }}
                            >
                                {strings.order_type}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                }}
                            >{orderParams.orderParams.type_details}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                    marginTop: 15
                                }}
                            >
                                {strings.service_type}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                }}
                            >
                            </Text>
                        </View>

                        <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                    marginTop: 15
                                }}
                            >
                                {strings.channel}
                            </Text>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={2}
                                style={{
                                    fontWeight: 800,
                                    fontSize: 16,
                                    width: width - 30,
                                    color: Colors.secondary,
                                    flex: 2,
                                    marginRight: 5,
                                }}
                            >
                            </Text>
                        </View>

                        <View style={{ marginTop: 15, flexDirection: "column", flex: 1 }}>
                            <CustomDropDownFullWidth
                                selectedValue={statusDesc}
                                data={statusData}
                                onChangeText={(text) => {
                                    unstable_batchedUpdates(() => {
                                        setStatusCode(text.code)
                                        setStatusDesc(text.description)
                                    })
                                }}
                                value={statusCode}
                                caption={strings.appointment_status}
                                placeHolder={"Select " + strings.status}
                            />
                        </View>

                    </View>
                </View>

            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        paddingTop: 50,
    },
    scrollviewContainer: {
        margin: 15,
        backgroundColor: "#F0F0F0",
    },
    interactionHistoryView: {
        borderRadius: 10,
        backgroundColor: "#DADADA",
        width: "80%",
        marginTop: 20,
        alignSelf: "center",
        elevation: 2,
        flexDirection: "column",
        padding: 10,
    },
    interactionHistoryTxt: {
        color: "#000000",
        fontWeight: 600,
        fontSize: 16,
        textAlign: "center",
        marginVertical: 5,
    },
    interactionHistoryItemView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    interactionHistoryItemTitleTxt: {
        fontWeight: 400,
        fontSize: 14,
        color: "#4A4A4A",
        textAlign: "center",
    },
    interactionHistoryItemValueTxt: {
        fontWeight: 700,
        fontSize: 16,
        color: "#000000",
        marginTop: 5,
    },
    profileInfoItemView: {
        flex: 1,
        flexDirection: "column",
    },
    profileInfoItemTitleTxt: {
        fontWeight: 600,
        fontSize: 14,
        color: "#000000",
    },
    profileInfoItemValueTxt: {
        fontWeight: 400,
        fontSize: 12,
        color: "#000000",
        marginTop: 5,
    },
    profileInfoView: {
        margin: 5,
        padding: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        elevation: 5,
    },
    profileInfoTitleTxt: {
        fontWeight: 700,
        color: "#000000",
    },
    profileInfoSubTitleTxt: {
        fontWeight: 400,
        color: "#000000",
    },
    profileInfoImg: { height: 60, width: 60, borderRadius: 10 },
});
export default OrderDetails;
