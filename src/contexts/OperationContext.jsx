import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const OperationContext = createContext()

export function OperationContextProvider({ children }) {
  const [operations, setOperations] = useState(() => {
    const savedOperations = localStorage.getItem('operations')
    return savedOperations ? JSON.parse(savedOperations) : []
  })

  const addOperation = (operation) => {
    setOperations((prevOperations) => {
      const newOperations = [
        ...prevOperations,
        { ...operation, id: Date.now() },
      ]
      localStorage.setItem('operations', JSON.stringify(newOperations))
      return newOperations
    })
  }

  const deleteOperation = (id) => {
    setOperations((prevOperations) => {
      const filteredOperations = prevOperations.filter((op) => op.id !== id)
      localStorage.setItem('operations', JSON.stringify(filteredOperations))
      return filteredOperations
    })
  }

  const setOperationTaskId = (id, taskId) => {
    setOperations((prevOperations) => {
      const updatedOperations = prevOperations.map((op) =>
        op.id === id ? { ...op, taskId } : op
      )
      localStorage.setItem('operations', JSON.stringify(updatedOperations))
      return updatedOperations
    })
  }

  const updateOperation = (taskId, operationStatus) => {
    setOperations((prevOperations) => {
      const updatedOperations = prevOperations.map((op) =>
        op.taskId === taskId ? { ...op, status: operationStatus } : op
      )
      localStorage.setItem('operations', JSON.stringify(updatedOperations))
      return updatedOperations
    })
  }

  const updateOperationListingsCount = (taskId, listingsCount) => {
    setOperations((prevOperations) => {
      const updatedOperations = prevOperations.map((op) =>
        op.taskId === taskId ? { ...op, numberOfListings: listingsCount } : op
      )
      localStorage.setItem('operations', JSON.stringify(updatedOperations))
      return updatedOperations
    })
  }
  const updateOperationMessage = (taskId, message) => {
    setOperations((prevOperations) => {
      const updatedOperations = prevOperations.map((op) =>
        op.taskId === taskId ? { ...op, message } : op
      )
      localStorage.setItem('operations', JSON.stringify(updatedOperations))
      return updatedOperations
    })
  }

  const resetOperations = () => {
    setOperations((prevOperations) => {
      const resetOps = prevOperations.map((op) => ({
        ...op,
        listings: [],
        taskId: null,
        numberOfListings: 0,
        status: 'Idle',
        message: 'Awaiting operation launch',

      }))
      localStorage.setItem('operations', JSON.stringify(resetOps))
      return resetOps
    })
  }

  return (
    <OperationContext.Provider
      value={{
        operations,
        addOperation,
        deleteOperation,
        setOperationTaskId,
        updateOperation,
        resetOperations,
        updateOperationListingsCount,
        updateOperationMessage,
      }}
    >
      {children}
    </OperationContext.Provider>
  )
}

OperationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default OperationContext
