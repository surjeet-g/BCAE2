import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';

export const PieCharts = () => {
    var { height, width } = Dimensions.get('screen');
    // console.log('>>', get(data, 'data.length', 0))
    // if (get(data, 'data.length', 0) == 0) return null
    // const legend = get(data, 'legend', []);
    const data = [
        {
            name: "New Appointments",
            population: 25,
            color: "#a6baf0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "Cancelled Appointments",
            population: 25,
            color: "#4c5a81",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "Folloup Appointment",
            population: 35,
            color: "#6a82c3",
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },

    ];

    return (
        <Card style={{ backgroundColor: "white", paddingHorizontal: 10 }}>


            <PieChart
                data={data}

                width={width * .8}
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
        </Card>
    )
}