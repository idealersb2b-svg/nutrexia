import { prisma } from '../../lib/prisma';

export default async function AdminDashboardPage() {
  // Fetch some real stats from the database
  const totalOrders = await prisma.order.count();
  const totalCustomers = await prisma.user.count({ where: { role: 'CUSTOMER' } });
  
  // Example dummy revenue calculation (in reality, aggregate payments)
  const totalRevenue = "₹28,500";

  return (
    <div>
      <div className="dash-grid">
        <div className="stat-card">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">{totalRevenue}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{totalOrders}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Customers</div>
          <div className="stat-value">{totalCustomers}</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Recent Orders</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-light)' }}>
                No recent orders found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
