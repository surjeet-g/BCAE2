import React from "react";
import { Dimensions, View } from "react-native";
import { ProgressChart } from 'react-native-chart-kit';

export const ProgressBarCharts = () => {

    const data = {
        labels: ["sfsdf", "satification"], // optional
        data: [0.9, 0.1]
    };
    var { height, width } = Dimensions.get('screen');

    return (
        <View>

            <ProgressChart
                data={data}
                width={width - 15}
                height={220}
                chartConfig={{
                    //backgroundColor: '#478438',
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    //decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(76, 90, 129, ${opacity})`,
                }}
                style={{
                    borderRadius: 15,
                }}

            // hideLegend={false}
            />
        </View>
    )
}