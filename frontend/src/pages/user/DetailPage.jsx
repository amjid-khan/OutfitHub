import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag, Truck, Shield, RotateCcw, Star, ChevronLeft, Share2, Plus, Minus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAllProducts, addToCart, user, getWishlist, toggleWishlist } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        console.log("Looking for product ID:", id); // Debug line
        const data = await getAllProducts();
        console.log("All products:", data); // Debug line
        const foundProduct = data.find((item) => item._id === id);
        console.log("Found product:", foundProduct); // Debug line
        setProduct(foundProduct);
        
        // Get related products from same category
        if (foundProduct) {
          const related = data.filter(
            (item) => 
              item.subCategory === foundProduct.subCategory && 
              item._id !== foundProduct._id
          ).slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id, getAllProducts]);

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
        }
      }
    };
    fetchWishlist();
  }, [user, getWishlist]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.warn("Please login to add items to your cart!");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      await addToCart(product._id);
    }
    toast.success(`Added ${quantity} item(s) to cart 🛒`);
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.warn("Please login to manage your wishlist!");
      return;
    }

    try {
      const res = await toggleWishlist(product._id);
      if (res?.message?.includes("Added")) {
        toast.success("Added to wishlist ❤️");
        setWishlist([...wishlist, product._id]);
      } else {
        toast.info("Removed from wishlist 💔");
        setWishlist(wishlist.filter((itemId) => itemId !== product._id));
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      toast.error("Error updating wishlist!");
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <p className="text-gray-600 font-bold mt-4">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-xl font-bold mb-4">Product not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black font-bold transition"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xl">
              <img
                src={product.image ? `${BASE_URL}/uploads/${product.image}` : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Category & Share */}
            <div className="flex items-center justify-between">
              <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-bold text-gray-700">
                {product.subCategory}
              </span>
              <button className="p-3 hover:bg-gray-100 rounded-full transition">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-semibold">
                  4.8 out of 5
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600 font-semibold">
                  256 Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-baseline gap-3 flex-wrap mb-2">
                <p className="text-5xl font-black text-gray-900">
                  Rs. {product.price?.toLocaleString()}
                </p>
                <p className="text-xl text-gray-400 line-through font-bold">
                  Rs. {(product.price * 1.3)?.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-bold">
                  Save 23%
                </span>
                <span className="text-sm text-gray-600 font-semibold">
                  Limited time offer
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-black text-gray-900 mb-3">Product Details</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "Experience premium quality and exceptional comfort with this carefully crafted product. Designed for the modern individual who values both style and functionality. Made with high-quality materials that ensure durability and long-lasting wear."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Quantity
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="px-5 py-3 hover:bg-gray-100 transition font-bold"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-black text-xl">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="px-5 py-3 hover:bg-gray-100 transition font-bold"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="text-green-600 font-bold">In Stock</span> • Ready to ship
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 text-base hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-4 rounded-full font-bold transition-all hover:scale-110 shadow-xl ${
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                <Truck className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <p className="text-sm font-black text-gray-900 mb-1">Free Delivery</p>
                <p className="text-xs text-gray-600">Orders above Rs. 2000</p>
              </div>
              <div className="text-center p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                <RotateCcw className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <p className="text-sm font-black text-gray-900 mb-1">Easy Returns</p>
                <p className="text-xs text-gray-600">7 days return</p>
              </div>
              <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                <Shield className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <p className="text-sm font-black text-gray-900 mb-1">Secure Payment</p>
                <p className="text-xs text-gray-600">100% protected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-gray-900 mb-2">You May Also Like</h2>
              <p className="text-gray-600">More products from {product.subCategory}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  onClick={() => navigate(`/detail/${relatedProduct._id}`)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={
                        relatedProduct.image
                          ? `${BASE_URL}/uploads/${relatedProduct.image}`
                          : "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=600&fit=crop"
                      }
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-black text-gray-800">
                      Rs. {relatedProduct.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;