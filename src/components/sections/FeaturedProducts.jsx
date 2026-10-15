import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../ProductGrid';
import { api } from '../../utils/api';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

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
        <div className={`flex items-end justify-between mb-12 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div>
            <h2 className="section-heading text-gray-900">
              {t('popular_title')}
            </h2>
            <p className="section-subtitle text-gray-600 max-w-xl mt-3">
              {t('popular_subtitle')}
            </p>
          </div>
          <Link 
            to="/shop" 
            className="hidden md:flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-600 transition-colors shrink-0"
          >
            {t('view_all_products')}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className={`animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          {loading ? (
            <div className="py-12 flex justify-center items-center text-gray-400">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-primary-500 rounded-full animate-spin mr-3" />
              <span className="text-sm">Loading products...</span>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>

        <div className={`mt-10 text-center md:hidden animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
          <Link 
            to="/shop" 
            className="btn-secondary px-8 py-3 rounded-full font-semibold"
          >
            {t('view_all_products')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
