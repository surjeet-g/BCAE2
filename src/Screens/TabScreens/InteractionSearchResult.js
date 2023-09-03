import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
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
    // interactionID = parseInt(interactionSearchParams)
    console.log("interactionSearchParams..", interactionSearchParams);

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
        console.log("search data..", interactionReducer.interactionSearchData);
    }, []);


    const renderItem = ({ item }) => (
        <Item body={item} />
    );
    return (
        <View style={{ flex: 1, marginTop: 60 }}>
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

        <View style={{ flexDirection: "column", padding: 10, marginTop: 15, marginLeft: 20, marginRight: 20, backgroundColor: "#D7E5FF" }}>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.interaction_number}</Text>
                    <Text style={{ fontWeight: "normal" }}>{body.intxnNo}</Text>
                </View>

                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.intractionType}</Text>
                    <Text style={{ fontWeight: "normal" }}>{body.intxnType.description}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.status}</Text>
                    <Text style={{ fontWeight: "normal" }}>{body.intxnStatus.description}</Text>
                </View>

                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.customer_name}</Text>
                    <Text style={{ fontWeight: "normal" }}>{body.customerDetails.firstName} {body.customerDetails.lastName}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.serviceType}</Text>
                    <Text style={{ fontWeight: "normal" }}>{body.serviceType.description}</Text>
                </View>

                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.assigned}</Text>
                    <Text style={{ fontWeight: "normal" }}>{""}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", margin: 5 }}>
                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.created_date}</Text>
                    <Text style={{ fontWeight: "normal" }}>{moment(body.createdAt).format("DD MMM YYYY HH:MM:SS")}</Text>
                </View>

                <View style={{ flexDirection: "column", minWidth: 150, marginHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{strings.created_by}</Text>
                    <Text style={{ fontWeight: "normal" }}>{body.createdBy.firstName} {body.createdBy.lastName}</Text>
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
