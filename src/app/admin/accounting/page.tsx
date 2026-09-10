import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AccountingDashboard() {
  const allOrders = await prisma.order.findMany({
    where: {
      status: { not: 'CANCELLED' } // Don't count cancelled orders as revenue
    },
    orderBy: { createdAt: 'desc' }
  });

  const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = allOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Group by status
  const ordersByStatus = allOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-space)', fontSize: '32px', letterSpacing: '-0.02em' }}>Accounting</h1>
        <p style={{ color: 'var(--admin-text-light)', marginTop: '8px', fontSize: '14px' }}>
          Financial overview and revenue tracking based on completed orders.
        </p>
      </div>

      <div className="dash-grid">
        <div className="stat-card">
          <div className="stat-title">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width: 16, height: 16}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Gross Revenue
          </div>
          <div className="stat-value">₹{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width: 16, height: 16}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            Average Order Value
          </div>
          <div className="stat-value">₹{averageOrderValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width: 16, height: 16}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Net Paid Orders
          </div>
          <div className="stat-value">{totalOrders}</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Recent Transactions</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.slice(0, 10).map((order) => (
              <tr key={order.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>#{order.orderNumber}</td>
                <td>{order.createdAt.toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${order.status === 'DELIVERED' || order.status === 'PAID' ? 'active' : 'pending'}`}>
                    {order.status}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>₹{order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
            {allOrders.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '32px' }}>
                  No revenue data available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
