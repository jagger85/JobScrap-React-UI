import { useState } from 'react';
import { StorageRepository } from '../utils/storageRepository';
import { STORAGE_KEYS } from '../constants';

/**
 * Base URL for the backend API
 * @type {string}
 */
const API_BASE_URL = `http://${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`;

/**
 * Custom hook for fetching job listings from the backend
 * @returns {{
 *   listings: Array<Object>,
 *   error: string|null,
 *   fetchListings: Function
 * }} Listings data, error state, and fetch function
 */
export const useFetchListings = () => {
  /**
   * State for storing fetched listings
   * @type {[Array<Object>, Function]}
   */
  const [listings, setListings] = useState([]);

  /**
   * State for storing error messages
   * @type {[string|null, Function]}
   */
  const [error, setError] = useState(null);

  /**
   * Fetches job listings from the backend API
   * @async
   * @function
   * @returns {Promise<Array<Object>>} Array of job listings
   * @throws {Error} When API request fails or backend URL is not configured
   */
  const fetchListings = async () => {
    if (!API_BASE_URL) {
      throw new Error('Backend URL not configured in environment variables');
    }

    setError(null);

    const token = StorageRepository.getItem(STORAGE_KEYS.BEARER_TOKEN_KEY);

    try {
      const response = await fetch(`${API_BASE_URL}/api/fetch-listings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}. Response: ${responseText}`
        );
      }

      const data = responseText ? JSON.parse(responseText) : null;
      const fetchedListings = data.listings || [];
      setListings(fetchedListings);
      return fetchedListings;
    } catch (error) {
      setError(error.message);
      setListings([]);
      throw error;
    }
  };

  return { listings, error, fetchListings };
};
