const getBaseUrl = () => {
    // Debug logs
    console.log('Environment variables:', {
      isProd: import.meta.env.PROD,
      mode: import.meta.env.MODE,
      apiUrl: import.meta.env.VITE_API_URL,
      backendHost: import.meta.env.VITE_BACKEND_HOST,
      backendPort: import.meta.env.VITE_BACKEND_PORT
    })

    if (import.meta.env.PROD) {
      return import.meta.env.VITE_API_URL
    }
    
    return `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`
}
  
export const API_BASE_URL = getBaseUrl()