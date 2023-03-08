import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

import { Switch } from "react-native-paper";
import { SHADOW_STYLE } from "../Utilities/themeConfig";
import { ClearSpace } from "./ClearSpace";

var { height, width } = Dimensions.get('screen');
export const FooterModel = ({
    setOpen = () => { },
    open = false,
    children
}) => {
    return (
        <View contentContainerStyle={{
            position: "relative",
            bottom: 10,
            left: 0,
            top: 0,
            width: width * .8,
            zIndex: 9999,
            flex: 1,
            height: open ? height : 100,
            backgroundColor: 'transparent',
            ...SHADOW_STYLE

        }}>
            {/* header */}
            <View style={{
                backgroundColor: "white",
                height: open ? height : 100,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                ...SHADOW_STYLE

            }}>
                <View style={{
                    position: "relative",
                    top: 1,
                    justifyContent: "center",
                    alignItems: 'center'

                }}>
                    <ClearSpace size={4} />
                    <View style={{ width: 70, height: 3, backgroundColor: "black", borderRadius: 5 }} />
                </View>
                <ClearSpace size={2} />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        // position: "relative",
                        marginVertical: 10,
                        // flex: 1,
                        // height: 300,
                        marginHorizontal: 15,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 600,
                            color: "#202223",
                            fontSize: 16,
                            // flex: 1,
                        }}
                    >
                        {"Enable Interactions"}
                    </Text>
                    <Switch
                        value={open}
                        onValueChange={setOpen}
                    />


                </View>
                {open &&

                    <ScrollView style={{ flex: 1, marginBottom: 122 }}>
                        {children}
                    </ScrollView>


                }
            </View>

        </View>
    )
}