import React from 'react';
import { Truck, ShieldCheck, Clock, Award } from 'lucide-react';

export const TrustBadgesStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'সারা দেশে ক্যাশ অন ডেলিভারি',
      description: 'পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ নিশ্চিন্তে টাকা পরিশোধ করুন',
      color: 'text-[#7A0016]',
      bgColor: 'bg-[#7A0016]/10',
    },
    {
      icon: ShieldCheck,
      title: '১০০% বিশুদ্ধ ও প্রিজারভেটিভ মুক্ত',
      description: 'কোনো প্রকার রাসায়নিক, কৃত্রিম সুবাস বা চিনি ছাড়া প্রস্তুতকৃত',
      color: 'text-[#3E6B48]',
      bgColor: 'bg-[#3E6B48]/10',
    },
    {
      icon: Clock,
      title: '২৪-৪৮ ঘণ্টায় দ্রুত ডেলিভারি',
      description: 'ঢাকা ও চট্টগ্রাম সিটিতে দ্রুততম সময়ের মধ্যে হোম ডেলিভারি',
      color: 'text-[#C59B27]',
      bgColor: 'bg-[#C59B27]/15',
    },
    {
      icon: Award,
      title: 'বিএসটিআই ও ল্যাব টেস্টেড',
      description: 'আন্তর্জাতিক মানসম্মত হাইজিন বজায় রেখে হাই ফাইবার প্রসেসিং',
      color: 'text-[#7A0016]',
      bgColor: 'bg-[#7A0016]/10',
    },
  ];

  return (
    <section className="bg-[#FFFDF7] py-8 border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF6EF]/70 border border-[#E8DEC8]/80 hover:border-[#C59B27] hover:shadow-md transition-all group"
              >
                <div
                  className={`p-3 rounded-xl ${item.bgColor} ${item.color} group-hover:scale-110 transition-transform shrink-0`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#2C221E] font-serif-bn leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2C221E]/70 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
