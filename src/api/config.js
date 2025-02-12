export const API_CONFIG = {
    BASE_URL: import.meta.env.PROD 
      ? import.meta.env.VITE_API_URL 
      : `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api`,
    
    SOCKET_URL: import.meta.env.PROD
      ? import.meta.env.VITE_API_SOCKET
      : `ws://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/socket`,
  
    ENDPOINTS: {
      USERS: '/users',
      AUTH: '/auth',
      OPERATIONS: '/operations',
      SCHEDULED_SCRAP: '/scheduled_scrap_operations',
    }
  }