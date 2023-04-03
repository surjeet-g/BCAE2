import get from 'lodash.get';
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { Card } from 'react-native-paper';
import { commonStyle } from '../../Utilities/Style/commonStyle';

export const BarChartItems = () => {

    // input sample data
    const data = {
        labels: ["Mar 1", "Mar 3", "Mar 6", "Mar 12"],
        legend: ["Direct", "VC", "AC", "fddsf"],
        data: [
            [2, 3, 2],
            [2, 3, 2],
            [2, 3, 2],
            [2, 3, 2],
        ],
        barColors: ["#4c5a81", "#eea848", "#d9d9d9"]

    };
    var { height, width } = Dimensions.get('screen');
    console.log('>>', get(data, 'data.length', 0))
    if (get(data, 'data.length', 0) == 0) return null
    const legend = get(data, 'legend', []);

    return (
        <Card style={{ backgroundColor: "white", padding: 5, paddingTop: 15 }}>
            <View style={commonStyle.row_start_center}>
                {legend.length && legend.map((it, idx) => {
                    return (
                        <View key={it} style={commonStyle.row_start_center}>
                            <View style={{
                                marginLeft: idx == 0 ? 12 : 50,
                                marginRight: 4,
                                width: 10, height: 10, borderRadius: 2,
                                backgroundColor: get(data, `barColors[${idx}]`)
                            }} />
                            <Text style={{ fontSize: 12 }}>{it}</Text>
                        </View>
                    )
                })}
            </View>
            <StackedBarChart
                style={{


                }}
                data={data}
                width={width * .9}
                height={220}
                hideLegend={true}
                chartConfig={{
                    //bar width

                    barPercentage: 1.3,
                    barRadius: 2,
                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    //horizontal line indicator
                    color: (opacity = 1) => `white`,
                    labelColor: (opacity = 1) => `black`,
                    style: {
                        borderRadius: 3
                    },
                    propsForDots: {
                        // r: "61",
                        // strokeWidth: "10",
                        // stroke: "#ffa726"
                    }
                }}
            />
        </Card>
    )
}