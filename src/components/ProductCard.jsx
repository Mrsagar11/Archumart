import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getDiscountPercent, generateWhatsAppLink } from '../utils/helpers';


import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useLanguage();

  const isWishlisted = isInWishlist(product.id);
  const discount = getDiscountPercent(product.originalPrice, product.price);

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const url = generateWhatsAppLink(product);
    window.open(url, '_blank');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const getBadgeClass = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'popular': return 'badge-popular bg-purple-100 text-purple-700';
      case 'new': return 'badge-new bg-green-100 text-green-700';
      case 'best seller': return 'badge-bestseller bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft card-hover border border-gray-100 flex flex-col h-full overflow-hidden group">
      {/* Image Section */}
      <div className="product-image-wrapper relative pt-[100%] overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`} className="absolute inset-0">
          <img
            src={product.image || 'https://via.placeholder.com/300?text=Archu+Mart'}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getBadgeClass(product.badge)}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/shop?category=${product.category}`} className="text-xs text-muted font-medium mb-1 hover:text-primary transition-colors">
          {t(product.category)}
        </Link>
        
        <Link to={`/product/${product.id}`} className="mb-2 flex-grow">
          <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating || 4.5) ? 'fill-accent text-accent' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews || Math.floor(Math.random() * 50) + 10})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="font-bold text-lg text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              {discount > 0 && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-grow btn-primary py-2.5 px-3 text-sm flex items-center justify-center gap-1.5 rounded-xl font-semibold shadow-sm hover:shadow transition-all"
          >
            <ShoppingCart size={16} />
            <span>{t('add_to_cart')}</span>
          </button>
          
          <button
            onClick={handleWhatsAppClick}
            className="p-2.5 rounded-xl bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
            title={t('inquire_whatsapp')}
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
