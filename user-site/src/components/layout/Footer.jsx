import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import navConfig from '../../config/navigation.json';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-logo">
            <div className="logo-brand">
              <span className="logo-china">China</span>
              <span className="logo-sky">Sky</span>
            </div>
            <div className="logo-cart-icon">
              <ShoppingCart size={16} />
            </div>
            <div className="logo-chinese">中国天和市</div>
            <div className="logo-sub">SUPERMARKET</div>
          </div>
          <p className="footer-desc">
            Nigeria's #1 destination for premium essentials and luxury goods, delivered with speed and care.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            {navConfig.footer.shop.map(item => (
              <li key={item.label}><Link to={item.to}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            {navConfig.footer.support.map(item => (
              <li key={item.label}><a href={item.to}>{item.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 12 }}>Get updates on deals & promotions</p>
          <div className="newsletter-input">
            <input placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2024 ChinaSky. Built by Merchant Edition.</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
