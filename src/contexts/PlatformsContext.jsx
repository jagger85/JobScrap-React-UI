import { createContext } from 'react'
import PropTypes from 'prop-types'
import { useAppStatus } from '../hooks/useAppStatus'

/**
 * Context for managing platform selection state across the application
 * Provides platform toggle functionality and selection status
 * @type {React.Context<{
 *   platforms: Object<string, {isSelected: boolean}>,
 *   togglePlatform: Function,
 *   resetPlatforms: Function
 * }>}
 */
const PlatformsContext = createContext()

/**
 * Provider component that manages platform selection state
 * Uses useAppStatus hook to handle platform state management
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 * @returns {JSX.Element} Context provider wrapping children
 */
function PlatformsContextProvider({ children }) {
  /**
   * Platform state and management functions from useAppStatus hook
   * @type {{
   *   platforms: Object<string, {isSelected: boolean}>,
   *   togglePlatform: Function,
   *   resetPlatforms: Function
   * }}
   */
  const value = useAppStatus()
  
  return <PlatformsContext.Provider value={value}>{children}</PlatformsContext.Provider>
}

PlatformsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { PlatformsContext, PlatformsContextProvider }
