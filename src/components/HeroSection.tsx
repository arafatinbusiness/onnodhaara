import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import desktopBanner from '../assets/images/onnodhara_banner_desktop.jpg';
import mobileBanner from '../assets/images/onnodhara_banner_mobile.jpg';

interface HeroSectionProps {
  onOrderNow: () => void;
  onExploreProducts: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOrderNow, onExploreProducts }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Banner */}
        <div className="hidden lg:block relative w-full rounded-2xl overflow-hidden">
          <img
            src={desktopBanner}
            alt="Onnodhara"
            className="w-full h-auto object-contain block"
          />
          {/* Desktop overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-start bg-gradient-to-r from-black/60 via-black/30 to-transparent">
            <div className="max-w-lg ml-8 lg:ml-12 xl:ml-16 space-y-4">
              <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                প্রাকৃতিক উপাদান ও<br />পুষ্টিতে সমৃদ্ধ
              </h1>
              <p className="text-base text-white/90 max-w-md font-medium drop-shadow-md">
                ১০০% ন্যাচারাল হোল গ্রেইন ফুড — কেমিক্যালমুক্ত, প্রিজারভেটিভ মুক্ত।
              </p>
              <button
                onClick={onOrderNow}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A0016] hover:bg-[#5A0010] text-white font-bold text-base rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-amber-400/50 cursor-pointer"
              >
                <span>এখনই অর্ডার করুন</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="block lg:hidden relative w-full">
          <img
            src={mobileBanner}
            alt="Onnodhara"
            className="w-full h-auto object-contain block"
          />
          {/* Mobile overlay CTA */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-16">
            <button
              onClick={onOrderNow}
              className="w-full py-3.5 bg-[#7A0016] hover:bg-[#5A0010] text-white font-bold text-base rounded-xl shadow-2xl flex items-center justify-center gap-2 border-2 border-amber-400/50 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>এখনই অর্ডার করুন</span>
              <ArrowRight className="w-5 h-5 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};