import { createContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '@/api/api'
import { saveAuth, getToken, getUser, clearAuth, isTokenExpired } from '@/utils/auth'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      const savedUser = getUser()

      if (token && savedUser && !isTokenExpired(token)) {
        setUser(savedUser)
        setIsAuthenticated(true)
      } else {
        clearAuth()
        setUser(null)
        setIsAuthenticated(false)
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = useCallback(async (utorid, password) => {
    try {
      const response = await authAPI.login(utorid, password)
      saveAuth(response.token, response.user)
      setUser(response.user)
      setIsAuthenticated(true)
      return { success: true, user: response.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [])

  const logout = useCallback(() => {
    clearAuth()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const updateUser = useCallback((userData) => {
    setUser(prev => ({ ...prev, ...userData }))
    const token = getToken()
    if (token) {
      saveAuth(token, { ...user, ...userData })
    }
  }, [user])

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

