import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Share2, Heart, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const tabs = ['Description', 'Specifications', 'Delivery & Returns', `Reviews (${product.reviews})`];

  return (
    <div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/products">Groceries</Link> <span>/</span>
          <Link to="/products">{product.subcategory}</Link> <span>/</span>
          <span style={{ color: 'var(--dark)' }}>{product.name}</span>
        </div>
      </div>

      <div className="product-detail">
        <div className="product-images">
          <img src={product.images[selectedImage] || product.image} alt={product.name} className="product-main-img" />
          <div className="product-thumbs">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={i === selectedImage ? 'active' : ''}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} />
              ))}
            </div>
            <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="product-detail-price">
            <span className="current">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="old">{formatPrice(product.oldPrice)}</span>
                <span className="save-badge">SAVE {Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
              </>
            )}
          </div>

          <div className="stock-status">
            <Check size={16} style={{ color: 'var(--green)' }} />
            <span className="in-stock">IN STOCK</span>
            <span className="delivery">· Ready for same-day delivery</span>
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="size-selector">
              <h4>Select Size</h4>
              <div className="size-options">
                {product.sizes.map((size, i) => (
                  <button
                    key={i}
                    className={`size-btn ${i === selectedSize ? 'active' : ''}`}
                    onClick={() => setSelectedSize(i)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="qty-row">
            <div className="qty-control">
              <button onClick={() => qty > 1 && setQty(qty - 1)}><Minus size={16} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
            </div>
            <button className="add-cart-main" onClick={() => addToCart(product, qty)}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>

          <div className="product-actions-row">
            <button><Share2 size={18} /></button>
            <button><Heart size={18} /></button>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <div className="tab-headers">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`tab-header ${i === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === 0 && (
            <>
              <h3>The Queen of Tropical Fruits</h3>
              <p>{product.description}</p>
              <p style={{ marginTop: 16 }}>
                Naturally rich in Vitamin C, iron, and magnesium, it's the perfect health-conscious addition to your morning smoothie bowls or a sophisticated dessert platter. We work directly with certified organic growers in the Binh Thuan province to ensure each fruit meets our rigorous standards for size, sweetness, and skin integrity.
              </p>
            </>
          )}
          {activeTab === 1 && (
            <>
              <h3>Specifications</h3>
              <div className="spec-grid">
                <span style={{ color: 'var(--gray-500)' }}>Brand</span><span>{product.brand}</span>
                <span style={{ color: 'var(--gray-500)' }}>SKU</span><span>{product.sku}</span>
                <span style={{ color: 'var(--gray-500)' }}>Category</span><span>{product.category}</span>
                <span style={{ color: 'var(--gray-500)' }}>Sub-Category</span><span>{product.subcategory}</span>
                <span style={{ color: 'var(--gray-500)' }}>Available Sizes</span><span>{product.sizes?.join(', ')}</span>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <>
              <h3>Delivery & Returns</h3>
              <p>Free delivery on orders over ₦50,000. Standard delivery takes 1-3 business days within Lagos and 3-7 business days for other regions. Returns accepted within 24 hours for perishable items and 7 days for non-perishable items.</p>
            </>
          )}
          {activeTab === 3 && (
            <>
              <h3>Customer Reviews</h3>
              <p style={{ color: 'var(--gray-500)' }}>{product.reviews} reviews · Average {product.rating}/5 stars</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
