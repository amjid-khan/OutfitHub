import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star, TrendingUp, Zap, Clock, ArrowRight, Sparkles, Quote, Crown, Award, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Summer Collection 2025",
      subtitle: "New Trends, Bold Styles",
      description: "Discover fashion that defines you",
      bg: "from-rose-500/90 via-red-500/90 to-pink-500/90",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=90"
    },
    {
      title: "Premium Fashion",
      subtitle: "Elegance Meets Comfort",
      description: "Experience luxury in every thread",
      bg: "from-purple-600/90 via-pink-500/90 to-red-500/90",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=90"
    },
    {
      title: "Exclusive Styles",
      subtitle: "Limited Edition Arrivals",
      description: "Be unique, be you",
      bg: "from-blue-600/90 via-purple-500/90 to-pink-500/90",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=90"
    }
  ];

  const categories = [
    { 
      name: "Men's Fashion", 
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&q=90",
      link: "/men"
    },
    { 
      name: "Women's Fashion", 
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=90",
      link: "/women"
    },
    { 
      name: "Kids Collection", 
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=90",
      link: "/kids"
    },
    { 
      name: "New Arrivals", 
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=90",
      link: "/products"
    },
    { 
      name: "Trending Styles", 
      image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=90",
      link: "/products"
    },
    { 
      name: "Hot Deals", 
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&q=90",
      link: "/sale"
    }
  ];

  const featuredCollections = [
    {
      id: 1,
      title: "Casual Comfort",
      subtitle: "Everyday Essentials",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700&q=90"
    },
    {
      id: 2,
      title: "Formal Elegance",
      subtitle: "Professional Looks",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=90"
    },
    {
      id: 3,
      title: "Active Lifestyle",
      subtitle: "Sports & Fitness",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=700&q=90"
    },
    {
      id: 4,
      title: "Party Ready",
      subtitle: "Night Out Styles",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=90"
    }
  ];

  const trendingItems = [
    {
      id: 1,
      title: "Street Style",
      description: "Urban fashion essentials",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=90",
      badge: "🔥 Hot"
    },
    {
      id: 2,
      title: "Minimalist Chic",
      description: "Less is more philosophy",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=90",
      badge: "✨ New"
    },
    {
      id: 3,
      title: "Bold & Bright",
      description: "Make a statement",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=90",
      badge: "💎 Premium"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Fashion Blogger",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=90",
      rating: 5,
      comment: "ShopMart has completely transformed my wardrobe! The quality is outstanding and the styles are always on-trend. Best shopping experience ever!"
    },
    {
      id: 2,
      name: "Ali Khan",
      role: "Business Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=90",
      rating: 5,
      comment: "Perfect place for professional attire! The collection is amazing and delivery is always on time. Highly recommended for quality clothing."
    },
    {
      id: 3,
      name: "Fatima Malik",
      role: "Style Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=90",
      rating: 5,
      comment: "I'm obsessed with ShopMart! The variety is incredible and I always find something unique. The customer service is top-notch too!"
    }
  ];

  const benefits = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Top-notch materials and craftsmanship"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Shopping",
      description: "100% safe and protected transactions"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Best Prices",
      description: "Unbeatable deals and offers daily"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[650px] md:h-[750px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-95"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${slide.bg}`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-5xl">
                <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-xl px-5 py-2.5 rounded-full mb-8 border border-white/40 shadow-2xl">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wide">EXCLUSIVE COLLECTION</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none drop-shadow-2xl tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-xl">
                  {slide.subtitle}
                </p>
                <p className="text-xl md:text-2xl mb-12 drop-shadow-lg">
                  {slide.description}
                </p>
                <button 
                  onClick={() => navigate('/products')}
                  className="bg-white text-gray-900 px-12 py-6 rounded-full font-black text-xl hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-2xl inline-flex items-center gap-3 group"
                >
                  EXPLORE COLLECTION 
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentSlide === index ? 'bg-white w-16 shadow-lg' : 'bg-white/60 w-2.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-4 text-white">
                <div className="text-red-400">{benefit.icon}</div>
                <div>
                  <h4 className="font-black text-lg">{benefit.title}</h4>
                  <p className="text-sm text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flash Banner */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 py-6 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-5">
            <Zap size={36} className="animate-pulse" />
            <div>
              <h3 className="text-3xl font-black tracking-tight">MEGA FLASH SALE!</h3>
              <p className="text-base font-medium opacity-95">Limited time offer - Shop before it's gone</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30">
            <Clock size={28} />
            <div className="text-3xl font-black font-mono">23:59:45</div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black text-gray-900 mb-5 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-2xl font-medium">Find your perfect style</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(category.link)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-square shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover:scale-105"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover brightness-100 group-hover:brightness-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-end p-8">
                <div className="w-full">
                  <h3 className="text-white font-black text-3xl md:text-4xl mb-3 transform group-hover:translate-y-[-12px] transition-transform duration-300 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-3 text-white opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-bold text-lg">Explore Now</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collections */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-gray-900 mb-5 tracking-tight">
              Featured Collections
            </h2>
            <p className="text-gray-600 text-2xl font-medium">Curated styles for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCollections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => navigate('/products')}
                className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover:scale-105"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover brightness-100 group-hover:brightness-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-4xl font-black mb-3 transform group-hover:translate-y-[-12px] transition-transform duration-300 drop-shadow-lg">
                    {collection.title}
                  </h3>
                  <p className="text-xl font-semibold mb-5 drop-shadow-md">
                    {collection.subtitle}
                  </p>
                  <button className="flex items-center gap-2 font-bold text-lg opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                    Discover <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Now */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea53f8b5?w=1400&q=80')] opacity-5 bg-cover bg-center"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-5 mb-20">
            <TrendingUp size={48} className="text-red-500" />
            <h2 className="text-6xl font-black text-white tracking-tight">Trending Now</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {trendingItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/products')}
                className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-square shadow-2xl hover:shadow-[0_25px_70px_rgba(255,0,0,0.3)] transition-all duration-500 transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover brightness-100 group-hover:brightness-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-8 left-8">
                  <span className="bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full text-base font-black border border-white/40 text-white shadow-lg">
                    {item.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <h3 className="text-4xl font-black mb-3 text-white transform group-hover:translate-y-[-12px] transition-transform duration-300 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-xl font-medium text-white/90 mb-5 drop-shadow-md">{item.description}</p>
                  <button className="flex items-center gap-3 font-bold text-lg text-red-400 opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-gray-900 mb-5 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-2xl font-medium">Real reviews from real people</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300 transform hover:-translate-y-3 border-2 border-gray-100"
              >
                <div className="flex items-center gap-5 mb-8">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-red-100 shadow-lg"
                  />
                  <div>
                    <h4 className="font-black text-gray-900 text-xl">{testimonial.name}</h4>
                    <p className="text-gray-500 text-base font-medium">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-3 -left-3 w-10 h-10 text-red-200" />
                  <p className="text-gray-700 leading-relaxed text-lg pl-8">
                    {testimonial.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="relative bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-[3rem] p-16 md:p-20 text-center text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10">
            <Sparkles className="w-20 h-20 mx-auto mb-8 animate-pulse" />
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              Join Our Fashion Family
            </h2>
            <p className="text-2xl md:text-3xl mb-12 font-semibold max-w-3xl mx-auto">
              Subscribe now and get 20% off your first purchase plus exclusive deals
            </p>
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-5">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-10 py-6 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg font-semibold shadow-xl"
              />
              <button className="bg-white text-gray-900 px-12 py-6 rounded-full font-black text-xl hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-xl whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;