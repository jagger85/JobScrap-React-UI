import { useState } from 'react';

import { StorageRepository } from '../utils/storageRepository';
import { STORAGE_KEYS } from '../constants';
import { useAppStatus } from './useAppStatus';
import { API_BASE_URL } from './useApi'


/**
 * Custom hook to handle platform reset operations
 * @returns {{
 *   resetAll: Function,
 *   isResetting: boolean,
 *   error: string|null
 * }} Reset functions and status indicators
 */
const useResetServer = () => {
    /**
     * State for tracking reset operation status
     * @type {[boolean, Function]}
     */
    const [isResetting, setIsResetting] = useState(false);

    /**
     * State for storing error messages
     * @type {[string|null, Function]}
     */
    const [error, setError] = useState(null);

    /**
     * Reset function from useAppStatus hook
     * @type {Function}
     */
    const { reset } = useAppStatus()

    /**
     * Resets all platforms by calling the server reset endpoint
     * @async
     * @function
     * @returns {Promise<boolean>} Success status of the reset operation
     * @throws {Error} When server request fails
     */
    const resetPlatforms = async () => {
        setIsResetting(true);
        setError(null);
        
        try {
            const token = StorageRepository.getItem(STORAGE_KEYS.BEARER_TOKEN_KEY);
            console.log('Starting server reset...');

            const response = await fetch(`${API_BASE_URL}/reset`, {
                method: 'GET',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                },
            });
            
            if (response.status === 200) {
                console.log('Server reset successful');
                return true;
            }
            throw new Error('Reset failed');
        } catch (err) {
            console.error('Server reset failed:', err);
            setError(err.message);
            throw err;
        } finally {
            setIsResetting(false);
        }
    };

    /**
     * Performs a complete reset of both local state and server state
     * @async
     * @function
     * @throws {Error} When any part of the reset process fails
     */
    const resetAll = async () => {
        try {
            console.log('Starting resetAll...');
            // First reset the local state
            reset();
            
            // Then reset the server
            await resetPlatforms();
            
            // Force a final state reset to ensure UI is updated
            reset();
            
            // Wait for any pending state updates
            await new Promise(resolve => setTimeout(resolve, 0));
            
            console.log('Final reset completed');
        } catch (error) {
            console.error('Reset all failed:', error);
            throw error;
        }
    };

    return {
        resetAll,
        isResetting,
        error
    };
};

export default useResetServer;
