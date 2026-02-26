import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, Mail } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="page-header">
          <div className="header-icon">
            <Shield size={24} />
          </div>
          <h1>Privacy Policy</h1>
          <p className="subtitle">Your privacy is fundamental to how we operate</p>
        </div>

        <div className="legal-content">
          <section className="legal-section">
            <div className="policy-point">
              <Lock size={20} />
              <div>
                <h3>We Don't Track You</h3>
                <p>BabyGear does not use cookies, tracking pixels, or analytics that identify you personally. We don't care who you are — we just want to help you find the best baby gear.</p>
              </div>
            </div>

            <div className="policy-point">
              <Eye size={20} />
              <div>
                <h3>No User Accounts</h3>
                <p>We don't require accounts to use BabyGear. Browse products, compare prices, and build your registry without sharing personal information.</p>
              </div>
            </div>

            <div className="policy-point">
              <Mail size={20} />
              <div>
                <h3>Email Collection</h3>
                <p>If you sign up for price alerts or share your registry, we use trusted third-party services (like Resend, Mailchimp, or ConvertKit) to handle emails. We never store emails on our own servers.</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Information We Collect</h2>
            <ul>
              <li><strong>Price data:</strong> We scrape publicly available prices from major retailers to provide comparison data.</li>
              <li><strong>Registry data:</strong> If you create a registry, it's stored temporarily to generate a shareable code. We don't retain this data long-term.</li>
              <li><strong>Affiliate clicks:</strong> When you click retailer links, we may earn a commission — this is how we sustain the service.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Third Parties</h2>
            <p>We partner with reputable retailers (Amazon, Buy Buy Baby, Target, Nordstrom) and email service providers. Each has their own privacy policies. We encourage you to review theirs.</p>
          </section>

          <section className="legal-section">
            <h2>Changes to This Policy</h2>
            <p>We may update this policy occasionally. Any changes will be posted here. Your continued use of BabyGear constitutes acceptance of these terms.</p>
          </section>

          <section className="legal-section">
            <h2>Contact</h2>
            <p>Questions about our privacy practices? Reach out at hello@babygear.app</p>
          </section>
        </div>

        <p className="last-updated">Last updated: February 25, 2026</p>
      </div>
    </div>
  );
};

export default Privacy;