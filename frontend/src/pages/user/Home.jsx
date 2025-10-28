import React from 'react';
import { Truck, Shield, Sparkles, ArrowRight, Star, TrendingUp } from 'lucide-react';

const Home = () => {
  const categories = [
    { 
      name: 'Men', 
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80',
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      name: 'Women', 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      color: 'from-pink-500 to-rose-500' 
    },
    { 
      name: 'Kids', 
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80',
      color: 'from-purple-500 to-indigo-500' 
    },
    { 
      name: 'Accessories', 
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
      color: 'from-amber-500 to-orange-500' 
    }
  ];

  const featured = [
    { 
      name: 'Nike Air Max', 
      tag: 'NEW',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
    },
    { 
      name: 'Adidas Ultraboost', 
      tag: 'HOT',
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80'
    },
    { 
      name: 'Jordan Retro', 
      tag: 'SALE',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80'
    },
    { 
      name: 'Puma RS-X', 
      tag: 'TRENDING',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80'
    },
    { 
      name: 'Converse Classic', 
      tag: 'NEW',
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80'
    },
    { 
      name: 'New Balance 550', 
      tag: 'HOT',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80'
    },
    { 
      name: 'Vans Old Skool', 
      tag: 'CLASSIC',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80'
    },
    { 
      name: 'Reebok Classic', 
      tag: 'BEST SELLER',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
    }
  ];

  const newArrivals = [
    {
      name: 'Premium Sneakers',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&q=80',
      tag: 'JUST DROPPED'
    },
    {
      name: 'Running Shoes',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=80',
      tag: 'BEST SELLER'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80" 
            alt="Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 via-pink-600/85 to-purple-700/90"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/40 shadow-xl">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-bold text-white">New Season Collection 2024</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-white">
                Elevate Your
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-200 to-purple-200 bg-clip-text text-transparent mt-2">
                  Fashion Aura
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/95 max-w-xl font-medium">
                Discover premium fashion that speaks to your style. Trendy, elegant, and uniquely you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
                <button className="group bg-white text-red-600 px-10 py-5 rounded-full font-black text-lg shadow-2xl hover:shadow-pink-300/50 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                  Shop Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition-all duration-300 shadow-xl">
                  Explore Collections
                </button>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
                <div className="text-center lg:text-left backdrop-blur-sm bg-white/10 rounded-2xl px-8 py-4 border border-white/20">
                  <div className="text-4xl font-black text-white">10K+</div>
                  <div className="text-pink-100 text-sm font-semibold">Happy Customers</div>
                </div>
                <div className="text-center lg:text-left backdrop-blur-sm bg-white/10 rounded-2xl px-8 py-4 border border-white/20">
                  <div className="text-4xl font-black text-white">500+</div>
                  <div className="text-pink-100 text-sm font-semibold">Products</div>
                </div>
                <div className="text-center lg:text-left backdrop-blur-sm bg-white/10 rounded-2xl px-8 py-4 border border-white/20">
                  <div className="text-4xl font-black text-white">50+</div>
                  <div className="text-pink-100 text-sm font-semibold">Top Brands</div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
              
              {/* Main Image Container */}
              <div className="relative">
                {/* Floating Badge */}
                <div className="absolute -top-6 -left-6 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-2xl shadow-2xl transform rotate-[-5deg] animate-bounce">
                  <div className="text-center">
                    <div className="text-2xl font-black">50%</div>
                    <div className="text-xs font-bold">OFF</div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-6 -right-6 z-10 bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-3 rounded-full shadow-2xl animate-pulse">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-white" />
                    <span className="font-black text-lg">4.9</span>
                  </div>
                </div>

                {/* Image with Border */}
                <div className="relative rounded-[3rem] overflow-hidden border-8 border-white/20 shadow-2xl backdrop-blur-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" 
                    alt="Fashion Model"
                    className="w-full h-[500px] lg:h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Floating Product Cards */}
                <div className="absolute top-1/4 -left-8 hidden lg:block bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500">TRENDING</div>
                      <div className="font-black text-gray-900">Premium Shirt</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 -right-8 hidden lg:block bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&q=80" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500">NEW ARRIVAL</div>
                      <div className="font-black text-gray-900">Designer Jacket</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Shop By Category
          </h2>
          <p className="text-gray-600">Find your perfect style in our curated collections</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/50 transition-all duration-300">
                <h3 className="text-2xl font-black text-white mb-2">{cat.name}</h3>
                <div className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newArrivals.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer h-80"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-3">
                  {item.tag}
                </span>
                <h3 className="text-3xl font-black text-white mb-4">{item.name}</h3>
                <button className="bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Trending Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600">Handpicked items just for you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {product.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="group bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Wear Aura</span>
            </h2>
            <p className="text-gray-400 text-lg">Experience shopping like never before</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-red-500/50 transition-all duration-500 h-full">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-red-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                      <Truck className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3">Fast Delivery</h3>
                    <p className="text-gray-400 leading-relaxed">Free shipping on all orders over $50. Get your fashion delivered to your doorstep in 2-3 days.</p>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-pink-500/50 transition-all duration-500 h-full">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl blur-lg opacity-50 animate-pulse delay-300"></div>
                    <div className="relative bg-gradient-to-br from-pink-500 to-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3">Secure Payment</h3>
                    <p className="text-gray-400 leading-relaxed">Shop with confidence. 100% secure transactions with advanced encryption technology.</p>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-6 h-6 text-pink-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 h-full">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-50 animate-pulse delay-700"></div>
                    <div className="relative bg-gradient-to-br from-purple-500 to-indigo-500 w-20 h-20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3">Premium Quality</h3>
                    <p className="text-gray-400 leading-relaxed">Handpicked products from top brands. Only the finest quality for our valued customers.</p>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80" 
              alt="Newsletter"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/95 via-pink-600/90 to-purple-700/95"></div>
          </div>

          {/* Animated Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse delay-1000"></div>
          </div>

          {/* Decorative Shapes */}
          <div className="absolute top-0 left-0 w-40 h-40 border-4 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-white/20 rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-10 w-3 h-3 bg-pink-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/4 right-20 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-500"></div>
          
          <div className="relative text-center py-20 px-6 sm:px-12 text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/40 shadow-xl">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold">Exclusive Member Benefits</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-6xl font-black leading-tight">
              Join Our Fashion
              <span className="block bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mt-2">
                Community
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto font-medium leading-relaxed">
              Subscribe now and get <span className="font-black text-yellow-300">20% OFF</span> your first order, plus exclusive deals, early access to new collections, and styling tips.
            </p>

            {/* Newsletter Form */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto pt-4">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-7 py-5 rounded-full text-gray-900 placeholder-gray-500 font-semibold focus:outline-none focus:ring-4 focus:ring-white/50 shadow-2xl transition-all"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <Shield className="w-4 h-4 text-green-300" />
                <span className="text-sm font-semibold">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-sm font-semibold">10K+ Subscribers</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <Sparkles className="w-4 h-4 text-pink-300" />
                <span className="text-sm font-semibold">Exclusive Perks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;