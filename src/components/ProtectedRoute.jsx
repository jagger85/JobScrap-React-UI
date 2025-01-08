import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { role } = useContext(AuthContext)

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return element
}

export default ProtectedRoute
