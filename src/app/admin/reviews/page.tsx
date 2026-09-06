'use client';

const reviews = [
  { product: 'NUTREXIA Plant Protein — 1kg', customer: 'Rahul Sharma', rating: 5, title: 'Amazing product!', comment: 'Best plant protein I\'ve tried. Mixes well and tastes great.', verified: true, approved: true, date: 'Sep 05, 2026' },
  { product: 'NUTREXIA Trial Pack', customer: 'Priya Patel', rating: 4, title: 'Good quality', comment: 'Nice flavour profile. Would love to see more flavours.', verified: true, approved: true, date: 'Sep 04, 2026' },
  { product: 'NUTREXIA Plant Protein — 1kg', customer: 'Guest User', rating: 2, title: 'Not for me', comment: 'Didn\'t like the texture. Refund was smooth though.', verified: false, approved: false, date: 'Sep 03, 2026' },
];

const renderStars = (rating: number) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export default function ReviewsPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Reviews</h1>
          <div className="admin-breadcrumb">
            <a href="/admin">Dashboard</a> / Reviews
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-metrics" style={{ marginBottom: '20px' }}>
        <div className="admin-metric admin-animate-in" style={{ '--metric-color': 'var(--admin-gold)' } as React.CSSProperties}>
          <div className="admin-metric-label">Avg Rating</div>
          <div className="admin-metric-value">3.7 ★</div>
        </div>
        <div className="admin-metric admin-animate-in" style={{ '--metric-color': 'var(--admin-accent)' } as React.CSSProperties}>
          <div className="admin-metric-label">Total Reviews</div>
          <div className="admin-metric-value">3</div>
        </div>
        <div className="admin-metric admin-animate-in" style={{ '--metric-color': 'var(--admin-warning)' } as React.CSSProperties}>
          <div className="admin-metric-label">Pending Approval</div>
          <div className="admin-metric-value">1</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Verified</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--admin-text)', fontWeight: 500, maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {r.product}
                  </td>
                  <td>{r.customer}</td>
                  <td style={{ color: 'var(--admin-gold)', letterSpacing: '2px' }}>{renderStars(r.rating)}</td>
                  <td style={{ maxWidth: '240px' }}>
                    <div style={{ color: 'var(--admin-text)', fontWeight: 500, fontSize: '0.82rem' }}>{r.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.comment}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge ${r.verified ? 'success' : 'warning'}`}>
                      {r.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${r.approved ? 'accent' : 'danger'}`}>
                      {r.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem' }}>{r.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {!r.approved && (
                        <button className="admin-btn admin-btn-primary admin-btn-sm">Approve</button>
                      )}
                      <button className="admin-btn admin-btn-ghost admin-btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
