import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./component/Home";
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
          <Route path="/" element={<Home />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
