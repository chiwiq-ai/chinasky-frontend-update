import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
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
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
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
            {/* Auth routes (no header/footer) */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyOTPPage />} />

            {/* Protected routes */}
            <Route path="/checkout" element={<ProtectedRoute><Header /><CheckoutPage /><Footer /></ProtectedRoute>} />
            <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Header /><DashboardPage /><Footer /></ProtectedRoute>} />
            <Route path="/account/orders" element={<ProtectedRoute><Header /><OrdersPage /><Footer /></ProtectedRoute>} />
            <Route path="/account/orders/:id" element={<ProtectedRoute><Header /><OrderDetailPage /><Footer /></ProtectedRoute>} />
            <Route path="/account/addresses" element={<ProtectedRoute><Header /><AddressBookPage /><Footer /></ProtectedRoute>} />

            {/* Public routes */}
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
