import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useLanguage } from '../../context/LanguageContext';

const LocationSection = () => {
  const [ref, isVisible] = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <div className="container-main">
        <div className={`text-center mb-12 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-heading text-3xl md:text-4xl font-bold mb-4">{t('location_title')}</h2>
          <p className="section-subtitle text-gray-600 max-w-2xl mx-auto text-lg">
            {t('location_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          <div className={`bg-white rounded-2xl shadow-soft p-8 md:p-10 flex flex-col justify-center space-y-8 animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-pink-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('store_address')}</h3>
                <p className="text-gray-600 leading-relaxed font-semibold">
                  Archu Mart<br />
                  Sakoli, Maharashtra<br />
                  India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Phone className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('contact')}</h3>
                <p className="text-gray-600 leading-relaxed mb-3 font-semibold">
                  +91 93566 03316
                </p>
                <a 
                  href="https://wa.me/919356603316"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
                >
                  <MessageCircle size={18} /> {t('whatsapp_order_btn')}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('store_hours')}</h3>
                <p className="text-gray-600 leading-relaxed font-semibold">
                  {t('store_days')}<br />
                  {t('store_time')}
                </p>
              </div>
            </div>
          </div>

          <div className={`bg-gray-200 rounded-2xl shadow-soft h-80 lg:h-auto min-h-[300px] flex flex-col items-center justify-center animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            {/* Placeholder for Google Maps */}
            <div className="text-center p-6 text-gray-500">
              <MapPin size={48} className="mx-auto mb-4 opacity-50 text-gray-600" />
              <h3 className="text-xl font-medium mb-2">{t('location_title')}</h3>
              <p className="text-sm">{t('maps_coming')}</p>
              <a 
                href="https://maps.google.com/?q=Sakoli,+Maharashtra,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 mx-auto bg-white px-6 py-2.5 rounded-full shadow-sm text-gray-700 font-bold hover:bg-gray-50 transition-colors w-max"
              >
                <Navigation size={18} /> {t('get_directions')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;
