import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Text } from "react-native-paper";
import RNRestart from "react-native-restart/src";
import { useDispatch, useSelector } from "react-redux";
import { ClearSpace } from "../../Components/ClearSpace";
import { CustomButton } from "../../Components/CustomButton";
import { CustomDropDownFullWidth } from "../../Components/CustomDropDownFullWidth";
import { fetchProfileRoles, switchUserRole } from "../../Redux/ProfileDispatcher";
import { getDataFromDB, saveDataToDB } from "../../Storage/token";
import { color, fontSizes, spacing, storageKeys } from "../../Utilities/Constants/Constant";
import { strings } from "../../Utilities/Language";
import { navBar } from "../../Utilities/Style/navBar";
import { getUserId } from "../../Utilities/UserManagement/userInfo";

var { height, width } = Dimensions.get("screen");

/**
* Search for interaction in this screen
* @namespace SwitchRole
*/
const SwitchRole = ({ navigation }) => {

    let profileReducer = useSelector((state) => state.profile);

    const [selDeptName, setSelDeptName] = useState("");
    const [selDeptDesc, setSelDeptDesc] = useState("");
    const [selDeptVal, setSelDeptVal] = useState("");
    const [selDeptRoles, setSelDeptRoles] = useState([]);

    const [selRoleName, setRoleName] = useState("");
    const [selRoleDesc, setRoleDesc] = useState("");
    const [selRoleVal, setRoleVal] = useState("");

    const [selUserId, setUserId] = useState("");

    const [currRoleDesc, setCurrRoleDesc] = useState("");
    const [currDeptDesc, setCurrDeptDesc] = useState("");

    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => {
                return (
                    <View>
                        <View style={navBar.navRightCon}>
                            {/* <Pressable onPress={() => setShowPopupMenu(!showPopupMenu)}> */}
                            {/* <Image
                                    style={{ margin: 10 }}
                                    source={require("../../Assets/icons/ic_more_vertical.png")}
                                /> */}
                            {/* </Pressable> */}
                        </View>
                    </View>
                );
            },
        });

    }, []);

    useEffect(async () => {

        console.log("current role...", await getDataFromDB(storageKeys.CURRENT_ROLE_DESC));
        console.log("current dept...", await getDataFromDB(storageKeys.CURRENT_DEPT_DESC));


        setCurrRoleDesc(await getDataFromDB(storageKeys.CURRENT_ROLE_DESC))
        setCurrDeptDesc(await getDataFromDB(storageKeys.CURRENT_DEPT_DESC))

        dispatch(
            fetchProfileRoles()
        )
        console.log("profileRolesData got..", profileReducer.profileRolesData);

        setUserId(await getUserId())
        console.log("userId got..", selUserId);

    }, [])


    const dispatch = useDispatch([
        fetchProfileRoles,
        switchUserRole
    ]);


    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} nestedScrollEnabled={true}>

            {/* Field View */}
            <View style={{ marginHorizontal: 20, marginTop: 60 }}>

                <Card style={{ backgroundColor: "white", padding: 20, elevation: 10, marginTop: 13, marginLeft: 3, marginRight: 3 }}>
                    <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
                        <Text style={{ marginTop: 0, marginLeft: 10 }}>Current Role :</Text>
                        <Text style={{ marginTop: 3, marginLeft: 10, fontWeight: "bold" }}>{currRoleDesc}</Text>
                    </View>

                    <View style={{ backgroundColor: "transparent", flexDirection: "column" }}>
                        <Text style={{ marginTop: 10, marginLeft: 10 }}>Current Department :</Text>
                        <Text style={{ marginTop: 3, marginLeft: 10, fontWeight: "bold" }}>{currDeptDesc}</Text>
                    </View>

                    <ClearSpace size={2} />
                </Card>

                <View style={{ paddingVertical: 10 }}>

                    <CustomDropDownFullWidth
                        selectedValue={selDeptDesc}
                        data={
                            profileReducer.profileRolesData.data?.map(item => {
                                return { description: item.unitDesc, code: item.unitId, name: item.unitName }
                            })
                        }
                        onChangeText={(text) => {
                            setSelDeptDesc(text.description)
                            setSelDeptVal(text.code)
                            setSelDeptName(text.name)

                            profileReducer.profileRolesData.data?.map(item => {
                                if (item.unitId == text.code) {
                                    setSelDeptRoles(item.roles)
                                }
                            })
                        }}
                        value={selDeptVal}
                        caption={strings.sel_department}
                        placeHolder={strings.sel_department}
                    />

                    {/* {interactionType.error && showErrorMessage(interactionType.error)} */}
                </View>

                <View style={{ paddingVertical: 10 }}>

                    <CustomDropDownFullWidth
                        selectedValue={selRoleDesc}
                        data={
                            selDeptRoles?.map(item => {
                                return { description: item.roleDesc, code: item.roleId, name: item.roleName }
                            })
                        }
                        onChangeText={(text) => {
                            setRoleDesc(text.description)
                            setRoleVal(text.code)
                            setRoleName(text.name)
                        }}
                        value={selRoleVal}
                        caption={strings.sel_role}
                        placeHolder={strings.sel_role}
                    />

                    {/* {interactionType.error && showErrorMessage(interactionType.error)} */}
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
                            isDisabled={false}
                            // loading={loaderAdd}
                            label={strings.switch}
                            onPress={async () => {

                                dispatch(
                                    switchUserRole(
                                        selUserId,
                                        selDeptName,
                                        selDeptDesc,
                                        selDeptVal,
                                        selRoleName,
                                        selRoleDesc,
                                        selRoleVal,
                                        navigation
                                    )
                                )

                                console.log("profileSwitchedData...", profileReducer.profileSwitchedData);

                                if (profileReducer.profileSwitchedData.status == 200) {
                                    console.log("selRoleDesc..." + selRoleDesc);
                                    console.log("selDeptDesc..." + selDeptDesc);
                                    console.log("selRoleVal..." + selRoleVal);
                                    console.log("selDeptVal..." + selDeptVal);

                                    await saveDataToDB(storageKeys.CURRENT_ROLE_DESC, selRoleDesc);
                                    await saveDataToDB(storageKeys.CURRENT_DEPT_DESC, selDeptDesc);
                                    await saveDataToDB(storageKeys.CURRENT_ROLE_ID, selRoleVal);
                                    await saveDataToDB(storageKeys.CURRENT_DEPT_ID, selDeptVal);

                                    console.log("role..." + await getDataFromDB(storageKeys.CURRENT_ROLE_DESC));
                                    console.log("dept..." + await getDataFromDB(storageKeys.CURRENT_DEPT_DESC));

                                    setCurrRoleDesc(await getDataFromDB(storageKeys.CURRENT_ROLE_DESC))
                                    setCurrDeptDesc(await getDataFromDB(storageKeys.CURRENT_DEPT_DESC))

                                    RNRestart.restart();
                                }

                                // console.log("profileSwitchedData..", profileReducer.profileSwitchedData == {});
                                // console.log("profileSwitchedErrorData..", profileReducer.profileSwitchedErrorData == {});
                                // navigation.navigate("HomeScreen")
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
export default SwitchRole;
