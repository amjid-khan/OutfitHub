import React, { useState } from 'react';
import { Search, Heart, ShoppingBag } from 'lucide-react';

const Men = () => {
  const [selectedCategories, setSelectedCategories] = useState(['Shoes']);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const categories = [
    { id: 1, name: 'Shoes', count: 6 },
    { id: 2, name: 'Shirts', count: 4 },
    { id: 3, name: 'Pants', count: 3 },
    { id: 4, name: 'Glasses', count: 2 },
    { id: 5, name: 'Perfumes', count: 2 },
    { id: 6, name: 'Watches', count: 2 },
    { id: 7, name: 'Jackets', count: 2 },
    { id: 8, name: 'Accessories', count: 3 }
  ];

  const allProducts = [
    // Shoes
    { id: 1, name: 'Classic Leather Shoes', price: 8999, category: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
    { id: 2, name: 'Sports Sneakers', price: 7999, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    { id: 3, name: 'Casual Loafers', price: 5999, category: 'Shoes', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop' },
    { id: 4, name: 'Running Shoes', price: 6999, category: 'Shoes', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop' },
    { id: 5, name: 'Oxford Shoes', price: 9999, category: 'Shoes', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop' },
    { id: 6, name: 'Chelsea Boots', price: 11999, category: 'Shoes', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop' },
    
    // Shirts
    { id: 7, name: 'Premium Cotton Shirt', price: 2999, category: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
    { id: 8, name: 'Casual T-Shirt', price: 1499, category: 'Shirts', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop' },
    { id: 9, name: 'Formal Dress Shirt', price: 3499, category: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
    { id: 10, name: 'Polo T-Shirt', price: 2499, category: 'Shirts', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop' },
    
    // Pants
    { id: 11, name: 'Slim Fit Chinos', price: 3499, category: 'Pants', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop' },
    { id: 12, name: 'Formal Trousers', price: 4299, category: 'Pants', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop' },
    { id: 13, name: 'Denim Jeans', price: 3999, category: 'Pants', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
    
    // Glasses
    { id: 14, name: 'Aviator Sunglasses', price: 4599, category: 'Glasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop' },
    { id: 15, name: 'Wayfarer Sunglasses', price: 3999, category: 'Glasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop' },
    
    // Perfumes
    { id: 16, name: 'Luxury Perfume', price: 6999, category: 'Perfumes', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop' },
    { id: 17, name: 'Designer Cologne', price: 8999, category: 'Perfumes', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400&h=400&fit=crop' },
    
    // Watches
    { id: 18, name: 'Designer Watch', price: 12999, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { id: 19, name: 'Smart Watch', price: 15999, category: 'Watches', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    
    // Jackets
    { id: 20, name: 'Denim Jacket', price: 5499, category: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
    { id: 21, name: 'Leather Jacket', price: 14999, category: 'Jackets', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop' },
    
    // Accessories
    { id: 22, name: 'Leather Belt', price: 1999, category: 'Accessories', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583f0?w=400&h=400&fit=crop' },
    { id: 23, name: 'Leather Wallet', price: 2499, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop' },
    { id: 24, name: 'Backpack', price: 4999, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' }
  ];

  const toggleCategory = (categoryName) => {
    setSelectedCategories([categoryName]);
  };

  const filteredProducts = selectedCategories.length > 0
    ? allProducts.filter(product => selectedCategories.includes(product.category))
    : allProducts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-8">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for shoes, shirts, accessories..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">Men's Collection</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Left Sidebar - Filters */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <div className="h-1 w-12 bg-gradient-to-r from-gray-900 to-gray-600 rounded-full"></div>
              </div>
              <div className="space-y-4">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center justify-between cursor-pointer group py-2 px-3 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center flex-1">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => toggleCategory(category.name)}
                          className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer transition-all"
                        />
                      </div>
                      <span className="ml-4 text-base font-medium text-gray-700 group-hover:text-gray-900 transition">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                      {category.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Showing Results</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredProducts.length} {selectedCategories[0]}
                </p>
              </div>
              <select className="bg-white border-2 border-gray-200 rounded-xl px-5 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer hover:border-gray-300 transition-all">
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
                  key={product.id}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 mb-4 aspect-square shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-6`}>
                      <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-gray-900 hover:text-white mb-3 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                      <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </div>
                  </div>
                  <div className="px-1">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-gray-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Men;