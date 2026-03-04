import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home as HomeIcon, ShoppingBag, Calendar, List, Package } from 'lucide-react';
import Home from './pages/Home';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import LifecyclePage from './pages/LifecyclePage';
import ProductDetail from './pages/ProductDetail';
import RegistryBuilder from './pages/RegistryBuilder';
import Supplies from './pages/Supplies';
import AffiliateRedirect from './pages/AffiliateRedirect';
import { GearAPI } from './lib/api';
import './index.css';

const App: React.FC = () => {
  const [stats, setStats] = useState({ products: 0, retailers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const api = new GearAPI();
      const data = await api.fetchData();
      const products = data.products?.length || 0;
      const retailers = new Set(data.retailerPrices?.map((p: any) => p.retailer_name)).size || 0;
      setStats({ products, retailers });
    };
    fetchStats();
  }, []);

  return (
    <Router>
      <header className="main-header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <span className="logo-text">BabyGear</span>
          </Link>
          <nav className="desktop-nav">
            <Link to="/products">Browse</Link>
            <Link to="/registry">Registry</Link>
            <Link to="/supplies">Supplies</Link>
            <Link to="/blog">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Minimal Stats Bar */}
      <div className="stats-bar">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-value">{stats.products}</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{stats.retailers}</span>
            <span className="stat-label">Retailers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value active">Live</span>
            <span className="stat-label">Price Tracking</span>
          </div>
        </div>
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/pregnancy/:week" element={<LifecyclePage />} />
          <Route path="/buy/:slug" element={<ProductDetail />} />
          <Route path="/registry" element={<RegistryBuilder />} />
          <Route path="/supplies" element={<Supplies />} />
          <Route path="/r/:retailer/:asin" element={<AffiliateRedirect />} />
        </Routes>
      </main>

      <nav className="mobile-bottom-nav">
        <Link to="/" className="mobile-nav-item">
          <HomeIcon size={20} />
          <span>Home</span>
        </Link>
        <Link to="/products" className="mobile-nav-item">
          <ShoppingBag size={20} />
          <span>Browse</span>
        </Link>
        <Link to="/supplies" className="mobile-nav-item">
          <Package size={20} />
          <span>Supplies</span>
        </Link>
        <Link to="/registry" className="mobile-nav-item">
          <List size={20} />
          <span>Registry</span>
        </Link>
      </nav>

      <footer className="main-footer">
        <div className="container">
          <div className="footer-links">
            <Link to="/blog">Blog</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <p className="copyright">© 2026 BabyGear. Decision Infrastructure for New Parents.</p>
          <p className="affiliate-disclaimer">
            We earn commissions from retailer links at no cost to you.
          </p>
        </div>
      </footer>
    </Router>
  );
};

export default App;
