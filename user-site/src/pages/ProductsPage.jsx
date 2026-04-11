import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { products, categories, formatPrice } from '../data/products';
import ProductCard from '../components/common/ProductCard';

const PRODUCTS_PER_PAGE = 6;

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Groceries');
  const [selectedSub, setSelectedSub] = useState(null);
  const [sortBy, setSortBy] = useState('recommended');
  const [brandFilters, setBrandFilters] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [page, setPage] = useState(1);

  const brands = [...new Set(products.filter(p => {
    if (selectedCategory && selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    return true;
  }).map(p => p.brand))];

  let filtered = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory && selectedCategory !== 'All') return false;
    if (selectedSub && p.subcategory !== selectedSub) return false;
    if (brandFilters.length > 0 && !brandFilters.includes(p.brand)) return false;
    if (priceMin && p.price < Number(priceMin)) return false;
    if (priceMax && p.price > Number(priceMax)) return false;
    return true;
  });

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filtered.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const pageTitle = selectedSub || (categories.find(c => c.name === selectedCategory)?.name) || 'All Products';

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    setSelectedSub(null);
    setBrandFilters([]);
    setPage(1);
  };

  const handleSubChange = (sub) => {
    setSelectedSub(selectedSub === sub ? null : sub);
    setPage(1);
  };

  const removeBrandFilter = (brand) => {
    setBrandFilters(prev => prev.filter(b => b !== brand));
    setPage(1);
  };

  const clearAllFilters = () => {
    setBrandFilters([]);
    setPriceMin('');
    setPriceMax('');
    setPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span>
        <Link to="/products">{selectedCategory || 'All'}</Link>
        {selectedSub && (
          <>
            <span>/</span>
            <span style={{ color: 'var(--dark)' }}>{selectedSub}</span>
          </>
        )}
      </div>

      <div className="products-page" style={{ padding: 0 }}>
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3>Category</h3>
            {categories.map(cat => (
              <div key={cat.id}>
                <div
                  className={`filter-category ${selectedCategory === cat.name ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.name)}
                >
                  {cat.name}
                </div>
                {selectedCategory === cat.name && cat.subcategories.map(sub => (
                  <div
                    key={sub}
                    className={`filter-category sub ${selectedSub === sub ? 'active' : ''}`}
                    onClick={() => handleSubChange(sub)}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="filter-group">
            <h3>Filters</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span
                style={{ fontSize: 13, color: 'var(--gray-500)', cursor: 'pointer' }}
                onClick={clearAllFilters}
              >
                Reset
              </span>
            </div>
          </div>

          <div className="filter-group">
            <h3>Price (₦)</h3>
            <div className="price-range">
              <input placeholder="Min" value={priceMin} onChange={e => { setPriceMin(e.target.value); setPage(1); }} />
              <span>-</span>
              <input placeholder="Max" value={priceMax} onChange={e => { setPriceMax(e.target.value); setPage(1); }} />
            </div>
            <button className="apply-filter-btn" onClick={() => setPage(1)}>Apply Filter</button>
          </div>

          <div className="filter-group">
            <h3>Brand</h3>
            {brands.map(brand => (
              <label key={brand} className="brand-checkbox">
                <input
                  type="checkbox"
                  checked={brandFilters.includes(brand)}
                  onChange={() => {
                    setBrandFilters(prev =>
                      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                    );
                    setPage(1);
                  }}
                />
                {brand}
              </label>
            ))}
          </div>
        </aside>

        <div className="products-main">
          <div className="products-header">
            <div>
              <h1>{pageTitle}</h1>
              <p className="products-count">({filtered.length} products found)</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Sort By</span>
              <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {brandFilters.length > 0 && (
            <div className="filter-tags">
              {brandFilters.map(brand => (
                <span
                  key={brand}
                  className="filter-tag active"
                  onClick={() => removeBrandFilter(brand)}
                >
                  {brand} ✕
                </span>
              ))}
              <span className="filter-tag" onClick={clearAllFilters}>Clear All</span>
            </div>
          )}

          <div className="product-grid product-grid-3">
            {paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)' }}>
              No products found matching your filters.
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-nav"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                Previous
              </button>
              {getPageNumbers().map((p, i) =>
                p === '...' ? (
                  <span key={`dots-${i}`} className="pagination-dots">...</span>
                ) : (
                  <button
                    key={p}
                    className={currentPage === p ? 'active' : ''}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                className="pagination-nav"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
