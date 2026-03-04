import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Heart, ClipboardList, ShoppingBag, Search } from 'lucide-react';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    {
      id: 'stroller-buying-guide',
      title: 'Complete Stroller Buying Guide for 2026',
      excerpt: 'Everything you need to know about choosing the perfect stroller for your family, from travel systems to joggers.',
      date: 'February 25, 2026',
      readTime: '10 min read',
      category: 'Buying Guide',
      icon: ShoppingBag
    },
    {
      id: 'car-seat-safety',
      title: 'Car Seat Safety: What Every Parent Needs to Know',
      excerpt: 'Expert tips on installing car seats correctly and understanding safety ratings.',
      date: 'February 20, 2026',
      readTime: '8 min read',
      category: 'Safety',
      icon: Heart
    },
    {
      id: 'registry-essentials',
      title: 'Baby Registry Essentials: What You Actually Need',
      excerpt: 'Skip the overwhelm with our curated list of must-have items.',
      date: 'February 15, 2026',
      readTime: '6 min read',
      category: 'Planning',
      icon: ClipboardList
    }
  ];

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <h1>BabyGear Blog</h1>
          <p>Expert guides, tips, and advice for preparing for your baby</p>
        </div>

        <div className="blog-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="blog-grid">
          {filteredPosts.map((post) => {
            const Icon = post.icon || BookOpen;
            return (
              <article key={post.id} className="blog-card">
                <div className="blog-card-image">
                  <Icon size={48} />
                </div>
                <div className="blog-card-content">
                  <span className="blog-category">{post.category}</span>
                  <h2>{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span><Calendar size={14} /> {post.date}</span>
                    <span><Clock size={14} /> {post.readTime}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
