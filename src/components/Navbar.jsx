import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone, Heart, MapPin, ChevronDown, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getWhatsAppChatLink } from '../utils/helpers';

export default function Navbar({ onSearchClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <span className="text-2xl font-black tracking-tight gradient-text">ARCHU MART</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? 'text-primary' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 z-50">
          <Link 
            to="/admin" 
            className="p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Admin Dashboard"
            title="Admin Login"
          >
            <Lock size={20} />
          </Link>

          <button 
            onClick={onSearchClick}
            className="p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <button 
            onClick={toggleCart}
            className="p-2 text-gray-700 hover:text-primary transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <a 
            href={getWhatsAppChatLink()}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex btn-whatsapp text-sm py-2 px-4 items-center gap-2"
          >
            <Phone size={16} />
            <span>Order</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 pt-24 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        <div className="flex flex-col items-center gap-6 text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-medium ${
                isActive(link.path) ? 'text-primary' : 'text-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={getWhatsAppChatLink()}
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-whatsapp mt-4 w-2/3 justify-center text-lg"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
