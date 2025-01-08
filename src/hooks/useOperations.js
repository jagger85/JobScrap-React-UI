import { useContext } from 'react'
import OperationContext from '../contexts/OperationContext'

export function useOperations() {
  const context = useContext(OperationContext)
  if (!context) {
    throw new Error(
      'useOperations must be used within an OperationContextProvider'
    )
  }
  return context
}