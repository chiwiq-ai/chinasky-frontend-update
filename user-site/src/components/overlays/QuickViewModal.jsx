import { useState } from 'react';
import { X, Star, Minus, Plus, ShoppingCart, Check, Share2, Heart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../data/products';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const savePct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-container" onClick={e => e.stopPropagation()}>
        {/* LEFT: Image Gallery */}
        <div className="quickview-gallery">
          <div className="quickview-main-image">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="quickview-thumbs">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`quickview-thumb ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="quickview-info">
          <div className="quickview-info-inner">
            <h2 className="quickview-title">{product.name}</h2>

            <div className="quickview-rating">
              <div className="quickview-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} stroke={i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db'} />
                ))}
              </div>
              <span className="quickview-rating-text">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="quickview-price-row">
              <span className="quickview-price">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="quickview-old-price">{formatPrice(product.oldPrice)}</span>
              )}
              {savePct && (
                <span className="quickview-save-badge">Save {savePct}%</span>
              )}
            </div>

            <div className="quickview-stock">
              <span className="quickview-stock-badge">
                <Check size={14} />
                <span>In Stock</span>
              </span>
              <span className="quickview-delivery">Ready for same-day delivery</span>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="quickview-sizes">
                <h4>Select Size</h4>
                <div className="quickview-size-options">
                  {product.sizes.map((size, i) => (
                    <button
                      key={i}
                      className={`quickview-size-btn ${i === selectedSize ? 'active' : ''}`}
                      onClick={() => setSelectedSize(i)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="quickview-bottom">
            <div className="quickview-cart-row">
              <div className="quickview-qty-control">
                <button onClick={() => qty > 1 && setQty(qty - 1)}><Minus size={16} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
              </div>
              <button className="quickview-add-btn" onClick={() => onAddToCart(product, qty)}>
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>

            <div className="quickview-footer">
              <button
                className="quickview-view-full"
                onClick={() => { onClose(); navigate(`/products/${product.id}`); }}
              >
                View Full Details <ChevronRight size={14} />
              </button>
              <div className="quickview-actions">
                <button className="quickview-action-btn">
                  <Share2 size={16} /> Share
                </button>
                <button className="quickview-action-btn">
                  <Heart size={16} /> Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button className="quickview-close" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
