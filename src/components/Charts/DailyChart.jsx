import ReactECharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import {
  commonTitleStyle,
  chartColors,
} from './commonChartStyles'

function DailyChart({ data, title }) {
  const option = {
    color: chartColors,
    title: {
      text: title,
      left: 'center',
      ...commonTitleStyle,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.xAxisData,
      axisLabel: {
        color: '#fff',
        fontSize: 12,
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    series: data.series.map((series) => ({
      name: series.name,
      type: 'bar',
      barWidth: '60%',
      data: series.data,
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 12,
      },
    })),
  }

  return (
    <div
      className="daily-chart elevated"
      style={{ width: '100%', height: '400px' }}
    >
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
        onEvents={{
          finished: () => {
            window.dispatchEvent(new Event('resize'))
          },
        }}
      />
    </div>
  )
}

DailyChart.propTypes = {
  data: PropTypes.shape({
    xAxisData: PropTypes.arrayOf(PropTypes.string).isRequired,
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
    ).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

export default DailyChart
