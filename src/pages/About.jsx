import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Smile, Truck, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { STORE_INFO } from '../data/products';

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-50",
      title: t('about_value_range_title'),
      description: t('about_value_range_desc')
    },
    {
      icon: <Smile className="w-6 h-6 text-primary-500" />,
      iconBg: "bg-primary-50",
      title: t('about_value_service_title'),
      description: t('about_value_service_desc')
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      title: t('about_value_convenient_title'),
      description: t('about_value_convenient_desc')
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 lg:py-32 border-b border-gray-100">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight text-balance">
            {t('about_hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('about_hero_desc')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-card aspect-[4/3] relative bg-gray-100 border border-gray-100">
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-gray-400">
              <ShoppingBag className="w-14 h-14 opacity-40" />
              <p className="font-semibold text-lg text-gray-500">Archu Mart</p>
              <p className="text-sm text-gray-400">Sakoli, Maharashtra</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">{t('our_story')}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-base">
              <p>{t('about_story_1')}</p>
              <p>{t('about_story_2')}</p>
              <p>{t('about_story_3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">{t('why_choose_us')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">{t('why_choose_us_sub')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-card transition-shadow">
                <div className={`w-12 h-12 ${value.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding container-main text-center">
        <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-white shadow-elevated relative overflow-hidden">
          {/* Clean geometric accent — no blur blobs */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(244,63,94,0.1),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{t('about_cta_title')}</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {t('about_cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/shop" className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all text-lg shadow-sm">
                {t('browse_shop')}
              </Link>
              <a 
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp font-bold px-8 py-4 rounded-full text-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> {t('message_whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
