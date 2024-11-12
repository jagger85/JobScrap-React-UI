import { useState } from 'react';
import { StorageRepository } from '../utils/storageRepository'
import { STORAGE_KEYS } from '../constants';

/**
 * Key used for storing authentication token
 * @type {string}
 */
const TOKEN_KEY = STORAGE_KEYS.BEARER_TOKEN_KEY

/**
 * Custom hook for managing storage (local/session) operations
 * @param {*} initialValue - Initial value to use if no stored value exists
 * @param {boolean} [rememberMe=false] - Whether to use persistent storage
 * @returns {[
 *   any,
 *   (value: any, remember?: boolean) => void,
 *   () => void
 * ]} Tuple containing stored value, setter function, and clear function
 */
export const useStorage = (initialValue, rememberMe = false) => {
  /**
   * State for storing the current value
   * Initializes from storage or falls back to initial value
   * @type {[any, Function]}
   */
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return StorageRepository.getItem(TOKEN_KEY) || initialValue;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return initialValue;
    }
  });

  /**
   * Updates the stored value in both state and storage
   * @function
   * @param {*} value - New value to store
   * @param {boolean} [remember=rememberMe] - Whether to use persistent storage
   */
  const setValue = (value, remember = rememberMe) => {
    try {
      setStoredValue(value);
      StorageRepository.setItem(TOKEN_KEY, value, remember);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  /**
   * Clears the stored value from both state and storage
   * @function
   */
  const clearValue = () => {
    try {
      setStoredValue(null);
      StorageRepository.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  return [storedValue, setValue, clearValue];
};