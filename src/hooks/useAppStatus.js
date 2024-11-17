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
        return current;
      }

      const updatedPlatforms = {
        ...current.platforms,
        [platform]: {
          ...current.platforms[platform],
          status,
        },
      };

      // Check if any platform (selected or not) is in PROCESSING or WAITING state
      const hasProcessingOrWaiting = Object.values(updatedPlatforms).some(p => 
        [PLATFORM_STATUS.PROCESSING, PLATFORM_STATUS.WAITING].includes(p.status.toLowerCase())
      );

      // If any platform is processing/waiting, operation must be PROCESSING
      let newOperationStatus = hasProcessingOrWaiting 
        ? OPERATION_STATUS.PROCESSING 
        : current.operationsStatus;

      console.log('Current State:', {
        platforms: Object.entries(updatedPlatforms).map(([key, value]) => ({
          platform: key,
          status: value.status
        })),
        hasProcessingOrWaiting,
        operationStatus: newOperationStatus
      });

      return {
        ...current,
        platforms: updatedPlatforms,
        operationsStatus: newOperationStatus
      };
    });
  }, [playSuccess]);

  /**
   * Resets all platforms to their initial state
   * @function
   */
  const reset = useCallback(() => {
    setState(() => {
        const newState = {
            operationsStatus: OPERATION_STATUS.IDLE,
            platforms: Object.fromEntries(
                Object.values(PLATFORMS).map(platform => [
                    platform,
                    {
                        isSelected: false,
                        status: PLATFORM_STATUS.IDLE
                    }
                ])
            )
        }
        return newState
    })
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
