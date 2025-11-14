import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, ShoppingCart, Plus, Minus, PackageCheck, Sparkles, Home, Store, ArrowRight, Shield, Truck, RefreshCw } from "lucide-react";

const Cart = () => {
  const { getCart, updateCartQuantity, removeFromCart } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCartItems(data);
      setIsLoading(false);
    };
    loadCart();
  }, []);

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    await updateCartQuantity(productId, newQty);
    const updated = cartItems.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: newQty }
        : item
    );
    setCartItems(updated);
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    setCartItems(cartItems.filter((item) => item.product._id !== productId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#0a1931] mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0a1931] mb-2">Shopping Cart</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#ffc947] transition">Home</Link>
            <span>›</span>
            <span className="text-[#ffc947] font-semibold">Cart</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-12 text-center border border-gray-200 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0a1931] to-[#1a3658] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start exploring our amazing collection!
            </p>
            <button 
              onClick={() => navigate("/men")}
              className="bg-gradient-to-r from-[#ffc947] to-[#ffb347] text-[#0a1931] px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:from-[#ffd347] hover:to-[#ffc947] transition-all inline-flex items-center gap-2 text-sm"
            >
              <Sparkles size={18} />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0a1931]">
                    Cart Items ({cartItems.length})
                  </h2>
                  <button
                    onClick={() => navigate("/men")}
                    className="flex items-center gap-2 text-[#0a1931] hover:text-[#ffc947] transition font-medium text-sm"
                  >
                    <Store size={16} />
                    Continue Shopping
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-[#ffc947] transition-all bg-white"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img
                            src={`http://localhost:5000/uploads/${item.product.image}`}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-lg font-bold text-[#0a1931] mb-3">
                          ${item.product.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                              <button
                                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-all active:scale-95"
                              >
                                <Minus size={16} className="text-gray-700" />
                              </button>
                              <span className="w-8 text-center font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-all active:scale-95"
                              >
                                <Plus size={16} className="text-gray-700" />
                              </button>
                            </div>
                            <span className="text-sm text-gray-600">
                              Total: <span className="font-bold text-[#0a1931]">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemove(item.product._id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all font-medium text-sm"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#0a1931] to-[#1a3658] rounded-2xl shadow-xl p-6 sticky top-6 text-white">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <PackageCheck className="text-[#ffc947]" size={20} />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Shipping</span>
                    <span className="text-lg font-bold">
                      {shipping === 0 ? (
                        <span className="text-[#ffc947]">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {subtotal < 100 && (
                    <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3">
                      <p className="text-sm font-semibold text-yellow-200">
                        Add <span className="text-white">${(100 - subtotal).toFixed(2)}</span> more for FREE shipping!
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-600 flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black text-[#ffc947]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-gradient-to-r from-[#ffc947] to-[#ffb347] text-[#0a1931] py-3 rounded-lg font-bold hover:shadow-lg hover:from-[#ffd347] hover:to-[#ffc947] transition-all active:scale-95 mb-4 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4 border-t border-gray-600">
                  <div className="flex items-center gap-3">
                    <Shield className="text-[#ffc947]" size={18} />
                    <span className="text-sm text-gray-300">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="text-[#ffc947]" size={18} />
                    <span className="text-sm text-gray-300">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="text-[#ffc947]" size={18} />
                    <span className="text-sm text-gray-300">30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;