const getBaseUrl = () => {

    if (import.meta.env.PROD) {
      return import.meta.env.VITE_API_URL
    }
    
    return `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`
}
  
export const API_BASE_URL = getBaseUrl()