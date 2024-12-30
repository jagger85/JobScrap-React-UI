import useApi from '../../hooks/useApi'
import { useQuery } from '@tanstack/react-query'
import { DownloadIcon, TrashIcon } from '../../components/Icons'
import { downloadCSV } from '../../utils/csvManager'
import { ToasterManager } from '../../components/Toasters/Toasters'
import PageLayout from '../../Layout/PageLayout'
import Section from '../../components/Section/Section'
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
      <Section title="Historical operations">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Platform</th>
              <th>Keywords</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((operation, index) => {
              const date = new Date(operation.created_at)
              const formattedDate = `${
                date.getMonth() + 1
              }/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`
              return (
                <tr key={index}>
                  <td>{operation.user}</td>
                  <td>{operation.platform}</td>
                  <td>{operation.keywords}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <DownloadIcon
                      onClick={() => handleDownload(operation.listings)}
                    />
                    <TrashIcon onClick={() => handleDelete(operation._id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Section>
    </PageLayout>
  )
}

export default History
