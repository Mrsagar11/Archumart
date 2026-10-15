import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ExternalLink } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../context/LanguageContext';
import { STORE_INFO } from '../../data/products';

const LocationSection = () => {
  const [ref, isVisible] = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <div className="container-main">
        <div className={`text-center mb-12 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-heading text-gray-900">{t('location_title')}</h2>
          <p className="section-subtitle text-gray-600 max-w-2xl mx-auto mt-3">
            {t('location_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          <div className={`bg-white rounded-2xl shadow-soft border border-gray-100 p-8 md:p-10 flex flex-col justify-center space-y-8 animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary-500" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">{t('store_address')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {STORE_INFO.name}<br />
                  {STORE_INFO.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Phone className="text-emerald-600" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">{t('contact')}</h3>
                <p className="text-gray-600 mb-3">
                  <a href={`tel:${STORE_INFO.phone}`} className="hover:text-primary-500 transition-colors">
                    {STORE_INFO.phone}
                  </a>
                </p>
                <a 
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  <MessageCircle size={16} /> {t('whatsapp_order_btn')}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Clock className="text-blue-600" size={22} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">{t('store_hours')}</h3>
                <p className="text-gray-600">
                  {t('store_days')}<br />
                  <span className="font-semibold text-gray-900">{t('store_time')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Map Panel */}
          <div className={`bg-white rounded-2xl shadow-soft border border-gray-100 min-h-[300px] flex flex-col items-center justify-center p-8 animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">{t('location_title')}</h3>
              <p className="text-sm text-gray-500 mb-6">{t('maps_coming')}</p>
              <a 
                href={STORE_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm"
              >
                <Navigation size={16} /> {t('get_directions')}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
