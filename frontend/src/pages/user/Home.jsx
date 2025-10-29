import React from 'react';
import { ArrowRight, Star, TrendingUp, Zap, ShoppingBag, Truck, Shield, Clock } from 'lucide-react';

const Home = () => {
  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800',
      link: '/men',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
      link: '/women',
      color: 'from-pink-500 to-pink-600'
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800',
      link: '/kids',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Classic White Sneakers',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
      rating: 4.8,
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      rating: 4.6,
      badge: 'New'
    },
    {
      id: 3,
      name: 'Summer Dress',
      price: 59.99,
      originalPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
      rating: 4.9,
      badge: 'Hot'
    },
    {
      id: 4,
      name: 'Sports Watch',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      rating: 4.7,
      badge: 'Sale'
    }
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Payment',
      description: '100% protected'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Dedicated support'
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Easy Returns',
      description: '30-day guarantee'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-40">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Zap className="w-4 h-4" />
                  <span>New Season Collection 2025</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                  Style That
                  <span className="block text-red-600">Speaks Volumes</span>
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Discover the perfect blend of comfort and elegance. Our curated collection brings you the latest trends at unbeatable prices.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full text-base font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="#sale"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-base font-bold border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    View Sale
                  </a>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-black text-gray-900">10k+</div>
                    <div className="text-sm text-gray-500 mt-1">Products</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gray-900">50k+</div>
                    <div className="text-sm text-gray-500 mt-1">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gray-900">4.9★</div>
                    <div className="text-sm text-gray-500 mt-1">Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Images Grid */}
              <div className="hidden lg:block relative mt-12 lg:mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500" 
                        alt="Fashion" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-80 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500" 
                        alt="Fashion" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-12">
                    <div className="h-80 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500" 
                        alt="Fashion" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500" 
                        alt="Fashion" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Explore our diverse collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.link}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-black text-white mb-2">{category.name}</h3>
                  <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Trending Now</h2>
              <p className="text-gray-600 text-lg">Most popular items this week</p>
            </div>
            <a
              href="#products"
              className="hidden sm:inline-flex items-center gap-2 text-red-600 font-bold hover:gap-4 transition-all"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                  </div>
                  <button className="absolute bottom-4 right-4 bg-white text-gray-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sale Banner */}
      <div id="sale" className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
              Up to 70% OFF
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Don't miss our biggest sale of the season. Thousands of items at incredible prices!
            </p>
            <a
              href="#sale"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Shop Sale
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-4">Stay in the Loop</h2>
            <p className="text-gray-400 text-lg mb-8">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;