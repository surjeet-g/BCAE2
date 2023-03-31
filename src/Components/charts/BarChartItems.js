import get from 'lodash.get';
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { commonStyle } from '../../Utilities/Style/commonStyle';

export const BarChartItems = ({ data }) => {

    // input sample data
    // const data = {
    //     labels: ["Mar 1", "Mar 3", "Mar 6"],
    //     legend: ["Direct", "VC", "AC"],
    //     data: [
    //       [2, 3, 2],
    //       [2, 3, 2],
    //       [2, 3, 2],
    //     ],
    //     barColors: ["gray", "green", "yellow"]
    //   };
    var { height, width } = Dimensions.get('screen');
    console.log('>>', get(data, 'data.length', 0))
    if (get(data, 'data.length', 0) == 0) return null
    const legend = get(data, 'legend', []);

    return (
        <View>
            <View style={commonStyle.row_space_arround_evenly}>
                {legend.length && legend.map((it, idx) => {
                    return (
                        <View key={it} style={commonStyle.row_start_center}>
                            <View style={{
                                width: 10, height: 10, borderRadius: 2,
                                backgroundColor: get(data, `barColors[${idx}]`)
                            }} />
                            <Text >{it}</Text>
                        </View>
                    )
                })}
            </View>
            <StackedBarChart
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                data={data}
                width={width}
                height={220}
                hideLegend={true}
                chartConfig={{
                    //bar width
                    barPercentage: 1.3,
                    barRadius: 1,

                    backgroundColor: "white",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 2, // optional, defaults to 2dp
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
        </View>
    )
}