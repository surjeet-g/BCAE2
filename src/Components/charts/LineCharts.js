import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from 'react-native-paper';
import { commonStyle } from '../../Utilities/Style/commonStyle';

export const LineCharts = () => {
    const colors = ["#3e73cc", "#4b5a81", "#eda848", "#3fba4d"]
    return (
        <Card style={{ backgroundColor: "white", paddingVertical: 15, paddingHorizontal: 10 }}>
            {[50, 20, 30].map((item, idx) => {
                return (
                    <View key={idx} style={{
                        ...commonStyle.row_space_arround_evenly,
                        alignItems: 'center', borderRadius: 10,
                        marginBottom: 12
                    }}>
                        <Text style={{ flex: .15 }}>18 -30</Text>
                        <View style={{ flex: .7, elevation: 1, backgroundColor: "gray", height: 5, borderRadius: 4 }}>
                            <View style={{ backgroundColor: colors[idx], width: `${item}%`, height: 5, }} />

                        </View>
                        <Text style={{ flex: .1, marginLeft: 9, textAlign: "center" }}>{item}%</Text>
                    </View>
                )
            })
            }



        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
});