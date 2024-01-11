import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../../Components/LoadingAnimation";
import { STACK_INTERACTION_DETAILS } from "../../Navigation/MyStack";
import { getInteractionDetailsSearch } from "../../Redux/InteractionDispatcher";
import { strings } from "../../Utilities/Language";
import { navBar } from "../../Utilities/Style/navBar";
var { height, width } = Dimensions.get("screen");


/**
* Search result for interaction in this screen
* @namespace InteractionSearchResult
*/
const InteractionSearchResult = ({ route, navigation }) => {

    const [loader, setLoader] = useState(true);

    let { interactionSearchParams } = route.params
    // let params = parseInt(interactionSearchParams)
    // console.log("params sent..", params);

    const dispatch = useDispatch([getInteractionDetailsSearch]);

    const [showPopupMenu, setShowPopupMenu] = useState(false);

    let interactionReducer = useSelector((state) => state.interaction);



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


    useEffect(() => {
        async function getData() {
            setLoader(true)
            await dispatch(await getInteractionDetailsSearch(interactionSearchParams, navigation));
            console.log("search data..", interactionReducer.interactionSearchData[0]);
            setLoader(false)
        }
        getData()
    }, []);


    const renderItem = ({ item }) => (
        <Pressable
            style={{
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginTop: 20,
                padding: 10,
                backgroundColor: "#FFF",
                borderRadius: 10,
                elevation: 5
            }}



            onPress={() => {
                let params = {

                    interactionSearchParams: interactionReducer.interactionSearchData[0]

                }

                navigation.navigate(STACK_INTERACTION_DETAILS, {
                    interactionSearchParams: params
                })
            }
            }
        >
            <Item body={item} />
        </Pressable>
    );

    console.log("intxn data...", interactionReducer.interactionSearchData)

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1, marginTop: 50, marginLeft: 15, marginRight: 15 }}>
            {loader && <LoadingAnimation />}

            {interactionReducer.interactionSearchData == undefined && (
                <Text style={{ color: "#000", alignSelf: "center", padding: 5, fontWeight: "400" }}>No Data Available</Text>
            )}

            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                data={interactionReducer.interactionSearchData}
                renderItem={renderItem}
                keyExtractor={item => item}
            />

        </View>
    );
};



const Item = ({ body }) => {
    return (

        <View style={{
            flexDirection: "column",
            marginLeft: 10,
            padding: 0,
            backgroundColor: "#FFF"
        }}>


            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.interaction_number}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{body.intxnNo}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.intractionType}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{body.intxnType.description}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.status}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{body.intxnStatus.description}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.employee}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{body.customerDetails.firstName} {body.customerDetails.lastName}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.serviceType}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{body.serviceType.description}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.assigned}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{""}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.created_date}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{moment(body.createdAt).format("DD MMM YYYY HH:MM:SS")}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "normal" }}>{strings.created_by}</Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>{body.createdBy.firstName} {body.createdBy.lastName}</Text>
                </View>
            </View>

        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        padding: 10,
        flexDirection: "column",
        backgroundColor: "#D7E5FF",
    },
    item: {
        backgroundColor: '#f5f520',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});


export default InteractionSearchResult;
