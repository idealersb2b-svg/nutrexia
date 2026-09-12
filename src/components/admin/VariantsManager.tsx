'use client';

import { useState } from 'react';
import VariantForm from './VariantForm';

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

export default function VariantsManager({ productId, variants }: { productId: string, variants: Variant[] }) {
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null);

  return (
    <>
      <div className="admin-card" style={{ marginBottom: '32px' }}>
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Existing Variants</h3>
          {editingVariant && (
            <button 
              onClick={() => setEditingVariant(null)} 
              style={{ background: 'none', border: '1px solid var(--admin-border)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
            >
              Cancel Edit
            </button>
          )}
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Variant</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v.id} style={{ background: editingVariant?.id === v.id ? 'var(--admin-bg)' : 'transparent' }}>
                <td style={{ fontWeight: 600 }}>{v.name}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{v.sku}</td>
                <td>₹{v.price}</td>
                <td>
                  <span className={`status-badge ${v.stock > 100 ? 'active' : 'pending'}`}>
                    {v.stock} units
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => setEditingVariant(v)}
                    style={{ background: 'none', border: 'none', color: 'var(--admin-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {variants.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--admin-text-light)', padding: '24px' }}>
                  No variants added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-card" id="variant-form-card">
        <div className="admin-card-header">
          <h3>{editingVariant ? `Edit Variant: ${editingVariant.name}` : 'Add New Variant'}</h3>
        </div>
        <div style={{ padding: '32px' }}>
          <VariantForm 
            productId={productId} 
            variant={editingVariant} 
            onSuccess={() => setEditingVariant(null)} 
          />
        </div>
      </div>
    </>
  );
}
