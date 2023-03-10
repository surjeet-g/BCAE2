import React from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";

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
        <View style={{
            backgroundColor: 'transparent',
        }}>
            {/* header */}
            <View style={{
                backgroundColor: "white",
                height: open ? height : 100,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                ...SHADOW_STYLE

            }}>
                {open &&
                    <Pressable
                        onPress={() => {
                            setOpen(false)
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                            backgroundColor: "black",
                            position: "absolute",
                            right: 19,
                            top: 12,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text style={{ color: 'white', fontSize: 10, textAlign: "center" }}> x </Text>
                    </Pressable>
                }


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