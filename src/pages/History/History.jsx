import useApi from '../../hooks/useApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { downloadCSV } from '../../utils/csvManager'
import { ToasterManager } from '../../components/Toasters/Toasters'
import PageLayout from '../../Layout/PageLayout'
import HistoricTable from '../../components/Tables/HistoricTable'
import { useState, useEffect } from 'react'

function History() {
  const { api } = useApi()
  const [cursor, setCursor] = useState(null)
  const [cursorStack, setCursorStack] = useState([])
  const queryClient = useQueryClient()

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['operations', cursor],
    queryFn: () => api.operations.fetchOperations(cursor),
    keepPreviousData: true
  })

  // Prefetch next page
  useEffect(() => {
    if (data?.nextCursor) {
      queryClient.prefetchQuery({
        queryKey: ['operations', data.nextCursor],
        queryFn: () => api.operations.fetchOperations(data.nextCursor)
      })
    }
  }, [data, queryClient])

  const handleNextPage = () => {
    if (data?.nextCursor) {
      setCursorStack(prev => [...prev, cursor])
      setCursor(data.nextCursor)
    }
  }

  const handlePreviousPage = () => {
    const previousCursor = cursorStack[cursorStack.length - 1]
    setCursorStack(prev => prev.slice(0, -1))
    setCursor(previousCursor)
  }

  const handleDownload = (data) => {
    downloadCSV(data)
  }

  const handleDelete = async (id) => {
    try{
      await api.operations.deleteOperation(id)
        ToasterManager.showToast('success', 'Operation deleted')
        refetch()
      } catch (error){
        ToasterManager.showToast('error', error.response?.data?.message || 'Failed to delete user')
      }
    }
    
  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Oooops something went wrong {error}</h2>

  return (
    <PageLayout title="History">
      <HistoricTable
        data={data?.operations || []}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        hasNextPage={!!data?.nextCursor}
        hasPreviousPage={cursorStack.length > 0}
      />
    </PageLayout>
  )
}

export default History
