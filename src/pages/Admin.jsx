import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit3, Trash2, Search, Package, ListFilter, IndianRupee, Loader2, X, Check, Eye } from 'lucide-react';
import { api } from '../utils/api';
import { CATEGORIES } from '../data/products';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [verifyingLogin, setVerifyingLogin] = useState(false);
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Password Change Form State
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  
  // Current active product for Edit / Delete
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Form State
  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'School & Stationery',
    categoryId: 'school-stationery',
    description: '',
    image: '',
    badge: '',
    inStock: true,
    features: ''
  });

  // Load products
  const loadProducts = async () => {
    setLoading(true);
    const data = await api.getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (api.isAuthenticated()) {
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setVerifyingLogin(true);
    setLoginError('');
    const result = await api.login(password);
    if (result.success) {
      setIsAuthenticated(true);
      loadProducts();
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
    setVerifyingLogin(false);
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setPassword('');
  };

  // Update categoryId automatically when category name changes
  const handleCategoryChange = (e) => {
    const catName = e.target.value;
    const catObject = CATEGORIES.find(c => c.name === catName);
    setForm(prev => ({
      ...prev,
      category: catName,
      categoryId: catObject ? catObject.id : 'daily-essentials'
    }));
  };

  // Open modals
  const openAdd = () => {
    setForm({
      name: '',
      price: '',
      originalPrice: '',
      category: 'School & Stationery',
      categoryId: 'school-stationery',
      description: '',
      image: '',
      badge: '',
      inStock: true,
      features: ''
    });
    setIsAddOpen(true);
  };

  const openEdit = (product) => {
    setCurrentProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
      category: product.category,
      categoryId: product.categoryId,
      description: product.description || '',
      image: product.image || '',
      badge: product.badge || '',
      inStock: product.inStock !== false,
      features: Array.isArray(product.features) ? product.features.join(', ') : ''
    });
    setIsEditOpen(true);
  };

  const openDelete = (product) => {
    setCurrentProduct(product);
    setIsDeleteOpen(true);
  };

  // CRUD Handlers
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const featuresArray = form.features ? form.features.split(',').map(f => f.trim()).filter(Boolean) : [];
    
    const newProduct = {
      name: form.name,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      category: form.category,
      categoryId: form.categoryId,
      description: form.description,
      image: form.image || 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&h=500&fit=crop',
      badge: form.badge || null,
      inStock: form.inStock,
      features: featuresArray
    };

    await api.addProduct(newProduct);
    await loadProducts();
    setSubmitting(false);
    setIsAddOpen(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const featuresArray = form.features ? form.features.split(',').map(f => f.trim()).filter(Boolean) : [];
    
    const updatedProduct = {
      id: currentProduct.id,
      name: form.name,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      category: form.category,
      categoryId: form.categoryId,
      description: form.description,
      image: form.image,
      badge: form.badge || null,
      inStock: form.inStock,
      features: featuresArray
    };

    await api.updateProduct(updatedProduct);
    await loadProducts();
    setSubmitting(false);
    setIsEditOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setSubmitting(true);
    await api.deleteProduct(currentProduct.id);
    await loadProducts();
    setSubmitting(false);
    setIsDeleteOpen(false);
  };

  const openChangePassword = () => {
    setNewAdminPassword('');
    setConfirmAdminPassword('');
    setPasswordChangeError('');
    setPasswordChangeSuccess('');
    setIsChangePasswordOpen(true);
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    if (newAdminPassword.length < 4) {
      setPasswordChangeError('Password must be at least 4 characters long.');
      return;
    }

    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const result = await api.changePassword(newAdminPassword);
    setSubmitting(false);

    if (result.success) {
      setPasswordChangeSuccess('Password updated successfully!');
      setTimeout(() => {
        setIsChangePasswordOpen(false);
      }, 2000);
    } else {
      setPasswordChangeError(result.error || 'Failed to update password.');
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: products.length,
      outOfStock: products.filter(p => !p.inStock).length,
      popular: products.filter(p => p.badge === 'Popular' || p.badge === 'Best Seller').length,
      categories: new Set(products.map(p => p.category)).size
    };
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (!isAuthenticated) {
    return (
      <div className="section-padding container-main min-h-[70vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8 max-w-md w-full animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-primary-500 mx-auto mb-4">
              <Package size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
            <p className="text-muted mt-1 text-sm">Enter password to manage Archu Mart listings.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="admin-pass" className="text-xs font-semibold text-gray-600">Password</label>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-500 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={verifyingLogin}
              className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              {verifyingLogin && <Loader2 className="animate-spin" size={16} />}
              <span>Verify & Login</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="section-padding container-main min-h-screen">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-muted mt-1">Manage products, modify prices, and update store listings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={openAdd}
            className="btn-primary py-3 px-5 flex items-center justify-center gap-2 rounded-2xl shadow-soft animate-bounce-gentle"
          >
            <Plus size={20} />
            <span>Add New Product</span>
          </button>
          <button 
            onClick={openChangePassword}
            className="btn-secondary py-3 px-4 flex items-center justify-center gap-2 rounded-2xl text-gray-600 hover:text-primary hover:border-primary/20 transition-all font-semibold"
            title="Change Admin Password"
          >
            Change Password
          </button>
          <button 
            onClick={handleLogout}
            className="btn-secondary py-3 px-4 flex items-center justify-center gap-2 rounded-2xl text-gray-600 hover:text-red-500 hover:border-red-200 transition-colors"
            title="Logout Admin"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-primary-500">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
            <ListFilter size={24} />
          </div>
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Categories</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.categories}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <X size={24} />
          </div>
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Out of Stock</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.outOfStock}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-secondary-500">
            <Check size={24} />
          </div>
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Popular Items</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.popular}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor="cat-filter" className="text-sm font-semibold text-gray-700 whitespace-nowrap">Filter Category:</label>
          <select
            id="cat-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-48 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="animate-spin text-primary mb-3" size={40} />
            <p className="text-sm font-medium">Fetching database records...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <Package className="mx-auto mb-3 opacity-30" size={48} />
            <p className="text-lg font-semibold text-gray-800">No products found</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Badge</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 line-clamp-1">{p.name}</h4>
                          <span className="text-xs text-gray-500">ID: {p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted">{p.category}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      <div className="flex flex-col">
                        <span>{formatPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{formatPrice(p.originalPrice)}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {p.badge ? (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.badge.toLowerCase() === 'popular' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                          p.badge.toLowerCase() === 'new' ? 'bg-green-50 text-green-600 border border-green-100' :
                          'bg-orange-50 text-orange-600 border border-orange-100'
                        }`}>
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold ${
                        p.inStock 
                          ? 'bg-green-50 text-green-700 border border-green-100' 
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-green-600' : 'bg-red-600'}`}></span>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Link 
                          to={`/product/${p.id}`}
                          target="_blank"
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                          title="View on Storefront"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 transition-colors"
                          title="Edit Details"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => openDelete(p)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add & Edit Modal */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {isAddOpen ? 'Add New Product' : 'Edit Product Details'}
              </h3>
              <button 
                onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={isAddOpen ? handleAddSubmit : handleEditSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Premium Geometry Box"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Category *</label>
                  <select
                    value={form.category}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Price (INR) *</label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="199"
                    />
                    <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Original Price (optional)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={form.originalPrice}
                      onChange={(e) => setForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                      className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="299"
                    />
                    <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Image URL</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Badge Label (optional)</label>
                  <select
                    value={form.badge}
                    onChange={(e) => setForm(prev => ({ ...prev, badge: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="">No Badge</option>
                    <option value="Popular">Popular</option>
                    <option value="New">New</option>
                    <option value="Best Seller">Best Seller</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="in-stock"
                    checked={form.inStock}
                    onChange={(e) => setForm(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="in-stock" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Product In Stock
                  </label>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Key Features (comma-separated)</label>
                  <input
                    type="text"
                    value={form.features}
                    onChange={(e) => setForm(prev => ({ ...prev, features: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Water Resistant, Heavy Duty, BPA Free"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Product Description</label>
                  <textarea
                    rows="3"
                    value={form.description}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter detailed description of the product here..."
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2"
                >
                  {submitting && <Loader2 className="animate-spin" size={16} />}
                  <span>{isAddOpen ? 'Add Product' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product Listing?</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Are you sure you want to delete **"{currentProduct.name}"**? This action will permanently remove the product from the catalog.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                {submitting && <Loader2 className="animate-spin" size={16} />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Change Admin Password</h2>
              <button 
                onClick={() => setIsChangePasswordOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">New Password</label>
                <input
                  type="password"
                  required
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm font-semibold"
                />
              </div>

              {passwordChangeError && (
                <p className="text-xs text-red-500 font-semibold">{passwordChangeError}</p>
              )}

              {passwordChangeSuccess && (
                <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <Check size={14} /> {passwordChangeSuccess}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary py-2.5 px-6 rounded-xl flex items-center gap-2 font-bold text-sm"
                >
                  {submitting && <Loader2 className="animate-spin" size={16} />}
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
