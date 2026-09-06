'use client';

import { useState } from 'react';

const faqs = [
  { question: 'What is NUTREXIA?', category: 'General', position: 1 },
  { question: 'Is it safe for daily use?', category: 'Safety', position: 2 },
  { question: 'How do I cancel my subscription?', category: 'Subscriptions', position: 3 },
  { question: 'What is the return policy?', category: 'Orders', position: 4 },
];

const blogPosts = [
  { title: 'Why Plant Protein Matters', author: 'Nutrexia Team', status: 'Published', date: 'Sep 01, 2026' },
  { title: 'Climate-Smart Agriculture', author: 'Nutrexia Team', status: 'Draft', date: 'Sep 05, 2026' },
];

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('faqs');

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Content & CMS</h1>
          <div className="admin-breadcrumb">
            <a href="/admin">Dashboard</a> / Content
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'faqs' ? 'active' : ''}`}
          onClick={() => setActiveTab('faqs')}
        >
          FAQs
        </button>
        <button
          className={`admin-tab ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          Blog Posts
        </button>
        <button
          className={`admin-tab ${activeTab === 'pages' ? 'active' : ''}`}
          onClick={() => setActiveTab('pages')}
        >
          Pages
        </button>
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faqs' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Frequently Asked Questions</span>
            <button className="admin-btn admin-btn-primary admin-btn-sm">+ Add FAQ</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: 'var(--admin-text-muted)' }}>{faq.position}</td>
                    <td style={{ color: 'var(--admin-text)', fontWeight: 500 }}>{faq.question}</td>
                    <td><span className="admin-badge info">{faq.category}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button className="admin-btn admin-btn-ghost admin-btn-sm">Edit</button>
                        <button className="admin-btn admin-btn-ghost admin-btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === 'blog' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <span className="admin-card-title">Blog Posts</span>
            <button className="admin-btn admin-btn-primary admin-btn-sm">+ New Post</button>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map((post, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--admin-text)', fontWeight: 500 }}>{post.title}</td>
                    <td>{post.author}</td>
                    <td>
                      <span className={`admin-badge ${post.status === 'Published' ? 'success' : 'warning'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{post.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button className="admin-btn admin-btn-ghost admin-btn-sm">Edit</button>
                        <button className="admin-btn admin-btn-ghost admin-btn-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">📄</div>
            <div className="admin-empty-title">Page Management</div>
            <div className="admin-empty-desc">
              Manage homepage content, policy pages, and marketing sections.
              This feature will be connected to the CMS in a future update.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
