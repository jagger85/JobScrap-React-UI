import Login from './pages/Login/Login'
import useAuth from './hooks/useAuth'
import { useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext'
import useStorage from './hooks/useStorage'
import MainLayout from './Layout/MainLayout'
import Toasters from './components/Toasters/Toasters'
import useServerConnection from './hooks/useServerConnection'
import OperationContext  from './contexts/OperationContext'

export default function App() {
  const { connect } = useServerConnection()
  const { loginWithUsenamePassword, loginWithToken } = useAuth()
  const { getToken } = useStorage()
  const { isAuthenticated } = useContext(AuthContext)
  const { resetOperations } = useContext(OperationContext)

  // Effect for handling connection and operations reset when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      connect()
      resetOperations()
    }
  }, [isAuthenticated]) // Only depend on isAuthenticated

  // Effect for token-based authentication
  useEffect(() => {
    if (getToken() && !isAuthenticated) {
      loginWithToken()
    }
  }, [getToken, isAuthenticated, loginWithToken])

  function handleLogin(username, password, rememberMe) {
    loginWithUsenamePassword(username, password, rememberMe)
  }

  return (
    <div>
      {isAuthenticated ? <MainLayout /> : <Login onLogin={handleLogin} />}
      <Toasters />
    </div>
  )
}
