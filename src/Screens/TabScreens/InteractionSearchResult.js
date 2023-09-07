import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
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


    useEffect(async () => {
        dispatch(getInteractionDetailsSearch(interactionSearchParams, navigation));
        console.log("search data..", interactionReducer.interactionSearchData[0]);

    }, []);




    const renderItem = ({ item }) => (
        <Pressable
            style={{
                borderRadius: 6,
                borderWidth: 0,
                borderColor: "#AEB3BE",
                padding: 0,
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                justifyContent: "center",
                alignItems: "center",
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


    return (
        <View style={{ flex: 1, marginTop: 50, marginLeft: 15, marginRight: 15 }}>
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
            margin: 5,
            padding: 10,
            backgroundColor: "#FFF",
            borderRadius: 10,
            elevation: 5,
        }}>


            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.interaction_number}</Text>
                    <Text style={{ fontWeight: "bold" }}>{body.intxnNo}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.intractionType}</Text>
                    <Text style={{ fontWeight: "bold" }}>{body.intxnType.description}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.status}</Text>
                    <Text style={{ fontWeight: "bold" }}>{body.intxnStatus.description}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.customer_name}</Text>
                    <Text style={{ fontWeight: "bold" }}>{body.customerDetails.firstName} {body.customerDetails.lastName}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.serviceType}</Text>
                    <Text style={{ fontWeight: "bold" }}>{body.serviceType.description}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.assigned}</Text>
                    <Text style={{ fontWeight: "bold" }}>{""}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.created_date}</Text>
                    <Text style={{ fontWeight: "bold" }}>{moment(body.createdAt).format("DD MMM YYYY HH:MM:SS")}</Text>
                </View>

                <View style={{ flexDirection: "column", width: 150, marginHorizontal: 10 }}>
                    <Text style={{ fontWeight: "normal" }}>{strings.created_by}</Text>
                    <Text style={{ fontWeight: "bold" }}>{body.createdBy.firstName} {body.createdBy.lastName}</Text>
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
