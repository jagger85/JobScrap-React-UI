import useApi from './useApi'
import { AuthContext } from '../contexts/AuthContext'
import useStorage from './useStorage'
import { useContext } from 'react'
import { ToasterManager } from '../components/Toasters/Toasters'

const useAuth = () => {
  const { setAuth, setUsername, setUserRole } = useContext(AuthContext)
  const { api } = useApi()
  const { removeToken, saveToken, getToken } = useStorage()

  const loginWithUsenamePassword = async (username, password, rememberMe) => {
    try {
      const data = await api.auth.login(username, password, rememberMe)
      setAuth(true)
      setUsername(data.username)
      setUserRole(data.role)
      saveToken(data.token, rememberMe)
    } catch (error) {
      setAuth(false)
      ToasterManager.showToast('error', error.response?.data?.message || 'Login failed')
    }
  }

  const loginWithToken = async () => {
    try {
      const token = getToken()
      if (!token) return
      
      const data = await api.auth.validateToken()
      setAuth(true)
      setUsername(data.username)
      setUserRole(data.role)
    } catch (error) {
      ToasterManager.showToast('error', error.response?.data?.message || 'Session expired')
      logOut()
    }
  }

  const logOut = () => {
    removeToken()
    setAuth(false)
    setUsername(null)
    setUserRole(null)
  }

  return { loginWithUsenamePassword, logOut, loginWithToken }
}

export default useAuth
