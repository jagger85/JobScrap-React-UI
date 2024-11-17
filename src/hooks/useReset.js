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

            const response = await fetch(`${API_BASE_URL}/reset`, {
                method: 'GET',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                },
            });
            
            if (response.status === 200) {
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
    const resetAll = async (reset) => {
        try {
            reset();
            await resetPlatforms();
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
