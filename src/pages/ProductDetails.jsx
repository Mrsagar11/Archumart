import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, ShoppingCart, MessageCircle, ChevronRight, Heart, Share2, ArrowLeft } from 'lucide-react';
import { api } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import QuantitySelector from '../components/QuantitySelector';
import ProductGrid from '../components/ProductGrid';
import { generateWhatsAppLink, formatPrice, getDiscountPercent } from '../utils/helpers';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const prod = await api.getProductById(id);
        if (prod) {
          setProduct(prod);
          const allProds = await api.getAllProducts();
          const related = allProds
            .filter(p => p.categoryId === prod.categoryId && p.id !== prod.id)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container-main section-padding text-center py-32 flex flex-col items-center justify-center text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-sm font-medium">Fetching details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-main section-padding text-center py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
        <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Shop
        </Link>
      </div>
    );
  }

  const discountPercent = getDiscountPercent(product.originalPrice, product.price);
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Archu Mart!`,
        url: window.location.href,
      }).catch(err => console.error('Error sharing:', err));
    }
  };

  return (
    <div className="container-main section-padding pt-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
        {/* Product Image */}
        <div className="relative group">
          <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-soft relative product-image-wrapper">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.isNew && (
              <div className="absolute top-4 left-4 badge-new">New</div>
            )}
            {product.isPopular && !product.isNew && (
              <div className="absolute top-4 left-4 badge-popular">Bestseller</div>
            )}
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button 
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors ${isWishlisted ? 'text-primary' : 'text-gray-600'}`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleShare}
              className="p-3 rounded-full bg-white/80 backdrop-blur shadow-sm text-gray-600 hover:bg-white transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full w-fit mb-4">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 4.5) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews || 128} reviews)</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-500 line-through mb-1">{formatPrice(product.originalPrice)}</span>
                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md mb-1">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          <div className="mb-6 flex items-center gap-2 text-green-600 font-medium bg-green-50 w-fit px-3 py-1.5 rounded-lg border border-green-100">
            <Check className="w-4 h-4" /> In Stock
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => addToCart(product, quantity)}
              className="btn-primary flex-1 py-4 flex items-center justify-center gap-2 text-lg rounded-xl"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <a 
              href={generateWhatsAppLink(product, quantity)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1 py-4 flex items-center justify-center gap-2 text-lg rounded-xl"
            >
              <MessageCircle className="w-5 h-5" /> Order on WhatsApp
            </a>
          </div>

          {/* Features */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <ul className="space-y-3">
              {[
                "100% Quality Guarantee",
                "Fast Local Delivery in Sakoli",
                "Easy Returns & Exchanges",
                "Secure Payment Options"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="mt-0.5 p-1 bg-green-100 text-green-600 rounded-full">
                    <Check className="w-3 h-3" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-4 px-6 font-medium text-lg border-b-2 transition-colors ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`py-4 px-6 font-medium text-lg border-b-2 transition-colors ${activeTab === 'why-buy' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('why-buy')}
          >
            Why Buy From Us
          </button>
        </div>
        <div className="py-8 text-gray-700 leading-relaxed">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="mb-4">
                Experience the premium quality of {product.name}. Carefully selected to meet your everyday needs, this product delivers exceptional value and performance.
              </p>
              <p>
                {product.description} Archu Mart ensures that all our products meet strict quality standards before they reach your hands. Perfect for regular use, it's designed to make your life easier and more enjoyable.
              </p>
            </div>
          )}
          {activeTab === 'why-buy' && (
            <div className="space-y-4">
              <p className="font-medium text-gray-900">Why choose Archu Mart in Sakoli?</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Local Trust:</strong> We are a trusted local business serving the Sakoli community for years.</li>
                <li><strong>Quality Assurance:</strong> Every product on our shelves is verified for quality and freshness.</li>
                <li><strong>Competitive Pricing:</strong> Enjoy great deals and honest pricing on all your daily needs.</li>
                <li><strong>Convenient Shopping:</strong> Order online or visit our store - whichever works best for you!</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-primary font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
