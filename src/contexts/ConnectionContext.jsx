import { createContext, useReducer, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connectionReducer, initialConnectionState } from './ConnectionReducer'

/**
 * Context for managing WebSocket connection state across the application
 * @type {React.Context<{
 *   connection: {isEnabled: boolean, isConnected: boolean, lastHeartbeat: number},
 *   setConnectionEnabled: Function,
 *   setConnectionStatus: Function,
 *   updateHeartbeat: Function
 * }>}
 */
const ConnectionContext = createContext()

/**
 * Provider component that manages WebSocket connection state
 * Handles connection status, enablement, and heartbeat tracking
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Context provider wrapping children
 */
function ConnectionContextProvider({ children }) {
  /**
   * Connection state and dispatch function from reducer
   * @type {[{isEnabled: boolean, isConnected: boolean, lastHeartbeat: number}, Function]}
   */
  const [state, dispatch] = useReducer(connectionReducer, initialConnectionState)

  /**
   * Updates the connection enabled state
   * @function
   * @param {boolean} enabled - Whether the connection should be enabled
   */
  const setConnectionEnabled = useCallback((enabled) => {
    dispatch({ type: 'SET_CONNECTION_ENABLED', payload: enabled })
  }, [])

  /**
   * Updates the connection status
   * @function
   * @param {boolean} status - Current connection status
   */
  const setConnectionStatus = useCallback((status) => {
    dispatch({ 
      type: 'SET_CONNECTION_STATUS', 
      payload: { isConnected: status }
    })
  }, [])

  /**
   * Updates the last heartbeat timestamp
   * @function
   */
  const updateHeartbeat = useCallback(() => {
    dispatch({ type: 'UPDATE_HEARTBEAT' })
  }, [])

  /**
   * Memoized context value to prevent unnecessary re-renders
   * @type {{
   *   connection: {isEnabled: boolean, isConnected: boolean, lastHeartbeat: number},
   *   setConnectionEnabled: Function,
   *   setConnectionStatus: Function,
   *   updateHeartbeat: Function
   * }}
   */
  const value = useMemo(() => ({
    connection: state,
    setConnectionEnabled,
    setConnectionStatus,
    updateHeartbeat
  }), [state, setConnectionEnabled, setConnectionStatus, updateHeartbeat])

  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>
}

ConnectionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Export both the context and provider
export { ConnectionContext, ConnectionContextProvider }
