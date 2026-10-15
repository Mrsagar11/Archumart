import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CategoryCard = ({ category }) => {
  const { t } = useLanguage();

  if (!category) return null;

  // Map category IDs to Tailwind color classes — no emoji, no arbitrary colors
  const colorMap = {
    'school-stationery': { bg: 'bg-blue-50', border: 'border-blue-100', accent: 'text-blue-600', dot: 'bg-blue-400' },
    'kitchen-household': { bg: 'bg-orange-50', border: 'border-orange-100', accent: 'text-orange-600', dot: 'bg-orange-400' },
    'home-storage': { bg: 'bg-teal-50', border: 'border-teal-100', accent: 'text-teal-600', dot: 'bg-teal-400' },
    'kids-toys': { bg: 'bg-pink-50', border: 'border-pink-100', accent: 'text-primary-500', dot: 'bg-primary-400' },
    'gift-items': { bg: 'bg-violet-50', border: 'border-violet-100', accent: 'text-violet-600', dot: 'bg-violet-400' },
    'daily-essentials': { bg: 'bg-amber-50', border: 'border-amber-100', accent: 'text-amber-600', dot: 'bg-amber-400' },
  };

  const colors = colorMap[category.id] || { bg: 'bg-gray-50', border: 'border-gray-100', accent: 'text-gray-600', dot: 'bg-gray-400' };

  return (
    <Link 
      to={`/shop?category=${category.id}`}
      className={`group block rounded-2xl p-6 border transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 ${colors.bg} ${colors.border}`}
    >
      <div className="flex flex-col h-full">
        {/* Colored dot accent instead of emoji */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
            <div className={`w-4 h-4 rounded-full ${colors.dot}`} />
          </div>
          <ArrowRight size={18} className={`${colors.accent} opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5`} />
        </div>
        
        <h3 className={`font-display font-bold text-lg text-gray-900 mb-1.5`}>
          {t(category.id)}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {t(`${category.id}_desc`, {}, category.description)}
        </p>
        
        <div className={`mt-auto flex items-center ${colors.accent} font-semibold text-sm`}>
          <span className="mr-2">{t('shop_now')}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
