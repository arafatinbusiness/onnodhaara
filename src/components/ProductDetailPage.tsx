
import React, { useState, useEffect } from 'react';
import { Product, ProductSizeOption } from '../types';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  ShoppingBag,
  Zap,
  Truck,
  Check,
  Sparkles,
  PhoneCall,
  Clock,
  Eye,
  CheckCircle,
  ThumbsUp,
  RotateCcw,
  Award,
  ChevronRight,
  Flame,
  AlertCircle,
  MessageSquare,
  MessageCircle
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: ProductSizeOption, quantity: number) => void;
  onDirectOrder: (product: Product, size: ProductSizeOption, quantity: number) => void;
  onOpenCart: () => void;
  helplineNumber?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onAddToCart,
  onDirectOrder,
  onOpenCart,
  helplineNumber = '01330492979',
}) => {
  const whatsappHref = `https://wa.me/${helplineNumber.replace(/^0/, '880')}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি অন্নধারা থেকে অর্ডার করতে চাই। আমি আগ্রহী: ' + product.title)}`;
  // Always scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(
    product.sizeOptions && product.sizeOptions.length > 0
      ? product.sizeOptions[0]
      : { label: '১ টি', value: '1pc', price: product.price, originalPrice: product.originalPrice }
  );
  
  // Update selected size when product changes
  useEffect(() => {
    if (product.sizeOptions && product.sizeOptions.length > 0) {
      setSelectedSize(product.sizeOptions[0]);
    }
  }, [product]);

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'usage' | 'nutrition' | 'reviews'>('benefits');

  // Customer Reviews dummy list
  const sampleReviews = [
    {
      name: 'আরিফুল ইসলাম',
      city: 'ঢাকা',
      rating: 5,
      date: '২ দিন আগে',
      comment: 'অত্যন্ত চমৎকার ও খাঁটি মানের প্রোডাক্ট! প্যাকেজিং অনেক সুন্দর ছিল এবং ২ দিনের মধ্যেই হাতে পেয়েছি।',
      verified: true,
    },
    {
      name: 'নুসরাত জাহান',
      city: 'চট্টগ্রাম',
      rating: 5,
      date: '৫ দিন আগে',
      comment: 'নিয়মিত খাচ্ছি, স্বাস্থ্যের জন্য খুব উপকারী। খাঁটি ও অর্গানিক খাবারের জন্য অন্নধারা একদম নির্ভরযোগ্য।',
      verified: true,
    },
    {
      name: 'মাহমুদুল হাসান',
      city: 'সিলেট',
      rating: 5,
      date: '১ সপ্তাহ আগে',
      comment: 'ক্যাশ অন ডেলিভারিতে সহজে পেয়ে গেলাম। অরিজিনাল টেস্ট এবং স্মেল আছে। ৫/৫ দেব!',
      verified: true,
    },
  ];

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleDirectOrder = () => {
    onDirectOrder(product, selectedSize, quantity);
  };

  // Filter related products (exclude current)
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const calculateSavings = () => {
    if (!product.originalPrice || product.originalPrice <= selectedSize.price) return 0;
    return (product.originalPrice - selectedSize.price) * quantity;
  };

  return (
    <div className="bg-[#FAF6EF] min-h-screen text-[#2C221E] pb-24 lg:pb-16 animate-in fade-in duration-300">
      
      {/* Sticky Top Navigation Breadcrumb Bar */}
      <div className="bg-[#FFFDF7] border-b border-[#E8DEC8] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#7A0016]/10 text-[#7A0016] hover:bg-[#7A0016] hover:text-white transition-all font-bold text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল পণ্য তালিকায় ফিরে যান</span>
          </button>

          {/* Breadcrumb Path */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span className="hover:text-[#7A0016] cursor-pointer" onClick={onBack}>হোম</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="capitalize">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-[#7A0016] truncate max-w-xs">{product.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl shadow-sm transition-colors"
              title="WhatsApp এ মেসেজ করে অর্ডার করুন"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href={`tel:${helplineNumber}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0016] hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#7A0016]" />
              <span className="hidden sm:inline">সহায়তার জন্য কল:</span>
              <span>{helplineNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Product Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        <div className="bg-white rounded-3xl border border-[#E8DEC8] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT COLUMN: Product Images & Visual Urgency (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF6EF] p-4 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E8DEC8] relative">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              {product.badge ? (
                <span className="px-3.5 py-1 rounded-full bg-[#7A0016] text-amber-100 font-black text-xs uppercase tracking-wider shadow-sm border border-amber-300/30">
                  {product.badge}
                </span>
              ) : (
                <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-emerald-50 font-black text-xs tracking-wider">
                  ১০০% খাঁটি ও প্রিমিয়াম
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
                <span>হট ট্রেন্ডিং আইটেম</span>
              </span>
            </div>

            {/* Main Product Frame */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-md border border-[#E8DEC8] group my-auto">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Guarantee Tag Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-[#E8DEC8] flex items-center justify-between text-[11px] font-bold text-[#7A0016]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  ১০০% প্রাকৃতিক ও কেমিক্যালমুক্ত
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  ১০০% প্রাকৃতিক
                </span>
              </div>
            </div>

            {/* Live Views Counter & Limited Stock Alert */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                <Eye className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
                <span>
                  বর্তমানে <strong className="font-bold text-[#7A0016]">১৬৪ জন গ্রাহক</strong> এই পেজে পণ্যটি দেখছেন
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>স্টক সীমিত! মাত্র ১২ টি অবশিষ্ট আছে</span>
                </div>
                <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded uppercase">
                  Fast Selling
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Conversion Box & CTAs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Star Rating & Verified Purchase Summary */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DEC8] pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-mono font-extrabold text-sm text-[#2C221E]">{product.rating}</span>
                  <span className="text-xs text-gray-500 font-semibold">({product.reviewsCount} টি সত্যতা যাচাইকৃত রিভিউ)</span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  ভেরাফাইড কাস্টমার রেটিং
                </span>
              </div>

              {/* Title & English Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C221E] font-serif-bn leading-tight">
                  {product.title}
                </h1>
                {product.titleEn && (
                  <p className="text-xs text-gray-500 font-sans tracking-wide mt-1">
                    {product.titleEn}
                  </p>
                )}
              </div>

              {/* Price & Discount Calculation */}
              <div className="bg-[#FAF6EF] p-4 rounded-2xl border border-[#E8DEC8] flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#7A0016] font-mono">
                    ৳ {selectedSize.price * quantity}
                  </span>
                  {product.originalPrice && product.originalPrice > selectedSize.price && (
                    <span className="text-lg text-gray-400 line-through font-mono">
                      ৳ {product.originalPrice * quantity}
                    </span>
                  )}
                </div>

                {calculateSavings() > 0 && (
                  <span className="px-3 py-1 bg-[#7A0016] text-amber-100 rounded-xl font-bold text-xs shadow-xs animate-pulse">
                    মোট সাশ্রয় ৳ {calculateSavings()}!
                  </span>
                )}
              </div>

              {/* Size Option Variant Selector */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-[#2C221E] font-serif-bn">
                    ভেরিয়েশন বেছে নিন (Select Option):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.sizeOptions.map((opt) => {
                      const isSelected = selectedSize.value === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setSelectedSize(opt)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#7A0016] text-amber-50 border-[#7A0016] shadow-md ring-2 ring-[#7A0016]/30'
                              : 'bg-white text-[#2C221E] border-[#D9C8B4] hover:border-[#7A0016]'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-xs">{opt.label}</p>
                            <p className={`text-[10px] font-mono ${isSelected ? 'text-amber-200' : 'text-gray-500'}`}>
                              {opt.value}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-extrabold text-sm">৳{opt.price}</p>
                            {product.originalPrice && product.originalPrice > opt.price && (
                              <p className={`text-[10px] line-through font-mono ${isSelected ? 'text-amber-200/70' : 'text-gray-400'}`}>
                                ৳{product.originalPrice}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper - always shown (no hardcoded pack deals) */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold text-[#2C221E] font-serif-bn">পরিমাণ:</span>
                <div className="flex items-center rounded-xl bg-white border border-[#D9C8B4] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 font-bold text-gray-700 hover:bg-[#FAF6EF] cursor-pointer"
                  >
                    −
                  </button>
                  <span className="px-4 py-1.5 font-bold text-sm font-mono text-[#7A0016]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 font-bold text-gray-700 hover:bg-[#FAF6EF] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {product.quickBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-[#2C221E]/90 font-medium bg-[#FAF6EF] p-2 rounded-xl border border-[#E8DEC8]">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* ACTION BUTTONS (High Converting Desktop & Tablet Layout) */}
            <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Direct Order CTA */}
                <button
                  onClick={handleDirectOrder}
                  className="py-4 px-6 bg-gradient-to-r from-[#7A0016] via-[#8C001A] to-[#5A0010] text-amber-50 rounded-2xl font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-amber-300/30 cursor-pointer text-center"
                >
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
                  <span>সরাসরি অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
                </button>

                {/* 2. Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                    isAdded
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-md'
                      : 'bg-[#FAF6EF] text-[#7A0016] border-[#7A0016] hover:bg-[#7A0016]/10 shadow-xs'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>কার্টে সফলভাবে যোগ হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>কার্টে যোগ করুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hotline Order & WhatsApp Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp এ মেসেজ করুন</span>
                </a>
                <a
                  href={`tel:${helplineNumber}`}
                  className="w-full py-3 px-4 bg-amber-100 hover:bg-amber-200 text-[#7A0016] rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-amber-300 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#7A0016]" />
                  <span>ফোনে কল করুন: <strong>{helplineNumber}</strong></span>
                </a>
              </div>

              {/* Guarantees Row */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2 text-[11px] font-semibold text-gray-600">
                <div className="p-2 rounded-xl bg-[#FAF6EF] border border-[#E8DEC8]">
                  <Truck className="w-4 h-4 text-[#7A0016] mx-auto mb-1" />
                  <span>৪৮ ঘণ্টার মধ্যে শিপিং</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF6EF] border border-[#E8DEC8]">
                  <RotateCcw className="w-4 h-4 text-[#7A0016] mx-auto mb-1" />
                  <span>৭ দিনের গ্যারান্টি</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF6EF] border border-[#E8DEC8]">
                  <Award className="w-4 h-4 text-[#7A0016] mx-auto mb-1" />
                  <span>১০০% খাঁটি ও বিশুদ্ধ</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* FREQUENTLY BOUGHT TOGETHER BUNDLE UPSELL SECTION */}
        {relatedProducts.length >= 2 && (
          <div className="mt-8 bg-gradient-to-br from-[#FFFDF7] to-[#FAF6EF] rounded-3xl border-2 border-[#7A0016]/20 p-5 sm:p-7 shadow-md relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#E8DEC8] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
                <h3 className="text-lg sm:text-xl font-extrabold text-[#7A0016] font-serif-bn">
                  একত্রে কিনলে সুপার সেভার কম্বো ডিল (Frequently Bought Together)
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#7A0016] text-amber-100 rounded-full text-xs font-extrabold shadow-2xs">
                ১৫% স্পেশাল বান্ডেল ডিসকাউন্ট
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Product Visual Combo Row (7 cols) */}
              <div className="lg:col-span-7 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4">
                
                {/* Product 1: Current Item */}
                <div className="flex flex-col items-center w-28 sm:w-32 bg-white p-2.5 rounded-2xl border border-[#E8DEC8] shadow-2xs text-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl mb-1.5"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-bold text-[11px] text-[#2C221E] line-clamp-1">{product.title}</p>
                  <p className="text-xs font-mono font-extrabold text-[#7A0016] mt-0.5">৳{product.price}</p>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded mt-1">
                    মূল পণ্য
                  </span>
                </div>

                <span className="text-2xl font-black text-[#7A0016]">+</span>

                {/* Product 2: Bundle Item 1 */}
                <div className="flex flex-col items-center w-28 sm:w-32 bg-white p-2.5 rounded-2xl border border-[#E8DEC8] shadow-2xs text-center">
                  <img
                    src={relatedProducts[0].image}
                    alt={relatedProducts[0].title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl mb-1.5"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-bold text-[11px] text-[#2C221E] line-clamp-1">{relatedProducts[0].title}</p>
                  <p className="text-xs font-mono font-extrabold text-[#7A0016] mt-0.5">৳{relatedProducts[0].price}</p>
                  <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded mt-1">
                    অ্যাড-অন ১
                  </span>
                </div>

                <span className="text-2xl font-black text-[#7A0016]">+</span>

                {/* Product 3: Bundle Item 2 */}
                <div className="flex flex-col items-center w-28 sm:w-32 bg-white p-2.5 rounded-2xl border border-[#E8DEC8] shadow-2xs text-center">
                  <img
                    src={relatedProducts[1].image}
                    alt={relatedProducts[1].title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl mb-1.5"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-bold text-[11px] text-[#2C221E] line-clamp-1">{relatedProducts[1].title}</p>
                  <p className="text-xs font-mono font-extrabold text-[#7A0016] mt-0.5">৳{relatedProducts[1].price}</p>
                  <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded mt-1">
                    অ্যাড-অন ২
                  </span>
                </div>

              </div>

              {/* Price Calculation & Bundle CTA (5 cols) */}
              <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DEC8] shadow-xs space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>৩টি পণ্যের নিয়মিত মূল্য:</span>
                    <span className="font-mono line-through">
                      ৳{product.price + relatedProducts[0].price + relatedProducts[1].price}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#7A0016] font-bold">
                    <span>বান্ডেল বিশেষ অফার মূল্য:</span>
                    <span className="font-mono text-lg text-[#7A0016]">
                      ৳{Math.round((product.price + relatedProducts[0].price + relatedProducts[1].price) * 0.85)}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-extrabold text-xs pt-1 border-t border-[#E8DEC8]">
                    <span>আপনার নিট সাশ্রয়:</span>
                    <span>
                      ৳{Math.round((product.price + relatedProducts[0].price + relatedProducts[1].price) * 0.15)}!
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const sizeOpt = product.sizeOptions?.[0] || { label: '১ টি', value: '1pc', price: product.price };
                    onAddToCart(product, sizeOpt, 1);
                    const sizeOpt1 = relatedProducts[0].sizeOptions?.[0] || { label: '১ টি', value: '1pc', price: relatedProducts[0].price };
                    onAddToCart(relatedProducts[0], sizeOpt1, 1);
                    const sizeOpt2 = relatedProducts[1].sizeOptions?.[0] || { label: '১ টি', value: '1pc', price: relatedProducts[1].price };
                    onAddToCart(relatedProducts[1], sizeOpt2, 1);
                    alert('🎉 সফলভাবে ৩টি কম্বো আইটেম কার্টে যোগ করা হয়েছে!');
                  }}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-50 rounded-xl font-black text-xs sm:text-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/30"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>১-ক্লিকে ৩টি কম্বো প্যাক কার্টে যোগ করুন</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* DETAILS & REVIEWS TABS SECTION */}
        <div className="mt-8 bg-white rounded-3xl border border-[#E8DEC8] shadow-md p-6 sm:p-8">
          
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-[#E8DEC8] gap-2 sm:gap-6 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'benefits'
                  ? 'border-[#7A0016] text-[#7A0016]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              বিস্তারিত ও গুণাবলী
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'usage'
                  ? 'border-[#7A0016] text-[#7A0016]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              খাওয়ার সঠিক নিয়ম
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'nutrition'
                  ? 'border-[#7A0016] text-[#7A0016]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              নিউট্রিশন তথ্য
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-[#7A0016] text-[#7A0016]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              গ্রাহক রিভিউ ({product.reviewsCount})
            </button>
          </div>

          {/* Tab Body Content */}
          <div className="pt-6">
            
            {/* TAB 1: BENEFITS */}
            {activeTab === 'benefits' && (
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#2C221E]/90">
                <p className="text-sm font-semibold">{product.description}</p>

                <div className="p-4 bg-[#FAF6EF] rounded-2xl border border-[#E8DEC8] space-y-2 my-4">
                  <h4 className="font-extrabold text-[#7A0016] font-serif-bn text-sm">
                    কেন অন্নধারার {product.title} আপনার স্বাস্থ্যের জন্য সেরা?
                  </h4>
                  <ul className="space-y-2 pl-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span><strong>১০০% ভেজালমুক্ত:</strong> সম্পূর্ণ প্রাকৃতিকভাবে সংগ্রহিত ও কেমিক্যাল মুক্ত।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span><strong>উচ্চ খাদ্যগুণ:</strong> শরীরে এনার্জি বাড়ায় এবং দীর্ঘমেয়াদী পুষ্টি সরবরাহ করে।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span><strong>সংরক্ষণ নিরাপদ:</strong> আধুনিক হাইজিন বজায় রেখে বিশেষ ফুড-গ্রেড প্যাকেজিং।</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: USAGE GUIDE */}
            {activeTab === 'usage' && (
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-[#2C221E]">
                  <h4 className="font-bold text-[#7A0016] mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    দৈনিক সেবন নির্দেশিকা (Daily Consumption Guide):
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-gray-700">
                    <li>প্রতিদিন সকালে অথবা বিকালের নাস্তায় সুষম খাবারের অংশ হিসেবে গ্রহণ করুন।</li>
                    <li>হালকা গরম পানি বা দুধের সাথে মিশিয়ে সহজেই উপভোগ করা যায়।</li>
                    <li>শুষ্ক ও শীতল স্থানে এয়ারটাইট পাত্রে সংরক্ষণ করুন।</li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB 3: NUTRITION */}
            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                {product.nutritionFacts ? (
                  <div className="max-w-md bg-[#FAF6EF] p-5 rounded-2xl border border-[#E8DEC8] space-y-3">
                    <p className="font-bold text-[#7A0016] text-xs">
                      প্রতি পরিবেশনে পুষ্টির পরিমাণ (Serving: {product.nutritionFacts.servingSize}):
                    </p>
                    <div className="divide-y divide-[#E8DEC8] text-xs">
                      <div className="py-2 flex justify-between font-bold">
                        <span>ক্যালোরি (Calories)</span>
                        <span className="font-mono text-[#7A0016]">{product.nutritionFacts.calories}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span>প্রোটিন (Protein)</span>
                        <span className="font-mono">{product.nutritionFacts.protein}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span>ডায়েটারি ফাইবার (Fiber)</span>
                        <span className="font-mono">{product.nutritionFacts.fiber}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span>কার্বোহাইড্রেট (Carbs)</span>
                        <span className="font-mono">{product.nutritionFacts.carbs}</span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span>ফ্যাট (Fat)</span>
                        <span className="font-mono">{product.nutritionFacts.fat}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    এই পণ্যটির সম্পূর্ণ প্রাকৃতিক উপাদানে সমৃদ্ধ নিউট্রিশন তথ্য সংকেত প্যাকের গায়ে প্রদর্শিত।
                  </p>
                )}
              </div>
            )}

            {/* TAB 4: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {/* Rating Summary Header */}
                <div className="p-4 bg-[#FAF6EF] rounded-2xl border border-[#E8DEC8] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-4xl font-black font-mono text-[#7A0016]">{product.rating}</p>
                      <div className="flex text-amber-500 justify-center my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-500">৫ এর মধ্যে রেটিং</p>
                    </div>
                    <div className="h-12 w-px bg-[#E8DEC8]" />
                    <div>
                      <p className="font-bold text-xs text-[#2C221E]">১০০% বিশ্বস্ত গ্রাহকের রিভিউ</p>
                      <p className="text-xs text-gray-500">সকল রিভিউ সত্যতা যাচাইকৃত অর্ডারের পর সংগৃহীত</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert('মতামত পাঠানোর জন্য আপনাকে ধন্যবাদ!')}
                    className="px-4 py-2 bg-[#7A0016] text-white rounded-xl text-xs font-bold hover:bg-[#5A0010] cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>রিভিউ লিখুন</span>
                  </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-3">
                  {sampleReviews.map((rev, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl border border-[#E8DEC8] space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-xs text-[#2C221E] flex items-center gap-2">
                            <span>{rev.name}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                              ✓ Verified Buyer
                            </span>
                          </p>
                          <p className="text-[10px] text-gray-400">{rev.city} • {rev.date}</p>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-[#2C221E] font-serif-bn">
                সম্পর্কিত অন্যান্য প্রিমিয়াম অর্গানিক পণ্য
              </h3>
              <button
                onClick={onBack}
                className="text-xs font-bold text-[#7A0016] hover:underline"
              >
                সবগুলো দেখুন →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relProd) => (
                <div
                  key={relProd.id}
                  onClick={() => onSelectProduct(relProd)}
                  className="bg-white rounded-2xl border border-[#E8DEC8] p-3 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF6EF] mb-2 relative">
                    <img
                      src={relProd.image}
                      alt={relProd.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#2C221E] line-clamp-1 group-hover:text-[#7A0016]">
                      {relProd.title}
                    </h4>
                    <p className="font-mono font-extrabold text-xs text-[#7A0016] mt-1">
                      ৳ {relProd.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MOBILE STICKY BOTTOM CONVERSION BAR (Mobile optimized PDP) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF7] border-t-2 border-[#7A0016] p-3 shadow-2xl backdrop-blur-md">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          
          <div>
            <span className="text-[10px] text-gray-500 font-bold block">মোট মূল্য:</span>
            <span className="text-xl font-black font-mono text-[#7A0016]">
              ৳ {selectedSize.price * quantity}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              onClick={onOpenCart}
              className="p-3 rounded-xl border text-xs font-bold bg-[#FAF6EF] text-[#7A0016] border-[#7A0016]"
              title="কার্ট ও চেকআউট খুলুন"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            <button
              onClick={handleDirectOrder}
              className="py-3 px-4 bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-50 rounded-xl font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 flex-1 cursor-pointer border border-amber-300/30"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>সরাসরি অর্ডার করুন</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
