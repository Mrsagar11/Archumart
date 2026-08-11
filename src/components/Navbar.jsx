import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone, Heart, MapPin, ChevronDown, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppChatLink } from '../utils/helpers';

export default function Navbar({ onSearchClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('shop'), path: '/shop' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
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
        <div className="flex items-center gap-3 z-50">
          {/* Language Selector Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-gray-150 text-xs font-extrabold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors shadow-soft"
              title="Select Language"
            >
              <span>🌐</span>
              <span>{language === 'en' ? 'EN' : language === 'hi' ? 'हिन्दी' : 'मराठी'}</span>
            </button>
            <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 hidden group-hover:block transition-all animate-scale-in">
              <button
                onClick={() => changeLanguage('en')}
                className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors ${language === 'en' ? 'text-primary' : 'text-gray-700'}`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('hi')}
                className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors ${language === 'hi' ? 'text-primary' : 'text-gray-700'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => changeLanguage('mr')}
                className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors ${language === 'mr' ? 'text-primary' : 'text-gray-700'}`}
              >
                मराठी
              </button>
            </div>
          </div>

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
              <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border border-white">
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
            <span>{t('order')}</span>
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
            {t('whatsapp_order_btn')}
          </a>
          <div className="flex flex-col gap-2 mt-6 w-3/4">
            <span className="text-[10px] font-extrabold text-gray-400 text-center uppercase tracking-wider">🌐 Select Language / भाषा निवडा</span>
            <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => { changeLanguage('en'); setIsMobileMenuOpen(false); }}
                className={`py-2 rounded-lg text-xs font-extrabold transition-all ${language === 'en' ? 'bg-primary-400 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </button>
              <button
                onClick={() => { changeLanguage('hi'); setIsMobileMenuOpen(false); }}
                className={`py-2 rounded-lg text-xs font-extrabold transition-all ${language === 'hi' ? 'bg-primary-400 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => { changeLanguage('mr'); setIsMobileMenuOpen(false); }}
                className={`py-2 rounded-lg text-xs font-extrabold transition-all ${language === 'mr' ? 'bg-primary-400 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
