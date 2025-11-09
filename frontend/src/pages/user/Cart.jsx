import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight, PackageCheck, Sparkles } from "lucide-react";

const Cart = () => {
  const { getCart, updateCartQuantity, removeFromCart } = useAuth();
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-600 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2.5 rounded-lg shadow-lg">
              <ShoppingCart className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 text-xs">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={40} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 text-sm mb-6">Start shopping now!</p>
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all inline-flex items-center gap-2">
              <Sparkles size={18} />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
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
                      {item.quantity > 1 && (
                        <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-red-500 to-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                          {item.quantity}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-red-600">
                            ${item.product.price}
                          </span>
                          <span className="text-xs text-gray-500">× {item.quantity}</span>
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-all active:scale-95"
                          >
                            <Minus size={14} className="text-gray-700" strokeWidth={2.5} />
                          </button>
                          <span className="w-8 text-center font-bold text-gray-900 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-all active:scale-95"
                          >
                            <Plus size={14} className="text-gray-700" strokeWidth={2.5} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.product._id)}
                          className="flex items-center gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-all font-medium text-xs active:scale-95"
                        >
                          <Trash2 size={14} strokeWidth={2.5} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total - Right Side */}
                    <div className="flex-shrink-0 text-right">
                      <span className="text-base font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-5 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PackageCheck className="text-red-600" size={20} />
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Subtotal</span>
                    <span className="text-base font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Shipping</span>
                    <span className="text-base font-bold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        <span className="text-gray-900">${shipping.toFixed(2)}</span>
                      )}
                    </span>
                  </div>

                  {subtotal < 100 && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2">
                      <Sparkles size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-amber-900">Almost there!</p>
                        <p className="text-xs text-amber-800">
                          Add <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> for FREE shipping
                        </p>
                      </div>
                    </div>
                  )}

                  {shipping === 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2.5 flex items-center gap-2">
                      <div className="bg-green-500 rounded-full p-1">
                        <PackageCheck size={12} className="text-white" />
                      </div>
                      <p className="text-xs font-semibold text-green-800">
                        FREE shipping unlocked! 🎉
                      </p>
                    </div>
                  )}

                  <div className="pt-3 border-t-2 border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-xl font-black text-red-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all shadow-sm flex items-center justify-center gap-2 group active:scale-95 mb-2 text-sm">
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </button>

                <button className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-all active:scale-95 text-sm">
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-xs text-gray-700">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-xs text-gray-700">30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-xs text-gray-700">Fast Delivery</span>
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