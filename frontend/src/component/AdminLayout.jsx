import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Home, Users, ShoppingBag, Settings, LogOut } from 'lucide-react';
import axios from 'axios';

const AdminSidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState('/admin/dashboard');
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <div className="min-h-screen w-64 bg-gray-800 text-white py-6 px-4 fixed left-0 top-0">
      {/* Admin Logo/Brand */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <Layout className="h-6 w-6" />
        <span className="text-xl font-bold">Admin Panel</span>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activePath === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout at bottom */}
      <button
        onClick={onLogout}
        className="absolute bottom-6 left-4 right-4 flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/', { replace: true });
  };

  // Extra protection
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar onLogout={handleLogout} />
      
      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Welcome Header */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <span className="text-gray-600">Welcome back,</span>
          <h1 className="text-2xl font-bold">{user.name}</h1>
        </div>
        
        {/* Dynamic Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;