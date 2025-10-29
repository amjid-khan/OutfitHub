import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    mainCategory: "",
    subCategory: "",
    description: "",
    image: null,
  });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("✅ Product added successfully!");
        setFormData({
          name: "",
          price: "",
          mainCategory: "",
          subCategory: "",
          description: "",
          image: null,
        });
      } else {
        alert("❌ Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none"
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (Rs.)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none"
              placeholder="Enter price"
            />
          </div>

          {/* Main Category (Men/Women/Kids) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Category
            </label>
            <select
              name="mainCategory"
              value={formData.mainCategory}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none"
            >
              <option value="">Select main category</option>
              {mainCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subcategory
            </label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none"
            >
              <option value="">Select subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none"
              placeholder="Enter short description"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
