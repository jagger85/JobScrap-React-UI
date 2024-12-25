import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import useMessageStore from '../utils/messageStore'
import { ToasterManager } from '../components/Toasters'
import { useStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../constants'
import { API_BASE_URL } from './useApi'


export function useAuth() {
  const { setAuth, setUsername, setUserRole } = useContext(AuthContext)
  const addMessage = useMessageStore((state) => state.addMessage)
  const [token, setToken, clearToken] = useStorage(STORAGE_KEYS.BEARER_TOKEN_KEY, null)
  const endpoint = `${API_BASE_URL}/login`


  const loginWithToken = async (token) => {
      const requestBody ={
        token
      }

      try{
        const response = await fetch(endpoint,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify(requestBody),
        })

        console.log('the server send this response to the login with token ',response)
        const responseText = await response.text()
        const data = responseText ? JSON.parse(responseText) : null
        setUsername(data.username)
        setUserRole(data.role)
        setAuth(true)

      } catch (error){
        console.log(error)
      }
  }
  const login = async (username, password, rememberMe = false) => {

    if (!username || !password) {
      const errorMessage = 'Username and password are required';
      ToasterManager.showToast('error', errorMessage);
      throw new Error(errorMessage);
    }

    const requestBody = {
      username,
      password,
    }

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

      const responseText = await response.text()

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

      setToken(data.token, rememberMe)
      setAuth(true)
      setUsername(data.username)
      setUserRole(data.role)
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

  const logout = () => {
    clearToken()
    setAuth(false)
  }

  const getToken = () => {
    return token
  }

  const isAuthenticated = () => {
    return !!token
  }

  return { 
    loginWithToken,
    login,
    logout,
    getToken,
    isAuthenticated 
  }
}
