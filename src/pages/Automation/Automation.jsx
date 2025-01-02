import PageLayout from '../../Layout/PageLayout'
import IconButton from '../../components/Buttons/IconButton'
import { useState } from 'react'
import AutomateScrapModal from '@components/Modals/AutomateScrap/AutomateScrapModal'
import { CreateIcon } from '../../components/Icons'
import useApi from '../../hooks/useApi'
import AutomaticOperationPanel from '@components/Panels/AutomaticOperationPanel'
import { useQuery } from '@tanstack/react-query'

import './automation.css'
function Automation() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    fetchAutomatedScrapOperations,
    createAutomatedScrapOperation,
    deleteAutomatedScrapOperation,
    activateAutomatedScrapOperation,
    deactivateAutomatedScrapOperation,
  } = useApi()
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['automatedScrapOperations'],
    queryFn: fetchAutomatedScrapOperations,
  })

  const handleCreate = () => {
    setIsModalOpen(true)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }
  const addAutomatedOperation = async (data) => {
    await createAutomatedScrapOperation(data)
    refetch()
  }
  const handleDelete = async (operation) => {
    await deleteAutomatedScrapOperation(operation)
    refetch()
  }
  const handleActivate = async (operation) => {
    await activateAutomatedScrapOperation(operation)
    refetch()
  }
  const handleDeactivate = async (operation) => {
    await deactivateAutomatedScrapOperation(operation)
    refetch()
  }

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Oooops something went wrong {error}</h2>


  return (
    <PageLayout title="Automation">
      <div className="scrap-header">
        <IconButton icon={CreateIcon} onClick={handleCreate} type="rounded" />
        <div className="scrap-header-subtitle">Create an automated scrap operation</div>
      </div>
      {data.map((operation) => {
        return (
          <AutomaticOperationPanel
            key={operation._id}
            operation={operation}
            onDelete={handleDelete}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
        )
      })}
      {isModalOpen && (
        <AutomateScrapModal
          onClose={handleClose}
          addAutomatedOperation={addAutomatedOperation}
        />
      )}
    </PageLayout>
  )
}

export default Automation
