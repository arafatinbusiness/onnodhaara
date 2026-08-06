import React from 'react';
import { Home, Grid, ShoppingBag, PhoneCall } from 'lucide-react';
import { ProductCategory } from '../types';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  onScrollToSection,
}) => {
  const whatsappHref = `https://wa.me/8801330492979?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি অন্নধারা থেকে অর্ডার করতে চাই।')}`;
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t border-[#E8DEC8] px-4 py-2 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        
        {/* Home */}
        <button
          onClick={() => {
            onSelectCategory('all');
            onScrollToSection('hero');
          }}
          className="flex flex-col items-center gap-1 text-[#2C221E] hover:text-[#7A0016] text-[10px] font-bold cursor-pointer"
        >
          <Home className="w-5 h-5 text-[#7A0016]" />
          <span>হোম</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            onSelectCategory('all');
            onScrollToSection('bestsellers');
          }}
          className="flex flex-col items-center gap-1 text-[#2C221E] hover:text-[#7A0016] text-[10px] font-bold cursor-pointer"
        >
          <Grid className="w-5 h-5 text-[#C59B27]" />
          <span>প্রোডাক্টস</span>
        </button>

        {/* Cart Drawer Trigger */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 text-[#2C221E] hover:text-[#7A0016] text-[10px] font-bold cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#7A0016]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-[#7A0016] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span>কার্ট</span>
        </button>

        {/* Quick Order Phone Hotline */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
          <span>WhatsApp</span>
        </a>
        <a
          href="tel:+8801330492979"
          className="px-3.5 py-2 bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-50 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
          <span>কল</span>
        </a>

      </div>
    </div>
  );
};
