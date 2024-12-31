import useApi from '../../hooks/useApi'
import { useQuery } from '@tanstack/react-query'
import { downloadCSV } from '../../utils/csvManager'
import { ToasterManager } from '../../components/Toasters/Toasters'
import PageLayout from '../../Layout/PageLayout'
import HistoricTable from '../../components/Tables/HistoricTable'

function History() {
  const { fetchOperations, deleteOperation } = useApi()
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['operations'],
    queryFn: fetchOperations,
  })

  const handleDownload = (data) => {
    downloadCSV(data)
  }

  const handleDelete = async (id) => {
    const response = await deleteOperation(id)
    if (response.status === 200) {
      ToasterManager.showToast('success', 'Operation deleted')
      refetch()
    } else {
      ToasterManager.error('Failed to delete operation')
    }
  }

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Oooops something went wrong {error}</h2>

  return (
    <PageLayout title="History">
      <HistoricTable
        data={data}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
      />
    </PageLayout>
  )
}

export default History
