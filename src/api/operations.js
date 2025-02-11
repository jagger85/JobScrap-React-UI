import { API_CONFIG } from "./config"

export class OperationsService {
    constructor(axiosInstance) {
        this.client = axiosInstance
        
        // Bind all methods to preserve 'this' context
        this.fetchAllOperations = this.fetchAllOperations.bind(this)
        this.fetchOperations = this.fetchOperations.bind(this)
        this.scrapOperationsByDateRange = this.scrapOperationsByDateRange.bind(this)
        this.deleteOperation = this.deleteOperation.bind(this)
        this.fetchOperationByTaskId = this.fetchOperationByTaskId.bind(this)
        this.fetchAutomatedScrapOperations = this.fetchAutomatedScrapOperations.bind(this)
        this.createAutomatedScrapOperation = this.createAutomatedScrapOperation.bind(this)
        this.deleteAutomatedScrapOperation = this.deleteAutomatedScrapOperation.bind(this)
        this.activateAutomatedScrapOperation = this.activateAutomatedScrapOperation.bind(this)
        this.deactivateAutomatedScrapOperation = this.deactivateAutomatedScrapOperation.bind(this)
    }

    async fetchAllOperations() {
        return this.client.get(API_CONFIG.ENDPOINTS.OPERATIONS)
    }

    async fetchOperations(cursor = null, limit = 10) {
        const params = new URLSearchParams()
        if (cursor) params.append('cursor', cursor)
        params.append('limit', limit)
        
        return this.client.get(`${API_CONFIG.ENDPOINTS.OPERATIONS}?${params.toString()}`)
    }

    async scrapOperationsByDateRange(keywords, dateRange, platform) {
        return this.client.post(`${platform}`, {
            keywords,
            days: dateRange
        })
    }

    async deleteOperation(id) {
        return this.client.delete(`${API_CONFIG.ENDPOINTS.OPERATIONS}/${id}`)
    }

    async fetchOperationByTaskId(taskId) {
        return this.client.get(`${API_CONFIG.ENDPOINTS.OPERATIONS}/task/${taskId}`)
    }

    async fetchAutomatedScrapOperations() {
        return this.client.get(API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP)
    }

    async createAutomatedScrapOperation(data) {
        return this.client.post(API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP, data)
    }

    async deleteAutomatedScrapOperation(id) {
        return this.client.delete(`${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}/${id}`)
    }

    async activateAutomatedScrapOperation(id) {
        return this.client.put(`${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}/${id}/activate`)
    }

    async deactivateAutomatedScrapOperation(id) {
        return this.client.put(`${API_CONFIG.ENDPOINTS.AUTOMATED_SCRAP}/${id}/deactivate`)
    }
}