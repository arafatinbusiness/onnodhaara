import React from 'react';
import { Truck, ShieldCheck, PhoneCall, Sparkles, MessageCircle } from 'lucide-react';

interface AnnouncementBarProps {
  text?: string;
  phone?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ১০০% প্রাকৃতিক উপাদান',
  phone = '01330492979',
}) => {
  const whatsappHref = `https://wa.me/${phone.replace(/^0/, '880')}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি অন্নধারা থেকে অর্ডার করতে চাই।')}`;

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

        {/* Right actions */}
        <div className="hidden sm:flex items-center space-x-3 text-xs font-medium text-amber-100 transition-colors">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full font-bold shadow-sm transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp অর্ডার</span>
          </a>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>হটলাইন: {phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};