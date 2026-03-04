import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, Mail } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="legal-header">
          <Shield size={32} className="legal-icon" />
          <h1>Privacy Policy</h1>
          <p>Your privacy is fundamental to how we operate</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <div className="policy-point">
              <Lock size={20} />
              <div>
                <h3>We Don't Track You</h3>
                <p>BabyGear does not use cookies, tracking pixels, or analytics that identify you personally.</p>
              </div>
            </div>

            <div className="policy-point">
              <Eye size={20} />
              <div>
                <h3>No User Accounts</h3>
                <p>We don't require accounts to use BabyGear. Browse products and compare prices without sharing personal information.</p>
              </div>
            </div>

            <div className="policy-point">
              <Mail size={20} />
              <div>
                <h3>Email Collection</h3>
                <p>If you sign up for price alerts, we use trusted third-party services to handle emails. We never store emails on our own servers.</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Information We Collect</h2>
            <ul>
              <li><strong>Price data:</strong> We scrape publicly available prices from major retailers.</li>
              <li><strong>Affiliate clicks:</strong> When you click retailer links, we may earn a commission.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>Questions? Reach out at hello@babygear.app</p>
          </section>
        </div>

        <p className="last-updated">Last updated: February 27, 2026</p>
      </div>
    </div>
  );
};

export default Privacy;
