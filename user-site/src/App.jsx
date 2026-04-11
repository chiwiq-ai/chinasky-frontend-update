import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartOverlay from './components/overlays/CartOverlay';
import AddToCartToast from './components/overlays/AddToCartToast';
import ChatWidget from './components/overlays/ChatWidget';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AddressBookPage from './pages/AddressBookPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/checkout" element={<><Header /><CheckoutPage /><Footer /></>} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/account" element={<><Header /><DashboardPage /><Footer /></>} />
            <Route path="/account/orders" element={<><Header /><OrdersPage /><Footer /></>} />
            <Route path="/account/orders/:id" element={<><Header /><OrderDetailPage /><Footer /></>} />
            <Route path="/account/addresses" element={<><Header /><AddressBookPage /><Footer /></>} />
            <Route path="/products" element={<><Header /><ProductsPage /><Footer /></>} />
            <Route path="/products/:id" element={<><Header /><ProductDetailPage /><Footer /></>} />
            <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
          </Routes>
          <CartOverlay />
          <AddToCartToast />
          <ChatWidget />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
