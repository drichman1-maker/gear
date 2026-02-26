import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import LifecyclePage from './pages/LifecyclePage';
import ProductDetail from './pages/ProductDetail';
import RegistryBuilder from './pages/RegistryBuilder';
import './index.css';

const App: React.FC = () => {
    return (
        <Router>
            <header className="main-header">
                <div className="container header-content">
                    <Link to="/" className="logo">
                        <span className="logo-icon">🍼</span>
                        <span className="logo-text">BabyGear<span>V3</span></span>
                    </Link>
                    <nav>
                        <Link to="/products">Browse Gear</Link>
                        <Link to="/pregnancy/week-20">Lifecycle</Link>
                        <Link to="/registry">Registry</Link>
                    </nav>
                </div>
            </header>

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
                </Routes>
            </main>

            <footer className="main-footer">
                <div className="container">
                    <div className="footer-links">
                        <Link to="/blog">Blog</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                    </div>
                    <p>© 2026 BabyGear. Decision Infrastructure for New Parents.</p>
                </div>
            </footer>
        </Router>
    );
};

export default App;