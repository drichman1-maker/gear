import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Calendar, Clock } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 'stroller-buying-guide',
      title: 'Complete Stroller Buying Guide for 2026',
      excerpt: 'Everything you need to know about choosing the perfect stroller for your family, from lightweight travel options to full-size daily drivers.',
      date: 'February 25, 2026',
      readTime: '10 min read',
      category: 'Buying Guide'
    },
    {
      id: 'car-seat-safety',
      title: 'Car Seat Safety: What Every Parent Needs to Know',
      excerpt: 'Expert tips on installing car seats correctly, understanding safety ratings, and when to upgrade to the next stage.',
      date: 'February 20, 2026',
      readTime: '8 min read',
      category: 'Safety'
    },
    {
      id: 'registry-essentials',
      title: 'Baby Registry Essentials: What You Actually Need',
      excerpt: 'Skip the overwhelm with our curated list of must-have items and nice-to-haves for your baby registry.',
      date: 'February 15, 2026',
      readTime: '6 min read',
      category: 'Planning'
    }
  ];

  return (
    <div className="blog-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="page-header">
          <div className="header-icon">
            <BookOpen size={24} />
          </div>
          <h1>BabyGear Blog</h1>
          <p className="subtitle">Guides, tips, and advice for preparing for your baby</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h2>{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span><Calendar size={14} /> {post.date}</span>
                  <span><Clock size={14} /> {post.readTime}</span>
                </div>
                <button className="btn btn-secondary">Read More</button>
              </div>
            </article>
          ))}
        </div>

        <div className="coming-soon-notice">
          <h3>📝 More Articles Coming Soon</h3>
          <p>We're working on in-depth guides for every category. Check back soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;