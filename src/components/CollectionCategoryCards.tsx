import React from 'react';
import { Product, ProductCategory } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CollectionCategoryCardsProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onScrollToProducts: () => void;
}

export const CollectionCategoryCards: React.FC<CollectionCategoryCardsProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onScrollToProducts,
}) => {
  // Build categories dynamically from actual products
  const categoryMeta: Record<ProductCategory, { name: string; nameEn: string; subtitle: string }> = {
    all: { name: 'সব পণ্য', nameEn: 'All Products', subtitle: 'ব্রাউজ করুন সব প্রাকৃতিক পণ্য' },
    oats: { name: 'রোল্ড ওটস', nameEn: 'Rolled Oats', subtitle: 'হৃদরোগ প্রতিরোধী ও উচ্চ ফাইবারযুক্ত হোল গ্রেইন' },
    tea: { name: 'ভেষজ চা', nameEn: 'Herbal Tea', subtitle: 'ন্যাচারাল ডিটক্স ও ইমিউনিটি বুস্টার' },
    superfood: { name: 'সুপারফুড', nameEn: 'Superfood', subtitle: 'চিয়া সিড, কিউইনোয়া ও ফ্লেক্সসিডস' },
    honey: { name: 'খাঁটি মধু', nameEn: 'Pure Honey', subtitle: 'সুন্দরবনের প্রাকৃতিক খাঁটি মধু' },
    combo: { name: 'হেলথ কম্বো', nameEn: 'Combo Pack', subtitle: 'সাশ্রয়ী স্বাস্থ্য প্যাকেজ' },
  };

  // Helper: get first product image from a category, or default placeholder
  const getCategoryImage = (cat: ProductCategory): string => {
    if (cat === 'all') {
      const firstProduct = products[0];
      return firstProduct ? firstProduct.image : '';
    }
    const catProduct = products.find(p => p.category === cat);
    return catProduct ? catProduct.image : '';
  };

  // Get categories that have products
  const activeCategories = (['all', 'oats', 'tea', 'superfood', 'honey', 'combo'] as ProductCategory[])
    .filter(cat => cat === 'all' || products.some(p => p.category === cat));

  const categoryCards = activeCategories.map(cat => ({
    id: cat,
    name: categoryMeta[cat].name,
    nameEn: categoryMeta[cat].nameEn,
    subtitle: categoryMeta[cat].subtitle,
    image: getCategoryImage(cat),
    itemCount: cat === 'all' ? products.length : products.filter(p => p.category === cat).length,
  }));

  const handleCategoryClick = (catId: ProductCategory) => {
    onSelectCategory(catId);
    onScrollToProducts();
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0016] uppercase tracking-wider bg-[#7A0016]/10 px-3 py-1 rounded-full border border-[#7A0016]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            পণ্য বিভাগসমূহ (Collection Categories)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C221E] font-serif-bn">
            আপনার স্বাস্থ্যের প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন
          </h2>
          <p className="text-sm text-gray-600 font-normal">
            অন্নধারার ১০০% প্রাকৃতিক অর্গানিক কালেকশন থেকে আপনার পছন্দের আইটেম অর্ডার করুন
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative rounded-2xl overflow-hidden bg-white border-2 transition-all cursor-pointer shadow-sm hover:shadow-xl ${
                  isSelected
                    ? 'border-[#7A0016] ring-2 ring-[#7A0016]/20'
                    : 'border-[#E8DEC8] hover:border-[#C59B27]'
                }`}
              >
                {/* Image background with overlay */}
                <div className="relative h-48 overflow-hidden bg-[#FAF6EF] flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent/0" />
                  
                  {/* Badge count */}
                  <span className="absolute top-3 right-3 bg-[#7A0016] text-amber-100 text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-amber-300/30">
                    {cat.itemCount} টি পণ্য
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 bg-white space-y-2">
                  <h3 className="font-bold text-lg text-[#2C221E] font-serif-bn group-hover:text-[#7A0016] transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#7A0016] transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {cat.subtitle}
                  </p>
                  
                  <div className="pt-2 flex items-center text-xs font-bold text-[#7A0016]">
                    <span>পণ্য দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
