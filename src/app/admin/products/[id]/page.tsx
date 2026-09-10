import { prisma } from '../../../../lib/prisma';
import VariantForm from '../../../../components/admin/VariantForm';
import { notFound } from 'next/navigation';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
      images: true,
    }
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <a href="/admin/products" style={{ color: 'var(--admin-text-light)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width: 16, height: 16}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Products
        </a>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-space)', fontSize: '32px', letterSpacing: '-0.02em' }}>{product.name}</h1>
        <p style={{ color: 'var(--admin-text-light)', marginTop: '8px', fontSize: '14px' }}>
          Manage variants and details for this product.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        <div>
          <div className="admin-card" style={{ marginBottom: '32px' }}>
            <div className="admin-card-header">
              <h3>Existing Variants</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {product.variants.map((v) => (
                  <tr key={v.id}>
                    <td style={{ fontWeight: 600 }}>{v.name}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{v.sku}</td>
                    <td>₹{v.price}</td>
                    <td>
                      <span className={`status-badge ${v.stock > 100 ? 'active' : 'pending'}`}>
                        {v.stock} units
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Add New Variant</h3>
            </div>
            <div style={{ padding: '32px' }}>
              <VariantForm productId={product.id} />
            </div>
          </div>
        </div>

        <div>
          <div className="admin-card" style={{ padding: '32px' }}>
            <h3 style={{ margin: '0 0 24px 0', fontFamily: 'var(--font-space)', fontSize: '20px' }}>Main Image</h3>
            {product.images.length > 0 ? (
              <div style={{ width: '100%', aspectRatio: '1/1', background: '#fff', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={product.images[0].url} alt={product.images[0].altText || product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            ) : (
              <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--admin-bg)', border: '1px dashed var(--admin-border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-light)', fontSize: '14px' }}>
                No Image Uploaded
              </div>
            )}
            
            <div style={{ marginTop: '24px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: 'var(--admin-text-light)', fontWeight: 600 }}>STATUS</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`status-badge ${product.isPublished ? 'active' : 'pending'}`}>
                  {product.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
