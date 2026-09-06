'use client';

const products = [
  { name: 'NUTREXIA Plant Protein — Trial Pack', sku: 'NTX-TP-001', price: '₹299', mrp: '₹399', stock: 150, status: 'Published' },
  { name: 'NUTREXIA Plant Protein — 1kg Pouch', sku: 'NTX-1K-001', price: '₹1,299', mrp: '₹1,799', stock: 85, status: 'Published' },
  { name: 'NUTREXIA Monthly Subscription — 1kg', sku: 'NTX-SUB-001', price: '₹1,099/mo', mrp: '₹1,799', stock: 0, status: 'Draft' },
];

export default function ProductsPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products</h1>
          <div className="admin-breadcrumb">
            <a href="/admin">Dashboard</a> / Products
          </div>
        </div>
        <button className="admin-btn admin-btn-primary">+ Add Product</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Price</th>
                <th>MRP</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.sku}>
                  <td style={{ color: 'var(--admin-text)', fontWeight: 600, maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.sku}</td>
                  <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{p.price}</td>
                  <td style={{ color: 'var(--admin-text-muted)', textDecoration: 'line-through' }}>{p.mrp}</td>
                  <td>
                    <span className={`admin-badge ${p.stock > 50 ? 'success' : p.stock > 0 ? 'warning' : 'danger'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${p.status === 'Published' ? 'accent' : 'info'}`}>
                      {p.status}
                    </span>
                  </td>
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
