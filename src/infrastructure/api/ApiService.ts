import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export class ApiService {
    private axiosInstance: AxiosInstance
    private isCSRFSet = false

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            withCredentials: true,
            withXSRFToken: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Optional: Add interceptors
        this.axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
                const method = config.method?.toUpperCase()

                if (!this.isCSRFSet && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '')) {
                    // Use a separate instance to avoid interceptor recursion
                    await axios.get(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true })
                    this.isCSRFSet = true
                }

                return config
            }
        )

        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                console.error('API Error:', error.response)
                return Promise.reject(error)
            }
        )
    }

    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config)
    }

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config)
    }

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config)
    }

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config)
    }

    setAuthorizationToken(token: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}
