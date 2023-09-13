import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";

export const PieCharts = (props) => {



    return (
        <View style={{ backgroundColor: "white", paddingHorizontal: 0 }}>


            <PieChart
                data={data}

                width={width * 1}
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