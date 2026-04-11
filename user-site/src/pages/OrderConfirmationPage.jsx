import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Download, ShoppingCart, Package, Truck, Home, Check } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="confirmation-page">
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--gray-500)', fontSize: 14, marginBottom: 24 }}>
        <ArrowLeft size={16} /> Return Home
      </Link>

      <div className="confirmation-header">
        <div className="confirmation-check">
          <CheckCircle size={32} />
        </div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. We've received your order and are getting it ready for shipment.</p>
      </div>

      <div className="confirmation-content">
        <div className="confirmation-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Order Summary</h2>
              <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Order #CRS-09184-JL</span>
            </div>
          </div>

          <div style={{ background: 'var(--gray-50)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div className="confirmation-details-grid">
              <div>
                <div style={{ color: 'var(--gray-400)', fontSize: 12, marginBottom: 4 }}>SHIPPING DETAILS</div>
                <div style={{ fontWeight: 600 }}>Hawkeye</div>
                <div style={{ color: 'var(--gray-500)' }}>898 Prosperity Ave, Suite 100</div>
                <div style={{ color: 'var(--gray-500)' }}>Okeogundipe, 94937</div>
                <div style={{ color: 'var(--gray-500)' }}>+234 803 123 4567</div>
              </div>
              <div>
                <div style={{ color: 'var(--gray-400)', fontSize: 12, marginBottom: 4 }}>PAYMENT DETAILS</div>
                <div style={{ fontWeight: 600 }}>Bank Transfer</div>
                <div style={{ color: 'var(--gray-500)' }}>Status: Verified</div>
                <div style={{ color: 'var(--gray-500)' }}>Placed: Oct 24, 2023 · 14:32 WAT</div>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Items Ordered</h3>
          {[
            { name: 'Organic Bok Choy', price: 45000, qty: 1, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100' },
            { name: 'Cantonese Roast Duck', price: 102500, qty: 1, image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=100' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
              <img src={item.image} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Qty: {item.qty}</div>
              </div>
              <div style={{ fontWeight: 700 }}>₦{item.price.toLocaleString()}</div>
            </div>
          ))}

          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <div style={{ fontSize: 14, color: 'var(--gray-500)' }}>Subtotal: ₦102,500</div>
            <div style={{ fontSize: 14, color: 'var(--gray-500)' }}>Delivery (Doorstep Delivery): ₦3,500</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}>TOTAL: ₦106,000</div>
          </div>
        </div>

        <div className="confirmation-sidebar">
          <div className="delivery-progress">
            <h3>Delivery Progress</h3>
            <div className="progress-steps">
              <div className="progress-step done">
                <div className="dot" />
                <div>
                  <div className="label">Order Confirmed</div>
                </div>
              </div>
              <div className="progress-step active">
                <div className="dot" />
                <div>
                  <div className="label">Picking & Packing</div>
                </div>
              </div>
              <div className="progress-step">
                <div className="dot" />
                <div>
                  <div className="label">Out for Delivery</div>
                </div>
              </div>
              <div className="progress-step">
                <div className="dot" />
                <div>
                  <div className="label">Delivered</div>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <button><Download size={16} /> Download Receipt</button>
            <button className="primary" onClick={() => window.location.href = '/'}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
