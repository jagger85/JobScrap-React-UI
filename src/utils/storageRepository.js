/**
 * Utility for managing browser storage operations
 * Handles both localStorage and sessionStorage with unified interface
 * @type {Object}
 */
export const StorageRepository = {
  /**
   * Stores a value in either local or session storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   * @param {boolean} [rememberMe=false] - If true, uses localStorage, otherwise sessionStorage
   */
  setItem: (key, value, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  },

  /**
   * Retrieves a value from storage, checking both local and session storage
   * @param {string} key - Storage key to retrieve
   * @returns {*} Parsed value from storage or null if not found
   */
  getItem: (key) => {
    const localValue = localStorage.getItem(key);
    const sessionValue = sessionStorage.getItem(key);
    return JSON.parse(localValue || sessionValue || null);
  },

  /**
   * Removes a value from both local and session storage
   * @param {string} key - Storage key to remove
   */
  removeItem: (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};