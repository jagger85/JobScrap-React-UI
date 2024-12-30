import './login.css'
import { useState } from 'react'
import uplift from '../../assets/platform-icons/Uplift.png'
import PropTypes from 'prop-types'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    onLogin(username, password, rememberMe)
  }

  return (
    <div className="login-container">
      <div className="elevated login-panel">
        <div className="logo-text-container">
          <img className="uplift-logo" src={uplift} alt="Uplift Logo" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
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
        
          <button id="login-button" className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
}
