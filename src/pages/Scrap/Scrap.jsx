import './scrap.css'
import { useState } from 'react'
import JobScrapModal from '@modals/JobScrap/JobScrapModal'
import { useOperations } from '@hooks/useOperations'
import useApi from '@hooks/useApi'
import PageLayout from '../../Layout/PageLayout'
import IconButton from '../../components/Buttons/IconButton'
import { CreateIcon } from '../../components/Icons'
import StandardButton from '@buttons/StandardButton'
import TriggeredOperationPanel from '@panels/TriggeredOperationPanel'

function Scrap() {
  const { scrapOperationsByDateRange } = useApi()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { operations, addOperation, deleteOperation, setOperationTaskId } =
    useOperations()

  const handleCreate = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleStart = async () => {
    console.log('starting operations')
    operations.forEach(async (operation) => {
      const data = await scrapOperationsByDateRange(
        operation.keywords,
        operation.dateRange,
        operation.platform
      )
      setOperationTaskId(operation.id, data.task_id)
    })
  }
  return (
    <PageLayout title="Scrap">
      <div className="scrap-header">
        <IconButton icon={CreateIcon} onClick={handleCreate} type="rounded" />
        <div className="scrap-header-subtitle">
          Create an instant job scrap
        </div>
      </div>
      <div className="scrap-operations-panels">
        {operations.map((operation) => (
          <TriggeredOperationPanel
            key={operation.id}
            operation={operation}
            onDelete={deleteOperation}
          />
        ))}
      </div>
      {isModalOpen && (
        <JobScrapModal addOperation={addOperation} onClose={handleClose} />
      )}
      {operations.length != 0 && (
        <StandardButton
          className="standard-button"
          text="Start operations"
          onClick={handleStart}
        />
      )}
    </PageLayout>
  )
}

export default Scrap
