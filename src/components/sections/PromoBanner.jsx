import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const PromoBanner = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-main">
        <div className={`relative w-full rounded-3xl overflow-hidden gradient-bg-warm p-10 md:p-16 text-center animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-xl mix-blend-overlay"></div>
             <div className="absolute bottom-10 -right-10 w-60 h-60 bg-white/20 rounded-full blur-2xl mix-blend-overlay"></div>
             <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-200/30 rounded-full blur-md"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Need Something for Home, School or Everyday Life?
            </h2>
            <p className="text-lg md:text-xl text-gray-800 font-medium">
              Explore our collection or simply message us on WhatsApp.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <a 
                href="https://wa.me/919356603316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <MessageCircle size={24} />
                Order on WhatsApp
              </a>
              <Link 
                to="/shop" 
                className="btn-secondary w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold bg-white text-primary-400 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
