import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Phone, Heart, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import logoImg from '../assets/images/onnodhara_logo.png';

interface HeaderProps {
  products: Product[];
  cartCount: number;
  onOpenCart: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onScrollToSection: (sectionId: string) => void;
  helplineNumber?: string;
}

export const Header: React.FC<HeaderProps> = ({
  products,
  cartCount,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onScrollToSection,
  helplineNumber = '০১৭০০-০০০০০০',
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter products for search dropdown
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.quickBenefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleNavClick = (cat: ProductCategory, sectionId?: string) => {
    onSelectCategory(cat);
    if (sectionId) {
      onScrollToSection(sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#E8DEC8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Hamburger (mobile only) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#2C221E] hover:bg-[#FAF6EF] transition-colors focus:outline-hidden"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo - centered on mobile, left on desktop */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <button 
              onClick={() => handleNavClick('all', 'hero')}
              className="flex items-center group focus:outline-hidden"
            >
              <img src={logoImg} alt="Onnodhara" className="h-10 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform" />
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="প্রোডাক্ট খুঁজুন (যেমন: রোল্ড ওটস, চা, চিয়া সিড...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6EF] text-[#2C221E] text-sm rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016] focus:ring-2 focus:ring-[#7A0016]/15 transition-all"
              />
              <Search className="w-4 h-4 text-[#7A0016]/60 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Preview Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E8DEC8] z-50 overflow-hidden max-h-96 overflow-y-auto">
                <div className="p-3 bg-[#FAF6EF] border-b border-[#E8DEC8] text-xs font-semibold text-[#7A0016] flex justify-between">
                  <span>অনুসন্ধান ফলাফল ({searchResults.length})</span>
                  <span>Onnodhara Organic</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectProduct(item);
                          setSearchQuery('');
                        }}
                        className="w-full p-3 flex items-center gap-3 hover:bg-[#FAF6EF] text-left transition-colors group"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg border border-[#E8DEC8]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#2C221E] truncate group-hover:text-[#7A0016]">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#7A0016]">৳ {item.price}</span>
                            {item.originalPrice && (
                              <span className="text-[11px] text-gray-400 line-through">
                                ৳ {item.originalPrice}
                              </span>
                            )}
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                              ইন স্টক
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#7A0016]" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-500">
                    কোনো প্রোডাক্ট পাওয়া যায়নি। অন্য শব্দ দিয়ে সার্চ করুন।
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Desktop: Hotline */}
            <a
              href={`tel:${helplineNumber}`}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-[#7A0016] bg-[#7A0016]/10 hover:bg-[#7A0016]/15 border border-[#7A0016]/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>কল করে অর্ডার: {helplineNumber}</span>
            </a>

            {/* Desktop: Admin */}
            <button
              onClick={() => navigate('/admin')}
              className="hidden sm:inline-flex px-3 py-2.5 rounded-2xl bg-amber-100 text-[#7A0016] hover:bg-amber-200 border border-amber-300 font-bold text-xs items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              title="এডমিন প্যানেলে লগইন করুন"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>এডমিন</span>
            </button>

            {/* Mobile: Search icon */}
            <button
              onClick={() => {}}
              className="md:hidden p-2 rounded-lg text-[#2C221E] hover:bg-[#FAF6EF] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-2xl bg-[#7A0016] text-amber-50 hover:bg-[#5A0010] shadow-md hover:shadow-lg transition-all group focus:outline-hidden cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-[#7A0016] font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center justify-between py-2 border-t border-[#E8DEC8]/60 text-sm font-medium">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleNavClick('all', 'bestsellers')}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#7A0016] text-white font-semibold shadow-xs'
                  : 'text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]'
              }`}
            >
              সব পণ্য (All Products)
            </button>
            <button
              onClick={() => handleNavClick('oats', 'bestsellers')}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedCategory === 'oats'
                  ? 'bg-[#7A0016] text-white font-semibold shadow-xs'
                  : 'text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]'
              }`}
            >
              🌾 রোল্ড ওটস
            </button>
            <button
              onClick={() => handleNavClick('tea', 'bestsellers')}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedCategory === 'tea'
                  ? 'bg-[#7A0016] text-white font-semibold shadow-xs'
                  : 'text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]'
              }`}
            >
              🍵 ভেষজ চা
            </button>
            <button
              onClick={() => handleNavClick('superfood', 'bestsellers')}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedCategory === 'superfood'
                  ? 'bg-[#7A0016] text-white font-semibold shadow-xs'
                  : 'text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]'
              }`}
            >
              🌱 সুপারফুড গ্রেইনস
            </button>
            <button
              onClick={() => handleNavClick('combo', 'bestsellers')}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedCategory === 'combo'
                  ? 'bg-[#7A0016] text-white font-semibold shadow-xs'
                  : 'text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]'
              }`}
            >
              🎁 হেলথ কম্বো
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#3E6B48]">
            <button onClick={() => onScrollToSection('brand-story')} className="hover:underline">
              আমাদের গল্প (Our Story)
            </button>
            <span className="text-[#D9C8B4]">•</span>
            <button onClick={() => onScrollToSection('reviews')} className="hover:underline">
              গ্রাহকের মতামত (Reviews)
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-[#FFFDF7] h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC8]">
              <img src={logoImg} alt="Onnodhara" className="h-10 w-auto object-contain" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="my-4 relative">
              <input
                type="text"
                placeholder="প্রোডাক্ট খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF6EF] text-sm rounded-xl border border-[#D9C8B4]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-1 my-2">
              <button
                onClick={() => handleNavClick('all', 'bestsellers')}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]"
              >
                সব পণ্য (All Products)
              </button>
              <button
                onClick={() => handleNavClick('oats', 'bestsellers')}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]"
              >
                🌾 রোল্ড ওটস সিরিজ
              </button>
              <button
                onClick={() => handleNavClick('tea', 'bestsellers')}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]"
              >
                🍵 অর্গানিক হার্বাল টি
              </button>
              <button
                onClick={() => handleNavClick('superfood', 'bestsellers')}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]"
              >
                🌱 চিয়া সিড ও সুপারফুড
              </button>
              <button
                onClick={() => handleNavClick('combo', 'bestsellers')}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-[#2C221E] hover:bg-[#FAF6EF] hover:text-[#7A0016]"
              >
                🎁 সাশ্রয়ী হেলথ কম্বো
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-[#E8DEC8]">
              <a
                href="tel:+8801700000000"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-[#7A0016] text-white shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>সরাসরি কল করে অর্ডার</span>
              </a>
              <div className="mt-3 text-center text-xs text-[#3E6B48] flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
