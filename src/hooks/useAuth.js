import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import useMessageStore from '../utils/messageStore'
import { ToasterManager } from '../components/Toasters'
import { useStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../constants'
import { API_BASE_URL } from './useApi'

/**
 * Checks if a JWT token has expired
 * @param {string} token - JWT token to validate
 * @returns {boolean} True if token is expired or invalid, false otherwise
 */
const isTokenExpired = (token) => {
  if (!token || typeof token !== 'string' || !token.includes('.')) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
};

/**
 * Custom hook for handling authentication operations
 * @returns {{
 *   login: Function,
 *   logout: Function,
 *   getToken: Function,
 *   isAuthenticated: Function
 * }} Authentication methods and utilities
 */
export function useAuth() {
  const { setAuth } = useContext(AuthContext)
  const addMessage = useMessageStore((state) => state.addMessage)
  const [token, setToken, clearToken] = useStorage(STORAGE_KEYS.BEARER_TOKEN_KEY, null)

  /**
   * Checks token validity on mount and token changes
   * @effect
   */
  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        console.log('Stored token has expired');
        clearToken();
        setAuth(false);
      } else {
        setAuth(true);
        console.log('User authenticated from valid stored token');
      }
    }
  }, [token, setAuth, clearToken]);

  /**
   * Authenticates user with provided credentials
   * @async
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @param {boolean} [rememberMe=false] - Whether to persist the token
   * @returns {Promise<string>} Authentication token
   * @throws {Error} When authentication fails
   */
  const login = async (username, password, rememberMe = false) => {
    if (token && !isTokenExpired(token)) {
      console.log('Using existing valid token');
      return token;
    }
    
    if (!username || !password) {
      const errorMessage = 'Username and password are required';
      ToasterManager.showToast('error', errorMessage);
      throw new Error(errorMessage);
    }

    if (!API_BASE_URL) {
      const errorMessage = 'Backend URL not configured in environment variables';
      ToasterManager.showToast('error', errorMessage);
      throw new Error(errorMessage);
    }

    const endpoint = `${API_BASE_URL}/login`
    const requestBody = {
      username,
      password,
    }

    console.log('Making request to:', endpoint)
    console.log('Request payload:', requestBody)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(requestBody),
      })

      console.log('Response status:', response.status)
      console.log(
        'Response headers:',
        Object.fromEntries(response.headers.entries())
      )

      const responseText = await response.text()
      console.log('Raw response:', responseText)

      if (!response.ok) {
        let errorMsg = responseText;
        try {
          const errorData = JSON.parse(responseText);
          errorMsg = errorData.msg || responseText; // Use msg if available
        } catch (e) {
          console.error('Error parsing responseText:', e);
        }
        ToasterManager.showToast('error', errorMsg);
        throw new Error(errorMsg);
      }

      const data = responseText ? JSON.parse(responseText) : null
      console.log('Parsed response data:', data)

      if (!data || !data.access_token) {
        const errorMessage = 'Invalid response format: missing access token'
        ToasterManager.showToast('error', errorMessage)
        throw new Error(errorMessage)
      }

      setToken(data.access_token, rememberMe)
      setAuth(true)

      if (data.message) {
        console.log('Server message:', data.message)
      }

      return data.access_token
    } catch (error) {
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
      ToasterManager.showToast('error', errorMessage)
      console.error('Network or parsing error:', error)
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      throw error
    }
  }

  /**
   * Logs out the current user
   * Clears token and updates auth state
   * @function
   */
  const logout = () => {
    clearToken()
    setAuth(false)
  }

  /**
   * Retrieves the current authentication token
   * @function
   * @returns {string|null} Current token or null if not authenticated
   */
  const getToken = () => {
    return token
  }

  /**
   * Checks if user is currently authenticated
   * @function
   * @returns {boolean} True if authenticated, false otherwise
   */
  const isAuthenticated = () => {
    return !!token
  }

  return { 
    login,
    logout,
    getToken,
    isAuthenticated 
  }
}
