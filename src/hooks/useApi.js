const getBaseUrl = () => {
    if (import.meta.env.PROD) {
      // Production environment
      return import.meta.env.VITE_API_URL
    }
    
    // Development environment
    return `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`
  }
  
  export const API_BASE_URL = getBaseUrl()