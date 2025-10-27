// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

  // ✅ Redirect based on role
  const handleRedirect = (userData) => {
    if (userData?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  // ✅ Register User
  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (!data._id || !data.name || !data.role) {
        throw new Error("Invalid response from server");
      }

      // Store user data
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      
      // Handle navigation based on role
      handleRedirect(data);
      
      return data; // Return user data
    } catch (err) {
      console.error("Register error:", err.message);
      throw err; // Rethrow to handle in Navbar
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login User
  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data._id || !data.name || !data.role) {
        throw new Error("Invalid response from server");
      }

      // Store user data
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      
      // Handle navigation based on role
      handleRedirect(data);
      
      return data; // Return user data
    } catch (err) {
      console.error("Login error:", err.message);
      throw err; // Rethrow to handle in Navbar
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout User
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  // ✅ Stay logged in after refresh
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData && userData._id && userData.name && userData.role && userData.token) { // Validate user data
          setUser(userData);
        } else {
          localStorage.removeItem("user"); // Clear invalid data
        }
      }
    } catch (err) {
      console.error("Error parsing stored user:", err);
      localStorage.removeItem("user"); // Clear invalid data
    }
    finally {
      // initialization finished (whether we found a user or not)
      setInitializing(false);
    }
  }, []);

  // ✅ Prevent going back after login (history block)
  useEffect(() => {
    if (user && (location.pathname === "/login" || location.pathname === "/register")) {
      handleRedirect(user);
    }
  }, [user, location]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initializing,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);
