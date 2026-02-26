import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart, AlertCircle, ChevronRight, Tag } from 'lucide-react';
import { GearAPI, Product } from '../lib/api';

const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🛒' },
  { id: 'strollers', name: 'Strollers', icon: '🚼' },
  { id: 'car-seats', name: 'Car Seats', icon: '🚗' },
  { id: 'cribs', name: 'Cribs & Bassinets', icon: '🛏️' },
  { id: 'monitors', name: 'Monitors', icon: '📹' },
  { id: 'carriers', name: 'Carriers', icon: '👶' },
  { id: 'breast-pumps', name: 'Breast Pumps', icon: '🍼' },
];

const RETAILER_COLORS: Record<string, string> = {
  'Buy Buy Baby': '#E31D1A',
  'Amazon': '#FF9900',
  'Target': '#CC0000',
  'Nordstrom': '#000000',
  'Babylist': '#6B21A8',
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [retailerPrices, setRetailerPrices] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const api = new GearAPI();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.fetchData();
      setProducts(data.products || []);
      setRetailerPrices(data.retailerPrices || []);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBestPrice = (slug: string) => {
    const prices = retailerPrices.filter(p => p.product_slug === slug);
    if (prices.length === 0) return null;
    return prices.reduce((min, p) => p.price < min.price ? p : min, prices[0]);
  };

  const getAllPrices = (slug: string) => {
    return retailerPrices.filter(p => p.product_slug === slug).sort((a, b) => a.price - b.price);
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <h1>Browse Products</h1>
          <p className="subtitle">Compare prices across top retailers. Find the best deals on premium baby gear.</p>
          
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      <div className="container products-layout">
        <aside className="category-sidebar">
          <h3><Filter size={18} /> Categories</h3>
          <div className="category-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="products-grid-section">
          <div className="results-header">
            <span>{filteredProducts.length} products found</span>
            <select className="sort-select">
              <option>Sort by: Best Price</option>
              <option>Sort by: Name</option>
              <option>Sort by: Brand</option>
            </select>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => {
              const bestPrice = getBestPrice(product.slug);
              const allPrices = getAllPrices(product.slug);
              
              return (
                <div key={product.slug} className="product-card-v2">
                  <div className="product-image-v2">
                    <img src={product.image_url} alt={product.name} />
                    <span className="category-badge">{CATEGORIES.find(c => c.id === product.category)?.name || product.category}</span>
                  </div>
                  
                  <div className="product-info-v2">
                    <span className="brand-v2">{product.brand}</span>
                    <h3 className="product-name-v2">{product.name}</h3>
                    
                    <div className="price-comparison">
                      <div className="price-header">
                        <span className="price-label-v2">Best Price</span>
                        {bestPrice && (
                          <span className="best-price-badge">${bestPrice.price}</span>
                        )}
                      </div>
                      
                      <div className="retailer-list">
                        {allPrices.slice(0, 3).map((price, idx) => (
                          <div key={idx} className="retailer-row">
                            <div className="retailer-info">
                              <span 
                                className="retailer-dot" 
                                style={{ backgroundColor: RETAILER_COLORS[price.retailer_name] || '#666' }}
                              />
                              <span className="retailer-name">{price.retailer_name}</span>
                            </div>
                            <div className="retailer-price-action">
                              <span className={`retailer-price ${idx === 0 ? 'lowest' : ''}`}>
                                ${price.price}
                              </span>
                              <a 
                                href={price.affiliate_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-view-deal"
                              >
                                View Deal
                              </a>
                            </div>
                          </div>
                        ))}
                        {allPrices.length > 3 && (
                          <Link to={`/buy/${product.slug}`} className="view-more-deals">
                            View {allPrices.length - 3} more deals <ChevronRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                    
                    <div className="msrp-row">
                      <span className="msrp-label">MSRP:</span>
                      <span className="msrp-value">${product.msrp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <AlertCircle size={48} />
              <h3>No products found</h3>
              <p>Try adjusting your search or category filter</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;