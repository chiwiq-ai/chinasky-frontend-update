import { useState } from 'react';
import { MapPin, Home, Building2, Plus, Edit3, Trash2 } from 'lucide-react';
import { AccountLayout } from './DashboardPage';

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', name: 'Hawkeye', address: '1068 Johnson St, Apt 432', city: 'Okeogundipe', postal: 'AB1016', phone: '+234 803 123 4567', isDefault: true },
    { id: 2, type: 'Office', name: 'Hawkeye', address: '1068 Johnson St, Apt 432', city: 'Okeogundipe', postal: 'AB1016', phone: '+234 803 123 4567', isDefault: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ type: 'Home', name: '', phone: '', address: '', city: '', postal: '', isDefault: false });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openNew = () => {
    setEditId(null);
    setForm({ type: 'Home', name: '', phone: '', address: '', city: '', postal: '', isDefault: false });
    setShowModal(true);
  };

  const openEdit = (addr) => {
    setEditId(addr.id);
    setForm(addr);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editId) {
      setAddresses(prev => prev.map(a => a.id === editId ? { ...form, id: editId } : a));
    } else {
      setAddresses(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AccountLayout>
      <div className="address-header">
        <div>
          <h1>Saved Addresses</h1>
          <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Manage your shipping and billing locations for faster checkout</p>
        </div>
        <button className="add-address-btn" onClick={openNew}>
          <Plus size={16} /> Add New Address
        </button>
      </div>

      <div className="address-grid">
        {addresses.map(addr => (
          <div className={`address-card ${addr.isDefault ? 'default' : ''}`} key={addr.id}>
            <div className="address-card-header">
              <div className="address-type">
                <span className="icon">
                  {addr.type === 'Home' ? <Home size={16} /> : <Building2 size={16} />}
                </span>
                {addr.type}
              </div>
              {addr.isDefault && <span className="default-badge">Default</span>}
            </div>
            <div className="name">{addr.name}</div>
            <div className="address-text">
              {addr.address}<br />
              {addr.city}, {addr.postal}<br />
              Nigeria
            </div>
            <div className="address-card-actions">
              <button onClick={() => openEdit(addr)}>
                <Edit3 size={14} /> Edit
              </button>
              <button onClick={() => handleDelete(addr.id)}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{editId ? 'Edit Address' : 'Add New Address'}</h2>
                <p>Enter your complete address for accurate delivery</p>
              </div>
              <button onClick={() => setShowModal(false)} style={{ fontSize: 20 }}>×</button>
            </div>

            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Address Type</div>
            <div className="type-toggle">
              <button className={form.type === 'Home' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'Home' })}>
                <Home size={14} /> Home
              </button>
              <button className={form.type === 'Office' ? 'active' : ''} onClick={() => setForm({ ...form, type: 'Office' })}>
                <Building2 size={14} /> Office
              </button>
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 000 000 0000" />
            </div>
            <div className="form-group">
              <label>Street Address *</label>
              <input className="form-input" name="address" value={form.address} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input className="form-input" name="city" value={form.city} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input className="form-input" name="postal" value={form.postal} onChange={handleChange} />
              </div>
            </div>

            <label className="default-check">
              <input type="checkbox" checked={form.isDefault} onChange={e => setForm({ ...form, isDefault: e.target.checked })} style={{ accentColor: 'var(--primary)' }} />
              Set as Default
            </label>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save Address</button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
