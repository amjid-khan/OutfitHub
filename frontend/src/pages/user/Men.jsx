import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Zap, Eye, Sparkles, TrendingUp, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Men = () => {
  const navigate = useNavigate();
  const { getAllProducts, addToCart, user, getWishlist, toggleWishlist } = useAuth();

  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Shoes");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const categories = [
    { id: 1, name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop" },
    { id: 2, name: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop" },
    { id: 3, name: "Pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop" },
    { id: 4, name: "Glasses", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=300&fit=crop" },
    { id: 5, name: "Perfumes", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=300&fit=crop" },
    { id: 6, name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" },
    { id: 7, name: "Jackets", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop" },
    { id: 8, name: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        const menProducts = data.filter((item) => item.mainCategory === "Men");
        setAllProducts(menProducts);
      } catch (err) {
        console.error("Error fetching men products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [getAllProducts]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const wishlistData = await getWishlist();
          const items = Array.isArray(wishlistData)
            ? wishlistData
            : wishlistData?.wishlist || [];
          const normalized = items.map((item) =>
            typeof item === "string" ? item : item._id
          );
          setWishlist(normalized);
        } catch (error) {
          console.error("Error loading wishlist:", error);
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    };
    fetchWishlist();
  }, [user, getWishlist]);

  const filteredProducts = allProducts.filter(
    (product) => product.subCategory === selectedCategory
  );

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.warn("Please login to add items to your cart!");
      return;
    }
    await addToCart(productId);
    toast.success("Added to cart 🛒");
  };

  const handleWishlistToggle = async (productId) => {
    if (!user) {
      toast.warn("Please login to manage your wishlist!");
      return;
    }

    try {
      const res = await toggleWishlist(productId);
      if (res?.message?.includes("Added")) {
        toast.success("Added to wishlist ❤️");
        setWishlist([...wishlist, productId]);
      } else if (res?.message?.includes("Removed")) {
        toast.info("Removed from wishlist 💔");
        setWishlist(wishlist.filter((id) => id !== productId));
      } else {
        if (wishlist.includes(productId)) {
          setWishlist(wishlist.filter((id) => id !== productId));
          toast.info("Removed from wishlist 💔");
        } else {
          setWishlist([...wishlist, productId]);
          toast.success("Added to wishlist ❤️");
        }
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      toast.error("Error updating wishlist!");
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* 🌟 Modern Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Premium Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold tracking-wide">Premium Collection 2025</span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          </div>

          {/* Hero Content - Left Text, Right Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left">
              <h1 className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                Elevate Your Style
              </h1>
              <p className="text-blue-100 text-lg mb-8 font-medium leading-relaxed">
                Discover premium men's fashion that blends timeless elegance with contemporary trends. 
                From sophisticated formal wear to casual essentials, find everything to define your unique style.
              </p>
              
              {/* Stats */}
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-blue-200 text-sm">Premium Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-blue-200 text-sm">Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-blue-200 text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Right Side - All Category Images Grid */}
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-1 left-1 right-1">
                    <p className="text-white text-xs font-bold text-center truncate">
                      {cat.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📋 Simple Checkbox Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Filter Categories:</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={isSelected}
                      onChange={() => handleCategoryChange(cat.name)}
                      className="hidden"
                    />
                    <div className={`w-3 h-3 rounded border flex items-center justify-center ${
                      isSelected ? 'bg-white border-blue-600' : 'border-gray-400'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>}
                    </div>
                    <span className="font-medium text-sm whitespace-nowrap">
                      {cat.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 🛍️ Compact Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <Zap className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-gray-600 font-semibold mt-6">Loading premium products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-4">
              <ShoppingBag className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-gray-600 text-xl font-semibold">
              No products found in "{selectedCategory}"
            </p>
            <p className="text-gray-400 mt-2">Try selecting another category</p>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                    {selectedCategory} Collection
                  </p>
                </div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Premium {selectedCategory}
                </h2>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">{filteredProducts.length} Items</span>
              </div>
            </div>

            {/* Compact Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product._id);
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image Container */}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={
                          product.image
                            ? `${BASE_URL}/uploads/${product.image}`
                            : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <button
                          onClick={() => handleWishlistToggle(product._id)}
                          className={`p-2 rounded-full backdrop-blur-md transition-all ${
                            isWishlisted
                              ? "bg-red-500 text-white shadow-md"
                              : "bg-white/90 text-gray-700 shadow-sm"
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${isWishlisted ? "fill-white" : ""}`} />
                        </button>
                        <button
                          onClick={() => handleViewProduct(product._id)}
                          className="p-2 rounded-full bg-white/90 backdrop-blur-md text-gray-700 shadow-sm"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Premium Badge */}
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 rounded text-xs font-bold">
                        Premium
                      </div>
                    </div>

                    {/* Product Info - Compact */}
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Price</p>
                          <p className="text-lg font-bold text-blue-900">
                            Rs. {product.price?.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-1 hover:bg-blue-700 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Add
                        </button>
                      </div>
                      
                      {/* Stock Status */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-green-600 text-xs">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          In Stock
                        </div>
                        <div className="text-xs text-gray-500">
                          Free Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Men;