import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a1931] text-white border-t border-blue-800">
      {/* Main Footer Content */}
      <div className="w-full px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div>
                <span className="text-2xl font-black tracking-tight">
                  OUTFIT<span className="text-[#ffc947]">HUB.</span>
                </span>
                <div className="text-xs text-blue-300 tracking-widest -mt-1">
                  YOUR SHOPPING DESTINATION
                </div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Your ultimate shopping destination for fashion, style, and quality. Discover the perfect blend of comfort and elegance.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-blue-900 hover:bg-[#ffc947] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#0a1931]">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-900 hover:bg-[#ffc947] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#0a1931]">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-900 hover:bg-[#ffc947] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#0a1931]">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-900 hover:bg-[#ffc947] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-[#0a1931]">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-6 text-[#ffc947]">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/men" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Men's Collection</a></li>
              <li><a href="/women" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Women's Collection</a></li>
              <li><a href="/kids" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Kids Collection</a></li>
              <li><a href="/sale" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Sale & Offers</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-black mb-6 text-[#ffc947]">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Contact Us</a></li>
              <li><a href="#" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Shipping Info</a></li>
              <li><a href="#" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Returns & Exchanges</a></li>
              <li><a href="#" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">FAQ</a></li>
              <li><a href="#" className="text-blue-200 hover:text-[#ffc947] transition text-sm font-medium hover:translate-x-1 block">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-black mb-6 text-[#ffc947]">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-blue-200 text-sm">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#ffc947]" />
                <span className="font-medium">123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Phone size={18} className="flex-shrink-0 text-[#ffc947]" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200 text-sm">
                <Mail size={18} className="flex-shrink-0 text-[#ffc947]" />
                <span className="font-medium">support@outfithub.com</span>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-blue-200 text-sm font-medium mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-blue-900 border border-blue-700 rounded-lg px-3 py-2 text-white text-sm placeholder-blue-300 focus:outline-none focus:border-[#ffc947]"
                />
                <button className="bg-[#ffc947] text-[#0a1931] px-4 py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 bg-blue-950">
        <div className="w-full px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="flex items-center gap-2 text-blue-300">
              © {new Date().getFullYear()} OUTFITHUB. Made with 
              <Heart size={14} className="text-[#ffc947] fill-[#ffc947]" /> 
              All Rights Reserved
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-blue-300 hover:text-[#ffc947] transition font-medium">Privacy Policy</a>
              <a href="#" className="text-blue-300 hover:text-[#ffc947] transition font-medium">Terms of Service</a>
              <a href="#" className="text-blue-300 hover:text-[#ffc947] transition font-medium">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;