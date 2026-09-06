'use client';

const inventory = [
  { variant: 'Trial Pack (5×30g)', sku: 'NTX-TP-001', stock: 150, reserved: 12, available: 138, status: 'In Stock' },
  { variant: '1kg Pouch', sku: 'NTX-1K-001', stock: 85, reserved: 5, available: 80, status: 'In Stock' },
  { variant: 'Subscription 1kg', sku: 'NTX-SUB-001', stock: 0, reserved: 0, available: 0, status: 'Out of Stock' },
];

const batches = [
  { batch: 'BATCH-2026-001', mfgDate: 'Aug 15, 2026', expDate: 'Feb 15, 2027', produced: 500, available: 235, status: 'Released' },
  { batch: 'BATCH-2026-002', mfgDate: 'Sep 01, 2026', expDate: 'Mar 01, 2027', produced: 300, available: 300, status: 'Released' },
];

export default function InventoryPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inventory</h1>
          <div className="admin-breadcrumb">
            <a href="/admin">Dashboard</a> / Inventory
          </div>
        </div>
        <button className="admin-btn admin-btn-primary">+ Record Movement</button>
      </div>

      {/* Stock Levels */}
      <div className="admin-card" style={{ marginBottom: '16px' }}>
        <div className="admin-card-header">
          <span className="admin-card-title">Stock Levels</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Variant</th>
                <th>SKU</th>
                <th>Total Stock</th>
                <th>Reserved</th>
                <th>Available</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.sku}>
                  <td style={{ color: 'var(--admin-text)', fontWeight: 500 }}>{item.variant}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{item.sku}</td>
                  <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{item.stock}</td>
                  <td>{item.reserved}</td>
                  <td style={{ fontWeight: 600 }}>{item.available}</td>
                  <td>
                    <span className={`admin-badge ${item.stock > 0 ? 'success' : 'danger'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batches */}
      <div className="admin-card">
        <div className="admin-card-header">
          <span className="admin-card-title">Batch Traceability</span>
          <button className="admin-btn admin-btn-ghost admin-btn-sm">+ Add Batch</button>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Batch #</th>
                <th>Mfg Date</th>
                <th>Exp Date</th>
                <th>Produced</th>
                <th>Available</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((b) => (
                <tr key={b.batch}>
                  <td style={{ color: 'var(--admin-text)', fontWeight: 600, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {b.batch}
                  </td>
                  <td>{b.mfgDate}</td>
                  <td>{b.expDate}</td>
                  <td>{b.produced}</td>
                  <td style={{ fontWeight: 600 }}>{b.available}</td>
                  <td><span className="admin-badge success">{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
