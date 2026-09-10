import ProductForm from '../../../../components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <a href="/admin/products" style={{ color: 'var(--admin-text-light)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width: 16, height: 16}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Products
        </a>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-space)', fontSize: '32px', letterSpacing: '-0.02em' }}>Add New Product</h1>
        <p style={{ color: 'var(--admin-text-light)', marginTop: '8px', fontSize: '14px' }}>
          Create a new product listing and its first variant in one step.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
