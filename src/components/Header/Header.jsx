import { LogOutIcon } from '../Icons'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import useAuth from '../../hooks/useAuth'
import './header.css'

function Header() {
  const { username } = useContext(AuthContext)
  const { logOut } = useAuth()
  return (
    <div className="user-container">
      <div className="user-text">Welcome {username}</div>
      <div onClick={logOut} className='user-icon'>
        <LogOutIcon />
      </div>
    </div>
  )
}

export default Header
