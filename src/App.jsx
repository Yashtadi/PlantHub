import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { CouponBanner } from './components/CouponBanner';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { OrderDetailPage } from './components/OrderDetailPage';
import { AuthPage } from './components/AuthPage';
import { PlantGuidePage } from './components/PlantGuidePage';
import { CareGuidePage } from './components/CareGuidePage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { Toaster } from './components/Toaster';

const AppContent = () => {
  const { currentPage } = useApp();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Header />
      <CouponBanner />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'product-detail' && <ProductDetailPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'checkout' && <CheckoutPage />}
      {currentPage === 'orders' && <OrderHistoryPage />}
      {currentPage === 'order-detail' && <OrderDetailPage />}
      {currentPage === 'auth' && <AuthPage />}
      {currentPage === 'subscription' && <SubscriptionPage />}
      {currentPage === 'plant-guide' && <PlantGuidePage />}
      {currentPage === 'care-guide' && <CareGuidePage />}
      <Toaster />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
