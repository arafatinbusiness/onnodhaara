import { useState } from 'react';
import { Product, ProductCategory, ProductSizeOption, CartItem, OrderDetails } from '../types';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TrustBadgesStrip } from '../components/TrustBadgesStrip';
import { CollectionCategoryCards } from '../components/CollectionCategoryCards';
import { BestSellersGrid } from '../components/BestSellersGrid';
import { BrandStorySection } from '../components/BrandStorySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { CheckoutDrawer } from '../components/CheckoutDrawer';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: OrderDetails[];
  setOrders: React.Dispatch<React.SetStateAction<OrderDetails[]>>;
  announcementText: string;
  setAnnouncementText: React.Dispatch<React.SetStateAction<string>>;
  helplineNumber: string;
  setHelplineNumber: React.Dispatch<React.SetStateAction<string>>;
  coupons: { code: string; type: 'percent' | 'flat'; value: number }[];
  setCoupons: React.Dispatch<React.SetStateAction<{ code: string; type: 'percent' | 'flat'; value: number }[]>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (product: Product, selectedSize: ProductSizeOption, quantity?: number) => void;
  handleDirectOrder: (product: Product, selectedSize: ProductSizeOption, quantity?: number) => void;
  handleUpdateQuantity: (index: number, newQty: number) => void;
  handleRemoveItem: (index: number) => void;
  handleClearCart: () => void;
  handleCompleteOrder: (orderDetails: OrderDetails) => void;
  handleAddProduct: (product: Product) => void;
  handleUpdateProduct: (product: Product) => void;
  handleDeleteProduct: (productId: string) => void;
  handleResetProducts: () => void;
  handleUpdateOrderStatus: (orderId: string, status: string) => void;
  handleDeleteOrder: (orderId: string) => void;
  handleAddSampleOrder: () => void;
  handleUpdateAnnouncement: (text: string) => void;
  handleUpdateHelpline: (phone: string) => void;
  handleAddCoupon: (coupon: { code: string; type: 'percent' | 'flat'; value: number }) => void;
  handleDeleteCoupon: (code: string) => void;
  completedOrder: OrderDetails | null;
  setCompletedOrder: React.Dispatch<React.SetStateAction<OrderDetails | null>>;
}

export default function HomePage({
  products, setProducts, orders, setOrders,
  announcementText, setAnnouncementText, helplineNumber, setHelplineNumber,
  coupons, setCoupons, cartItems, setCartItems,
  isCartOpen, setIsCartOpen, isAdminModalOpen, setIsAdminModalOpen,
  handleAddToCart, handleDirectOrder, handleUpdateQuantity, handleRemoveItem, handleClearCart,
  handleCompleteOrder, handleAddProduct, handleUpdateProduct, handleDeleteProduct,
  handleResetProducts, handleUpdateOrderStatus, handleDeleteOrder, handleAddSampleOrder,
  handleUpdateAnnouncement, handleUpdateHelpline, handleAddCoupon, handleDeleteCoupon,
  completedOrder, setCompletedOrder,
}: HomePageProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleScrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#2C221E] font-sans flex flex-col selection:bg-[#7A0016] selection:text-amber-50">
      <AnnouncementBar text={announcementText} phone={helplineNumber} />

      <Header
        products={products}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
        }}
        onSelectProduct={(product) => handleSelectProduct(product)}
        onScrollToSection={handleScrollToSection}
        helplineNumber={helplineNumber}
      />

      <main className="flex-1">
        <div id="hero">
          <HeroSection
            onOrderNow={() => {
              setSelectedCategory('all');
              handleScrollToSection('bestsellers');
            }}
            onExploreProducts={() => {
              setSelectedCategory('all');
              handleScrollToSection('bestsellers');
            }}
          />
        </div>

        <TrustBadgesStrip />

        <CollectionCategoryCards
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleScrollToSection('bestsellers');
          }}
          onScrollToProducts={() => handleScrollToSection('bestsellers')}
        />

        <BestSellersGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={(product, size) => handleAddToCart(product, size, 1)}
          onDirectOrder={(product, size) => handleDirectOrder(product, size, 1)}
          onQuickView={(product) => handleSelectProduct(product)}
        />

        <BrandStorySection />
        <TestimonialsSection />
      </main>

      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToSection('bestsellers');
        }}
        onScrollToSection={handleScrollToSection}
      />

      <MobileBottomNav
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToSection('bestsellers');
        }}
        onScrollToSection={handleScrollToSection}
      />

      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        allProducts={products}
        onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCompleteOrder={handleCompleteOrder}
      />

      <OrderSuccessModal
        orderDetails={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    </div>
  );
}
