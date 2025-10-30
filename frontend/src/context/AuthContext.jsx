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

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

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
      const res = await fetch(`${API_URL}/api/auth/register`, {
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
      const res = await fetch(`${API_URL}/api/auth/login`, {
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
        if (
          userData &&
          userData._id &&
          userData.name &&
          userData.role &&
          userData.token
        ) {
          // Validate user data
          setUser(userData);
        } else {
          localStorage.removeItem("user"); // Clear invalid data
        }
      }
    } catch (err) {
      console.error("Error parsing stored user:", err);
      localStorage.removeItem("user"); // Clear invalid data
    } finally {
      // initialization finished (whether we found a user or not)
      setInitializing(false);
    }
  }, []);

  // ✅ Prevent going back after login (history block)
  useEffect(() => {
    if (
      user &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      handleRedirect(user);
    }
  }, [user, location]);

  // ✅ Product API Methods
  const getAllProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // 👈 token from logged-in user
        },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json();
    } catch (err) {
      console.error("Get all products error:", err.message);
      throw err;
    }
  };

  const getProductById = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch product details");
      return await res.json();
    } catch (err) {
      console.error("Get product by ID error:", err.message);
      throw err;
    }
  };

  const addProduct = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/api/products/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData, // Multer expects FormData (image + fields)
      });
      if (!res.ok) throw new Error("Failed to add product");
      return await res.json();
    } catch (err) {
      console.error("Add product error:", err.message);
      throw err;
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update product");
      return await res.json();
    } catch (err) {
      console.error("Update product error:", err.message);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return await res.json();
    } catch (err) {
      console.error("Delete product error:", err.message);
      throw err;
    }
  };

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

        getAllProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook
export const useAuth = () => useContext(AuthContext);
