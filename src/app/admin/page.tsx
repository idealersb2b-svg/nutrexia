'use client';

const metrics = [
  { label: 'Total Revenue', value: '₹0', trend: null, color: 'var(--admin-accent)' },
  { label: 'Orders', value: '0', trend: null, color: 'var(--admin-info)' },
  { label: 'Customers', value: '0', trend: null, color: 'var(--admin-gold)' },
  { label: 'Products', value: '0', trend: null, color: '#a78bfa' },
  { label: 'Subscriptions', value: '0', trend: null, color: 'var(--admin-success)' },
  { label: 'Inventory Alerts', value: '0', trend: null, color: 'var(--admin-warning)' },
];

const recentOrders = [
  { id: 'NTX-001', customer: 'Demo Customer', amount: '₹1,299', status: 'Processing', date: 'Sep 06, 2026' },
  { id: 'NTX-002', customer: 'Test User', amount: '₹2,499', status: 'Shipped', date: 'Sep 05, 2026' },
  { id: 'NTX-003', customer: 'Jane Doe', amount: '₹899', status: 'Delivered', date: 'Sep 04, 2026' },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    'Processing': 'info',
    'Shipped': 'warning',
    'Delivered': 'success',
    'Cancelled': 'danger',
    'Pending': 'accent',
  };
  return map[status] || 'info';
};

export default function AdminDashboard() {
  return (
    <div>
      {/* Metrics Grid */}
      <div className="admin-metrics">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="admin-metric admin-animate-in"
            style={{ '--metric-color': m.color } as React.CSSProperties}
          >
            <div className="admin-metric-label">{m.label}</div>
            <div className="admin-metric-value">{m.value}</div>
            {m.trend && (
              <span className={`admin-metric-trend ${m.trend === 'up' ? 'up' : 'down'}`}>
                {m.trend === 'up' ? '↑' : '↓'} —
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Two Column Grid */}
      <div className="admin-grid-2">
        {/* Recent Orders */}
        <div className="admin-card admin-animate-in">
          <div className="admin-card-header">
            <span className="admin-card-title">Recent Orders</span>
            <a href="/admin/orders" className="admin-btn admin-btn-ghost admin-btn-sm">
              View All →
            </a>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ color: 'var(--admin-text)', fontWeight: 600 }}>{order.id}</td>
                    <td>{order.customer}</td>
                    <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                      {order.amount}
                    </td>
                    <td>
                      <span className={`admin-badge ${statusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-card admin-animate-in">
          <div className="admin-card-header">
            <span className="admin-card-title">Quick Actions</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="/admin/products" className="admin-btn admin-btn-ghost" style={{ justifyContent: 'flex-start' }}>
              📦 Add New Product
            </a>
            <a href="/admin/orders" className="admin-btn admin-btn-ghost" style={{ justifyContent: 'flex-start' }}>
              🛒 Manage Orders
            </a>
            <a href="/admin/coupons" className="admin-btn admin-btn-ghost" style={{ justifyContent: 'flex-start' }}>
              🏷️ Create Coupon
            </a>
            <a href="/admin/content" className="admin-btn admin-btn-ghost" style={{ justifyContent: 'flex-start' }}>
              📝 Update Content
            </a>
            <a href="/admin/inventory" className="admin-btn admin-btn-ghost" style={{ justifyContent: 'flex-start' }}>
              📋 Check Inventory
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
