import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  LogOut,
  ShoppingCart,
  Package,
  ChevronDown,
  Search,
  Heart,
  User,
  Menu,
  Eye,
  EyeOff,
  Tag,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, register, logout, isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-black text-white sticky top-0 z-40 shadow-lg">
        {/* Top Bar */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Tag className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent group-hover:from-red-400 group-hover:via-orange-400 group-hover:to-yellow-400 transition-all duration-300">
                  BLACK MART
                </span>
                <div className="text-xs text-gray-400 tracking-widest -mt-1 hidden sm:block group-hover:text-orange-500 transition-colors duration-300">
                  DEALS & DISCOUNTS
                </div>
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Wishlist - Hidden on small mobile */}
              <Link
                to="/wishlist"
                className="hidden sm:block relative p-2 hover:bg-gray-800 rounded-full transition"
              >
                <Heart size={20} className="text-gray-300" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-800 rounded-full transition"
              >
                <ShoppingCart size={20} className="text-gray-300" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-700"></div>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-800 transition"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform hidden sm:block ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-1">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="font-semibold text-sm text-white truncate">
                          {user.name}
                        </p>
                      </div>
                      <Link
                        to="/my-orders"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 transition text-gray-300 hover:text-white text-sm"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package size={16} />
                        <span>My Orders</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-900/30 transition text-red-500 text-sm"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm font-medium"
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-full transition ml-2"
              >
                <Menu size={20} className="text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Menu Bar - Hidden on mobile */}
        <div className="hidden lg:block bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center gap-1">
              <Link
                to="/"
                className={`px-5 py-3 text-sm font-semibold transition whitespace-nowrap relative group ${
                  isActive("/")
                    ? "text-orange-500"
                    : "text-gray-300 hover:text-orange-500"
                }`}
              >
                <span>HOME</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transform transition ${
                    isActive("/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </Link>
              <Link
                to="/products"
                className={`px-5 py-3 text-sm font-semibold transition whitespace-nowrap relative group ${
                  isActive("/products")
                    ? "text-orange-500"
                    : "text-gray-300 hover:text-orange-500"
                }`}
              >
                <span>NEW ARRIVALS</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transform transition ${
                    isActive("/products") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </Link>
              <Link
                to="/men"
                className={`px-5 py-3 text-sm font-semibold transition whitespace-nowrap relative group ${
                  isActive("/men")
                    ? "text-orange-500"
                    : "text-gray-300 hover:text-orange-500"
                }`}
              >
                <span>MEN</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transform transition ${
                    isActive("/men") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </Link>
              <Link
                to="/women"
                className={`px-5 py-3 text-sm font-semibold transition whitespace-nowrap relative group ${
                  isActive("/women")
                    ? "text-orange-500"
                    : "text-gray-300 hover:text-orange-500"
                }`}
              >
                <span>WOMEN</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transform transition ${
                    isActive("/women") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </Link>
              <Link
                to="/kids"
                className={`px-5 py-3 text-sm font-semibold transition whitespace-nowrap relative group ${
                  isActive("/kids")
                    ? "text-orange-500"
                    : "text-gray-300 hover:text-orange-500"
                }`}
              >
                <span>KIDS</span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transform transition ${
                    isActive("/kids") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </Link>
              <Link
                to="/sale"
                className={`px-5 py-3 text-sm font-bold transition whitespace-nowrap relative group ${
                  isActive("/sale")
                    ? "text-orange-500"
                    : ""
                }`}
              >
                <span className={isActive("/sale") ? "text-orange-500" : "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"}>
                  SALE
                </span>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transform transition ${
                    isActive("/sale") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="lg:hidden bg-gray-900 border-t border-gray-800 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition ${
                  isActive("/")
                    ? "text-orange-500 bg-gray-800"
                    : "text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                HOME
              </Link>
              <Link
                to="/products"
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition ${
                  isActive("/products")
                    ? "text-orange-500 bg-gray-800"
                    : "text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                NEW ARRIVALS
              </Link>
              <Link
                to="/men"
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition ${
                  isActive("/men")
                    ? "text-orange-500 bg-gray-800"
                    : "text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                MEN
              </Link>
              <Link
                to="/women"
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition ${
                  isActive("/women")
                    ? "text-orange-500 bg-gray-800"
                    : "text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                WOMEN
              </Link>
              <Link
                to="/kids"
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition ${
                  isActive("/kids")
                    ? "text-orange-500 bg-gray-800"
                    : "text-gray-300 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                KIDS
              </Link>
              <Link
                to="/sale"
                className={`block px-4 py-3 rounded-lg text-sm font-bold transition ${
                  isActive("/sale")
                    ? "text-orange-500 bg-gray-800"
                    : "text-red-500 hover:bg-red-900/20"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                SALE
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Login/Register Modal */}
      {isModalOpen && !isAuthenticated && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-sm p-6 relative shadow-2xl border border-gray-700">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-400 text-sm">
                {isLogin ? "Sign in to continue" : "Join us today"}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition"
                    placeholder="Full Name"
                    required
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition"
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              )}

              {error && (
                <div className="bg-red-900/30 border border-red-500 text-red-400 px-3 py-2 rounded-lg text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:from-red-500 hover:to-orange-500 transition"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-gray-400 hover:text-white text-sm transition"
              >
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span className="text-orange-500 font-semibold">
                  {isLogin ? "Sign up" : "Sign in"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;