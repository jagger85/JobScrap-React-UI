import './overview.css'
import PageLayout from '../../Layout/PageLayout'
import UserChart from '@components/Charts/UserChart'
import PlatformChart from '@components/Charts/PlatformChart'
import ListingsChart from '@components/Charts/ListingsChart'
import DailyChart from '@components/Charts/DailyChart'
import useApi from '@hooks/useApi'
import { useQuery } from '@tanstack/react-query'

function Overview() {
  const { fetchOperations } = useApi()
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['operations'],
    queryFn: fetchOperations,
  })

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Oooops something went wrong {error}</h2>

  // More detailed logging
  console.log('Fetched data:', data)
  console.log('First item in data:', data?.[0])
  console.log('Data type:', typeof data)
  console.log('Is Array?', Array.isArray(data))

  // Default data to an empty array if undefined
  const operationsData =
    data?.filter(
      (operation) =>
        operation && typeof operation === 'object' && operation.user // only include items that have a user property
    ) || []

  // Check if operationsData is empty
  if (operationsData.length === 0) {
    return <h2>No valid operations data available</h2>
  }

  // Process data for UserChart with safety checks
  const userOperations = operationsData.reduce((acc, operation) => {
    if (operation && operation.user) {
      acc[operation.user] = (acc[operation.user] || 0) + 1
    }
    return acc
  }, {})

  const userData = Object.entries(userOperations).map(([name, value]) => ({
    name,
    value,
  }))

  // Process data for PlatformChart
  const platformCounts = operationsData.reduce((acc, operation) => {
    acc[operation.platform] = (acc[operation.platform] || 0) + 1
    return acc
  }, {})

  const platformData = Object.entries(platformCounts).map(([name, value]) => ({
    name,
    value,
  }))

  // Process data for ListingsChart
  const listingsData = operationsData.reduce(
    (acc, operation) => {
      if (!operation.created_at || !operation.keywords) return acc

      const date = new Date(operation.created_at)
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`

      // Add date to xAxis if not exists
      if (!acc.xAxisData.includes(formattedDate)) {
        acc.xAxisData.push(formattedDate)
      }

      // Add keyword to legend if not exists
      if (!acc.legendData.includes(operation.keywords)) {
        acc.legendData.push(operation.keywords)
        acc.series.push({
          name: operation.keywords,
          data: new Array(acc.xAxisData.length).fill(0),
        })
      }

      // Update the count for this keyword on this date
      const seriesIndex = acc.series.findIndex(
        (s) => s.name === operation.keywords
      )
      const dateIndex = acc.xAxisData.indexOf(formattedDate)

      // Safely get listings length, default to 0 if listings is invalid
      const listingsLength = Array.isArray(operation.listings)
        ? operation.listings.filter((item) => item !== undefined).length
        : 0

      acc.series[seriesIndex].data[dateIndex] = listingsLength

      return acc
    },
    {
      legendData: [],
      xAxisData: [],
      series: [],
    }
  )

  // Process data for DailyChart
  const dailyData = operationsData.reduce(
    (acc, operation) => {
      if (!operation.created_at) return acc

      const date = new Date(operation.created_at)
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`

      // Add date to xAxis if not exists
      if (!acc.xAxisData.includes(formattedDate)) {
        acc.xAxisData.push(formattedDate)
      }

      // Find or create the series for daily listings count
      if (acc.series.length === 0) {
        acc.series.push({
          name: 'Daily Listings',
          data: new Array(acc.xAxisData.length).fill(0),
        })
      }

      // Safely get listings length, default to 0 if listings is invalid
      const listingsLength = Array.isArray(operation.listings)
        ? operation.listings.filter((item) => item !== undefined).length
        : 0

      // Update the count for this date
      const dateIndex = acc.xAxisData.indexOf(formattedDate)
      acc.series[0].data[dateIndex] = listingsLength

      return acc
    },
    {
      xAxisData: [],
      series: [],
    }
  )

  // Sort dates chronologically
  const sortedIndices = dailyData.xAxisData
    .map((date, index) => ({ date, index }))
    .sort((a, b) => {
      const [aMonth, aDay] = a.date.split('/').map(Number)
      const [bMonth, bDay] = b.date.split('/').map(Number)
      return aMonth === bMonth ? aDay - bDay : aMonth - bMonth
    })
    .map((item) => item.index)

  // Reorder both xAxisData and series data
  dailyData.xAxisData = sortedIndices.map((i) => dailyData.xAxisData[i])
  dailyData.series[0].data = sortedIndices.map(
    (i) => dailyData.series[0].data[i]
  )

  // Get only the last 7 days
  const last7Days = {
    xAxisData: dailyData.xAxisData.slice(-7),
    series: [
      {
        name: 'Daily Listings',
        data: dailyData.series[0].data.slice(-7),
      },
    ],
  }

  return (
    <PageLayout title="Dashboard">
      <div className="dashboard-row">
        <UserChart data={userData} title="Operations by User" />
        <ListingsChart data={listingsData} title="Listings by Keyword" />
      </div>
      <div className="dashboard-row">
        <PlatformChart data={platformData} title="Operations by Platform" />
        <DailyChart data={last7Days} title="Daily Listings Count" />
      </div>
    </PageLayout>
  )
}

export default Overview
