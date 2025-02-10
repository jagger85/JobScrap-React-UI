import { API_CONFIG } from '../api/config'
import { createAxiosInstance } from '../api/axiosInstance'
import { UserService } from '../api/users'
import { useMemo } from 'react'
const { BASE_URL, SOCKET_URL } = API_CONFIG

import useStorage from './useStorage'

const useApi = () => {
  const { getToken } = useStorage()

  const services = useMemo(() =>{

    const axiosInstance = createAxiosInstance(getToken)
    return {
      users: new UserService(axiosInstance)
    }
  },[getToken])



  async function fetchUsers() {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    const data = await response.json()
    return data
  }

  async function addUser(username, password, role) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role,
      }),
    })
    return response
  }

  async function deleteUser(username) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  }

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

  async function changePassword(newPassword, username) {
    const response = await fetch(
      `${BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${username}/change-password`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          newPassword: newPassword,
        }),
      }
    )
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

  async function fetchOperations(cursor = null) {
    const url = new URL(`${BASE_URL}${API_CONFIG.ENDPOINTS.OPERATIONS}`)
    if (cursor) url.searchParams.append('cursor', cursor)
    url.searchParams.append('limit', '10')
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        }
    })
    
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  async function fetchAllOperations() {
    console.log('Fetching all operations')
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.OPERATIONS}/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    const data = await response.json()
    return data
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

  async function deleteOperation(id) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.OPERATIONS}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
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

  async function fetchAutomatedScrapOperations() {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    const data = await response.json()
    return data
  }

  async function createAutomatedScrapOperation(data) {
    const response = await fetch(`${BASE_URL}${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    })
    return response
  }

  async function deleteAutomatedScrapOperation(id) {
    const response = await fetch(
      `${BASE_URL}${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response
  }

  async function activateAutomatedScrapOperation(id) {
    const response = await fetch(
      `${BASE_URL}${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}/${id}/activate`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response
  }

  async function deactivateAutomatedScrapOperation(id) {
    const response = await fetch(
      `${BASE_URL}${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}/${id}/deactivate`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    return response
  }

  return {
    services,
    fetchUsers,
    login,
    validateToken,
    addUser,
    deleteUser,
    changePassword,
    fetchOperations,
    fetchAllOperations,
    scrapOperationsByDateRange,
    deleteOperation,
    fetchOperationByTaskId,
    fetchAutomatedScrapOperations,
    createAutomatedScrapOperation,
    deleteAutomatedScrapOperation,
    activateAutomatedScrapOperation,
    deactivateAutomatedScrapOperation,
  }
}

export { BASE_URL as API_BASE_URL, SOCKET_URL }

export default useApi
