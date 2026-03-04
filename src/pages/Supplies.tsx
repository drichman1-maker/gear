import React from 'react';
import { Package, Droplets, Utensils, ScanFace, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUPPLIES = [
  { id: 'diapers', name: 'Diapers', description: 'Newborn to Size 6', price: '$25-40/mo', icon: Package, retailers: ['Amazon', 'Target', 'Costco'] },
  { id: 'wipes', name: 'Baby Wipes', description: 'Sensitive & unscented options', price: '$8-15/mo', icon: Droplets, retailers: ['Amazon', 'Target', 'Walmart'] },
  { id: 'formula', name: 'Formula', description: 'Standard & sensitive varieties', price: '$30-50/mo', icon: Utensils, retailers: ['Amazon', 'Target', 'Buy Buy Baby'] },
  { id: 'bath', name: 'Bath & Body', description: 'Gentle cleansers & lotions', price: '$10-20/mo', icon: ScanFace, retailers: ['Amazon', 'Target', 'Babylist'] },
  { id: 'food', name: 'Baby Food', description: 'Purees & pouches', price: '$15-30/mo', icon: Utensils, retailers: ['Amazon', 'Target'] },
  { id: 'medicine', name: 'Medicine Cabinet', description: 'Fever reducers, gas drops', price: '$20-35/once', icon: Package, retailers: ['Amazon', 'CVS', 'Walgreens'] },
];

const Supplies: React.FC = () => {
  return (
    <div className="products-page" style={{ paddingTop: '24px' }}>
      <div className="container">
        <div className="products-header">
          <h1>Ongoing Supplies</h1>
          <p>Recurring essentials. Track prices and find the best deals.</p>
        </div>

        <div className="products-list">
          {SUPPLIES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="product-card hover-lift">
                <div className="product-main">
                  <div className="product-header">
                    <span className="product-brand" style={{ textTransform: 'capitalize' }}>Ongoing</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '12px', 
                        background: 'rgba(34, 211, 238, 0.15)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#22D3EE'
                      }}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="product-name" style={{ display: 'block' }}>{item.name}</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.description}</span>
                      </div>
                    </div>
                  </div>
                  <div className="product-price-row">
                    <span className="best-price" style={{ color: '#22D3EE' }}>{item.price}</span>
                  </div>
                </div>
                <div className="retailers-row">
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Available at:</span>
                  {item.retailers.map((r, i) => (
                    <span key={i} className="retailer-pill" style={{ borderColor: 'rgba(34, 211, 238, 0.3)' }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Supplies;