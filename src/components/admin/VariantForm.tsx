'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createVariant } from '../../app/actions/productActions';

export default function VariantForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    const formData = new FormData(e.currentTarget);
    formData.append('productId', productId);
    
    startTransition(async () => {
      const result = await createVariant(formData);
      
      if (result.success) {
        setSuccessMessage('Variant added successfully!');
        const form = e.target as HTMLFormElement;
        form.reset();
        router.refresh(); // Refresh the page to show new variant
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.error || 'Failed to create variant');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '14px' }}>
          {error}
        </div>
      )}
      
      {successMessage && (
        <div style={{ padding: '12px', background: 'rgba(163, 230, 53, 0.1)', color: 'var(--admin-primary)', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(163, 230, 53, 0.2)', fontSize: '14px' }}>
          {successMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="form-group">
          <label htmlFor="sku">SKU Code</label>
          <input type="text" id="sku" name="sku" required placeholder="NX-PRO-TRIAL" />
        </div>
        <div className="form-group">
          <label htmlFor="variantName">Variant Name</label>
          <input type="text" id="variantName" name="variantName" required placeholder="Trial Pack" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="form-group">
          <label htmlFor="price">Selling Price (₹)</label>
          <input type="number" id="price" name="price" step="0.01" required placeholder="249" />
        </div>
        <div className="form-group">
          <label htmlFor="mrp">MRP (₹)</label>
          <input type="number" id="mrp" name="mrp" step="0.01" required placeholder="399" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="form-group">
          <label htmlFor="servings">Total Servings</label>
          <input type="number" id="servings" name="servings" required placeholder="3" />
        </div>
        <div className="form-group">
          <label htmlFor="pricePerServing">Price/Serving (₹)</label>
          <input type="number" id="pricePerServing" name="pricePerServing" step="0.01" required placeholder="83" />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Inventory Stock</label>
          <input type="number" id="stock" name="stock" required placeholder="100" />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <input type="checkbox" name="isSubscription" style={{ width: 'auto', transform: 'scale(1.2)' }} />
          <span>Enable recurring subscription logic for this variant</span>
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Saving...' : 'Add Variant'}
        </button>
      </div>
    </form>
  );
}
