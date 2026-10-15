import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FilterBar = ({ 
  categories = [], 
  activeCategory = 'All', 
  onCategoryChange, 
  sortBy = 'default', 
  onSortChange,
  productCount = 0
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { language, t } = useLanguage();

  const sortOptions = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Categories Horizontal Scroll */}
        <div className="flex-grow overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <button
              onClick={() => onCategoryChange && onCategoryChange('All')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === 'All'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {language === 'en' ? 'All' : 'सभी'}
            </button>

            {categories.map((cat) => {
              const catId = typeof cat === 'string' ? cat : cat.id;
              const catName = typeof cat === 'string' ? cat : cat.name;
              const isActive = activeCategory === catId;
              return (
                <button
                  key={catId}
                  onClick={() => onCategoryChange && onCategoryChange(catId)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t(catId, {}, catName)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center justify-between lg:justify-end space-x-4 border-t lg:border-t-0 pt-3 lg:pt-0">
          <div className="text-sm text-gray-500 whitespace-nowrap">
            Showing <span className="font-semibold text-gray-900">{productCount}</span> products
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 text-sm text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl transition-colors lg:hidden" aria-label="Open filters">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            {/* Custom Select for Sort */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center space-x-2 text-sm text-gray-700 font-medium bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors min-w-[160px] justify-between"
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <span className="truncate">
                  {sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort by'}
                </span>
                <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSortOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setIsSortOpen(false)}
                    aria-label="Close sort menu"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-card border border-gray-100 py-1 z-20" role="listbox">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        role="option"
                        aria-selected={sortBy === option.value}
                        onClick={() => {
                          if (onSortChange) onSortChange(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          sortBy === option.value ? 'text-primary-500 font-medium bg-primary-50/50' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
