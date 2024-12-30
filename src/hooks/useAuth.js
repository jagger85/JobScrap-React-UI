import useApi from './useApi'
import { AuthContext } from '../contexts/AuthContext'
import useStorage from './useStorage'
import { useContext } from 'react'
import { ToasterManager } from '../components/Toasters/Toasters'

const useAuth = () => {
  const { setAuth, setUsername, setUserRole } = useContext(AuthContext)
  const { login, validateToken } = useApi()
  const { removeToken, saveToken, getToken } = useStorage()

  const loginWithUsenamePassword = async (username, password, rememberMe) => {
    const response = await login(username, password, rememberMe)
    console.log(response)
    if (response.status === 200) {
      const data = await response.json()
      setAuth(true)
      setUsername(username)
      setUserRole(data.role)
      saveToken(data.token, rememberMe)
    } else {
      const data = await response.json()
      setAuth(false)
      ToasterManager.showToast('error', data.message)
    }
  }

  const loginWithToken = async () => {
    const token = getToken()
    const response = await validateToken(token)
    if (response.status === 200) {
      const data = await response.json()
      setAuth(true)
      setUsername(data.username)
      setUserRole(data.role)
    } else {
      const data = await response.json()
      ToasterManager.showToast('error', data.message)
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
