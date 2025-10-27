import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
const API_URL = import.meta.env.VITE_API_BASE_URL


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
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err.message);
      alert(err.message);
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
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout User
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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

// ✅ Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
