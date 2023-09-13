import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Chart = (props) => {
  const chartRef = useRef(null);

  const chartData = props?.data?.chartData || []
  console.log('chartData-----xc-->', chartData);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const wipData = chartData.filter(item => item.oStatus === 'WIP').map(item => parseInt(item.oCnt));
    const closedData = chartData.filter(item => item.oStatus === 'CLOSED').map(item => parseInt(item.oCnt));

    const option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['WIP', 'CLOSED']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [...new Set(chartData.map(item => item.oDayMonth))]

      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'CLOSED',
          type: 'line',
          stack: 'Total',
          data: closedData,
          lineStyle: {
            color: '#5470C6',
            width: 9
          }
        },
        {
          name: 'WIP',
          type: 'line',
          stack: 'Total',
          data: wipData,
          lineStyle: {
            color: 'rgb(0, 229, 150)',
            width: 9,
            type: 'dashed'
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: 'rgb(0, 227, 150)',
            color: 'rgb(0, 227, 150)'
          }
        }
      ]
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);

    return () => {
      window.removeEventListener('resize', myChart.resize);
      myChart.dispose();
    };
  }, [props.data.chartData]);

  return <div ref={chartRef} style={{ width: '100%', height: '455px' }}></div>;
};

export default Chart;