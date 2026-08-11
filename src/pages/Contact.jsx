import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="container-main section-padding">
      <div className="text-center mb-12 lg:mb-16">
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('about_hero_tag')}</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('contact_title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-semibold">
          {t('contact_subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact')}</h2>
            
            <div className="space-y-6 font-semibold">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('store_address')}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Archu Mart<br />
                    Sakoli, Maharashtra<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('contact')}</h3>
                  <p className="text-gray-600">
                    <a href="tel:+919356603316" className="hover:text-primary transition-colors">+91 9356603316</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                  <p className="text-gray-600">
                    <a href="mailto:archumart@gmail.com" className="hover:text-primary transition-colors">archumart@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('store_hours')}</h3>
                  <div className="text-gray-600 space-y-1">
                    <p className="flex justify-between w-48"><span>{t('store_days')}:</span> <span>{t('store_time')}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#25D366]/10 rounded-2xl p-8 border border-[#25D366]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fastest way to reach us</h3>
            <p className="text-gray-600 mb-6 font-semibold">
              For quick queries about stock availability, pricing, or placing an order, message us directly on WhatsApp!
            </p>
            <a 
              href="https://wa.me/919356603316?text=Hello%20Archu%20Mart!%20I%20have%20an%20inquiry." 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp w-full py-4 flex items-center justify-center gap-2 text-lg rounded-xl font-bold"
            >
              <MessageCircle className="w-5 h-5" /> {t('message_whatsapp')}
            </a>
          </div>
        </div>

        {/* Contact Form / Map */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('message_sent')}</h3>
                <p className="text-gray-600 font-semibold">
                  {t('message_sent_desc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">{t('contact_name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-sm font-semibold"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">{t('contact_phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow text-sm font-semibold"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">{t('contact_message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none text-sm font-semibold"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 rounded-xl font-bold"
                >
                  <Send className="w-5 h-5" /> {t('send_message')}
                </button>
              </form>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-64 overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-100/50 backdrop-blur-sm p-4 text-center">
              <MapPin className="w-10 h-10 mb-2 opacity-60" />
              <p className="font-bold">Interactive Map view</p>
              <p className="text-sm">Google Maps embed will be integrated here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
