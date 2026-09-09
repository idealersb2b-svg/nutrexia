import { prisma } from '../../../lib/prisma';

export default async function AdminProductsPage() {
  const variants = await prisma.productVariant.findMany({
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-space)' }}>Products</h1>
        <button className="login-btn" style={{ width: 'auto', marginTop: 0, padding: '10px 20px' }}>
          + Add Product
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {variants.map(variant => (
              <tr key={variant.id}>
                <td style={{ fontWeight: 500 }}>
                  {variant.name}
                  <div style={{ fontSize: '12px', color: 'var(--admin-text-light)', marginTop: '4px' }}>
                    {variant.product.name}
                  </div>
                </td>
                <td style={{ fontFamily: 'monospace' }}>{variant.sku}</td>
                <td>₹{variant.price.toLocaleString()}</td>
                <td>
                  <span style={{ 
                    color: variant.stock > 100 ? '#059669' : '#DC2626',
                    fontWeight: 600 
                  }}>
                    {variant.stock} units
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${variant.product.isPublished ? 'active' : 'pending'}`}>
                    {variant.product.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
              </tr>
            ))}
            
            {variants.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
