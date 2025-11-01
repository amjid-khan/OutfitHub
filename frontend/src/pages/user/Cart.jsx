import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Cart = () => {
  const { getCart, updateCartQuantity, removeFromCart } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCartItems(data);
    };
    loadCart();
  }, []);

  // Handle quantity change
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

  // Handle remove
  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    setCartItems(cartItems.filter((item) => item.product._id !== productId));
  };

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border p-3 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity - 1)
                  }
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity + 1)
                  }
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>

                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-semibold text-lg mt-6">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
