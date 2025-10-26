import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./component/Home";
import AdminLayout from "./component/AdminLayout";
import AdminDashboard from "./component/AdminDashboard";

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    try {
      const userRaw = localStorage.getItem('user')
      const user = userRaw ? JSON.parse(userRaw) : null
      // If logged in as admin and currently at the public home, redirect to admin dashboard
      if (user && user.role === 'admin') {
        // Avoid redirect loop if already on admin path
        if (!location.pathname.startsWith('/admin')) {
          navigate('/admin/dashboard', { replace: true })
        }
      }
    } catch (e) {
      console.error('App init redirect error', e)
    }
  }, [location.pathname, navigate])
  return (
    <div>
      <Navbar />

      <main>
        <Routes>
          {/* Public and User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/categories" element={<Home />} />
          <Route path="/cart" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          {/* Admin Routes - All wrapped in AdminLayout */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<div>Users Management</div>} />
            <Route path="products" element={<div>Products Management</div>} />
            <Route path="settings" element={<div>Admin Settings</div>} />
          </Route>

          {/* fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
