import ReactECharts from 'echarts-for-react'
import PropTypes from 'prop-types'
import {
  commonTitleStyle,
  commonLegendStyle,
  chartColors,
} from './commonChartStyles'

function ListingsChart({ data, title }) {
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
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      ...commonLegendStyle,
      bottom: '5%',
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
      boundaryGap: false,
      data: data.xAxisData,
      axisLabel: {
        color: '#fff',
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff',
        fontSize: 12,
      },
    },
    series: data.series.map((series) => ({
      name: series.name,
      type: 'line',
      stack: 'Total',
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: series.data,
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
      className="listings-chart elevated"
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

ListingsChart.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default ListingsChart
