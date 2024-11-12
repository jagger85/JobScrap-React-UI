import { useState, useCallback, useMemo } from 'react'
import { PLATFORMS, PLATFORM_STATUS, OPERATION_STATUS } from '../constants'
import { useOperationSuccess } from './useSound'

/**
 * Creates the initial state for platform management
 * @returns {{
 *   operationsStatus: string,
 *   platforms: Object<string, {isSelected: boolean, status: string}>
 * }} Initial state object
 */
const createInitialState = () => ({
  operationsStatus: OPERATION_STATUS.IDLE,
  platforms: Object.values(PLATFORMS).reduce(
    (acc, platform) => ({
      ...acc,
      [platform]: { isSelected: false, status: PLATFORM_STATUS.IDLE },
    }),
    {}
  ),
})

/**
 * Custom hook for managing platform selection and operation status
 * @returns {{
 *   platforms: Object<string, {isSelected: boolean, status: string}>,
 *   operationsStatus: string,
 *   togglePlatform: Function,
 *   updatePlatformStatus: Function,
 *   reset: Function
 * }} Platform management functions and state
 */
export function useAppStatus() {
  const [state, setState] = useState(createInitialState)
  const playSuccess = useOperationSuccess()

  /**
   * Toggles the selection state of a platform
   * @function
   * @param {string} platformName - Name of the platform to toggle
   */
  const togglePlatform = useCallback((platformName) => {
    const platformValue =
      PLATFORMS[platformName] ||
      Object.values(PLATFORMS).find(
        (value) => value.toLowerCase() === platformName.toLowerCase()
      )

    if (!platformValue) {
      console.warn(`Invalid platform: ${platformName}`)
      return
    }

    setState((current) => {
      const currentPlatform = current.platforms[platformValue]

      if (currentPlatform?.status !== PLATFORM_STATUS.IDLE) {
        return current
      }

      return {
        ...current,
        platforms: {
          ...current.platforms,
          [platformValue]: {
            ...currentPlatform,
            isSelected: !currentPlatform.isSelected,
          },
        },
      }
    })
  }, [])

  /**
   * Updates the status of a specific platform and manages overall operation status
   * @function
   * @param {string} platform - Platform identifier
   * @param {string} status - New status to set
   */
  const updatePlatformStatus = useCallback((platform, status) => {
    setState((current) => {
      if (!(platform in current.platforms)) {
        return current
      }

      const updatedPlatforms = {
        ...current.platforms,
        [platform]: {
          ...current.platforms[platform],
          status,
        },
      }

      const selectedPlatforms = Object.values(updatedPlatforms).filter(p => p.isSelected)
      
      const isInProgress = Object.values(updatedPlatforms).some((p) =>
        [PLATFORM_STATUS.PROCESSING, PLATFORM_STATUS.WAITING].includes(
          p.status.toLowerCase()
        )
      )

      const newOperationStatus = selectedPlatforms.length === 0 
        ? OPERATION_STATUS.IDLE
        : isInProgress
          ? OPERATION_STATUS.PROCESSING
          : selectedPlatforms.every((p) => p.status.toLowerCase() === 'finished')
            ? OPERATION_STATUS.FINISHED
            : current.operationsStatus

      if (newOperationStatus === OPERATION_STATUS.FINISHED && 
          current.operationsStatus !== OPERATION_STATUS.FINISHED) {
        console.log('Playing success sound...')
        playSuccess()
      }

      if (newOperationStatus !== current.operationsStatus) {
        console.log('Operation Status changed:', {
          from: current.operationsStatus,
          to: newOperationStatus,
          selectedPlatforms: selectedPlatforms.length
        })
      }

      return {
        ...current,
        platforms: updatedPlatforms,
        operationsStatus: newOperationStatus,
      }
    })
  }, [playSuccess])

  /**
   * Resets all platforms to their initial state
   * @function
   */
  const reset = useCallback(() => {
    console.log('Resetting app status...')
    const initialState = createInitialState()
    setState(current => ({
      ...initialState,
      platforms: Object.fromEntries(
        Object.entries(current.platforms).map(([key, _]) => [
          key,
          {
            isSelected: false,
            status: PLATFORM_STATUS.IDLE
          }
        ])
      ),
      operationsStatus: OPERATION_STATUS.IDLE
    }))
  }, [])

  /**
   * Memoized return value to prevent unnecessary re-renders
   */
  return useMemo(
    () => ({
      platforms: state.platforms,
      operationsStatus: state.operationsStatus,
      togglePlatform,
      updatePlatformStatus,
      reset,
    }),
    [
      state.platforms,
      state.operationsStatus,
      togglePlatform,
      updatePlatformStatus,
      reset,
    ]
  )
}
