import React, { useState } from 'react';
import { ProductsSection } from './AdminProductsSection';
import { useNavigate } from 'react-router-dom';
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
  Check,
  TrendingUp,
  Sliders,
  Sparkles,
  PhoneCall,
  Megaphone,
  ArrowLeft,
  Home,
  Users,
  BarChart3,
  Percent,
  FileText,
  Globe,
  CreditCard,
  LineChart,
  Menu,
  Bell,
  ChevronDown,
  Store,
  DollarSign,
  PackageCheck,
  Settings,
  HelpCircle,
  SearchIcon
} from 'lucide-react';
import { Product, ProductCategory, ProductSizeOption, OrderDetails } from '../types';

interface CouponItem {
  code: string;
  type: 'percent' | 'flat';
  value: number;
}

interface AdminPageProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetProducts: () => void;
  orders: OrderDetails[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
  onDeleteOrder: (orderId: string) => void;
  announcementText: string;
  onUpdateAnnouncement: (text: string) => void;
  helplineNumber: string;
  onUpdateHelpline: (phone: string) => void;
  coupons: CouponItem[];
  onAddCoupon: (coupon: CouponItem) => void;
  onDeleteCoupon: (code: string) => void;
}

type SidebarSection = 'home' | 'orders' | 'products' | 'customers' | 'growth' | 'discounts' | 'content' | 'markets' | 'finance' | 'analytics';

