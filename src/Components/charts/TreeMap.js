import * as d3 from 'd3'
import React from 'react'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SvgC from 'react-native-svg'
const { Rect, G, Svg } = SvgC

const TreeMap = (props) => {
    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height

    const root = d3
        .hierarchy(props.data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value)
    const treemapRoot = d3
        .treemap()
        .size([windowWidth, windowHeight])
        .padding(1)(root)

    const fader = (color) => d3.interpolateRgb(color, '#fff')(0.3)
    const colorScale = d3.scaleOrdinal(
        d3.schemeCategory10.map(fader)
    )
    return (
        <SafeAreaView>
            <Svg
                height={windowHeight}
                width={windowWidth}
                viewBox={`0 0 ${windowWidth} ${windowHeight}`}
            >
                {treemapRoot.leaves().map((leave) => {
                    return (
                        <G
                            transform={`translate(${leave.x0},${leave.y0}`}
                            onPress={() => console.log('hello')}
                        >
                            <Rect
                                x={leave.x0}
                                y={leave.y0}
                                width={leave.x1 - leave.x0}
                                height={leave.y1 - leave.y0}
                                fill={colorScale(leave.data.category)}
                            />
                        </G>
                    )
                })}
            </Svg>
        </SafeAreaView>
    )
}

export default TreeMap