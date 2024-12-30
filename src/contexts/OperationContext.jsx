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

  return (
    <OperationContext.Provider
      value={{ operations, addOperation, deleteOperation }}
    >
      {children}
    </OperationContext.Provider>
  )
}

OperationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default OperationContext
