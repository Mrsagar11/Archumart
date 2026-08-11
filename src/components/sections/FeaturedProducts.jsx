import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../ProductGrid';
import { api } from '../../utils/api';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FeaturedProducts = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const data = await api.getAllProducts();
        const featured = data.filter(p => p.badge === 'Popular' || p.badge === 'Best Seller').slice(0, 8);
        setFeaturedProducts(featured);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <div className="container-main">
        <div className={`text-center mb-12 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-heading text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('popular_title')}</span>
          </h2>
          <p className="section-subtitle text-gray-600 max-w-2xl mx-auto text-lg">
            {t('popular_subtitle')}
          </p>
        </div>

        <div className={`animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          {loading ? (
            <div className="py-12 flex justify-center items-center text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mr-2"></div>
              <span className="text-sm">Loading popular items...</span>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>

        <div className={`mt-12 text-center animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
          <Link 
            to="/shop" 
            className="inline-block px-8 py-3 rounded-full border-2 border-primary-400 text-primary-400 font-semibold hover:bg-primary-400 hover:text-white transition-colors duration-300"
          >
            {t('view_all_products')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
