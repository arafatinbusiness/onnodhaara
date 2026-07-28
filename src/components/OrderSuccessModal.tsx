import React from 'react';
import { OrderDetails } from '../types';
import { CheckCircle2, Truck, PhoneCall, ShoppingBag, Sparkles, X } from 'lucide-react';

interface OrderSuccessModalProps {
  orderDetails: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ orderDetails, onClose }) => {
  if (!orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFDF7] rounded-3xl max-w-lg w-full shadow-2xl border border-[#E8DEC8] overflow-hidden my-8 relative p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="inline-block text-xs font-bold text-[#7A0016] uppercase bg-[#7A0016]/10 px-3 py-1 rounded-full border border-[#7A0016]/20">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-[#C59B27]" />
            অর্ডার সফল হয়েছে!
          </span>
          <h2 className="text-2xl font-extrabold text-[#2C221E] font-serif-bn">
            ধন্যবাদ, {orderDetails.customerName}!
          </h2>
          <p className="text-xs text-gray-600">
            আপনার ক্যাশ অন ডেলিভারি অর্ডারটি আমাদের সিস্টেমে সফলভাবে গৃহীত হয়েছে।
          </p>
        </div>

        {/* Invoice Summary Box */}
        <div className="my-6 p-4 rounded-2xl bg-[#FAF6EF] border border-[#E8DEC8] space-y-3 text-xs">
          <div className="flex justify-between font-bold text-[#7A0016] pb-2 border-b border-[#E8DEC8]">
            <span>অর্ডার আইডি: #{orderDetails.orderId}</span>
            <span>{orderDetails.orderDate}</span>
          </div>

          <div className="space-y-1.5">
            <p className="font-bold text-[#2C221E]">অর্ডারকৃত আইটেম:</p>
            {orderDetails.items.map((item, i) => (
              <div key={i} className="flex justify-between text-gray-700">
                <span>
                  {item.product.title} ({item.selectedSize.label}) x {item.quantity}
                </span>
                <span className="font-mono font-bold">
                  ৳ {item.selectedSize.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8DEC8] space-y-1">
            <div className="flex justify-between text-gray-600">
              <span>ডেলিভারি ঠিকানা:</span>
              <span className="font-semibold text-right max-w-[200px]">
                {orderDetails.fullAddress}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>ফোন নম্বর:</span>
              <span className="font-mono font-bold">{orderDetails.customerPhone}</span>
            </div>
            <div className="flex justify-between text-[#7A0016] font-extrabold text-sm pt-2 border-t border-[#E8DEC8]">
              <span>সর্বমোট প্রদেয় টাকা (COD):</span>
              <span className="font-mono text-base">৳ {orderDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Guarantee */}
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 mb-6">
          <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            আগামী <strong>২৪-৪৮ ঘণ্টার মধ্যে</strong> আমাদের প্রতিনিধি পণ্য ডেলিভারি প্রদান করবেন।
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href="tel:+8801700000000"
            className="w-full py-3 px-4 bg-[#FAF6EF] text-[#7A0016] border border-[#7A0016] rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#7A0016] hover:text-white transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>অর্ডার ট্র্যাকিং হটলাইন: ০১৭০০-০০০০০০</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#7A0016] text-white rounded-xl font-bold text-xs hover:bg-[#5A0010] shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>আরো কেনাকাটা করুন</span>
          </button>
        </div>

      </div>
    </div>
  );
};
