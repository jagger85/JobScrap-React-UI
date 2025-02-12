import { API_CONFIG } from './config'

export class ScheduledOperationsService {
  constructor(axiosInstance) {
    this.client = axiosInstance
  }

  async fetchScheduledScrapOperations() {
    return this.client.get(API_CONFIG.ENDPOINTS.SCHEDULED_SCRAP)
  }

  async createScheduledScrapOperation(data) {
    return this.client.post(API_CONFIG.ENDPOINTS.SCHEDULED_SCRAP, data)
  }

  async deleteScheduledScrapOperation(id) {
    return this.client.delete(`${API_CONFIG.ENDPOINTS.SCHEDULED_SCRAP}/${id}`)
  }

  async activateScheduledScrapOperation(id) {
    return this.client.put(
      `${API_CONFIG.ENDPOINTS.SCHEDULED_SCRAP}/${id}/activate`
    )
  }

  async deactivateScheduledScrapOperation(id) {
    return this.client.put(
      `${API_CONFIG.ENDPOINTS.SCHEDULED_SCRAP}/${id}/deactivate`
    )
  }
}
