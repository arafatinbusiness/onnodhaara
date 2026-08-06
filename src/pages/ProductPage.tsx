import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductSizeOption, CartItem, OrderDetails } from '../types';
import { ProductDetailPage } from '../components/ProductDetailPage';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckoutDrawer } from '../components/CheckoutDrawer';
import { OrderSuccessModal } from '../components/OrderSuccessModal';

interface ProductPageProps {
  products: Product[];
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (product: Product, selectedSize: ProductSizeOption, quantity?: number) => void;
  handleDirectOrder: (product: Product, selectedSize: ProductSizeOption, quantity?: number) => void;
  handleUpdateQuantity: (index: number, newQty: number) => void;
  handleRemoveItem: (index: number) => void;
  handleClearCart: () => void;
  handleCompleteOrder: (orderDetails: OrderDetails) => void;
  completedOrder: OrderDetails | null;
  setCompletedOrder: React.Dispatch<React.SetStateAction<OrderDetails | null>>;
  announcementText: string;
  helplineNumber: string;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductPage({
  products, cartItems, setCartItems,
  isCartOpen, setIsCartOpen,
  handleAddToCart, handleDirectOrder, handleUpdateQuantity, handleRemoveItem, handleClearCart,
  handleCompleteOrder, completedOrder, setCompletedOrder,
  announcementText, helplineNumber,
  isAdminModalOpen, setIsAdminModalOpen,
}: ProductPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleScrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#7A0016] mb-4">পণ্যটি পাওয়া যায়নি</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-[#7A0016] text-white px-6 py-2 rounded-xl hover:bg-[#5A0010] cursor-pointer"
          >
            হোম পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#2C221E] font-sans flex flex-col selection:bg-[#7A0016] selection:text-amber-50">
      <AnnouncementBar text={announcementText} phone={helplineNumber} />

      <Header
        products={products}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory="all"
        onSelectCategory={() => navigate('/')}
        onSelectProduct={(p) => navigate(`/product/${p.id}`)}
        onScrollToSection={handleScrollToSection}
        helplineNumber={helplineNumber}
      />

      <main className="flex-1">
        <ProductDetailPage
          product={product}
          allProducts={products}
          onBack={() => navigate('/')}
          onSelectProduct={(p) => navigate(`/product/${p.id}`)}
          onAddToCart={handleAddToCart}
          onDirectOrder={handleDirectOrder}
          onOpenCart={() => setIsCartOpen(true)}
          helplineNumber={helplineNumber}
        />
      </main>

      <Footer
        onSelectCategory={() => navigate('/')}
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