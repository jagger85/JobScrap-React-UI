import PageLayout from '../../Layout/PageLayout'
import IconButton from '../../components/Buttons/IconButton'
import { useState, useCallback } from 'react'
import AutomateScrapModal from '@components/Modals/AutomateScrap/AutomateScrapModal'
import { CreateIcon } from '../../components/Icons'
import SqueduledOperationPanel from '@components/Panels/SqueduledOperationPanel'
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

  
  const memoizedHandleDelete = useCallback((id) => {
    handleDelete(id)
  }, [handleDelete])

  const memoizedActivateOperation = useCallback((id) => {
    activateOperation(id)
  }, [activateOperation])

  const memoizedDeactivateOperation = useCallback((id) => {
    deactivateOperation(id)
  }, [deactivateOperation])


  if (isLoading || isFetching) return <h2>Loading...</h2>
  if (isError) return <h2>Oooops something went wrong {error}</h2>


  return (
    <PageLayout title="Scheduled Tasks">
      <div className="scrap-header">
        <IconButton icon={CreateIcon} onClick={handleCreate} type="rounded" />
        <div className="scrap-header-subtitle">Set Up a New Schedule</div>
      </div>
      {operations.map((operation) => {
        return (
          <SqueduledOperationPanel
            key={operation.id}
            operation={operation}
            onDelete={memoizedHandleDelete}
            onActivate={memoizedActivateOperation}
            onDeactivate={memoizedDeactivateOperation}
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
