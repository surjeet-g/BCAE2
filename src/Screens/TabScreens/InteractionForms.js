import React, { useLayoutEffect, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { color, fontSizes, spacing } from "../../Utilities/Constants/Constant";
import { navBar } from "../../Utilities/Style/navBar";
var { height, width } = Dimensions.get("screen");

/**
* Search for interaction in this screen
* @namespace InteractionForms
*/
const InteractionForms = (props) => {

    const [loader, setLoader] = useState(true);
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const { route, navigation } = props;
    let { interactionForm } = route.params
    console.log("interactionForm received...", interactionForm)

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

            }
            }
        >
            <Item body={item} />
        </Pressable>
    );


    var dataArr = interactionForm?.interactionForm?.GRID
    // console.log("dataArr values..." + dataArr[0].name)
    var comments = interactionForm?.interactionForm?.comments
    var signature = interactionForm?.interactionForm?.signaturePad

    return (
        <View style={{ marginTop: 50, marginLeft: 15, marginRight: 15, height: height - 150 }}>
            {/* {loader && <LoadingAnimation />} */}

            {dataArr?.length > 0 && (
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    data={dataArr}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                />
            )}

            <View style={{ flexDirection: "column", marginVertical: 10, marginLeft: 10 }}>
                {comments !== undefined && (
                    <View style={{ flexDirection: "column", marginVertical: 10 }}>
                        <Text style={{ color: "#000000", fontSize: 13, fontWeight: "normal" }}>Comments : </Text>
                        <Text style={{ color: "#000000", marginTop: 10, fontSize: 13, fontWeight: "bold" }}>{comments}</Text>
                    </View>
                )}

                {signature !== undefined && (
                    <View style={{ flexDirection: "column", marginVertical: 10 }}>
                        <Text style={{ color: "#000000", fontSize: 13, fontWeight: "normal" }}>Signature : </Text>
                        <Image
                            source={{ uri: `data:image/png;base64,${signature}` }}
                            style={{ marginTop: 10, height: 152, width: 200 }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};


const Item = ({ body }) => {
    console.log("body..." + body)
    const entries = Object.entries(body);
    console.log("entries..." + entries)

    return (
        <View style={{
            flexDirection: "column",
            padding: 10,
            backgroundColor: "#FFF"
        }}>
            {entries.map(([key, value]) => (
                <View style={{ flexDirection: "row", marginVertical: 5, marginLeft: -150 }}>
                    <Text style={{ color: "#000000", fontSize: 13, fontWeight: "normal" }}>{key} : </Text>
                    <Text style={{ color: "#000000", fontSize: 13, fontWeight: "bold" }}>{value}</Text>
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    signature: {
        width: 285,
        height: 140,
        flex: 1,
        borderColor: '#00000',
        borderWidth: 1,
    },
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
export default InteractionForms;
