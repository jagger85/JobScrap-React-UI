import { createContext, useReducer, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { authReducer, initialAuthState } from './AuthReducer'

/**
 * Context for managing authentication state across the application
 * @type {React.Context<{isAuthenticated: boolean, setAuth: Function}>}
 */
const AuthContext = createContext()

/**
 * Provider component that manages authentication state
 * Wraps children with authentication context and provides state management
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Context provider wrapping children
 */
function AuthContextProvider({ children }) {
  /**
   * Authentication state and dispatch function from reducer
   * @type {[{isAuthenticated: boolean}, Function]}
   */
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  /**
   * Updates the authentication state
   * @function
   * @param {boolean} isAuthenticated - New authentication state
   */
  const setAuth = useCallback((isAuthenticated) => {
    dispatch({ type: 'SET_AUTH', payload: isAuthenticated })
  }, [])

  /**
   * Memoized context value to prevent unnecessary re-renders
   * @type {{isAuthenticated: boolean, setAuth: Function}}
   */
  const value = useMemo(() => ({
    isAuthenticated: state.isAuthenticated,
    setAuth
  }), [state.isAuthenticated, setAuth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Export both the context and provider
export { AuthContext, AuthContextProvider }
