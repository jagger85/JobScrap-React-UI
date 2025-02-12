import useApi from './useApi'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useScheduledOperations() {
  const { api } = useApi()
  const queryClient = useQueryClient()

  const QUERY_KEY = ['scheduledScrapOperations']

  // Main query for fetching operations
  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => api.scheduledOperations.fetchScheduledScrapOperations(),
    staleTime: 1000 * 60, // Considering data fresh for 1 minute
  })

  // Delete mutation
  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: (operation) => {
      if (!operation?.id) {
        throw new Error('Operation ID is missing')
      }
      return api.scheduledOperations.deleteScheduledScrapOperation(operation.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    },
  })

  // Create mutation
  const { mutate: createOperation, isLoading: isCreating } = useMutation({
    mutationFn: (operation) =>
      api.scheduledOperations.createScheduledScrapOperation(operation),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    },
  })

  // Activate mutation
  const { mutate: activateOperation, isLoading: isActivating } = useMutation({
    mutationFn: (operation) => {
      if (!operation?.id) {
        throw new Error('Operation ID is missing')
      }
      return api.scheduledOperations.activateScheduledScrapOperation(
        operation.id
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    },
  })

  // Deactivate mutation
  const { mutate: deactivateOperation, isLoading: isDeactivating } =
    useMutation({
      mutationFn: (operation) => {
        if (!operation?.id) {
          throw new Error('Operation ID is missing')
        }
        return api.scheduledOperations.deactivateScheduledScrapOperation(
          operation.id
        )
      },
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY)
      },
    })

  return {
    operations: data,
    isError,
    error,
    isLoading,
    isFetching,
    // Mutations with their loading states
    handleDelete,
    isDeleting,
    createOperation,
    isCreating,
    activateOperation,
    isActivating,
    deactivateOperation,
    isDeactivating,
  }
}
