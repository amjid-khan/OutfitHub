import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Zap, Eye } from "lucide-react";
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
    { id: 1, name: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop" },
    { id: 2, name: "Shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop" },
    { id: 3, name: "Pants", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop" },
    { id: 4, name: "Glasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop" },
    { id: 5, name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop" },
    { id: 6, name: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop" },
    { id: 7, name: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" },
    { id: 8, name: "Accessories", image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=400&fit=crop" },
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* 🌟 Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4" />
              Premium Collection 2025
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-3">
              Elevate Your Style
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Discover premium men's fashion from formal classics to streetwear essentials
            </p>
          </div>

          {/* Category Pills in One Line */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Circular Image with Border */}
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? "ring-4 ring-crimson shadow-xl scale-110"
                      : "ring-2 ring-gray-200 hover:ring-gray-400 hover:scale-105"
                  }`}
                  style={selectedCategory === cat.name ? { "--tw-ring-color": "#DC143C" } : {}}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image")
                    }
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Category Name Below */}
                <p
                  className={`mt-3 text-sm font-bold transition-colors duration-300 ${
                    selectedCategory === cat.name
                      ? "text-gray-900"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                  style={selectedCategory === cat.name ? { color: "#DC143C" } : {}}
                >
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛍 Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-gray-600 font-bold mt-4 text-sm">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-bold">
              No products found in "{selectedCategory}"
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">
                  Premium Collection
                </p>
                <p className="text-3xl font-black text-gray-900">
                  {filteredProducts.length} {selectedCategory}
                </p>
              </div>
            </div>

            {/* Modern Product Cards with Equal Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product._id);
                return (
                  <div
                    key={product._id}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Product Image - Square Format */}
                    <div className="aspect-square overflow-hidden relative bg-gray-100">
                      <img
                        src={
                          product.image
                            ? `${BASE_URL}/uploads/${product.image}`
                            : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Hover Content - Price & Buttons */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 p-6">
                        {/* Price Badge */}
                        <div className="bg-white px-6 py-2.5 rounded-full shadow-xl">
                          <p className="text-xl font-black text-gray-900">
                            Rs. {product.price?.toLocaleString()}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2.5 w-full">
                          {/* View Details Button */}
                          <button
                            onClick={() => handleViewProduct(product._id)}
                            className="w-full bg-white text-gray-900 px-5 py-3 rounded-full font-bold flex items-center justify-center gap-2 text-sm hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className="w-full bg-black text-white px-5 py-3 rounded-full font-bold flex items-center justify-center gap-2 text-sm hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Wishlist Button - Top Right */}
                      <button
                        onClick={() => handleWishlistToggle(product._id)}
                        className={`absolute top-4 right-4 p-3 rounded-full transition-all hover:scale-110 shadow-lg z-10 ${
                          isWishlisted
                            ? "bg-red-500 text-white"
                            : "bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isWishlisted ? "fill-white" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Product Info - Always Visible */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-lg font-black text-gray-800">
                        Rs. {product.price?.toLocaleString()}
                      </p>
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