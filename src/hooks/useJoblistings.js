import useMessageStore from '../utils/messageStore'
import { StorageRepository } from '../utils/storageRepository'
import { STORAGE_KEYS } from '../constants'

/**
 * Base URL for the backend API
 * @type {string}
 */
const API_BASE_URL = `http://${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`

// Log environment variables in development
if (import.meta.env.DEV) {
  console.log('Available env variables:', import.meta.env)
}

/**
 * Custom hook for managing job listing operations
 * @returns {{
 *   initiateJobScraping: Function
 * }} Job scraping initiation function
 */
export function useJobListings() {
  /**
   * Message store function for error handling
   * @type {Function}
   */
  const addMessage = useMessageStore((state) => state.addMessage)

  /**
   * Initiates the job scraping process
   * @async
   * @function
   * @param {string} selectedDate - The date range for job scraping
   * @param {string[]} selectedPlatforms - Array of platform identifiers to scrape
   * @returns {Promise<boolean|string>} Success status or job ID
   * @throws {Error} When API request fails or backend URL is not configured
   */
  const initiateJobScraping = async (selectedDate, selectedPlatforms) => {
    if (!API_BASE_URL) {
      throw new Error('Backend URL not configured in environment variables')
    }

    const endpoint = `${API_BASE_URL}/api/listings`
    const requestBody = {
      platforms: selectedPlatforms,
      dateRange: selectedDate,
    }

    const token = StorageRepository.getItem(STORAGE_KEYS.BEARER_TOKEN_KEY)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(requestBody),
      })

      const responseText = await response.text()
      
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}. Response: ${responseText}`
        )
      }

      const data = responseText ? JSON.parse(responseText) : null
      return data.success || data.jobId
    } catch (error) {
      /**
       * Processes and formats error messages from the API
       * @type {string}
       */
      let errorMessage = error.message
      if (errorMessage.includes('HTTP error!')) {
        try {
          const errorResponse = JSON.parse(errorMessage.split('Response: ')[1])
          errorMessage = errorResponse.error
        } catch (e) {
          console.log(e)
        }
      }

      addMessage(errorMessage)
      console.error('Network error:', error)
      throw error
    }
  }

  return { initiateJobScraping }
}
