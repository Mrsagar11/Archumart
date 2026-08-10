import { STORE_INFO } from '../data/products';

/**
 * Generate a WhatsApp order URL for a single product
 */
export const generateWhatsAppLink = (product, quantity = 1) => {
  const message = `Hello Archu Mart 👋

I would like to order:

Product: ${product.name}
Quantity: ${quantity}
Price: ₹${product.price} ${quantity > 1 ? `× ${quantity} = ₹${product.price * quantity}` : ''}

Please confirm availability and order details. 🙏`;

  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a WhatsApp order URL for cart items
 */
export const generateCartWhatsAppLink = (cartItems) => {
  const itemsList = cartItems
    .map((item, index) => `${index + 1}. ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`)
    .join('\n');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = `Hello Archu Mart 👋

I want to order the following:

${itemsList}

Estimated Total: ₹${total.toLocaleString('en-IN')}

Please confirm availability. 🙏`;

  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a simple WhatsApp chat link
 */
export const getWhatsAppChatLink = () => {
  const message = `Hello Archu Mart 👋\n\nI have a question about your products.`;
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Format price in INR
 */
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

/**
 * Calculate discount percentage
 */
export const getDiscountPercent = (originalPrice, price) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
