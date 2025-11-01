// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [wishlistCount, setWishlistCount] = useState(0);

  // 🛒 New cart states
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

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

      if (!res.ok) throw new Error(data.message || "Registration failed");
      if (!data._id || !data.name || !data.role)
        throw new Error("Invalid response from server");

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      handleRedirect(data);
      return data;
    } catch (err) {
      console.error("Register error:", err.message);
      throw err;
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

      if (!res.ok) throw new Error(data.message || "Login failed");
      if (!data._id || !data.name || !data.role)
        throw new Error("Invalid response from server");

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      handleRedirect(data);
      return data;
    } catch (err) {
      console.error("Login error:", err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout User
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCartItems([]);
    setCartCount(0);
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
          setUser(userData);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (err) {
      console.error("Error parsing stored user:", err);
      localStorage.removeItem("user");
    } finally {
      setInitializing(false);
    }
  }, []);

  // ✅ Prevent going back after login
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
          Authorization: `Bearer ${user?.token}`,
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
        body: formData,
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

  // 🛒 CART API METHODS
  const getCart = async () => {
    try {
      if (!user?.token) return [];
      const res = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const items = res.data?.cart || [];
      setCartItems(items);
      setCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
      return items;
    } catch (error) {
      console.error("Get Cart Error:", error);
      toast.error("Failed to load cart.");
      return [];
    }
  };

  const addToCart = async (productId) => {
    try {
      if (!user?.token) {
        toast.error("Please login to add items to your cart!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Product added to cart!");
      // ✅ Update cart immediately after adding
      await getCart();
      return response.data;
    } catch (error) {
      console.error("Add to Cart Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to add product to cart."
      );
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/cart/update`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await getCart();
      return res.data;
    } catch (error) {
      console.error("Update Cart Error:", error);
      toast.error("Failed to update quantity.");
    }
  };

const removeFromCart = async (productId) => {
  try {
    const res = await axios.delete(`${API_URL}/api/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    toast.info("Removed from cart!");
    await getCart();
    return res.data;
  } catch (error) {
    console.error("Remove Cart Error:", error);
    toast.error("Failed to remove item.");
  }
};


  // 💖 WISHLIST API METHODS
  const getWishlist = async () => {
    try {
      if (!user?.token) {
        console.warn("⏳ Token not ready yet, skipping wishlist call");
        return [];
      }

      const response = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const products = response.data?.wishlist?.products || [];
      setWishlistCount(products.length);
      return products;
    } catch (error) {
      console.error("❌ Get Wishlist Error:", error);
      toast.error(error.response?.data?.message || "Failed to load wishlist.");
      return [];
    }
  };

  const addToWishlist = async (productId) => {
    try {
      if (!user?.token) {
        toast.error("Please login to add items to wishlist!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/wishlist/add`,
        { productId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success("Added to wishlist!");
      await getWishlist();
      return response.data;
    } catch (error) {
      console.error("Add to Wishlist Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to add to wishlist."
      );
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      if (!user?.token) {
        toast.error("Please login first!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/wishlist/remove`,
        { productId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.info("Removed from wishlist!");
      await getWishlist();
      return response.data;
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to remove from wishlist."
      );
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      if (!user?.token) {
        toast.error("Please login to manage your wishlist!");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/wishlist/toggle`,
        { productId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      await getWishlist();
      return response.data;
    } catch (error) {
      console.error("Toggle Wishlist Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update wishlist."
      );
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

        // ✅ Cart
        cartItems,
        cartCount,
        getCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,

        // ✅ Wishlist
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        wishlistCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
