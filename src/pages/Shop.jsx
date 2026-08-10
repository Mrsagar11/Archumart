import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { api } from '../utils/api';
import ProductGrid from '../components/ProductGrid';
import FilterBar from '../components/FilterBar';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setLoading(true);
      const data = await api.getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categoryFromUrl !== activeCategory) {
      setActiveCategory(categoryFromUrl);
    }
  }, [searchParams, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
    setDisplayCount(12); // Reset count on filter change
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDisplayCount(12); // Reset count on search
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = products || [];

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(product => product.categoryId === activeCategory || product.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Sort
    result = [...result];
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        break;
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, displayCount);

  return (
    <div className="section-padding container-main">
      <div className="text-center mb-8">
        <h1 className="section-heading">Shop Everything</h1>
        <p className="section-subtitle">Discover our complete collection of everyday products</p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-6 py-4 pl-12 rounded-3xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </div>

      <FilterBar 
        categories={CATEGORIES || []} 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <div className="flex justify-between items-center mb-6 text-sm text-gray-600 mt-6">
        <p>Showing {displayedProducts.length} of {filteredAndSortedProducts.length} products</p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="font-medium text-gray-700">Sort by:</label>
          <select 
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-200 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 py-1 pl-2 pr-8 text-sm"
          >
            <option value="popular">Popularity</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-gray-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-sm font-medium">Loading catalog items...</p>
        </div>
      ) : filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchQuery(''); handleCategoryChange('All'); }}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <ProductGrid products={displayedProducts} />
          
          {displayCount < filteredAndSortedProducts.length && (
            <div className="text-center mt-12">
              <button 
                onClick={() => setDisplayCount(prev => prev + 12)}
                className="btn-secondary px-8 py-3 rounded-full"
              >
                Load More Products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
