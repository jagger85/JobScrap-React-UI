import axios from 'axios'
import { API_CONFIG } from './config'

export const createAxiosInstance = (getToken) => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      if (getToken) {
        config.headers.Authorization = `Bearer ${getToken()}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response) {
        // Handle specific HTTP errors
        switch (error.response.status) {
          case 401:
            // Handle unauthorized
            break
          case 403:
            // Handle forbidden
            break
          case 404:
            // Handle not found
            break
          default:
            // Handle other errors
            break
        }
      } else if (error.request) {
        // Handle network errors
      }
      return Promise.reject(error)
    }
  )

  return instance
}