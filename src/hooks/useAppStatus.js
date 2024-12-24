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

      // 1. Get Active Platforms (platforms with non-idle states)
      const activePlatforms = Object.values(updatedPlatforms).filter(p => 
        p.status.toLowerCase() !== PLATFORM_STATUS.IDLE.toLowerCase()
      );

      // 2. If no active platforms, keep or return to IDLE
      if (activePlatforms.length === 0) {
        return {
          ...current,
          platforms: updatedPlatforms,
          operationsStatus: OPERATION_STATUS.IDLE
        };
      }

      // 3. Check if any platform is in PROCESSING or WAITING state
      const hasProcessingOrWaiting = activePlatforms.some(p => 
        [PLATFORM_STATUS.PROCESSING, PLATFORM_STATUS.WAITING].includes(p.status.toLowerCase())
      );

      // 4. Check if all active platforms are finished or error
      const allActiveCompleted = activePlatforms.every(p => 
        [PLATFORM_STATUS.FINISHED, PLATFORM_STATUS.ERROR].includes(p.status.toLowerCase())
      );

      // Determine the new operation status
      let newOperationStatus;
      if (hasProcessingOrWaiting) {
        newOperationStatus = OPERATION_STATUS.PROCESSING;
      } else if (allActiveCompleted) {
        newOperationStatus = OPERATION_STATUS.FINISHED;
        playSuccess();
      } else {
        newOperationStatus = current.operationsStatus;
      }

      console.log('Current State:', {
        activePlatforms: activePlatforms.map(p => ({
          platform: p.platform,
          status: p.status
        })),
        hasProcessingOrWaiting,
        allActiveCompleted,
        operationStatus: newOperationStatus
      });

      return {
        ...current,
        platforms: updatedPlatforms,
        operationsStatus: newOperationStatus,
        hasProcessingOrWaiting
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
