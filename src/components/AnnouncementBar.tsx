import React from 'react';
import { Truck, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  text?: string;
  phone?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ১০০% প্রাকৃতিক উপাদান',
  phone = '০১৭০০-০০০০০০',
}) => {
  return (
    <div className="bg-[#7A0016] text-amber-50 text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-[#5A0010]">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Left marquee / message */}
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-0.5">
          <span className="inline-flex items-center gap-1.5 font-medium bg-[#5A0010] px-2.5 py-0.5 rounded-full text-[11px] text-amber-200 border border-amber-400/30 shrink-0">
            <Truck className="w-3.5 h-3.5 text-amber-300" />
            ক্যাশ অন ডেলিভারি
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-amber-100/90 text-xs shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {text}
          </span>
          <span className="inline-flex items-center gap-1 text-amber-200 text-xs font-semibold shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            কুপন: <span className="bg-amber-400 text-[#7A0016] px-1.5 py-0.2 rounded font-bold">ONNODHARA10</span> (১০% ছাড়)
          </span>
        </div>

        {/* Right phone hotline */}
        <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-amber-100 hover:text-white transition-colors">
          <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
          <span>হটলাইন: {phone}</span>
        </div>
      </div>
    </div>
  );
};
