import { API_CONFIG } from "./config"

export class UserService {
    constructor(axiosInstance) {
      this.client = axiosInstance
    }
  
    async fetchUsers() {
      return this.client.get(API_CONFIG.ENDPOINTS.USERS)
    }
  
    async addUser(username, password, role) {
      return this.client.post(API_CONFIG.ENDPOINTS.USERS, {
        username,
        password,
        role
      })
    }
  
    async deleteUser(username) {
      return this.client.delete(`${API_CONFIG.ENDPOINTS.USERS}/${username}`)
    }
  
    async changePassword(username, newPassword) {
      return this.client.put(
        `${API_CONFIG.ENDPOINTS.USERS}/${username}/change-password`,
        { newPassword }
      )
    }
  }