import React, { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit,
  Package,
  ShoppingBag,
  Tag,
  CheckCircle,
  AlertCircle,
  Search,
  RefreshCw,
  LogOut,
  Upload,
  Eye,
  Check,
  TrendingUp,
  Sliders,
  Sparkles,
  PhoneCall,
  Megaphone
} from 'lucide-react';
import { Product, ProductCategory, ProductSizeOption, OrderDetails } from '../types';

interface CouponItem {
  code: string;
  type: 'percent' | 'flat';
  value: number; // e.g. 10 (%) or 100 (BDT)
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  orders: OrderDetails[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
  onDeleteOrder: (orderId: string) => void;
  onAddSampleOrder: () => void;
  announcementText: string;
  onUpdateAnnouncement: (text: string) => void;
  helplineNumber: string;
  onUpdateHelpline: (phone: string) => void;
  coupons: CouponItem[];
  onAddCoupon: (coupon: CouponItem) => void;
  onDeleteCoupon: (code: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onAddSampleOrder,
  announcementText,
  onUpdateAnnouncement,
  helplineNumber,
  onUpdateHelpline,
  coupons,
  onAddCoupon,
  onDeleteCoupon,
}) => {
  if (!isOpen) return null;

  // Login States
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('onnodhara_admin_authenticated') === 'true';
  });
  const [email, setEmail] = useState('admin@onnodhara.com');
  const [password, setPassword] = useState('dream5360');
  const [loginError, setLoginError] = useState('');

  // Tab State: 'products' | 'orders' | 'settings'
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');

  // Product Search State
  const [productSearch, setProductSearch] = useState('');

  // Product Form State (For uploading new product or editing existing product)
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState<ProductCategory>('oats');
  const [price, setPrice] = useState<number>(450);
  const [originalPrice, setOriginalPrice] = useState<number>(550);
  const [inStock, setInStock] = useState<boolean>(true);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [badge, setBadge] = useState('');
  const [badgeColor, setBadgeColor] = useState<'burgundy' | 'gold' | 'green'>('burgundy');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80');
  const [quickBenefits, setQuickBenefits] = useState('হাই ফাইবার, ১০০% প্রাকৃতিক, জিরো কেমিক্যাল');
  const [description, setDescription] = useState('');
  
  // Size options list state
  const [sizeOptions, setSizeOptions] = useState<ProductSizeOption[]>([]);

  // Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percent' | 'flat'>('percent');
  const [newCouponValue, setNewCouponValue] = useState<number>(10);

  // Settings Temp States
  const [announcementInput, setAnnouncementInput] = useState(announcementText);
  const [helplineInput, setHelplineInput] = useState(helplineNumber);
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Sample Presets for images
  const sampleImages = [
    { label: 'রোল্ড ওটস', url: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=800&q=80' },
    { label: 'হার্বাল টি', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' },
    { label: 'চিয়া সিড', url: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80' },
    { label: 'খাঁটি মধু', url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80' },
    { label: 'কিউইনোয়া', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
  ];

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'admin@onnodhara.com' && password === 'dream5360') {
      setIsLoggedIn(true);
      localStorage.setItem('onnodhara_admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('অবৈধ ইমেইল বা পাসওয়ার্ড! ইমেইল: admin@onnodhara.com');
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@onnodhara.com');
    setPassword('dream5360');
    setIsLoggedIn(true);
    localStorage.setItem('onnodhara_admin_authenticated', 'true');
    setLoginError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('onnodhara_admin_authenticated');
  };

  // Populate form for editing a product
  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setTitle(product.title);
    setTitleEn(product.titleEn || '');
    setCategory(product.category);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice || product.price);
    setInStock(product.inStock);
    setIsBestSeller(!!product.isBestSeller);
    setBadge(product.badge || '');
    setBadgeColor(product.badgeColor || 'burgundy');
    setImage(product.image);
    setQuickBenefits(product.quickBenefits.join(', '));
    setDescription(product.description || '');
    setSizeOptions(product.sizeOptions || []);
    // Scroll to form top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setEditingProductId(null);
    setTitle('');
    setTitleEn('');
    setCategory('oats');
    setPrice(450);
    setOriginalPrice(550);
    setInStock(true);
    setIsBestSeller(false);
    setBadge('');
    setBadgeColor('burgundy');
    setImage('https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80');
    setQuickBenefits('হাই ফাইবার, ১০০% প্রাকৃতিক, জিরো কেমিক্যাল');
    setDescription('');
    setSizeOptions([]);
  };

  // Image File Upload handler
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Size Options Handlers
  const handleAddSizeOption = () => {
    setSizeOptions([
      ...sizeOptions,
      { label: 'নতুন ভেরিয়েশন', value: `variant_${Date.now()}`, price: Number(price), originalPrice: originalPrice ? Number(originalPrice) : undefined }
    ]);
  };

  const handleUpdateSizeOption = (index: number, key: keyof ProductSizeOption, val: any) => {
    const updated = [...sizeOptions];
    updated[index] = { ...updated[index], [key]: val };
    setSizeOptions(updated);
  };

  const handleRemoveSizeOption = (index: number) => {
    setSizeOptions(sizeOptions.filter((_, i) => i !== index));
  };

  // Save product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('অনুগ্রহ করে পণ্যের নাম লিখুন');
      return;
    }

    const benefitsArray = quickBenefits
      .split(',')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const productData: Product = {
      id: editingProductId || `onnodhara-prod-${Date.now()}`,
      title: title.trim(),
      titleEn: titleEn.trim() || title.trim(),
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      sizeOptions: sizeOptions.map((s) => ({
        ...s,
        price: Number(s.price),
        originalPrice: s.originalPrice ? Number(s.originalPrice) : undefined,
      })),
      rating: 4.9,
      reviewsCount: editingProductId ? (products.find(p => p.id === editingProductId)?.reviewsCount || 10) : 1,
      badge: badge.trim() || undefined,
      badgeColor,
      image,
      quickBenefits: benefitsArray.length > 0 ? benefitsArray : ['১০০% প্রাকৃতিক'],
      description: description.trim() || `${title.trim()} - অন্নধারার ১০০% কেমিক্যালমুক্ত বিশুদ্ধ প্রাকৃতিক খাদ্যপণ্য।`,
      inStock,
      isBestSeller,
    };

    if (editingProductId) {
      onUpdateProduct(productData);
      alert('পণ্য সফলভাবে আপডেট করা হয়েছে!');
    } else {
      onAddProduct(productData);
      alert('নতুন পণ্য সফলভাবে আপলোড করা হয়েছে!');
    }

    handleResetForm();
  };

  // Coupon submit
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    onAddCoupon({
      code: newCouponCode.trim().toUpperCase(),
      type: newCouponType,
      value: Number(newCouponValue),
    });
    setNewCouponCode('');
    setNewCouponValue(10);
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement(announcementInput);
    onUpdateHelpline(helplineInput);
    setSettingsSuccess('স্টোর সেটিংস সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setSettingsSuccess(''), 3000);
  };

  // Filtered Products List
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FFFDF7] w-full max-w-5xl rounded-3xl shadow-2xl border border-[#E8DEC8] overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="bg-[#7A0016] text-amber-50 px-6 py-4 flex items-center justify-between border-b border-[#5A0010] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#7A0016] flex items-center justify-center font-bold shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg font-serif-bn text-amber-100 flex items-center gap-2">
                <span>অন্নধারা এডমিন প্যানেল</span>
                <span className="text-[10px] bg-amber-400 text-[#7A0016] font-sans px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                  {isLoggedIn ? 'Admin Active' : 'Login'}
                </span>
              </h2>
              <p className="text-xs text-amber-200/80">পণ্য আপলোড, অর্ডার ট্র্যাকিং ও স্টোর কন্ট্রোল</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>লগআউট</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isLoggedIn ? (
          /* LOGIN FORM SCREEN */
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center w-full">
            <div className="w-16 h-16 rounded-2xl bg-[#7A0016]/10 text-[#7A0016] flex items-center justify-center mb-4 border border-[#7A0016]/20">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif-bn text-[#2C221E] mb-1">
              এডমিন একাউন্টে প্রবেশ করুন
            </h3>
            <p className="text-xs text-gray-600 mb-6">
              পণ্য যুক্ত বা আপডেট করতে এবং গ্রাহকের অর্ডার পর্যবেক্ষণ করতে লগইন করুন।
            </p>

            {loginError && (
              <div className="w-full p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 mb-4 flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">ইমেইল এড্রেস</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">পাসওয়ার্ড</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#7A0016] text-amber-50 rounded-xl font-bold text-sm shadow-md hover:bg-[#5A0010] transition-colors cursor-pointer"
              >
                লগইন করুন
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#E8DEC8] w-full">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>এক ক্লিকে ডেমো এডমিন প্রবেশ (Quick Login)</span>
              </button>
            </div>
          </div>
        ) : (
          /* ADMIN DASHBOARD MAIN SCREEN */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* Dashboard Tabs Bar */}
            <div className="bg-[#FAF6EF] px-6 py-3 border-b border-[#E8DEC8] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'products'
                      ? 'bg-[#7A0016] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-[#D9C8B4] hover:bg-[#FAF6EF]'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>পণ্য আপলোড ও নিয়ন্ত্রণ ({products.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-[#7A0016] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-[#D9C8B4] hover:bg-[#FAF6EF]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>অর্ডারসমূহ ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#7A0016] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-[#D9C8B4] hover:bg-[#FAF6EF]'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>কুপন ও সেটিংস</span>
                </button>
              </div>

              {activeTab === 'products' && (
                <button
                  onClick={onResetProducts}
                  className="px-3 py-1.5 bg-amber-100 text-[#7A0016] hover:bg-amber-200 border border-amber-300 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  title="ডিফল্ট পণ্যের তালিকায় ফেরত যান"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>ডিফল্ট ক্যাটালগ রিস্টোর</span>
                </button>
              )}
            </div>

            {/* Scrollable Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 bg-[#FFFDF7]">
              
              {/* ================= TAB 1: PRODUCTS MANAGEMENT ================= */}
              {activeTab === 'products' && (
                <div className="space-y-8">
                  
                  {/* Upload/Edit Product Form Card */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DEC8] shadow-xs">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8DEC8]">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-[#7A0016]/10 text-[#7A0016] rounded-xl font-bold">
                          {editingProductId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-[#2C221E] font-serif-bn">
                            {editingProductId ? 'পণ্য সংশোধন করুন (Edit Product)' : 'নতুন পণ্য আপলোড করুন (Upload New Product)'}
                          </h3>
                          <p className="text-xs text-gray-500">
                            প্রয়োজনীয় তথ্য ও ছবি দিয়ে স্টোরে নতুন অর্গানিক প্রোডাক্ট যোগ করুন
                          </p>
                        </div>
                      </div>

                      {editingProductId && (
                        <button
                          onClick={handleResetForm}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200"
                        >
                          বাতিল করুন (Cancel)
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSaveProduct} className="space-y-4">
                      
                      {/* Grid 1: Bengali Title & English Title */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#2C221E] mb-1">
                            বাংলা শিরোনাম <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="যেমন: অন্নধারা ১০০% অর্গানিক বি ক্যাশ কাঁচা মধু"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#2C221E] mb-1">
                            ইংরেজি শিরোনাম (English Title)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Onnodhara 100% Organic Raw Wild Honey"
                            value={titleEn}
                            onChange={(e) => setTitleEn(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                          />
                        </div>
                      </div>

                      {/* Grid 2: Category, Price, Original Price, Stock, BestSeller */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#2C221E] mb-1">ক্যাটাগরি</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as ProductCategory)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                          >
                            <option value="oats">🌾 রোল্ড ওটস (Rolled Oats)</option>
                            <option value="tea">🍵 ভেষজ চা (Herbal Tea)</option>
                            <option value="superfood">🌱 সুপারফুড (Chia/Quinoa)</option>
                            <option value="honey">🍯 খাঁটি মধু (Wild Honey)</option>
                            <option value="combo">🎁 হেলথ কম্বো (Combo Pack)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#2C221E] mb-1">মূল্য (BDT ৳)</label>
                          <input
                            type="number"
                            required
                            min={10}
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs font-mono rounded-xl border border-[#D9C8B4]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#2C221E] mb-1">পূর্বের মূল দাম (Regular BDT)</label>
                          <input
                            type="number"
                            min={0}
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs font-mono rounded-xl border border-[#D9C8B4]"
                          />
                        </div>

                        <div className="flex items-center gap-4 pt-5">
                          <label className="flex items-center gap-2 text-xs font-bold text-[#2C221E] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={inStock}
                              onChange={(e) => setInStock(e.target.checked)}
                              className="w-4 h-4 text-[#7A0016] rounded"
                            />
                            <span>ইন স্টক আছে</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs font-bold text-[#7A0016] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isBestSeller}
                              onChange={(e) => setIsBestSeller(e.target.checked)}
                              className="w-4 h-4 text-[#7A0016] rounded"
                            />
                            <span>বেস্ট সেলার</span>
                          </label>
                        </div>
                      </div>

                      {/* Image Source with URL / Upload / Sample Presets */}
                      <div className="p-4 bg-[#FAF6EF] rounded-2xl border border-[#E8DEC8] space-y-3">
                        <label className="block text-xs font-bold text-[#7A0016]">
                          পণ্যের ছবি (Product Image)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                          <div className="sm:col-span-2 space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="https://example.com/product-image.jpg"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="flex-1 px-3.5 py-2 bg-white text-xs rounded-xl border border-[#D9C8B4]"
                              />
                            </div>

                            {/* Local File Upload Button */}
                            <div className="flex items-center gap-2">
                              <label className="px-3 py-1.5 bg-[#7A0016] text-amber-50 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#5A0010] cursor-pointer">
                                <Upload className="w-3.5 h-3.5" />
                                <span>কম্পিউটার/মোবাইল থেকে ছবি আপলোড</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageFileUpload}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[11px] text-gray-500">বা নিচের রেডিমেড ডেমো ছবি সিলেক্ট করুন:</span>
                            </div>

                            {/* Sample presets */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {sampleImages.map((samp, idx) => (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => setImage(samp.url)}
                                  className="px-2 py-1 bg-white hover:bg-amber-100 text-gray-700 text-[10px] rounded-lg border border-[#D9C8B4] font-medium"
                                >
                                  {samp.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Image Preview */}
                          <div className="flex items-center justify-center p-2 bg-white rounded-xl border border-[#D9C8B4]">
                            <img
                              src={image}
                              alt="Preview"
                              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Size Options Builder */}
                      <div className="p-4 bg-[#FAF6EF] rounded-2xl border border-[#E8DEC8] space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#7A0016]">
                            সাইজ ও প্রাইসিং অপশনসমূহ (Size Variants)
                          </label>
                          <button
                            type="button"
                            onClick={handleAddSizeOption}
                            className="px-2.5 py-1 bg-[#7A0016] text-white rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>আরেকটি সাইজ যোগ করুন</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {sizeOptions.length === 0 && (
                            <p className="text-xs text-gray-500 bg-white p-3 rounded-lg border border-dashed border-[#D9C8B4]">
                              কোনো সাইজ/ভেরিয়েশন যোগ করা হয়নি। আপনি চাইলে উপরের বাটনের মাধ্যমে ভেরিয়েশন (যেমন: ৫০০ গ্রাম, ১ কেজি বোতল ইত্যাদি) যোগ করতে পারবেন।
                            </p>
                          )}
                          {sizeOptions.map((opt, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-[#D9C8B4]">
                              <input
                                type="text"
                                placeholder="লেবেল (যেমন: ৫০০ গ্রাম প্যাক বা ১ কেজি বোতল)"
                                value={opt.label}
                                onChange={(e) => handleUpdateSizeOption(idx, 'label', e.target.value)}
                                className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-gray-300"
                              />
                              <input
                                type="text"
                                placeholder="কোড (500g)"
                                value={opt.value}
                                onChange={(e) => handleUpdateSizeOption(idx, 'value', e.target.value)}
                                className="w-24 px-2.5 py-1 text-xs font-mono rounded-lg border border-gray-300"
                              />
                              <input
                                type="number"
                                placeholder="দাম ৳"
                                value={opt.price}
                                onChange={(e) => handleUpdateSizeOption(idx, 'price', e.target.value)}
                                className="w-24 px-2.5 py-1 text-xs font-mono rounded-lg border border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveSizeOption(idx)}
                                className="text-red-500 p-1 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Badges & Benefits */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#2C221E] mb-1">
                            ব্যাজ টেক্সট (যেমন: 100% WHOLE GRAIN / HOT)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="100% ORGANIC"
                              value={badge}
                              onChange={(e) => setBadge(e.target.value)}
                              className="flex-1 px-3.5 py-2.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4]"
                            />
                            <select
                              value={badgeColor}
                              onChange={(e) => setBadgeColor(e.target.value as any)}
                              className="px-2 py-2.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4]"
                            >
                              <option value="burgundy">Burgundy</option>
                              <option value="gold">Gold</option>
                              <option value="green">Green</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#2C221E] mb-1">
                            কুইক বেনিফিটস (কমা দিয়ে আলাদা করুন)
                          </label>
                          <input
                            type="text"
                            placeholder="হাই ফাইবার, হৃদযন্ত্র সুস্থ রাখে, জিরো কেমিক্যাল"
                            value={quickBenefits}
                            onChange={(e) => setQuickBenefits(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4]"
                          />
                        </div>
                      </div>

                      {/* Full Description */}
                      <div>
                        <label className="block text-xs font-bold text-[#2C221E] mb-1">
                          পণ্যের বিস্তারিত বিবরণ (Bengali Description)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="পণ্যের উপাদান, ব্যবহারের নিয়ম ও কার্যকারিতা..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full px-3.5 py-2 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4]"
                        />
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#7A0016] text-amber-50 rounded-xl font-extrabold text-sm shadow-md hover:bg-[#5A0010] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4 text-amber-300" />
                        <span>{editingProductId ? 'পণ্য তথ্য আপডেট করুন' : 'নতুন পণ্য স্টোরে আপলোড করুন'}</span>
                      </button>

                    </form>
                  </div>

                  {/* Existing Products Table */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-[#E8DEC8] gap-3">
                      <div>
                        <h3 className="font-extrabold text-base text-[#2C221E] font-serif-bn">
                          বিদ্যমান পণ্য তালিকা ({products.length})
                        </h3>
                        <p className="text-xs text-gray-500">আপনার স্টোরে বর্তমানে থাকা সকল পণ্য</p>
                      </div>

                      {/* Product Search input */}
                      <div className="relative w-full sm:w-64">
                        <input
                          type="text"
                          placeholder="পণ্য খুঁজুন..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4]"
                        />
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-[#FAF6EF] text-[#7A0016] border-b border-[#E8DEC8] font-bold">
                            <th className="p-3">ছবি</th>
                            <th className="p-3">পণ্যের নাম</th>
                            <th className="p-3">ক্যাটাগরি</th>
                            <th className="p-3">মূল্য</th>
                            <th className="p-3">স্টক স্ট্যাটাস</th>
                            <th className="p-3 text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DEC8]">
                          {filteredProducts.map((prod) => (
                            <tr key={prod.id} className="hover:bg-[#FAF6EF]/50 transition-colors">
                              <td className="p-3">
                                <img
                                  src={prod.image}
                                  alt={prod.title}
                                  className="w-12 h-12 object-cover rounded-lg border border-[#D9C8B4]"
                                  referrerPolicy="no-referrer"
                                />
                              </td>
                              <td className="p-3">
                                <p className="font-bold text-[#2C221E] line-clamp-1">{prod.title}</p>
                                <p className="text-[10px] text-gray-500 font-mono">{prod.id}</p>
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded bg-amber-100 text-[#7A0016] font-bold uppercase text-[10px]">
                                  {prod.category}
                                </span>
                              </td>
                              <td className="p-3 font-mono font-bold text-[#7A0016]">
                                ৳ {prod.price}
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() =>
                                    onUpdateProduct({ ...prod, inStock: !prod.inStock })
                                  }
                                  className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                                    prod.inStock
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {prod.inStock ? 'In Stock' : 'Out of Stock'}
                                </button>
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => handleEditClick(prod)}
                                    className="p-1.5 rounded-lg bg-amber-100 text-[#7A0016] hover:bg-amber-200 transition-colors"
                                    title="এডিট করুন"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`আপনি কি "${prod.title}" মুছতে চান?`)) {
                                        onDeleteProduct(prod.id);
                                      }
                                    }}
                                    className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                    title="মুছে ফেলুন"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              )}

              {/* ================= TAB 2: ORDERS MANAGEMENT ================= */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  
                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] flex items-center gap-3">
                      <div className="p-3 bg-[#7A0016]/10 text-[#7A0016] rounded-xl font-bold">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">সর্বমোট অর্ডার</p>
                        <p className="text-2xl font-bold font-mono text-[#7A0016]">{orders.length}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] flex items-center gap-3">
                      <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl font-bold">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">মোট বিক্রয় রেভিনিউ</p>
                        <p className="text-2xl font-bold font-mono text-emerald-800">
                          ৳ {orders.reduce((sum, o) => sum + o.total, 0)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] flex items-center gap-3">
                      <div className="p-3 bg-amber-100 text-amber-800 rounded-xl font-bold">
                        <Tag className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">ক্যাশ অন ডেলিভারি পেন্ডিং</p>
                        <p className="text-2xl font-bold font-mono text-amber-800">
                          {orders.filter((o) => !o.paymentMethod || o.paymentMethod === 'cod').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-[#E8DEC8]">
                    <h3 className="font-extrabold text-base text-[#2C221E] font-serif-bn">
                      গ্রাহকের সাম্প্রতিক অর্ডার তালিকা
                    </h3>
                    <button
                      onClick={onAddSampleOrder}
                      className="px-3.5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>টেস্ট স্যাম্পল অর্ডার যোগ করুন</span>
                    </button>
                  </div>

                  {/* Orders List */}
                  {orders.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-2xl border border-[#E8DEC8]">
                      <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="font-bold text-gray-700 text-sm">এখনো কোনো অর্ডার গ্রহণ করা হয়নি</p>
                      <p className="text-xs text-gray-500 mt-1">
                        গ্রাহক ওয়েবসাইট থেকে অর্ডার করলেই তা এখানে রিয়েলটাইমে প্রদর্শিত হবে।
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div
                          key={ord.orderId}
                          className="p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-2xs space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between border-b border-[#E8DEC8] pb-3 gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-[#7A0016] text-amber-50 font-mono font-bold rounded-lg text-xs">
                                {ord.orderId}
                              </span>
                              <span className="text-xs text-gray-500">{ord.orderDate}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm font-extrabold text-[#7A0016] font-mono">
                                সর্বমোট ৳ {ord.total}
                              </span>
                              <button
                                onClick={() => onDeleteOrder(ord.orderId)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="অর্ডার ডিলিট করুন"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            {/* Customer details */}
                            <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#E8DEC8] space-y-1">
                              <p className="font-bold text-[#7A0016]">গ্রাহকের নাম: {ord.customerName}</p>
                              <p className="font-mono">
                                ফোন: <a href={`tel:${ord.customerPhone}`} className="underline font-bold text-blue-700">{ord.customerPhone}</a>
                              </p>
                              <p>
                                এলাকা: <span className="font-bold">{ord.deliveryArea === 'inside_dhaka' ? 'ঢাকার ভেতরে (৳৭০)' : 'ঢাকার বাইরে (৳১২০)'}</span>
                              </p>
                              <p className="text-gray-700">ঠিকানা: {ord.fullAddress}</p>
                              {ord.notes && <p className="text-amber-800 italic">নোট: {ord.notes}</p>}
                            </div>

                            {/* Ordered items */}
                            <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#E8DEC8] space-y-1.5">
                              <p className="font-bold text-[#2C221E] border-b border-[#E8DEC8] pb-1">
                                অর্ডারকৃত আইটেমস ({ord.items.length}):
                              </p>
                              {ord.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-gray-700">
                                  <span>
                                    {item.product.title} ({item.selectedSize.label}) x {item.quantity}
                                  </span>
                                  <span className="font-mono font-bold">
                                    ৳ {item.selectedSize.price * item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* ================= TAB 3: COUPONS & STORE SETTINGS ================= */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  
                  {/* Promo Coupons Card */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8]">
                    <h3 className="font-extrabold text-base text-[#2C221E] font-serif-bn mb-1">
                      ডিসকাউন্ট কুপন কোডসমূহ (Promo Coupons)
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      গ্রাহকদের জন্য নতুন ছাড় কুপন তৈরি করুন
                    </p>

                    <form onSubmit={handleCreateCoupon} className="flex flex-wrap gap-2 mb-6">
                      <input
                        type="text"
                        required
                        placeholder="কুপন কোড (যেমন: SAVE20)"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value)}
                        className="px-3.5 py-2 bg-[#FAF6EF] text-xs font-mono font-bold uppercase rounded-xl border border-[#D9C8B4]"
                      />
                      <select
                        value={newCouponType}
                        onChange={(e) => setNewCouponType(e.target.value as any)}
                        className="px-3 py-2 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4]"
                      >
                        <option value="percent">শতাংশ ছাড় (%)</option>
                        <option value="flat">ফ্ল্যাট ছাড় (৳)</option>
                      </select>
                      <input
                        type="number"
                        required
                        min={1}
                        placeholder="মূল্য"
                        value={newCouponValue}
                        onChange={(e) => setNewCouponValue(Number(e.target.value))}
                        className="w-24 px-3 py-2 bg-[#FAF6EF] text-xs font-mono rounded-xl border border-[#D9C8B4]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#7A0016] text-amber-50 rounded-xl text-xs font-bold hover:bg-[#5A0010]"
                      >
                        কুপন যোগ করুন
                      </button>
                    </form>

                    <div className="space-y-2">
                      {coupons.map((c) => (
                        <div
                          key={c.code}
                          className="flex items-center justify-between p-3 bg-[#FAF6EF] rounded-xl border border-[#E8DEC8]"
                        >
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-[#7A0016]" />
                            <span className="font-mono font-bold text-sm text-[#7A0016]">{c.code}</span>
                            <span className="text-xs text-gray-600 font-semibold">
                              ({c.type === 'percent' ? `${c.value}% ছাড়` : `৳${c.value} ছাড়`})
                            </span>
                          </div>
                          <button
                            onClick={() => onDeleteCoupon(c.code)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* General Store Announcement & Helpline Settings */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8DEC8]">
                    <h3 className="font-extrabold text-base text-[#2C221E] font-serif-bn mb-1">
                      ওয়েবসাইট অ্যানাউন্সমেন্ট ও হেল্পলাইন
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      টপ ব্যানার মেসেজ এবং কাস্টমার কেয়ার ফোন নম্বর পরিবর্তন করুন
                    </p>

                    {settingsSuccess && (
                      <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{settingsSuccess}</span>
                      </div>
                    )}

                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#2C221E] mb-1 flex items-center gap-1">
                          <Megaphone className="w-3.5 h-3.5 text-[#7A0016]" />
                          <span>টপ অ্যানাউন্সমেন্ট বার টেক্সট</span>
                        </label>
                        <input
                          type="text"
                          value={announcementInput}
                          onChange={(e) => setAnnouncementInput(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs rounded-xl border border-[#D9C8B4]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#2C221E] mb-1 flex items-center gap-1">
                          <PhoneCall className="w-3.5 h-3.5 text-[#7A0016]" />
                          <span>অর্ডার ও সাহায্য ফোন নম্বর</span>
                        </label>
                        <input
                          type="text"
                          value={helplineInput}
                          onChange={(e) => setHelplineInput(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#FAF6EF] text-xs font-mono rounded-xl border border-[#D9C8B4]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-3 px-6 bg-[#7A0016] text-amber-50 rounded-xl text-xs font-bold hover:bg-[#5A0010]"
                      >
                        সেটিংস সংরক্ষণ করুন
                      </button>
                    </form>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
