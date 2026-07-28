export type ProductCategory = 'all' | 'oats' | 'tea' | 'superfood' | 'honey' | 'combo';

export interface ProductSizeOption {
  label: string; // e.g. "৫০০ গ্রাম" or "১ কেজি"
  value: string; // e.g. "500g" or "1kg"
  price: number; // e.g. 480
  originalPrice?: number;
}

export interface Product {
  id: string;
  title: string; // Bengali title
  titleEn: string;
  category: ProductCategory;
  price: number; // Default base price in BDT
  originalPrice?: number;
  sizeOptions: ProductSizeOption[];
  rating: number;
  reviewsCount: number;
  badge?: string; // e.g., "100% WHOLE GRAIN", "30 SACHETS", "BEST SELLER"
  badgeColor?: 'burgundy' | 'gold' | 'green';
  image: string;
  quickBenefits: string[]; // e.g. ["High Fiber", "Heart Healthy"]
  description: string;
  nutritionFacts?: {
    servingSize: string;
    calories: string;
    protein: string;
    fiber: string;
    carbs: string;
    fat: string;
  };
  ingredients?: string[];
  inStock: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSizeOption;
  quantity: number;
}

export interface CategoryItem {
  id: ProductCategory;
  name: string;
  nameEn: string;
  subtitle: string;
  itemCount: number;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productTitle: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryArea: 'inside_dhaka' | 'outside_dhaka';
  fullAddress: string;
  notes?: string;
  paymentMethod: 'cod' | 'bkash';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  orderDate: string;
}
