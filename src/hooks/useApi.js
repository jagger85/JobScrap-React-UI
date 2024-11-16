const getBaseUrl = () => {
    // Test if env files are being read at all
    console.log('Test env var:', import.meta.env.VITE_TEST)
    console.log('All env vars:', import.meta.env)

    if (import.meta.env.PROD) {
      return import.meta.env.VITE_API_URL
    }
    
    return `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}`
}
  
export const API_BASE_URL = getBaseUrl()