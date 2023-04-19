import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ClearSpace } from '../../../../Components/ClearSpace';

export const HandleResolution = ({ suggestionList = [] }) => {
    return (
        <View style={styles.bottomContainer}>
            <ClearSpace size={4} />

            <View
                style={{
                    padding: 8,
                    paddingLeft: 10,
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignItems: "center",

                    borderRadius: 10,

                }}
            >
                {suggestionList.length != 0 &&
                    suggestionList.map((item, idx) => {
                        return (<Text key={idx} style={{ marginBottom: 5 }}> {JSON.stringify(item.message)}</Text>)
                    })}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        paddingHorizontal: 10,
    },
})