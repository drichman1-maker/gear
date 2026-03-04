import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertCircle, ShoppingCart, ChevronRight, ArrowLeft } from 'lucide-react';
import { GearAPI } from '../lib/api';

const getRetailerSlug = (name: string): string => {
  const slugMap: Record<string, string> = {
    'Buy Buy Baby': 'buybuybaby',
    'Amazon': 'amazon',
    'Target': 'target',
  };
  return slugMap[name] || name.toLowerCase().replace(/\s+/g, '-');
};

const extractAsin = (url: string): string => {
  const amazonMatch = url.match(/\/dp\/([A-Z0-9]{10})/i);
  if (amazonMatch) return amazonMatch[1];
  const bbbMatch = url.match(/\/dp\/([A-Z0-9-]+)/i);
  if (bbbMatch) return bbbMatch[1];
  const targetMatch = url.match(/\/p\/([^\?]+)/i);
  if (targetMatch) return targetMatch[1];
  return url;
};

const ProductDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<any>(null);
    const api = new GearAPI();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            const data = await api.getProductBySlug(slug);
            setProduct(data);
        };
        fetchProduct();
    }, [slug]);

    // Add JSON-LD schema for SEO
    useEffect(() => {
        if (!product) return;
        
        const schema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "brand": {
                "@type": "Brand",
                "name": product.brand
            },
            "image": product.image_url || "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
            "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": bestPrice,
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": product.prices?.[0]?.retailer_name || "Multiple Retailers"
                }
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
        
        return () => {
            document.head.removeChild(script);
        };
    }, [product, bestPrice]);

    if (!product) return <div className="container">Loading product... (slug: {slug})</div>;

    const bestPrice = product.prices?.length > 0
        ? Math.min(...product.prices.map((p: any) => p.price))
        : product.msrp;

    const hasDeal = bestPrice < product.msrp;
    const savings = product.msrp - bestPrice;

    return (
        <div className="product-detail container">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <ChevronRight size={14} />
                <Link to="/products">Products</Link>
                <ChevronRight size={14} />
                <span>{product.name}</span>
            </div>

            <div className="product-detail-grid">
                {/* Left: Image */}
                <div className="product-visuals">
                    <div className="main-image card">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} />
                        ) : (
                            <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80" alt={product.name} />
                        )}
                    </div>
                </div>

                {/* Right: Info & Prices */}
                <div className="product-info">
                    <span className="product-category-tag">{product.category}</span>
                    <div className="brand">{product.brand}</div>
                    <h1>{product.name}</h1>
                    
                    {/* Price Block */}
                    <div className="price-block">
                        <div className="price-main">
                            <span className="best-price">${bestPrice}</span>
                            {hasDeal && (
                                <>
                                    <span className="msrp">${product.msrp}</span>
                                    <span className="save-badge">Save ${savings}</span>
                                </>
                            )}
                        </div>
                        <span className="price-label">Best price from {product.prices?.[0]?.retailer_name || 'multiple retailers'}</span>
                    </div>

                    {/* Description */}
                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>

                    {/* Key Specs */}
                    {product.attributes?.length > 0 && (
                        <div className="specs-list">
                            {product.attributes.map((attr: any) => (
                                <div key={attr.key} className="spec-item">
                                    <span className="spec-label">{attr.key}</span>
                                    <span className="spec-value">{attr.value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Retailers */}
                    <div className="retailer-list">
                        <h3>Where to Buy</h3>
                        {product.prices?.map((p: any) => (
                            <div key={p.retailer_name} className="retailer-row">
                                <div className="retailer-info">
                                    <span className="retailer-name">{p.retailer_name}</span>
                                    {p.availability === 'Low Stock' && (
                                        <span className="stock-warning"><AlertCircle size={12} /> Low Stock</span>
                                    )}
                                    {p.availability === 'In Stock' && (
                                        <span className="stock-ok">In Stock</span>
                                    )}
                                </div>
                                <div className="retailer-action">
                                    <span className="retailer-price">${p.price}</span>
                                    <a 
                                        href={`/r/${getRetailerSlug(p.retailer_name)}/${extractAsin(p.affiliate_url)}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn btn-primary"
                                    >
                                        Buy <ShoppingCart size={14} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
