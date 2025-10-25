import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRole }) => {
  try {
    const token = localStorage.getItem('token')
    const userRaw = localStorage.getItem('user')
    const user = userRaw ? JSON.parse(userRaw) : null

    if (!token || !user) return <Navigate to="/" replace />

    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" replace />
    }

    return children
  } catch (e) {
    console.error('ProtectedRoute error', e)
    return <Navigate to="/" replace />
  }
}

export default ProtectedRoute
