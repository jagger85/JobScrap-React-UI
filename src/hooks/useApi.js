const BASE_URL = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT
  }/api`

import useStorage from './useStorage'

const getBaseUrl = () => {
  if (import.meta.env.PROD) import.meta.env.VITE_API_URL
  else return BASE_URL
}

const getSocketUrl = () => {
  if (import.meta.env.PROD) import.meta.env.VITE_API_SOCKET
  else
    return `ws://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT
      }/api/socket`
}

const useApi = () => {
  const { getToken } = useStorage()

  async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
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
    const response = await fetch(`${BASE_URL}/users`, {
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
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  }

  async function login(username, password, rememberMe) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
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
      `${BASE_URL}/users/${username}/change-password`,
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
    const response = await fetch(`${BASE_URL}/auth/validate-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  }

  async function fetchOperations(cursor = null) {
    const url = new URL(`${BASE_URL}/operations`)
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
    const response = await fetch(`${BASE_URL}/operations/all`, {
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
    const response = await fetch(`${BASE_URL}/${platform}`, {
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
    const response = await fetch(`${BASE_URL}/operations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response
  }

  async function fetchOperationByTaskId(taskId) {
    const response = await fetch(`${BASE_URL}/operations/task/${taskId}`, {
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
    const response = await fetch(`${BASE_URL}/automated_scrap_operations`, {
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
    const response = await fetch(`${BASE_URL}/automated_scrap_operations`, {
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
      `${BASE_URL}/automated_scrap_operations/${id}`,
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
      `${BASE_URL}/automated_scrap_operations/${id}/activate`,
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
      `${BASE_URL}/automated_scrap_operations/${id}/deactivate`,
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

export const API_BASE_URL = getBaseUrl()
export const SOCKET_URL = getSocketUrl()

export default useApi
