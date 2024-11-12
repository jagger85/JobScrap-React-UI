import { createContext, useReducer, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { messageReducer, initialState } from './MessageReducer'

/**
 * Context for managing message state across the application
 * @type {React.Context<{
 *   messages: string[],
 *   setMessage: Function,
 *   clearMessages: Function
 * }>}
 */
const MessageContext = createContext()

/**
 * Provider component that manages message state
 * Handles adding new messages and clearing message history
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Context provider wrapping children
 */
function MessageContextProvider({ children }) {
  /**
   * Message state and dispatch function from reducer
   * @type {[{messages: string[]}, Function]}
   */
  const [state, dispatch] = useReducer(messageReducer, initialState)

  /**
   * Adds a new message to the message list
   * @function
   * @param {string} message - The message to be added
   */
  const setMessage = useCallback((message) => {
    dispatch({ type: 'SET_MESSAGE', payload: message })
  }, [])

  /**
   * Clears all messages from the message list
   * @function
   */
  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' })
  }, [])

  /**
   * Memoized context value to prevent unnecessary re-renders
   * @type {{
   *   messages: string[],
   *   setMessage: Function,
   *   clearMessages: Function
   * }}
   */
  const value = useMemo(() => ({
    messages: state.messages,
    setMessage,
    clearMessages
  }), [
    state.messages,
    setMessage,
    clearMessages
  ])

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}

MessageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { MessageContext, MessageContextProvider }
