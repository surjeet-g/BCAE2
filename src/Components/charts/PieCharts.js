import React from "react";
import { Dimensions, View } from "react-native";
import { PieChart } from 'react-native-chart-kit';

export const PieCharts = () => {
    var { height, width } = Dimensions.get('screen');
    // console.log('>>', get(data, 'data.length', 0))
    // if (get(data, 'data.length', 0) == 0) return null
    // const legend = get(data, 'legend', []);
    const data = [
        {
            name: "Seoul",
            population: 21500000,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Toronto",
            population: 2800000,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Beijing",
            population: 527612,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "New York",
            population: 8538000,
            color: "#ffffff",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Moscow",
            population: 11920000,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    return (
        <View>

            <PieChart
                data={data}
                width={width}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "white",
                    backgroundGradientFromOpacity: 1,
                    backgroundGradientTo: "white",
                    backgroundGradientToOpacity: 1,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    strokeWidth: 9, // optional, default 3
                    barPercentage: 1,
                    style: {
                        // width: 200
                    },
                    useShadowColorFromDataset: false // optional
                }}
                accessor={"population"}
                backgroundColor={"transparent"}


            />
        </View>
    )
}