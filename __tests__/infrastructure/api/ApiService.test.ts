import axios from 'axios'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ApiService } from '../../../src/infrastructure/api/ApiService'

vi.mock('axios')

describe('ApiService', () => {
    let apiService: ApiService
    const baseURL = 'http://localhost'

    beforeEach(() => {
        vi.clearAllMocks()
            ; (axios.create as any).mockReturnValue({
                get: vi.fn(),
                post: vi.fn(),
                put: vi.fn(),
                delete: vi.fn(),
                interceptors: {
                    request: { use: vi.fn() },
                    response: { use: vi.fn() },
                },
                defaults: { headers: { common: {} } },
            })

        apiService = new ApiService(baseURL)
    })

    it('should create axios instance with correct baseURL', () => {
        expect(axios.create).toHaveBeenCalledWith(
            expect.objectContaining({
                baseURL,
                withCredentials: true,
                withXSRFToken: true,
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                headers: { 'Content-Type': 'application/json' },
            })
        )
    })

    it('should call get method', async () => {
        const response = { data: { foo: 'bar' } }
        const mockGet = (apiService as any).axiosInstance.get
        mockGet.mockResolvedValue(response)

        const result = await apiService.get('/test')

        expect(mockGet).toHaveBeenCalledWith('/test', undefined)
        expect(result).toBe(response)
    })

    it('should set Authorization header', () => {
        apiService.setAuthorizationToken('abc123')
        expect((apiService as any).axiosInstance.defaults.headers.common['Authorization']).toBe('Bearer abc123')
    })
})
