import { API_CONFIG } from '../api/config'
import { createAxiosInstance } from '../api/axiosInstance'
import { UserService } from '../api/users'
import { OperationsService } from '../api/operations'
import { useMemo } from 'react'
import { AuthService } from '../api/auth'
const { BASE_URL, SOCKET_URL } = API_CONFIG

import useStorage from './useStorage'

const useApi = () => {
  
  const { getToken } = useStorage()

  const api = useMemo(() => {
    const axiosInstance = createAxiosInstance(getToken)
    return {
      users: new UserService(axiosInstance),
      operations: new OperationsService(axiosInstance),
      auth: new AuthService(axiosInstance)
    }
  }, [getToken])

  return {
    api
  }
}

export { BASE_URL as API_BASE_URL, SOCKET_URL }

export default useApi
