import { API_CONFIG } from "./config"

export class AuthService {
    constructor(axiosInstance) {
        this.client = axiosInstance
        if (process.env.NODE_ENV === 'development' && !AuthService.hasLogged) {
            console.log('AuthService: Initialized with axios instance:', !!axiosInstance)
            AuthService.hasLogged = true
        }
        
        // Bind methods to preserve 'this' context
        this.login = this.login.bind(this)
        this.validateToken = this.validateToken.bind(this)
    }

    async login(username, password, rememberMe) {
        try {
            console.log('AuthService: Attempting login...', { 
                username, 
                rememberMe,
                endpoint: API_CONFIG.ENDPOINTS.AUTH + '/login'
            })
            
            const data = await this.client.post(API_CONFIG.ENDPOINTS.AUTH + '/login', {
                username,
                password,
                remember_me: rememberMe
            })
            
            console.log('AuthService: Login response:', data)
            
            if (!data) {
                console.warn('AuthService: Response data is undefined or null')
                throw new Error('Invalid response format')
            }
            
            return data
        } catch (error) {
            console.error('AuthService: Login error:', {
                name: error.name,
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config
            })
            throw error
        }
    }

    async validateToken() {
        try {
            console.log('AuthService: Validating token...')
            
            const data = await this.client.get(API_CONFIG.ENDPOINTS.AUTH + '/validate-token')
            
            console.log('AuthService: Token validation response:', data)
            
            if (!data) {
                console.warn('AuthService: Validation response data is undefined or null')
                throw new Error('Invalid validation response format')
            }
            
            return data
        } catch (error) {
            console.error('AuthService: Token validation error:', {
                name: error.name,
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config
            })
            throw error
        }
    }
}
