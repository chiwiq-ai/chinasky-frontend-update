import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, RefreshCw, Truck, CreditCard, MapPin, Check } from 'lucide-react';
import { orders, formatPrice } from '../data/products';
import { AccountLayout } from './DashboardPage';

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = orders.find(o => o.id === id) || orders[0];
  const isDelivered = order.status === 'Delivered';

  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = 1500;
  const totalPaid = subtotal + deliveryFee;

  return (
    <AccountLayout>
      <div className="order-detail-header">
        <div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 4 }}>
            Order #{order.id}
          </div>
          <h1>Order Details</h1>
          <div className="date">Placed on {order.date}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '8px 16px', border: '1px solid var(--gray-300)', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Download size={14} /> Download Invoice
          </button>
          <button style={{ padding: '8px 16px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            <RefreshCw size={14} /> Reorder All
          </button>
        </div>
      </div>

      <div className={`status-bar ${isDelivered ? 'delivered' : 'in-progress'}`}>
        <Check size={18} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>
            Status: {isDelivered ? 'Delivered' : 'Out for Delivery'}
          </div>
          <div style={{ fontSize: 12 }}>
            {isDelivered ? 'Handed to resident at front door' : 'Arriving today by 4:30 PM'}
          </div>
        </div>
        {!isDelivered && (
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: '70%' }} />
          </div>
        )}
      </div>

      <div className="order-detail-content">
        <div className="order-detail-main">
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Items ({order.items.length})</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th style={{ textAlign: 'right' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td>
                    <div className="product-cell">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>SKU: CS-{String(i).padStart(3, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td>{item.qty}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatPrice(item.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button style={{ width: '100%', padding: 12, border: '1px solid var(--gray-300)', borderRadius: 8, fontSize: 14, fontWeight: 600, background: '#fff', marginTop: 16 }}>
            Back to Orders
          </button>
        </div>

        <div className="order-detail-sidebar">
          <div className="sidebar-card">
            <h3><Truck size={16} style={{ color: 'var(--primary)' }} /> Delivery Information</h3>
            <div className="info">
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{order.deliveryInfo.name}</div>
              <div>{order.deliveryInfo.address}</div>
              <div>{order.deliveryInfo.phone}</div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 600 }}>
                <Truck size={14} /> {order.deliveryInfo.method}
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3><CreditCard size={16} style={{ color: 'var(--primary)' }} /> Payment Summary</h3>
            <div className="info">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Visa ending in {order.payment.ending}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14 }}>
                <span style={{ color: 'var(--gray-500)' }}>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 14 }}>
                <span style={{ color: 'var(--gray-500)' }}>Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 18, fontWeight: 800, borderTop: '1px solid var(--gray-200)', marginTop: 8 }}>
                <span>Total Paid</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(totalPaid)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
