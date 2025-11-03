import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag } from "lucide-react";

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
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <ShoppingBag className="text-indigo-600" size={36} />
            Shopping Cart
          </h1>
          <p className="text-slate-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-6">
              Add some items to get started!
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 group"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
                          {item.quantity}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-2xl font-bold text-indigo-600">
                          ${item.product.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                          >
                            <Minus size={18} className="text-slate-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                          >
                            <Plus size={18} className="text-slate-600" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.product._id)}
                          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-medium"
                        >
                          <Trash2 size={18} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Item Total</span>
                    <span className="text-xl font-bold text-slate-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  {subtotal < 100 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                      <Tag size={18} className="text-amber-600 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        Add <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> more for free shipping!
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t-2 border-slate-200 flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800">Total</span>
                    <span className="text-3xl font-bold text-indigo-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                  Proceed to Checkout
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="w-full mt-3 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                  Continue Shopping
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Fast delivery guaranteed</span>
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