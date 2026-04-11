import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Store, CreditCard, Building2, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CheckoutPage() {
  const { items, subtotal, tax, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('doorstep');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [form, setForm] = useState({
    fullName: '', phoneNumber: '', email: '', address: '', city: '', postalCode: '', state: 'Okeogundipe',
    cardNumber: '', expiry: '', cvv: '',
  });

  const deliveryFee = deliveryMethod === 'doorstep' ? 1500 : 0;
  const grandTotal = total + deliveryFee;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-steps">
        <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
          <span className="num">{step > 1 ? <Check size={14} /> : '1'}</span> Shipping
        </div>
        <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
          <span className="num">{step > 2 ? <Check size={14} /> : '2'}</span> Payment
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          {step === 1 && (
            <>
              <h2>Shipping Address</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Hawkeye" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-input" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input className="form-input" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="+234 800 000 0000" />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input className="form-input" name="address" value={form.address} onChange={handleChange} placeholder="898 Prosperity Ave, Suite 100" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input className="form-input" name="city" value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input className="form-input" name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="94937" />
                </div>
              </div>

              <h2 style={{ marginTop: 32 }}>Delivery Method</h2>
              <div className="delivery-methods">
                <div className={`delivery-method ${deliveryMethod === 'doorstep' ? 'active' : ''}`} onClick={() => setDeliveryMethod('doorstep')}>
                  <Truck size={24} style={{ color: 'var(--primary)' }} />
                  <h4>Doorstep Delivery</h4>
                  <p>Delivered within 3 days</p>
                  <div className="price">{formatPrice(1500)}</div>
                </div>
                <div className={`delivery-method ${deliveryMethod === 'pickup' ? 'active' : ''}`} onClick={() => setDeliveryMethod('pickup')}>
                  <Store size={24} style={{ color: 'var(--primary)' }} />
                  <h4>In-store Pickup</h4>
                  <p>Ready in 30 Minutes</p>
                  <div className="price" style={{ color: 'var(--green)' }}>FREE</div>
                </div>
              </div>

              <button className="continue-btn" onClick={() => setStep(2)}>
                Continue to Payment <ArrowRight size={18} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ display: 'flex', gap: 24, marginBottom: 24, fontSize: 13, color: 'var(--gray-500)' }}>
                <div><strong>Shipping to:</strong> {form.fullName || 'Hawkeye'}</div>
                <div><strong>Delivery Method:</strong> {deliveryMethod === 'doorstep' ? 'Doorstep Delivery' : 'In-store Pickup'}</div>
                <button style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 13, background: 'none', border: 'none' }} onClick={() => setStep(1)}>Change</button>
              </div>

              <h2>Payment Method</h2>
              <div className="payment-methods">
                <div className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
                  <div className="radio" />
                  <CreditCard size={20} /> Credit or Debit Card
                </div>
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input className="form-input" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input className="form-input" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input className="form-input" name="cvv" value={form.cvv} onChange={handleChange} placeholder="***" />
                      </div>
                    </div>
                  </div>
                )}

                <div className={`payment-method ${paymentMethod === 'stripe' ? 'active' : ''}`} onClick={() => setPaymentMethod('stripe')}>
                  <div className="radio" />
                  <span style={{ fontWeight: 600 }}>Stripe</span>
                </div>

                <div className={`payment-method ${paymentMethod === 'bank' ? 'active' : ''}`} onClick={() => setPaymentMethod('bank')}>
                  <div className="radio" />
                  <Building2 size={20} /> Bank Transfer
                </div>
              </div>

              <button className="continue-btn" onClick={handlePlaceOrder}>
                Place Order 🛒
              </button>
            </>
          )}
        </div>

        <div className="order-summary">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            {items.map(item => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <span className="summary-item-name">{item.name}</span>
                <span className="summary-item-price">{formatPrice(item.price)}</span>
              </div>
            ))}
            <div className="promo-input">
              <input placeholder="Promo code" />
              <button>Apply</button>
            </div>
            <div className="summary-totals">
              <div className="row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="row"><span>Delivery Fee</span><span>{formatPrice(deliveryFee)}</span></div>
              <div className="row"><span>Estimated Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="row total"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
