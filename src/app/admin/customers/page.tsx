'use client';

const customers = [
  { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', orders: 5, spent: '₹6,495', joined: 'Aug 15, 2026', status: 'Active' },
  { name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', orders: 3, spent: '₹3,897', joined: 'Aug 22, 2026', status: 'Active' },
  { name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', orders: 1, spent: '₹299', joined: 'Sep 01, 2026', status: 'Active' },
  { name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 65432 10987', orders: 2, spent: '₹2,198', joined: 'Sep 03, 2026', status: 'Subscriber' },
];

export default function CustomersPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Customers</h1>
          <div className="admin-breadcrumb">
            <a href="/admin">Dashboard</a> / Customers
          </div>
        </div>
        <button className="admin-btn admin-btn-ghost">Export CSV</button>
      </div>

      {/* Quick Stats */}
      <div className="admin-metrics" style={{ marginBottom: '20px' }}>
        <div className="admin-metric admin-animate-in" style={{ '--metric-color': 'var(--admin-info)' } as React.CSSProperties}>
          <div className="admin-metric-label">Total Customers</div>
          <div className="admin-metric-value">4</div>
        </div>
        <div className="admin-metric admin-animate-in" style={{ '--metric-color': 'var(--admin-accent)' } as React.CSSProperties}>
          <div className="admin-metric-label">Active Subscribers</div>
          <div className="admin-metric-value">1</div>
        </div>
        <div className="admin-metric admin-animate-in" style={{ '--metric-color': 'var(--admin-gold)' } as React.CSSProperties}>
          <div className="admin-metric-label">Avg. Order Value</div>
          <div className="admin-metric-value">₹1,172</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email}>
                  <td>
                    <div style={{ color: 'var(--admin-text)', fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{c.email}</div>
                  </td>
                  <td style={{ fontSize: '0.82rem' }}>{c.phone}</td>
                  <td style={{ fontWeight: 600 }}>{c.orders}</td>
                  <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{c.spent}</td>
                  <td style={{ fontSize: '0.82rem' }}>{c.joined}</td>
                  <td>
                    <span className={`admin-badge ${c.status === 'Subscriber' ? 'accent' : 'success'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm">View</button>
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
