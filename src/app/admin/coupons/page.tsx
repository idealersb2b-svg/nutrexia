'use client';

const coupons = [
  { code: 'WELCOME10', type: 'Percentage', value: '10%', minOrder: '₹500', maxDiscount: '₹200', uses: 12, status: 'Active', expiry: 'Dec 31, 2026' },
  { code: 'FIRST50', type: 'Flat', value: '₹50', minOrder: '₹299', maxDiscount: '—', uses: 45, status: 'Active', expiry: 'Oct 31, 2026' },
  { code: 'SUBSCRIBE20', type: 'Percentage', value: '20%', minOrder: '₹1,000', maxDiscount: '₹500', uses: 3, status: 'Active', expiry: 'Nov 30, 2026' },
  { code: 'LAUNCH100', type: 'Flat', value: '₹100', minOrder: '₹999', maxDiscount: '—', uses: 89, status: 'Expired', expiry: 'Aug 31, 2026' },
];

export default function CouponsPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Coupons & Discounts</h1>
          <div className="admin-breadcrumb">
            <a href="/admin">Dashboard</a> / Coupons
          </div>
        </div>
        <button className="admin-btn admin-btn-primary">+ Create Coupon</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Value</th>
                <th>Min Order</th>
                <th>Max Discount</th>
                <th>Uses</th>
                <th>Status</th>
                <th>Expiry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.code}>
                  <td style={{ color: 'var(--admin-accent)', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    {c.code}
                  </td>
                  <td>
                    <span className={`admin-badge ${c.type === 'Percentage' ? 'info' : 'accent'}`}>
                      {c.type}
                    </span>
                  </td>
                  <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{c.value}</td>
                  <td>{c.minOrder}</td>
                  <td>{c.maxDiscount}</td>
                  <td style={{ fontWeight: 600 }}>{c.uses}</td>
                  <td>
                    <span className={`admin-badge ${c.status === 'Active' ? 'success' : 'danger'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem' }}>{c.expiry}</td>
                  <td>
                    <button className="admin-btn admin-btn-ghost admin-btn-sm">Edit</button>
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
