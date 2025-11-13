import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingBag,
  Zap,
  Eye,
  Filter,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Women = () => {
  const navigate = useNavigate();
  const { getAllProducts, addToCart, user, getWishlist, toggleWishlist } =
    useAuth();

  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Shoes");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const categories = [
    {
      id: 1,
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Shirts",
      image:
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Pants",
      image:
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Glasses",
      image:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Perfumes",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Watches",
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    },
    {
      id: 7,
      name: "Jackets",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
    },
    {
      id: 8,
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        const womenProducts = data.filter((item) => item.mainCategory === "Women");
        setAllProducts(womenProducts);
      } catch (err) {
        console.error("Error fetching women products:", err);
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
    <div className="min-h-screen bg-gray-50">
      {/* 🌟 Modern Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden w-full">
        <div className="relative w-full px-6 py-12">
          {/* Premium Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl">
              <span className="text-sm font-bold tracking-widest bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                ELITE COLLECTION 2025
              </span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="text-left w-full space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                  <span className="block text-white">REDEFINE YOUR</span>
                  <span className="block bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent">
                    PREMIUM STYLE
                  </span>
                </h1>
                
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                
                <p className="text-blue-100/90 text-lg font-light leading-relaxed max-w-lg">
                  Experience the pinnacle of women's fashion with our exclusive
                  2025 collection. Meticulously crafted pieces that blend
                  Italian craftsmanship with contemporary design.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-blue-100 font-medium">
                    Premium Italian fabrics & sustainable materials
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-blue-100 font-medium">
                    Expert tailoring with perfect fit guarantee
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">600+</div>
                  <div className="text-blue-200 text-sm font-medium">Elite Pieces</div>
                </div>
                <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">70+</div>
                  <div className="text-blue-200 text-sm font-medium">Luxury Brands</div>
                </div>
                <div className="h-8 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-blue-200 text-sm font-medium">Style Concierge</div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Showcase */}
            <div className="w-full relative">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Premium Women's Fashion"
                    className="w-full h-[420px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>

                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white text-xs font-bold tracking-wide">IN STOCK</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-bold text-xl mb-1">Signature Silk Dress</h3>
                          <p className="text-blue-200/90 text-sm">Premium Italian Silk</p>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-xl">$349</div>
                          <div className="text-blue-300/80 text-sm line-through">$499</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Section - Below Hero */}
      <div className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900 text-lg">Categories</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <label
                    key={cat.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={isSelected}
                      onChange={() => handleCategoryChange(cat.name)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? "border-white bg-white"
                          : "border-gray-400"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                      )}
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

      {/* Products Section - Full Width */}
      <div className="w-full p-0">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                {selectedCategory} Collection
              </h1>
              <p className="text-gray-600">
                Discover our premium {selectedCategory.toLowerCase()} selection
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg">
              <span className="font-bold text-sm">{filteredProducts.length} Products</span>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="text-center">
                <div className="inline-block relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <Zap className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-gray-600 font-semibold mt-6 text-lg">
                  Loading premium products...
                </p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 mb-6">
                <ShoppingBag className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-600 text-2xl font-semibold">
                No products found in "{selectedCategory}"
              </p>
              <p className="text-gray-400 mt-3 text-lg">
                Try selecting another category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product._id);
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-[420px] flex flex-col"
                  >
                    
                    {/* Product Image - Increased Height */}
                    <div className="relative h-64 bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={
                          product.image
                            ? `${BASE_URL}/uploads/${product.image}`
                            : "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={() => handleWishlistToggle(product._id)}
                          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
                            isWishlisted
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isWishlisted ? "fill-white" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => handleViewProduct(product._id)}
                          className="p-2 rounded-full bg-white text-gray-700 shadow-lg hover:bg-gray-50 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Premium Badge */}
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                        Premium
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 leading-tight">
                        {product.name}
                      </h3>

                      {/* Price & Add to Cart */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-black text-blue-900">
                            Rs. {product.price?.toLocaleString()}
                          </p>
                          <p className="text-green-600 text-sm font-semibold flex items-center gap-1 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            In Stock
                          </p>
                        </div>
                        
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Women;