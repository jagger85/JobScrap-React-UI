import { API_CONFIG } from './config'

export class OperationsService {
  constructor(axiosInstance) {
    this.client = axiosInstance

    // Bind all methods to preserve 'this' context
    this.fetchAllOperations = this.fetchAllOperations.bind(this)
    this.fetchOperations = this.fetchOperations.bind(this)
    this.scrapOperationsByDateRange = this.scrapOperationsByDateRange.bind(this)
    this.deleteOperation = this.deleteOperation.bind(this)
    this.fetchOperationByTaskId = this.fetchOperationByTaskId.bind(this)
  }

  async fetchAllOperations() {
    return await this.client.get(`${API_CONFIG.ENDPOINTS.OPERATIONS}/all`)
  }

  async fetchOperations(cursor = null, limit = 10) {
    const params = new URLSearchParams()
    if (cursor) params.append('cursor', cursor)
    params.append('limit', limit)

    return this.client.get(
      `${API_CONFIG.ENDPOINTS.OPERATIONS}?${params.toString()}`
    )
  }

  async scrapOperationsByDateRange(keywords, dateRange, platform) {
    return this.client.post(`${platform}`, {
      keywords,
      days: dateRange,
    })
  }

  async deleteOperation(id) {
    return this.client.delete(`${API_CONFIG.ENDPOINTS.OPERATIONS}/${id}`)
  }

  async fetchOperationByTaskId(taskId) {
    return this.client.get(`${API_CONFIG.ENDPOINTS.OPERATIONS}/task/${taskId}`)
  }
}
