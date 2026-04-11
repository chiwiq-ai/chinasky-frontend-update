import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';

export default function CartOverlay() {
  const { items, updateQty, removeFromCart, subtotal, tax, total, count, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay-bg" onClick={() => setIsCartOpen(false)} />
      <div className="cart-panel">
        <div className="cart-header">
          <h3><ShoppingCart size={18} /> Your Cart ({count} Items)</h3>
          <button onClick={() => setIsCartOpen(false)}><X size={20} /></button>
        </div>

        <div className="cart-items">
          {items.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--gray-400)', padding: 40 }}>Your cart is empty</p>
          )}
          {items.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <div className="brand">{item.brand}</div>
                <div className="cart-item-qty">
                  <button onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, item.qty - 1)}><Minus size={14} /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={14} /></button>
                </div>
              </div>
              <div className="cart-item-price">{formatPrice(item.price * item.qty)}</div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="row"><span>Estimated Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="row total"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <button className="checkout-btn" onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
