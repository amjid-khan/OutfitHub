import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Filter, ChevronDown, Sparkles, TrendingUp } from 'lucide-react';

const NewArrival = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');

  const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories', 'Shoes'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'priceLow', label: 'Price: Low to High' },
    { value: 'priceHigh', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const products = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      category: "Men",
      price: 29.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=90",
      rating: 4.5,
      reviews: 128,
      badge: "NEW",
      colors: ['#000', '#fff', '#333', '#999']
    },
    {
      id: 2,
      name: "Designer Slim Fit Jeans",
      category: "Men",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=90",
      rating: 4.8,
      reviews: 256,
      badge: "TRENDING",
      colors: ['#1e40af', '#000', '#4b5563']
    },
    {
      id: 3,
      name: "Casual Sneakers White",
      category: "Shoes",
      price: 59.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=90",
      rating: 4.6,
      reviews: 189,
      badge: "HOT",
      colors: ['#fff', '#000', '#ef4444']
    },
    {
      id: 4,
      name: "Summer Floral Dress",
      category: "Women",
      price: 49.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=90",
      rating: 4.7,
      reviews: 342,
      badge: "NEW",
      colors: ['#ec4899', '#8b5cf6', '#3b82f6']
    },
    {
      id: 5,
      name: "Leather Jacket Black",
      category: "Men",
      price: 149.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=90",
      rating: 4.9,
      reviews: 445,
      badge: "PREMIUM",
      colors: ['#000', '#7c2d12']
    },
    {
      id: 6,
      name: "Elegant Handbag",
      category: "Accessories",
      price: 89.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=90",
      rating: 4.4,
      reviews: 167,
      badge: "NEW",
      colors: ['#000', '#7c2d12', '#b91c1c']
    },
    {
      id: 7,
      name: "Kids Cartoon T-Shirt",
      category: "Kids",
      price: 19.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500&q=90",
      rating: 4.6,
      reviews: 203,
      badge: "NEW",
      colors: ['#3b82f6', '#ef4444', '#22c55e', '#eab308']
    },
    {
      id: 8,
      name: "Women's Running Shoes",
      category: "Shoes",
      price: 69.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=90",
      rating: 4.7,
      reviews: 298,
      badge: "TRENDING",
      colors: ['#ec4899', '#fff', '#000']
    },
    {
      id: 9,
      name: "Casual Blazer Navy",
      category: "Men",
      price: 99.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=90",
      rating: 4.8,
      reviews: 374,
      badge: "NEW",
      colors: ['#1e3a8a', '#000', '#6b7280']
    },
    {
      id: 10,
      name: "Bohemian Maxi Dress",
      category: "Women",
      price: 64.99,
      originalPrice: 109.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=90",
      rating: 4.5,
      reviews: 221,
      badge: "HOT",
      colors: ['#dc2626', '#059669', '#d97706']
    },
    {
      id: 11,
      name: "Smartwatch Series 5",
      category: "Accessories",
      price: 199.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=90",
      rating: 4.9,
      reviews: 567,
      badge: "PREMIUM",
      colors: ['#000', '#6b7280', '#3b82f6']
    },
    {
      id: 12,
      name: "Kids Denim Jacket",
      category: "Kids",
      price: 39.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=90",
      rating: 4.4,
      reviews: 156,
      badge: "NEW",
      colors: ['#1e40af', '#000']
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const getBadgeColor = (badge) => {
    switch(badge) {
      case 'NEW': return 'from-blue-500 to-blue-600';
      case 'HOT': return 'from-orange-500 to-red-600';
      case 'TRENDING': return 'from-purple-500 to-pink-600';
      case 'PREMIUM': return 'from-yellow-500 to-amber-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=90"
          alt="New Arrivals"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-red-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-6 border border-white/40">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold">JUST LANDED</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-2xl">
              New Arrivals
            </h1>
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              Fresh Styles, Hot Trends
            </p>
            <p className="text-lg md:text-xl opacity-90">
              Discover the latest additions to our collection
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-red-600 mb-1">500+</div>
              <div className="text-sm text-gray-600 font-medium">New Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-600 mb-1">50%</div>
              <div className="text-sm text-gray-600 font-medium">Off Selected Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-600 mb-1">4.8★</div>
              <div className="text-sm text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-500 hover:text-red-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort & Filter */}
          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="flex-1 md:flex-none px-6 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button className="px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-red-500 hover:text-red-600 transition-all duration-300 flex items-center gap-2">
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-gray-900">
              Showing {filteredProducts.length} Products
            </h3>
            <p className="text-gray-600 mt-1">Updated daily with fresh arrivals</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`bg-gradient-to-r ${getBadgeColor(product.badge)} text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg`}>
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                  <Heart size={20} className="text-gray-600 hover:text-red-500 transition" />
                </button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wide">
                  {product.category}
                </div>
                
                <h3 className="font-black text-gray-900 mb-3 text-lg line-clamp-1 group-hover:text-red-600 transition">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Colors */}
                <div className="flex gap-2 mb-4">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-black">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transform group-hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-12 py-5 rounded-full font-black text-lg hover:from-gray-800 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center gap-3">
            Load More Products
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <TrendingUp className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-4xl font-black mb-4">Never Miss a New Arrival!</h3>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to get notified about latest products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 font-semibold"
            />
            <button className="bg-white text-gray-900 px-10 py-4 rounded-full font-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;