import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MapPin, User, Phone, Mail, ShieldCheck, Truck, Package, CreditCard } from "lucide-react";

const Checkout = () => {
  const { user, getCart } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  React.useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCartItems(data);
    };
    loadCart();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Stripe integration yahan ayegi
    // Abhi ke liye simulate karta hoon
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/order-success");
    }, 2000);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-[#0a1931] hover:text-[#ffc947] transition mb-4 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </button>
          <h1 className="text-3xl font-black text-[#0a1931] mb-2">Checkout</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#ffc947] transition">Home</Link>
            <span>›</span>
            <Link to="/cart" className="hover:text-[#ffc947] transition">Cart</Link>
            <span>›</span>
            <span className="text-[#ffc947] font-semibold">Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#0a1931] p-2 rounded-lg">
                  <MapPin className="text-[#ffc947]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#0a1931]">Shipping Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1931] focus:border-[#0a1931] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1931] focus:border-[#0a1931] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1931] focus:border-[#0a1931] transition"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1931] focus:border-[#0a1931] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1931] focus:border-[#0a1931] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1931] focus:border-[#0a1931] transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a1931] focus:border-[#0a1931] transition"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Section - Stripe Ready */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#0a1931] p-2 rounded-lg">
                  <CreditCard className="text-[#ffc947]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#0a1931]">Payment</h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <ShieldCheck className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm">Secure Payment</h3>
                    <p className="text-blue-700 text-xs">
                      You'll be redirected to Stripe for secure payment processing
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-[#0a1931]">Stripe</span> will handle all payment details securely
                </p>
                <div className="flex justify-center items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ShieldCheck size={12} />
                    <span>PCI Compliant</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CreditCard size={12} />
                    <span>All Cards Accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#0a1931] to-[#1a3658] rounded-2xl shadow-xl p-6 sticky top-6 text-white">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Package className="text-[#ffc947]" size={20} />
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex items-center gap-3 py-2 border-b border-gray-600/50">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
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
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm text-white">{item.product.name}</h4>
                      <p className="text-gray-300 text-xs">
                        Qty: {item.quantity} × ${item.product.price}
                      </p>
                    </div>
                    <span className="font-bold text-[#ffc947]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-[#ffc947] font-semibold">FREE</span>
                </div>

                <div className="pt-3 border-t border-gray-600 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-[#ffc947]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Free Shipping Badge */}
              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-green-400" />
                  <span className="text-sm font-medium text-green-200">Free Shipping Applied</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className="w-full bg-gradient-to-r from-[#ffc947] to-[#ffb347] text-[#0a1931] py-3 rounded-lg font-bold hover:shadow-lg hover:from-[#ffd347] hover:to-[#ffc947] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0a1931] border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Proceed to Payment
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-600">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Truck size={14} />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <ShieldCheck size={14} />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <CreditCard size={14} />
                  <span>Stripe</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-[#0a1931] mb-2 text-sm">Need Help?</h3>
              <p className="text-gray-600 text-xs">
                For any questions about your order, contact us at{" "}
                <a href="mailto:support@outfithub.com" className="text-[#ffc947] font-medium">
                  support@outfithub.com
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;