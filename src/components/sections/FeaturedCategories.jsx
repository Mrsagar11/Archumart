import React from 'react';
import CategoryCard from '../CategoryCard';
import { CATEGORIES } from '../../data/products';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const FeaturedCategories = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-main">
        <div className={`text-center mb-12 animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-heading text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="section-subtitle text-gray-600 max-w-2xl mx-auto text-lg">Find what you need quickly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <div 
              key={category.id} 
              className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
