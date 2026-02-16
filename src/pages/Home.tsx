import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, CheckCircle, Search } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <h1>The Operating System for Preparing for a Baby.</h1>
                    <p className="subtitle">We compress thousands of gear choices into confident decisions based on your lifecycle stage.</p>

                    <div className="due-date-tool card">
                        <h3>When is your baby due?</h3>
                        <div className="input-group">
                            <input type="date" className="date-input" />
                            <button className="btn btn-primary">Generate My Plan <ArrowRight size={18} /></button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="lifestyle-grid container">
                <div className="section-header">
                    <h2>Start by Pregnancy Week</h2>
                    <p>Get the right gear at the right time. Not too early, not too late.</p>
                </div>

                <div className="grid grid-3">
                    {[20, 28, 32].map(week => (
                        <Link to={`/pregnancy/week-${week}`} key={week} className="card lifecycle-card">

                            <div className="week-number">Week {week}</div>
                            <h4>Checklist for Week {week}</h4>
                            <p>Strollers, Car Seats & Nursery Prep</p>
                            <div className="card-footer">
                                <span>View Essentials</span>
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="featured-categories container">
                <div className="section-header">
                    <h2>Shop by Category</h2>
                </div>
                <div className="grid grid-3">
                    <div className="category-item card">
                        <h3>Strollers</h3>
                        <p>From full-size to lightweight travel.</p>
                        <Link to="/buy/uppababy-vista-v2" className="btn btn-secondary">Compare Prices</Link>
                    </div>
                    <div className="category-item card">
                        <h3>Car Seats</h3>
                        <p>Safety-first systems for every stage.</p>
                        <Link to="/buy/nuna-pipa-rx" className="btn btn-secondary">Compare Prices</Link>
                    </div>
                    <div className="category-item card">
                        <h3>Bassinets</h3>
                        <p>Smart sleepers and classic options.</p>
                        <Link to="/buy/snoo-smart-sleeper" className="btn btn-secondary">Compare Prices</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
