import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, Package, MapPin, Heart, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orders, formatPrice } from '../data/products';
import { AccountLayout } from './DashboardPage';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const tabs = ['All Orders', 'In Progress', 'Completed'];

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'all') return true;
    if (activeTab === 'In Progress') return o.status === 'In Progress';
    if (activeTab === 'Completed') return o.status === 'Delivered';
    return true;
  });

  return (
    <AccountLayout>
      <div className="orders-header">
        <div>
          <h1>Order History</h1>
          <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Track, manage and reorder your favorite groceries from China Sky</p>
        </div>
      </div>

      <div className="orders-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={activeTab === tab || (activeTab === 'all' && tab === 'All Orders') ? 'active' : ''}
            onClick={() => setActiveTab(tab === 'All Orders' ? 'all' : tab)}
          >
            {tab}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
            <input placeholder="Search by order # or product" className="orders-search-input" />
          </div>
        </div>
      </div>

      {filteredOrders.map(order => (
        <div className="order-card" key={order.id}>
          <div className="order-card-header">
            <div>
              <span className="order-id">#{order.id}</span>
              <span className="order-date" style={{ marginLeft: 16 }}>{order.date}</span>
              <span className="order-total" style={{ marginLeft: 16 }}>{formatPrice(order.total)}</span>
            </div>
            <span className={`order-status ${order.status === 'Delivered' ? 'delivered' : 'in-progress'}`}>
              {order.status === 'Delivered' ? '✓ Delivered' : '⏳ ' + order.status}
            </span>
          </div>

          <div className="order-images">
            {order.items.map((item, i) => (
              <img key={i} src={item.image} alt={item.name} />
            ))}
            <span style={{ fontSize: 13, color: 'var(--gray-500)', alignSelf: 'center' }}>
              {order.items.length} items
            </span>
          </div>

          <div className="order-card-actions">
            <button className="view-btn" onClick={() => navigate(`/account/orders/${order.id}`)}>View Order Details</button>
            <button className="reorder-btn">Reorder Now</button>
          </div>
        </div>
      ))}

      {filteredOrders.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)' }}>
          No orders found.
        </div>
      )}

      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </AccountLayout>
  );
}
