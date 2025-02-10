import { API_CONFIG } from '../api/config'
import { createAxiosInstance } from '../api/axiosInstance'
import { UserService } from '../api/users'
import { OperationsService } from '../api/operations'
import { useMemo } from 'react'
const { BASE_URL, SOCKET_URL } = API_CONFIG

import useStorage from './useStorage'

const useApi = () => {
  const { getToken } = useStorage()

  const api = useMemo(() =>{

    const axiosInstance = createAxiosInstance(getToken)
    return {
      users: new UserService(axiosInstance),
      operations: new OperationsService(axiosInstance)
    }
  },[getToken])


  async function login(username, password, rememberMe) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        remember_me: rememberMe,
      }),
    })
    return response
  }


  async function validateToken(token) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}/validate-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  }

  async function scrapOperationsByDateRange(keywords, dateRange, platform) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.PLATFORM}/${platform}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        keywords: keywords,
        days: dateRange,
      }),
    })
    const data = await response.json()
    return data
  }


  async function fetchOperationByTaskId(taskId) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.OPERATIONS}/task/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    const data = await response.json()
    return data
  }

  return {
    api,
    login,
    validateToken,
    scrapOperationsByDateRange,
    fetchOperationByTaskId,
  }
}

export { BASE_URL as API_BASE_URL, SOCKET_URL }

export default useApi
