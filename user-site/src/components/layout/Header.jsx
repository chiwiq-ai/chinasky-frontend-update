import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, ChevronDown, X, Clock, Truck, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { products, categories, formatPrice } from '../../data/products';
import ProductCard from '../common/ProductCard';
import navConfig from '../../config/navigation.json';
import appConfig from '../../config/app.json';

export default function Header() {
  const { count, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCat, setActiveCat] = useState(0);
  const [specialTab, setSpecialTab] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const specialTabs = navConfig.specialTabs;
  const recentlyViewed = products.slice(0, 3);

  return (
    <>
      <div className="top-bar">
        {appConfig.topBarMessage}
      </div>
      <header className="main-header" ref={dropdownRef}>
        <div className="header-inner">
          <Link to="/" className="logo">
            <div className="logo-brand">
              <span className="logo-china">China</span>
              <span className="logo-sky">Sky</span>
            </div>
            <div className="logo-cart-icon">
              <ShoppingCart size={18} />
            </div>
            <div className="logo-chinese">中国天和市</div>
            <div className="logo-sub">SUPERMARKET</div>
          </Link>

          <div className="search-bar" style={{ position: 'relative' }}>
            <input
              placeholder="Search everything at China Sky"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            />
            <button><Search size={20} /></button>
            {searchFocused && (
              <div className="search-dropdown">
                <div className="search-section-title">Recent Searches</div>
                <div className="search-recent">
                  <Clock size={16} style={{ color: 'var(--gray-400)' }} />
                  Frozen Pork Buns
                  <X size={14} style={{ marginLeft: 'auto', color: 'var(--gray-400)' }} />
                </div>
                <div className="search-recent">
                  <Clock size={16} style={{ color: 'var(--gray-400)' }} />
                  Lao Gan Ma Chili Oil
                  <X size={14} style={{ marginLeft: 'auto', color: 'var(--gray-400)' }} />
                </div>
                <div className="search-section-title" style={{ marginTop: 8 }}>Suggested Products For You</div>
                {products.slice(11, 13).map(p => (
                  <div key={p.id} className="search-item" onClick={() => navigate(`/products/${p.id}`)}>
                    <img src={p.image} alt={p.name} />
                    <div className="search-item-info">
                      <h4>{p.name}</h4>
                      <p>{p.sizes?.[0]}</p>
                    </div>
                    <span className="search-item-price">{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="header-actions">
            <div style={{ position: 'relative' }}>
              <button onClick={() => {
                if (user) setProfileOpen(!profileOpen);
                else navigate('/signin');
              }}>
                <User size={24} />
              </button>
              {profileOpen && user && (
                <div className="profile-dropdown">
                  <Link to="/account" onClick={() => setProfileOpen(false)}>
                    <User size={16} /> My Account
                  </Link>
                  <button onClick={() => { logout(); setProfileOpen(false); navigate('/'); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
              <ShoppingCart size={24} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </div>
        </div>

        <nav className="nav-bar" style={{ position: 'relative' }}>
          <div className="nav-inner">
            <button className="nav-item" onClick={() => toggleDropdown('shop')}>
              <Menu size={18} /> Shop <ChevronDown size={14} />
            </button>
            <button className="nav-item" onClick={() => toggleDropdown('specials')}>
              Specials <ChevronDown size={14} />
            </button>
            <button className="nav-item" onClick={() => toggleDropdown('ways')}>
              Ways To Shop <ChevronDown size={14} />
            </button>
            <button className="nav-item" onClick={() => toggleDropdown('recent')}>
              Recently Viewed <ChevronDown size={14} />
            </button>
          </div>

          {activeDropdown === 'shop' && (
            <div className="dropdown-overlay">
              <div className="mega-menu">
                <div className="mega-menu-sidebar">
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gray-400)', padding: '8px 20px' }}>Shop by Category</div>
                  {categories.map((cat, i) => (
                    <button
                      key={cat.id}
                      className={`mega-cat-item ${i === activeCat ? 'active' : ''}`}
                      onMouseEnter={() => setActiveCat(i)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <div className="mega-content" style={{ position: 'relative' }}>
                  <h2>{categories[activeCat].name}</h2>
                  <div className="underline" />
                  <p>Curated high-quality {categories[activeCat].name.toLowerCase()} for the discerning kitchen. Sourced from local artisans and premium suppliers.</p>
                  <div className="mega-subcats">
                    {categories[activeCat].subcategories.map((sub, i) => (
                      <div key={i}>
                        <h4>{sub}</h4>
                        <ul>
                          <li onClick={() => { navigate('/products'); setActiveDropdown(null); }}>View All</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <button className="browse-all-btn" onClick={() => { navigate('/products'); setActiveDropdown(null); }}>Browse All</button>
                </div>
              </div>
              <button onClick={() => setActiveDropdown(null)} style={{ position: 'absolute', top: 16, right: 16, color: 'var(--gray-400)' }}><X size={20} /></button>
            </div>
          )}

          {activeDropdown === 'specials' && (
            <div className="dropdown-overlay">
              <div className="specials-dropdown">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div className="specials-tabs">
                    {specialTabs.map((tab, i) => (
                      <button key={i} className={i === specialTab ? 'active' : ''} onClick={() => setSpecialTab(i)}>{tab}</button>
                    ))}
                  </div>
                  <button className="browse-all-btn" style={{ position: 'static' }} onClick={() => { navigate('/products'); setActiveDropdown(null); }}>Browse All</button>
                </div>
                <div className="specials-grid">
                  {products.filter(p => p.oldPrice).slice(0, 3).map(p => (
                    <ProductCard key={p.id} product={p} onClick={() => { navigate(`/products/${p.id}`); setActiveDropdown(null); }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeDropdown === 'ways' && (
            <div className="dropdown-overlay">
              <div className="ways-dropdown">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Ways to Shop</h3>
                  <button onClick={() => setActiveDropdown(null)}><X size={20} style={{ color: 'var(--gray-400)' }} /></button>
                </div>
                <div className="ways-grid">
                  <div className="way-card">
                    <div className="icon"><Truck size={24} /></div>
                    <h4>Doorstep Delivery</h4>
                    <p>Right to your front door</p>
                  </div>
                  <div className="way-card">
                    <div className="icon"><Store size={24} /></div>
                    <h4>In-store Pickup</h4>
                    <p>Ready at our service desk</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDropdown === 'recent' && (
            <div className="dropdown-overlay">
              <div className="recently-dropdown">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Recently Viewed Items</h3>
                  <button onClick={() => setActiveDropdown(null)}><X size={20} style={{ color: 'var(--gray-400)' }} /></button>
                </div>
                <div className="recently-grid">
                  {recentlyViewed.map(p => (
                    <ProductCard key={p.id} product={p} onClick={() => { navigate(`/products/${p.id}`); setActiveDropdown(null); }} />
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <button className="browse-all-btn" style={{ position: 'static' }} onClick={() => { navigate('/products'); setActiveDropdown(null); }}>Browse All</button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
