import axios from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Unable to connect to MovieWrap. Please try again.'
    }

    const status = error.response.status
    const data: unknown = error.response.data
    const backendMessage = readBackendMessage(data)

    if (status === 401) {
      if (backendMessage?.toLowerCase().includes('invalid username')) {
        return backendMessage
      }
      return 'Your session has expired. Please log in again.'
    }

    if (status === 403) {
      return backendMessage ?? "You don't have permission to perform this action."
    }

    if (status === 404) {
      return backendMessage ?? 'Movie not found.'
    }

    if (status === 400) {
      return backendMessage ?? fallback
    }

    if (status >= 500) {
      return 'Unable to connect to MovieWrap. Please try again.'
    }

    return backendMessage ?? fallback
  }

  return fallback
}

function readBackendMessage(data: unknown): string | null {
  if (typeof data === 'string') {
    const trimmed = data.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  if (data && typeof data === 'object' && 'message' in data) {
    const message = (data as { message?: unknown }).message
    if (typeof message === 'string' && message.trim().length > 0) {
      return message
    }
  }

  return null
}
