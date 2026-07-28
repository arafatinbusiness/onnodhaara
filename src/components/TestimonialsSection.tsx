import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-16 bg-[#FAF6EF] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0016] uppercase tracking-wider bg-[#7A0016]/10 px-3 py-1 rounded-full border border-[#7A0016]/20">
            ★ সামাজিক গ্রহণযোগ্যতা (Customer Reviews)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C221E] font-serif-bn">
            আমাদের সন্তুষ্ট গ্রাহকদের মতামত
          </h2>
          <p className="text-sm text-gray-600">
            দেশজুড়ে ১,৫০০+ পরিবার প্রতিদিন অন্নধারার পুষ্টিকর খাবারের স্বাদ নিচ্ছেন
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto relative">
          
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-[#E8DEC8] relative overflow-hidden">
            
            {/* Background Quote Watermark */}
            <Quote className="w-24 h-24 text-[#7A0016]/5 absolute -bottom-4 -right-4 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DEC8]">
              <div>
                <div className="flex text-amber-500 mb-1">
                  {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <h3 className="font-bold text-lg text-[#2C221E] font-serif-bn">
                  {REVIEWS[currentIndex].userName}
                </h3>
                <p className="text-xs text-gray-500">
                  {REVIEWS[currentIndex].userCity} • {REVIEWS[currentIndex].date}
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>ভেরিফাইড ক্রেতা (Verified)</span>
              </div>
            </div>

            {/* Review Comment */}
            <div className="py-6">
              <p className="text-base sm:text-lg text-[#2C221E]/90 leading-relaxed font-medium italic">
                "{REVIEWS[currentIndex].comment}"
              </p>
            </div>

            {/* Product Purchased Tag */}
            <div className="pt-4 border-t border-[#E8DEC8]/60 flex items-center justify-between text-xs font-semibold text-[#7A0016]">
              <span>ক্রয়কৃত পণ্য: {REVIEWS[currentIndex].productTitle}</span>
              <span className="text-gray-400 font-normal">
                {currentIndex + 1} / {REVIEWS.length}
              </span>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-white text-[#7A0016] border border-[#E8DEC8] shadow-md hover:bg-[#7A0016] hover:text-white transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#7A0016]' : 'w-2.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-white text-[#7A0016] border border-[#E8DEC8] shadow-md hover:bg-[#7A0016] hover:text-white transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
