import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Product, ProductCategory, ProductSizeOption, CartItem, OrderDetails } from './types';
import { PRODUCTS } from './data/products';
import { fetchProducts, fetchOrders, fetchSettings, saveAllProducts, saveAllOrders, saveSettings, addProduct, updateProduct, deleteProduct, addOrder, updateOrderStatus, deleteOrder } from './firebase/services';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import AdminPage from './pages/AdminPage';

export default function App() {
  // Products state (Firestore + Local Storage)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('onnodhara_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Normalize old cached products that may lack sizeOptions
        return parsed.map((p: any) => ({
          ...p,
          sizeOptions: p.sizeOptions || [],
        }));
      }
    } catch (e) {
      console.error('Failed loading products from localStorage', e);
    }
    return PRODUCTS;
  });

  // Orders state (Firestore + Local Storage)
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('onnodhara_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed loading orders from localStorage', e);
    }
    return [];
  });

  // Store Announcement & Helpline state
  const [announcementText, setAnnouncementText] = useState(() => {
    return localStorage.getItem('onnodhara_announcement') || 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি | ১০০% প্রাকৃতিক উপাদান';
  });

  const [helplineNumber, setHelplineNumber] = useState(() => {
    const stored = localStorage.getItem('onnodhara_helpline');
    const dummy = ['০১৭০০-০০০০০০', '01700000000', '8801700000000', '017000000000', '০১৭০০০০০০০০', '0170000000'];
    return stored && !dummy.includes(stored) ? stored : '01330492979';
  });

  // Coupons state
  const [coupons, setCoupons] = useState<{ code: string; type: 'percent' | 'flat'; value: number }[]>(() => {
    try {
      const saved = localStorage.getItem('onnodhara_coupons');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { code: 'ONNODHARA10', type: 'percent', value: 10 },
      { code: 'HEALTH50', type: 'flat', value: 50 },
    ];
  });

  // Cart, Page & Modal UI States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('onnodhara_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed saving products to localStorage', e);
    }
  }, [products]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('onnodhara_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed saving orders to localStorage', e);
    }
  }, [orders]);

  // Firebase Initial Load - Fetch data from Firestore on app mount
  useEffect(() => {
    const loadFromFirebase = async () => {
      try {
        const fbProducts = await fetchProducts();
        if (fbProducts.length > 0) {
          setProducts(fbProducts);
          localStorage.setItem('onnodhara_products', JSON.stringify(fbProducts));
        }

        const fbOrders = await fetchOrders();
        if (fbOrders.length > 0) {
          setOrders(fbOrders);
          localStorage.setItem('onnodhara_orders', JSON.stringify(fbOrders));
        }

        const fbSettings = await fetchSettings();
        setAnnouncementText(fbSettings.announcementText);
        setHelplineNumber(fbSettings.helplineNumber);
        setCoupons(fbSettings.coupons);
        localStorage.setItem('onnodhara_announcement', fbSettings.announcementText);
        localStorage.setItem('onnodhara_helpline', fbSettings.helplineNumber);
        localStorage.setItem('onnodhara_coupons', JSON.stringify(fbSettings.coupons));
      } catch (error) {
        console.error('Failed to load from Firebase, using local data:', error);
      }
    };

    loadFromFirebase();
  }, []);

  // Add item to cart
  const handleAddToCart = (
    product: Product,
    selectedSize: ProductSizeOption,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize.value === selectedSize.value
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize, quantity }];
      }
    });
  };

  // Direct Order trigger (adds item & opens checkout drawer)
  const handleDirectOrder = (
    product: Product,
    selectedSize: ProductSizeOption,
    quantity: number = 1
  ) => {
    handleAddToCart(product, selectedSize, quantity);
    setIsCartOpen(true);
  };

  // Cart Handlers
  const handleUpdateQuantity = (index: number, newQty: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Complete Order - saves to Firestore
  const handleCompleteOrder = (orderDetails: OrderDetails) => {
    setOrders((prev) => [orderDetails, ...prev]);
    setCompletedOrder(orderDetails);
    setCartItems([]);
    setIsCartOpen(false);
    // Save order to Firestore
    addOrder(orderDetails);
  };

  // Admin Product Actions - update both React state AND Firestore
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    addProduct(newProduct);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    updateProduct(updatedProduct);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    deleteProduct(productId);
  };

  const handleResetProducts = () => {
    if (confirm('Are you sure you want to clear all products? This cannot be undone.')) {
      setProducts([]);
      localStorage.setItem('onnodhara_products', JSON.stringify([]));
    }
  };

  // Admin Order Actions
  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, notes: `স্ট্যাটাস: ${status}` } : o))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
  };

  const handleAddSampleOrder = () => {
    if (products.length === 0) return;
    const p = products[0];
    const sampleOrder: OrderDetails = {
      orderId: 'ONN-' + Math.floor(100000 + Math.random() * 900000),
      customerName: 'তানভীর আহমেদ',
      customerPhone: '01711223344',
      deliveryArea: 'inside_dhaka',
      fullAddress: 'রোড ৪, হাউজ ১২, ধানমণ্ডি, ঢাকা',
      notes: 'অর্ডার দ্রুত পাঠান প্লিজ',
      paymentMethod: 'cod',
      items: [
        {
          product: p,
          selectedSize: (p.sizeOptions && p.sizeOptions.length > 0)
            ? p.sizeOptions[0]
            : { label: '১ টি', value: '1pc', price: p.price },
          quantity: 2,
        },
      ],
      subtotal: p.price * 2,
      deliveryFee: 70,
      discount: 0,
      total: p.price * 2 + 70,
      orderDate: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
    setOrders((prev) => [sampleOrder, ...prev]);
  };

  // Admin Settings Actions
  const handleUpdateAnnouncement = (text: string) => {
    setAnnouncementText(text);
    localStorage.setItem('onnodhara_announcement', text);
  };

  const handleUpdateHelpline = (phone: string) => {
    setHelplineNumber(phone);
    localStorage.setItem('onnodhara_helpline', phone);
  };

  const handleAddCoupon = (coupon: { code: string; type: 'percent' | 'flat'; value: number }) => {
    const updated = [coupon, ...coupons];
    setCoupons(updated);
    localStorage.setItem('onnodhara_coupons', JSON.stringify(updated));
  };

  const handleDeleteCoupon = (code: string) => {
    const updated = coupons.filter((c) => c.code !== code);
    setCoupons(updated);
    localStorage.setItem('onnodhara_coupons', JSON.stringify(updated));
  };

    const sharedProps = {
      cartItems, setCartItems,
      isCartOpen, setIsCartOpen,
      isAdminModalOpen, setIsAdminModalOpen,
      handleAddToCart, handleDirectOrder,
      handleUpdateQuantity, handleRemoveItem, handleClearCart,
      handleCompleteOrder, completedOrder, setCompletedOrder,
      announcementText, helplineNumber,
    };

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <HomePage
              products={products}
              setProducts={setProducts}
              orders={orders}
              setOrders={setOrders}
              announcementText={announcementText}
              setAnnouncementText={setAnnouncementText}
              helplineNumber={helplineNumber}
              setHelplineNumber={setHelplineNumber}
              coupons={coupons}
              setCoupons={setCoupons}
              cartItems={cartItems}
              setCartItems={setCartItems}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              isAdminModalOpen={isAdminModalOpen}
              setIsAdminModalOpen={setIsAdminModalOpen}
              handleAddToCart={handleAddToCart}
              handleDirectOrder={handleDirectOrder}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
              handleClearCart={handleClearCart}
              handleCompleteOrder={handleCompleteOrder}
              handleAddProduct={handleAddProduct}
              handleUpdateProduct={handleUpdateProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleResetProducts={handleResetProducts}
              handleUpdateOrderStatus={handleUpdateOrderStatus}
              handleDeleteOrder={handleDeleteOrder}
              handleAddSampleOrder={handleAddSampleOrder}
              handleUpdateAnnouncement={handleUpdateAnnouncement}
              handleUpdateHelpline={handleUpdateHelpline}
              handleAddCoupon={handleAddCoupon}
              handleDeleteCoupon={handleDeleteCoupon}
              completedOrder={completedOrder}
              setCompletedOrder={setCompletedOrder}
            />
          } />
          <Route path="/product/:id" element={
            <ProductPage
              products={products}
              cartItems={cartItems}
              setCartItems={setCartItems}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              handleAddToCart={handleAddToCart}
              handleDirectOrder={handleDirectOrder}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
              handleClearCart={handleClearCart}
              handleCompleteOrder={handleCompleteOrder}
              completedOrder={completedOrder}
              setCompletedOrder={setCompletedOrder}
              announcementText={announcementText}
              helplineNumber={helplineNumber}
              isAdminModalOpen={isAdminModalOpen}
              setIsAdminModalOpen={setIsAdminModalOpen}
            />
          } />
          <Route path="/admin" element={
            <AdminPage
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
              onResetProducts={handleResetProducts}
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onDeleteOrder={handleDeleteOrder}
              announcementText={announcementText}
              onUpdateAnnouncement={handleUpdateAnnouncement}
              helplineNumber={helplineNumber}
              onUpdateHelpline={handleUpdateHelpline}
              coupons={coupons}
              onAddCoupon={handleAddCoupon}
              onDeleteCoupon={handleDeleteCoupon}
            />
          } />
        </Routes>
      </BrowserRouter>
    );
}