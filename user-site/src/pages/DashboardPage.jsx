import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { LayoutGrid, Package, MapPin, Heart, LogOut, User, Mail, Phone, Shield, ArrowRight, Monitor, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import navConfig from '../config/navigation.json';

function AccountLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  const navItems = navConfig.accountNav.map(item => ({
    ...item,
    icon: Icons[item.icon] || Icons.Circle,
  }));

  return (
    <div className="account-page">
      <aside className="account-sidebar">
        <div className="account-user">
          <div className="account-avatar">{user?.name?.[0] || 'H'}</div>
          <div className="name">{user?.name || 'Hawkeye'}</div>
        </div>
        <nav className="account-nav">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={path === item.to ? 'active' : ''}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
          <button onClick={() => { logout(); window.location.href = '/'; }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      <div className="account-main">{children}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const userName = user?.name || 'Hawkeye';

  return (
    <AccountLayout>
      <div className="dashboard-welcome">
        <h1>Welcome back, {userName}</h1>
        <p>You have 2 active orders in progress</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3><User size={16} style={{ color: 'var(--primary)' }} /> Profile Overview</h3>
          <div className="info-row"><User size={14} className="icon" /> {userName}</div>
          <div className="info-row"><Mail size={14} className="icon" /> {user?.email || 'a.chen@example.com'}</div>
          <div className="info-row"><Phone size={14} className="icon" /> {user?.phone || '+1(555)234-5678'}</div>
          <a href="#" className="manage-link" onClick={(e) => { e.preventDefault(); setShowProfileModal(true); }}>
            Manage Profile Info <ArrowRight size={14} />
          </a>
        </div>

        <div className="dashboard-card">
          <h3><MapPin size={16} style={{ color: 'var(--primary)' }} /> Shipping</h3>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Home</div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.5 }}>
            1068 Johnson St, Apt 432<br />
            Okeogundipe, AB1016<br />
            Nigeria
          </div>
          <Link to="/account/addresses" className="manage-link">
            Edit Address Book <ArrowRight size={14} />
          </Link>
        </div>

        <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
          <h3><Shield size={16} style={{ color: 'var(--primary)' }} /> Account Security</h3>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Password</div>
            <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>Last changed 3 months ago. We recommend changing it every 6 months.</div>
            <a href="#" className="manage-link" onClick={(e) => { e.preventDefault(); setShowPasswordModal(true); }}>
              Update Password <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>Active Sessions</h3>
          <button style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none' }}>Log out of all devices</button>
        </div>
        <div className="session-item">
          <Monitor size={18} style={{ color: 'var(--gray-400)' }} />
          <div>
            <div className="device">MacBook Pro — New York, USA</div>
            <div className="location">Current Session</div>
          </div>
        </div>
        <div className="session-item">
          <Smartphone size={18} style={{ color: 'var(--gray-400)' }} />
          <div>
            <div className="device">iPhone 14 — New York, USA</div>
            <div className="location">Safari/iOS · 2 hours ago</div>
          </div>
          <button className="remove-btn">Remove</button>
        </div>
      </div>

      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <p>Permanently delete your account. There is no going back. Please be certain.</p>
        <button className="delete-btn">Delete Account</button>
      </div>

      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Manage Profile Info</h2>
              </div>
              <button onClick={() => setShowProfileModal(false)} style={{ fontSize: 20 }}>×</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div className="account-avatar" style={{ width: 64, height: 64, fontSize: 24, margin: '0 auto' }}>
                {userName[0]}
              </div>
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input className="form-input" defaultValue={userName} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input className="form-input" defaultValue={user?.email || 'michael.chen@chinasky.com'} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input className="form-input" defaultValue={user?.phone || '+1(555)012-3456'} />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowProfileModal(false)}>Cancel</button>
              <button className="save-btn" onClick={() => setShowProfileModal(false)}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Update Password</h2>
                <p>Please enter your current password and choose a new one</p>
              </div>
              <button onClick={() => setShowPasswordModal(false)} style={{ fontSize: 20 }}>×</button>
            </div>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" className="form-input" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-input" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" className="form-input" />
            </div>
            <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: 12, fontSize: 12, color: 'var(--gray-500)', marginBottom: 16 }}>
              <strong>Security Requirements:</strong>
              <ul style={{ listStyle: 'disc', paddingLeft: 16, marginTop: 8 }}>
                <li>Minimum 8 characters</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button className="save-btn" onClick={() => setShowPasswordModal(false)}>Update Password</button>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}

export { AccountLayout };
