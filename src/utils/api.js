import { products as fallbackProducts } from '../data/products';

// Base URL for serverless functions
const API_BASE = '/.netlify/functions';

// Local storage key for fallback simulation
const LOCAL_STORAGE_KEY = 'archu_mart_local_products';

// Initialize local storage fallback if empty
const getLocalProducts = () => {
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!local) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackProducts));
    return fallbackProducts;
  }
  return JSON.parse(local);
};

const saveLocalProducts = (items) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

export const api = {
  /**
   * Admin Login authentication
   */
  async login(password) {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Incorrect password');
      const data = await res.json();
      localStorage.setItem('admin_token', data.token);
      return { success: true };
    } catch (err) {
      console.warn('Backend API offline or failed, using local verification fallback:', err.message);
      const localPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
      if (password === localPassword) {
        localStorage.setItem('admin_token', 'archumart-admin-token-session');
        return { success: true };
      }
      return { success: false, error: 'Incorrect password' };
    }
  },

  /**
   * Admin Logout
   */
  logout() {
    localStorage.removeItem('admin_token');
  },

  /**
   * Check if Admin is authenticated
   */
  isAuthenticated() {
    return localStorage.getItem('admin_token') === 'archumart-admin-token-session';
  },

  /**
   * Fetch all products
   */
  async getAllProducts() {
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      
      // Update local storage fallback in case we go offline later
      saveLocalProducts(data);
      return data;
    } catch (err) {
      console.warn('Backend API offline or failed, falling back to local storage:', err.message);
      return getLocalProducts();
    }
  },

  /**
   * Fetch product details by ID
   */
  async getProductById(id) {
    try {
      const res = await fetch(`${API_BASE}/products?id=${id}`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      console.warn(`Backend API offline or failed for product ID ${id}:`, err.message);
      const items = getLocalProducts();
      return items.find(p => p.id === parseInt(id));
    }
  },

  /**
   * Add a new product
   */
  async addProduct(productData) {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, performing mock local storage write:', err.message);
      const items = getLocalProducts();
      const maxId = items.reduce((max, p) => p.id > max ? p.id : max, 0);
      const newProduct = {
        ...productData,
        id: maxId + 1,
        price: parseFloat(productData.price),
        originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
        inStock: productData.inStock !== false,
        rating: 4.5,
        reviews: 0,
        features: Array.isArray(productData.features) ? productData.features : []
      };
      
      const newItems = [...items, newProduct];
      saveLocalProducts(newItems);
      return newProduct;
    }
  },

  /**
   * Update an existing product
   */
  async updateProduct(productData) {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, performing mock local storage update:', err.message);
      const items = getLocalProducts();
      const productId = parseInt(productData.id);
      
      const updatedProduct = {
        ...productData,
        id: productId,
        price: parseFloat(productData.price),
        originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
        inStock: productData.inStock !== false,
        features: Array.isArray(productData.features) ? productData.features : []
      };

      const newItems = items.map(p => p.id === productId ? updatedProduct : p);
      saveLocalProducts(newItems);
      return { success: true, product: updatedProduct };
    }
  },

  /**
   * Delete a product
   */
  async deleteProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      console.warn(`Backend API offline, performing mock local storage delete for ID ${id}:`, err.message);
      const items = getLocalProducts();
      const newItems = items.filter(p => p.id !== parseInt(id));
      saveLocalProducts(newItems);
      return { success: true };
    }
  }
};
