import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Facebook, Instagram, Youtube } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onScrollToSection }) => {
  return (
    <footer className="bg-[#2C221E] text-amber-50/90 pt-16 pb-24 lg:pb-12 border-t-4 border-[#7A0016]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-amber-100/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7A0016] flex items-center justify-center text-amber-200 border border-amber-300/30">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-amber-100 font-serif-bn leading-none">
                  অন্নধারা
                </span>
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider mt-0.5 uppercase">
                  পুষ্টির ধারাবাহিক উৎস
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-100/70 leading-relaxed max-w-sm font-normal">
              অন্নধারা (Onnodhara) বাংলাদেশের একটি নির্ভরযোগ্য ১০০% প্রাকৃতিক অর্গানিক ব্র্যান্ড। আমরা প্রিজারভেটিভ ও কেমিক্যালমুক্ত রোল্ড ওটস, অর্গানিক ভেষজ চা এবং সুপারফুড সরবরাহ করে থাকি।
            </p>

            <div className="pt-2 flex items-center gap-3 text-amber-200">
              <a href="#" className="p-2 rounded-lg bg-amber-100/10 hover:bg-[#7A0016] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-amber-100/10 hover:bg-[#7A0016] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-amber-100/10 hover:bg-[#7A0016] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-amber-200 font-serif-bn uppercase tracking-wider">
              পণ্যসমূহ (Categories)
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/80">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('oats');
                    onScrollToSection('bestsellers');
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  🌾 রোল্ড ওটস সিরিজ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('tea');
                    onScrollToSection('bestsellers');
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  🍵 অর্গানিক ভেষজ চা
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('superfood');
                    onScrollToSection('bestsellers');
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  🌱 চিয়া সিড ও কিউইনোয়া
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('combo');
                    onScrollToSection('bestsellers');
                  }}
                  className="hover:text-amber-300 transition-colors"
                >
                  🎁 হেলথ কম্বো প্যাক
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-amber-200 font-serif-bn uppercase tracking-wider">
              গ্রাহক সেবা & পলিসি
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/80">
              <li>
                <button onClick={() => onScrollToSection('brand-story')} className="hover:text-amber-300 transition-colors">
                  আমাদের গল্প (About Us)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('reviews')} className="hover:text-amber-300 transition-colors">
                  গ্রাহকের মতামত (Reviews)
                </button>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  রিফান্ড ও রিটার্ন পলিসি
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  প্রাইভেসী পলিসি ও টার্মস
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotline */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-amber-200 font-serif-bn uppercase tracking-wider">
              যোগাযোগ & হটলাইন
            </h4>
            <div className="space-y-2 text-xs text-amber-100/80">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C59B27]" />
                <span className="font-bold font-mono text-amber-200">+৮৮০ ১৩৩০-৪৯২৯৭৯</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C59B27]" />
                <span>support@onnodhara.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <span>হাউজ ৪৫, রোড ১২, সেক্টর ৭, উত্তরা, ঢাকা-১২৩০, বাংলাদেশ।</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Payment Methods & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-100/60">
          <div>
            <p>© ২০২৬ অন্নধারা (Onnodhara)। সর্বস্বত্ব সংরক্ষিত।</p>
            <p className="text-[10px] text-amber-100/40 mt-0.5">
              ট্রেড লাইসেন্স নং: TRAD/DNCC/019482/2025
            </p>
          </div>

          {/* Accepted Payments */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-amber-200/80">পেমেন্ট মেথড:</span>
            <span className="bg-amber-100/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-200 border border-amber-100/20">
              ক্যাশ অন ডেলিভারি (COD)
            </span>
            <span className="bg-[#D12053]/20 px-2 py-1 rounded-md text-[10px] font-bold text-pink-300 border border-pink-400/30">
              bKash
            </span>
            <span className="bg-amber-500/20 px-2 py-1 rounded-md text-[10px] font-bold text-amber-300 border border-amber-400/30">
              Nagad
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
