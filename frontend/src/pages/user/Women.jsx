import React, { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // make sure this provides getAllProducts()

const Women = () => {
  const { getAllProducts } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Shoes");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
        // ✅ Filter only Women's category
        const womenProducts = data.filter(
          (item) => item.mainCategory === "Women"
        );
        setAllProducts(womenProducts);
      } catch (err) {
        console.error("Error fetching women products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [getAllProducts]);

  // 🔹 Filter by selected subcategory
  const filteredProducts = allProducts.filter(
    (product) => product.subCategory === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-8">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for women's fashion..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">
              Women's Collection
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Left Sidebar - Categories */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-pink-300 rounded-full"></div>
              </div>
              <div className="space-y-4">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className={`flex items-center justify-between cursor-pointer group py-2 px-3 rounded-lg transition-all ${
                      selectedCategory === category.name
                        ? "bg-pink-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center flex-1">
                      <input
                        type="radio"
                        name="subcategory"
                        checked={selectedCategory === category.name}
                        onChange={() => setSelectedCategory(category.name)}
                        className="w-5 h-5 text-pink-500 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 cursor-pointer transition-all"
                      />
                      <span
                        className={`ml-4 text-base font-medium ${
                          selectedCategory === category.name
                            ? "text-pink-600"
                            : "text-gray-700"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Products Grid */}
          <div className="flex-1">
            {loading ? (
              <p className="text-center text-gray-500 text-lg mt-20">
                Loading products...
              </p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 text-lg mt-20">
                No products found in "{selectedCategory}"
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                      Showing Results
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredProducts.length} {selectedCategory}
                    </p>
                  </div>
                  <select className="bg-white border-2 border-gray-200 rounded-xl px-5 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer hover:border-gray-300 transition-all">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Best Selling</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredProduct(product._id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4 aspect-square shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={
                            product.image
                              ? `${BASE_URL}/uploads/${product.image}`
                              : "https://via.placeholder.com/300x300.png?text=No+Image"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-6`}
                        >
                          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-pink-600 hover:text-white mb-3 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Add to Cart
                          </button>
                        </div>
                        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                          <Heart className="w-5 h-5 text-pink-500" />
                        </button>
                        <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          NEW
                        </div>
                      </div>
                      <div className="px-1">
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-pink-600 transition">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                          Rs. {product.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;
