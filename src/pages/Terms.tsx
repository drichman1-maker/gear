import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="page-header">
          <div className="header-icon">
            <FileText size={24} />
          </div>
          <h1>Terms of Service</h1>
          <p className="subtitle">Simple terms. No fine print surprises.</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <h2>Use of BabyGear</h2>
            <p>BabyGear is a free price comparison tool for baby products. You may use our site to browse products, compare prices, and research gear for your baby. No account required.</p>
          </section>

          <section className="legal-section">
            <h2>Affiliate Disclosure</h2>
            <p>BabyGear participates in affiliate programs with major retailers. When you click a retailer link and make a purchase, we may earn a commission — at no extra cost to you. This helps us keep the site running.</p>
          </section>

          <section className="legal-section">
            <h2>Price Accuracy</h2>
            <p>We strive to keep prices accurate and up-to-date, but retailers change prices frequently. Always verify the final price at the retailer's site before purchasing.</p>
          </section>

          <section className="legal-section">
            <h2>Product Recommendations</h2>
            <p>Our recommendations are based on general research and customer feedback. Every family's needs are different — please do your own research before making big purchases.</p>
          </section>

          <section className="legal-section">
            <h2>Intellectual Property</h2>
            <p>The BabyGear name, logo, and site design are our property. You may not copy, reproduce, or use our content without permission.</p>
          </section>

          <section className="legal-section">
            <h2>Disclaimer</h2>
            <p>BabyGear is provided "as is" without warranties of any kind. We don't guarantee uninterrupted service or error-free information.</p>
          </section>

          <section className="legal-section">
            <h2>Changes to Terms</h2>
            <p>We may modify these terms at any time. Your continued use of the site means you accept the updated terms.</p>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>Questions? Email us at hello@babygear.app</p>
          </section>
        </div>

        <p className="last-updated">Last updated: February 25, 2026</p>
      </div>
    </div>
  );
};

export default Terms;