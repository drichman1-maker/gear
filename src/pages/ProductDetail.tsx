import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle, Shield, ShoppingCart, TrendingDown } from 'lucide-react';
import { GearAPI } from '../lib/api';

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

    if (!product) return <div className="container">Loading...</div>;

    // Derived values from database data or constants for UI
    const bestPrice = product.prices?.length > 0
        ? Math.min(...product.prices.map((p: any) => p.price))
        : product.msrp;

    return (
        <div className="product-detail container">
            <div className="product-grid">
                <div className="product-visuals">
                    <div className="main-image card">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} />
                        ) : (
                            <img src={`https://placehold.co/600x400?text=${product.name}`} alt={product.name} />
                        )}
                    </div>
                </div>

                <div className="product-buying-guide">
                    <div className="brand">{product.brand}</div>
                    <h1>{product.name}</h1>
                    <div className="price-range">Best Price: ${bestPrice} <span className="msrp">MSRP: ${product.msrp}</span></div>

                    <div className="decision-matrix card">
                        <h4>Decision Compression</h4>
                        <div className="decision-item">
                            <strong>About this product</strong>
                            <p>{product.description}</p>
                        </div>
                        {product.attributes?.length > 0 && (
                            <div className="decision-item">
                                <strong>Key Specs</strong>
                                <ul className="attribute-list">
                                    {product.attributes.map((attr: any) => (
                                        <li key={attr.key}><strong>{attr.key}:</strong> {attr.value}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="price-aggregator card">
                        <h3>Retail Price Aggregation</h3>
                        <div className="price-list">
                            {product.prices?.map((p: any) => (
                                <div key={p.retailer_name} className="price-row">
                                    <div className="retailer-info">
                                        <strong>{p.retailer_name}</strong>
                                        {p.availability === 'Low Stock' && <span className="deal-badge warning"><AlertCircle size={12} /> Low Stock</span>}
                                    </div>
                                    <div className="price-action">
                                        <span className="current-price">${p.price}</span>
                                        <a href={p.affiliate_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                                            Buy <ShoppingCart size={14} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
