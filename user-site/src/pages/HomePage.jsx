import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Truck, ShieldCheck, Headphones, Leaf, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { formatPrice } from '../data/products';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/common/ProductCard';
import navConfig from '../config/navigation.json';

export default function HomePage() {
  const navigate = useNavigate();
  const [heroSlide, setHeroSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError('');
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productList, categoryList]) => {
        if (cancelled) return;
        setProducts(Array.isArray(productList) ? productList : []);
        setCategories(Array.isArray(categoryList) ? categoryList : []);
      })
      .catch(err => {
        if (cancelled) return;
        // Surface a real message instead of silently swallowing the failure.
        // eslint-disable-next-line no-console
        console.error('[HomePage] failed to load catalog', err);
        setLoadError(err?.message || 'We could not load the catalog. Please refresh.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const groceryProducts = products.filter(p => p.category === 'Groceries').slice(0, 4);
  const dealProducts = products.filter(p => p.oldPrice).slice(0, 4);
  const electronicsProducts = products.filter(p => p.category === 'Electronics & Gadgets' || p.category === 'Kitchen & Appliances');
  const discoverProducts = products.slice(5, 9);
  const sweetProducts = products.slice(9, 13);

  const trustItems = navConfig.trustItems.map(item => ({
    ...item,
    icon: Icons[item.icon] || Icons.Circle,
  }));

  const categoryImages = {
    'Groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
    'Fresh Produce': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200',
    'Electronics & Gadgets': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
    'Drinks & Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200',
    'Kitchen & Appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200',
    'Home & Living': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200',
    'Beauty & Personal Care': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200',
    'Baby & Kids': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200',
  };

  return (
    <main>
      {loadError && (
        <div role="alert" style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px 16px', textAlign: 'center', fontSize: 14 }}>
          {loadError}
        </div>
      )}
      {loading && !products.length && (
        <div style={{ padding: '12px 16px', textAlign: 'center', color: '#6B7280', fontSize: 13 }}>
          Loading fresh picks…
        </div>
      )}
      {/* ============ HERO CAROUSEL ============ */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Fresh from<br />the farm</h1>
            <p>Get the freshest produce, pantry staples, and household essentials delivered fast.</p>
            <button className="hero-btn" onClick={() => navigate('/products')}>
              Shop Essentials
            </button>
          </div>
          <div className="hero-images">
            <img src="/images/hero-tomatoes.png" alt="Fresh tomatoes in basket" className="hero-main-img" />
          </div>
          <div className="hero-nav-pill">
            <button className="hero-nav-arrow" onClick={() => setHeroSlide(prev => Math.max(0, prev - 1))} aria-label="Previous slide">
              <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button className="hero-nav-arrow" onClick={() => setHeroSlide(prev => Math.min(3, prev + 1))} aria-label="Next slide">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="trust-strip">
        <div className="trust-strip-inner">
          {trustItems.map((item, i) => (
            <div className="trust-item" key={i}>
              <div className="trust-icon">
                <item.icon size={20} />
              </div>
              <div>
                <div className="trust-label">{item.label}</div>
                <div className="trust-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SHOP OUR CATEGORIES ============ */}
      <section className="section-container">
        <h2 className="section-title">Shop our categories</h2>
        <div className="category-row">
          {categories.slice(0, 8).map(cat => (
            <div key={cat.id} className="category-item" onClick={() => navigate('/products')}>
              <div className="category-icon-img">
                {categoryImages[cat.name] ? (
                  <img src={categoryImages[cat.name]} alt={cat.name} className="cat-img" />
                ) : (
                  <div className="cat-placeholder" />
                )}
              </div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ EVERYDAY NIGERIAN EATS ============ */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Everyday Nigerian Eats</h2>
          <button className="see-all-btn" onClick={() => navigate('/products')}>See All →</button>
        </div>
        <div className="product-grid product-grid-4">
          {groceryProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ============ TODAY'S SWEET DEALS ============ */}
      <section className="deals-section">
        <div className="section-container">
          <div className="section-header">
            <div>
              <h2 className="section-title" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Today's Sweet Deals</h2>
              <div className="deals-timer">
                <Clock size={14} />
                <span>Ends in <strong>12:45:30</strong></span>
              </div>
            </div>
            <button className="see-all-btn" onClick={() => navigate('/products')}>See All →</button>
          </div>
          <div className="product-grid product-grid-4">
            {dealProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ============ PROMO BANNERS (2 cards side by side) ============ */}
      <section className="section-container">
        <div className="promo-banners">
          <div className="promo-card promo-card-food" onClick={() => navigate('/products')}>
            <div className="promo-card-img">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500" alt="Basket of fresh food" />
            </div>
            <div className="promo-card-text">
              <h3>Chinafory e Batter is for every kitchen</h3>
              <p>Explore our curated collection of authentic Asian ingredients and household essentials.</p>
            </div>
          </div>
          <div className="promo-card promo-card-kitchen" onClick={() => navigate('/products')}>
            <div className="promo-card-img">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500" alt="Kitchen appliances" />
            </div>
            <div className="promo-card-text">
              <h3>Kitchen & Appliances</h3>
              <p>Premium kitchen gadgets and appliances for the modern home chef.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ELECTRONICS & APPLIANCES ============ */}
      {electronicsProducts.length > 0 && (
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">Electronics & Appliances</h2>
            <button className="see-all-btn" onClick={() => navigate('/products')}>See All →</button>
          </div>
          <div className="product-grid product-grid-4">
            {electronicsProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ============ AWOOF ON SKINCARE / DISCOVER BANNER ============ */}
      <section className="skincare-banner-section">
        <div className="section-container">
          <div className="skincare-banner" onClick={() => navigate('/products')}>
            <div className="skincare-text">
              <h2>Awoof on Skincare</h2>
              <p>Unlock massive discounts on top-tier dermatological brands. Limited time warehouse clearance.</p>
              <button className="skincare-btn">
                Shop Now <ArrowRight size={16} />
              </button>
            </div>
            <div className="skincare-img">
              <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400" alt="Skincare beauty" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DISCOVER & EXPLORE ============ */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Discover & Explore</h2>
          <button className="see-all-btn" onClick={() => navigate('/products')}>See All →</button>
        </div>
        <div className="product-grid product-grid-4">
          {discoverProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ============ SWEET TREATS ============ */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Sweet Treats</h2>
          <button className="see-all-btn" onClick={() => navigate('/products')}>See All →</button>
        </div>
        <div className="product-grid product-grid-4">
          {sweetProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ============ FLAGSHIP STORE MAP ============ */}
      <section className="section-container map-section">
        <div className="section-header">
          <h2 className="section-title">
            <MapPin size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 8, color: 'var(--primary)' }} />
            Flagship Store Location
          </h2>
        </div>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-pin">
              <MapPin size={28} />
            </div>
            <div className="map-info">
              <h4>China Sky Supermarket</h4>
              <p>Wuse City Mall, Abuja, Nigeria</p>
              <p className="map-hours">Hours: 09:00 – 22:00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
