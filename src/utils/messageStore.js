import { create } from 'zustand';

/**
 * Zustand store for managing application messages
 * @type {import('zustand').StoreApi<{
 *   messages: string[],
 *   addMessage: (message: string) => void,
 *   clearMessages: () => void,
 *   getLastMessage: () => string|null
 * }>}
 */
const useMessageStore = create((set, get) => ({
  /**
   * Array of message strings
   * @type {string[]}
   */
  messages: [],

  /**
   * Adds a new message to the store
   * @param {string} message - Message to add
   */
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),

  /**
   * Clears all messages from the store
   */
  clearMessages: () => set({ messages: [] }),

  /**
   * Retrieves the most recent message
   * @returns {string|null} Last message or null if no messages exist
   */
  getLastMessage: () => {
    const state = get();
    return state.messages[state.messages.length - 1] || null;
  },
}));

export default useMessageStore; 