import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyle } from '../../Utilities/Style/commonStyle';

export const LineCharts = () => {
    return (
        <View style={styles.container}>

            {[50, 20, 30].map((item, idx) => {
                return (
                    <View key={idx} style={{ ...commonStyle.row_space_arround_evenly, alignItems: 'center', borderRadius: 10 }}>
                        <Text style={{ flex: .15 }}>18 -30</Text>
                        <View style={{ flex: .6, backgroundColor: "gray", height: 5, borderRadius: 4 }}>
                            <View style={{ backgroundColor: "yellow", width: `${item}%`, height: 5, }} />

                        </View>
                        <Text style={{ flex: .15 }}>{item}</Text>
                    </View>
                )
            })
            }



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
});