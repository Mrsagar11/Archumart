import React from 'react';
import { Package, BadgeDollarSign, MapPin, MessageCircle } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

import { useLanguage } from '../../context/LanguageContext';

const TrustBadges = () => {
  const [ref, isVisible] = useScrollAnimation();
  const { t } = useLanguage();

  const features = [
    {
      icon: Package,
      title: t('trust_variety_title'),
      description: t('trust_variety_desc'),
      color: "bg-blue-100 text-blue-600",
      delay: "0s"
    },
    {
      icon: BadgeDollarSign,
      title: t('trust_prices_title'),
      description: t('trust_prices_desc'),
      color: "bg-green-100 text-green-600",
      delay: "0.1s"
    },
    {
      icon: MapPin,
      title: t('trust_local_title'),
      description: t('trust_local_desc'),
      color: "bg-purple-100 text-purple-600",
      delay: "0.2s"
    },
    {
      icon: MessageCircle,
      title: t('trust_whatsapp_title'),
      description: t('trust_whatsapp_desc'),
      color: "bg-pink-100 text-pink-600",
      delay: "0.3s"
    }
  ];

  return (
    <section className="section-padding bg-gray-50/50" ref={ref}>
      <div className="container-main">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center animate-on-scroll ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: feature.delay }}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${feature.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
