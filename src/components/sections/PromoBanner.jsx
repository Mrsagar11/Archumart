import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../context/LanguageContext';

const PromoBanner = () => {
  const [ref, isVisible] = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-main">
        <div className={`relative w-full rounded-3xl overflow-hidden bg-gray-900 p-10 md:p-16 text-center animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          {/* Clean geometric pattern — no blur blobs */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(244,63,94,0.15),transparent)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.02] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight text-balance">
              {t('promo_title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-medium">
              {t('promo_desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="https://wa.me/919356603316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle size={22} />
                {t('order_whatsapp')}
              </a>
              <Link 
                to="/shop" 
                className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/20"
              >
                {t('browse_products')}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
