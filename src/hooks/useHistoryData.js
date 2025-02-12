import { useQuery, useQueryClient } from '@tanstack/react-query'
import useApi from './useApi'
import { useState, useEffect } from 'react'
import { PLATFORMS } from '@constants'

export const useHistoryData = () => {
  const { api } = useApi()
  const [cursor, setCursor] = useState(null)
  const [cursorStack, setCursorStack] = useState([])
  const queryClient = useQueryClient()

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.users.fetchUsers(),
    keepPreviousData: true,
  })

  const [filters, setFilters] = useState({
    platformOptions: [
      { value: 'all', label: 'All' },
      ...Object.values(PLATFORMS).map((platform) => ({
        value: platform,
        label: platform,
      })),
    ],
    userOptions: [{ value: 'all', label: 'All' }],
    selectedPlatform: { value: 'all', label: 'All' },
    selectedUser: { value: 'all', label: 'All' },
  })

  // Update users when they are fetched
  useEffect(() => {
    if (users) {
      setFilters((prev) => ({
        ...prev,
        userOptions: [
          { value: 'all', label: 'All' },
          ...users.map((user) => ({
            value: user.username,
            label: user.username,
          })),
        ],
      }))
    }
  }, [users])

  const {
    data,
    isError,
    error,
    isLoading: isOperationsLoading,
    refetch,
  } = useQuery({
    queryKey: [
      'operations',
      cursor,
      filters.selectedPlatform.value,
      filters.selectedUser.value,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      queryParams.append('limit', '10')

      if (cursor) queryParams.append('cursor', cursor)
      if (filters.selectedPlatform.value !== 'all') {
        queryParams.append('platform', filters.selectedPlatform.value.toLowerCase())
      }
      if (filters.selectedUser.value !== 'all') {
        queryParams.append('user', filters.selectedUser.value)
      }

      // Remove the leading '?' as the API client should handle this
      return api.operations.fetchOperations(queryParams.toString())
    },
    keepPreviousData: true,
  })

  useEffect(() => {
    if (data?.nextCursor) {
      queryClient.prefetchQuery({
        queryKey: ['operations', data.nextCursor, filters],
        queryFn: () => api.operations.fetchOperations(data.nextCursor, filters),
      })
    }
  }, [data, queryClient, filters])

  const pagination = {
    nextPage: () => {
      if (data?.nextCursor) {
        setCursorStack((prev) => [...prev, cursor])
        setCursor(data.nextCursor)
        queryClient.prefetchQuery({
          queryKey: ['operations', data.nextCursor],
          queryFn: () => api.operations.fetchOperations(data.nextCursor),
        })
      }
    },
    previousPage: () => {
      const previousCursor = cursorStack[cursorStack.length - 1]
      setCursorStack((prev) => prev.slice(0, -1))
      setCursor(previousCursor)
    },
    hasNextPage: !!data?.nextCursor,
    hasPreviousPage: cursorStack.length > 0,
  }

  const updateFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [`selected${type.charAt(0).toUpperCase() + type.slice(1)}`]: value,
    }))
    setCursor(null)
    setCursorStack([])
  }

  return {
    operations: data?.operations || [],
    users,
    isUsersLoading,
    pagination,
    filters,
    isLoading: isOperationsLoading || isUsersLoading,
    isError,
    error,
    refetchOperations: refetch,
    updateFilter,
  }
}
