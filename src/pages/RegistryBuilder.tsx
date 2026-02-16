import React, { useState } from 'react';
import { Package, Plus, Save, Trash2, Layout } from 'lucide-react';

const RegistryBuilder: React.FC = () => {
    const [items, setItems] = useState<any[]>([
        { id: 1, name: 'Vista V2 Stroller', brand: 'UPPAbaby', price: 999.99 },
        { id: 2, name: 'Pipa RX Car Seat', brand: 'Nuna', price: 399.95 }
    ]);

    const templates = [
        { name: 'Minimalist Apartment', desc: 'Space-saving essentials only.', count: 12 },
        { name: 'Suburban Premium', desc: 'All-terrain and multi-child ready.', count: 18 },
        { name: 'Budget-Under-$1000', desc: 'Maximum safety at minimum cost.', count: 8 }
    ];

    return (
        <div className="registry-builder container">
            <div className="registry-header">
                <h1>Intelligent Registry Builder</h1>
                <p>Your gear plan updates automatically based on your lifestyle and due date.</p>
            </div>

            <div className="registry-layout">
                <div className="registry-main">
                    <div className="active-registry card">
                        <div className="registry-title-row">
                            <h3>My Baby Gear Plan</h3>
                            <button className="btn btn-primary"><Save size={16} /> Save Plan</button>
                        </div>

                        <div className="item-list">
                            {items.map(item => (
                                <div key={item.id} className="registry-item">
                                    <div className="item-icon"><Package size={20} /></div>
                                    <div className="item-details">
                                        <strong>{item.brand} {item.name}</strong>
                                        <span>Est. ${item.price}</span>
                                    </div>
                                    <button className="btn-icon text-danger" onClick={() => setItems(items.filter(i => i.id !== item.id))}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <button className="btn btn-secondary add-item-btn"><Plus size={16} /> Add Missing Essential</button>
                        </div>
                    </div>
                </div>

                <div className="registry-sidebar">
                    <h3>One-Click Templates</h3>
                    <div className="template-grid">
                        {templates.map(t => (
                            <div key={t.name} className="template-card card">
                                <Layout size={20} className="text-accent" />
                                <h4>{t.name}</h4>
                                <p>{t.desc}</p>
                                <div className="template-meta">{t.count} items</div>
                                <button className="btn btn-sm btn-secondary">Apply Template</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistryBuilder;
