import React from 'react';
import { ShieldCheck, Heart, Leaf, CheckCircle2, Award } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="brand-story" className="py-16 bg-gradient-to-b from-[#FFFDF7] via-[#FAF6EF] to-[#FFFDF7] border-b border-[#E8DEC8] relative overflow-hidden">
      
      {/* Background Decorative Graphic */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#C59B27]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Illustration Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white p-6 space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#7A0016] flex items-center justify-center text-amber-200 shadow-md shrink-0">
                  <Award className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-[#7A0016] font-serif-bn">
                    অন্নধারা (Onnodhara)
                  </h3>
                  <p className="text-xs text-[#3E6B48] font-bold mt-0.5">
                    "পুষ্টির ধারাবাহিক উৎস"
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#2C221E]/80 leading-relaxed font-medium">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6EF] border border-[#E8DEC8]">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>১০০% প্রাকৃতিক উপায়ে প্রসেসকৃত খাঁটি খাদ্য</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6EF] border border-[#E8DEC8]">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>কোনো প্রিজারভেটিভ, আর্টিফিশিয়াল কালার বা ফ্লেভার নেই</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6EF] border border-[#E8DEC8]">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>প্রতিটি ব্যাচ বিএসটিআই ও ল্যাব টেস্টেড স্ট্যান্ডার্ডে প্রস্তুত</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-50 text-center shadow-md">
                <p className="text-xs font-bold text-amber-200">আমাদের অঙ্গীকার</p>
                <p className="text-sm font-semibold mt-1">
                  "আপনার পরিবারের খাদ্যতালিকায় খাঁটি ও বিশুদ্ধ পুষ্টির গ্যারান্টি"
                </p>
              </div>

            </div>
          </div>

          {/* Right Editorial Copy Block */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3E6B48] uppercase tracking-wider bg-[#3E6B48]/10 px-3 py-1 rounded-full border border-[#3E6B48]/20">
              <Leaf className="w-3.5 h-3.5 text-[#3E6B48]" />
              আমাদের গল্প ও দর্শন (Brand Story)
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2C221E] font-serif-bn leading-tight">
              প্রকৃতির কোল থেকে সরাসরি আপনার খাবারের টেবিলে
            </h2>

            <p className="text-base text-[#2C221E]/80 leading-relaxed font-normal">
              আধুনিক ব্যস্ত জীবনে ভেজালমুক্ত ও রাসায়নিকবিহীন স্বাস্থ্যকর খাবার খুঁজে পাওয়া এক বড় চ্যালেঞ্জ। এই উপলব্ধি থেকেই অন্নধারার পথচলা শুরু। আমাদের লক্ষ্য বাংলাদেশের প্রতিটি ঘরে খাঁটি, কেমিক্যালমুক্ত এবং নিউট্রিশন-সমৃদ্ধ খাবার পৌঁছে দেওয়া।
            </p>

            <p className="text-sm text-[#2C221E]/75 leading-relaxed">
              অন্নধারার রোল্ড ওটস, অর্গানিক ভেষজ চা এবং চিয়া সিডস প্রাকৃতিকভাবে চাষকৃত সেরা শস্যদানা থেকে সংগ্রহ করে আধুনিক পরিচ্ছন্ন পরিবেশে প্রসেস করা হয়। আমাদের শস্যদানায় বজায় রাখা হয় প্রাকৃতিক ফাইবার, ভিটামিন ও মিনারেলসের পূর্ণ ভারসাম্য।
            </p>

            {/* 3 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-[#7A0016] mb-2" />
                <h4 className="font-bold text-sm text-[#2C221E]">বিশুদ্ধতা</h4>
                <p className="text-xs text-gray-500 mt-1">জিরো কেমিক্যাল ও শতভাগ ন্যাচারাল প্রসেসিং</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-2xs">
                <Heart className="w-6 h-6 text-[#C59B27] mb-2" />
                <h4 className="font-bold text-sm text-[#2C221E]">স্বাস্থ্য সুরক্ষা</h4>
                <p className="text-xs text-gray-500 mt-1">উচ্চ ফাইবার যা হৃদযন্ত্র ও মেটাবলিজম বাড়ায়</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8DEC8] shadow-2xs">
                <Award className="w-6 h-6 text-[#3E6B48] mb-2" />
                <h4 className="font-bold text-sm text-[#2C221E]">গুণগত মান</h4>
                <p className="text-xs text-gray-500 mt-1">হাই মেল্টিং হাইজিন ও ফ্রেশ ব্যাচ প্যাকিং</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
