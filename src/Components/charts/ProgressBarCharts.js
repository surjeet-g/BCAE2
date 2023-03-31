import React from "react";
import { Dimensions, View } from "react-native";
import { ProgressChart } from 'react-native-chart-kit';

export const ProgressBarCharts = () => {

    const data = {
        labels: ["Swim"], // optional
        data: [0.4]
    };
    var { height, width } = Dimensions.get('screen');

    return (
        <View>

            <ProgressChart
                data={data}
                width={width}
                height={300}
                strokeWidth={16}
                radius={32}
                hideLegend={true}
                chartConfig={{
                    backgroundGradientFrom: "white",
                    backgroundGradientFromOpacity: 1,
                    backgroundGradientTo: "white",
                    backgroundGradientToOpacity: 1,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    strokeWidth: 9, // optional, default 3
                    barPercentage: 1,
                    style: {
                        width: 200
                    },
                    useShadowColorFromDataset: false // optional
                }}

            // hideLegend={false}
            />
        </View>
    )
}