import './login.css'
import uplift from '../../assets/platform-icons/Uplift.png'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { ToasterManager } from '../Toasters'
import { StorageRepository } from '../../utils/storageRepository'

/** Key used for storing the authentication token */
const TOKEN_KEY = 'sweeper_bearer';

/**
 * Login component that handles user authentication
 * @component
 * @returns {JSX.Element} Rendered login form
 */
export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  /**
   * Checks for existing token and attempts auto-login on component mount
   * @effect
   */
  useEffect(() => {
    // Check for existing token on component mount
    const existingToken = StorageRepository.getItem(TOKEN_KEY);
    if (existingToken) {
      // Auto login if token exists
      try {
        login(null, null, true, existingToken); // Pass existing token
      } catch (error) {
        console.error('Auto-login failed:', error);
        StorageRepository.removeItem(TOKEN_KEY);
      }
    }
  }, []);

  /**
   * Handles the login form submission
   * Validates inputs and attempts to authenticate the user
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleLogin = async () => {
    if (!username || !password) {
      ToasterManager.showToast('error', 'Please fill in all fields')
      return
    }

    try {
      await login(username, password, rememberMe)
    } catch (error) {
      console.error('Login failed:', error)
      ToasterManager.showToast('error', 'Login failed. Please check your credentials.')
    }
  }

  return (
      <div className="elevated login-container">
        <div className="logo-text-container">
          <img className="uplift-logo" src={uplift} alt="Uplift Logo" />
        </div>
        <div className="inputs">
          <label htmlFor="username">
            Username
            <input
              className="login-input"
              type="text"
              autoComplete="off"
              name="username"
              id="username"
              placeholder="eg. Jagger85"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="login-input"
              name="password"
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
         
          <div className="checkbox-wrapper-43">
            <span className="remember-text">Remember me</span>
            <input 
              type="checkbox" 
              id="cbx-43" 
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="cbx-43" className="check">
              <svg width="18px" height="18px" viewBox="0 0 18 18">
                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                <polyline points="1 9 7 14 15 4"></polyline>
              </svg>
            </label>
          </div>
        </div>
        <button
          id="login-button"
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
  )
}
