import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { GearAPI, Product } from '../lib/api';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'strollers', name: 'Strollers' },
  { id: 'car-seats', name: 'Car Seats' },
  { id: 'cribs', name: 'Cribs' },
  { id: 'monitors', name: 'Monitors' },
  { id: 'carriers', name: 'Carriers' },
  { id: 'breast-pumps', name: 'Pumps' },
];

const CATEGORY_LABELS: Record<string, string> = {
  'all': 'All Products',
  'strollers': 'Strollers',
  'car-seats': 'Car Seats',
  'cribs': 'Cribs & Sleep',
  'monitors': 'Monitors',
  'carriers': 'Carriers',
  'breast-pumps': 'Breast Pumps',
};

const RETAILER_COLORS: Record<string, string> = {
  'Buy Buy Baby': '#F472B6',
  'Amazon': '#A78BFA',
  'Target': '#22D3EE',
};

const getRetailerSlug = (name: string): string => {
  const slugMap: Record<string, string> = {
    'Buy Buy Baby': 'buybuybaby',
    'Amazon': 'amazon',
    'Target': 'target',
  };
  return slugMap[name] || name.toLowerCase().replace(/\s+/g, '-');
};

const extractAsin = (url: string): string => {
  const amazonMatch = url.match(/\/dp\/([A-Z0-9]{10})/i);
  if (amazonMatch) return amazonMatch[1];
  const bbbMatch = url.match(/\/dp\/([A-Z0-9-]+)/i);
  if (bbbMatch) return bbbMatch[1];
  const targetMatch = url.match(/\/p\/([^\?]+)/i);
  if (targetMatch) return targetMatch[1];
  return url;
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

  const getStockStatus = (slug: string) => {
    const prices = getAllPrices(slug);
    if (prices.length === 0) return 'no-data';
    const inStock = prices.filter(p => p.availability === 'In Stock');
    if (inStock.length === 0) return 'out';
    if (inStock.length === 1) return 'limited';
    return 'in-stock';
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Products</span>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight size={14} />
              <span>{CATEGORY_LABELS[selectedCategory]}</span>
            </>
          )}
        </div>

        <div className="products-header">
          <h1>{CATEGORY_LABELS[selectedCategory]}</h1>
          <p>Compare prices across top retailers</p>
        </div>

        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={selectedCategory === cat.id ? 'active' : ''}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid - Card Style */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const bestPrice = getBestPrice(product.slug);
            const allPrices = getAllPrices(product.slug);
            const stockStatus = getStockStatus(product.slug);
            const hasDeal = bestPrice && bestPrice.price < product.msrp;
            
            return (
              <Link key={product.slug} to={`/buy/${product.slug}`} className="product-grid-card">
                <div className="product-card-body">
                  <span className="product-category-tag">{product.category}</span>
                  <span className="product-brand">{product.brand}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-card-footer">
                    <div className="price-info">
                      <span className="best-price">${bestPrice?.price || product.msrp}</span>
                      {hasDeal && <span className="msrp">${product.msrp}</span>}
                    </div>
                    {bestPrice && (
                      <span className="retailer-label">from {bestPrice.retailer_name}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
