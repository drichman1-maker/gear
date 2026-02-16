import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
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
                        <Link to="/pregnancy/week-20">Lifecycle</Link>
                        <Link to="/registry">Registry</Link>
                        <Link to="/buy/uppababy-vista-v2">Browse Gear</Link>
                    </nav>
                </div>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pregnancy/:week" element={<LifecyclePage />} />
                    <Route path="/buy/:slug" element={<ProductDetail />} />
                    <Route path="/registry" element={<RegistryBuilder />} />
                </Routes>
            </main>

            <footer className="main-footer">
                <div className="container">
                    <p>&copy; 2026 Baby Gear Aggregator. Decision Infrastructure for New Parents.</p>
                </div>
            </footer>
        </Router>
    );
};

export default App;
