import PageLayout from '../../Layout/PageLayout'
import IconButton from '../../components/Buttons/IconButton'
import { useState } from 'react'
import AutomateScrapModal from '@components/Modals/AutomateScrap/AutomateScrapModal'
import { CreateIcon } from '../../components/Icons'
import AutomaticOperationPanel from '@components/Panels/AutomaticOperationPanel'
import './automation.css'

import { useSqueduledOperations } from '../../hooks/useSqueduledOperations'

function Automation() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { operations, isError, error, isFetching, isLoading, handleDelete, createOperation, activateOperation, deactivateOperation } = useSqueduledOperations()

  console.log('data:', operations)

  const handleCreate = () => {
    setIsModalOpen(true)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }

  if (isFetching) return <h2>Is Fetching...</h2>
  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Oooops something went wrong {error}</h2>


  return (
    <PageLayout title="Scheduled Tasks">
      <div className="scrap-header">
        <IconButton icon={CreateIcon} onClick={handleCreate} type="rounded" />
        <div className="scrap-header-subtitle">Set Up a New Schedule</div>
      </div>
      {operations.map((operation) => {
        return (
          <AutomaticOperationPanel
            key={operation.id}
            operation={operation}
            onDelete={handleDelete}
            onActivate={activateOperation}
            onDeactivate={deactivateOperation}
          />
        )
      })}
      {isModalOpen && (
        <AutomateScrapModal
          onClose={handleClose}
          addAutomatedOperation={createOperation}
        />
      )}
    </PageLayout>
  )
}

export default Automation
