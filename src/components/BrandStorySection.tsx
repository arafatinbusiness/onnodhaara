import React from 'react';
import { Heart, ShieldCheck, Sprout, Users, Sparkles } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="brand-story" className="py-16 sm:py-20 bg-[#FFFDF7] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0016] uppercase tracking-wider bg-[#7A0016]/10 px-3 py-1 rounded-full border border-[#7A0016]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            আমাদের গল্প (Brand Story)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C221E] font-serif-bn">
            কেন অন্নধারা আপনার পরিবারের জন্য সেরা পছন্দ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: পুষ্টির ধারাবাহিক উৎস */}
          <div className="text-center p-6 rounded-2xl bg-[#FAF6EF] border border-[#E8DEC8] hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#7A0016]/10 text-[#7A0016] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#2C221E] mb-2 font-serif-bn">পুষ্টির ধারাবাহিক উৎস</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              প্রতিটি পণ্যে প্রাকৃতিক পুষ্টি ও স্বাদ বজায় রাখতে বিশেষ প্রক্রিয়ায় তৈরি যা আপনার সুস্থ জীবনযাত্রার সঙ্গী।
            </p>
          </div>

          {/* Card 2: ১০০% প্রাকৃতিক */}
          <div className="text-center p-6 rounded-2xl bg-[#FAF6EF] border border-[#E8DEC8] hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#3E6B48]/10 text-[#3E6B48] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#2C221E] mb-2 font-serif-bn">১০০% প্রাকৃতিক ও বিশুদ্ধ</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              প্রিজারভেটিভ, কৃত্রিম রঙ ও কেমিক্যাল ছাড়াই প্রক্রিয়াজাত — সম্পূর্ণ নিরাপদ ও নির্ভরযোগ্য।
            </p>
          </div>

          {/* Card 3: আধুনিক প্যাকেজিং */}
          <div className="text-center p-6 rounded-2xl bg-[#FAF6EF] border border-[#E8DEC8] hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#C59B27]/15 text-[#7A0016] flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#2C221E] mb-2 font-serif-bn">আধুনিক হাইজিন প্যাকেজিং</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              ইন্টারন্যাশনাল ফুড স্ট্যান্ডার্ড মেনে ফুড-গ্রেড প্যাকেজিংয়ে সংরক্ষিত।
            </p>
          </div>

          {/* Card 4: গ্রাহক সন্তুষ্টি */}
          <div className="text-center p-6 rounded-2xl bg-[#FAF6EF] border border-[#E8DEC8] hover:shadow-lg transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#2C221E] mb-2 font-serif-bn">গ্রাহক সন্তুষ্টি অগ্রাধিকার</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              সারা বাংলাদেশে ক্যাশ অন ডেলিভারির মাধ্যমে দ্রুত ও নিরাপদ ডেলিভারি, সাথে ফ্রি রিটার্ন গ্যারান্টি।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};