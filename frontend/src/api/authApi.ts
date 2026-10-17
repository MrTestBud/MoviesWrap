import type { RegisterResponse } from '../types/models'
import apiClient from './apiClient'

export async function registerUser(username: string, password: string): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>('/auth/register', {
    username,
    password,
  })
  return response.data
}

export async function loginUser(username: string, password: string): Promise<string> {
  const response = await apiClient.post<string>('/auth/login', { username, password }, {
    transformResponse: [(data) => data],
    headers: { Accept: 'text/plain, application/json' },
  })

  const raw = response.data
  const token = typeof raw === 'string' ? raw.replace(/^"|"$/g, '').trim() : String(raw)
  if (!token) {
    throw new Error('Login succeeded but no token was returned.')
  }
  return token
}
