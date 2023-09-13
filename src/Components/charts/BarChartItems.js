import get from "lodash.get";
import { Dimensions } from "react-native";

export const BarChartItems = (props) => {

    console.log("BarChartItems props..", props?.data);


    const summaryList = props?.data?.data

    const xAxisData = [...new Set(summaryList?.map(item => item.oPriority))];
    const priorities = [...new Set(summaryList?.map(item => item.oPriority))];
    const statuses = [...new Set(summaryList?.map(item => item.oStatus))];

    const series = statuses?.map(status => {
        const respData = priorities?.map(priority => {
            const matchingItem = summaryList.find(item => item.oStatus === status && item.oPriority === priority);
            return matchingItem ? matchingItem.oCnt : 0;
        });
        return respData
    })

    console.log('xAxisData------>', xAxisData)
    console.log('statuses------>', statuses)
    console.log('series------>', series)

    // input sample data

    const data = {
        labels: xAxisData,
        legend: statuses,
        data: series,
        // data: [
        //     [2, 3, 2],
        //     [2, 2, 4],
        //     [2, 6, 2],
        // ],
        barColors: ["#3498DB", "#58D68D", "#F5B041"]

    };
    var { height, width } = Dimensions.get('screen');
    console.log('>>', get(data, 'data.length', 0))
    if (get(data, 'data.length', 0) == 0) return null
    const legend = get(data, 'legend', []);

}