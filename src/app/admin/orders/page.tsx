'use client';

const orders = [
  { id: 'NTX-20260906-001', customer: 'Rahul Sharma', email: 'rahul@example.com', amount: '₹1,299', status: 'Processing', payment: 'Captured', date: 'Sep 06, 2026' },
  { id: 'NTX-20260905-002', customer: 'Priya Patel', email: 'priya@example.com', amount: '₹2,598', status: 'Shipped', payment: 'Captured', date: 'Sep 05, 2026' },
  { id: 'NTX-20260904-003', customer: 'Amit Kumar', email: 'amit@example.com', amount: '₹299', status: 'Delivered', payment: 'Captured', date: 'Sep 04, 2026' },
  { id: 'NTX-20260903-004', customer: 'Sneha Reddy', email: 'sneha@example.com', amount: '₹1,099', status: 'Pending', payment: 'Created', date: 'Sep 03, 2026' },
  { id: 'NTX-20260902-005', customer: 'Guest User', email: 'guest@example.com', amount: '₹899', status: 'Cancelled', payment: 'Refunded', date: 'Sep 02, 2026' },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    'Processing': 'info', 'Shipped': 'warning', 'Delivered': 'success',
    'Cancelled': 'danger', 'Pending': 'accent',
  };
  return map[status] || 'info';
};

const paymentBadge = (status: string) => {
  const map: Record<string, string> = {
    'Captured': 'success', 'Created': 'accent', 'Refunded': 'warning', 'Failed': 'danger',
  };
  return map[status] || 'info';
};

export default function OrdersPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders</h1>
          <div className="admin-breadcrumb">
            <a href="/admin">Dashboard</a> / Orders
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="admin-btn admin-btn-ghost">Export CSV</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td style={{ color: 'var(--admin-text)', fontWeight: 600, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {o.id}
                  </td>
                  <td>
                    <div style={{ color: 'var(--admin-text)', fontWeight: 500 }}>{o.customer}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{o.email}</div>
                  </td>
                  <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{o.amount}</td>
                  <td><span className={`admin-badge ${statusBadge(o.status)}`}>{o.status}</span></td>
                  <td><span className={`admin-badge ${paymentBadge(o.payment)}`}>{o.payment}</span></td>
                  <td style={{ fontSize: '0.82rem' }}>{o.date}</td>
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
