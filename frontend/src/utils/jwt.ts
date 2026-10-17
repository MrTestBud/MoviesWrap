export interface JwtPayload {
  sub?: string
  exp?: number
  iat?: number
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) {
      return null
    }
    const payload = parts[1]
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
    const json = atob(padded)
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

export function isJwtExpired(token: string): boolean {
  const payload = decodeJwt(token)
  if (!payload?.exp) {
    return false
  }
  return payload.exp * 1000 <= Date.now()
}

export function getUsernameFromToken(token: string): string | null {
  const payload = decodeJwt(token)
  return payload?.sub ?? null
}
