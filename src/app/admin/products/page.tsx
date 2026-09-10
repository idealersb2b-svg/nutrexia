import { prisma } from '../../../lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const variants = await prisma.productVariant.findMany({
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-space)', fontSize: '32px', letterSpacing: '-0.02em' }}>Products</h1>
        <Link href="/admin/products/new" className="btn-primary" style={{ textDecoration: 'none' }}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width: 18, height: 18}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </Link>
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
                  <Link href={`/admin/products/${variant.product.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {variant.name}
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-light)', marginTop: '4px' }}>
                      {variant.product.name}
                    </div>
                  </Link>
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
