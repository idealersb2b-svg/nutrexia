'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '../../app/actions/productActions';

export default function ProductForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slugInput = document.getElementById('slug') as HTMLInputElement;
    if (slugInput && !slugInput.value.includes('-')) {
      // Only auto-fill if user hasn't manually edited slug heavily
      slugInput.value = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await createProduct(formData);
      
      if (result.success) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(result.error || 'Failed to create product');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && (
        <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          {error}
        </div>
      )}

      <div className="admin-card" style={{ marginBottom: '24px', padding: '32px' }}>
        <h3 style={{ margin: '0 0 24px 0', fontFamily: 'var(--font-space)', fontSize: '20px' }}>Product Details</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" name="name" required onChange={handleNameChange} placeholder="e.g. Climate-Smart Protein" />
          </div>
          <div className="form-group">
            <label htmlFor="slug">URL Slug</label>
            <input type="text" id="slug" name="slug" required placeholder="climate-smart-protein" />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label htmlFor="subtitle">Subtitle (Optional)</label>
          <input type="text" id="subtitle" name="subtitle" placeholder="e.g. 30g Protein / 0g Sugar" />
        </div>

        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label htmlFor="shortDescription">Short Description</label>
          <input type="text" id="shortDescription" name="shortDescription" required placeholder="A brief 1-sentence summary for cards." />
        </div>

        <div className="form-group" style={{ marginBottom: '24px' }}>
          <label htmlFor="description">Full Description</label>
          <textarea id="description" name="description" required rows={5} placeholder="Full product description..." 
            style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'var(--admin-bg)', color: 'white', border: '1px solid var(--admin-border)', outline: 'none' }} 
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" name="isPublished" defaultChecked style={{ width: 'auto', transform: 'scale(1.2)' }} />
            <span>Publish immediately (visible to customers)</span>
          </label>
        </div>
      </div>

      <div className="admin-card" style={{ padding: '32px', marginBottom: '32px' }}>
        <h3 style={{ margin: '0 0 24px 0', fontFamily: 'var(--font-space)', fontSize: '20px' }}>Initial Variant (Size/Flavor)</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div className="form-group">
            <label htmlFor="sku">SKU Code</label>
            <input type="text" id="sku" name="sku" required placeholder="NX-PRO-1KG" />
          </div>
          <div className="form-group">
            <label htmlFor="variantName">Variant Name</label>
            <input type="text" id="variantName" name="variantName" required placeholder="1kg Pouch" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div className="form-group">
            <label htmlFor="price">Selling Price (₹)</label>
            <input type="number" id="price" name="price" step="0.01" required placeholder="2499" />
          </div>
          <div className="form-group">
            <label htmlFor="mrp">MRP (₹)</label>
            <input type="number" id="mrp" name="mrp" step="0.01" required placeholder="3999" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div className="form-group">
            <label htmlFor="servings">Total Servings</label>
            <input type="number" id="servings" name="servings" required placeholder="30" />
          </div>
          <div className="form-group">
            <label htmlFor="pricePerServing">Price/Serving (₹)</label>
            <input type="number" id="pricePerServing" name="pricePerServing" step="0.01" required placeholder="83.3" />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Inventory Stock</label>
            <input type="number" id="stock" name="stock" required placeholder="500" />
          </div>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input type="checkbox" name="isSubscription" style={{ width: 'auto', transform: 'scale(1.2)' }} />
            <span>Enable recurring subscription logic for this variant</span>
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <button type="button" onClick={() => router.back()} style={{ background: 'transparent', color: 'white', border: '1px solid var(--admin-border)', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Saving to Database...' : 'Save Product & Variant'}
        </button>
      </div>
    </form>
  );
}
