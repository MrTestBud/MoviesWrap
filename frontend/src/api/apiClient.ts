import axios from 'axios'

const TOKEN_KEY = 'moviewrap_token'

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function storeToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

const envBase = import.meta.env.VITE_API_BASE_URL
const apiClient = axios.create({
  baseURL: envBase && envBase.length > 0 ? envBase : '/api',
  timeout: 15000,
  transformResponse: [
    (data: unknown) => {
      if (typeof data !== 'string') {
        return data
      }
      try {
        return JSON.parse(data)
      } catch {
        return data
      }
    },
  ],
})

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const url = error.config?.url ?? ''
      const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register')

      if (status === 401 && !isAuthEndpoint) {
        clearToken()
        window.dispatchEvent(new CustomEvent('moviewrap:unauthorized'))
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
