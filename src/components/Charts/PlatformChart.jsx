import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types'
import {
  commonTitleStyle,
  commonLegendStyle,
  commonLabelStyle,
  chartColors,
} from './commonChartStyles'

function PlatformChart({ data, title }) {
  const option = {
    color: chartColors,
    title: {
      text: title,
      left: 'center',
      ...commonTitleStyle,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      ...commonLegendStyle,
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'], // This creates the doughnut effect
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c} ({d}%)',
          ...commonLabelStyle,
        },
        data: data
      }
    ]
  };

  return (
    <div className="platform-chart elevated">
      <ReactECharts option={option} style={{ height: '100%' }} />
    </div>
  );
}

PlatformChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default PlatformChart;