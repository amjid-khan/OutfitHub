import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ Correct named import
import { toast } from "react-toastify";

const Wishlist = () => {
  const { getWishlist, removeFromWishlist } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();

        // Adjust this depending on your backend response shape
        if (data?.items) {
          setWishlist(data.items);
        } else if (Array.isArray(data)) {
          setWishlist(data);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [getWishlist]);

  // ✅ Handle remove item
  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      toast.success("Removed from wishlist");
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item");
    }
  };

  // ✅ UI States
  if (loading)
    return <p className="text-center py-6">Loading wishlist...</p>;

  if (wishlist.length === 0)
    return <p className="text-center py-6">Your wishlist is empty 💔</p>;

  // ✅ Wishlist UI
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Your Wishlist 💖
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow-sm p-4 flex flex-col items-center hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg text-center">{item.name}</h3>
            <p className="text-gray-600 mt-1">₹{item.price}</p>
            <button
              onClick={() => handleRemove(item._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
