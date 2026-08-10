import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchProducts } from '../data/products';
import { formatPrice } from '../utils/helpers';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const searchRes = searchProducts(query);
      setResults(searchRes);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex flex-col animate-in fade-in duration-200">
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="container-main max-w-4xl mx-auto flex items-center gap-4">
          <Search className="text-gray-400 shrink-0" size={24} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories..."
            className="flex-1 bg-transparent border-none outline-none text-xl sm:text-2xl text-gray-900 placeholder:text-gray-300 font-medium"
          />
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="container-main max-w-4xl mx-auto">
          {query.trim().length <= 1 ? (
            <div className="text-center text-gray-400 mt-12">
              <Search className="mx-auto mb-4 opacity-50" size={48} />
              <p className="text-lg">Type at least 2 characters to search...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center text-gray-400 mt-12">
              <p className="text-lg">No products found for "{query}"</p>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
                Search Results ({results.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="flex items-center gap-4 p-3 bg-white rounded-xl cursor-pointer hover:shadow-card hover:-translate-y-1 transition-all duration-200 border border-transparent hover:border-primary/20"
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-secondary mb-1 uppercase tracking-wider">{product.category}</p>
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">{product.name}</h4>
                      <p className="font-bold text-primary text-sm">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
