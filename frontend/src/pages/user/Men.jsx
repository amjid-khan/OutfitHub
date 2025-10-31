import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Star, TrendingUp, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Men = () => {
  const {
    getAllProducts,
    addToCart,
    user,
    getWishlist,
    toggleWishlist,
  } = useAuth();

  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Shoes");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const categories = [
    { id: 1, name: "Shoes" },
    { id: 2, name: "Shirts" },
    { id: 3, name: "Pants" },
    { id: 4, name: "Glasses" },
    { id: 5, name: "Perfumes" },
    { id: 6, name: "Watches" },
    { id: 7, name: "Jackets" },
    { id: 8, name: "Accessories" },
  ];

  // 🔹 Fetch products from backend
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

  // 💖 Fetch wishlist when user logs in
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const wishlistData = await getWishlist();

          // ✅ Normalize to always store array of product IDs
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

  // 🔹 Filter by subCategory
  const filteredProducts = allProducts.filter(
    (product) => product.subCategory === selectedCategory
  );

  // 🛒 Handle Add to Cart
  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.warn("Please login to add items to your cart!");
      return;
    }
    await addToCart(productId);
  };

  // Handle Wishlist Toggle
  const handleWishlistToggle = async (productId) => {
    if (!user) {
      toast.warn("Please login to manage your wishlist!");
      return;
    }

    try {
      const res = await toggleWishlist(productId);

      // ✅ Determine what happened using backend message
      if (res?.message?.includes("Added")) {
        toast.success("Added to wishlist ❤️");
        setWishlist([...wishlist, productId]);
      } else if (res?.message?.includes("Removed")) {
        toast.info("Removed from wishlist 💔");
        setWishlist(wishlist.filter((id) => id !== productId));
      } else {
        // Fallback for unexpected response
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - Modern White Background */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                New Arrivals 2025
              </div>
              
              <h1 className="text-7xl lg:text-8xl font-black text-gray-900 leading-[1.05]">
                Premium Style
                <span className="block text-gray-400 mt-2">For Modern Men</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Discover the finest collection of men's fashion. From sophisticated formal wear to casual streetwear, we've got everything you need to elevate your wardrobe.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div>
                    <p className="text-base font-black text-gray-900">4.8/5 Rating</p>
                    <p className="text-sm text-gray-500 font-medium">2,500+ Reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-base font-black text-gray-900">Fast Shipping</p>
                    <p className="text-sm text-gray-500 font-medium">2-3 Day Delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stats */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-white p-9 rounded-3xl border-2 border-gray-100 hover:border-black transition-all hover:shadow-xl group">
                  <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-5xl font-black text-gray-900 mb-2">500+</p>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wide">Products</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-9 rounded-3xl border-2 border-gray-100 hover:border-black transition-all hover:shadow-xl group mt-10">
                  <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Star className="w-8 h-8" />
                  </div>
                  <p className="text-5xl font-black text-gray-900 mb-2">50+</p>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wide">Brands</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-9 rounded-3xl border-2 border-gray-100 hover:border-black transition-all hover:shadow-xl group -mt-4">
                  <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8" />
                  </div>
                  <p className="text-5xl font-black text-gray-900 mb-2">10K+</p>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wide">Customers</p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white p-9 rounded-3xl border-2 border-gray-100 hover:border-black transition-all hover:shadow-xl group">
                  <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8" />
                  </div>
                  <p className="text-5xl font-black text-gray-900 mb-2">24/7</p>
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-wide">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex gap-12">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 sticky top-8 hover:shadow-lg transition-all">
              <h2 className="text-2xl font-black text-gray-900 mb-7">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className={`flex items-center cursor-pointer py-4 px-5 rounded-2xl transition-all border-2 ${
                      selectedCategory === category.name
                        ? "border-black bg-gray-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="subcategory"
                      checked={selectedCategory === category.name}
                      onChange={() => setSelectedCategory(category.name)}
                      className="sr-only"
                    />
                    <span className="text-base font-bold text-gray-900 flex-1">
                      {category.name}
                    </span>
                    {selectedCategory === category.name && (
                      <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-24">
                <div className="inline-block w-14 h-14 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <p className="text-gray-600 font-bold mt-5 text-lg">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500 text-xl font-bold">
                  No products found in "{selectedCategory}"
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2 font-bold">
                      Showing Results
                    </p>
                    <p className="text-4xl font-black text-gray-900">
                      {filteredProducts.length} {selectedCategory}
                    </p>
                  </div>
                  <select className="bg-white border-2 border-gray-200 rounded-2xl px-7 py-3.5 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-black focus:border-black cursor-pointer hover:border-gray-400 transition-all shadow-sm">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Best Selling</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => {
                    const isWishlisted = wishlist.includes(product._id);

                    return (
                      <div
                        key={product._id}
                        className="group cursor-pointer"
                        onMouseEnter={() => setHoveredProduct(product._id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className="relative overflow-hidden rounded-3xl bg-white mb-5 aspect-square border-2 border-gray-200 group-hover:border-black transition-all duration-500 group-hover:shadow-2xl">
                          <img
                            src={
                              product.image
                                ? `${BASE_URL}/uploads/${product.image}`
                                : "https://via.placeholder.com/400x400?text=No+Image"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-8">
                            <button
                              onClick={() => handleAddToCart(product._id)}
                              className="bg-white text-black px-10 py-4 rounded-full font-black transform translate-y-12 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:bg-black hover:text-white flex items-center gap-3 text-sm uppercase tracking-wider"
                            >
                              <ShoppingBag className="w-5 h-5" />
                              Add to Cart
                            </button>
                          </div>

                          {/* Wishlist Heart */}
                          <button
                            onClick={() => handleWishlistToggle(product._id)}
                            className={`absolute top-5 right-5 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-125 border-2 ${
                              isWishlisted ? "border-red-500 text-red-500 bg-red-50" : "border-gray-200 text-gray-700"
                            }`}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isWishlisted
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-700"
                              }`}
                            />
                          </button>

                          {/* Tag */}
                          <div className="absolute top-5 left-5 bg-black text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                            NEW
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="px-2">
                          <h3 className="font-black text-gray-900 mb-2 text-lg group-hover:text-gray-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-black text-gray-900">
                              Rs. {product.price?.toLocaleString()}
                            </p>
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
      </div>
    </div>
  );
};

export default Men;