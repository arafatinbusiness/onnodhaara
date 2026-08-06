import React, { useState } from 'react';
import { Product, ProductSizeOption } from '../types';
import { X, Star, ShieldCheck, ShoppingBag, Zap, Truck, Check, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSizeOption, quantity: number) => void;
  onDirectOrder: (product: Product, size: ProductSizeOption, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectOrder,
}) => {
  if (!product) return null;

  const defaultSize: ProductSizeOption = {
    label: '১ টি',
    value: '1pc',
    price: product.price,
    originalPrice: product.originalPrice,
  };
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(
    product.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions[0] : defaultSize
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleDirectOrder = () => {
    onDirectOrder(product, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFDF7] rounded-3xl max-w-3xl w-full shadow-2xl border border-[#E8DEC8] overflow-hidden my-8 relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-gray-500 hover:text-black hover:bg-white shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image & Badges */}
          <div className="bg-[#FAF6EF] p-6 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#E8DEC8]">
            {product.badge && (
              <span className="inline-block bg-[#7A0016] text-amber-100 font-extrabold text-[10px] tracking-wider px-3 py-1 rounded-full shadow-md w-fit mb-2 border border-amber-300/30 uppercase">
                {product.badge}
              </span>
            )}
            
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-md my-auto">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#3E6B48]">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% রাসায়নিক মুক্ত ও প্রাকৃতিক</span>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount} রিভিউ)</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-extrabold text-[#2C221E] font-serif-bn leading-tight">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl font-black text-[#7A0016] font-mono">
                  ৳ {selectedSize.price * quantity}
                </span>
                {product.originalPrice && product.originalPrice > selectedSize.price && (
                  <span className="text-sm text-gray-400 line-through font-mono">
                    ৳ {product.originalPrice * quantity}
                  </span>
                )}
                {product.originalPrice && product.originalPrice > selectedSize.price && (
                  <span className="text-xs text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                    সাশ্রয় ৳ {(product.originalPrice - selectedSize.price) * quantity}
                  </span>
                )}
              </div>

              {/* Size Selector */}
              {product.sizeOptions && product.sizeOptions.length > 0 && (
                <div className="space-y-1.5 my-4">
                  <label className="text-xs font-bold text-[#2C221E] font-serif-bn">
                    প্যাক সাইজ বেছে নিন:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.sizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedSize(opt)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedSize.value === opt.value
                            ? 'bg-[#7A0016] text-white border-[#7A0016] shadow-sm'
                            : 'bg-[#FAF6EF] text-[#2C221E] border-[#E8DEC8] hover:border-[#7A0016]'
                        }`}
                      >
                        {opt.label} - ৳{opt.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 my-4">
                <span className="text-xs font-bold text-[#2C221E]">পরিমাণ:</span>
                <div className="flex items-center rounded-xl bg-[#FAF6EF] border border-[#E8DEC8] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 font-bold text-gray-700 hover:bg-[#E8DEC8]"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-bold text-sm font-mono text-[#7A0016]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 font-bold text-gray-700 hover:bg-[#E8DEC8]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Description & Benefits */}
              <p className="text-xs text-gray-600 leading-relaxed my-3 line-clamp-3">
                {product.description}
              </p>

              {/* Nutrition Facts Table */}
              {product.nutritionFacts && (
                <div className="bg-[#FAF6EF] p-3 rounded-xl border border-[#E8DEC8] my-3">
                  <p className="text-[11px] font-bold text-[#7A0016] mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C59B27]" />
                    নিউট্রিশন ফ্যাক্টস (Nutrition per {product.nutritionFacts.servingSize}):
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-[#2C221E]/80">
                    <div>ক্যালোরি: <span className="font-bold">{product.nutritionFacts.calories}</span></div>
                    <div>প্রোটিন: <span className="font-bold">{product.nutritionFacts.protein}</span></div>
                    <div>ফাইবার: <span className="font-bold">{product.nutritionFacts.fiber}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#FAF6EF] text-[#7A0016] border border-[#7A0016] hover:bg-[#7A0016]/10'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>কার্টে যোগ হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>কার্টে যোগ করুন</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectOrder}
                  className="py-3 px-4 bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-50 rounded-xl font-bold text-xs shadow-md hover:shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-1.5 border border-amber-300/20 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-current" />
                  <span>সরাসরি অর্ডার (COD)</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#7A0016]" />
                <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সার্ভিস উপলব্ধ</span>
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
