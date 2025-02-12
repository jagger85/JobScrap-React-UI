import useApi from '../../hooks/useApi'
import { downloadCSV } from '../../utils/csvManager'
import { ToasterManager } from '../../components/Toasters/Toasters'
import PageLayout from '../../Layout/PageLayout'
import HistoricTable from '../../components/Tables/HistoricTable'
import HistoricTableFilter from '../../components/Tables/HistoricTableFilter'
import { useHistoryData } from '../../hooks/useHistoryData'

function History() {
  const {
    operations,
    pagination,
    filters,
    isLoading,
    isError,
    error,
    refetchOperations,
    updateFilter,
  } = useHistoryData()
  const { api } = useApi()

  const handleDownload = (data) => {
    downloadCSV(data)
  }

  const handleDelete = async (id) => {
    try {
      await api.operations.deleteOperation(id)
      ToasterManager.showToast('success', 'Operation deleted')
      refetchOperations()
    } catch (error) {
      ToasterManager.showToast(
        'error',
        error.response?.data?.message || 'Failed to delete user'
      )
    }
  }
  const handleSearch = (e) => {
    setTimeout(() => {
      updateFilter('search', e.target.value)
    }, 2000)
  }

  const handlePlatformChange = (selectedOption) => {
    updateFilter('platform', selectedOption)
  }

  const handleUserChange = (selectedOption) => {
    updateFilter('user', selectedOption)
  }

  const handleOrderChange = () => {
    updateFilter('order', !filters.order)
  }

  if (isError) return <h2>Oooops something went wrong {error}</h2>

  return (
    <PageLayout title="History">
      <HistoricTableFilter
        searchValue={filters.search}
        handlePlatformChange={handlePlatformChange}
        handleUserChange={handleUserChange}
        selectedPlatform={filters.selectedPlatform}
        selectedUser={filters.selectedUser}
        platformOptions={filters.platformOptions}
        userOptions={filters.userOptions}
        handleSearch={handleSearch}
      />
        <HistoricTable
          isLoading={isLoading}
          operations={operations}
          handleDownload={handleDownload}
          handleDelete={handleDelete}
          pagination={pagination}
          order={filters.order}
          setOrder={handleOrderChange}
        />
    </PageLayout>
  )
}

export default History
