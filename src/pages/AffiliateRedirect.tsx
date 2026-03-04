import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Affiliate URL mappings - in production, store these in a database
const AFFILIATE_URLS: Record<string, Record<string, string>> = {
  'buy-buy-baby': {
    base: 'https://www.buybuybaby.com',
    // Add tag for tracking: ?ref=babygear
  },
  amazon: {
    base: 'https://www.amazon.com',
    // Add tag for tracking: ?tag=babygear-20
  },
  target: {
    base: 'https://www.target.com',
    // Add utm params for tracking
  },
};

const AffiliateRedirect: React.FC = () => {
  const { retailer, asin } = useParams<{ retailer: string; asin: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!retailer || !asin) {
      setError('Missing retailer or product ID');
      return;
    }

    // Build redirect URL with tracking
    let redirectUrl = '';
    
    switch (retailer.toLowerCase()) {
      case 'amazon':
        // Amazon: use associate tag for commission tracking
        redirectUrl = `https://www.amazon.com/dp/${asin}?tag=babyge03-20`;
        break;
      case 'buybuybaby':
      case 'buy-buy-baby':
        redirectUrl = `https://www.buybuybaby.com/dp/${asin}?ref=babygear`;
        break;
      case 'target':
        redirectUrl = `https://www.target.com/p/${asin}?ref=babygear`;
        break;
      default:
        // For unknown retailers, assume it's a full URL passed as asin
        redirectUrl = asin;
    }

    // Track click (console log for now - in production, log to analytics)
    console.log(`[Affiliate Click] ${retailer}: ${asin} -> ${redirectUrl}`);
    
    // Redirect after brief delay to allow tracking
    window.location.href = redirectUrl;
  }, [retailer, asin]);

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Redirect Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Redirecting you to the retailer...</h2>
      <p>Thank you for supporting BabyGear!</p>
    </div>
  );
};

export default AffiliateRedirect;
