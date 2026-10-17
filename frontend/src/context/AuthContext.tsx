import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { loginUser, registerUser } from '../api/authApi'
import { clearToken, getStoredToken, storeToken } from '../api/apiClient'
import type { RegisterResponse, UserProfile } from '../types/models'
import { getUsernameFromToken, isJwtExpired } from '../utils/jwt'

interface AuthContextValue {
  user: UserProfile | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<RegisterResponse>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function profileFromToken(token: string | null): UserProfile | null {
  if (!token || isJwtExpired(token)) {
    return null
  }
  const username = getUsernameFromToken(token)
  return username ? { username } : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [user, setUser] = useState<UserProfile | null>(() => profileFromToken(getStoredToken()))

  const logout = useCallback(() => {
    clearToken()
    setToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    const stored = getStoredToken()
    if (stored && isJwtExpired(stored)) {
      logout()
    }

    const onUnauthorized = () => logout()
    window.addEventListener('moviewrap:unauthorized', onUnauthorized)
    return () => window.removeEventListener('moviewrap:unauthorized', onUnauthorized)
  }, [logout])

  const login = useCallback(async (username: string, password: string) => {
    const nextToken = await loginUser(username, password)
    storeToken(nextToken)
    setToken(nextToken)
    setUser({ username: getUsernameFromToken(nextToken) ?? username })
  }, [])

  const register = useCallback(async (username: string, password: string) => {
    return registerUser(username, password)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, token, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
