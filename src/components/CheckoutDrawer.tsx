import React, { useState } from 'react';
import { CartItem, OrderDetails, Product, ProductSizeOption } from '../types';
import { X, Trash2, ShoppingBag, Truck, ShieldCheck, Tag, Zap, AlertCircle, Sparkles, Plus, Check } from 'lucide-react';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  allProducts?: Product[];
  onAddToCart?: (product: Product, size: ProductSizeOption) => void;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onCompleteOrder: (orderDetails: OrderDetails) => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  allProducts = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCompleteOrder,
}) => {
  // Form States (NOTE: all hooks must be declared before any conditional return
  // to satisfy React's Rules of Hooks — otherwise the drawer fails to mount)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Hooks are fully declared above; safe to conditionally return now
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );

  const FREE_DELIVERY_THRESHOLD = 1000;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = isFreeDelivery ? 0 : (deliveryArea === 'inside_dhaka' ? 70 : 120);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  // Filter cross-sell add-ons from allProducts (not in cart)
  const cartProductIds = new Set(cartItems.map((item) => item.product.id));
  const addOnProducts = allProducts.filter((p) => !cartProductIds.has(p.id)).slice(0, 3);

  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponSuccess('');
    if (couponCode.trim().toUpperCase() === 'ONNODHARA10') {
      setDiscountPercent(10);
      setCouponSuccess('১০% ছাড় কুপন সফলভাবে যুক্ত হয়েছে!');
    } else {
      setCouponError('অবৈধ কুপন কোড! ONNODHARA10 চেষ্টা করুন।');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (cartItems.length === 0) {
      setValidationError('আপনার কার্ট খালি! অনুগ্রহ করে অন্তত একটি পণ্য যোগ করুন।');
      return;
    }

    if (!name.trim()) {
      setValidationError('অনুগ্রহ করে আপনার নাম লিখুন।');
      return;
    }

    // BD Phone validation regex (11 digits starting with 01)
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      setValidationError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 01XXXXXXXXX)');
      return;
    }

    if (!address.trim()) {
      setValidationError('অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderDetails: OrderDetails = {
        orderId: 'ONN-' + Math.floor(100000 + Math.random() * 900000),
        customerName: name.trim(),
        customerPhone: phone.trim(),
        deliveryArea,
        fullAddress: address.trim(),
        notes: notes.trim(),
        paymentMethod: 'cod',
        items: [...cartItems],
        subtotal,
        deliveryFee,
        discount: discountAmount,
        total: grandTotal,
        orderDate: new Date().toLocaleDateString('bn-BD', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      };

      setIsSubmitting(false);
      onCompleteOrder(orderDetails);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-lg bg-[#FFFDF7] h-full shadow-2xl flex flex-col justify-between overflow-hidden relative border-l border-[#E8DEC8]">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#7A0016] text-amber-50 flex items-center justify-between border-b border-[#5A0010]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h2 className="font-extrabold text-lg font-serif-bn text-amber-100">
              আপনার শপিং কার্ট ও অর্ডার
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* FREE SHIPPING PROGRESS BAR UPSELL */}
          <div className="p-3.5 bg-gradient-to-r from-amber-50 to-[#FAF6EF] rounded-2xl border border-amber-300/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#7A0016] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#7A0016]" />
                {isFreeDelivery ? (
                  <span className="text-emerald-800">🎉 অভিনন্দন! ফ্রি ডেলিভারি আনলক হয়েছে!</span>
                ) : (
                  <span>ফ্রি ডেলিভারির জন্য আর মাত্র ৳{FREE_DELIVERY_THRESHOLD - subtotal} টাকা</span>
                )}
              </span>
              <span className="font-mono font-bold text-[#7A0016]">{freeDeliveryProgress}%</span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden p-0.5 border border-amber-300/50">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFreeDelivery
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 animate-pulse'
                    : 'bg-gradient-to-r from-[#7A0016] to-amber-600'
                }`}
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E8DEC8]">
              <h3 className="font-bold text-sm text-[#2C221E] font-serif-bn">
                কার্ট আইটেমস ({cartItems.length})
              </h3>
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>সব মুছে ফেলুন</span>
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="py-12 text-center bg-[#FAF6EF] rounded-2xl border border-dashed border-[#E8DEC8]">
                <ShoppingBag className="w-12 h-12 text-[#7A0016]/30 mx-auto mb-2" />
                <p className="font-bold text-[#2C221E] text-sm">আপনার কার্ট খালি!</p>
                <p className="text-xs text-gray-500 mt-1">
                  আমাদের প্রোডাক্ট পেজ থেকে পছন্দের অর্গানিক আইটেম যোগ করুন।
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-3 bg-white rounded-2xl border border-[#E8DEC8] shadow-2xs relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-xl border border-[#E8DEC8]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="font-bold text-xs text-[#2C221E] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-[#7A0016] font-semibold mt-0.5">
                        সাইজ: {item.selectedSize.label}
                      </p>
                      <p className="text-xs font-mono font-bold text-[#7A0016] mt-1">
                        ৳ {item.selectedSize.price * item.quantity}
                      </p>
                    </div>

                    {/* Stepper & Delete */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex items-center rounded-lg bg-[#FAF6EF] border border-[#E8DEC8]">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-[#E8DEC8]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-[#7A0016]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-[#E8DEC8]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FREQUENTLY ADDED CART UPSELLS (CROSS-SELL) */}
          {addOnProducts.length > 0 && onAddToCart && (
            <div className="p-4 bg-[#FAF6EF] rounded-2xl border border-[#E8DEC8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#7A0016] font-serif-bn flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                  গ্রাহকরা সচরাচর এর সাথে যা কিনে থাকেন (Smart Add-ons)
                </span>
              </div>

              <div className="space-y-2">
                {addOnProducts.map((addProd) => {
                  const sizeOpt = addProd.sizeOptions?.[0] || { label: '১ টি', value: '1pc', price: addProd.price };
                  return (
                    <div
                      key={addProd.id}
                      className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#E8DEC8] text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <img
                          src={addProd.image}
                          alt={addProd.title}
                          className="w-10 h-10 object-cover rounded-lg shrink-0 border border-[#E8DEC8]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-[#2C221E] truncate">{addProd.title}</p>
                          <p className="text-[11px] font-mono font-bold text-[#7A0016]">৳{sizeOpt.price}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddToCart(addProd, sizeOpt)}
                        className="px-3 py-1.5 bg-[#7A0016]/10 hover:bg-[#7A0016] text-[#7A0016] hover:text-amber-50 rounded-lg font-extrabold text-[11px] transition-all shrink-0 flex items-center gap-1 cursor-pointer border border-[#7A0016]/20"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>অ্যাড করুন</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Checkout Form */}
          {cartItems.length > 0 && (
            <form onSubmit={handleSubmitOrder} className="space-y-4 pt-4 border-t border-[#E8DEC8]">
              
              <div className="flex items-center gap-2 text-[#7A0016] font-bold text-sm font-serif-bn">
                <Truck className="w-4 h-4" />
                <span>ক্যাশ অন ডেলিভারি অর্ডারের তথ্য দিন</span>
              </div>

              {validationError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">
                  আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ কামরুল ইসলাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">
                  মোবাইল নম্বর <span className="text-red-500">* (১১ ডিজিট)</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white text-xs font-mono rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                />
              </div>

              {/* Delivery Area Option */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">
                  ডেলিভারি এলাকা <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('inside_dhaka')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      deliveryArea === 'inside_dhaka'
                        ? 'bg-[#7A0016] text-white border-[#7A0016]'
                        : 'bg-white text-gray-700 border-[#D9C8B4]'
                    }`}
                  >
                    ঢাকার ভেতরে (৳৭০)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('outside_dhaka')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      deliveryArea === 'outside_dhaka'
                        ? 'bg-[#7A0016] text-white border-[#7A0016]'
                        : 'bg-white text-gray-700 border-[#D9C8B4]'
                    }`}
                  >
                    ঢাকার বাইরে (৳১২০)
                  </button>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-[#2C221E] mb-1">
                  পূর্ণাঙ্গ ঠিকানা <span className="text-red-500">* (বাসা/রোড/এলাকা/জেলা)</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="যেমন: বাসা ১২, রোড ৫, সেক্টর ৪, উত্তরা, ঢাকা"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white text-xs rounded-xl border border-[#D9C8B4] focus:outline-hidden focus:border-[#7A0016]"
                />
              </div>

              {/* Coupon Code Section */}
              <div className="bg-[#FAF6EF] p-3 rounded-2xl border border-[#E8DEC8]">
                <label className="block text-[11px] font-bold text-[#7A0016] mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>ডিসকাউন্ট কুপন প্রয়োগ করুন:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ONNODHARA10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white text-xs uppercase font-mono rounded-xl border border-[#D9C8B4]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 bg-[#7A0016] text-amber-50 font-bold text-xs rounded-xl hover:bg-[#5A0010] cursor-pointer"
                  >
                    এপ্লাই
                  </button>
                </div>
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-700 font-bold mt-1">{couponSuccess}</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">{couponError}</p>
                )}
              </div>

              {/* Cost Summary Table */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8DEC8] space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>পণ্যসমূহের মূল্য:</span>
                  <span className="font-mono font-bold">৳ {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-mono font-bold">৳ {deliveryFee}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>কুপন ছাড় (১০%):</span>
                    <span className="font-mono font-bold">- ৳ {discountAmount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#E8DEC8] flex justify-between text-sm font-extrabold text-[#7A0016]">
                  <span>সর্বমোট প্রদেয় টাকা (COD):</span>
                  <span className="font-mono text-base">৳ {grandTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#7A0016] to-[#5A0010] text-amber-50 rounded-2xl font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 border border-amber-300/30 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>প্রসেসিং হচ্ছে...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-current" />
                    <span>অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>পণ্য পাওয়ার পর মূল্য পরিশোধ করার ১০০% নিশ্চয়তা</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
