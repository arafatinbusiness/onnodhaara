import React, { useState } from 'react';
import { Product, ProductCategory, ProductSizeOption } from '../types';
import { PRODUCTS } from '../data/products';
import { Star, ShoppingBag, Eye, Check, Sparkles, Zap } from 'lucide-react';

interface BestSellersGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToCart: (product: Product, selectedSize: ProductSizeOption) => void;
  onDirectOrder: (product: Product, selectedSize: ProductSizeOption) => void;
  onQuickView: (product: Product) => void;
}

export const BestSellersGrid: React.FC<BestSellersGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onDirectOrder,
  onQuickView,
}) => {
  // Store size selection per product
  const [selectedSizes, setSelectedSizes] = useState<Record<string, ProductSizeOption>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const getProductSize = (product: Product): ProductSizeOption => {
    if (selectedSizes[product.id]) return selectedSizes[product.id];
    if (product.sizeOptions && product.sizeOptions.length > 0) return product.sizeOptions[0];
    return { label: '১ টি', value: '1pc', price: product.price, originalPrice: product.originalPrice };
  };

  const handleSizeChange = (productId: string, sizeOption: ProductSizeOption) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeOption }));
  };

  const handleAddToCart = (product: Product) => {
    const size = getProductSize(product);
    onAddToCart(product, size);
    
    // Show visual checkmark animation
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section id="bestsellers" className="py-12 sm:py-16 bg-[#FFFDF7] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0016] uppercase tracking-wider bg-[#7A0016]/10 px-3 py-1 rounded-full mb-2 border border-[#7A0016]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              ১০০% খাঁটি পণ্যসম্ভার
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C221E] font-serif-bn">
              জনপ্রিয় অর্গানিক হেলথ প্রোডাক্টস
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              কেমিক্যালমুক্ত, সর্বোচ্চ ফ্রেশ ব্যাচে প্রস্তুতকৃত প্রাকৃতিক সুপারফুড
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#7A0016] text-amber-50 shadow-md'
                  : 'bg-[#FAF6EF] text-[#2C221E] hover:bg-[#E8DEC8]'
              }`}
            >
              সব পণ্য ({products.length})
            </button>
            <button
              onClick={() => onSelectCategory('oats')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'oats'
                  ? 'bg-[#7A0016] text-amber-50 shadow-md'
                  : 'bg-[#FAF6EF] text-[#2C221E] hover:bg-[#E8DEC8]'
              }`}
            >
              🌾 রোল্ড ওটস
            </button>
            <button
              onClick={() => onSelectCategory('tea')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'tea'
                  ? 'bg-[#7A0016] text-amber-50 shadow-md'
                  : 'bg-[#FAF6EF] text-[#2C221E] hover:bg-[#E8DEC8]'
              }`}
            >
              🍵 ভেষজ চা
            </button>
            <button
              onClick={() => onSelectCategory('superfood')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'superfood'
                  ? 'bg-[#7A0016] text-amber-50 shadow-md'
                  : 'bg-[#FAF6EF] text-[#2C221E] hover:bg-[#E8DEC8]'
              }`}
            >
              🌱 চিয়া সিড
            </button>
            <button
              onClick={() => onSelectCategory('combo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'combo'
                  ? 'bg-[#7A0016] text-amber-50 shadow-md'
                  : 'bg-[#FAF6EF] text-[#2C221E] hover:bg-[#E8DEC8]'
              }`}
            >
              🎁 কম্বো প্যাক
            </button>
          </div>
        </div>

        {/* 4-Card Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentSize = getProductSize(product);
            const isAdded = addedItemIds[product.id];

            return (
              <div
                key={product.id}
                className="group relative bg-[#FFFDF7] rounded-2xl border border-[#E8DEC8] hover:border-[#C59B27] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-[#FAF6EF] overflow-hidden p-4">
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-100 font-extrabold text-[10px] tracking-wider px-2.5 py-1 rounded-full shadow-md border border-amber-300/30 uppercase">
                      {product.badge}
                    </span>
                  )}

                  {/* Best seller indicator */}
                  {product.isBestSeller && (
                    <span className="absolute top-3 right-3 z-10 bg-[#C59B27] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                      ★ বেস্ট সেলার
                    </span>
                  )}

                  {/* Product Image - clickable */}
                  <img
                    src={product.image}
                    alt={product.title}
                    onClick={() => onQuickView(product)}
                    className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Quick View Trigger */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => onQuickView(product)}
                      className="px-4 py-2.5 bg-white/95 backdrop-blur-md text-[#7A0016] font-bold text-xs rounded-xl shadow-lg hover:bg-[#7A0016] hover:text-white transition-all flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>বিস্তারিত বিবরণ</span>
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Ratings */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400 font-normal">({product.reviewsCount} রিভিউ)</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 px-2 py-0.5 rounded-full">
                      ইন স্টক
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onQuickView(product)}
                    className="font-bold text-base text-[#2C221E] font-serif-bn hover:text-[#7A0016] cursor-pointer transition-colors line-clamp-2 leading-tight"
                  >
                    {product.title}
                  </h3>

                  {/* Quick Benefits Chips */}
                  <div className="flex flex-wrap gap-1">
                    {product.quickBenefits.slice(0, 2).map((benefit, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[#FAF6EF] text-[#2C221E]/80 border border-[#E8DEC8] px-2 py-0.5 rounded-md font-medium"
                      >
                        • {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Size Options Selector */}
                  {product.sizeOptions && product.sizeOptions.length > 1 && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        প্যাক সাইজ সিলেক্ট করুন:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {product.sizeOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSizeChange(product.id, option)}
                            className={`py-1 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              currentSize.value === option.value
                                ? 'bg-[#7A0016] text-white border-[#7A0016] shadow-2xs'
                                : 'bg-[#FAF6EF] text-gray-700 border-[#E8DEC8] hover:border-[#7A0016]'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 pt-1 border-t border-[#E8DEC8]/60">
                    <span className="text-xl font-extrabold text-[#7A0016] font-mono">
                      ৳ {currentSize.price}
                    </span>
                    {currentSize.originalPrice && (
                      <span className="text-xs text-gray-400 line-through font-mono">
                        ৳ {currentSize.originalPrice}
                      </span>
                    )}
                    {currentSize.originalPrice && (
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.2 rounded ml-auto">
                        ছাড় ৳ {currentSize.originalPrice - currentSize.price}
                      </span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#FAF6EF] text-[#7A0016] border border-[#7A0016] hover:bg-[#7A0016]/10'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>যোগ করা হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>কার্টে যোগ করুন</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onDirectOrder(product, currentSize)}
                      className="py-2.5 px-3 bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-50 rounded-xl font-bold text-xs hover:shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1 border border-amber-300/20 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300 fill-current" />
                      <span>সরাসরি অর্ডার</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
