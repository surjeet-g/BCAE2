import React from "react";
import {
    FlatList, StyleSheet, Text, View
} from "react-native";


const defaultCircleSize = 16;
const defaultCircleColor = "#495470";
const defaultLineWidth = 2;
const defaultLineColor = "#495470";
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle = "none";

export const Timeline = () => {
    const _renderSeparator = () => {

        return <View style={[styles.separator]} />;
    }

    const _renderDetail = (rowData, sectionID, rowID) => {
        let title = rowData.description ? (
            <View>
                <Text style={[styles.title]}>
                    {rowData.title}
                </Text>
                <Text style={[styles.description]}>
                    {rowData.description}
                </Text>
            </View>
        ) : (
            <Text style={[styles.title, this.props.titleStyle]}>{rowData.title}</Text>
        );
        return <View style={styles.container}>{title}</View>;
    }
    const _renderCircle = (rowData, sectionID, rowID) => {
        var circleSize = defaultCircleSize;
        var circleColor = defaultCircleColor;
        var lineWidth = defaultLineWidth;

        var circleStyle = null;

        circleStyle = {
            // width: circleSize,
            // height: circleSize,
            // borderRadius: circleSize / 2,
            // backgroundColor: circleColor,
            left: 12
        };


        var innerCircle = null;



        let dotStyle = {
            height: 8,
            width: 8,
            borderRadius: 10,
            backgroundColor: "#495470"
        };
        innerCircle = <View style={[dotStyle]} />;

        return (
            <View style={[styles.circle, circleStyle]}>
                {innerCircle}
            </View>
        );
    }
    const renderEvent = (rowData, sectionID, rowID) => {
        const lineWidth = 1;
        const isLast = false;
        const lineColor = "rgba(0,0,0,0)"
        let opStyle = null;


        opStyle = {
            borderColor: "#D9D9D9",
            borderLeftWidth: lineWidth,
            borderRightWidth: 0,
            marginLeft: 20,
            paddingLeft: 20,
            marginTop: -12
        };


        return (
            <View
                style={[styles.details, opStyle]}

            >
                <View

                >
                    <View style={styles.detail}>
                        {_renderDetail(rowData, sectionID, rowID)}
                    </View>


                </View>
            </View>
        );
    }
    const renderRow = ({ item, index }) => {
        const sectionID = 2
        const rowID = index
        let content = null;


        content = (
            <View style={[styles.rowContainer]}>

                {renderEvent(item, sectionID, rowID)}
                {_renderCircle(item, sectionID, rowID)}
            </View>
        );



        return <View key={rowID}>{content}</View>;
    }



    return (
        <View style={[styles.container]}>
            <FlatList

                style={[styles.listview]}
                data={[
                    { description: "New", title: "Assing to self 3 mar 12:" },
                    { description: "Assigned", title: "title" },

                ]}
                renderItem={renderRow}
                automaticallyAdjustContentInsets={false}

            />
        </View>
    );

}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor,
    innerCircle: defaultInnerCircle,
    columnFormat: "single-column-left",
    separator: false,
    showTime: true
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listview: {
        flex: 1
    },
    sectionHeader: {
        marginBottom: 15,
        backgroundColor: "#007AFF",
        height: 30,
        justifyContent: "center"
    },
    sectionHeaderText: {
        color: "#FFF",
        fontSize: 18,
        alignSelf: "center"
    },
    rowContainer: {
        flexDirection: "row",
        flex: 1,
        //alignItems: 'stretch',
        justifyContent: "center"
    },
    timeContainer: {
        minWidth: 45
    },
    time: {
        textAlign: "right",
        color: defaultTimeTextColor
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 10,
        position: "absolute",
        left: -8,
        alignItems: "center",
        justifyContent: "center"
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#495470"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000"
    },
    details: {
        borderLeftWidth: defaultLineWidth,
        flexDirection: "column",
        flex: 1
    },
    detail: { paddingTop: 10, paddingBottom: 10 },
    description: {
        marginTop: 3
    },
    separator: {
        height: 1,
        backgroundColor: "#aaa",
        marginTop: 10,
        marginBottom: 10
    }
});
