import './dashboard.css'
import { useState } from 'react'
import JobScrapModal from '@modals/JobScrap/JobScrapModal'
import Operation from '../../components/OperationCard/Operation'
import { useOperations } from '@hooks/useOperations'
import useApi from '@hooks/useApi'
import PageLayout from '../../Layout/PageLayout'
import IconButton from '../../components/Buttons/IconButton'
import { CreateIcon } from '../../components/Icons'

function Dashboard() {
  const { fetchOperationsByDateRange } = useApi()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { operations, addOperation, deleteOperation } = useOperations()

  const handleCreate = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleStart = async () => {
    operations.forEach(async (operation) => {
      const data = await fetchOperationsByDateRange(
        operation.keywords,
        operation.dateRange,
        operation.platform
      )
      console.log(data)
    })
  }

  return (
    <PageLayout title="Dashboard">
      <div className="dashboard-header">
        <IconButton icon={CreateIcon} onClick={handleCreate} type="rounded" />
        <div className="dashboard-header-subtitle">
          Create an instant job scrap
        </div>
      </div>
      <div className="dashboard-body">
        {operations.map((operation) => (
          <Operation
            key={operation.id}
            operation={operation}
            onDelete={deleteOperation}
          />
        ))}
      </div>
      {isModalOpen && (
        <JobScrapModal addOperation={addOperation} onClose={handleClose} />
      )}
      {operations.length != 0 && <button onClick={handleStart}>Start</button>}
    </PageLayout>
  )
}

export default Dashboard
