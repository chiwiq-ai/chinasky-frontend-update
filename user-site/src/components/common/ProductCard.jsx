import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <img
        src={product.image}
        alt={product.name}
        className="product-card-img"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      <div className="product-brand">{product.brand}</div>
      <div className="product-name" onClick={handleClick} style={{ cursor: 'pointer' }}>{product.name}</div>
      <div className="product-price">
        <span className="current">{formatPrice(product.price)}</span>
        {product.oldPrice && <span className="old">{formatPrice(product.oldPrice)}</span>}
      </div>
      <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
        <ShoppingCart size={16} /> Add to Cart
      </button>
    </div>
  );
}
