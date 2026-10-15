import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { STORE_INFO } from '../data/products';

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
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">{t('contact_title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('contact_subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">{t('contact')}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 text-primary-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">{t('store_address')}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {STORE_INFO.name}<br />
                    {STORE_INFO.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">{t('contact')}</h3>
                  <p className="text-gray-600">
                    <a href={`tel:${STORE_INFO.phone}`} className="hover:text-primary-500 transition-colors">{STORE_INFO.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href={`mailto:${STORE_INFO.email}`} className="hover:text-primary-500 transition-colors">{STORE_INFO.email}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 text-amber-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">{t('store_hours')}</h3>
                  <div className="text-gray-600 space-y-1">
                    <p className="flex justify-between w-48"><span>{t('store_days')}:</span> <span className="font-medium">{t('store_time')}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
            <h3 className="text-xl font-display font-bold text-gray-900 mb-3">Fastest way to reach us</h3>
            <p className="text-gray-600 mb-6 text-sm">
              For quick queries about stock availability, pricing, or placing an order, message us directly on WhatsApp.
            </p>
            <a 
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20Archu%20Mart!%20I%20have%20an%20inquiry.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp w-full py-4 flex items-center justify-center gap-2 text-base rounded-xl font-bold"
            >
              <MessageCircle className="w-5 h-5" /> {t('message_whatsapp')}
            </a>
          </div>
        </div>

        {/* Contact Form / Map */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{t('message_sent')}</h3>
                <p className="text-gray-600">
                  {t('message_sent_desc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-bold text-gray-700 mb-1.5">{t('contact_name')}</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 transition-shadow text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-bold text-gray-700 mb-1.5">{t('contact_phone')}</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 transition-shadow text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-bold text-gray-700 mb-1.5">{t('contact_message')}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 transition-shadow resize-none text-sm"
                    placeholder="How can we help you today?"
                  />
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
          <div className="bg-gray-50 rounded-2xl h-64 overflow-hidden relative border border-gray-100 flex items-center justify-center">
            <div className="text-center p-4">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-semibold text-gray-600">Sakoli, Maharashtra</p>
              <a
                href={STORE_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-500 hover:text-primary-600 transition-colors mt-1 inline-block"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
