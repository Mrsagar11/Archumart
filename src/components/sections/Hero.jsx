import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, BookOpen, Home, Gift, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const CategoryPill = ({ Icon, label, color }) => (
  <div className={`flex items-center gap-2.5 px-5 py-3 bg-white rounded-2xl shadow-card border border-gray-100 transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={20} />
    </div>
    <span className="text-sm font-semibold text-gray-800">{label}</span>
  </div>
);

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden gradient-bg pt-24 pb-16">
      {/* Subtle decorative pattern — no blurred blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,63,94,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(244,63,94,0.03)_0%,transparent_50%)]" />

      <div className="container-main relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full border border-primary-100">
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              <span className="text-sm font-semibold text-primary-600">{t('hero_tag') || 'Your Neighbourhood Store'}</span>
            </div>

            <h1 className="section-heading text-4xl md:text-5xl lg:text-6xl font-display leading-[1.1] text-gray-900 tracking-tight text-balance">
              {t('hero_title')}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero_subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/shop" className="btn-primary w-full sm:w-auto px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center gap-2 shadow-card">
                {t('start_shopping')}
                <ArrowRight size={20} />
              </Link>
              <a 
                href="https://wa.me/919356603316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center gap-2 shadow-card"
              >
                {t('order_whatsapp')}
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-lg relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {/* Category card grid — opaque, clean layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <CategoryPill Icon={ShoppingBag} label={t('kitchen-household') || 'Kitchen'} color="bg-primary-50 text-primary-500" />
                <CategoryPill Icon={BookOpen} label={t('school-stationery') || 'Stationery'} color="bg-blue-50 text-blue-600" />
              </div>
              <div className="space-y-4 pt-8">
                <CategoryPill Icon={Home} label={t('home-storage') || 'Storage'} color="bg-amber-50 text-amber-600" />
                <CategoryPill Icon={Gift} label={t('gift-items') || 'Gifts'} color="bg-emerald-50 text-emerald-600" />
              </div>
            </div>

            {/* Stats banner */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-card p-5 flex items-center justify-around">
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-gray-900">24+</p>
                <p className="text-xs font-medium text-muted">{t('trust_variety_title') || 'Products'}</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-gray-900">6</p>
                <p className="text-xs font-medium text-muted">{t('categories') || 'Categories'}</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold text-primary-500">Sakoli</p>
                <p className="text-xs font-medium text-muted">{t('local_store') || 'Local Store'}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
