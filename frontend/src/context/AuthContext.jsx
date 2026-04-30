import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('adminViewMode') || null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          const res = await AuthAPI.me()
          setUser(res.data.data)
          localStorage.setItem('user', JSON.stringify(res.data.data))
        } catch {
          logout()
        }
      }
      setLoading(false)
    }
    init()
  }, [])

  const login = async (email, password, roleHint) => {
    if (roleHint) {
      const demoCreds =
        roleHint === 'admin'
          ? { email: 'admin@leapfrog.com', password: 'Admin@123' }
          : roleHint === 'company'
          ? { email: 'himal@demo.com', password: 'Employer@123' }
          : { email: 'aarav.sharma@demo.com', password: 'Student@123' }
      const res = await AuthAPI.login(demoCreds)
      const data = res.data.data
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.user.role !== 'admin') {
        setViewMode(null)
        localStorage.removeItem('adminViewMode')
      }
      return data.user
    }
    const res = await AuthAPI.login({ email, password })
    const data = res.data.data
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    setUser(data.user)
    localStorage.setItem('user', JSON.stringify(data.user))
    if (data.user.role !== 'admin') {
      setViewMode(null)
      localStorage.removeItem('adminViewMode')
    }
    return data.user
  }

  const register = async (data) => {
    const res = await AuthAPI.register(data)
    const out = res.data.data
    localStorage.setItem('access_token', out.access_token)
    localStorage.setItem('refresh_token', out.refresh_token)
    setUser(out.user)
    localStorage.setItem('user', JSON.stringify(out.user))
    return out.user
  }

  const logout = () => {
    const refresh = localStorage.getItem('refresh_token')
    if (refresh) AuthAPI.logout(refresh).catch(() => {})
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    localStorage.removeItem('adminViewMode')
    setUser(null)
    setViewMode(null)
  }

  const updateUser = (data) => {
    const updated = { ...user, ...data }
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const switchView = (mode) => {
    if (user?.role === 'admin') {
      setViewMode(mode)
      if (mode) {
        localStorage.setItem('adminViewMode', mode)
      } else {
        localStorage.removeItem('adminViewMode')
      }
    }
  }

  const effectiveRole = user?.role === 'admin' && viewMode ? viewMode : user?.role

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, viewMode, switchView, effectiveRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
