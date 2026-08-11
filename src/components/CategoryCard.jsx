import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CategoryCard = ({ category }) => {
  const { t } = useLanguage();

  if (!category) return null;

  return (
    <Link 
      to={`/shop?category=${category.id}`}
      className={`group block rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-card relative overflow-hidden ${category.bgColor || 'bg-gray-50'}`}
    >
      {/* Decorative background circle */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/20 blur-xl group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="flex flex-col h-full relative z-10">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-bottom-left">
          {category.icon || category.emoji || '📦'}
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          {t(category.id)}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {t(`${category.id}_desc`, {}, category.description)}
        </p>
        
        <div className="mt-auto flex items-center text-primary font-medium text-sm">
          <span className="mr-2 group-hover:mr-3 transition-all">{t('shop_now')}</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
