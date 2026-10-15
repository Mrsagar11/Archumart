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
      case 'popular': return 'badge-popular';
      case 'new': return 'badge-new';
      case 'best seller': return 'badge-bestseller';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft card-hover border border-gray-100 flex flex-col h-full overflow-hidden group">
      {/* Image Section */}
      <div className="product-image-wrapper relative pt-[100%] overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`} className="absolute inset-0">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=300&h=300&fit=crop'}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-500 group-hover:brightness-105"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`badge ${getBadgeClass(product.badge)}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-soft hover:bg-gray-50 transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={isWishlisted ? 'fill-primary-500 text-primary-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/shop?category=${product.category}`} className="text-xs text-muted font-medium mb-1 hover:text-primary-500 transition-colors">
          {t(product.category)}
        </Link>
        
        <Link to={`/product/${product.id}`} className="mb-2 flex-grow">
          <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating || 4) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
            />
          ))}
          {product.reviews && (
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="font-bold text-lg text-gray-900">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              {discount > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
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
            className="flex-grow btn-primary py-2.5 px-3 text-sm flex items-center justify-center gap-1.5 rounded-xl font-semibold"
          >
            <ShoppingCart size={16} />
            <span>{t('add_to_cart')}</span>
          </button>
          
          <button
            onClick={handleWhatsAppClick}
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors"
            title={t('inquire_whatsapp')}
            aria-label="Order via WhatsApp"
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
