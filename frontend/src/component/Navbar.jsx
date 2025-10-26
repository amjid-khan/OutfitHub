import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  // 🧠 Auto Login (check token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Login/Register Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp
        ? `${BASE_URL}/api/auth/register`
        : `${BASE_URL}/api/auth/login`;

      const { data } = await axios.post(url, formData);

      // backend returns user fields at top-level (name, email, role, _id, token)
      const userData = data.user || { name: data.name, email: data.email, role: data.role, _id: data._id };
      const token = data.token || (data.user && data.user.token);

      // store token and user in localStorage (existing code expects these keys)
      if (token) localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      setShowForm(false);

      // Redirect with replace so back button doesn't go back to login
      if (userData.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Auth Error:", err.response?.data || err.message);
      alert("Authentication failed. Please check credentials!");
    }
  };

  // 🔹 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    // replace so pressing back doesn't re-open protected page
    navigate("/", { replace: true });
  };

  if (user?.role === 'admin') {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-6 py-3 bg-white shadow-md">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          Shoes Store
        </h1>

        <div className="flex items-center gap-6">
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-gray-600 hover:text-blue-600 transition">
              Home
            </button>
            <button onClick={() => navigate("/products")} className="text-gray-600 hover:text-blue-600 transition">
              Products
            </button>
            <button onClick={() => navigate("/categories")} className="text-gray-600 hover:text-blue-600 transition">
              Categories
            </button>
            <button onClick={() => navigate("/cart")} className="text-gray-600 hover:text-blue-600 transition">
              Cart
            </button>
          </nav>

          {/* Auth Section */}
          {!user ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">
                👋 {user.name || "User"}
              </span>
              <div className="flex items-center gap-4">
                <button onClick={() => navigate("/orders")} className="text-gray-600 hover:text-blue-600 transition">
                  My Orders
                </button>
                <button onClick={() => navigate("/profile")} className="text-gray-600 hover:text-blue-600 transition">
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              {isSignUp ? "Create Account" : "Login"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>

            <div className="text-center mt-4 text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 font-medium hover:underline"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