interface SidebarItem {
  id: SidebarSection;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export default function AdminPage({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  announcementText,
  onUpdateAnnouncement,
  helplineNumber,
  onUpdateHelpline,
  coupons,
  onAddCoupon,
  onDeleteCoupon,
}: AdminPageProps) {
  const navigate = useNavigate();

  // Login States
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('onnodhara_admin_authenticated') === 'true';
  });
  const [email, setEmail] = useState('admin@onnodhara.com');
  const [password, setPassword] = useState('dream5360');
  const [loginError, setLoginError] = useState('');

  // Sidebar active section
  const [activeSection, setActiveSection] = useState<SidebarSection>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Product Form State
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

  const [sizeOptions, setSizeOptions] = useState<ProductSizeOption[]>([]);

  const [productSearch, setProductSearch] = useState('');
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percent' | 'flat'>('percent');
  const [newCouponValue, setNewCouponValue] = useState<number>(10);
  const [announcementInput, setAnnouncementInput] = useState(announcementText);
  const [helplineInput, setHelplineInput] = useState(helplineNumber);
  const [settingsSuccess, setSettingsSuccess] = useState('');

  const sampleImages = [
    { label: 'রোল্ড ওটস', url: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=800&q=80' },
    { label: 'হার্বাল টি', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' },
    { label: 'চিয়া সিড', url: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80' },
    { label: 'খাঁটি মধু', url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80' },
    { label: 'কিউইনোয়া', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
  ];

  const sidebarItems: SidebarItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" />, badge: orders.length },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" />, badge: products.length },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" />, badge: new Set(orders.map(o => o.customerPhone)).size },
    { id: 'growth', label: 'Growth', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'discounts', label: 'Discounts', icon: <Percent className="w-4 h-4" />, badge: coupons.length },
    { id: 'content', label: 'Content', icon: <FileText className="w-4 h-4" /> },
    { id: 'markets', label: 'Markets', icon: <Globe className="w-4 h-4" /> },
    { id: 'finance', label: 'Finance', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <LineChart className="w-4 h-4" /> },
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
    navigate('/');
  };

  // Product handlers (same as before)
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
    setActiveSection('products');
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
        label: s.label,
        value: s.value,
        price: Number(s.price),
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

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAnnouncement(announcementInput);
    onUpdateHelpline(helplineInput);
    setSettingsSuccess('স্টোর সেটিংস সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setSettingsSuccess(''), 3000);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Render section content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#2C221E]">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome to Onnodhara Admin. Here's your store overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#E8DEC8] shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Total Sales</p>
                    <p className="text-2xl font-bold font-mono text-[#7A0016] mt-1">৳{totalRevenue.toLocaleString()}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">↑ 12.5% vs last month</p>
                  </div>
                  <div className="p-3 bg-[#7A0016]/10 rounded-xl">
                    <DollarSign className="w-6 h-6 text-[#7A0016]" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E8DEC8] shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Orders</p>
                    <p className="text-2xl font-bold font-mono text-[#7A0016] mt-1">{orders.length}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{orders.filter(o => o.paymentMethod === 'cod').length} pending COD</p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <ShoppingBag className="w-6 h-6 text-emerald-700" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E8DEC8] shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Products</p>
                    <p className="text-2xl font-bold font-mono text-[#7A0016] mt-1">{products.length}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{products.filter(p => p.inStock).length} in stock</p>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <PackageCheck className="w-6 h-6 text-amber-700" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E8DEC8] shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Customers</p>
                    <p className="text-2xl font-bold font-mono text-[#7A0016] mt-1">{new Set(orders.map(o => o.customerPhone)).size}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Active this month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="w-6 h-6 text-blue-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-5 rounded-xl border border-[#E8DEC8]">
              <h2 className="font-bold text-lg text-[#2C221E] mb-4">Recent Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((ord) => (
                    <div key={ord.orderId} className="flex items-center justify-between p-3 bg-[#FAF6EF] rounded-xl">
                      <div>
                        <p className="font-bold text-xs text-[#7A0016]">{ord.orderId}</p>
                        <p className="text-xs text-gray-500">{ord.customerName} • {ord.orderDate}</p>
                      </div>
                      <span className="font-bold text-sm font-mono text-[#7A0016]">৳{ord.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#2C221E]">Orders</h1>
              <p className="text-sm text-gray-500">Manage your orders ({orders.length} total)</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-[#E8DEC8]">
                <p className="text-xs text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold font-mono text-[#7A0016]">{orders.length}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E8DEC8]">
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="text-2xl font-bold font-mono text-emerald-700">৳{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#E8DEC8]">
                <p className="text-xs text-gray-500">COD Pending</p>
                <p className="text-2xl font-bold font-mono text-amber-700">{orders.filter((o) => !o.paymentMethod || o.paymentMethod === 'cod').length}</p>
              </div>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-[#E8DEC8]">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="font-bold text-gray-700">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="p-4 bg-white rounded-xl border border-[#E8DEC8]">
                    <div className="flex justify-between items-center border-b border-[#E8DEC8] pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#7A0016] text-amber-50 font-mono font-bold rounded-lg text-xs">{ord.orderId}</span>
                        <span className="text-xs text-gray-500">{ord.orderDate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#7A0016] font-mono">৳{ord.total}</span>
                        <button onClick={() => onDeleteOrder(ord.orderId)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-700">
                      <p><strong>{ord.customerName}</strong> • {ord.customerPhone}</p>
                      <p className="text-gray-500">{ord.fullAddress}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'products':
        return (
          <ProductsSection
            products={products}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onResetProducts={onResetProducts}
            editingProductId={editingProductId}
            title={title}
            setTitle={setTitle}
            titleEn={titleEn}
            setTitleEn={setTitleEn}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            originalPrice={originalPrice}
            setOriginalPrice={setOriginalPrice}
            inStock={inStock}
            setInStock={setInStock}
            isBestSeller={isBestSeller}
            setIsBestSeller={setIsBestSeller}
            image={image}
            setImage={setImage}
            sizeOptions={sizeOptions}
            setSizeOptions={setSizeOptions}
            description={description}
            setDescription={setDescription}
            quickBenefits={quickBenefits}
            setQuickBenefits={setQuickBenefits}
            badge={badge}
            setBadge={setBadge}
            badgeColor={badgeColor}
            setBadgeColor={setBadgeColor}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
            handleEditClick={handleEditClick}
            handleResetForm={handleResetForm}
            handleSaveProduct={handleSaveProduct}
            handleImageFileUpload={handleImageFileUpload}
            handleAddSizeOption={handleAddSizeOption}
            handleUpdateSizeOption={handleUpdateSizeOption}
            handleRemoveSizeOption={handleRemoveSizeOption}
          />
        );

      case 'customers':
        // Deduplicate customers from orders by phone number
        const customerMap = new Map<string, { name: string; phone: string; orderCount: number; totalProducts: number; totalSpent: number }>();
        orders.forEach(order => {
          const existing = customerMap.get(order.customerPhone);
          const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
          if (existing) {
            existing.orderCount++;
            existing.totalProducts += itemCount;
            existing.totalSpent += order.total;
          } else {
            customerMap.set(order.customerPhone, {
              name: order.customerName,
              phone: order.customerPhone,
              orderCount: 1,
              totalProducts: itemCount,
              totalSpent: order.total,
            });
          }
        });
        const customers = Array.from(customerMap.values());

        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#2C221E]">Customers</h1>
              <p className="text-sm text-gray-500">View and manage your customers ({customers.length} total)</p>
            </div>

            {customers.length === 0 ? (
              <div className="bg-white p-8 rounded-xl border border-[#E8DEC8] text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-bold text-gray-700">No customers yet</p>
                <p className="text-xs text-gray-500 mt-1">Customers appear here once they place orders.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#E8DEC8] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF6EF] text-[#7A0016] border-b border-[#E8DEC8] font-bold">
                        <th className="p-3">Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Orders</th>
                        <th className="p-3">Products</th>
                        <th className="p-3">Total Spent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DEC8]">
                      {customers.map((c) => (
                        <tr key={c.phone} className="hover:bg-[#FAF6EF]/50">
                          <td className="p-3 font-bold text-[#2C221E]">{c.name}</td>
                          <td className="p-3 font-mono">{c.phone}</td>
                          <td className="p-3">{c.orderCount}</td>
                          <td className="p-3">{c.totalProducts}</td>
                          <td className="p-3 font-mono font-bold text-emerald-700">৳{c.totalSpent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );

      case 'growth':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#2C221E]">Growth</h1>
            <p className="text-sm text-gray-500">Sales growth and marketing insights.</p>
            <div className="bg-white p-8 rounded-xl border border-[#E8DEC8] text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-bold text-gray-700">Growth Dashboard</p>
              <p className="text-xs text-gray-500 mt-1">Track your store growth metrics here.</p>
            </div>
          </div>
        );

      case 'discounts':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#2C221E]">Discounts</h1>
            <p className="text-sm text-gray-500">Manage coupons and promotional offers.</p>

            <div className="bg-white p-5 rounded-xl border border-[#E8DEC8]">
              <h3 className="font-bold text-[#2C221E] mb-3">Create Coupon</h3>
              <form onSubmit={handleCreateCoupon} className="flex flex-wrap gap-2">
                <input type="text" required placeholder="Coupon code" value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)} className="px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                <select value={newCouponType} onChange={(e) => setNewCouponType(e.target.value as any)} className="px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]">
                  <option value="percent">% Off</option>
                  <option value="flat">Flat ৳</option>
                </select>
                <input type="number" required min={1} value={newCouponValue} onChange={(e) => setNewCouponValue(Number(e.target.value))} className="w-20 px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                <button type="submit" className="px-4 py-2 bg-[#7A0016] text-white rounded-lg text-xs font-bold hover:bg-[#5A0010] cursor-pointer">Add Coupon</button>
              </form>
            </div>

            <div className="bg-white rounded-xl border border-[#E8DEC8]">
              <div className="p-4 border-b border-[#E8DEC8]">
                <h3 className="font-bold text-[#2C221E]">Active Coupons ({coupons.length})</h3>
              </div>
              <div className="p-4 space-y-2">
                {coupons.map((c) => (
                  <div key={c.code} className="flex items-center justify-between p-3 bg-[#FAF6EF] rounded-xl border border-[#E8DEC8]">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#7A0016]" />
                      <span className="font-mono font-bold text-sm text-[#7A0016]">{c.code}</span>
                      <span className="text-xs text-gray-600">({c.type === 'percent' ? `${c.value}% off` : `৳${c.value} off`})</span>
                    </div>
                    <button onClick={() => onDeleteCoupon(c.code)} className="text-red-600 hover:text-red-800 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#2C221E]">Content</h1>
            <p className="text-sm text-gray-500">Manage your store content and announcements.</p>

            <div className="bg-white p-5 rounded-xl border border-[#E8DEC8]">
              <h3 className="font-bold text-[#2C221E] mb-4">Store Settings</h3>
              {settingsSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg border border-emerald-200 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> {settingsSuccess}
                </div>
              )}
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Announcement Bar Text</label>
                  <input type="text" value={announcementInput} onChange={(e) => setAnnouncementInput(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C221E] mb-1">Helpline Number</label>
                  <input type="text" value={helplineInput} onChange={(e) => setHelplineInput(e.target.value)} className="w-full px-3 py-2 bg-[#FAF6EF] text-xs rounded-lg border border-[#D9C8B4]" />
                </div>
                <button type="submit" className="px-6 py-3 bg-[#7A0016] text-white rounded-xl text-xs font-bold hover:bg-[#5A0010] cursor-pointer">Save Settings</button>
              </form>
            </div>
          </div>
        );

      case 'markets':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#2C221E]">Markets</h1>
            <p className="text-sm text-gray-500">Manage your sales channels and markets.</p>
            <div className="bg-white p-8 rounded-xl border border-[#E8DEC8] text-center">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-bold text-gray-700">Markets</p>
              <p className="text-xs text-gray-500 mt-1">Currently selling in Bangladesh via website & social media.</p>
            </div>
          </div>
        );

      case 'finance':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#2C221E]">Finance</h1>
            <p className="text-sm text-gray-500">Track your finances and payouts.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#E8DEC8]">
                <p className="text-xs text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">৳{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#E8DEC8]">
                <p className="text-xs text-gray-500">Payment Method</p>
                <p className="text-lg font-bold text-[#2C221E] mt-1">Cash on Delivery</p>
                <p className="text-xs text-gray-500">bKash & Nagad available</p>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#2C221E]">Analytics</h1>
            <p className="text-sm text-gray-500">Detailed analytics and reports.</p>
            <div className="bg-white p-8 rounded-xl border border-[#E8DEC8] text-center">
              <LineChart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-bold text-gray-700">Analytics Dashboard</p>
              <p className="text-xs text-gray-500 mt-1">Advanced analytics coming soon. Track sales, traffic, and conversion rates.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-[#7A0016] font-bold text-sm hover:underline cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E8DEC8] text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#7A0016]/10 text-[#7A0016] flex items-center justify-center mx-auto mb-4 border border-[#7A0016]/20">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif-bn text-[#2C221E] mb-1">এডমিন লগইন</h3>
            <p className="text-xs text-gray-600 mb-6">Sign in to manage your store.</p>

            {loginError && (
              <div className="w-full p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 mb-4 flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-white text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-white text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#7A0016] text-amber-50 rounded-xl font-bold text-sm shadow-md hover:bg-[#5A0010] transition-colors cursor-pointer">Login</button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#E8DEC8]">
              <button type="button" onClick={handleQuickDemoLogin} className="w-full py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-xs hover:bg-emerald-800 flex items-center justify-center gap-2 cursor-pointer">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Quick Demo Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard with Sidebar
  return (
    <div className="min-h-screen bg-[#FAF6EF] flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#2C221E] text-amber-50 flex flex-col transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-amber-100/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7A0016] flex items-center justify-center text-amber-200">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-sm text-amber-100">Onnodhara</p>
                <p className="text-[10px] text-amber-200/60">Admin Panel</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-amber-200 hover:text-white cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'bg-[#7A0016] text-white'
                  : 'text-amber-100/70 hover:bg-amber-100/10 hover:text-amber-100'
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeSection === item.id ? 'bg-white/20' : 'bg-amber-100/10'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-amber-100/10 space-y-1">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-amber-100/70 hover:bg-amber-100/10 hover:text-amber-100 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-300 hover:bg-red-900/30 cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E8DEC8] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-[#2C221E] hover:bg-[#FAF6EF] rounded-lg cursor-pointer">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-sm text-[#7A0016] capitalize">
              {activeSection}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-[#FAF6EF] rounded-lg cursor-pointer">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-7 h-7 rounded-full bg-[#7A0016] text-amber-50 flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="hidden sm:inline font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}