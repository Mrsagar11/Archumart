import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppChatLink } from '../utils/helpers';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent absolute top-0 left-0"></div>
      
      <div className="container-main relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-black tracking-tight gradient-text">ARCHU MART</span>
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Premium quality products delivered right to your doorstep. Experience the joy of hassle-free shopping.
            </p>
            <div className="flex space-x-4">
              <a 
                href={getWhatsAppChatLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop?category=school-stationery" className="text-gray-500 hover:text-primary transition-colors">School & Stationery</Link></li>
              <li><Link to="/shop?category=kitchen-household" className="text-gray-500 hover:text-primary transition-colors">Kitchen & Household</Link></li>
              <li><Link to="/shop?category=home-storage" className="text-gray-500 hover:text-primary transition-colors">Home & Storage</Link></li>
              <li><Link to="/shop?category=kids-toys" className="text-gray-500 hover:text-primary transition-colors">Kids & Toys</Link></li>
              <li><Link to="/shop" className="text-primary font-medium hover:underline">View All Products</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-500 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="text-gray-500 hover:text-primary font-medium transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="text-primary shrink-0 mt-1" size={18} />
                <span>Sakoli, Maharashtra<br/>India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+91 9356603316</span>
              </li>
              <li className="mt-4">
                <a 
                  href={getWhatsAppChatLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-sm py-2"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>© 2026 Archu Mart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
