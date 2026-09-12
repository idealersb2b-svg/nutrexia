'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createVariant, updateVariant } from '../../app/actions/productActions';

type Variant = {
  id: string;
  productId: string;
  sku: string;
  name: string;
  price: number;
  mrp: number;
  servings: number;
  pricePerServing: number;
  stock: number;
  isSubscription: boolean;
};

export default function VariantForm({ productId, variant, onSuccess }: { productId: string, variant?: Variant | null, onSuccess?: () => void }) {
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
    
    const isEditing = !!variant;
    
    startTransition(async () => {
      let result;
      if (isEditing) {
        formData.append('variantId', variant.id);
        result = await updateVariant(formData);
      } else {
        result = await createVariant(formData);
      }
      
      if (result.success) {
        setSuccessMessage(isEditing ? 'Variant updated successfully!' : 'Variant added successfully!');
        const form = e.target as HTMLFormElement;
        form.reset();
        router.refresh(); // Refresh the page to show new/updated variant
        if (onSuccess) onSuccess();
        
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
          <input type="text" id="sku" name="sku" required placeholder="NX-PRO-TRIAL" defaultValue={variant?.sku || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="variantName">Variant Name</label>
          <input type="text" id="variantName" name="variantName" required placeholder="Trial Pack" defaultValue={variant?.name || ''} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="form-group">
          <label htmlFor="price">Selling Price (₹)</label>
          <input type="number" id="price" name="price" step="0.01" required placeholder="249" defaultValue={variant?.price || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="mrp">MRP (₹)</label>
          <input type="number" id="mrp" name="mrp" step="0.01" required placeholder="399" defaultValue={variant?.mrp || ''} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="form-group">
          <label htmlFor="servings">Total Servings</label>
          <input type="number" id="servings" name="servings" required placeholder="3" defaultValue={variant?.servings || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="pricePerServing">Price/Serving (₹)</label>
          <input type="number" id="pricePerServing" name="pricePerServing" step="0.01" required placeholder="83" defaultValue={variant?.pricePerServing || ''} />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Inventory Stock</label>
          <input type="number" id="stock" name="stock" required placeholder="100" defaultValue={variant?.stock || ''} />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <input type="checkbox" name="isSubscription" style={{ width: 'auto', transform: 'scale(1.2)' }} defaultChecked={variant?.isSubscription || false} />
          <span>Enable recurring subscription logic for this variant</span>
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Saving...' : (variant ? 'Update Variant' : 'Add Variant')}
        </button>
      </div>
    </form>
  );
}
