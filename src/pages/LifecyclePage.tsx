import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import { GearAPI } from '../lib/api';

const LifecyclePage: React.FC = () => {
    const { week } = useParams<{ week: string }>();
    const [products, setProducts] = useState<any[]>([]);
    const api = new GearAPI();

    useEffect(() => {
        const fetchData = async () => {
            if (!week) return;
            const weekNum = parseInt(week.replace('week-', '')) || 20;
            const data = await api.getLifecycleProducts(weekNum);
            setProducts(data);
        };
        fetchData();
    }, [week]);


    return (
        <div className="lifecycle-page container">
            <div className="lifecycle-header">
                <h1>Week {week} Preparation</h1>
                <p className="description">By Week {week}, you should have your primary mobility and safety systems finalized. Shipping delays for premium brands can take 4-8 weeks.</p>
            </div>

            <div className="checklist-stats grid grid-3">
                <div className="stat card">
                    <span className="stat-label">Budget Range</span>
                    <span className="stat-value">$1,200 - $2,500</span>
                </div>
                <div className="stat card">
                    <span className="stat-label">Critical Items</span>
                    <span className="stat-value">2 / 5 Found</span>
                </div>
                <div className="stat card">
                    <span className="stat-label">Time to Due Date</span>
                    <span className="stat-value">{40 - parseInt(week || '0')} Weeks</span>
                </div>
            </div>

            <div className="essentials-section">
                <h2>Critical Essentials</h2>
                <div className="product-list">
                    {products.map(product => (
                        <div key={product.slug} className="product-row card">
                            <div className="product-info">
                                <div className="badge-essential"><ShieldCheck size={14} /> Critical</div>
                                <h3>{product.brand} {product.name}</h3>
                                <p className="recommendation-reason">{product.reason}</p>
                            </div>
                            <div className="product-meta">
                                <div className="price-tag">From ${product.price}</div>
                                <Link to={`/buy/${product.slug}`} className="btn btn-primary">
                                    Decision Detail <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="regret-warning card warning-card">
                <div className="warning-header">
                    <AlertTriangle color="var(--warning)" />
                    <h3>Common Regret: Waiting too long</h3>
                </div>
                <p>42% of parents regret not ordering their stroller by week 24. Freight issues often cause delays in specific colorways.</p>
            </div>
        </div>
    );
};

export default LifecyclePage;
