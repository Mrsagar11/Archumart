import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppChatLink } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import { STORE_INFO } from '../data/products';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.jpg" alt="Archu Mart Logo" className="w-9 h-9 rounded-full object-cover border border-gray-100 shadow-sm" />
              <span className="text-2xl font-display font-black tracking-tight text-primary-500">ARCHU MART</span>
            </Link>
            <p className="text-gray-500 mb-6 leading-relaxed text-sm">
              {t('footer_desc')}
            </p>
            <div className="flex space-x-4">
              <a 
                href={getWhatsAppChatLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Shop Col */}
          <div>
            <h3 className="font-display font-bold text-gray-900 mb-4">{t('shop')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop?category=school-stationery" className="text-gray-500 hover:text-primary-500 transition-colors">{t('school-stationery')}</Link></li>
              <li><Link to="/shop?category=kitchen-household" className="text-gray-500 hover:text-primary-500 transition-colors">{t('kitchen-household')}</Link></li>
              <li><Link to="/shop?category=home-storage" className="text-gray-500 hover:text-primary-500 transition-colors">{t('home-storage')}</Link></li>
              <li><Link to="/shop?category=kids-toys" className="text-gray-500 hover:text-primary-500 transition-colors">{t('kids-toys')}</Link></li>
              <li><Link to="/shop" className="text-primary-500 font-medium hover:text-primary-600 transition-colors">{t('view_all_products')}</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h3 className="font-display font-bold text-gray-900 mb-4">{t('about')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-500 hover:text-primary-500 transition-colors">{t('about')}</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-primary-500 transition-colors">{t('contact')}</Link></li>
              <li><Link to="/admin" className="text-gray-500 hover:text-primary-500 transition-colors">{t('admin_panel')}</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="font-display font-bold text-gray-900 mb-4">{t('contact')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="text-primary-500 shrink-0 mt-0.5" size={16} />
                <span>{STORE_INFO.location}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="text-primary-500 shrink-0" size={16} />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-primary-500 transition-colors">{STORE_INFO.phone}</a>
              </li>
              <li className="mt-4">
                <a 
                  href={getWhatsAppChatLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-sm py-2"
                >
                  {t('whatsapp_order_btn')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Archu Mart. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-primary-500 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
