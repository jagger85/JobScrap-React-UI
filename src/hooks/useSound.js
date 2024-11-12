import { useCallback } from 'react';
import successSound from '../assets/sounds/operation_finished.mp3';

/**
 * Custom hook for playing success operation sound
 * @returns {Function} Callback function to play success sound
 */
const useOperationSuccess = () => {
  /**
   * Plays the success sound effect
   * Handles errors silently if sound playback fails
   * @function
   * @returns {Promise<void>}
   */
  const play = useCallback(() => {
    new Audio(successSound).play()
      .catch(error => console.error('Error playing sound:', error));
  }, []);

  return play;
};

/**
 * Custom hook for playing error operation sound
 * Currently a placeholder for future implementation
 * @returns {Function} Callback function to play error sound
 */
const useOperationError = () => {
  /**
   * Placeholder for error sound playback
   * Currently only logs to console
   * @function
   */
  const play = useCallback(() => {
    console.log('Error sound not implemented');
  }, []);

  return play;
};

export { useOperationSuccess, useOperationError };
