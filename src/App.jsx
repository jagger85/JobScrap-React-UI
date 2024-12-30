import Login from './pages/Login/Login'
import useAuth from './hooks/useAuth'
import { useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext'
import useStorage from './hooks/useStorage'
import MainLayout from './Layout/MainLayout'
import  Toasters  from './components/Toasters/Toasters'
export default function App() {
  const { loginWithUsenamePassword, loginWithToken } = useAuth()
  const { getToken } = useStorage()
  const { isAuthenticated } = useContext(AuthContext)

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
