import React, { useEffect } from 'react';
import { ShoppingBag, Heart, Smile, MapPin, Truck, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <ShoppingBag className="w-6 h-6 text-primary" />,
      title: t('about_value_range_title'),
      description: t('about_value_range_desc')
    },
    {
      icon: <Smile className="w-6 h-6 text-primary" />,
      title: t('about_value_service_title'),
      description: t('about_value_service_desc')
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: t('about_value_convenient_title'),
      description: t('about_value_convenient_desc')
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg-warm py-20 lg:py-32">
        <div className="container-main text-center">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">{t('about_hero_tag')}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight">
            {t('about_hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed font-semibold">
            {t('about_hero_desc')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding container-main">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-card aspect-[4/3] relative bg-gray-200">
            {/* Placeholder for Store Image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 flex-col">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-semibold text-lg">Archu Mart Storefront</p>
              <p className="text-sm">Store image goes here</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('our_story')}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg font-semibold">
              <p>
                {t('about_story_1')}
              </p>
              <p>
                {t('about_story_2')}
              </p>
              <p>
                {t('about_story_3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('why_choose_us')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-semibold">{t('why_choose_us_sub')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-card transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed font-semibold text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding container-main text-center">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-10 md:p-16 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about_cta_title')}</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-semibold">
              {t('about_cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/shop" className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all text-lg shadow-sm">
                {t('browse_shop')}
              </Link>
              <a 
                href="https://wa.me/919356603316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold px-8 py-4 rounded-full transition-all text-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-5 h-5" /> {t('message_whatsapp')}
              </a>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>
      </section>
    </div>
  );
};

export default About;
