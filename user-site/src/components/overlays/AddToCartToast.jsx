import { CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function AddToCartToast() {
  const { toast, setToast, setIsCartOpen } = useCart();

  if (!toast) return null;

  return (
    <div className="toast-notification">
      <CheckCircle size={24} className="toast-check" />
      <img src={toast.image} alt="" />
      <div className="toast-content">
        <h4>Item added to cart</h4>
        <p>{toast.name}</p>
        <div className="toast-actions">
          <a href="#" className="view-cart" onClick={(e) => { e.preventDefault(); setIsCartOpen(true); setToast(null); }}>VIEW CART</a>
          <Link to="/checkout" className="checkout" onClick={() => setToast(null)}>Checkout</Link>
        </div>
      </div>
      <button className="toast-close" onClick={() => setToast(null)}><X size={16} /></button>
    </div>
  );
}
