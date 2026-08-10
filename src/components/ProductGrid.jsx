import React from 'react';
import ProductCard from './ProductCard';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ProductGrid = ({ products = [], columns }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  // Determine grid columns based on prop or default responsive layout
  const gridClass = columns 
    ? `grid grid-cols-2 md:grid-cols-${Math.min(columns, 3)} lg:grid-cols-${columns} gap-4 md:gap-6`
    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6";

  return (
    <div 
      ref={ref}
      className={`${gridClass} animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      {products.map((product, index) => (
        <div 
          key={product.id}
          className="h-full"
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
