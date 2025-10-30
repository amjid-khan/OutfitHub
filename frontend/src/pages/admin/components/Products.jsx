import React, { useState, useEffect } from "react";
import { Plus, X, Edit2, Trash2, Package, Image as ImageIcon, Search } from "lucide-react";

const AddProduct = () => {
  // Replace with: const { user } = useAuth();
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products`;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mainCategory: "",
    subCategory: "",
    description: "",
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainCategories = ["Men", "Women", "Kids"];
  const subCategories = [
    "Shoes",
    "Shirts",
    "Pants",
    "Glasses",
    "Perfumes",
    "Watches",
    "Jackets",
    "Accessories",
  ];

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Filter products
  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.mainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // ✅ Reset Form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      mainCategory: "",
      subCategory: "",
      description: "",
      image: null,
    });
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  // ✅ Handle Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const url = editingProduct
        ? `${API_URL}/${editingProduct._id}`
        : `${API_URL}/add`;
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save product");

      await fetchProducts();
      alert(editingProduct ? "✅ Product updated!" : "✅ Product added!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("⚠️ Error saving product");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit Product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      mainCategory: product.mainCategory,
      subCategory: product.subCategory,
      description: product.description,
      image: null,
    });
    setIsModalOpen(true);
  };

  // ✅ Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
      alert("🗑️ Product deleted!");
    } catch (err) {
      console.error(err);
      alert("⚠️ Error deleting product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-slate-500 mt-2 text-sm">Manage your store inventory efficiently</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30"
            >
              <Plus size={20} strokeWidth={2.5} />
              Add Product
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <p className="text-blue-600 text-sm font-medium mb-1">Total Products</p>
            <p className="text-3xl font-bold text-blue-900">{products.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
            <p className="text-green-600 text-sm font-medium mb-1">Categories</p>
            <p className="text-3xl font-bold text-green-900">{new Set(products.map(p => p.mainCategory)).size}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
            <p className="text-purple-600 text-sm font-medium mb-1">Subcategories</p>
            <p className="text-3xl font-bold text-purple-900">{new Set(products.map(p => p.subCategory)).size}</p>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={40} className="text-slate-400" />
              </div>
              <p className="text-slate-400 text-lg font-medium">
                {searchQuery ? "No products found" : "No products available"}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                {searchQuery ? "Try a different search term" : "Add your first product to get started"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredProducts.map((prod, index) => (
                <div
                  key={prod._id}
                  className="flex items-center gap-6 p-6 bg-gradient-to-r from-white to-slate-50"
                >
                  {/* Index Badge */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 font-bold text-sm">{index + 1}</span>
                  </div>

                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex-shrink-0 overflow-hidden border-2 border-white shadow-md">
                    {prod.image ? (
                      <img
                        src={`${BASE_URL}/uploads/${prod.image}`}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={28} className="text-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-900 mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-slate-500 text-sm mb-2 line-clamp-1">
                      {prod.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold">
                        {prod.mainCategory}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold">
                        {prod.subCategory}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Price</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                      Rs. {prod.price}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="p-3 text-blue-600 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="p-3 text-red-600 bg-red-50 rounded-xl border border-red-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    {editingProduct ? "Update product information" : "Fill in the details below"}
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-8">
              <div className="space-y-5">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price (Rs.)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                    placeholder="Enter price"
                  />
                </div>

                {/* Categories Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Main Category
                    </label>
                    <select
                      name="mainCategory"
                      value={formData.mainCategory}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                    >
                      <option value="">Select</option>
                      {mainCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Subcategory
                    </label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                    >
                      <option value="">Select</option>
                      {subCategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-50"
                    placeholder="Enter product description"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Product Image {editingProduct && <span className="text-slate-400 font-normal">(optional)</span>}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-8 py-5 border-t border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;